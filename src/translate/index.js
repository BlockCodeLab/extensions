(async function (LANGUAGE_NAMES) {
    await Scratch.require('https://unpkg.com/fetch-jsonp@1.2.3/build/fetch-jsonp.js');
    await Scratch.require('https://unpkg.com/js-md5@0.7.3/build/md5.min.js');

    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const formatMessage = Scratch.formatMessage;

    const menuIconURI = 'data:image/png;base64,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';
    const blockIconURI = 'data:image/png;base64,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';

    const serverURL = 'https://fanyi-api.baidu.com/api/trans/vip/translate';

    class TranslateBlocks {
        static get EXTENSION_ID () {
            return 'translate';
        }

        constructor () {
            this._languageNames = LANGUAGE_NAMES;

            this._supportedLanguages = this._getSupportedLanguages(this.getViewerLanguageCode());
            this._randomLanguageCode = 'en';

            this._translateResult = '';
            this._lastLangTranslated = '';
            this._lastTextTranslated = '';

            this.appid = '';
            this.secret = '';

            this.runtime = Scratch.vm.runtime;

            this.runtime.on('BLOCKSINFO_UPDATE', this._clearCache.bind(this));
        }

        get Blocks () {
            return [
                {
                    opcode: 'getTranslate',
                    text: formatMessage({
                        id: 'translate.translateBlock',
                        default: 'translate [WORDS] to [LANGUAGE]'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        WORDS: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'translate.defaultTextToTranslate',
                                default: 'hello',
                                description: 'hello: the default text to translate'
                            })
                        },
                        LANGUAGE: {
                            type: ArgumentType.STRING,
                            menu: 'languages',
                            defaultValue: this._randomLanguageCode
                        }
                    }
                },
                {
                    opcode: 'getViewerLanguage',
                    text: formatMessage({
                        id: 'translate.viewerLanguage',
                        default: 'language',
                        description: 'the languge of the project viewer'
                    }),
                    blockType: BlockType.REPORTER,
                }
            ];
        }

        getInfo () {
            const locale = formatMessage.setup().locale;
            this._supportedLanguages = this._getSupportedLanguages(this.getViewerLanguageCode());
            this._randomLanguageCode = this._supportedLanguages[
                Math.floor(Math.random() * this._supportedLanguages.length)].value;

            return {
                id: TranslateBlocks.EXTENSION_ID,
                name: formatMessage({
                    id: 'translate.categoryName',
                    default: 'Translate'
                }),
                blockIconURI: blockIconURI,
                menuIconURI: menuIconURI,
                docsURI: Scratch.require.resolve(`readme.${locale}.html`),
                blocks: this.Blocks,
                menus: {
                    languages: {
                        acceptReporters: true,
                        items: this._supportedLanguages
                    }
                }
            };
        }

        _getToken () {
            try {
                const token = Scratch.extensions.getConfig(TranslateBlocks.EXTENSION_ID);
                this.appid = token.appid;
                this.secret = token.secret;
            } catch (e) { /* ignore */ }
        }

        _getSupportedLanguages (code) {
            return this._languageNames.menuMap[code].map(entry => {
                const obj = {text: entry.name, value: entry.code};
                return obj;
            });
        }

        getViewerLanguage () {
            const viewerLanguageCode = this.getViewerLanguageCode();
            const names = this._languageNames.menuMap[viewerLanguageCode];
            let langNameObj = names.find(obj => obj.code === viewerLanguageCode);

            // the language code of scratch to the baidu language code
            if (!langNameObj && this._languageNames.scratchToBaiduMap[viewerLanguageCode]) {
                const lookupCode = this._languageNames.scratchToBaiduMap[viewerLanguageCode];
                langNameObj = names.find(obj => obj.code === lookupCode);
            }

            let langName = viewerLanguageCode;
            if (langNameObj) {
                langName = langNameObj.name;
            }
            return langName;
        }

        getViewerLanguageCode () {
            const locale = formatMessage.setup().locale;
            const viewerLanguages = [locale].concat(navigator.languages);
            const languageKeys = Object.keys(this._languageNames.menuMap);
            // Return the first entry in viewerLanguages that matches
            // one of the available language keys.
            const languageCode = viewerLanguages.reduce((acc, lang) => {
                if (acc) {
                    return acc;
                }
                if (languageKeys.indexOf(lang.toLowerCase()) > -1) {
                    return lang;
                }
                return acc;
            }, '') || 'en';

            return languageCode.toLowerCase();
        }

        async getTranslate (args) {
            if (!this.appid || !this.secret) {
                await this._getToken();
            }
            if (!this.appid || !this.secret) {
                return '';
            }

            // If the text contains only digits 0-9 and nothing else, return it without
            // making a request.
            if (/^\d+$/.test(args.WORDS)) return Promise.resolve(args.WORDS);

            // Don't remake the request if we already have the value.
            if (this._lastTextTranslated === args.WORDS &&
                this._lastLangTranslated === args.LANGUAGE) {
                return this._translateResult;
            }

            const lang = args.LANGUAGE;
            const salt = Math.floor(Math.random() * 100000);
            const signStr = `${this.appid}${args.WORDS}${salt}${this.secret}`;

            let url = `${serverURL}?appid=${this.appid}&from=auto`;
            url += `&to=${lang}`;
            url += `&q=${encodeURIComponent(args.WORDS)}`;
            url += `&salt=${salt}`;
            url += `&sign=${window.md5(signStr)}`;

            const res = await window.fetchJsonp(url);
            const {trans_result, error_msg} = await res.json();

            if (error_msg) {
                console.warn(`error fetching translate result! ${error_msg}`);
                return '';
            }
            if (trans_result && trans_result.length > 0) {
                const translated = trans_result[0].dst;
                this._translateResult = translated;
                // Cache what we just translated so we don't keep making the
                // same call over and over.
                this._lastTextTranslated = args.WORDS;
                this._lastLangTranslated = args.LANGUAGE;
                return translated;
            }
            return '';
        }

        _clearCache () {
            this._translateResult = '';
            this._lastLangTranslated = '';
            this._lastTextTranslated = '';
        }
    }

    Scratch.extensions.register(new TranslateBlocks());
})(
    {
        menuMap: {
            en: [
                { code: 'ara', name: 'Arabic' },
                { code: 'bul', name: 'Bulgarian' },
                { code: 'cs', name: 'Czech' },
                { code: 'dan', name: 'Danish' },
                { code: 'de', name: 'German' },
                { code: 'el', name: 'Greek' },
                { code: 'en', name: 'English' },
                { code: 'spa', name: 'Spanish' },
                { code: 'est', name: 'Estonian' },
                { code: 'fin', name: 'Finnish' },
                { code: 'fra', name: 'French' },
                { code: 'hu', name: 'Hungarian' },
                { code: 'it', name: 'Italian' },
                { code: 'jp', name: 'Japanese' },
                { code: 'kor', name: 'Korean' },
                { code: 'nl', name: 'Dutch' },
                { code: 'pl', name: 'Polish' },
                { code: 'pt', name: 'Portuguese' },
                { code: 'rom', name: 'Romanian' },
                { code: 'ru', name: 'Russian' },
                { code: 'slo', name: 'Slovenian' },
                { code: 'swe', name: 'Swedish' },
                { code: 'th', name: 'Thai' },
                { code: 'vie', name: 'Vietnamese' },
                { code: 'zh', name: 'Chinese (Simplified)' },
                { code: 'cht', name: 'Chinese (Traditional)' }
            ],
            'zh-cn': [
                { code: 'ara', name: '阿拉伯语' },
                { code: 'bul', name: '保加利亚语' },
                { code: 'cs', name: '捷克语' },
                { code: 'dan', name: '丹麦语' },
                { code: 'de', name: '德语' },
                { code: 'el', name: '希腊语' },
                { code: 'en', name: '英语' },
                { code: 'spa', name: '西班牙语' },
                { code: 'est', name: '爱沙尼亚语' },
                { code: 'fin', name: '芬兰语' },
                { code: 'fra', name: '法语' },
                { code: 'hu', name: '匈牙利语' },
                { code: 'it', name: '意大利语' },
                { code: 'jp', name: '日语' },
                { code: 'kor', name: '韩语' },
                { code: 'nl', name: '荷兰语' },
                { code: 'pl', name: '波兰语' },
                { code: 'pt', name: '葡萄牙语' },
                { code: 'rom', name: '罗马尼亚语' },
                { code: 'ru', name: '俄语' },
                { code: 'slo', name: '斯洛文尼亚语' },
                { code: 'swe', name: '瑞典语' },
                { code: 'th', name: '泰语' },
                { code: 'vie', name: '越南语' },
                { code: 'zh', name: '简体中文' },
                { code: 'cht', name: '繁体中文' }
            ],
            'zh-tw': [
                { code: 'ara', name: '阿拉伯文' },
                { code: 'bul', name: '保加利亞文' },
                { code: 'cs', name: '捷克文' },
                { code: 'dan', name: '丹麥文' },
                { code: 'de', name: '德文' },
                { code: 'el', name: '希臘文' },
                { code: 'en', name: '英文' },
                { code: 'spa', name: '西班牙文' },
                { code: 'est', name: '愛沙尼亞文' },
                { code: 'fin', name: '芬蘭文' },
                { code: 'fra', name: '法文' },
                { code: 'hu', name: '匈牙利文' },
                { code: 'it', name: '義大利文' },
                { code: 'jp', name: '日文' },
                { code: 'kor', name: '韓文' },
                { code: 'nl', name: '荷蘭文' },
                { code: 'pl', name: '波蘭文' },
                { code: 'pt', name: '葡萄牙文' },
                { code: 'rom', name: '羅馬尼亞文' },
                { code: 'ru', name: '俄文' },
                { code: 'slo', name: '斯洛維尼亞文' },
                { code: 'swe', name: '瑞典文' },
                { code: 'th', name: '泰文' },
                { code: 'vie', name: '越南文' },
                { code: 'zh', name: '簡體中文' },
                { code: 'cht', name: '繁體中文' }
            ]
        },
        scratchToBaiduMap: {
            ar: 'ara',
            bg: 'bul',
            da: 'dan',
            es: 'spa',
            et: 'est',
            fi: 'fin',
            fr: 'fra',
            ja: 'jp',
            ko: 'kor',
            ro: 'rom',
            sl: 'slo',
            sv: 'swe',
            vi: 'vie',
            'zh-cn': 'zh',
            'zh-tw': 'cht',
        }
    }
);
