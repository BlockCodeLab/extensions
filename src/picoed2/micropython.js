(function () {
    const Serial = Scratch.Serial;

    const CTRL_A = '\x01'; // raw repl
    const CTRL_B = '\x02'; // exit raw repl
    const CTRL_C = '\x03'; // ctrl-c
    const CTRL_D = '\x04'; // reset (ctrl-d)
    const CTRL_E = '\x05'; // paste mode (ctrl-e)
    const CTRL_F = '\x06'; // safe boot (ctrl-f)

    const codify = (...lines) => lines.join('\r\n');
    const isNumber = x => !Number.isNaN(Number(x));

    const BIN_CHUNK_SIZE = 512;
    const PERIOD = 100; // ms
    const MAX_MESSAGES = 10;
    const WAIT_TIMEOUT = 5000;

    const EOL = /\r?\n|(?<!\n)\r/;

    const NOTIFY_MARKED = 'nfy';
    const NOTIFY_REGEXP = new RegExp(`<${NOTIFY_MARKED}>([\\s\\S]*?)<\\/${NOTIFY_MARKED}>`);
    const NOTIFY_CODE = codify(
        'import _thread as thread',
        'import uasyncio',
        'import time',
        'import sys',
        '_state = {}',
        '_tasks = []',
        'async def _start_notify ():',
        '    while True:',
        `        deadline = time.ticks_add(time.ticks_ms(), ${PERIOD})`,
        '        for (id, [pin, callback]) in _state.items():',
        `            if pin['mode'] == 'IN':`,
        '                try:',
        `                    val = callback(pin['pin'])`,
        `                    if pin['value'] != val:`,
        `                        pin['value'] = val`,
        `                        sys.stdout.write("<${NOTIFY_MARKED}>%s=%s</${NOTIFY_MARKED}>"%(id, val))`,
        '                except Exception as err:',
        `                    sys.stdout.write("<${NOTIFY_MARKED}>error=%s</${NOTIFY_MARKED}>"%err)`,
        '        period = time.ticks_diff(deadline, time.ticks_ms())',
        '        await uasyncio.sleep_ms(period if period > 0 else 0)',
        'async def _start_listen ():',
        '    while True:',
        `        deadline = time.ticks_add(time.ticks_ms(), ${PERIOD})`,
        '        for i in range(len(_tasks)):',
        '            (task, args) = _tasks.pop(0)',
        '            uasyncio.create_task(task(args))',
        '        period = time.ticks_diff(deadline, time.ticks_ms())',
        '        await uasyncio.sleep_ms(period if period > 0 else 0)',
        'def _async_tasks (task, args):',
        '    _tasks.append((task, args))',
        'async def _main_thread ():',
        '    notify = uasyncio.create_task(_start_notify())',
        '    listen = uasyncio.create_task(_start_listen())',
        '    await uasyncio.gather(notify, listen)',
        'thread.start_new_thread(lambda: uasyncio.run(_main_thread()), ())'
    );

    class MicroPython {
        constructor (runtime, extensionId) {
            this._serial = null;
            this._filters = [];

            this._decoder = new TextDecoder();

            this._waitingFor = [];
            this._messages = [];
            this._lastMessage = '';

            this._ready = false;
            this.state = {};

            this._runtime = runtime;
            this._extensionId = extensionId;

            this.reset = this.reset.bind(this);
            this._onConnect = this._onConnect.bind(this);
            this._onMessage = this._onMessage.bind(this);
        }

        scan () {
            if (this._serial) {
                this._serial.disconnect();
            }
            this._serial = new Serial(this._runtime, this._extensionId, {
                filters: this._filters
            }, this._onConnect, this.reset);
        }

        connect (id) {
            if (this._serial) {
                this._serial.connectPeripheral(id);
            }
        }

        disconnect () {
            if (this._serial) {
                this._serial.disconnect();
            }
            this.reset();
        }

        reset () {
            this._serial = null
            this._waitingFor = [];
            this._messages = [];
            this._lastMessage = '';

            this._ready = false;
            this.state = {};
        }

        isConnected () {
            let connected = false;
            if (this._serial) {
                connected = this._serial.isConnected();
            }
            return connected;
        }

        async _onConnect () {
            this._ready = true;
            this._serial.read(this._onMessage);
            await this.write(CTRL_B, '>>> ');
            await this.write(CTRL_D, '>>> ');
            await this.write(CTRL_C, '>>> ');
            await this._startNotifications();
        }

        _onMessage (data) {
            let text = `${this._lastMessage}${this._decoder.decode(data)}`;

            // notifies
            // <notify>id=value</notify>
            const found = text.match(NOTIFY_REGEXP);
            if (found) {
                const [key, value] = found[1].split('=');
                if (value === 'True' || value === 'False') {
                    this.state[key] = value === 'True' ? true : false;
                } else if (isNumber(value)) {
                    this.state[key] = Number(value);
                } else {
                    this.state[key] = value;
                }
                text = text.replace(NOTIFY_REGEXP, '');
            }

            const messages = text.split(EOL);
            this._lastMessage = messages.pop();
            this._messages = this._messages.concat(messages.filter(m => m.length > 0));
            while (this._messages.length > MAX_MESSAGES) {
                this._messages.shift();
            }

            // waiting for sent
            this._waitForSent();
        }

        _waitForSent () {
            const messages = this._messages.concat(this._lastMessage);
            for (const timer in this._waitingFor) {
                const promise = this._waitingFor[timer];
                if (!promise) continue;
                let matched = true;
                for (let i = -1; i >= -promise.waitFor.length; i--) {
                    const waitFor = promise.waitFor.at(i);
                    const message = messages.at(i);
                    matched = matched && message === waitFor;
                    // error
                    if (message.includes('Error: ') || message.includes('Traceback')) {
                        promise.reject(new Error(message));
                        this._removeWait(timer);
                        return;
                    }
                }
                if (matched) {
                    promise.resolve();
                    this._removeWait(timer);
                    return;
                }
            }
        }

        _removeWait (timer) {
            clearTimeout(timer);
            this._waitingFor.splice(timer, 1);
        }

        _waitTimeout (timer) {
            const promise = this._waitingFor[timer];
            if (promise) {
                promise.reject(new Error(`${promise.waitFor[0]} timeout`));
            };
            this._removeWait(timer);
        }

        _waitFor (waitFor, timeout = WAIT_TIMEOUT) {
            waitFor = waitFor.split(EOL);
            return new Promise ((resolve, reject) => {
                const timer = setTimeout(() => this._waitTimeout(timer), timeout);
                this._waitingFor[timer] = {waitFor, resolve, reject};
            });
        }

        async write (data, waitFor, timeout) {
            if (!this.isConnected) return;
            if (!this._ready) return;
            this._ready = false;
            await this._serial.write(data, 'text');
            this._ready = true;
            if (waitFor) {
                await this._waitFor(waitFor, timeout);
            };
        }

        async send (command, timeout) {
            if (!this.isConnected) return;
            const data = `${command}\r\n`;
            await this.write(data, `>>> ${data}>>> `, timeout);
        }

        async run (code, waitFor) {
            if (!this.isConnected) return;
            await this.write(CTRL_A, 'raw REPL; CTRL-B to exit\r\n>');
            await this.write(code);
            await this.write(CTRL_D, `>OK${waitFor || ''}${CTRL_D}${CTRL_D}>`);
            await this.write(CTRL_B, 'Type "help()" for more information.\r\n>>> ');
        }

        async setState (id, defaultValue, pin, code) {
            if (!this.isConnected) return ;
            if (typeof this.state[id] !== 'undefined') return;
            this.state[id] = defaultValue;
            const pinObj = [
                `'mode': '${pin.mode}'`,
                `'pin': ${pin.pin}`,
                `'value': ${pin.value || 'None'}`
            ];
            await this.run([
                code.replace('def callback', `def ${id}_callback`),
                `_state['${id}'] = [{${pinObj.join(',')}}, ${id}_callback]`,
            ].join('\r\n'));
        }

        async _startNotifications () {
            if (!this.isConnected) return ;
            await this.run(NOTIFY_CODE);
        }

        async save (file, path) {
            const filepath = `${path}/${file.name}`;
            // check file hash
            if (await this._checkHash(filepath, file.hash)) return;

            /* save new file */

            const code = [
                'import os',
                'import binascii',
                `os.chdir('/')`,
                'try:',
                `    os.mkdir('${path}')`,
                'except OSError:',
                '    pass',
                `with open('${filepath}', 'wb') as f:`
            ];

            let counter = 0;
            do {
                const start = counter * BIN_CHUNK_SIZE;
                const end = Math.min((counter + 1) * BIN_CHUNK_SIZE, file.content.length);
                const chunk = file.content.slice(start, end);
                code.push(`    f.write(binascii.a2b_base64('${chunk}'))`);
                counter++;
            } while (counter * BIN_CHUNK_SIZE < file.content.length);

            await this.run(codify(...code));
            // check file hash
            if (await this._checkHash(filepath, file.hash)) return;
            
            throw new Error(`saving '${file.name}' failed`);
        }

        async _checkHash (filepath, hash) {
            try {
                await this.run(codify(
                    'import os',
                    'import binascii',
                    'import hashlib',
                    `os.chdir('/')`,
                    'hash = hashlib.sha256()',
                    `with open('${filepath}', 'rb') as f:`,
                    '    while True:',
                    `        c = f.read(${BIN_CHUNK_SIZE})`,
                    '        if not c:',
                    '           break',
                    '        hash.update(c)',
                    'print(binascii.hexlify(hash.digest()).decode())'
                ), `${hash}\r\n`);
                return true;
            } catch (e) {
                return false;
            }
        }
    }

    Scratch.export(MicroPython);
})();
