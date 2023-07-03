(async function (Scratch, require) {
    const Repl = await require('../repl/repl.js');
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
    const WAIT_FOR_NUMBER = /\r\n\x1B\[95m(\d+)\x1B\[0m\r\n\x1B\[0m\r\x1B7> /m

    const delay = d => new Promise(r => setTimeout(r, d));
    const isNumber = x => !Number.isNaN(Number(x));

    const RpiPicoLEDState = {
        ON: 'on',
        OFF: 'off'
    };
    const RpiPicoPinMode = {
        NONE: 'INPUT',
        DOWN: 'INPUT_PULLDOWN',
        UP: 'INPUT_PULLUP',
        OUTPUT: 'OUTPUT'
    };
    const RpiPicoDigitalValue = {
        LOW: 'LOW',
        HIGH: 'HIGH'
    }
    const RpiPicoInterruptEvent = {
        LOW_LEVEL: 'LOW_LEVEL',
        HIGH_LEVEL: 'HIGH_LEVEL',
        FALLING: 'FALLING',
        RISING: 'RISING',
        CHANGE: 'CHANGE'
    }

    const SERVO_ANGLE_RANGE = {min: 0, max: 180};
    const SERVO_DUTY_RANGE = {min: 0.5, max: 2.5}; // ms, 0~180
    const SERVO_PERIOD = 20; // ms, 50Hz

    class RpiPico extends Repl {
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
                for (const [filename, content] of this._files) {
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

        async _setupLED () {
            this.state.led = `led_${Date.now().toString(36)}`;
            await this.send(`const ${this.state.led}=board.led(board.LED)`, WAIT_FOR_UNDEFINED);
        }

        async led (state) {
            if (typeof this.state.led === 'undefined') {
                await this._setupLED();
            }
            await this.send(`${this.state.led}.${state}()`, WAIT_FOR_UNDEFINED);
        }

        async toggle () {
            if (typeof this.state.led === 'undefined') {
                await this._setupLED();
            }
            await this.send(`${this.state.led}.toggle()`, WAIT_FOR_UNDEFINED);
        }

        /* pins */

        async setPinMode (pin, mode = RpiPicoPinMode.NONE) {
            this.state[pin] = mode;
            await this.send(`pinMode(${pin},${mode})`, WAIT_FOR_UNDEFINED);
        }

        async getPinValue (pin) {
            if (typeof this.state[pin] === 'undefined') {
                await this.setPinMode(pin, RpiPicoPinMode.NONE);
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
                await this.setPinMode(pin, RpiPicoPinMode.NONE);
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
                await this.setPinMode(pin, RpiPicoPinMode.OUTPUT);
            }
            if (this.state[pin] !== RpiPicoPinMode.OUTPUT) {
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
            const falling = `console.log('\n~ pin_${pin}_${RpiPicoInterruptEvent.FALLING}')`;
            const rising = `console.log('\n~ pin_${pin}_${RpiPicoInterruptEvent.RISING}')`;
            const watchFalling = await this.send(`setWatch(()=>${falling},${pin},FALLING,10)`, WAIT_FOR_NUMBER);
            const watchRising = await this.send(`setWatch(()=>${rising},${pin},RISING,10)`, WAIT_FOR_NUMBER);

            if (watchFalling || watchRising) {
                this.state[pin] = {
                    mode: this.state[pin] || RpiPicoPinMode.NONE,
                    id: [watchFalling && watchFalling[1], watchRising && watchRising[1]],
                    value: null
                };
                this.on(
                    new RegExp(`^~ pin_(${pin})_(${RpiPicoInterruptEvent.FALLING}|${RpiPicoInterruptEvent.RISING})$`, 'm'),
                    found => {
                        this.state[pin].value = found[2];
                        setTimeout(() => {
                            if (this.state[pin].value === RpiPicoInterruptEvent.FALLING) {
                                this.state[pin].value = RpiPicoInterruptEvent.LOW_LEVEL;
                            } else if (this.state[pin].value === RpiPicoInterruptEvent.RISING) {
                                this.state[pin].value = RpiPicoInterruptEvent.HIGH_LEVEL;
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
                if (event === RpiPicoInterruptEvent.CHANGE) {
                    return this.state[pin].value === RpiPicoInterruptEvent.FALLING || this.state[pin].value === RpiPicoInterruptEvent.RISING;
                }
                return this.state[pin].value === event;
            }
        }
    }

    class RpiPicoBlocks {
        static get EXTENSION_ID () {
            return 'rpipico';
        }

        static get EXTENSION_NAME () {
            return formatMessage({
                id: 'rpipico.name',
                default: 'RPi Pico'
            });
        }

        get LED_STATE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'rpipico.ledStateMenu.on',
                        default: 'on'
                    }),
                    value: RpiPicoLEDState.ON
                },
                {
                    text: formatMessage({
                        id: 'rpipico.ledStateMenu.off',
                        default: 'off'
                    }),
                    value: RpiPicoLEDState.OFF
                }
            ];
        }

        get PIN_MODE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'rpipico.pinModeMenu.none',
                        default: 'none'
                    }),
                    value: RpiPicoPinMode.NONE
                },
                {
                    text: formatMessage({
                        id: 'rpipico.pinModeMenu.up',
                        default: 'pull up'
                    }),
                    value: RpiPicoPinMode.UP
                },
                {
                    text: formatMessage({
                        id: 'rpipico.pinModeMenu.down',
                        default: 'pull down'
                    }),
                    value: RpiPicoPinMode.DOWN
                }
            ];
        }
        
        get ANALOG_PINS_MENU () {
            const pins = this.pinsMap();
            return [
                { text: 'GP26', value: `${pins[26]}` },
                { text: 'GP27', value: `${pins[27]}` },
                { text: 'GP28', value: `${pins[28]}` },
            ];
        };

        get DIGITAL_PINS_MENU () {
            return Object.entries(this.pinsMap()).map(([key, value]) => ({
                text: `GP${key}`,
                value: `${value}`
            }));
        };

        get DIGITAL_VALUE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'rpipico.digitalValueMenu.low',
                        default: 'low'
                    }),
                    value: RpiPicoDigitalValue.LOW
                },
                {
                    text: formatMessage({
                        id: 'rpipico.digitalValueMenu.high',
                        default: 'high'
                    }),
                    value: RpiPicoDigitalValue.HIGH
                },
            ];
        }

        get INTERRUPT_EVENTS_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'rpipico.interruptEventsMenu.falling',
                        default: 'falling'
                    }),
                    value: RpiPicoInterruptEvent.FALLING
                },
                {
                    text: formatMessage({
                        id: 'rpipico.interruptEventsMenu.rising',
                        default: 'rising'
                    }),
                    value: RpiPicoInterruptEvent.RISING
                },
                {
                    text: formatMessage({
                        id: 'rpipico.digitalValueMenu.low',
                        default: 'low'
                    }),
                    value: RpiPicoInterruptEvent.LOW_LEVEL
                },
                {
                    text: formatMessage({
                        id: 'rpipico.digitalValueMenu.high',
                        default: 'high'
                    }),
                    value: RpiPicoInterruptEvent.HIGH_LEVEL
                },
                {
                    text: formatMessage({
                        id: 'rpipico.interruptEventsMenu.change',
                        default: 'change'
                    }),
                    value: RpiPicoInterruptEvent.CHANGE
                },
            ];
        }

        constructor () {
            this.runtime = Scratch.vm.runtime;
            this._peripheral = new RpiPico(this.runtime, RpiPicoBlocks.EXTENSION_ID);
            this.runtime.on('PROJECT_STOP_ALL', () => this.send('.reset', '\r\nsoft reset\r\n'));
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
                0: 0,
                1: 1,
                2: 2,
                3: 3,
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
                17: 17,
                18: 18,
                19: 19,
                20: 20,
                21: 21,
                22: 22,
                26: 26,
                27: 27,
                28: 28,
            };
        }

        getInfo () {
            const locale = formatMessage.setup().locale;
            this._peripheral.setupAddon(
                RpiPicoBlocks.EXTENSION_ID,
                RpiPicoBlocks.EXTENSION_NAME,
                () => this._peripheral.send('.hi')
            );
            return {
                id: RpiPicoBlocks.EXTENSION_ID,
                name: RpiPicoBlocks.EXTENSION_NAME,
                blockIconURI: blockIconURI,
                showStatusButton: true,
                docsURI: require.resolve(`readme.${locale}.html`),
                blocks: [
                    {
                        opcode: 'setLEDState',
                        text: formatMessage({
                            id: 'rpipico.setLEDState',
                            default: 'set LED [STATE]'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            STATE: {
                                type: ArgumentType.STRING,
                                menu: 'ledState',
                                defaultValue: RpiPicoLEDState.ON
                            }
                        }
                    },
                    {
                        opcode: 'toggleLED',
                        text: formatMessage({
                            id: 'rpipico.toggleLEDState',
                            default: 'toggle LED'
                        }),
                        blockType: BlockType.COMMAND
                    },
                    '---',
                    {
                        opcode: 'analogValue',
                        text: formatMessage({
                            id: 'rpipico.analogValue',
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
                            id: 'rpipico.setPullMode',
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
                                defaultValue: RpiPicoPinMode.NONE
                            }
                        }
                    },
                    {
                        opcode: 'isPinHigh',
                        text: formatMessage({
                            id: 'rpipico.isPinHigh',
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
                            id: 'rpipico.setAnalogValue',
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
                            id: 'rpipico.setDigitalValue',
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
                                defaultValue: RpiPicoDigitalValue.LOW
                            }
                        }
                    },
                    {
                        opcode: 'toggleDigitalValue',
                        text: formatMessage({
                            id: 'rpipico.toggleDigitalValue',
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
                            id: 'rpipico.setServoAngle',
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
                            id: 'rpipico.listenEvent',
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
                            id: 'rpipico.whenCatchEvent',
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
                            id: 'rpipico.isCatchEvent',
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
                            id: 'rpipico.stopListen',
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

    Scratch.extensions.register(new RpiPicoBlocks());

    // all translations
    Scratch.extensions.translations(translations);
})(Scratch, require);
