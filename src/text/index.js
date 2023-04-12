(async function () {
    const formatMessage = Scratch.formatMessage;
    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const Cast = Scratch.Cast;
    const Clone = Scratch.Clone;
    const Timer = Scratch.Timer;

    const TextCostumeSkin = await Scratch.require('./text-costume-skin.js');

    /**
     * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
     * @type {string}
     */
    // eslint-disable-next-line max-len
    const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMjcuODM0IDlhMyAzIDAgMDEyLjU0NiAxLjQxMmwuMDk3LjE2Ny4wNTQuMTEuMDUyLjExMi4wNDguMTEyIDYuMjIyIDE2YTMuMDAxIDMuMDAxIDAgMDEtMi4yNyA0LjA0MWwtLjE4LjAyNS0uMTE1LjAxMS0uMTE2LjAwNy0uMTE1LjAwM2gtMS44NTVhMyAzIDAgMDEtMi41NDUtMS40MTJsLS4wOTYtLjE2Ny0uMTA3LS4yMjItLjA0OC0uMTExTDI4Ljk4MyAyOGgtNC45M2wtLjQyMiAxLjA4N2EzLjAwMyAzLjAwMyAwIDAxLTIuNDEgMS44ODlsLS4xOTMuMDE4LS4xOTQuMDA2LTEuOTQtLjAwMi0uMDk2LjAwMkg3YTMgMyAwIDAxLTIuODctMy44NzJsLjA3Mi0uMjA5IDYuMTgzLTE2YTMuMDAxIDMuMDAxIDAgMDEyLjYwNC0xLjkxM0wxMy4xODQgOWwzLjkuMDAxLjA5OS0uMDAxIDMuOTI0LjAwMi4wOTUtLjAwMiAzLjkwNS4wMDIuMDk1LS4wMDJoMi42MzJ6IiBmaWxsLW9wYWNpdHk9Ii4xNSIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yNS42NjMgMjFsLjgxNi0yLjA5OS44MTYgMi4wOTloLTEuNjMyem0xMC4yNTggNi4yNzVsLTYuMjIzLTE2LS4wNzUtLjE2OC0uMDg1LS4xNDVjLS4zODctLjYxMS0xLjAxOS0uOTYyLTEuNzAzLS45NjJoLTIuNjMzbC0uMDk2LjAwMi0uMDYyLS4wMDFMMjEuMjAyIDEwbC0uMDk2LjAwMi0uMDYyLS4wMDFMMTcuMTgzIDEwbC0uMDg2LjAwMkwxMy4xODQgMTBsLS4xNjUuMDA3YTIuMDAzIDIuMDAzIDAgMDAtMS43MDIgMS4yNzJsLTYuMTgyIDE2LS4wNTkuMTc1QTIgMiAwIDAwNyAzMGgxMS43OThsLjA4OC0uMDAyIDEuOTQ5LjAwMi4xNjMtLjAwNy4xNjEtLjAxOWEyIDIgMCAwMDEuNTM5LTEuMjQ5bC42Ny0xLjcyNWg2LjI5OWwuNjcyIDEuNzI2LjA3NC4xNjcuMDg2LjE0NWMuMzg3LjYxMSAxLjAxOC45NjIgMS43MDMuOTYyaDEuODU1bC4xNzQtLjAwOS4xNjQtLjAyNGMuOTc2LS4xODcgMS42NjItMS4wMDMgMS42NjItMS45NjcgMC0uMjQ4LS4wNDYtLjQ5NC0uMTM2LS43MjV6IiBmaWxsLW9wYWNpdHk9Ii4yNSIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0xMy4xODMgMTFoMy44MThhMSAxIDAgMDEuOTQxIDEuMzM4bC01Ljc0MiAxNmExIDEgMCAwMS0uOTQuNjYySDdhMSAxIDAgMDEtLjkzMy0xLjM2bDYuMTgzLTE2YTEgMSAwIDAxLjkzMy0uNjR6IiBmaWxsPSIjNEM5N0ZGIi8+PHBhdGggZD0iTTE3LjE4MyAxMUgyMWExIDEgMCAwMS45NDIgMS4zMzhsLTUuNzQyIDE2YTEgMSAwIDAxLS45NDEuNjYyaC00LjI2YTEgMSAwIDAxLS45MzItMS4zNmw2LjE4My0xNmExIDEgMCAwMS45MzMtLjY0eiIgZmlsbD0iI0NGNjNDRiIvPjxwYXRoIGQ9Ik0yMS4yMDIgMTFIMjVhMSAxIDAgMDEuOTMzIDEuMzYxbC02LjIwMyAxNmExIDEgMCAwMS0uOTMyLjYzOUgxNWExIDEgMCAwMS0uOTMzLTEuMzYxbDYuMjAzLTE2YTEgMSAwIDAxLjkzMi0uNjM5eiIgZmlsbD0iI0ZGQkYwMCIvPjxwYXRoIGQ9Ik0yNy44MzQgMTFhMSAxIDAgMDEuOTMyLjYzOGw2LjIyMiAxNkExIDEgMCAwMTM0LjA1NiAyOWgtMS44NTRhMSAxIDAgMDEtLjkzMi0uNjM4TDMwLjM1MSAyNmgtNy42NjZsLS45MTkgMi4zNjJhMSAxIDAgMDEtLjkzMi42MzhIMTguOThhMSAxIDAgMDEtLjkzMi0xLjM2Mmw2LjIyMi0xNmExIDEgMCAwMS45MzItLjYzOHptLTEuMzE2IDUuMTQzTDI0LjI0IDIyaDQuNTU2bC0yLjI3OC01Ljg1N3oiIGZpbGw9IiNGRkYiLz48L2c+PC9zdmc+';

    const SANS_SERIF_ID = 'Sans Serif';
    const SERIF_ID = 'Serif';
    const HANDWRITING_ID = 'Handwriting';
    const MARKER_ID = 'Marker';
    const CURLY_ID = 'Curly';
    const PIXEL_ID = 'Pixel';
    const CHINESE_ID = '"Microsoft YaHei", "微软雅黑", STXihei, "华文细黑"';
    const JAPANESE_ID = '"ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka, "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic"';
    const KOREAN_ID = 'Malgun Gothic';
    const RANDOM_ID = 'Random';

    class Scratch3TextBlocks {
        static get DEFAULT_TEXT_STATE () {
            return {
                skinId: null,
                text: DefaultText,
                font: 'Handwriting',
                color: 'hsla(225, 15%, 40%, 1',
                // GUI's text-primary color
                size: 24,
                maxWidth: 480,
                align: 'center',
                strokeWidth: 0,
                strokeColor: 'black',
                rainbow: false,
                visible: false,
                targetSize: null,
                fullText: null
            };
        }

        /**
         * The key to load & store a target's text-related state.
         * @type {string}
         */
        static get STATE_KEY () {
            return 'Scratch.text';
        }

        constructor () {
            /**
             * The runtime instantiating this block package.
             * @type {Runtime}
             */
            this.runtime = Scratch.vm.runtime;
            this._onTargetWillExit = this._onTargetWillExit.bind(this);
            this.runtime.on('targetWasRemoved', this._onTargetWillExit);
            this._onTargetCreated = this._onTargetCreated.bind(this);
            this.runtime.on('targetWasCreated', this._onTargetCreated);
            this.runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));
        }

        get FONT_IDS ()  {
            return [
                SANS_SERIF_ID,
                SERIF_ID,
                HANDWRITING_ID,
                MARKER_ID,
                CURLY_ID,
                PIXEL_ID,
                CHINESE_ID,
                JAPANESE_ID,
                KOREAN_ID
            ];
        }

        /**
         * @returns {object} metadata for this extension and its blocks.
         */
        getInfo () {
            return {
                id: 'text',
                name: formatMessage({
                    id: 'text.categoryName',
                    default: 'Animated Text',
                    description: ''
                }),
                blockIconURI: blockIconURI,
                blocks: [{
                    opcode: 'setText',
                    text: formatMessage({
                        id: 'text.setText',
                        default: 'show text [TEXT]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'text.defaultText',
                                default: 'Welcome to my project!',
                                description: ''
                            })
                        }
                    }
                }, {
                    opcode: 'animateText',
                    text: formatMessage({
                        id: 'text.animateText',
                        default: '[ANIMATE] text [TEXT]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ANIMATE: {
                            type: ArgumentType.STRING,
                            menu: 'ANIMATE',
                            defaultValue: 'rainbow'
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'text.defaultAnimateText',
                                default: 'Here we go!',
                                description: ''
                            })
                        }
                    }
                }, {
                    opcode: 'clearText',
                    text: formatMessage({
                        id: 'text.clearText',
                        default: 'show sprite',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {}
                }, '---', {
                    opcode: 'setFont',
                    text: formatMessage({
                        id: 'text.setFont',
                        default: 'set font to [FONT]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        FONT: {
                            type: ArgumentType.STRING,
                            menu: 'FONT',
                            defaultValue: 'Pixel'
                        }
                    }
                }, {
                    opcode: 'setColor',
                    text: formatMessage({
                        id: 'text.setColor',
                        default: 'set text color to [COLOR]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        COLOR: {
                            type: ArgumentType.COLOR
                        }
                    }
                }, // {
                //     opcode: 'setSize',
                //     text: formatMessage({
                //         id: 'text.setSize',
                //         default: 'set text size to [SIZE]',
                //         description: ''
                //     }),
                //     blockType: BlockType.COMMAND,
                //     arguments: {
                //         SIZE: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 30
                //         }
                //     }
                // },
                {
                    opcode: 'setWidth',
                    text: formatMessage({
                        id: 'text.setWidth',
                        default: 'set width to [WIDTH] aligned [ALIGN]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        WIDTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 200
                        },
                        ALIGN: {
                            type: ArgumentType.STRING,
                            defaultValue: 'left',
                            menu: 'ALIGN'
                        }
                    }
                } // {
                //     opcode: 'setAlign',
                //     text: formatMessage({
                //         id: 'text.setAlign',
                //         default: 'align text [ALIGN] width [WIDTH]',
                //         description: ''
                //     }),
                //     blockType: BlockType.COMMAND,
                //     arguments: {
                //         ALIGN: {
                //             type: ArgumentType.STRING,
                //             defaultValue: 'left',
                //             menu: 'ALIGN'
                //         },
                //         WIDTH: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 200
                //         }
                //     }
                // },
                // {
                //     opcode: 'rainbow',
                //     text: formatMessage({
                //         id: 'text.rainbow',
                //         default: 'rainbow for [SECS] seconds',
                //         description: ''
                //     }),
                //     blockType: BlockType.COMMAND,
                //     arguments: {
                //         SECS: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 1
                //         }
                //     }
                // }
                // '---',
                // {
                //     opcode: 'addText',
                //     text: formatMessage({
                //         id: 'text.addText',
                //         default: 'add text [TEXT]',
                //         description: ''
                //     }),
                //     blockType: BlockType.COMMAND,
                //     arguments: {
                //         TEXT: {
                //             type: ArgumentType.STRING,
                //             defaultValue: ' and more!'
                //         }
                //     }
                // },
                // {
                //     opcode: 'addLine',
                //     text: formatMessage({
                //         id: 'text.addLine',
                //         default: 'add line [TEXT]',
                //         description: ''
                //     }),
                //     blockType: BlockType.COMMAND,
                //     arguments: {
                //         TEXT: {
                //             type: ArgumentType.STRING,
                //             defaultValue: 'more lines!'
                //         }
                //     }
                // },
                // '---',
                // {
                //     opcode: 'setOutlineWidth',
                //     text: formatMessage({
                //         id: 'text.setOutlineWidth',
                //         default: 'set outline width to [WIDTH]',
                //         description: ''
                //     }),
                //     blockType: BlockType.COMMAND,
                //     arguments: {
                //         WIDTH: {
                //             type: ArgumentType.NUMBER,
                //             defaultValue: 1
                //         }
                //     }
                // },
                // {
                //     opcode: 'setOutlineColor',
                //     text: formatMessage({
                //         id: 'text.setOutlineColor',
                //         default: 'set outline color to [COLOR]',
                //         description: ''
                //     }),
                //     blockType: BlockType.COMMAND,
                //     arguments: {
                //         COLOR: {
                //             type: ArgumentType.COLOR
                //         }
                //     }
                // }
                ],
                menus: {
                    FONT: {
                        items: [{
                            text: 'Sans Serif',
                            value: SANS_SERIF_ID
                        }, {
                            text: 'Serif',
                            value: SERIF_ID
                        }, {
                            text: 'Handwriting',
                            value: HANDWRITING_ID
                        }, {
                            text: 'Marker',
                            value: MARKER_ID
                        }, {
                            text: 'Curly',
                            value: CURLY_ID
                        }, {
                            text: 'Pixel',
                            value: PIXEL_ID

                        }, {
                            text: '中文',
                            value: CHINESE_ID
                        }, {
                            text: '日本語',
                            value: JAPANESE_ID
                        }, {
                            text: '한국어',
                            value: KOREAN_ID
                        }, {
                            text: formatMessage({
                                id: 'text.randomFont',
                                default: 'random font'
                            }),
                            value: RANDOM_ID
                        }]
                    },
                    ALIGN: {
                        items: [{
                            text: formatMessage({
                                id: 'text.left',
                                default: 'left'
                            }),
                            value: 'left'
                        }, {
                            text: formatMessage({
                                id: 'text.center',
                                default: 'center'
                            }),
                            value: 'center'
                        }, {
                            text: formatMessage({
                                id: 'text.right',
                                default: 'right'
                            }),
                            value: 'right'
                        }]
                    },
                    ANIMATE: {
                        items: [{
                            text: formatMessage({
                                id: 'text.type',
                                default: 'type'
                            }),
                            value: 'type'
                        }, {
                            text: formatMessage({
                                id: 'text.rainbow',
                                default: 'rainbow'
                            }),
                            value: 'rainbow'
                        }, {
                            text: formatMessage({
                                id: 'text.zoom',
                                default: 'zoom'
                            }),
                            value: 'zoom'
                        }]
                    }
                }
            };
        }

        setText (args, util) {
            const textState = this._getTextState(util.target);

            textState.text = this._formatText(args.TEXT);
            textState.visible = true;
            textState.animating = false;

            this._renderText(util.target); // Yield until the next tick.

            return Promise.resolve();
        }

        clearText (args, util) {
            const target = util.target;

            const textState = this._getTextState(target);

            textState.visible = false; // Set state so that clones can know not to render text

            textState.animating = false;
            const costume = target.getCostumes()[target.currentCostume];
            this.runtime.renderer.updateDrawableSkinId(target.drawableID, costume.skinId); // Yield until the next tick.

            return Promise.resolve();
        }

        stopAll () {
            this.runtime.targets.forEach(target => {
                this.clearText({}, {target});
            });
        }

        addText (args, util) {
            const textState = this._getTextState(util.target);

            textState.text += this._formatText(args.TEXT);
            textState.visible = true;
            textState.animating = false;

            this._renderText(util.target); // Yield until the next tick.

            return Promise.resolve();
        }

        addLine (args, util) {
            const textState = this._getTextState(util.target);

            textState.text += "\n".concat(this._formatText(args.TEXT));
            textState.visible = true;
            textState.animating = false;

            this._renderText(util.target); // Yield until the next tick.

            return Promise.resolve();
        }

        setFont (args, util) {
            const textState = this._getTextState(util.target);

            if (args.FONT === RANDOM_ID) {
                textState.font = this._randomFontOtherThan(textState.font);
            } else {
                textState.font = args.FONT;
            }

            this._renderText(util.target);
        }

        _randomFontOtherThan (currentFont) {
            const otherFonts = this.FONT_IDS.filter(id => {
                return id !== currentFont;
            });
            return otherFonts[Math.floor(Math.random() * otherFonts.length)];
        }

        setColor (args, util) {
            const textState = this._getTextState(util.target);

            textState.color = args.COLOR;

            this._renderText(util.target);
        }

        setWidth (args, util) {
            const textState = this._getTextState(util.target);

            textState.maxWidth = Cast.toNumber(args.WIDTH);
            textState.align = args.ALIGN;

            this._renderText(util.target);
        }

        setSize (args, util) {
            const textState = this._getTextState(util.target);

            textState.size = Cast.toNumber(args.SIZE);

            this._renderText(util.target);
        }

        setAlign (args, util) {
            const textState = this._getTextState(util.target);

            textState.maxWidth = Cast.toNumber(args.WIDTH);
            textState.align = args.ALIGN;

            this._renderText(util.target);
        }

        setOutlineWidth (args, util) {
            const textState = this._getTextState(util.target);

            textState.strokeWidth = Cast.toNumber(args.WIDTH);

            this._renderText(util.target);
        }

        setOutlineColor (args, util) {
            const textState = this._getTextState(util.target);

            textState.strokeColor = args.COLOR;
            textState.visible = true;

            this._renderText(util.target);
        }

        /* 
         * The animations (type, zoom and rainbow) all follow the same pattern.
         * 1. The inital state of the animation is set and rendered
         * 2. Variables to indicate the final state are stored on the textState
         * 3. A promise is returned that starts a tick interval for some frame rate
         * 4. The tick function checks for animation-specific end condition (like time)
         *    and global end condition (like being cancelled by stopAll or setText)
         * 5. If the end conditions are met, the tick function does the following:
         *      (a) Sets the final state
         *      (b) Clears the animation state constiables
         *      (c) Clears the interval to stop tick from running
         *      (d) Resolves the promise to indicate the block is done
         * 
         * We do not use the stack timer/stack counter functionality the VM provides
         * because those would leave the animation hanging in the middle if the stack is cancelled.
         * 
         * TODO abstract this shared functionality for all animations.
         */
        _animateText(args, util) {
            const target = util.target;

            const textState = this._getTextState(target);

            if (textState.fullText !== null) return; // Let the running animation finish, do nothing
            // On "first tick", set the text and force animation flags on and render

            textState.fullText = this._formatText(args.TEXT);
            textState.text = textState.fullText[0]; // Start with first char visible

            textState.visible = true;
            textState.animating = true;

            this._renderText(target);

            this.runtime.requestRedraw();
            return new Promise(resolve => {
                const interval = setInterval(() => {
                    if (textState.animating && textState.visible && textState.text !== textState.fullText) {
                        textState.text = textState.fullText.substring(0, textState.text.length + 1);
                    } else {
                        // NB there is no need to update the .text state here, since it is at the end of the
                        // animation (when text == fullText), is being cancelled by force setting text,
                        // or is being cancelled by hitting the stop button which hides the text anyway. 
                        textState.fullText = null;
                        clearInterval(interval);
                        resolve();
                    }

                    this._renderText(target);

                    this.runtime.requestRedraw();
                }, 60
                /* ms, about 1 char every 2 frames */
                );
            });
        }

        _zoomText(args, util) {
            const target = util.target;

            const textState = this._getTextState(target);

            if (textState.targetSize !== null) return; // Let the running animation finish, do nothing

            const timer = new Timer();
            const durationMs = Cast.toNumber(args.SECS || 0.5) * 1000; // On "first tick", set the text and force animation flags on and render

            textState.text = this._formatText(args.TEXT);
            textState.visible = true;
            textState.animating = true;
            textState.targetSize = target.size;
            target.setSize(0);

            this._renderText(target);

            this.runtime.requestRedraw();
            timer.start();
            return new Promise(resolve => {
                const interval = setInterval(() => {
                    const timeElapsed = timer.timeElapsed();

                    if (textState.animating && textState.visible && timeElapsed < durationMs) {
                        target.setSize(textState.targetSize * timeElapsed / durationMs);
                    } else {
                        target.setSize(textState.targetSize);
                        textState.targetSize = null;
                        clearInterval(interval);
                        resolve();
                    }

                    this._renderText(target);

                    this.runtime.requestRedraw();
                }, this.runtime.currentStepTime);
            });
        }

        animateText(args, util) {
            switch (args.ANIMATE) {
                case 'rainbow':
                    return this.rainbow(args, util);

                case 'type':
                    return this._animateText(args, util);

                case 'zoom':
                    return this._zoomText(args, util);
            }
        }

        rainbow (args, util) {
            const target = util.target;

            const textState = this._getTextState(target);

            if (textState.rainbow) return; // Let the running animation finish, do nothing

            const timer = new Timer();
            const durationMs = Cast.toNumber(args.SECS || 2) * 1000; // On "first tick", set the text and force animation flags on and render

            textState.text = this._formatText(args.TEXT);
            textState.visible = true;
            textState.animating = true;
            textState.rainbow = true;

            this._renderText(target);

            timer.start();
            return new Promise(resolve => {
                const interval = setInterval(() => {
                    const timeElapsed = timer.timeElapsed();

                    if (textState.animating && textState.visible && timeElapsed < durationMs) {
                        textState.rainbow = true;
                        target.setEffect('color', timeElapsed / -5);
                    } else {
                        textState.rainbow = false;
                        target.setEffect('color', 0);
                        clearInterval(interval);
                        resolve();
                    }

                    this._renderText(target);
                }, this.runtime.currentStepTime);
            });
        }

        _getTextState (target) {
            let textState = target.getCustomState(Scratch3TextBlocks.STATE_KEY);

            if (!textState) {
                textState = Clone.simple(Scratch3TextBlocks.DEFAULT_TEXT_STATE);
                target.setCustomState(Scratch3TextBlocks.STATE_KEY, textState);
            }

            return textState;
        }

        _formatText (text) {
            if (text === '') return text; // Non-integers should be rounded to 2 decimal places (no more, no less), unless they're small enough that
            // rounding would display them as 0.00. This matches 2.0's behavior:
            // https://github.com/LLK/scratch-flash/blob/2e4a402ceb205a042887f54b26eebe1c2e6da6c0/src/scratch/ScratchSprite.as#L579-L585

            if (typeof text === 'number' && Math.abs(text) >= 0.01 && text % 1 !== 0) {
                text = text.toFixed(2);
            }

            text = Cast.toString(text);
            return text;
        }

        _renderText (target) {
            if (!this.runtime.renderer) return;

            const textState = this._getTextState(target);

            if (!textState.visible) return; // Resetting to costume is done in clear block, early return here is for clones

            textState.skinId = this._updateTextCostumeSkin(textState);
            this.runtime.renderer.updateDrawableSkinId(target.drawableID, textState.skinId);
        }

        _updateTextCostumeSkin (textState) {
            const renderer = this.runtime.renderer;

            // update existing skin
            if (textState.skinId && renderer._allSkins[textState.skinId] instanceof TextCostumeSkin) {
              renderer._allSkins[textState.skinId].setTextAndStyle(textState);
      
              return textState.skinId;
            } // create and update a new skin
      
      
            const skinId = renderer._nextSkinId++;
            const newSkin = new TextCostumeSkin(skinId, renderer);
            renderer._allSkins[skinId] = newSkin;
            newSkin.setTextAndStyle(textState); // renderer._reskin(skinId, newSkin); // this is erroring- might be necessary?
      
            return skinId;
        }

        _onTargetCreated (newTarget, sourceTarget) {
            if (sourceTarget) {
                const sourceTextState = sourceTarget.getCustomState(Scratch3TextBlocks.STATE_KEY);

                if (sourceTextState) {
                    newTarget.setCustomState(Scratch3TextBlocks.STATE_KEY, Clone.simple(sourceTextState));
                    const newTargetState = newTarget.getCustomState(Scratch3TextBlocks.STATE_KEY); // Note here that clones do not share skins with their original target. This is a subtle but important
                    // departure from the rest of Scratch, where clones always stay in sync with the originals costume.
                    // The "rule" is anything that can be done with the blocks is clone-specific, since that is where you make clones,
                    // but anything outside of the blocks (costume/sounds) are shared.
                    // For example, graphic effects are clone-specific, but changing the costume in the paint editor is shared.
                    // Since you can change the text on the skin from the blocks, each clone needs its own skin.

                    newTargetState.skinId = null; // Unset all of the animation flags

                    newTargetState.rainbow = false;
                    newTargetState.targetSize = null;
                    newTargetState.fullText = null;
                    newTargetState.animating = false; // Must wait until the drawable has been initialized, but before render. We can
                    // wait for the first EVENT_TARGET_VISUAL_CHANGE for this.

                    const onDrawableReady = () => {
                        this._renderText(newTarget);

                        newTarget.off('EVENT_TARGET_VISUAL_CHANGE', onDrawableReady);
                    };

                    newTarget.on('EVENT_TARGET_VISUAL_CHANGE', onDrawableReady);
                }
            }
        }

        _onTargetWillExit(target) {
            const textState = this._getTextState(target);

            if (textState.skinId) {
                // The drawable will get cleaned up by RenderedTarget#dispose, but that doesn't
                // automatically destroy attached skins (because they are usually shared between clones).
                // For text skins, however, all clones get their own, so we need to manually destroy them.
                this.runtime.renderer.destroySkin(textState.skinId);
                textState.skinId = null;
            }
        }
    }

    Scratch.extensions.register(new Scratch3TextBlocks());

    Scratch.extensions.translations({
        en: {
            'text.categoryName': 'Animated Text',
            'text.setText': 'show text [TEXT]',
            'text.animateText': '[ANIMATE] text [TEXT]',
            'text.clearText': 'show sprite',
            'text.setFont': 'set font to [FONT]',
            'text.setColor': 'set text color to [COLOR]',
            'text.setWidth': 'set width to [WIDTH] aligned [ALIGN]',
            'text.defaultText': 'Welcome to my project!',
            'text.defaultAnimateText': 'Here we go!',
            'text.randomFont': 'random font',
            'text.left': 'left',
            'text.center': 'center',
            'text.right': 'right',
            'text.type': 'type',
            'text.rainbow': 'rainbow',
            'text.zoom': 'zoom'
        },
        'zh-cn': {
            'text.categoryName': '动画文字',
            'text.setText': '显示文字 [TEXT]',
            'text.animateText': '将动画设为 [ANIMATE] 显示文字 [TEXT]',
            'text.clearText': '显示角色',
            'text.setFont': '将字体设为 [FONT]',
            'text.setColor': '将颜色设为 [COLOR]',
            'text.setWidth': '将文字宽度设为 [WIDTH] 靠 [ALIGN] 对齐',
            'text.defaultText': '欢迎来到我的项目！',
            'text.defaultAnimateText': '开始吧！',
            'text.randomFont': '随机字体',
            'text.left': '左',
            'text.center': '中间',
            'text.right': '右',
            'text.type': '打字',
            'text.rainbow': '彩虹',
            'text.zoom': '放大'
        },
        'zh-tw': {
            'text.categoryName': '動畫文字',
            'text.setText': '顯示文字 [TEXT]',
            'text.animateText': '將動畫設為 [ANIMATE] 顯示文字 [TEXT]',
            'text.clearText': '顯示角色',
            'text.setFont': '將字體設為 [FONT]',
            'text.setColor': '將顏色設為 [COLOR]',
            'text.setWidth': '將文字寬度設為 [WIDTH] 靠 [ALIGN] 對齊',
            'text.defaultText': '歡迎來到我的項目！',
            'text.defaultAnimateText': '開始吧！',
            'text.randomFont': '隨機字體',
            'text.left': '左',
            'text.center': '中間',
            'text.right': '右',
            'text.type': '打字',
            'text.rainbow': '彩虹',
            'text.zoom': '放大'
        }
    });
})();
