(async function (Scratch, require) {
    const Repl = await require('../repl/repl.js');
    const FontFiles = await require('./fonts.json');
    const translations = await require('./translations.json');

    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const Cast = Scratch.Cast;
    const MathUtil = Scratch.MathUtil;
    const formatMessage = Scratch.formatMessage;

    // eslint-disable-next-line max-len
    const blockIconURI = 'data:image/png;base64,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';

    const PRODUCT_ID = 10;
    const VENDOR_ID = 11914;
    
    const FILE_PUT_CODE = `function (fn,fc){require('fs').writeFile(fn,new TextEncoder().encode(fc))}`;

    const WAIT_FOR_PROMPT = '\x1B[0m\r\x1B7> ';
    const WAIT_FOR_UNDEFINED = `\r\n\x1B[90mundefined\x1B[0m\r\n${WAIT_FOR_PROMPT}`;
    const WAIT_FOR_PROMISE = `\r\n\x1B[96m[Promise]\x1B[0m\r\n${WAIT_FOR_PROMPT}`;

    const delay = d => new Promise(r => setTimeout(r, d));
    const isNumber = x => !Number.isNaN(Number(x));

    const PicoEd2LEDState = {
        ON: 'on',
        OFF: 'off'
    };
    const PicoEd2Buttons = {
        A: 'a',
        B: 'b',
        ANY: 'any'
    };
    const PicoEd2Images = {
        NO: 'NO',
        SQUARE: 'SQUARE',
        RECTANGLE: 'RECTANGLE',
        RHOMBUS: 'RHOMBUS',
        TARGET: 'TARGET',
        CHESSBOARD: 'CHESSBOARD',
        HAPPY: 'HAPPY',
        SAD: 'SAD',
        YES: 'YES',
        HEART: 'HEART',
        TRIANGLE: 'TRIANGLE',
        CHAGRIN: 'CHAGRIN',
        SMILING_FACE: 'SMILING_FACE',
        CRY: 'CRY',
        DOWNCAST: 'DOWNCAST',
        LOOK_LEFT: 'LOOK_LEFT',
        LOOK_RIGHT: 'LOOK_RIGHT',
        TONGUE: 'TONGUE',
        PEEK_LEFT: 'PEEK_LEFT',
        PEEK_RIGHT: 'PEEK_RIGHT',
        TEAR_EYES: 'TEAR_EYES',
        PROUD: 'PROUD',
        SNEER_LEFT: 'SNEER_LEFT',
        SNEER_RIGHT: 'SNEER_RIGHT',
        SUPERCILIOUS_LOOK: 'SUPERCILIOUS_LOOK',
        EXCITED: 'EXCITED',
    }
    const PicoEd2Music = {
        DADADADUM: 'DADADADUM',
        ENTERTAINER: 'ENTERTAINER',
        PRELUDE: 'PRELUDE',
        ODE: 'ODE',
        NYAN: 'NYAN',
        RINGTONE: 'RINGTONE',
        FUNK: 'FUNK',
        BLUES: 'BLUES',
        BIRTHDAY: 'BIRTHDAY',
        WEDDING: 'WEDDING',
        FUNERAL: 'FUNERAL',
        PUNCHLINE: 'PUNCHLINE',
        PYTHON: 'PYTHON',
        BADDY: 'BADDY',
        CHASE: 'CHASE',
        BA_DING: 'BA_DING',
        WAWAWAWAA: 'WAWAWAWAA',
        JUMP_UP: 'JUMP_UP',
        JUMP_DOWN: 'JUMP_DOWN',
        POWER_UP: 'POWER_UP',
        POWER_DOWN: 'POWER_DOWN'
    }
    const PicoEd2PinMode = {
        NONE: 'INPUT',
        DOWN: 'INPUT_PULLDOWN',
        UP: 'INPUT_PULLUP',
        OUTPUT: 'OUTPUT'
    };
    const PicoEd2DigitalValue = {
        LOW: 'LOW',
        HIGH: 'HIGH'
    }
    const PicoEd2InterruptEvent = {
        LOW_LEVEL: 'LOW_LEVEL',
        HIGH_LEVEL: 'HIGH_LEVEL',
        FALLING: 'FALLING',
        RISING: 'RISING',
        CHANGE: 'CHANGE'
    }

    const SERVO_ANGLE_RANGE = {min: 0, max: 180};
    const SERVO_DUTY_RANGE = {min: 0.5, max: 2.5}; // ms, 0~180
    const SERVO_PERIOD = 20; // ms, 50Hz

    class PicoEd2 extends Repl {
        constructor (runtime, extensionId) {
            super(runtime, extensionId);
            this._encoder = new TextEncoder();
            this._runtime.registerPeripheralExtension(this._extensionId, this);
            this._files = [];
            this.state = {};
        }

        get filters () {
            return [{
                usbProductId: PRODUCT_ID,
                usbVendorId: VENDOR_ID
            }];
        }

        disconnect () {
            this._runtime.emit('EXTENSION_DATA_DOWNLOADING', false);
            super.disconnect();
        }

        async _onConnect () {
            super._onConnect();
            
            await this.send('.reset');
            await delay(500);

            this._runtime.emit('EXTENSION_DATA_DOWNLOADING', true);
            try {
                // put files...
                const files = [].concat(this._files.concat, Object.entries(FontFiles));
                for (const [filename, content] of files) {
                    await this.put(filename, content);
                }
            } catch (e) {
                this._serial._handleRequestError(e);
            } finally {
                this._runtime.emit('EXTENSION_DATA_DOWNLOADING', false);
            }
        }

        async put (filename, buffer) {
            const uint8 = this._encoder.encode(buffer);
            const safeBuffer = buffer.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'').replaceAll('\n', '\\n');
            const code = `(${FILE_PUT_CODE})('${filename}', '${safeBuffer}');`;
            try {
                await this.write('\r.ls\r', `\r\n${uint8.length}\t${filename}\r\n`, 500);
            } catch (e) {
                await this.write(`\r.rm ${filename}\r`);
                await delay(500);
                await this.run(code);
            }
        }

        async run (code) {
            await this.write('\r.flash -w\r');
            await delay(500);
            await this.transfer(this._encoder.encode(code));
            await delay(500);
            await this.write('\r.load\r', WAIT_FOR_PROMPT);
            // await this.write('\r.flash -e\r', '\r\nFlash has erased\r\n');
            this.state = {};
        }

        async send (command, waitFor = null) {
            return await this.write(`\r${command.replaceAll('\n', '\\n')}\r`, waitFor);
        }

        /* led */

        async led (state) {
            await this.send(`picoed.led.${state}()`, WAIT_FOR_UNDEFINED);
        }

        async toggle () {
            await this.send('picoed.led.toggle()', WAIT_FOR_UNDEFINED);
        }

        /* buttons */

        async _setupButtons () {
            const down = a => `console.log('\n~ button_${a}_down')`;
            const up = a => `console.log('\n~ button_${a}_up')`;
            const read = a => `picoed.button${a.toUpperCase()}.read()`;
            const check = a => `(function check(){setTimeout((()=>${read(a)}?${up(a)}:check()),50)})();`
            await this.send(`picoed.buttonA.on('click',()=>{${down('a')};${check('a')}})`);
            await this.send(`picoed.buttonB.on('click',()=>{${down('b')};${check('b')}})`);
            this.on(/^~ button_([ab])_down$/m, found => this.state[found[1]] = true);
            this.on(/^~ button_([ab])_up$/m, found => this.state[found[1]] = false);
            this.state.a = false;
            this.state.b = false;
        }

        async isPressedA () {
            if (typeof this.state.a === 'undefined') {
                await this._setupButtons(code);
            }
            return this.state.a;
        }

        async isPressedB () {
            if (typeof this.state.b === 'undefined') {
                await this._setupButtons(code);
            }
            return this.state.b;
        }

        /* display */

        async clear () {
            await this.send(`picoed.display.clear()`, WAIT_FOR_UNDEFINED);
        }

        async pixel (x, y, bright = 30) {
            await this.send(`picoed.display.pixel(${x}, ${y}, ${bright})`, WAIT_FOR_UNDEFINED);
        }

        async scroll (text, bright = 30) {
            const waitFor = `\n~ display_scroll_done.`;
            await this.send(
                `picoed.display.scroll('${text}', ${bright}).then(() => console.log('${waitFor}'))`,
                waitFor
            );
        }

        async show (image, bright = 30) {
            const arg = PicoEd2Images[image] ? `${image}(${bright})` :`image('${image}', ${bright})`;
            await this.send(`picoed.display.${arg}`, WAIT_FOR_UNDEFINED);
        }

        /* music */

        async playAndWait (music) {
            const waitFor = `\n~ ${music}_done.`;
            await this.send(
                `picoed.music.play(picoed.music.${music}).then(() => console.log('${waitFor}'))`,
                waitFor,
            );
        }

        async play (music) {
            await this.send(`picoed.music.play(picoed.music.${music})`, WAIT_FOR_PROMISE);
        }

        playTone (note, duration) {
            const octave = Math.floor(note / 12);
            const i = note % 12;
            duration = Math.floor(duration * 1000);
            return new Promise(resolve => {
                const timer = setTimeout(resolve, duration);
                this._tonePromise = [resolve, timer];
                this.send(`picoed.music._playNote(${octave},${i},{duration:${duration}})`);
            });
        }

        async stop () {
            if (this._tonePromise) {
                const [resolve, timer] = this._tonePromise;
                clearTimeout(timer);
                resolve();
                this._tonePromise = null;
            }
            await this.send(`picoed.music.stop()`, WAIT_FOR_UNDEFINED);
        }

        /* pins */

        async setPinMode (pin, mode = PicoEd2PinMode.NONE) {
            this.state[pin] = mode;
            await this.send(`pinMode(${pin},${mode})`, WAIT_FOR_UNDEFINED);
        }

        async getPinValue (pin) {
            if (typeof this.state[pin] === 'undefined') {
                await this.setPinMode(pin, PicoEd2PinMode.NONE);
                this.state[pin] = 'ANALOG_INPUT';
            }
            if (this.state[pin] !== 'ANALOG_INPUT') {
                delete this.state[pin];
                return await this.getPinValue(pin);
            }
            const found = await this.send(
                `console.log('\n~ pin${pin}<'+analogRead(${pin})+'>')`,
                /^~ pin\d+<([\d.]+)>$/m
            );
            if (isNumber(found[1])) {
                return parseFloat(found[1]);
            }
        }

        async isPinHigh (pin) {
            if (typeof this.state[pin] === 'undefined') {
                await this.setPinMode(pin, PicoEd2PinMode.NONE);
            }
            if (!/^INPUT.*/.test(this.state[pin])) {
                delete this.state[pin];
                return await this.isPinHigh(pin);
            }
            const found = await this.send(
                `console.log('\n~ pin${pin}<'+digitalRead(${pin})+'>')`,
                /^~ pin\d+<(\d)>$/m
            );
            return found[1] === '1';
        }

        async setPinValue (pin, value) {
            if (typeof this.state[pin] === 'undefined') {
                await this.setPinMode(pin, PicoEd2PinMode.OUTPUT);
            }
            if (this.state[pin] !== PicoEd2PinMode.OUTPUT) {
                delete this.state[pin];
                return await this.setPinValue(pin, value);
            }
            if (typeof value === 'undefined') {
                await this.send(`digitalToggle(${pin})`, WAIT_FOR_UNDEFINED);
            } else if (isNumber(value)) {
                await this.send(`analogWrite(${pin},${value})`, WAIT_FOR_UNDEFINED);
            } else {
                await this.send(`digitalWrite(${pin},${value})`, WAIT_FOR_UNDEFINED);
            }
        }

        async setServoAngle (pin, angle) {
            if (typeof this.state[pin] === 'undefined') {
                this.state[pin] = `pwm_${Date.now()}`;
                const hz = 1000 / SERVO_PERIOD;
                const duty = SERVO_DUTY_RANGE.min / SERVO_PERIOD;
                await this.send(`const ${this.state[pin]}=board.pwm(${pin},${hz},${duty})`, WAIT_FOR_UNDEFINED);
                await this.send(`${this.state[pin]}.start();`);
            }
            if (!this.state[pin].includes('pwm_')) {
                delete this.state[pin];
                return await this.setServoAngle(pin, angle);
            }
            const d = (SERVO_DUTY_RANGE.max - SERVO_DUTY_RANGE.min) / SERVO_ANGLE_RANGE.max;
            const duty = (SERVO_DUTY_RANGE.min + angle * d) / SERVO_PERIOD;
            await this.send(`${this.state[pin]}.setDuty(${duty})`, WAIT_FOR_UNDEFINED);
        }

        /* watch */
        
        async setupWatcher (pin) {
            const falling = `console.log('\n~ pin_${pin}_${PicoEd2InterruptEvent.FALLING}')`;
            const rising = `console.log('\n~ pin_${pin}_${PicoEd2InterruptEvent.RISING}')`;
            const watchFalling = await this.send(`setWatch(()=>${falling},${pin},FALLING,10)`, WAIT_FOR_NUMBER);
            const watchRising = await this.send(`setWatch(()=>${rising},${pin},RISING,10)`, WAIT_FOR_NUMBER);

            if (watchFalling || watchRising) {
                this.state[pin] = {
                    mode: this.state[pin] || PicoEd2PinMode.NONE,
                    id: [watchFalling && watchFalling[1], watchRising && watchRising[1]],
                    value: null
                };
                this.on(
                    new RegExp(`^~ pin_(${pin})_(${PicoEd2InterruptEvent.FALLING}|${PicoEd2InterruptEvent.RISING})$`, 'm'),
                    found => {
                        this.state[pin].value = found[2];
                        setTimeout(() => {
                            if (this.state[pin].value === PicoEd2InterruptEvent.FALLING) {
                                this.state[pin].value = PicoEd2InterruptEvent.LOW_LEVEL;
                            } else if (this.state[pin].value === PicoEd2InterruptEvent.RISING) {
                                this.state[pin].value = PicoEd2InterruptEvent.HIGH_LEVEL;
                            } else {
                                this.state[pin].value = null;
                            }
                        }, 50);
                    }    
                );
            }
        }

        async stopWatch (pin) {
            if (this.state[pin]) {
                for (const id of this.state[pin].id) {
                    await this.send(`clearWatch(${id})`);
                }
                delete this.state[pin];
            }
        }

        checkPinEvent (pin, event) {
            if (this.state[pin]) {
                if (event === PicoEd2InterruptEvent.CHANGE) {
                    return this.state[pin].value !== PicoEd2InterruptEvent.FALLING || this.state[pin].value === PicoEd2InterruptEvent.RISING;
                }
                return this.state[pin].value === event;
            }
        }
    }

    const DEFAULT_BRIGHT = 10;
    const DEFAULT_SYMBOL =  '00001110001110000:' +
                            '00011111011111000:' +
                            '00011111111111000:' +
                            '00011111111111000:' +
                            '00001111111110000:' +
                            '00000011111000000:' +
                            '00000000100000000';
    const NOTE_RANGE = {min: 0, max: 127};

    class PicoEd2Blocks {
        static get EXTENSION_ID () {
            return 'picoed2';
        }

        static get EXTENSION_NAME () {
            return 'Pico:ed V2';
        }

        get LED_STATE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'picoed2.ledStateMenu.on',
                        default: 'on'
                    }),
                    value: PicoEd2LEDState.ON
                },
                {
                    text: formatMessage({
                        id: 'picoed2.ledStateMenu.off',
                        default: 'off'
                    }),
                    value: PicoEd2LEDState.OFF
                }
            ];
        }

        get BUTTONS_MENU () {
            return [
                {
                    text: 'A',
                    value: PicoEd2Buttons.A
                },
                {
                    text: 'B',
                    value: PicoEd2Buttons.B
                },
                {
                    text: formatMessage({
                        id: 'picoed2.buttonsMenu.any',
                        default: 'any'
                    }),
                    value: PicoEd2Buttons.ANY
                }
            ];
        }

        get IMAGES_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.no',
                        default: 'no'
                    }),
                    value: PicoEd2Images.NO
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.yes',
                        default: 'yes'
                    }),
                    value: PicoEd2Images.YES
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.heart',
                        default: 'heart'
                    }),
                    value: PicoEd2Images.HEART
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.triangle',
                        default: 'triangle'
                    }),
                    value: PicoEd2Images.TRIANGLE
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.square',
                        default: 'square'
                    }),
                    value: PicoEd2Images.SQUARE
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.rectangle',
                        default: 'rectangle'
                    }),
                    value: PicoEd2Images.RECTANGLE
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.rhombus',
                        default: 'rhombus'
                    }),
                    value: PicoEd2Images.RHOMBUS
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.target',
                        default: 'target'
                    }),
                    value: PicoEd2Images.TARGET
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.chessboard',
                        default: 'chessboard'
                    }),
                    value: PicoEd2Images.CHESSBOARD
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.happy',
                        default: 'happy'
                    }),
                    value: PicoEd2Images.HAPPY
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.sad',
                        default: 'sad'
                    }),
                    value: PicoEd2Images.SAD
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.chagrin',
                        default: 'chagrin'
                    }),
                    value: PicoEd2Images.CHAGRIN
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.smilingFace',
                        default: 'smiling face'
                    }),
                    value: PicoEd2Images.SMILING_FACE
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.cry',
                        default: 'cry'
                    }),
                    value: PicoEd2Images.CRY
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.downcast',
                        default: 'downcast'
                    }),
                    value: PicoEd2Images.DOWNCAST
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.lookLeft',
                        default: 'look left'
                    }),
                    value: PicoEd2Images.LOOK_LEFT
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.lookRight',
                        default: 'look right'
                    }),
                    value: PicoEd2Images.LOOK_RIGHT
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.tongue',
                        default: 'tongue'
                    }),
                    value: PicoEd2Images.TONGUE
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.peekLeft',
                        default: 'peek left'
                    }),
                    value: PicoEd2Images.PEEK_LEFT
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.peekRight',
                        default: 'peek right'
                    }),
                    value: PicoEd2Images.PEEK_RIGHT
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.tearEyes',
                        default: 'tear eyes'
                    }),
                    value: PicoEd2Images.TEAR_EYES
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.proud',
                        default: 'proud'
                    }),
                    value: PicoEd2Images.PROUD
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.sneerLeft',
                        default: 'sneer left'
                    }),
                    value: PicoEd2Images.SNEER_LEFT
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.sneerRight',
                        default: 'sneer right'
                    }),
                    value: PicoEd2Images.SNEER_RIGHT
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.superciliousLook',
                        default: 'supercilious look'
                    }),
                    value: PicoEd2Images.SUPERCILIOUS_LOOK
                },
                {
                    text: formatMessage({
                        id: 'picoed2.imagesMenu.excited',
                        default: 'excited'
                    }),
                    value: PicoEd2Images.EXCITED
                }
            ];
        }

        get MUSIC_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.dadadadum',
                        default: 'dadadadum'
                    }),
                    value: PicoEd2Music.DADADADUM
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.entertainer',
                        default: 'entertainer'
                    }),
                    value: PicoEd2Music.ENTERTAINER
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.prelude',
                        default: 'prelude'
                    }),
                    value: PicoEd2Music.PRELUDE
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.ode',
                        default: 'ode'
                    }),
                    value: PicoEd2Music.ODE
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.nyan',
                        default: 'nyan'
                    }),
                    value: PicoEd2Music.NYAN
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.ringtone',
                        default: 'ringtone'
                    }),
                    value: PicoEd2Music.RINGTONE
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.funk',
                        default: 'funk'
                    }),
                    value: PicoEd2Music.FUNK
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.blues',
                        default: 'blues'
                    }),
                    value: PicoEd2Music.BLUES
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.birthday',
                        default: 'birthday'
                    }),
                    value: PicoEd2Music.BIRTHDAY
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.wedding',
                        default: 'wedding'
                    }),
                    value: PicoEd2Music.WEDDING
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.funeral',
                        default: 'funeral'
                    }),
                    value: PicoEd2Music.FUNERAL
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.punchline',
                        default: 'punchline'
                    }),
                    value: PicoEd2Music.PUNCHLINE
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.python',
                        default: 'python'
                    }),
                    value: PicoEd2Music.PYTHON
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.baddy',
                        default: 'baddy'
                    }),
                    value: PicoEd2Music.BADDY
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.chase',
                        default: 'chase'
                    }),
                    value: PicoEd2Music.CHASE
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.baDing',
                        default: 'ba ding'
                    }),
                    value: PicoEd2Music.BA_DING
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.wawawawaa',
                        default: 'wawawawaa'
                    }),
                    value: PicoEd2Music.WAWAWAWAA
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.jumpUp',
                        default: 'jump up'
                    }),
                    value: PicoEd2Music.JUMP_UP
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.jumpDown',
                        default: 'jump down'
                    }),
                    value: PicoEd2Music.JUMP_DOWN
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.powerUp',
                        default: 'power up'
                    }),
                    value: PicoEd2Music.POWER_UP
                },
                {
                    text: formatMessage({
                        id: 'picoed2.musicMenu.powerDown',
                        default: 'power down'
                    }),
                    value: PicoEd2Music.POWER_DOWN
                }
            ];
        }

        get PIN_MODE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'picoed2.pinModeMenu.none',
                        default: 'none'
                    }),
                    value: PicoEd2PinMode.NONE
                },
                {
                    text: formatMessage({
                        id: 'picoed2.pinModeMenu.up',
                        default: 'pull up'
                    }),
                    value: PicoEd2PinMode.UP
                },
                {
                    text: formatMessage({
                        id: 'picoed2.pinModeMenu.down',
                        default: 'pull down'
                    }),
                    value: PicoEd2PinMode.DOWN
                }
            ];
        }
        
        get ANALOG_PINS_MENU () {
            const pins = this.pinsMap();
            return [
                { text: 'P0', value: `${pins[0]}` },
                { text: 'P1', value: `${pins[1]}` },
                { text: 'P2', value: `${pins[2]}` },
                { text: 'P3', value: `${pins[3]}` },
            ];
        };

        get DIGITAL_PINS_MENU () {
            return Object.entries(this.pinsMap()).map(([key, value]) => ({
                text: `P${key}`,
                value: `${value}`
            }));
        };

        get DIGITAL_VALUE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'picoed2.digitalValueMenu.low',
                        default: 'low'
                    }),
                    value: PicoEd2DigitalValue.LOW
                },
                {
                    text: formatMessage({
                        id: 'picoed2.digitalValueMenu.high',
                        default: 'high'
                    }),
                    value: PicoEd2DigitalValue.HIGH
                },
            ];
        }

        get INTERRUPT_EVENTS_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'picoed2.interruptEventsMenu.falling',
                        default: 'falling'
                    }),
                    value: PicoEd2InterruptEvent.FALLING
                },
                {
                    text: formatMessage({
                        id: 'picoed2.interruptEventsMenu.rising',
                        default: 'rising'
                    }),
                    value: PicoEd2InterruptEvent.RISING
                },
                {
                    text: formatMessage({
                        id: 'picoed2.digitalValueMenu.low',
                        default: 'low'
                    }),
                    value: PicoEd2InterruptEvent.LOW_LEVEL
                },
                {
                    text: formatMessage({
                        id: 'picoed2.digitalValueMenu.high',
                        default: 'high'
                    }),
                    value: PicoEd2InterruptEvent.HIGH_LEVEL
                },
                {
                    text: formatMessage({
                        id: 'picoed2.interruptEventsMenu.change',
                        default: 'change'
                    }),
                    value: PicoEd2InterruptEvent.CHANGE
                },
            ];
        }

        constructor () {
            this.runtime = Scratch.vm.runtime;
            this._peripheral = new PicoEd2(this.runtime, PicoEd2Blocks.EXTENSION_ID);
            this.runtime.on('PROJECT_STOP_ALL', () => this.send('.reset', '\r\nsoft reset\r\n'));
            this.runtime.on('PROJECT_STOP_ALL', this.stopMusic.bind(this));
        }

        // board services
        async put (files) {
            if (this._peripheral.isConnected()) {
                this.runtime.emit('EXTENSION_DATA_DOWNLOADING', true);
                try {
                    // put files...
                    for (const [filename, content] of files) {
                        await this._peripheral.put(filename, content);
                    }
                } catch (e) {
                    this._peripheral._serial._handleRequestError(e);
                } finally {
                    this.runtime.emit('EXTENSION_DATA_DOWNLOADING', false);
                }
            } else {
                this._peripheral._files = this._peripheral._files.concat(files);
            }
        }

        run (code) {
            return this._peripheral.run(code);
        }

        send (command, waitFor) {
            return this._peripheral.send(command, waitFor);
        }

        pinsMap () {
            return {
                0: 26,
                1: 27,
                2: 28,
                3: 29,
                4: 4,
                5: 5,
                6: 6,
                7: 7,
                8: 8,
                9: 9,
                10: 10,
                11: 11,
                12: 12,
                13: 13,
                14: 14,
                15: 15,
                16: 16,
                19: 19,
                20: 18,
            };
        }

        getInfo () {
            const locale = formatMessage.setup().locale;
            this._peripheral.setupAddon(
                PicoEd2Blocks.EXTENSION_ID,
                PicoEd2Blocks.EXTENSION_NAME,
                () => this._peripheral.send('.hi')
            );
            return {
                id: PicoEd2Blocks.EXTENSION_ID,
                name: PicoEd2Blocks.EXTENSION_NAME,
                blockIconURI: blockIconURI,
                showStatusButton: true,
                docsURI: require.resolve(`readme.${locale}.html`),
                blocks: [
                    {
                        opcode: 'setLEDState',
                        text: formatMessage({
                            id: 'picoed2.setLEDState',
                            default: 'set LED [STATE]'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            STATE: {
                                type: ArgumentType.STRING,
                                menu: 'ledState',
                                defaultValue: PicoEd2LEDState.ON
                            }
                        }
                    },
                    {
                        opcode: 'toggleLED',
                        text: formatMessage({
                            id: 'picoed2.toggleLEDState',
                            default: 'toggle LED'
                        }),
                        blockType: BlockType.COMMAND
                    },
                    '---',
                    {
                        opcode: 'whenButtonPressed',
                        text: formatMessage({
                            id: 'picoed2.whenButtonPressed',
                            default: 'when [BTN] button pressed'
                        }),
                        blockType: BlockType.HAT,
                        arguments: {
                            BTN: {
                                type: ArgumentType.STRING,
                                menu: 'buttons',
                                defaultValue: PicoEd2Buttons.A
                            }
                        }
                    },
                    {
                        opcode: 'isButtonPressed',
                        text: formatMessage({
                            id: 'picoed2.isButtonPressed',
                            default: '[BTN] button pressed?'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            BTN: {
                                type: ArgumentType.STRING,
                                menu: 'buttons',
                                defaultValue: PicoEd2Buttons.A
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'displayText',
                        text: formatMessage({
                            id: 'picoed2.displayText',
                            default: 'display text [TEXT] brightness: [BRIGHT]%'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            TEXT: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'picoed2.defaultDisplayText',
                                    default: 'Hello!'
                                })
                            },
                            BRIGHT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: DEFAULT_BRIGHT
                            }
                        }
                    },
                    {
                        opcode: 'displayImage',
                        text: formatMessage({
                            id: 'picoed2.displayImage',
                            default: 'display image [IMAGE] brightness: [BRIGHT]%'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            IMAGE: {
                                type: ArgumentType.STRING,
                                menu: 'images',
                                defaultValue: PicoEd2Images.NO
                            },
                            BRIGHT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: DEFAULT_BRIGHT
                            }
                        }
                    },
                    {
                        opcode: 'displaySymbol',
                        text: formatMessage({
                            id: 'picoed2.displaySymbol',
                            default: 'display [MATRIX] brightness: [BRIGHT]%'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MATRIX: {
                                type: ArgumentType.MATRIX,
                                defaultValue: DEFAULT_SYMBOL
                            },
                            BRIGHT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: DEFAULT_BRIGHT
                            }
                        }
                    },
                    {
                        opcode: 'setSymbol',
                        text: formatMessage({
                            id: 'picoed2.setSymbol',
                            default: 'set image [MATRIX]'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            MATRIX: {
                                type: ArgumentType.MATRIX,
                                defaultValue: DEFAULT_SYMBOL
                            }
                        }
                    },
                    {
                        opcode: 'displayPixel',
                        text: formatMessage({
                            id: 'picoed2.displayPixel',
                            default: 'display pixel at x: [X] y: [Y] brightness: [BRIGHT]%'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            X: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            Y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            BRIGHT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: DEFAULT_BRIGHT
                            }
                        }
                    },
                    {
                        opcode: 'clearDisplay',
                        text: formatMessage({
                            id: 'picoed2.clearDisplay',
                            default: 'clear display'
                        }),
                        blockType: BlockType.COMMAND
                    },
                    '---',
                    {
                        opcode: 'playMusicAndWait',
                        text: formatMessage({
                            id: 'picoed2.playMusicAndWait',
                            default: 'play music [MUSIC] until done'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MUSIC: {
                                type: ArgumentType.STRING,
                                menu: 'music',
                                defaultValue: PicoEd2Music.DADADADUM
                            }
                        }
                    },
                    {
                        opcode: 'playMusic',
                        text: formatMessage({
                            id: 'picoed2.playMusic',
                            default: 'play music [MUSIC]'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MUSIC: {
                                type: ArgumentType.STRING,
                                menu: 'music',
                                defaultValue: PicoEd2Music.DADADADUM
                            }
                        }
                    },
                    {
                        opcode: 'playTone',
                        text: formatMessage({
                            id: 'picoed2.playTone',
                            default: 'play tone [NOTE] for [DURATION] seconds',
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            NOTE: {
                                type: ArgumentType.NOTE,
                                defaultValue: 60
                            },
                            DURATION: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0.25
                            }
                        }
                    },
                    {
                        opcode: 'stopMusic',
                        text: formatMessage({
                            id: 'picoed2.stopMusic',
                            default: 'stop music'
                        }),
                        blockType: BlockType.COMMAND
                    },
                    '---',
                    {
                        opcode: 'analogValue',
                        text: formatMessage({
                            id: 'picoed2.analogValue',
                            default: 'analog value of pin [PIN]'
        
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.NUMBER,
                                menu: 'analogPins',
                                defaultValue: this.ANALOG_PINS_MENU[0].value
                            }
                        }
                    },
                    {
                        opcode: 'setPullMode',
                        text: formatMessage({
                            id: 'picoed2.setPullMode',
                            default: 'set pin [PIN] to input [MODE]',
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.NUMBER,
                                menu: 'digitalPins',
                                defaultValue: this.DIGITAL_PINS_MENU[0].value
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'pinModes',
                                defaultValue: PicoEd2PinMode.NONE
                            }
                        }
                    },
                    {
                        opcode: 'isPinHigh',
                        text: formatMessage({
                            id: 'picoed2.isPinHigh',
                            default: '[PIN] pin is high?'
        
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: {
                                type: ArgumentType.NUMBER,
                                menu: 'digitalPins',
                                defaultValue: this.DIGITAL_PINS_MENU[0].value
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'setAnalogValue',
                        text: formatMessage({
                            id: 'picoed2.setAnalogValue',
                            default: 'set pin [PIN] analog [VALUE] %',
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.NUMBER,
                                menu: 'analogPins',
                                defaultValue: this.ANALOG_PINS_MENU[0].value
                            },
                            VALUE: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'setDigitalValue',
                        text: formatMessage({
                            id: 'picoed2.setDigitalValue',
                            default: 'set pin [PIN] digital [VALUE]',
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.NUMBER,
                                menu: 'digitalPins',
                                defaultValue: this.DIGITAL_PINS_MENU[0].value
                            },
                            VALUE: {
                                type: ArgumentType.STRING,
                                menu: 'digitalValues',
                                defaultValue: PicoEd2DigitalValue.LOW
                            }
                        }
                    },
                    {
                        opcode: 'toggleDigitalValue',
                        text: formatMessage({
                            id: 'picoed2.toggleDigitalValue',
                            default: 'toggle pin [PIN] digital',
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.NUMBER,
                                menu: 'digitalPins',
                                defaultValue: this.DIGITAL_PINS_MENU[0].value
                            },
                        }
                    },
                    {
                        opcode: 'setServoAngle',
                        text: formatMessage({
                            id: 'picoed2.setServoAngle',
                            default: 'set pin [PIN] servo angle [ANGLE]',
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.NUMBER,
                                menu: 'digitalPins',
                                defaultValue: this.DIGITAL_PINS_MENU[0].value
                            },
                            ANGLE: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 90
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'listenEvent',
                        text: formatMessage({
                            id: 'picoed2.listenEvent',
                            default: 'listen event on [PIN]'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.NUMBER,
                                menu: 'digitalPins',
                                defaultValue: this.DIGITAL_PINS_MENU[0].value
                            }
                        }
                    },
                    {
                        opcode: 'whenCatchEvent',
                        text: formatMessage({
                            id: 'picoed2.whenCatchEvent',
                            default: 'when catch [EVENT] at pin [PIN]',
                        }),
                        blockType: BlockType.HAT,
                        arguments: {
                            EVENT: {
                                type: ArgumentType.STRING,
                                menu: 'interruptEvents',
                                defaultValue: this.INTERRUPT_EVENTS_MENU[0].value
                            },
                            PIN: {
                                type: ArgumentType.NUMBER,
                                menu: 'digitalPins',
                                defaultValue: this.DIGITAL_PINS_MENU[0].value
                            }
                        }
                    },
                    {
                        opcode: 'isCatchEvent',
                        text: formatMessage({
                            id: 'picoed2.isCatchEvent',
                            default: 'catch [EVENT] at pin [PIN]',
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            EVENT: {
                                type: ArgumentType.STRING,
                                menu: 'interruptEvents',
                                defaultValue: this.INTERRUPT_EVENTS_MENU[0].value
                            },
                            PIN: {
                                type: ArgumentType.NUMBER,
                                menu: 'digitalPins',
                                defaultValue: this.DIGITAL_PINS_MENU[0].value
                            }
                        }
                    },
                    {
                        opcode: 'stopListen',
                        text: formatMessage({
                            id: 'picoed2.stopListen',
                            default: 'stop listen on [PIN]'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.NUMBER,
                                menu: 'digitalPins',
                                defaultValue: this.DIGITAL_PINS_MENU[0].value
                            }
                        }
                    },
                ],
                menus: {
                    ledState: {
                        acceptReporters: false,
                        items: this.LED_STATE_MENU
                    },
                    buttons: {
                        acceptReporters: false,
                        items: this.BUTTONS_MENU
                    },
                    images: {
                        acceptReporters: false,
                        items: this.IMAGES_MENU
                    },
                    music: {
                        acceptReporters: false,
                        items: this.MUSIC_MENU
                    },
                    analogPins: {
                        acceptReporters: false,
                        items: this.ANALOG_PINS_MENU
                    },
                    digitalPins: {
                        acceptReporters: false,
                        items: this.DIGITAL_PINS_MENU
                    },
                    pinModes: {
                        acceptReporters: false,
                        items: this.PIN_MODE_MENU
                    },
                    digitalValues: {
                        acceptReporters: true,
                        items: this.DIGITAL_VALUE_MENU
                    },
                    interruptEvents: {
                        acceptReporters: false,
                        items: this.INTERRUPT_EVENTS_MENU
                    }
                }
            }
        }

        async setLEDState (args) {
            const state = Cast.toString(args.STATE);
            await this._peripheral.led(state);
        }

        async toggleLED () {
            await this._peripheral.toggle();
        }

        whenButtonPressed (args) {
            return this.isButtonPressed(args) === true;    
        }

        async isButtonPressed (args) {
            const btn = Cast.toString(args.BTN);
            switch (btn) {
            case PicoEd2Buttons.A:
                return await this._peripheral.isPressedA();
            case PicoEd2Buttons.B:
                return await this._peripheral.isPressedB();
            default:
                return await this._peripheral.isPressedA() || await this._peripheral.isPressedB();
            }
        }

        async displaySymbol (args) {
            const bright = Math.floor(MathUtil.clamp(Cast.toNumber(args.BRIGHT), 0, 100) / 100 * 255);
            let symbol = Cast.toString(args.MATRIX).replace(/\s/g, '');
            if (!symbol.includes(':')) {
                const rows = [];
                for (let i = 0; i < 7; i++) {
                    const start = i * 17;
                    const end = start + 17;
                    rows.push(symbol.slice(start, end));
                }
                symbol = rows.join(':');
            }
            await this._peripheral.show(symbol, bright);
        }

        async displayImage (args) {
            let image = Cast.toString(args.IMAGE);
            if (isNumber(image)) {
                const index = parseInt(image) - 1;
                image = this.IMAGES_MENU.at(index % this.IMAGES_MENU.length).value;
            }
            const bright = Math.floor(MathUtil.clamp(Cast.toNumber(args.BRIGHT), 0, 100) / 100 * 255);
            await this._peripheral.show(image, bright);
        }

        async displayText (args) {
            const text = Cast.toString(args.TEXT);
            const bright = Math.floor(MathUtil.clamp(Cast.toNumber(args.BRIGHT), 0, 100) / 100 * 255);
            await this._peripheral.scroll(text, bright);
        }

        async displayPixel (args) {
            const x = MathUtil.clamp(Cast.toNumber(args.X), 1, 17) - 1;
            const y = MathUtil.clamp(Cast.toNumber(args.Y), 1, 7) - 1;
            const bright = Math.floor(MathUtil.clamp(Cast.toNumber(args.BRIGHT), 0, 100) / 100 * 255);
            await this._peripheral.pixel(x, y, bright);
        }

        async clearDisplay () {
            await this._peripheral.clear();
        }

        setSymbol (args) {
            return Cast.toString(args.MATRIX).replace(/\s/g, '');
        }

        async playMusicAndWait (args) {
            let music = Cast.toString(args.MUSIC);
            if (isNumber(music)) {
                const index = parseInt(music) - 1;
                music = this.MUSIC_MENU.at(index % this.MUSIC_MENU.length).value;
            }
            await this._peripheral.playAndWait(music);
        }

        async playMusic (args) {
            let music = Cast.toString(args.MUSIC);
            if (isNumber(music)) {
                const index = parseInt(music) - 1;
                music = this.MUSIC_MENU.at(index % this.MUSIC_MENU.length).value;
            }
            await this._peripheral.play(music);
        }

        async playTone (args) {
            let note = Cast.toNumber(args.NOTE);
            note = MathUtil.clamp(note, NOTE_RANGE.min, NOTE_RANGE.max);
            const duration = Cast.toNumber(args.DURATION);
            await this._peripheral.playTone(note, duration);
        }

        async stopMusic () {
            await this._peripheral.stop();
        }

        async analogValue (args) {
            const pin = Cast.toNumber(args.PIN);
            return await this._peripheral.getPinValue(pin);
        }

        async setPullMode (args) {
            const pin = Cast.toNumber(args.PIN);
            const mode = Cast.toString(args.MODE);
            await this._peripheral.setPinMode(pin, mode);
        }

        async isPinHigh (args) {
            const pin = Cast.toNumber(args.PIN);
            return await this._peripheral.isPinHigh(pin);
        }

        async setDigitalValue (args) {
            const pin = Cast.toNumber(args.PIN);
            const value = Cast.toString(args.VALUE);
            await this._peripheral.setPinValue(pin, value);
        }

        async toggleDigitalValue (args) {
            const pin = Cast.toNumber(args.PIN);
            await this._peripheral.setPinValue(pin);
        }

        async setAnalogValue (args) {
            const pin = Cast.toNumber(args.PIN);
            const value = Cast.toNumber(args.VALUE) / 100;
            await this._peripheral.setPinValue(pin, value);
        }

        async setServoAngle (args) {
            const pin = Cast.toNumber(args.PIN);
            let angle = Cast.toNumber(args.ANGLE);
            angle = MathUtil.clamp(angle, SERVO_ANGLE_RANGE.min, SERVO_ANGLE_RANGE.max);
            await this._peripheral.setServoAngle(pin, angle);
        }

        async listenEvent (args) {
            const pin = Cast.toNumber(args.PIN);
            await this._peripheral.setupWatcher(pin);
        }

        whenCatchEvent (args) {
            return this.isCatchEvent(args);
        }

        isCatchEvent (args) {
            const pin = Cast.toNumber(args.PIN);
            const event = Cast.toString(args.EVENT);
            return this._peripheral.checkPinEvent(pin, event);
        }

        async stopListen (args) {
            const pin = Cast.toNumber(args.PIN);
            await this._peripheral.stopWatch(pin);
        }
    }

    Scratch.extensions.register(new PicoEd2Blocks());

    // all translations
    Scratch.extensions.translations(translations);
})(Scratch, require);
