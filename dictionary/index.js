!function(d){const t=d.ArgumentType,e=d.BlockType,n=d.Cast,l=d.formatMessage;d.extensions.register(new class{constructor(){this.runtime=d.vm.runtime,this._dicts={}}initialList(){var t,e,i,a=this._getUniqueLists();0===a.length&&(t=this.runtime.getTargetForStage(),e=this.runtime.getEditingTarget(),t)&&e&&(i=this.runtime.createNewGlobalVariable(l({id:"dictionary.defaultVariableName",default:"my dictionary"}),null,"list"),a.push(i),d.vm.setEditingTarget(t.id),d.vm.setEditingTarget(e.id))}getInfo(){return this.initialList(),{id:"dictionary",name:l({id:"dictionary.name",default:"Dictionary"}),blockIconURI:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTcwIiBoZWlnaHQ9IjE3MCIgdmlld0JveD0iMCAwIDE3MCAxNzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGltYWdlIGlkPSJpbWFnZTEiIHg9IjMiIHk9IjU3IiB3aWR0aD0iMTY0IiBoZWlnaHQ9IjU2IiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsIGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFLUUFBQUE0Q0FZQUFBQnpFVk41QUFBQUFYTlNSMElBcnM0YzZRQUFBRVJsV0VsbVRVMEFLZ0FBQUFnQUFZZHBBQVFBQUFBQkFBQUFHZ0FBQUFBQUE2QUJBQU1BQUFBQkFBRUFBS0FDQUFRQUFBQUJBQUFBcEtBREFBUUFBQUFCQUFBQU9BQUFBQUExa2xLWEFBQUdRRWxFUVZSNEFlMmRYMmdjUlJ6SGZ6TzdtL3VUWFA1b2l2SEluOUlVd2NaRzZ4OVFLYmFsb3JaWUtxZ2dQcFJVclVFcSt1S0QrTlFISDN4cnBNVFVGRzJmcEtCb2FUV0tKdlFQaWxBdGdyV2dSTnVnTlduU2t2Ly83dloyeDkra2pYZlo3TzNkWlRkaGMvdWJrTnpPYjM0enpIem11ek96dWQwZEJwYnd6Qkd4VlorRlY0VUp0Y0JBc3lSbmpZWktZYWpzZHZnbkhJWXA0Q0N5T3ZvMVFZQ09WUnN3VE9qNWVBZjd3Nm1hRzAvdTI1RktHUzJtWUhIVEFOWHF5NWlvUk5zYUFGWWlCRktjQ3dKQ0VTVVpDU3RKVlFNVGZ5U2tFUDVHUVFoRnhoU0ZtNXJLRGNZeGwwTXdET2d2Q2JGSnJ2Q2tyWnNRWjIzdFBqRnlZTExlL1lZd3Z1MStxT055WnJWdXdRSjQ5Z094Ym5vR1RrK05RMzJtUTY1akxReFEwNGhVSzNKNXJxcjBFNmlRMXNOUHNxSE1XbS80YkYvVHJKN3FucG95YXpMdHVZNGpFUTUxZFNHSVJMRlVDbWtDQWdSajdMaGFZdXovcXJsalJDYk1DZktGRHJIMitpajhqaU5qS08yZCswaUtzV0VqZ0pMM09KcTdUTDk0TUJNdWN3NlB6SXV5K2ZPWDd4bWVTUDJpNjR0SFJLYzZSNk1jR2hzandKWC96MzBuOTBDbTRYUndTVmUweldjMnRZMXlTV0IwR25vS0ZhUE1GNytyT01VbzJ5WTRyRE1BT3VXeERKTUo4VjJoWXNTekh4cldoa21NTnhGbS9ZdW5hbE9Kb2JkSkIvYjhFZkhBMEZYNDJYSFJZbE9VbktMcm1td1Npc3lFc080K3I3YzJEbHhMZkZsbzA2cXFWS2h2d0dtRVFrNENRdUJWaThMcjFJUU9yeFFxUmxsNmFYR3RHYk1DTXhsc1R5YU5MVmtkSEJKaXNVWFhPdzdld1U3QzJRUXZoYzF0SEsvWUNycUltY2VtbHN3ZkZmY25OeUZ1cEVSOEthMVVWRm8zRnNhTnhUbU9qa3M3alFQQ1d2TEJpOEVsWFI3anYyOEs2NCtBZXlNdGJlNmlKdUFjcVBrK0lrQ0M5RkZuVUZVQXYxT2hRQVI4UklBRTZhUE9vS3JRQ0VrYThCa0JHaUY5MWlGQnJ3NEpNdWdLOEZuN1NaQSs2NUNnVjRjRUdYUUYrS3o5SkVpZmRValFxME9DRExvQ2ZOWitFcVRQT2lUbzFTRkJCbDBCUG1zL0NkSm5IUkwwNnBBZ25SUWc0SHNFOUltVEM2VjVTMkJwOTBKNld3Yy9scGJDU3IxNWFtQnZsekRnYlh5czlYNC9WcklZNjBTQ3RPbFZ2UGY0alJOWFcvNWlBbjdGNUpqelU5STJCWkJweVFSSWtGWjBPRTJmSE5qN05ZcnhJaWFWV1pNcHZyd0VhQTFwNWN1Z1hVN1RhQ1l4V3Rtc1FKd0VhWUZzTURpSFQyWHZ0SmdwdWtJRVNKQVcwQk9qY0FOTmQxak1GRjBoQWlSSUMraFlKVlNqYWRCaXB1Z0tFU0JCV2tBckFoN0RGM3AwV2N3VVhTRUNKRWdyYUFIN21RTHZvWG5DbWtUeDVTZEFnclF5WnJCNVYvem9Uc0hnT1V3aVVWcjVMSE9jQkdrUCtQM2R0Y2ZXTTRVMTQvVDlJYjdFelA3Rm9QWjV5ZXFDQVAxajNCNmU1TksrNjg2ajhydnMxMCtQdjNUdjJMajVzTDByV2Iwa1FDT2tFMDJjdmsyQUY1MWNLTTFiQWlSSWIzbFNhUzRKa0NCZEFxVHMzaElnUVhyTGswcHpTWUFFNlJJZ1pmZVdBQW5TVzU1VW1rc0NKRWlYQUNtN3R3UklrTjd5cE5KY0VpQkJ1Z1JJMmIwbFFJTDBsaWVWNXBJQUNkSWxRTXJ1TFFFU3BMYzhxVFNYQkVpUUxnRlNkbThKa0NDOTVVbWx1U1NBZTJsRFlpbGxtSGdiVENBQzNndkpJY3RHNmJrQTRFYUpGUEluZ1B2V0o3aktvVGYvTEdsUEl5QzNyT0oyWjMxTVkxZlNMYy8vS0tFSDVhek5uNG1qcCtCOVBNcmdFTzdEV1hDWW1Odi92ZUJzcXlvRHZrSWxwYXJ3amFwcGgrVGUxNFdHaVRINWlpQUsrUkVRTXdsVjdlSEhYMk45MFNyNE1iOU1hYS9FSkQ1d01weU9GK01SUGxmVGVYZzcrL2ZpMHgwWHltTHN0MExiT0Q1dXdQUTBiZ05QSVNjQkp0akJNNXZhUnVmR1JqVUVqNGZMNEhyT1hCYUh3VDhCRWxNV1k1RkVjWFE4Vng2RHQrYWJFeXJuVzhJUlBqWWZ6L2V6cnk4QnlTVHRDcHVEVjljTnBoK1FQbk9DUE5YS3B1UFZVQis3RGJxNUFublRNM0JHK2h2SGpaRUJmUGxJOFN5WDVKT0c3MFpNZU9MZ28yeEdRcExoMGxNZkRkYzJzTHJLY3VVSGpsdU4zN1RtL3FzblRlanRuWWFSWVIzb0xXb0xlU0VQdWZCN0p6bXhadmVGQnp0MW1icG9ZYlMxWFpSVmFMQUhkRmkvTUx0ekRKOWxucTJvZ2Q1UUZIQXlYNTBCMzNnMm1DaUI4OGUyc1ZtbkZ0ejNSVXRsaXFsN0RKT3R0ZlZqRU1KVGRBTUlWcDZaempWVGo0YlVVVnl6MzFwY01sV1lvaFk3SmlyOWNEQklhWm95eFJrNG50NjZZVjZKbENyWEZNWnNMeTF4dVZ2d0VpeXpuaXR5TEtDL01scjkwNmROQnhhMDRUL1FabnBPcFBoS25RQUFBQUJKUlU1RXJrSmdnZz09Ii8+CiAgICA8dGV4dCBpZD0iSyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeD0iNDYiIHk9IjEwMSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIFJvdW5kZWQgTVQgQm9sZCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzNlN2ZmZiI+SzwvdGV4dD4KICAgIDx0ZXh0IGlkPSJWYSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeD0iMTI4IiB5PSIxMDEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCBSb3VuZGVkIE1UIEJvbGQiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiMxNzljNWYiPlZhPC90ZXh0Pgo8L3N2Zz4K",blocks:[{blockType:e.BUTTON,func:"MAKE_A_LIST",text:l({id:"dictionary.makeADictionary",default:"Make a List as a Dictionary"})},{opcode:"addKeyValue",blockType:e.COMMAND,text:l({id:"dictionary.addKeyValue",default:"add [VALUE] as [KEY] key to [DICT]"}),arguments:{KEY:{type:t.STRING,defaultValue:l({id:"dictionary.defaultKey",default:"one"})},VALUE:{type:t.STRING,defaultValue:l({id:"dictionary.defaultValue",default:"thing"})},DICT:{type:t.STRING,menu:"LISTS"}}},"---",{opcode:"removeKey",blockType:e.COMMAND,text:l({id:"dictionary.removeKey",default:"delete [KEY] key of [DICT]"}),arguments:{KEY:{type:t.STRING,defaultValue:l({id:"dictionary.defaultKey",default:"one"})},DICT:{type:t.STRING,menu:"LISTS"}}},{opcode:"removeAll",blockType:e.COMMAND,text:l({id:"dictionary.removeAllKeys",default:"delete all of [DICT]"}),arguments:{DICT:{type:t.STRING,menu:"LISTS"}}},{opcode:"replaceKeyValue",blockType:e.COMMAND,text:l({id:"dictionary.replaceKeyValue",default:"replace item [KEY] key of [DICT] with [VALUE]"}),arguments:{KEY:{type:t.STRING,defaultValue:l({id:"dictionary.defaultKey",default:"one"})},VALUE:{type:t.STRING,defaultValue:l({id:"dictionary.defaultValue",default:"thing"})},DICT:{type:t.STRING,menu:"LISTS"}}},"---",{opcode:"getValue",blockType:e.REPORTER,text:l({id:"dictionary.getValue",default:"item [KEY] key of [DICT]"}),arguments:{KEY:{type:t.STRING,defaultValue:l({id:"dictionary.defaultKey",default:"one"})},DICT:{type:t.STRING,menu:"LISTS"}}},{opcode:"getKey",blockType:e.REPORTER,text:l({id:"dictionary.getKey",default:"item key of [VALUE] in [DICT]"}),arguments:{VALUE:{type:t.STRING,defaultValue:l({id:"dictionary.defaultValue",default:"thing"})},DICT:{type:t.STRING,menu:"LISTS"}}},{opcode:"getLength",blockType:e.REPORTER,text:l({id:"dictionary.getLength",default:"length of [DICT]"}),arguments:{DICT:{type:t.STRING,menu:"LISTS"}},disableMonitor:!0},{opcode:"isContains",blockType:e.BOOLEAN,text:l({id:"dictionary.isContains",default:"[DICT] contains [KEY] key?"}),arguments:{DICT:{type:t.STRING,menu:"LISTS"},KEY:{type:t.STRING,defaultValue:l({id:"dictionary.defaultKey",default:"one"})}}},"---",{opcode:"showDictionary",blockType:e.COMMAND,text:l({id:"dictionary.showDictionary",default:"show dictionary [DICT]"}),arguments:{DICT:{type:t.STRING,menu:"LISTS"}}},{opcode:"hideDictionary",blockType:e.COMMAND,text:l({id:"dictionary.hideDictionary",default:"hide dictionary [DICT]"}),arguments:{DICT:{type:t.STRING,menu:"LISTS"}}}],menus:{LISTS:{items:"LISTS_MENU"}}}}LISTS_MENU(){return this._getUniqueLists().map(t=>({text:t.name,value:t.id}))}_getUniqueLists(){var t=this.runtime.getTargetForStage(),e=this.runtime.getEditingTarget(),t=t?Object.values(t.variables).filter(this._filter):[],e=e?Object.values(e.variables).filter(this._filter):[];return[...new Set([...t,...e])]}_filter(t){return!("list"!==t.type||!Array.isArray(t.value))&&(0===t.value.length||t.value.every(t=>2===(""+t).split(",").length))}_initialDict(t,e){this._dicts[t]=e?e.value.reduce((t,e)=>{var[e,i]=e.split(",");return t[decodeURIComponent(e)]=decodeURIComponent(i),t},{}):{}}_updateList(t){var e=t.id;t.value=Object.entries(this._dicts[e]).map(([t,e])=>encodeURIComponent(t)+","+encodeURIComponent(e))}addKeyValue(t,e){var i,a=n.toString(t.DICT),e=e.target.lookupVariableById(a);e&&(this._dicts[a]||this._initialDict(a,e),i=n.toString(t.KEY),t=n.toString(t.VALUE),this._dicts[a][i]=t,this._updateList(e))}removeKey(t,e){var i=n.toString(t.DICT),e=e.target.lookupVariableById(i);e&&(this._dicts[i]||this._initialDict(i,e),t=n.toString(t.KEY),delete this._dicts[i][t],this._updateList(e))}removeAll(t,e){t=n.toString(t.DICT),e=e.target.lookupVariableById(t);delete this._dicts[t],e&&(e.value=[])}replaceKeyValue(t,e){this.addKeyValue(t,e)}getValue(t,e){var i=n.toString(t.DICT),t=n.toString(t.KEY);return this._dicts[i]||(e=e.target.lookupVariableById(i),this._initialDict(i,e)),this._dicts[i][t]||""}getKey(t,e){var i=n.toString(t.DICT);const a=n.toString(t.VALUE);return this._dicts[i]||(t=e.target.lookupVariableById(i),this._initialDict(i,t)),Object.keys(this._dicts[i])[Object.values(this._dicts[i]).findIndex(t=>t===a)]||""}getLength(t,e){t=n.toString(t.DICT);return this._dicts[t]||(e=e.target.lookupVariableById(t),this._initialDict(t,e)),Object.keys(this._dicts[t]).length}isContains(t){var e=n.toString(t.DICT),t=n.toString(t.KEY);return!(!this._dicts[e]||!this._dicts[e][t])}showDictionary(t){t=n.toString(t.DICT);this._changeMonitorVisibility(t,!0)}hideDictionary(t){t=n.toString(t.DICT);this._changeMonitorVisibility(t,!1)}_changeMonitorVisibility(t,e){this.runtime.monitorBlocks.changeBlock({id:t,element:"checkbox",value:e},this.runtime)}}),d.extensions.translations({en:{"dictionary.name":"Dictionary","dictionary.makeADictionary":"Make a List as a Dictionary","dictionary.defaultKey":"one","dictionary.defaultValue":"thing","dictionary.addKeyValue":"add [VALUE] as [KEY] key to [DICT]","dictionary.removeKey":"delete [KEY] key of [DICT]","dictionary.removeAllKeys":"delete all of [DICT]","dictionary.replaceKeyValue":"replace item [KEY] key of [DICT] with [VALUE]","dictionary.getValue":"item [KEY] key of [DICT]","dictionary.getKey":"item key of [VALUE] in [DICT]","dictionary.getLength":"length of [DICT]","dictionary.isContains":"[DICT] contains [KEY] key?","dictionary.showDictionary":"show dictionary [DICT]","dictionary.hideDictionary":"hide dictionary [DICT]","dictionary.defaultVariableName":"my dictionary"},"zh-cn":{"dictionary.name":"字典","dictionary.makeADictionary":"建立一个列表作为字典","dictionary.defaultKey":"一个","dictionary.defaultValue":"东西","dictionary.addKeyValue":"将 [VALUE] 以 [KEY] 键名加入 [DICT]","dictionary.removeKey":"删除 [DICT] 键名为 [KEY] 的项","dictionary.removeAllKeys":"删除 [DICT] 的全部项目","dictionary.replaceKeyValue":"将 [DICT] 键名为 [KEY] 的项替换为 [VALUE]","dictionary.getValue":"[DICT] 键名为 [KEY] 的项","dictionary.getKey":"[DICT] 中第一个 [VALUE] 的键名","dictionary.getLength":"[DICT] 的项目数","dictionary.isContains":"[DICT] 包含键名 [KEY]?","dictionary.showDictionary":"显示字典 [DICT]","dictionary.hideDictionary":"隐藏字典 [DICT]","dictionary.defaultVariableName":"我的字典"},"zh-tw":{"dictionary.name":"字典","dictionary.makeADictionary":"建立一個清單作為字典","dictionary.defaultKey":"一個","dictionary.defaultValue":"東西","dictionary.addKeyValue":"以 [KEY] 鍵名添加 [VALUE] 到 [DICT]","dictionary.removeKey":"刪除 [DICT] 鍵名為 [KEY] 的項","dictionary.removeAllKeys":"刪除 [DICT] 的所有項目","dictionary.replaceKeyValue":"替換 [DICT] 鍵名為 [KEY] 的項為 [VALUE]","dictionary.getValue":"[DICT] 鍵名為 [KEY] 的項","dictionary.getKey":"[VALUE] 在 [DICT] 裡的鍵名","dictionary.getLength":"字典 [DICT] 的長度","dictionary.isContains":"字典 [DICT] 包含鍵名 [KEY]?","dictionary.showDictionary":"字典 [DICT] 顯示","dictionary.hideDictionary":"字典 [DICT] 隱藏","dictionary.defaultVariableName":"my dictionary"}})}(window.Scratch);