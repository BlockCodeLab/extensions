(async function (Scratch) {
    await Scratch.require('https://unpkg.com/mqtt@4.3.7/dist/mqtt.min.js');

    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const Cast = Scratch.Cast;
    const formatMessage = Scratch.formatMessage;

    // eslint-disable-next-line max-len
    const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjwhLS0gQ3JlYXRlZCB3aXRoIFZlY3Rvcm5hdG9yIChodHRwOi8vdmVjdG9ybmF0b3IuaW8vKSAtLT4KPHN2ZyBoZWlnaHQ9IjEwMCUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3R5bGU9ImZpbGwtcnVsZTpub256ZXJvO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI2MCAyNjAiIHdpZHRoPSIxMDAlIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPGRlZnMvPgo8ZyBpZD0ibG9nb3MiPgo8cGF0aCBkPSJNMzAuMDk4NiA0OS43MTQxTDMwLjA5ODYgODAuMjcxMUMzMC4yOTU3IDgwLjI3MTEgMzAuNDkyOSA4MC4yNzExIDMwLjY5IDgwLjI3MTFDMTEzLjg4NCA4MC4yNzExIDE4MS43IDE0Ny4yOTkgMTgyLjM5IDIyOS45MDFMMjEyLjA2IDIyOS45MDFDMjExLjI3MiAxMzAuNjQxIDEzMC4wNDkgNTAuMDA5OSAzMC4wOTg2IDQ5LjcxNDFaIiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8cGF0aCBkPSJNMzAuMDk4NiAxMTIuNzk5TDMwLjA5ODYgMTQzLjM1NkMzMC4yOTU3IDE0My4zNTYgMzAuNDkyOSAxNDMuMzU2IDMwLjY5IDE0My4zNTZDNzguODkxMSAxNDMuMzU2IDExOC4yMjEgMTgyLjA5NSAxMTguOTExIDIyOS45MDFMMTQ4LjU4MSAyMjkuOTAxQzE0Ny44OTEgMTY1LjQzNiA5NS4wNTY3IDExMy4wOTUgMzAuMDk4NiAxMTIuNzk5WiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIxIiBzdHJva2U9Im5vbmUiLz4KPHBhdGggZD0iTTIzMCAxNTAuODQ4TDIzMCA4OS4yNDFDMjIyLjQxIDc4Ljg5MTEgMjEzLjA0NiA2Ny4wNjI2IDIwMy42ODIgNTcuODk1NUMxOTMuMjMzIDQ3LjU0NTYgMTgxLjAxIDM4LjE4MTQgMTY5LjE4MiAzMEwxMDMuNzMxIDMwQzE2MS4wOTkgNTAuNjAxMyAyMDcuMTMyIDk0Ljg1OTUgMjMwIDE1MC44NDhaIiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8cGF0aCBkPSJNMzAuNTkxNCAxNDMuMzU2QzMwLjM5NDMgMTQzLjM1NiAzMC4xOTcxIDE0My4zNTYgMzAgMTQzLjM1NkwzMCAyMTkuODQ3QzMwIDIyNS4zNjcgMzQuNTM0MyAyMjkuOTAxIDQwLjA1NDIgMjI5LjkwMUwxMTguODEyIDIyOS45MDFDMTE4LjEyMiAxODIuMDk1IDc4Ljg5MTEgMTQzLjM1NiAzMC41OTE0IDE0My4zNTZaIiBmaWxsPSIjNjYwMDY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8cGF0aCBkPSJNMzAuNTkxNCA4MC4yNzExQzMwLjM5NDMgODAuMjcxMSAzMC4xOTcxIDgwLjI3MTEgMzAgODAuMjcxMUwzMCAxMTIuNzk5Qzk0Ljk1ODEgMTEzLjA5NSAxNDcuNzkyIDE2NS4zMzggMTQ4LjQ4MiAyMjkuOTAxTDE4Mi4xOTMgMjI5LjkwMUMxODEuNjAyIDE0Ny4yOTkgMTEzLjg4NCA4MC4yNzExIDMwLjU5MTQgODAuMjcxMVoiIGZpbGw9IiM2NjAwNjYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIi8+CjxwYXRoIGQ9Ik0yMzAgMjE5Ljk0NkwyMzAgMTUwLjg0OEMyMDcuMTMyIDk0Ljg1OTUgMTYxLjA5OSA1MC42MDEzIDEwMy44MjkgMzBMNDAuMDU0MiAzMEMzNC41MzQzIDMwIDMwIDM0LjUzNDMgMzAgNDAuMDU0MkwzMCA0OS44MTI3QzEyOS45NTEgNTAuMTA4NCAyMTEuMjcyIDEzMC42NDEgMjExLjg2MyAyMzBMMjE5Ljk0NiAyMzBDMjI1LjU2NCAyMjkuOTAxIDIzMCAyMjUuNDY2IDIzMCAyMTkuOTQ2WiIgZmlsbD0iIzY2MDA2NiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIxIiBzdHJva2U9Im5vbmUiLz4KPHBhdGggZD0iTTIwMy42ODIgNTcuODk1NUMyMTIuOTQ3IDY3LjE2MTIgMjIyLjQxIDc4Ljg5MTEgMjMwIDg5LjI0MUwyMzAgMzkuOTU1NkMyMzAgMzQuNDM1NyAyMjUuNTY0IDMwIDIyMC4wNDQgMzBMMTY5LjI4IDMwQzE4MS4xMDkgMzguMTgxNCAxOTMuMzMyIDQ3LjU0NTYgMjAzLjY4MiA1Ny44OTU1WiIgZmlsbD0iIzY2MDA2NiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIxIiBzdHJva2U9Im5vbmUiLz4KPC9nPgo8L3N2Zz4K';

    const DEVELOPMENT = location.hostname === 'localhost';

    class MQTTBlocks {
        constructor () {
            this.client = null;
            this.received = new Set();
            this.messages = new Map();
        }

        get Blocks () {
            return [
                {
                    opcode: 'connect',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mqtt.connect',
                        default: 'connect to MQTT broker: [URL]'
                    }),
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: `ws://${DEVELOPMENT ? 'test.mosquitto.org:8081' : 'mqtt.example.com'}`
                        }
                    }
                },
                {
                    opcode: 'whenConnected',
                    blockType: BlockType.HAT,
                    text: formatMessage({
                        id: 'mqtt.whenConnected',
                        default: 'when connected to MQTT broker'
                    })
                },
                {
                    opcode: 'isConnected',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'mqtt.isConnected',
                        default: 'connected to MQTT broker?'
                    })
                },
                '---',
                {
                    opcode: 'whenReceived',
                    blockType: BlockType.HAT,
                    text: formatMessage({
                        id: 'mqtt.whenReceived',
                        default: 'when I receive [TOPIC]'
                    }),
                    arguments: {
                        TOPIC: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'mqtt.message.topic',
                                default: 'topic'
                            })
                        }
                    }
                },
                {
                    opcode: 'message',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mqtt.message',
                        default: 'last message from [TOPIC]'
                    }),
                    arguments: {
                        TOPIC: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'mqtt.message.topic',
                                default: 'topic'
                            })
                        }
                    }
                },
                '---',
                {
                    opcode: 'publish',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mqtt.publish',
                        default: 'publish [MESSAGE] to [TOPIC]'
                    }),
                    arguments: {
                        MESSAGE: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'mqtt.message.content',
                                default: 'message'
                            })
                        },
                        TOPIC: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'mqtt.message.topic',
                                default: 'topic'
                            })
                        },
                    }
                },
                '---',
                {
                    opcode: 'end',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mqtt.end',
                        default: 'disconnect'
                    })
                }
            ];
        }

        getInfo () {
            return {
                id: 'mqtt',
                name: formatMessage({
                    id: 'mqtt.name',
                    default: 'MQTT Protocol'
                }),
                blockIconURI,
                blocks: this.Blocks
            }
        }

        _onMessage (topic, message) {
            this.received.add(topic);
            this.messages.set(topic, message.toString());
        }

        _subscribe (topic) {
            if (this.client && !this.messages.has(topic)) {
                this.client.subscribe(topic, e =>
                    !e ? this.messages.set(topic, '') : null
                );
            }
        }

        connect (args) {
            if (this.isConnected()) {
                return;
            }

            if (this.client) {
                this.client.reconnect();
                return;
            }

            const client = window.mqtt.connect(Cast.toString(args.URL));
            return new Promise((resolve, reject) => {
                client.on('connect', () => {
                    this.received.clear();
                    this.messages.clear();
                    this.client = client;
                    client.on('message', this._onMessage.bind(this));
                    resolve();
                });
                client.on('reconnect', () => {
                    client.end(true);
                    resolve();
                });
                client.on('disconnect', () => {
                    this.end();
                    resolve();
                });
                client.on('offline', () => {
                    this.end();
                    resolve();
                });
                client.on('error', () => {
                    reject();
                });
            });
        }

        whenConnected () {
            return this.isConnected();
        }

        isConnected () {
            return !!(this.client && this.client.connected);
        }

        whenReceived (args) {
            if (!this.client) return;
            const topic = Cast.toString(args.TOPIC);
            this._subscribe(topic);
            const flag = this.received.has(topic);
            this.received.delete(topic);
            return flag;
        }

        message (args) {
            const topic = Cast.toString(args.TOPIC);
            this._subscribe(topic);
            return this.messages.get(topic) || '';
        }

        publish (args) {
            if (!this.client) return;
            const topic = Cast.toString(args.TOPIC);
            const message = Cast.toString(args.MESSAGE);
            return new Promise((resolve, reject) =>
                this.client.publish(topic, message, e => e ? reject() : resolve())
            );
        }

        end () {
            if (!this.client) return;
            this.client.end(true, () => {
                this.client = null;
                this.received.clear();
                this.messages.clear();
            });
        }
    }

    Scratch.extensions.register(new MQTTBlocks());

    Scratch.extensions.translations({
        en: {
            'window.name': 'MQTT Protocol',
            'mqtt.connect': 'connect to MQTT broker [URL]',
            'mqtt.whenConnected': 'when connected to MQTT broker',
            'mqtt.isConnected': 'connected to MQTT broker?',
            'mqtt.whenReceived': 'when I receive from [TOPIC] topic',
            'mqtt.message': 'last message from [TOPIC] topic',
            'mqtt.publish': 'publish message [MESSAGE] to [TOPIC] topic',
            'mqtt.message.topic': 'topic',
            'mqtt.message.content': 'content',
            'mqtt.end': 'disconnect'
        },
        'zh-cn': {
            'mqtt.name': 'MQTT 协议',
            'mqtt.connect': '连接到 MQTT 服务器 [URL]',
            'mqtt.whenConnected': '当连接到 MQTT 服务器',
            'mqtt.isConnected': '连接到 MQTT 服务器？',
            'mqtt.whenReceived': '当接收到主题 [TOPIC] 的消息',
            'mqtt.message': '主题 [TOPIC] 最后的消息',
            'mqtt.publish': '发布主题 [TOPIC] 的消息 [MESSAGE]',
            'mqtt.message.topic': '标题',
            'mqtt.message.content': '内容',
            'mqtt.end': '结束连接'
        },
        'zh-tw': {
            'mqtt.name': 'MQTT 協議',
            'mqtt.connect': '連接到 MQTT 服務器 [URL]',
            'mqtt.whenConnected': '當連接到 MQTT 服務器',
            'mqtt.isConnected': '連接到 MQTT 服務器？',
            'mqtt.whenReceived': '當接收到主題 [TOPIC] 的消息',
            'mqtt.message': '主題 [TOPIC] 最後的消息',
            'mqtt.publish': '發布主題 [TOPIC] 的消息 [MESSAGE]',
            'mqtt.message.topic': '標題',
            'mqtt.message.content': '內容',
            'mqtt.end': '結束連接'
        }
    });
})(window.Scratch);
