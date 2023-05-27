(async function (Scratch) {
    const Serial = Scratch.Serial;
    const formatMessage = Scratch.formatMessage;
    const log = Scratch.log;

    await Scratch.require('https://unpkg.com/xterm@5.1.0/css/xterm.css');
    await Scratch.require('https://unpkg.com/xterm@5.1.0/lib/xterm.js');
    await Scratch.require('https://unpkg.com/xterm-addon-webgl@0.14.0/lib/xterm-addon-webgl.js');
    await Scratch.require('https://unpkg.com/xterm-addon-fit@0.7.0/lib/xterm-addon-fit.js');

    // eslint-disable-next-line max-len
    const TAB_ICON = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjwhLS0gQ3JlYXRlZCB3aXRoIFZlY3Rvcm5hdG9yIChodHRwOi8vdmVjdG9ybmF0b3IuaW8vKSAtLT4KPHN2ZyBoZWlnaHQ9IjEwMCUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3R5bGU9ImZpbGwtcnVsZTpub256ZXJvO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDIwIDIwIiB3aWR0aD0iMTAwJSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxkZWZzLz4KPGcgaWQ9IuaXoOagh+mimCI+CjxwYXRoIGQ9Ik0zLjQ1NDU1IDQuMThMMTYuNTQ1NSA0LjE4QzE3LjM0ODggNC4xOCAxOCA0LjgzMTIyIDE4IDUuNjM0NTVMMTggMTEuNDUyN0MxOCAxMy44NjI1IDE2LjA0NjIgMTUuODE2NCAxMy42MzY0IDE1LjgxNjRMNi4zNjM2NCAxNS44MTY0QzMuOTUzODIgMTUuODE2NCAyIDEzLjg2MjUgMiAxMS40NTI3TDIgNS42MzQ1NUMyIDQuODMxMjIgMi42NTEyMiA0LjE4IDMuNDU0NTUgNC4xOFpNNS4xMjIxOCA4LjY5NDE4TDYuNDI2MTggOS45OTgxOEw1LjEyMjE4IDExLjMwMjJDNC44NDY1NyAxMS41ODc1IDQuODUwNTEgMTIuMDQxMiA1LjEzMTA0IDEyLjMyMTdDNS40MTE1NyAxMi42MDIyIDUuODY1MTggMTIuNjA2MiA2LjE1MDU1IDEyLjMzMDVMNy45Njg3MyAxMC41MTI0QzguMjUyNjQgMTAuMjI4NCA4LjI1MjY0IDkuNzY4IDcuOTY4NzMgOS40ODRMNi4xNTA1NSA3LjY2NTgyQzUuODY1MTggNy4zOTAyIDUuNDExNTcgNy4zOTQxNCA1LjEzMTA0IDcuNjc0NjhDNC44NTA1MSA3Ljk1NTIxIDQuODQ2NTcgOC40MDg4MiA1LjEyMjE4IDguNjk0MThaTTExLjQ1NDUgMTEuMDg5MUw5LjI3MjczIDExLjA4OTFDOC44NzEwNyAxMS4wODkxIDguNTQ1NDUgMTEuNDE0NyA4LjU0NTQ1IDExLjgxNjRDOC41NDU0NSAxMi4yMTggOC44NzEwNyAxMi41NDM2IDkuMjcyNzMgMTIuNTQzNkwxMS40NTQ1IDEyLjU0MzZDMTEuODU2MiAxMi41NDM2IDEyLjE4MTggMTIuMjE4IDEyLjE4MTggMTEuODE2NEMxMi4xODE4IDExLjQxNDcgMTEuODU2MiAxMS4wODkxIDExLjQ1NDUgMTEuMDg5MVoiIGZpbGw9IiM0Yzk3ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIi8+CjwvZz4KPC9zdmc+Cg==';

    const WAIT_TIMEOUT = 60000;

    const PLATFORM = (p => {
        if (p.indexOf('mac') > -1) return 'darwin';
        if (p.indexOf('win') > -1) return 'win32';
        if (p.indexOf('linux') > -1) return 'linux';
    })(navigator.platform.toLowerCase());

    const TERMINAL_OPTIONS = {
        convertEol: true,
        cursorBlink: true,
        fontFamily: '"Cascadia Code", Menlo, monospace',
        fontSize: 12,
        lineHeight: 1.2,
        windowsMode: PLATFORM === 'win32',
        macOptionIsMeta: PLATFORM === 'darwin',
        macOptionClickForcesSelection: PLATFORM === 'darwin',
        theme: {
            cursor: '#f8f8f8',
            foreground: '#f8f8f8',
            background: '#2d2e2c',
            selection: '#5da5d5',
            black: '#1e1e1d',
            brightblack: '#262625',
            red: '#ce5c5c',
            brightred: '#ff7272',
            green: '#5bcc5b',
            brightgreen: '#72ff72',
            yellow: '#cccc5b',
            brightyellow: '#ffff72',
            blue: '#5d5dd3',
            brightblue: '#7279ff',
            magenta: '#bc5ed1',
            brightmagenta: '#e572ff',
            cyan: '#5da5d5',
            brightcyan: '#72f0ff',
            white: '#f8f8f8',
            brightwhite: '#ffffff'
        }
    };

    const webglAddon = new WebglAddon.WebglAddon();
    const fitAddon = new FitAddon.FitAddon();

    class Repl {
        constructor (runtime, extensionId) {
            this._serial = null;
            this._term = null;

            this._runtime = runtime;
            this._extensionId = extensionId;

            this._decoder = new TextDecoder();

            this._messages = '';
            this._busy = false;
            this._waitingFor = {};
            this._listening = {};

            this.reset = this.reset.bind(this);
            this._onConnect = this._onConnect.bind(this);
            this._onMessage = this._onMessage.bind(this);
            this._onTermData = this._onTermData.bind(this);
        }

        setupAddon (id, title, done) {
            const defaultId = 'repl';
            const defaultTitle = formatMessage({
                id: 'repl.name',
                default: 'REPL'
            });
            Scratch.gui.addon({
                id: `${defaultId}${id ? `_${id}` : ''}`,
                type: 'tab',
                icon: TAB_ICON,
                title: `${defaultTitle}${title ? `: ${title}` : ''}`,
                didMount: element => {
                    if (element) {
                        this._term = new Terminal(TERMINAL_OPTIONS);
                        this._term.open(element);
                        this._term.loadAddon(webglAddon);
                        this._term.loadAddon(fitAddon);
                        this._term.onData(this._onTermData);

                        element.style.padding = '2px';
                        element.style.backgroundColor = TERMINAL_OPTIONS.theme.background;
                        element.querySelector('.xterm').style.position = 'absolute';

                        fitAddon.fit();
                        this._term.focus();

                        if (done) {
                            done();
                        }
                    }
                },
                didUpdate: () => {
                    if (this._term) {
                        fitAddon.fit();
                    }
                },
                willUnmount: () => {
                    if (this._term) {
                        this._term.clear();
                        this._term.dispose();
                        this._term = null;
                    }
                }
            });
        }

        // must override
        get filters () {
            throw new Error('must override');
        }

        scan () {
            if (this._serial) {
                this._serial.disconnect();
            }
            this._serial = new Serial(this._runtime, this._extensionId, {
                filters: this.filters
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
            this._messages = '';
            this._busy = false;
            this._waitingFor = {};
            this._listening = {};
        }

        isConnected () {
            let connected = false;
            if (this._serial) {
                connected = this._serial.isConnected();
            }
            return connected;
        }

        _onConnect () {
            this._serial.ondata = this._onMessage;
        }

        _onMessage (data) {
            // log.log(this._decoder.decode(data));
            this._messages += this._decoder.decode(data);
            this._receiveWaiting();
            this._receiveListening();
            if (this._term) {
                this._term.write(data);
            }
        }

        _onTermData (data) {
            // log.log(data);
            this.write(data);
        }

        _receiveWaiting () {
            Object.entries(this._waitingFor).forEach(([timer, promise]) => {
                let waitFor = promise.waitFor;
                if (waitFor instanceof RegExp) {
                    if (!waitFor.multiline) {
                        waitFor = new RegExp(promise.waitFor, `m${promise.waitFor.flags}`);
                    }
                    const found = waitFor.exec(this._messages);
                    if (found) {
                        promise.resolve(found);
                        this._messages = this._messages.replace(waitFor, '');
                        this._removeWaiting(timer);
                    }
                } else if (this._messages.includes(waitFor)) {
                    promise.resolve();
                    this._messages = this._messages.replace(waitFor, '');
                    this._removeWaiting(timer);
                } else if (/Error:/.test(waitFor)) {
                    promise.reject();
                }
            })
        }

        async write (message, waitFor, timeout) {
            if (this._busy) return;
            if (this.isConnected()) {
                this._busy = true;
                if (typeof message === 'string') {
                    await this._serial.write(message, 'text');
                } else {
                    await this._serial.write(message, 'binary');
                }
                this._busy = false;
                if (waitFor) {
                    return this._promisesTo(waitFor, timeout);
                }
            }
        }

        async transfer (buffer) {
            if (this._busy) return;
            if (this.isConnected()) {
                this._busy = true;
                await this._serial.transfer('code', buffer);
                this._busy = false;
            }
        }

        _promisesTo (waitFor, timeout = WAIT_TIMEOUT) {
            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => this._waitingTimeout(timer), timeout);
                this._waitingFor[timer] = {waitFor, resolve, reject};
            });
        }

        _waitingTimeout (timer) {
            const promise = this._waitingFor[timer];
            if (promise) {
                promise.reject(new Error(`wait for '${promise.waitFor}' timeout`));
            }
            this._removeWaiting(timer);
        }

        _removeWaiting (timer) {
            clearTimeout(timer);
            this._waitingFor[timer] = null;
            delete this._waitingFor[timer];
        }

        on (finder, handler) {
            const name = `${finder}`;
            if (!finder.multiline) {
                finder = new RegExp(finder, `m${finder.flags}`);
            }
            this._listening[name] = [finder, handler];
        }

        off (finder) {
            const name = `${finder}`;
            delete this._listening[name];
        }

        _receiveListening () {
            Object.values(this._listening).forEach(([finder, handler]) => {
                const found = finder.exec(this._messages);
                if (found) {
                    handler(found);
                    this._messages = this._messages.replace(finder, '');
                }
            });
        }
    }

    Scratch.export(Repl);

    Scratch.extensions.translations({
        en: {
            'repl.name': 'REPL'
        },
        'zh-cn': {
            'repl.name': '交互执行'
        },
        'zh-tw': {
            'repl.name': 'REPL'
        }
    });
})(window.Scratch);
