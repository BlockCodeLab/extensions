(async function (Scratch) {
    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const Cast = Scratch.Cast;
    const formatMessage = Scratch.formatMessage;
    const MathUtil = Scratch.MathUtil;
    const log = Scratch.log;

    const LibraryFiles = await Scratch.require('./files.js');

    // all translations
    const translations = await Scratch.require('./translations.js');
    Scratch.extensions.translations(translations);

    // eslint-disable-next-line max-len
    const blockIconURI = 'data:image/png;base64,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';

    const delay = d => new Promise(r => setTimeout(r, d));
    const extensionData = await Scratch.vm.extensionManager.fetchExtensionData();
    
    const REQUIRE_FILE_CODE = `function (f){return eval(new TextDecoder().decode(require('fs').readFile(f)))}`

    const WAIT_FOR_PROMPT = '\x1B[0m\r\x1B7> ';
    const WAIT_FOR_UNDEFINED = `\r\n\x1B[90mundefined\x1B[0m\r\n${WAIT_FOR_PROMPT}`;
    const WAIT_FOR_FUNCTION = `\r\n\x1B[96m[Function]\x1B[0m\r\n${WAIT_FOR_PROMPT}`;
    const WAIT_FOR_PROMISE = `\r\n\x1B[96m[Promise]\x1B[0m\r\n${WAIT_FOR_PROMPT}`;

    // supported boards
    const RPIPICO = 'rpipico';
    const PICOED2 = 'picoed2';
    const SUPPORTED_BOARDS = [RPIPICO, PICOED2];
    // boards' pins
    const RPIPICO_PINS = {
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
        29: 29
    };
    const PICOED2_PINS = {
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
        20: 18
    };
    
    const WIDTH = [135, 240, 320];
    const HEIGHT = [135, 240];
    const BACKLIGHT_STATE = {
        ON: 'on',
        OFF: 'off'
    };
    const DISPLAY_ROTATION = {
        UP: '0',
        RIGHT: '1',
        DOWN: '2',
        LEFT: '3'
    };
    const DISPLAY_MODE = {
        DIRECT: 'direct',
        BUFFER: 'buffer'
    };

    class ST7789DisplayBlocks {
        static get EXTENSION_ID () {
            return 'st7789Display';
        }

        static get PINS () {
            return {
                [RPIPICO]: RPIPICO_PINS,
                [PICOED2]: PICOED2_PINS
            };
        }

        constructor () {
            this.runtime = Scratch.vm.runtime;

            this.reset();

            this.init = this.init.bind(this);
            this.reset = this.reset.bind(this);
            this.runtime.on('SELECT_BOARD', this.init);
            this.runtime.on('PROJECT_STOP_ALL', this.reset);
            this.runtime.on('PERIPHERAL_DISCONNECTED', this.reset);
        }

        async init (extensionId, boardId) {
            if (extensionId === ST7789DisplayBlocks.EXTENSION_ID) {
                const boardService = await Scratch.extensions.getService(boardId);
                boardService('put', Object.entries(LibraryFiles));
                this.send = (command, waitFor) => boardService('send', command, waitFor);
                this.pin = pin => ST7789DisplayBlocks.PINS[boardId][pin] || -1;
            };
        }

        reset () {
            this.option = {
                width: 240,
                height: 240,
                rotation: 0,
                bus: 0,
                sck: -1,
                mosi: -1,
                dc: -1,
                cs: -1,
                rst: -1,
                bl: -1,
                displayMode: DISPLAY_MODE.DIRECT
            };
            this.st7789 = null;
        }

        get DISPLAY_MODE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'st7789Display.direct',
                        default: 'direct'
                    }),
                    value: DISPLAY_MODE.DIRECT
                },
                {
                    text: formatMessage({
                        id: 'st7789Display.buffer',
                        default: 'buffer'
                    }),
                    value: DISPLAY_MODE.BUFFER
                }
            ];
        }

        get WIDTH_MENU () {
            return WIDTH.map(value => ({
                text: `${value}`,
                value
            }));
        }

        get HEIGHT_MENU () {
            return HEIGHT.map(value => ({
                text: `${value}`,
                value
            }));
        }

        get DISPLAY_ROTATION_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'st7789Display.rotationUp',
                        default: 'up'
                    }),
                    value: DISPLAY_ROTATION.UP
                },
                {
                    text: formatMessage({
                        id: 'st7789Display.rotationLeft',
                        default: 'left'
                    }),
                    value: DISPLAY_ROTATION.LEFT
                },
                {
                    text: formatMessage({
                        id: 'st7789Display.rotationDown',
                        default: 'down'
                    }),
                    value: DISPLAY_ROTATION.DOWN
                },
                {
                    text: formatMessage({
                        id: 'st7789Display.rotationRight',
                        default: 'right'
                    }),
                    value: DISPLAY_ROTATION.RIGHT
                }
            ];
        }

        get BACKLIGHT_STATE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'st7789Display.on',
                        default: 'on'
                    }),
                    value: BACKLIGHT_STATE.ON
                },
                {
                    text: formatMessage({
                        id: 'st7789Display.off',
                        default: 'off'
                    }),
                    value: BACKLIGHT_STATE.OFF
                }
            ];
        }

        getInfo () {
            return {
                id: ST7789DisplayBlocks.EXTENSION_ID,
                name: formatMessage({
                    id: 'st7789Display.name',
                    default: 'ST7789 Display'
                }),
                boards: SUPPORTED_BOARDS,
                blockIconURI,
                blocks: [
                    {
                        opcode: 'setSPI',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.setSPI',
                            default: 'set SPI bus [BUS] and SCK [SCK] MOSI [MOSI]'
                        }),
                        arguments: {
                            BUS: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            SCK: {
                                type: ArgumentType.NUMBER,
                                defaultValue: -1
                            },
                            MOSI: {
                                type: ArgumentType.NUMBER,
                                defaultValue: -1
                            }
                        }
                    },
                    {
                        opcode: 'setPins',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.setPins',
                            default: 'set control pins DC [DC] CS [CS] reset [RST] and backlight [BL]'
                        }),
                        arguments: {
                            DC: {
                                type: ArgumentType.NUMBER,
                                defaultValue: -1
                            },
                            CS: {
                                type: ArgumentType.NUMBER,
                                defaultValue: -1
                            },
                            RST: {
                                type: ArgumentType.NUMBER,
                                defaultValue: -1
                            },
                            BL: {
                                type: ArgumentType.NUMBER,
                                defaultValue: -1
                            },
                        }
                    },
                    {
                        opcode: 'setResolution',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.setResolution',
                            default: 'set display width [WIDTH] and height [HEIGHT]'
                        }),
                        arguments: {
                            WIDTH: {
                                type: ArgumentType.NUMBER,
                                menu: 'width',
                                defaultValue: 240
                            },
                            HEIGHT: {
                                type: ArgumentType.NUMBER,
                                menu: 'height',
                                defaultValue: 240
                            }
                        }
                    },
                    {
                        opcode: 'setRotation',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.setRotation',
                            default: 'set display rotation [ROTATION]'
                        }),
                        arguments: {
                            ROTATION: {
                                type: ArgumentType.STRING,
                                menu: 'displayRotation',
                                defaultValue: DISPLAY_ROTATION.UP
                            },
                        }
                    },
                    {
                        opcode: 'setBacklight',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.setBacklight',
                            default: 'set display backlight [STATE]'
                        }),
                        arguments: {
                            STATE: {
                                type: ArgumentType.STRING,
                                menu: 'backlightState',
                                defaultValue: BACKLIGHT_STATE.OFF
                            },
                        }

                    },
                    '---',
                    {
                        opcode: 'setMode',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.setMode',
                            default: 'set display mode [MODE]'
                        }),
                        arguments: {
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'displayMode',
                                defaultValue: DISPLAY_MODE.BUFFER
                            },
                        }
                    },
                    {
                        opcode: 'displayBuffer',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.displayBuffer',
                            default: 'display buffer'
                        }),
                    },
                    '---',
                    {
                        opcode: 'clearScreen',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.clearScreen',
                            default: 'clear screen'
                        })
                    },
                    {
                        opcode: 'fillScreen',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.fillScreen',
                            default: 'set screen color to [COLOR]'
                        }),
                        arguments: {
                            COLOR: {
                                type: ArgumentType.COLOR
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'setPixel',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.setPixel',
                            default: 'set pixel x: [X] y: [Y] color to [COLOR]'
                        }),
                        arguments: {
                            X: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            COLOR: {
                                type: ArgumentType.COLOR
                            }
                        }
                    },
                    {
                        opcode: 'setPenColor',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.setColor',
                            default: 'set pen color to [COLOR]'
                        }),
                        arguments: {
                            COLOR: {
                                type: ArgumentType.COLOR
                            }
                        }
                    },
                    {
                        opcode: 'setFillColor',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.setFillColor',
                            default: 'set fill color to [COLOR]'
                        }),
                        arguments: {
                            COLOR: {
                                type: ArgumentType.COLOR
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'drawLine',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.drawLine',
                            default: 'draw line from x1: [X1] y1: [Y1] to x2: [X2] y2: [Y2]'
                        }),
                        arguments: {
                            X1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            X2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            Y2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                        }
                    },
                    {
                        opcode: 'drawRect',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.drawRect',
                            default: 'draw rectangle at x: [X] y: [Y] of width: [WIDTH] height: [HEIGHT]'
                        }),
                        arguments: {
                            X: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            WIDTH: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            HEIGHT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 50
                            },
                        }
                    },
                    {
                        opcode: 'fillRect',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.fillRect',
                            default: 'fill rectangle at x: [X] y: [Y] of width: [WIDTH] height: [HEIGHT]'
                        }),
                        arguments: {
                            X: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            WIDTH: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            HEIGHT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 50
                            },
                        }
                    },
                    {
                        opcode: 'drawCircle',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.drawCircle',
                            default: 'draw circle at x: [X] y: [Y] of radius: [R]'
                        }),
                        arguments: {
                            X: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            R: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 50
                            }
                        }
                    },
                    {
                        opcode: 'fillCircle',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.fillCircle',
                            default: 'fill circle at x: [X] y: [Y] of radius: [R]'
                        }),
                        arguments: {
                            X: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            R: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 50
                            }
                        }
                    },
                    {
                        opcode: 'drawRoundRect',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.drawRoundRect',
                            default: 'draw round rectangle at x: [X] y: [Y] of width: [WIDTH] height: [HEIGHT] and radius: [R]'
                        }),
                        arguments: {
                            X: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            WIDTH: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            HEIGHT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 50
                            },
                            R: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 5
                            }
                        }
                    },
                    {
                        opcode: 'fillRoundRect',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'st7789Display.fillRoundRect',
                            default: 'fill round rectangle at x: [X] y: [Y] of width: [WIDTH] height: [HEIGHT] and radius: [R]'
                        }),
                        arguments: {
                            X: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            WIDTH: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            HEIGHT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 50
                            },
                            R: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 5
                            }
                        }
                    },
                ],
                menus: {
                    width: {
                        acceptReporters: false,
                        items: this.WIDTH_MENU
                    },
                    height: {
                        acceptReporters: false,
                        items: this.HEIGHT_MENU
                    },
                    backlightState: {
                        acceptReporters: false,
                        items: this.BACKLIGHT_STATE_MENU
                    },
                    displayRotation: {
                        acceptReporters: false,
                        items: this.DISPLAY_ROTATION_MENU
                    },
                    displayMode: {
                        acceptReporters: false,
                        items: this.DISPLAY_MODE_MENU
                    }
                }
            }
        }

        async getDevice () {
            if (!this.send) return;

            const {
                width,
                height,
                bus,
                sck,
                mosi,
                dc,
                cs,
                rst,
                bl
            } = this.option;
            const varName = `display_${bus}_${sck}_${mosi}`;

            if (sck === -1 || mosi === -1 || dc === -1 || cs === -1 || rst === -1) {
                return;
            }

            if (this.st7789) {
                if (this.st7789.name === varName) {
                    return this.st7789;
                } else {
                    this.st7789 = null;
                }
            } else {
                await this.send(`const ST7789 = (${REQUIRE_FILE_CODE})('./st7789.js')`, WAIT_FOR_UNDEFINED);
            }

            await this.send(`const ${varName} = new ST7789()`, WAIT_FOR_UNDEFINED);

            const spiConfig = JSON.stringify({
                baudrate: 40000000,
                miso: -1,
                sck,
                mosi
            });
            const config = JSON.stringify({
                rotation: 0,
                width,
                height,
                dc,
                cs,
                rst,
                bl,
            });
            await this.send(`${varName}.setup(board.spi(${bus}, ${spiConfig}), ${config})`, WAIT_FOR_UNDEFINED);
            delay(100);

            const sendCommand = this.send.bind(this);
            const option = this.option;
            this.st7789 = {
                get name () {
                    return varName;
                },
                get gc () {
                    return `${this.name}.getContext('${option.displayMode}')`;
                },
                on () {
                    if (bl === -1) return;
                    return sendCommand(`${this.name}.on()`, WAIT_FOR_UNDEFINED);
                },
                off () {
                    if (bl === -1) return;
                    return sendCommand(`${this.name}.off()`, WAIT_FOR_UNDEFINED);
                },
                send (command) {
                    return sendCommand(`${this.gc}.${command}`, WAIT_FOR_UNDEFINED);
                },
                color16 (r, g, b) {
                    return `${this.gc}.color16(${r},${g},${b})`;
                }
            };

            // clear screen
            await this.st7789.send('clearScreen()');
            // turn on backlight
            await this.st7789.on();

            return this.st7789;
        }

        setSPI (args) {
            this.option.bus = Cast.toNumber(args.BUS);
            this.option.sck = this.pin(Cast.toNumber(args.SCK));
            this.option.mosi = this.pin(Cast.toNumber(args.MOSI));
        }

        setPins (args) {
            this.option.dc = this.pin(Cast.toNumber(args.DC));
            this.option.cs = this.pin(Cast.toNumber(args.CS));
            this.option.rst = this.pin(Cast.toNumber(args.RST));
            this.option.bl = this.pin(Cast.toNumber(args.BL));
        }

        setResolution (args) {
            this.option.width = Cast.toNumber(args.WIDTH);
            this.option.height = Cast.toNumber(args.HEIGHT);
        }

        async setRotation (args) {
            this.option.rotation = Cast.toNumber(args.ROTATION);
            const device = await this.getDevice();
            if (!device) return;
            await device.send(`setRotation(${this.option.rotation})`);
        }

        async setBacklight (args) {
            const device = await this.getDevice();
            if (!device) return;
            await device[Cast.toString(args.STATE)]();
        }

        setMode (args) {
            this.option.displayMode = Cast.toString(args.MODE);
        }

        async displayBuffer () {
            if (this.option.displayMode !== DISPLAY_MODE.BUFFER) return;
            const device = await this.getDevice();
            if (!device) return;
            await device.send(`display()`);
        }
        
        async clearScreen (args) {
            const device = await this.getDevice();
            if (!device) return;
            await device.send('clearScreen()');
        }
        
        async fillScreen (args) {
            const device = await this.getDevice();
            if (!device) return;
            const {r, g, b} = Cast.toRgbColorObject(args.COLOR);
            const color = device.color16(r, g, b);
            await device.send(`fillScreen(${color})`);
        }
        
        async setPixel (args) {
            const device = await this.getDevice();
            if (!device) return;
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            const {r, g, b} = Cast.toRgbColorObject(args.COLOR);
            const color = device.color16(r, g, b);
            await device.send(`setPixel(${x},${y},${color})`);
        }
        
        async setPenColor (args) {
            const device = await this.getDevice();
            if (!device) return;
            const {r, g, b} = Cast.toRgbColorObject(args.COLOR);
            const color = device.color16(r, g, b);
            await device.send(`setColor(${color})`);
        }
        
        async setFillColor (args) {
            const device = await this.getDevice();
            if (!device) return;
            const {r, g, b} = Cast.toRgbColorObject(args.COLOR);
            const color = device.color16(r, g, b);
            await device.send(`setFillColor(${color})`);
        }
        
        async drawLine (args) {
            const device = await this.getDevice();
            if (!device) return;
            const x1 = Cast.toNumber(args.X1);
            const y1 = Cast.toNumber(args.Y1);
            const x2 = Cast.toNumber(args.X2);
            const y2 = Cast.toNumber(args.Y2);
            await device.send(`drawLine(${x1},${y1},${x2},${y2})`);
        }
        
        async drawRect (args) {
            const device = await this.getDevice();
            if (!device) return;
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            const w = Cast.toNumber(args.WIDTH);
            const h = Cast.toNumber(args.HEIGHT);
            await device.send(`drawRect(${x},${y},${w},${h})`);
        }
        
        async fillRect (args) {
            const device = await this.getDevice();
            if (!device) return;
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            const w = Cast.toNumber(args.WIDTH);
            const h = Cast.toNumber(args.HEIGHT);
            await device.send(`fillRect(${x},${y},${w},${h})`);
        }
        
        async drawCircle (args) {
            const device = await this.getDevice();
            if (!device) return;
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            const r = Cast.toNumber(args.R);
            await device.send(`drawCircle(${x},${y},${r})`);
        }
        
        async fillCircle (args) {
            const device = await this.getDevice();
            if (!device) return;
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            const r = Cast.toNumber(args.R);
            await device.send(`fillCircle(${x},${y},${r})`);
        }
        
        async drawRoundRect (args) {
            const device = await this.getDevice();
            if (!device) return;
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            const w = Cast.toNumber(args.WIDTH);
            const h = Cast.toNumber(args.HEIGHT);
            const r = Cast.toNumber(args.R);
            await device.send(`drawRoundRect(${x},${y},${w},${h},${r})`);
        }
        
        async fillRoundRect (args) {
            const device = await this.getDevice();
            if (!device) return;
            const x = Cast.toNumber(args.X);
            const y = Cast.toNumber(args.Y);
            const w = Cast.toNumber(args.WIDTH);
            const h = Cast.toNumber(args.HEIGHT);
            const r = Cast.toNumber(args.R);
            await device.send(`fillRoundRect(${x},${y},${w},${h},${r})`);
        }
        
    }

    Scratch.extensions.register(new ST7789DisplayBlocks());
})(window.Scratch);
