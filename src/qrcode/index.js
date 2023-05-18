(async function () {
    await Scratch.require('https://unpkg.com/jsqr@1.4.0/dist/jsQR.js');
    await Scratch.require('https://unpkg.com/qrcode-svg-ts@1.4.0/dist/index.min.js');

    const formatMessage = Scratch.formatMessage;
    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const Cast = Scratch.Cast;
    const Clone = Scratch.Clone;
    const Color = Scratch.Color;

    const FORMAT_IMAGE_DATA = 'image-data';
    const DIMENSIONS = [480, 360];

    // eslint-disable-next-line max-len
    const blockIconURI = 'data:image/png;base64,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';

    class QRCodeBlocks {
        static get STATE_KEY () {
            return 'Scratch.QRCode';
        }

        static get DEFAULT_QRCODE_STATE () {
            return {
                skinId: null,
                content: formatMessage({
                    id: 'qrcode.defaultQRCodeText',
                    default: 'hello!'
                }),
                color: Color.rgbToHex(Color.RGB_BLACK),
                size: 100,
                visible: false
            };
        }

        constructor () {
            this.runtime = Scratch.vm.runtime;
            this.runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));

            this.runtime.on('targetWasCreated', this._onTargetCreated.bind(this));
            this.runtime.on('targetWasRemoved', this._onTargetWillExit.bind(this));
        }

        getInfo () {
            return {
                id: 'qrcode',
                name: formatMessage({
                    id: 'qrcode.name',
                    default: 'QR Code'
                }),
                blockIconURI,
                blocks: [
                    {
                        opcode: 'decodeCamera',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'qrcode.decodeCamera',
                            default: 'scan QR code from camera and wait'
                        }),
                    },
                    {
                        opcode: 'whenAnyQRcode',
                        blockType: BlockType.HAT,
                        text: formatMessage({
                            id: 'qrcode.whenAnyQRcode',
                            default: 'when QR code is scanned'
                        })
                    },
                    {
                        opcode: 'whenQRcode',
                        blockType: BlockType.HAT,
                        text: formatMessage({
                            id: 'qrcode.whenQRcode',
                            default: 'when QR code is [TEXT]'
                        }),
                        arguments: {
                            TEXT: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'qrcode.defaultQRCodeText',
                                    default: 'hello!'
                                })
                            }
                        }
                    },
                    {
                        opcode: 'getQRcode',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'qrcode.getQRcode',
                            default: 'QR code content'
                        }),
                    },
                    '---',
                    {
                        opcode: 'generate',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'qrcode.generate',
                            default: 'generate QR code with [TEXT]'
                        }),
                        arguments: {
                            TEXT: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'qrcode.defaultQRCodeText',
                                    default: 'hello!'
                                })
                            }
                        }
                    },
                    {
                        opcode: 'setColor',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'qrcode.setColor',
                            default: 'set QR code color to [COLOR]'
                        }),
                        arguments: {
                            COLOR: {
                                type: ArgumentType.COLOR
                            }
                        }
                    },
                    {
                        opcode: 'setSize',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'qrcode.setSize',
                            default: 'set QR code size to [SIZE]'
                        }),
                        arguments: {
                            SIZE: {
                                type: ArgumentType.NUMBER,
                                defaultValue: QRCodeBlocks.DEFAULT_QRCODE_STATE.size
                            }
                        }
                    },
                    {
                        opcode: 'clear',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'qrcode.clear',
                            default: 'clear all QR code'
                        })
                    },
                ]
            };
        }

        _decode (resolve) {
            this._timer = setTimeout(
                this._decode.bind(this, resolve),
                Math.max(this.runtime.currentStepTime)
            );
            const frame = this.runtime.ioDevices.video.getFrame({
                format: FORMAT_IMAGE_DATA,
                dimensions: DIMENSIONS,
                cacheTimeout: this.runtime.currentStepTime
            });
            if (frame) {
                const res = window.jsQR(frame.data, frame.width, frame.height);
                if (res) {
                    this.currentQRValue = `${res.data}`;
                    clearTimeout(this._timer);
                    resolve()
                }
            }
        }

        _encode (qrCodeState) {
            const QRCodeSVG = window.QRCodeSVG;
            return new QRCodeSVG({
                content: qrCodeState.content,
                color: qrCodeState.color,
                width: qrCodeState.size,
                height: qrCodeState.size,
                padding: 0,
                background: 'transparent',
                container: 'svg',
            }).svg();
        }

        decodeCamera () {
            this.runtime.ioDevices.video.enableVideo()
            return new Promise(resolve => {
                try {
                    this._decode(resolve);
                } catch (e) {
                    this.currentQRValue = '';
                    resolve();
                }
            }).finally(() => {
                setTimeout(() => {
                    this.runtime.ioDevices.video.disableVideo();
                }, 1000);
            });
        }

        getQRcode () {
            return this.currentQRValue || '';
        }

        whenAnyQRcode () {
            return this.currentQRValue !== '';
        }

        whenQRcode (args) {
            return this.currentQRValue === Cast.toString(args.TEXT);
        }

        clear (args, util) {
            const qrCodeState = this._getQRCodeState(util.target);
            qrCodeState.visible = false;
            util.target.setCustomState(QRCodeBlocks.STATE_KEY, qrCodeState);

            const costume = util.target.getCurrentCostume();
            this.runtime.renderer.updateDrawableSkinId(util.target.drawableID, costume.skinId);
        }

        generate (args, util) {
            this.runtime.targets[util.target.id] = util.target;

            const qrCodeState = this._getQRCodeState(util.target);

            qrCodeState.content = Cast.toString(args.TEXT);
            qrCodeState.visible = true;

            this._renderQRCode(util.target);
        }

        setColor (args, util) {
            const qrCodeState = this._getQRCodeState(util.target);

            qrCodeState.color = Cast.toString(args.COLOR);

            this._renderQRCode(util.target);
        }

        setSize (args, util) {
            const qrCodeState = this._getQRCodeState(util.target);

            qrCodeState.size = Cast.toNumber(args.SIZE);

            this._renderQRCode(util.target);
        }

        stopAll () {
            this.runtime.ioDevices.video.disableVideo();
            Object.values(this.runtime.targets).forEach(target => {
                this.clear({}, {
                    target: target
                });
            });
        }

        _getQRCodeState (target) {
            let qrCodeState = target.getCustomState(QRCodeBlocks.STATE_KEY);
            if (!qrCodeState) {
                qrCodeState = Clone.simple(QRCodeBlocks.DEFAULT_QRCODE_STATE);
                target.setCustomState(QRCodeBlocks.STATE_KEY, qrCodeState);
            }
            return qrCodeState;
        }

         _renderQRCode (target) {
            if (!this.runtime.renderer) return;

            const qrCodeState = this._getQRCodeState(target);

            if (!qrCodeState.visible) return;

            qrCodeState.skinId = this._updateSVGSkin(qrCodeState);
            this.runtime.renderer.updateDrawableSkinId(target.drawableID, qrCodeState.skinId);
        }

        _updateSVGSkin (qrCodeState) {
            const svg = this._encode(qrCodeState);
            if (qrCodeState.skinId)  {
                this.runtime.renderer.updateSVGSkin(qrCodeState.skinId, svg);
                return qrCodeState.skinId;
            }
            return this.runtime.renderer.createSVGSkin(svg);
        }

        _onTargetCreated (newTarget, sourceTarget) {
            if (sourceTarget) {
                const sourceTextState = sourceTarget.getCustomState(QRCodeBlocks.STATE_KEY);
      
                if (sourceTextState) {
                    newTarget.setCustomState(QRCodeBlocks.STATE_KEY, Clone.simple(sourceTextState));
                    const newTargetState = newTarget.getCustomState(QRCodeBlocks.STATE_KEY);

                    newTargetState.skinId = null;

                    const onDrawableReady = () => {
                        this._renderQRCode(newTarget);

                        newTarget.off('EVENT_TARGET_VISUAL_CHANGE', onDrawableReady);
                    };

                    newTarget.on('EVENT_TARGET_VISUAL_CHANGE', onDrawableReady);
                }
            }
        }

        _onTargetWillExit (target) {
            const qrCodeState = this._getQRCodeState(target);
            if (qrCodeState.skinId) {
                this.runtime.renderer.destroySkin(qrCodeState.skinId);
                qrCodeState.skinId = null;
            }
        }
    }

    Scratch.extensions.register(new QRCodeBlocks());

    Scratch.extensions.translations({
        en: {
            'qrcode.name': 'QR Code',
            'qrcode.decodeCamera': 'scan QR code from camera and wait',
            'qrcode.whenAnyQRcode': 'when QR code is scanned',
            'qrcode.whenQRcode': 'when QR code is [TEXT]',
            'qrcode.getQRcode': 'QR code content',
            'qrcode.defaultQRCodeText': 'hello!',
            'qrcode.clear': 'show sprite',
            'qrcode.generate': 'generate QR code with [TEXT]',
            'qrcode.setColor': 'set QR code color to [COLOR]',
            'qrcode.setSize': 'set QR code size to [SIZE]',
        },
        'zh-cn': {
            'qrcode.name': '二维码',
            'qrcode.decodeCamera': '扫描二维码并等待',
            'qrcode.whenAnyQRcode': '当扫描到二维码',
            'qrcode.whenQRcode': '当二维码是 [TEXT]',
            'qrcode.getQRcode': '二维码内容',
            'qrcode.defaultQRCodeText': '你好！',
            'qrcode.clear': '显示角色',
            'qrcode.generate': '生成 [TEXT] 的二维码',
            'qrcode.setColor': '将二维码颜色设为 [COLOR]',
            'qrcode.setSize': '将二维码尺寸设为 [SIZE]',
        },
        'zh-tw': {
            'qrcode.name': '二維碼',
            'qrcode.decodeCamera': '掃描二維碼並等待',
            'qrcode.whenAnyQRcode': '當掃描到二維碼',
            'qrcode.whenQRcode': '當二維碼是 [TEXT]',
            'qrcode.getQRcode': '二維碼內容',
            'qrcode.defaultQRCodeText': '你好！',
            'qrcode.clear': '顯示角色',
            'qrcode.generate': '生成 [TEXT] 的二維碼',
            'qrcode.setColor': '將二維碼顏色設為 [COLOR]',
            'qrcode.setSize': '將二維碼尺寸設為 [SIZE]',
        }
    });
})();
