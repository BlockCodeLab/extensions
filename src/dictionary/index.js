(function () {
    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const Cast = Scratch.Cast;
    const formatMessage = Scratch.formatMessage;

    // eslint-disable-next-line max-len
    const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTcwIiBoZWlnaHQ9IjE3MCIgdmlld0JveD0iMCAwIDE3MCAxNzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGltYWdlIGlkPSJpbWFnZTEiIHg9IjMiIHk9IjU3IiB3aWR0aD0iMTY0IiBoZWlnaHQ9IjU2IiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsIGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFLUUFBQUE0Q0FZQUFBQnpFVk41QUFBQUFYTlNSMElBcnM0YzZRQUFBRVJsV0VsbVRVMEFLZ0FBQUFnQUFZZHBBQVFBQUFBQkFBQUFHZ0FBQUFBQUE2QUJBQU1BQUFBQkFBRUFBS0FDQUFRQUFBQUJBQUFBcEtBREFBUUFBQUFCQUFBQU9BQUFBQUExa2xLWEFBQUdRRWxFUVZSNEFlMmRYMmdjUlJ6SGZ6TzdtL3VUWFA1b2l2SEluOUlVd2NaRzZ4OVFLYmFsb3JaWUtxZ2dQcFJVclVFcSt1S0QrTlFISDN4cnBNVFVGRzJmcEtCb2FUV0tKdlFQaWxBdGdyV2dSTnVnTlduU2t2Ly83dloyeDkra2pYZlo3TzNkWlRkaGMvdWJrTnpPYjM0enpIem11ek96dWQwZEJwYnd6Qkd4VlorRlY0VUp0Y0JBc3lSbmpZWktZYWpzZHZnbkhJWXA0Q0N5T3ZvMVFZQ09WUnN3VE9qNWVBZjd3Nm1hRzAvdTI1RktHUzJtWUhIVEFOWHF5NWlvUk5zYUFGWWlCRktjQ3dKQ0VTVVpDU3RKVlFNVGZ5U2tFUDVHUVFoRnhoU0ZtNXJLRGNZeGwwTXdET2d2Q2JGSnJ2Q2tyWnNRWjIzdFBqRnlZTExlL1lZd3Z1MStxT055WnJWdXdRSjQ5Z094Ym5vR1RrK05RMzJtUTY1akxReFEwNGhVSzNKNXJxcjBFNmlRMXNOUHNxSE1XbS80YkYvVHJKN3FucG95YXpMdHVZNGpFUTUxZFNHSVJMRlVDbWtDQWdSajdMaGFZdXovcXJsalJDYk1DZktGRHJIMitpajhqaU5qS08yZCswaUtzV0VqZ0pMM09KcTdUTDk0TUJNdWN3NlB6SXV5K2ZPWDd4bWVTUDJpNjR0SFJLYzZSNk1jR2hzandKWC96MzBuOTBDbTRYUndTVmUweldjMnRZMXlTV0IwR25vS0ZhUE1GNytyT01VbzJ5WTRyRE1BT3VXeERKTUo4VjJoWXNTekh4cldoa21NTnhGbS9ZdW5hbE9Kb2JkSkIvYjhFZkhBMEZYNDJYSFJZbE9VbktMcm1td1Npc3lFc080K3I3YzJEbHhMZkZsbzA2cXFWS2h2d0dtRVFrNENRdUJWaThMcjFJUU9yeFFxUmxsNmFYR3RHYk1DTXhsc1R5YU5MVmtkSEJKaXNVWFhPdzdld1U3QzJRUXZoYzF0SEsvWUNycUltY2VtbHN3ZkZmY25OeUZ1cEVSOEthMVVWRm8zRnNhTnhUbU9qa3M3alFQQ1d2TEJpOEVsWFI3anYyOEs2NCtBZXlNdGJlNmlKdUFjcVBrK0lrQ0M5RkZuVUZVQXYxT2hRQVI4UklBRTZhUE9vS3JRQ0VrYThCa0JHaUY5MWlGQnJ3NEpNdWdLOEZuN1NaQSs2NUNnVjRjRUdYUUYrS3o5SkVpZmRValFxME9DRExvQ2ZOWitFcVRQT2lUbzFTRkJCbDBCUG1zL0NkSm5IUkwwNnBBZ25SUWc0SHNFOUltVEM2VjVTMkJwOTBKNld3Yy9scGJDU3IxNWFtQnZsekRnYlh5czlYNC9WcklZNjBTQ3RPbFZ2UGY0alJOWFcvNWlBbjdGNUpqelU5STJCWkJweVFSSWtGWjBPRTJmSE5qN05ZcnhJaWFWV1pNcHZyd0VhQTFwNWN1Z1hVN1RhQ1l4V3Rtc1FKd0VhWUZzTURpSFQyWHZ0SmdwdWtJRVNKQVcwQk9qY0FOTmQxak1GRjBoQWlSSUMraFlKVlNqYWRCaXB1Z0tFU0JCV2tBckFoN0RGM3AwV2N3VVhTRUNKRWdyYUFIN21RTHZvWG5DbWtUeDVTZEFnclF5WnJCNVYvem9Uc0hnT1V3aVVWcjVMSE9jQkdrUCtQM2R0Y2ZXTTRVMTQvVDlJYjdFelA3Rm9QWjV5ZXFDQVAxajNCNmU1TksrNjg2ajhydnMxMCtQdjNUdjJMajVzTDByV2Iwa1FDT2tFMDJjdmsyQUY1MWNLTTFiQWlSSWIzbFNhUzRKa0NCZEFxVHMzaElnUVhyTGswcHpTWUFFNlJJZ1pmZVdBQW5TVzU1VW1rc0NKRWlYQUNtN3R3UklrTjd5cE5KY0VpQkJ1Z1JJMmIwbFFJTDBsaWVWNXBJQUNkSWxRTXJ1TFFFU3BMYzhxVFNYQkVpUUxnRlNkbThKa0NDOTVVbWx1U1NBZTJsRFlpbGxtSGdiVENBQzNndkpJY3RHNmJrQTRFYUpGUEluZ1B2V0o3aktvVGYvTEdsUEl5QzNyT0oyWjMxTVkxZlNMYy8vS0tFSDVhek5uNG1qcCtCOVBNcmdFTzdEV1hDWW1Odi92ZUJzcXlvRHZrSWxwYXJ3amFwcGgrVGUxNFdHaVRINWlpQUsrUkVRTXdsVjdlSEhYMk45MFNyNE1iOU1hYS9FSkQ1d01weU9GK01SUGxmVGVYZzcrL2ZpMHgwWHltTHN0MExiT0Q1dXdQUTBiZ05QSVNjQkp0akJNNXZhUnVmR1JqVUVqNGZMNEhyT1hCYUh3VDhCRWxNV1k1RkVjWFE4Vng2RHQrYWJFeXJuVzhJUlBqWWZ6L2V6cnk4QnlTVHRDcHVEVjljTnBoK1FQbk9DUE5YS3B1UFZVQis3RGJxNUFublRNM0JHK2h2SGpaRUJmUGxJOFN5WDVKT0c3MFpNZU9MZ28yeEdRcExoMGxNZkRkYzJzTHJLY3VVSGpsdU4zN1RtL3FzblRlanRuWWFSWVIzb0xXb0xlU0VQdWZCN0p6bXhadmVGQnp0MW1icG9ZYlMxWFpSVmFMQUhkRmkvTUx0ekRKOWxucTJvZ2Q1UUZIQXlYNTBCMzNnMm1DaUI4OGUyc1ZtbkZ0ejNSVXRsaXFsN0RKT3R0ZlZqRU1KVGRBTUlWcDZaempWVGo0YlVVVnl6MzFwY01sV1lvaFk3SmlyOWNEQklhWm95eFJrNG50NjZZVjZKbENyWEZNWnNMeTF4dVZ2d0VpeXpuaXR5TEtDL01scjkwNmROQnhhMDRUL1FabnBPcFBoS25RQUFBQUJKUlU1RXJrSmdnZz09Ii8+CiAgICA8dGV4dCBpZD0iSyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeD0iNDYiIHk9IjEwMSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIFJvdW5kZWQgTVQgQm9sZCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzNlN2ZmZiI+SzwvdGV4dD4KICAgIDx0ZXh0IGlkPSJWYSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeD0iMTI4IiB5PSIxMDEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCBSb3VuZGVkIE1UIEJvbGQiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiMxNzljNWYiPlZhPC90ZXh0Pgo8L3N2Zz4K';

    const LIST_TYPE = 'list';

    class DictionaryBlocks {
        constructor () {
            this.runtime = Scratch.vm.runtime;
            this._dicts = {};
        }

        getInfo () {
            return {
                id: 'dictionary',
                name: formatMessage({
                    id: 'dictionary.name',
                    default: 'Dictionary'
                }),
                blockIconURI,
                blocks: [
                    {
                        blockType: BlockType.BUTTON,
                        func: 'MAKE_A_LIST',
                        text: formatMessage({
                            id: 'dictionary.makeADictionary',
                            default: 'Make a List as a Dictionary'
                        })
                    },
                    '---',
                    {
                        opcode: 'addKeyValue',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'dictionary.addKeyValue',
                            default: 'add [VALUE] as [KEY] key to [DICT]'
                        }),
                        arguments: {
                            KEY: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'dictionary.defaultKey',
                                    default: 'one'
                                }),
                            },
                            VALUE: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'dictionary.defaultValue',
                                    default: 'thing'
                                }),
                            },
                            DICT: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'removeKey',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'dictionary.removeKey',
                            default: 'delete [KEY] key of [DICT]'
                        }),
                        arguments: {
                            KEY: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'dictionary.defaultKey',
                                    default: 'one'
                                }),
                            },
                            DICT: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    },
                    {
                        opcode: 'removeAll',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'dictionary.removeAllKeys',
                            default: 'delete all of [DICT]'
                        }),
                        arguments: {
                            DICT: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    },
                    {
                        opcode: 'replaceKeyValue',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'dictionary.replaceKeyValue',
                            default: 'replace item [KEY] key of [DICT] with [VALUE]'
                        }),
                        arguments: {
                            KEY: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'dictionary.defaultKey',
                                    default: 'one'
                                }),
                            },
                            VALUE: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'dictionary.defaultValue',
                                    default: 'thing'
                                }),
                            },
                            DICT: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'getValue',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'dictionary.getValue',
                            default: 'item [KEY] key of [DICT]'
                        }),
                        arguments: {
                            KEY: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'dictionary.defaultKey',
                                    default: 'one'
                                }),
                            },
                            DICT: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    },
                    {
                        opcode: 'getKey',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'dictionary.getKey',
                            default: 'item key of [VALUE] in [DICT]'
                        }),
                        arguments: {
                            VALUE: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'dictionary.defaultValue',
                                    default: 'thing'
                                }),
                            },
                            DICT: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    },
                    {
                        opcode: 'getLength',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'dictionary.getLength',
                            default: 'length of [DICT]'
                        }),
                        arguments: {
                            DICT: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        },
                        disableMonitor: true
                    },
                    {
                        opcode: 'isContains',
                        blockType: BlockType.BOOLEAN,
                        text: formatMessage({
                            id: 'dictionary.isContains',
                            default: '[DICT] contains [KEY] key?'
                        }),
                        arguments: {
                            DICT: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            },
                            KEY: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'dictionary.defaultKey',
                                    default: 'one'
                                }),
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'showDictionary',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'dictionary.showDictionary',
                            default: 'show dictionary [DICT]'
                        }),
                        arguments: {
                            DICT: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    },
                    {
                        opcode: 'hideDictionary',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'dictionary.hideDictionary',
                            default: 'hide dictionary [DICT]'
                        }),
                        arguments: {
                            DICT: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    }
                ],
                menus: {
                    LISTS: {
                        items: 'LISTS_MENU'
                    }
                }
            }
        }

        LISTS_MENU () {
            const stage = this.runtime.getTargetForStage();
            const target = this.runtime.getEditingTarget();
            const globalLists = Object.values(stage.variables).filter(this._filter);
            const localLists = Object.values(target.variables).filter(this._filter);
            const uniqueLists = [...new Set([...globalLists, ...localLists])];

            if (uniqueLists.length === 0) {
                const variable = this.runtime.createNewGlobalVariable(
                    formatMessage({
                        id: 'dictionary.defaultVariableName',
                        default: 'my dictionary'
                    }),
                    null,
                    LIST_TYPE
                );
                uniqueLists.push(variable);
                // ? Why
                Scratch.vm.setEditingTarget(stage.id);
                Scratch.vm.setEditingTarget(target.id);
            }

            return uniqueLists.map(i => ({
                text: i.name,
                value: i.id
            }));
        }

        _filter (item) {
            if (item.type !== 'list' || !Array.isArray(item.value)) {
                return false;
            }
            if (item.value.length === 0) {
                return true;
            }
            return item.value.every(item => `${item}`.split(',').length === 2);
        }

        addKeyValue (args, util) {
            const id = Cast.toString(args.DICT);
            const list = util.target.lookupVariableById(id);
            if (list) {
                if (!this._dicts[id]) {
                    this._initDict(id, list)
                }
                const key = Cast.toString(args.KEY);
                const value = Cast.toString(args.VALUE);
                this._dicts[id][key] = value;
                this._updateList(list);
            }
        }

        _initDict(id, list) {
            this._dicts[id] = list ? (list.value.reduce((result, item) =>  {
                const [key, value] = item.split(',');
                result[decodeURIComponent(key)] = decodeURIComponent(value);
                return result;
            }, {})) : {};
        }

        _updateList (list) {
            const id = list.id;
            list.value = Object.entries(this._dicts[id])
                .map(([key, value]) => `${encodeURIComponent(key)},${encodeURIComponent(value)}`);
        }

        removeKey (args, util) {
            const id = Cast.toString(args.DICT);
            if (this._dicts[id]) {
                const key = Cast.toString(args.KEY);
                delete this._dicts[id][key];
                
                const list = util.target.lookupVariableById(id);
                if (list) {
                    this._updateList(list);
                }
            }
        }

        removeAll (args, util) {
            const id = Cast.toString(args.DICT);
            const list = util.target.lookupVariableById(id);
            delete this._dicts[id];
            if (list) {
                list.value = [];
            }
        }

        replaceKeyValue (args, util) {
            this.addKeyValue(args, util);
        }

        getValue (args, util) {
            const id = Cast.toString(args.DICT);
            const key = Cast.toString(args.KEY);
            if (!this._dicts[id]) {
                const list = util.target.lookupVariableById(id);
                this._initDict(id, list);
            }
            return this._dicts[id][key] || '';
        }

        getKey (args, util) {
            const id = Cast.toString(args.DICT);
            const value = Cast.toString(args.VALUE);
            if (!this._dicts[id]) {
                const list = util.target.lookupVariableById(id);
                this._initDict(id, list);
            }
            const keys = Object.keys(this._dicts[id]);
            const values = Object.values(this._dicts[id]);
            const index = values.findIndex(v => v === value);
            return keys[index] || '';
        }

        getLength (args, util) {
            const id = Cast.toString(args.DICT);
            if (!this._dicts[id]) {
                const list = util.target.lookupVariableById(id);
                this._initDict(id, list);
            }
            return Object.keys(this._dicts[id]).length;
        }

        isContains (args) {
            const id = Cast.toString(args.DICT);
            const key = Cast.toString(args.KEY);
            return !!(this._dicts[id] && this._dicts[id][key]);
        }

        showDictionary (args) {
            const id = Cast.toString(args.DICT);
            this._changeMonitorVisibility(id, true);
        }

        hideDictionary (args) {
            const id = Cast.toString(args.DICT);
            this._changeMonitorVisibility(id, false);
        }

        _changeMonitorVisibility (id, visible) {
            // Send the monitor blocks an event like the flyout checkbox event.
            // This both updates the monitor state and changes the isMonitored block flag.
            this.runtime.monitorBlocks.changeBlock({
                id: id, // Monitor blocks for variables are the variable ID.
                element: 'checkbox', // Mimic checkbox event from flyout.
                value: visible
            }, this.runtime);
        }
    }

    Scratch.extensions.register(new DictionaryBlocks());

    Scratch.extensions.translations({
        en: {
            'dictionary.name': 'Dictionary',
            'dictionary.makeADictionary': 'Make a List as a Dictionary',
            'dictionary.defaultKey': 'one',
            'dictionary.defaultValue': 'thing',
            'dictionary.addKeyValue': 'add [VALUE] as [KEY] key to [DICT]',
            'dictionary.removeKey': 'delete [KEY] key of [DICT]',
            'dictionary.removeAllKeys': 'delete all of [DICT]',
            'dictionary.replaceKeyValue': 'replace item [KEY] key of [DICT] with [VALUE]',
            'dictionary.getValue': 'item [KEY] key of [DICT]',
            'dictionary.getKey': 'item key of [VALUE] in [DICT]',
            'dictionary.getLength': 'length of [DICT]',
            'dictionary.isContains': '[DICT] contains [KEY] key?',
            'dictionary.showDictionary': 'show dictionary [DICT]',
            'dictionary.hideDictionary': 'hide dictionary [DICT]',
            'dictionary.defaultVariableName': 'my dictionary'
        },
        'zh-cn': {
            'dictionary.name': '字典',
            'dictionary.makeADictionary': '建立一个列表作为字典',
            'dictionary.defaultKey': '一个',
            'dictionary.defaultValue': '东西',
            'dictionary.addKeyValue': '将 [VALUE] 以 [KEY] 键名加入 [DICT]',
            'dictionary.removeKey': '删除 [DICT] 键名为 [KEY] 的项',
            'dictionary.removeAllKeys': '删除 [DICT] 的全部项目',
            'dictionary.replaceKeyValue': '将 [DICT] 键名为 [KEY] 的项替换为 [VALUE]',
            'dictionary.getValue': '[DICT] 键名为 [KEY] 的项',
            'dictionary.getKey': '[DICT] 中第一个 [VALUE] 的键名',
            'dictionary.getLength': '[DICT] 的项目数',
            'dictionary.isContains': '[DICT] 包含键名 [KEY]?',
            'dictionary.showDictionary': '显示字典 [DICT]',
            'dictionary.hideDictionary': '隐藏字典 [DICT]',
            'dictionary.defaultVariableName': '我的字典'
        },
        'zh-tw': {
            'dictionary.name': '字典',
            'dictionary.makeADictionary': '建立一个清单作为字典',
            'dictionary.defaultKey': '一個',
            'dictionary.defaultValue': '東西',
            'dictionary.addKeyValue': '以 [KEY] 键名添加 [VALUE] 到 [DICT]',
            'dictionary.removeKey': '删除 [DICT] 键名为 [KEY] 的项',
            'dictionary.removeAllKeys': '删除 [DICT] 的所有项目',
            'dictionary.replaceKeyValue': '替换 [DICT] 键名为 [KEY] 的项为 [VALUE]',
            'dictionary.getValue': '[DICT] 键名为 [KEY] 的项',
            'dictionary.getKey': '[VALUE] 在 [DICT] 里的键名',
            'dictionary.getLength': '字典 [DICT] 的长度',
            'dictionary.isContains': '字典 [DICT] 包含键名 [KEY]?',
            'dictionary.showDictionary': '字典 [DICT] 显示',
            'dictionary.hideDictionary': '字典 [DICT] 隐藏',
            'dictionary.defaultVariableName': 'my dictionary'
        }
    });
})();
