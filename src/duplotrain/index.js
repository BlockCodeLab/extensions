// https://github.com/bricklife/scratch-lego-bluetooth-extensions/tree/master/scratch-vm/src/extensions/scratch3_duplotrain
(async function (Scratch, require) {
    const Hub = await require('../legoble/hub.js');

    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const Cast = Scratch.Cast;
    const formatMessage = Scratch.formatMessage;

    const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAAx4ExPAAAEl0lEQVR4Ae2bT0jUQRTHZ9xV1/4cMio0aUUqyoQKuniooLBO0amgoi55icLASwpWYkZ2KZKii12KDJSg6JYUVAePGtQSFZLiHzCyQ5pbrk7zdnfW3WXmN7PO+ts/vQX5zW/em3m/99nvvPntz11C8IUEkAASQAJIAAkgASSABJAAEkACSAAJIAEk4B4BahrqzQvCZL77j5DwHDq7bGw+9BXkQxKZzEGpQJWi3L5YoXC345rGQwWaklL4eRX9se59tbGmq423/a6GW3IwVOCS0UUGahWYK0ow5fCtdqf0bqKy/71yP3CaGxXoRMfApqUu3jG/v8ZgOnuX4eEP4UmSFcGOHSsaGfvaRgg7wxgri49EKZ0ghD7ctHHzFdrb+zfeJtrDtbs+MsKqxbnsSAkN+PsHd8hsqr6cUSDAY2zhUjI8SAz6wBYBrEiVkl6FZbGbkp7FE7OWtgaaTeOGFzsDUTas9xNfyeqEgLOzv8jk5DDvC/s0JRjFiYf2kBC76inwsIqKbVxs0cXHGBkd/cTmF+Yp8VA9ZDFf9JgzChTXLd0BhNHh6H83EIAlCqCCwZmYJ7ShL7x8uU/MYNiwroGiZhnGi7mpaqqYD+qabLnGJliGhkktTQ6btUvYbXgAJhKTQS2FU3kpAEvcK20Ak3fNuBgJTbGrJ3RKTmS1TuKW1i6jWpoUMWtrYPJGkXTdy3JaEt2cUlF/1gJcFkLLMCkCtISKABGgJQHL4ahABGhJwHI4KhABWhKwHJ62TyKmnzAsrzfrhuMStnxLrBWoeqpieV05MzxrFQgf7N1+iZiRx1pm0a0VaBYmda/IE+bUx6VjBDxMEDVd95QpaxWYDhBuzJF1CsyWmiqejOveBFSgjpDGjgA1gHRmBKgjpLEjQA0gnRkB6ghp7Mr/C7fceLzU/2FrQuamub35lJQVKtDy/dTeB34eeG4ZIreHb9191DEBVKAjHr1Rq0D9FLntcaez0yiB9ma5GypQzsW4V6lA/nWvaf6NzlXeQh8JzQWNJ8w1x4sNDcpLhtyrag7zn2LRaZWTkwI/wqCSVWtVY/O+Py73MAtZwk4Au2DAuooaVuAplI3N6z7IGXKPJhlmIUtYenMIjvyhIr1ys7uPfwP2YCgUZN9HP9DZ6R95vZwhb1i2oDyA5/X6+MNp8qrt0sk63hAwwS32UtdAPuD67aeng3+Cj/hEB8sq98QG/SeNMDxfse+0Ch5wUCpQQAorsePJWX5ez/92wMYibPl4jG4YUPO62ppOPHCCB/lrAZpAaul4fJf/mvj8yhXFrG5vNd1YXiodNjY+RfreBdjM7z/8Osm99qZTF6SOKXZmMr5yCaeSg7eqsDE0FNrOwRx49nKQVW8po9Vby0npmohYp35Ok8DncRL4MsEFzDg8+tpb5W1MJYaTbybjp0WBkFxrT09RaGjuFi+153i1le7uPNgCx3cfEm49flz6iyInUE62TMVPG0CR3OWObvipVD1X2iFeITZF+tkIV91L3u661nRSeU8l5rA5Zjq+zbXjWCSABJAAEkACSAAJIAEkgASQABJAAkgACSABHYF/doZ0OkkMt+gAAAAASUVORK5CYII=';

    const BLESendInterval = 100;
    const waitPromise = () => new Promise(resolve => window.setTimeout(resolve, BLESendInterval));

    const Color = {
        BLACK: 0,
        PINK: 1,
        PURPLE: 2,
        BLUE: 3,
        LIGHT_BLUE: 4,
        LIGHT_GREEN: 5,
        GREEN: 6,
        YELLOW: 7,
        ORANGE: 8,
        RED: 9,
        WHITE: 10,
        NONE: -1,
    };

    const Sound = {
        BRAKE: 3,
        DEPARTURE: 5,
        REFILL: 7,
        HORN: 9,
        STEAM: 10,
    };

    const PortId = {
        MOTOR: 0x00,
        SPEAKER: 0x01,
        RGB_LIGHT: 0x11,
        COLOR_SENSOR: 0x12,
        SPEEDOMETER: 0x13,
    };

    class Scratch3DuploTrainBlocks {

        static get EXTENSION_ID() {
            return 'duplotrain';
        }

        constructor() {
            this._peripheral = new Hub(Scratch.vm.runtime, Scratch3DuploTrainBlocks.EXTENSION_ID, 0x20);
        }

        getInfo() {
            return {
                id: Scratch3DuploTrainBlocks.EXTENSION_ID,
                name: 'DUPLO Train',
                extensionURL: Scratch3DuploTrainBlocks.extensionURL,
                blockIconURI: blockIconURI,
                showStatusButton: true,
                blocks: [
                    {
                        opcode: 'motorPWM',
                        text: formatMessage({
                            id: 'duplotrain.motorPWM',
                            default: 'run [DIRECTION] at [POWER] % power'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            DIRECTION: {
                                type: ArgumentType.NUMBER,
                                menu: 'DIRECTION',
                                defaultValue: 1
                            },
                            POWER: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 50
                            }
                        }
                    },
                    {
                        opcode: 'motorStop',
                        text: formatMessage({
                            id: 'duplotrain.motorStop',
                            default: 'stop'
                        }),
                        blockType: BlockType.COMMAND
                    },
                    '---',
                    {
                        opcode: 'playSound',
                        text: formatMessage({
                            id: 'duplotrain.playSound',
                            default: 'play [SOUND] sound'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            SOUND: {
                                type: ArgumentType.NUMBER,
                                menu: 'SOUND',
                                defaultValue: Sound.BRAKE
                            }
                        }
                    },
                    {
                        opcode: 'setHubLEDColor',
                        text: formatMessage({
                            id: 'duplotrain.setHubLEDColor',
                            default: 'set light color to [COLOR]'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            COLOR: {
                                type: ArgumentType.NUMBER,
                                menu: 'LED_COLOR',
                                defaultValue: Color.BLUE
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'whenColor',
                        text: formatMessage({
                            id: 'duplotrain.whenColor',
                            default: 'when passing over [SENSOR_COLOR] action block'
                        }),
                        blockType: BlockType.HAT,
                        arguments: {
                            SENSOR_COLOR: {
                                type: ArgumentType.NUMBER,
                                menu: 'SENSOR_COLOR',
                                defaultValue: Color.BLUE
                            }
                        }
                    },
                    /*
                    {
                        opcode: 'isColor',
                        text: formatMessage({
                            id: 'duplotrain.isColor',
                            default: 'ground color is [SENSOR_COLOR] ?'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            SENSOR_COLOR: {
                                type: ArgumentType.NUMBER,
                                menu: 'SENSOR_COLOR',
                                defaultValue: Color.BLUE
                            }
                        }
                    },
                    {
                        opcode: 'getColor',
                        text: formatMessage({
                            id: 'duplotrain.getColor',
                            default: 'ground color'
                        }),
                        blockType: BlockType.REPORTER
                    },
                    */
                    {
                        opcode: 'getDrivingDistance',
                        text: formatMessage({
                            id: 'duplotrain.getDrivingDistance',
                            default: 'driving distance'
                        }),
                        blockType: BlockType.REPORTER
                    },
                ],
                menus: {
                    DIRECTION: {
                        acceptReporters: false,
                        items: [
                            {
                                text: '⬆︎',
                                value: '1'
                            },
                            {
                                text: '⬇',
                                value: '-1'
                            }
                        ]
                    },
                    SOUND: {
                        acceptReporters: false,
                        items: [
                            {
                                text: formatMessage({
                                    id: 'duplotrain.brake',
                                    default: 'brake'
                                }),
                                value: String(Sound.BRAKE)
                            },
                            {
                                text: formatMessage({
                                    id: 'duplotrain.departure',
                                    default: 'departure'
                                }),
                                value: String(Sound.DEPARTURE)
                            },
                            {
                                text: formatMessage({
                                    id: 'duplotrain.refill',
                                    default: 'refill'
                                }),
                                value: String(Sound.REFILL)
                            },
                            {
                                text: formatMessage({
                                    id: 'duplotrain.horn',
                                    default: 'horn'
                                }),
                                value: String(Sound.HORN)
                            },
                            {
                                text: formatMessage({
                                    id: 'duplotrain.steam',
                                    default: 'steam'
                                }),
                                value: String(Sound.STEAM)
                            },
                        ]
                    },
                    LED_COLOR: {
                        acceptReporters: true,
                        items: [
                            {
                                text: formatMessage({
                                    id: 'legobluetooth.black',
                                    default: 'Black'
                                }),
                                value: String(Color.BLACK)
                            },
                            {
                                text: formatMessage({
                                    id: 'legobluetooth.pink',
                                    default: 'Pink'
                                }),
                                value: String(Color.PINK)
                            },
                            {
                                text: formatMessage({
                                    id: 'legobluetooth.purple',
                                    default: 'Purple'
                                }),
                                value: String(Color.PURPLE)
                            },
                            {
                                text: formatMessage({
                                    id: 'legobluetooth.blue',
                                    default: 'Blue'
                                }),
                                value: String(Color.BLUE)
                            },
                            {
                                text: formatMessage({
                                    id: 'legobluetooth.lightBlue',
                                    default: 'Light blue'
                                }),
                                value: String(Color.LIGHT_BLUE)
                            },
                            {
                                text: formatMessage({
                                    id: 'legobluetooth.lightGreen',
                                    default: 'Light green'
                                }),
                                value: String(Color.LIGHT_GREEN)
                            },
                            {
                                text: formatMessage({
                                    id: 'legobluetooth.green',
                                    default: 'Green'
                                }),
                                value: String(Color.GREEN)
                            },
                            {
                                text: formatMessage({
                                    id: 'legobluetooth.yellow',
                                    default: 'Yellow'
                                }),
                                value: String(Color.YELLOW)
                            },
                            {
                                text: formatMessage({
                                    id: 'legobluetooth.orange',
                                    default: 'Orange'
                                }),
                                value: String(Color.ORANGE)
                            },
                            {
                                text: formatMessage({
                                    id: 'legobluetooth.red',
                                    default: 'Red'
                                }),
                                value: String(Color.RED)
                            },
                            {
                                text: formatMessage({
                                    id: 'legobluetooth.white',
                                    default: 'White'
                                }),
                                value: String(Color.WHITE)
                            },
                        ]
                    },
                    SENSOR_COLOR: {
                        acceptReporters: false,
                        items: [
                            {
                                text: formatMessage({
                                    id: 'duplotrain.blue',
                                    default: 'Blue'
                                }),
                                value: String(Color.BLUE)
                            },
                            {
                                text: formatMessage({
                                    id: 'duplotrain.lightGreen',
                                    default: 'Green'
                                }),
                                value: String(Color.LIGHT_GREEN)
                            },
                            {
                                text: formatMessage({
                                    id: 'duplotrain.yellow',
                                    default: 'Yellow'
                                }),
                                value: String(Color.YELLOW)
                            },
                            {
                                text: formatMessage({
                                    id: 'duplotrain.red',
                                    default: 'Red'
                                }),
                                value: String(Color.RED)
                            },
                            {
                                text: formatMessage({
                                    id: 'duplotrain.white',
                                    default: 'White'
                                }),
                                value: String(Color.WHITE)
                            },
                        ]
                    },
                }
            };
        }

        motorPWM(args) {
            const power = Cast.toNumber(args.POWER);
            const direction = args.DIRECTION;

            return this._peripheral.motorPWM(PortId.MOTOR, power * direction).then(waitPromise);
        }

        motorStop() {
            return this._peripheral.motorPWM(PortId.MOTOR, 0).then(waitPromise);
        }

        playSound(args) {
            const sound = args.SOUND;
            return this._peripheral.sendOutputCommand(PortId.SPEAKER, 0x51, [0x01, sound]).then(waitPromise);
        }

        setHubLEDColor(args) {
            const color = Cast.toNumber(args.COLOR);
            return this._peripheral.setLEDColor(color).then(waitPromise);
        }

        whenColor(args) {
            return this.getColor() == args.SENSOR_COLOR;
        }

        isColor(args) {
            return this.getColor() == args.SENSOR_COLOR;
        }

        getColor() {
            return this._getSensorValue(PortId.COLOR_SENSOR, 'color', -1);
        }

        getDrivingDistance() {
            return this._getSensorValue(PortId.SPEEDOMETER, 'drivingDistance', 0);
        }

        _getSensorValue(portId, key, defaultValue) {
            const value = this._peripheral.inputValue(portId, key);
            return value != null ? value : defaultValue;
        }
    }

   Scratch.extensions.register(new Scratch3DuploTrainBlocks());

   Scratch.extensions.translations({
        en: {
            'duplotrain.motorPWM': 'run [DIRECTION] at [POWER] % power',
            'duplotrain.motorStop': 'stop',
            'duplotrain.playSound': 'play [SOUND] sound',
            'duplotrain.setHubLEDColor': 'set light color to [COLOR]',
            'duplotrain.whenColor': 'when passing over [SENSOR_COLOR] action block',
            'duplotrain.isColor': 'ground color is [SENSOR_COLOR] ?',
            'duplotrain.getColor': 'ground color',
            'duplotrain.getDrivingDistance': 'driving distance',
            'duplotrain.brake': 'brake',
            'duplotrain.departure': 'departure',
            'duplotrain.refill': 'refill',
            'duplotrain.horn': 'horn',
            'duplotrain.steam': 'steam',
            'duplotrain.blue': 'blue',
            'duplotrain.lightGreen': 'green',
            'duplotrain.yellow': 'yellow',
            'duplotrain.red': 'red',
            'duplotrain.white': 'white',
        },
        'zh-cn': {
            'duplotrain.motorPWM': '开启 [DIRECTION] 方向动力为 [POWER] %',
            'duplotrain.motorStop': '停止',
            'duplotrain.playSound': '播放 [SOUND] 声音',
            'duplotrain.setHubLEDColor': '设置灯光颜色为 [COLOR]',
            'duplotrain.whenColor': '当通过的颜色是 [SENSOR_COLOR]',
            'duplotrain.isColor': '轨道颜色是 [SENSOR_COLOR] ?',
            'duplotrain.getColor': '轨道颜色',
            'duplotrain.getDrivingDistance': '行驶距离',
            'duplotrain.brake': '刹车',
            'duplotrain.departure': '启程',
            'duplotrain.refill': '回填',
            'duplotrain.horn': '鸣笛',
            'duplotrain.steam': '蒸汽',
            'duplotrain.blue': '蓝',
            'duplotrain.lightGreen': '绿',
            'duplotrain.yellow': '黄',
            'duplotrain.red': '红',
            'duplotrain.white': '白',
        },
        'zh-tw': {
            'duplotrain.motorPWM': '開啟 [DIRECTION] 方向動力為 [POWER] %',
            'duplotrain.motorStop': '停止',
            'duplotrain.playSound': '播放 [SOUND] 聲音',
            'duplotrain.setHubLEDColor': '設置燈光顏色為 [COLOR]',
            'duplotrain.whenColor': '當通過的顏色是 [SENSOR_COLOR]',
            'duplotrain.isColor': '軌道顏色是 [SENSOR_COLOR] ?',
            'duplotrain.getColor': '軌道顏色',
            'duplotrain.getDrivingDistance': '行駛距離',
            'duplotrain.brake': '剎車',
            'duplotrain.departure': '啟程',
            'duplotrain.refill': '回填',
            'duplotrain.horn': '鳴笛',
            'duplotrain.steam': '蒸汽',
            'duplotrain.blue': '藍',
            'duplotrain.lightGreen': '綠',
            'duplotrain.yellow': '黃',
            'duplotrain.red': '紅',
            'duplotrain.white': '白',
        },
    });
})(Scratch, require);
