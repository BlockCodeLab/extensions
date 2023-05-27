(async function (Scratch) {
    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const Cast = Scratch.Cast;
    const MathUtil = Scratch.MathUtil;
    const formatMessage = Scratch.formatMessage;

    const Repl = await Scratch.require('../repl/repl.js');

    // all translations
    const translations = await Scratch.require('./translations.js');
    Scratch.extensions.translations(translations);

    // eslint-disable-next-line max-len
    const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAIv0lEQVR4nO2Zf4xcVRXHP/e+9+bHzu7Ozm53t9t2u+3SBghQtAiaAg0EIaFaY4TEiAQVFdSIJCQQDDWGaFJIJCGYQKoUxMgfRKNYjBBJFFKJgLSURkCJre3SUrrb/TWzOzPvx73HP2YWt3V3dqBbCXg/ySRn5r3zffeed+59Z94Bh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcjlOFanRw4xcv+SGaa3ylPAAjYrRCK6WUETEKtEYpg1gFKIUnghFA12wrYLXCR7BWsJ5WHgKJiPGU8tQsXRTaCokCrRRaBEMDXQ/lCSJWsJ5SHgoSK8ab0bIkStW06rpqRgtAo7RFrIB4SnkiIrauW5svMWIfe/YXz94xX4z8RgFMQnu576nVXkEhQCIKrUADpm57gBWFAnwFidR8g7pt6rap+3hKEADReEpQQCIarQQNRFLT91XNntGK67avwNR1PQUWVR/L8VoeEM7SCqWWLcE7uvWxSG1u/9ECXU+reMxCxIZGMWoYQASlCx73bh5mOFZcf6SNrd1TnJk2fPmtNq5uC/lCPuSrR9pYkzL8oHua24628naieGxFkXtGW9hRSvPHgXGemk5z69Ecz62a4GCi+fRQB7/vn6DgWa4c6uDu3ikubknYPJRnc1vILZ1lbjjShq/ggaUl7jyW4/XQ4+FlJR4rptk+meVXyyfZW/W56Wgrv14+ydJAOHd/Jz9fVmRjS8RFBzv5er7C1woVLh/qYEM2ZsuSaW56u41QFPf2TvGj0SwvVQPu7yuxq+px57Ec2/tKpHyP7z7RhT1qGoaocQDr7Is0YWKZiIX9kWK5JxxLQERQYjHWMhQqYiMcjuFoogitcCiCkRgmE9hfhZKBIxEcjiGxFi0WhZCI5Y1Qsz4tjBvhQKhIrPBmrMhoIZHab4djRdUI+0JNbGrXRizlBIYTRcnUdA9GMBIoRmJhKIbpRBiJ4U0PqgYORIoez+JhsCIci4UpI7xW9SglUDRC0ehmQtN4D9xw1cYXU93++bvOjjDG4NfTfGY5fZjQCgIEqc8v63us2xtgj5pndj7+7KXz+TWVgT7wve6y+UjGjFWF3N2jLS0vVZpy/UCQUcI3CqG5LBeOxxb94GSm8Ey1pWFyzdBUnp6eTjgvkxzbHQWX/z3yH7m5UP5Q5eCawHBprjr+5FTq6uFY3XFVezjVrG9TAaxYRUaR6SnzVkbZnGm88j9wxCjalAr+VdGH8mkpq3oZ0wxzrsNt27YFhULBv++X92uF5lCS5ulyS/7CjviwiPJuHWlTgdLE1iywi747tCjUArktCuxCJ71L3og8Hi2m89/qrr42ZZV+aCLT9P4054l79uy5b3p6+pNdtmNpq2rl413nECHsNTaYtJor8nAoGuHJ4i4qNlq0iaw8mCZX9kDNfVeUQLE9YWhFddGuCSDA9okMO0qplKVWY+Z925TvnAGcnJzcYK1d09+3gv7+ftbl1x133BjDK+X9PF3ac5JDP572UsBbfVWK7XPXXoUJnyXHUot6zdmMGM2m1oh7eqYoqYCb93S/U1TPx7yp2tXVxdatW2ltbf2vY7t37+aVfftPesBzEQdClJr77se+LOqWMRfDiebl0MdqDxFYKA8/PLXIIvFS1eeaw+20+B7roLa+G9Bcuf1/xGdbQ3atHue3/ZNoBUpJw5x3ATwBpcBDmg6MW8InsKOU4smpFNnA53QBkcY1kwvgCZyVNny7UAHf4yHVueD58wZwdHSULVu2MDAwwPr16487VqlUTn6k8xDEiiCae9sJErXgpn6yDASGS3IRRVI8zMJ74JwBzOfzz5fL5bYDhw/0jEZjubFlBoXQroUp0cQCQ+EwiTR+V/ZumWpL6B1O0zNPracsTLUu7jVn066FP5cDLj5QoCXw6H2vS3jz5s3fGRsbS2/bsf1PJZle/4fRw9yQL3NBLrJlQd023KoORopIkkWdwMH+6sJ/5U7RY+/z7SHX5UMzYeDe8az3ahzQ24TfnMPZtGlTeO211xaNMcZi6fGqfKq1WPrraGXwUJj85tbOcQklRhZ5PRlPSPzGH6MXfw2vDRK+WahM/2w6OC+lufHGjkq5Wd+m7mebZ6kYpipeOjVs9Zu5UzCJ95OMVhRFTXWaxB+LJfah6aXV1FP4H5HH3+Kge2M+fC5UuuWukeZeNn5Q+Geseb4cFD6XD59KRKsHJzK5Zn2bCmAsituHc75PS7egiC2n/D/p/5KKVdx9LJu6R2WXAESiyDZZ4DW1hH/SV+KBpSW0glu6yjy+cpIlnuX2rjK7V49zfibhwmzMy4PjfCIbszpleHVwjKvaQwra8uLqcW7pLBMAO/on+XFv7YXvEysm2TkwQV4LN3dW2LlqnCWe5TNtEa8OjnFWOuH8TMLrg2NcmqvpvrBqnOvyVVb6hr+sGuenfSV8Bdv7ijy6rAjA97un2TkwQYsSvpKvsHdwjF7PckUuYs/qMc7JGC7LRewdHONL+SrLfcvv+ie5vqNKWsEjy4rc1dPcS+mmAvixTMJpaUveg3PShpWBpSeAjIa8LwQa1qYtfb5lIGXpD4RlgWVNytAdwOrAcm7WkvNqheqZWYOHotWDdq/Wk/1oJqE/EDp9OCNtWBoIgynLipTQEwhnpg0rA2F5IJydNvha0e5BTkNWC2tTlgtaEjwUZ6UtZ6QNS3zh9IywMmXp9YXT0pblgbA2MKR17doZDb2BsCIlXJBNaPNq9vpsc+VS467clRft8zw9mFnhIdQa0kG9sR5Jranu1ZveM03rWGq1bmpWYz1db6zHUrNntFKq5hfWdWea4R7HN9ZntGzdNtS+p1Tttxld6v6p+hirovCV4DfQjWfp1rQUqXqTvlprrL/3rpyn1OsEdERVpmeiPfvxZOofqAUlnHVsLlsB0Sw7nmUns7Rn686nxQlac+vKcVqNdKNZPjP+OqNFMuoFHA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwON4X/g0Jcfc+1q+FmwAAAABJRU5ErkJggg==';

    const PRODUCT_ID = 10;
    const VENDOR_ID = 11914;
    
    const FILE_PUT_CODE = `function (fn,fc){require('fs').writeFile(fn,new TextEncoder().encode(fc))}`;

    const WAIT_FOR_PROMPT = '\x1B[0m\r\x1B7> ';
    const WAIT_FOR_UNDEFINED = `\r\n\x1B[90mundefined\x1B[0m\r\n${WAIT_FOR_PROMPT}`;
    const WAIT_FOR_PROMISE = `\r\n\x1B[96m[Promise]\x1B[0m\r\n${WAIT_FOR_PROMPT}`;

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
                    await this._put(filename, content);
                }
                // and setups
                await this._setupLED();
            } catch (e) {
                this._serial._handleRequestError(e);
            } finally {
                this._runtime.emit('EXTENSION_DATA_DOWNLOADING', false);
            }
        }

        async _put (filename, buffer) {
            const uint8 = this._encoder.encode(buffer);
            const safeBuffer = buffer.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'').replaceAll('\n', '\\n');
            const code = `(${FILE_PUT_CODE})('${filename}', '${safeBuffer}');`;
            try {
                await this.write('\r.ls\r', `\r\n${uint8.length}\t${filename}\r\n`, 500);
            } catch (e) {
                await this.write(`\r.rm ${filename}\r`);
                await delay(500);
                await this.write('\r.flash -w\r');
                await delay(500);
                await this.transfer(this._encoder.encode(code));
                await delay(500);
                await this.write('\r.load\r', WAIT_FOR_PROMPT);
                await this.write('\r.flash -e\r', '\r\nFlash has erased\r\n');
            }
        }

        async send (command, waitFor = null) {
            return await this.write(`\r${command.replaceAll('\n', '\\n')}\r`, waitFor);
        }

        /* led */

        async _setupLED () {
            this.state.led = `led_${Date.now()}`;
            await this.send(`const ${this.state.led}=board.led(board.LED)`, WAIT_FOR_UNDEFINED);
        }

        async led (state) {
            await this.send(`${this.state.led}.${state}()`, WAIT_FOR_UNDEFINED);
        }

        async toggle () {
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
            return [
                { text: 'GP26', value: '26' },
                { text: 'GP27', value: '27' },
                { text: 'GP28', value: '28' },
            ];
        };

        get DIGITAL_PINS_MENU () {
            return [
                { text: 'GP0', value: '0' },
                { text: 'GP1', value: '1' },
                { text: 'GP2', value: '2' },
                { text: 'GP3', value: '3' },
                { text: 'GP4', value: '4' },
                { text: 'GP5', value: '5' },
                { text: 'GP6', value: '6' },
                { text: 'GP7', value: '7' },
                { text: 'GP8', value: '8' },
                { text: 'GP9', value: '9' },
                { text: 'GP10', value: '10' },
                { text: 'GP11', value: '11' },
                { text: 'GP12', value: '12' },
                { text: 'GP13', value: '13' },
                { text: 'GP14', value: '14' },
                { text: 'GP15', value: '15' },
                { text: 'GP16', value: '16' },
                { text: 'GP17', value: '17' },
                { text: 'GP18', value: '18' },
                { text: 'GP19', value: '19' },
                { text: 'GP20', value: '20' },
                { text: 'GP21', value: '21' },
                { text: 'GP22', value: '22' },
            ];
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
                        await this._peripheral._put(filename, content);
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

        send (command, waitFor) {
            return this._peripheral.send(command, waitFor);
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
                docsURI: Scratch.require.resolve(`readme.${locale}.html`),
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
    }

    Scratch.extensions.register(new RpiPicoBlocks());
})(window.Scratch);
