(function (Scratch) {
    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const formatMessage = Scratch.formatMessage;

    // eslint-disable-next-line max-len
    const blockIconURI = 'data:image/png;base64,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';

    class FetchBlocks {
        constructor () {
            this.cache = {};
            this.data = {};
        }

        getInfo () {
            return {
                id: 'fetch',
                name: formatMessage({
                    id: 'fetch.name',
                    default: 'Fetch Data'
                }),
                blockIconURI,
                blocks: [
                    {
                        opcode: 'fetch',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'fetch.data',
                            default: 'fetch JSON data from [URL]'
                        }),
                        arguments: {
                            URL: {
                                type: ArgumentType.STRING,
                                defaultValue: 'https://example.com/data.json',
                            }
                        }
                    },
                    {
                        opcode: 'query',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'fetch.query',
                            default: 'query [PATH] in data'
                        }),
                        arguments: {
                            PATH: {
                                type: ArgumentType.STRING,
                                defaultValue: 'path.key',
                            },
                        }
                    },
                    {
                        opcode: 'length',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'fetch.length',
                            default: 'length of data'
                        }),
                        disableMonitor: true
                    },
                    {
                        opcode: 'clear',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'fetch.clear',
                            default: 'clear cache'
                        })
                    },
                ]
            }
        }

        async fetch (args) {
            const {URL} = args;
            if (this.cache[URL]) {
                this.data = this.cache[URL];
                return
            }
            let data;
            try {
                const res = await fetch(URL);
                data = await res.json();
            } catch (e) {
                console.error(`error fetching result! ${e}`);
                this.data = {};
                return;
            }
            this.cache[URL] = data;
            this.data = data;
        }

        query (args) {
            const {PATH} = args;
            if (!PATH) return '';

            let data = this.data;
            try {
                const keys = PATH.split('.');
                for (let key of keys) {
                    if (!data[key]) return data[key] === 0 ? 0 : '';
                    if (/^\d+$/.test(key)) key = parseInt(key);
                    data = data[key];
                }
            } catch (e) {
                console.error(`error query data! ${e}`);
                return '';
            }
            return data;
        }

        length () {
            if (Array.isArray(this.data)) {
                return this.data.length;
            } else {
                return Object.keys(this.data).length;
            }
        }

        clear () {
            this.cache = {};
            this.data = {};
        }
    }

    Scratch.extensions.register(new FetchBlocks());

    Scratch.extensions.translations({
        en: {
            'fetch.name': 'Fetch Data',
            'fetch.data': 'fetch JSON data from [URL]',
            'fetch.query': 'query [PATH] in data',
            'fetch.length': 'length of data',
            'fetch.clear': 'clear cache'
        },
        'zh-cn': {
            'fetch.name': 'Fetch 数据',
            'fetch.data': '从 [URL] 获取 JSON 数据',
            'fetch.query': '在数据中查询 [PATH] 项目',
            'fetch.length': '数据的项目数',
            'fetch.clear': '清除缓存'
        },
        'zh-tw': {
            'fetch.name': 'Fetch 數據',
            'fetch.data': '從 [URL] 獲取 JSON 數據',
            'fetch.query': '在數據中查詢 [PATH] 項目',
            'fetch.length': '數據的項目數',
            'fetch.clear': '清除緩存'
        }
    });
})(Scratch);
