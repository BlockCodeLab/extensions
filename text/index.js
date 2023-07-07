(async function(t,e){const a=(await e("./text-costume-skin.js"))["TextCostumeSkin"],i=t.formatMessage,r=t.ArgumentType,n=t.BlockType,T=t.Cast,x=t.Clone,s=t.Timer,M="Sans Serif",o="Serif",u="Handwriting",l="Marker",g="Curly",d="Pixel",I='"Microsoft YaHei", "微软雅黑", STXihei, "华文细黑"',A='"ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka, "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic"',m="Malgun Gothic",S="Random";t.extensions.register(new(class D{static get DEFAULT_TEXT_STATE(){return{skinId:null,text:i({id:"text.defaultText",default:"Welcome to my project!",description:""}),font:"Handwriting",color:"hsla(225, 15%, 40%, 1)",size:24,maxWidth:480,align:"center",strokeWidth:0,strokeColor:"black",rainbow:!1,visible:!1,targetSize:null,fullText:null}}static get STATE_KEY(){return"Scratch.text"}constructor(){this.runtime=t.vm.runtime,this._onTargetWillExit=this._onTargetWillExit.bind(this),this.runtime.on("targetWasRemoved",this._onTargetWillExit),this._onTargetCreated=this._onTargetCreated.bind(this),this.runtime.on("targetWasCreated",this._onTargetCreated),this.runtime.on("PROJECT_STOP_ALL",this.stopAll.bind(this))}get FONT_IDS(){return[M,o,u,l,g,d,I,A,m]}getInfo(){return{id:"text",name:i({id:"text.categoryName",default:"Animated Text",description:""}),blockIconURI:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMjcuODM0IDlhMyAzIDAgMDEyLjU0NiAxLjQxMmwuMDk3LjE2Ny4wNTQuMTEuMDUyLjExMi4wNDguMTEyIDYuMjIyIDE2YTMuMDAxIDMuMDAxIDAgMDEtMi4yNyA0LjA0MWwtLjE4LjAyNS0uMTE1LjAxMS0uMTE2LjAwNy0uMTE1LjAwM2gtMS44NTVhMyAzIDAgMDEtMi41NDUtMS40MTJsLS4wOTYtLjE2Ny0uMTA3LS4yMjItLjA0OC0uMTExTDI4Ljk4MyAyOGgtNC45M2wtLjQyMiAxLjA4N2EzLjAwMyAzLjAwMyAwIDAxLTIuNDEgMS44ODlsLS4xOTMuMDE4LS4xOTQuMDA2LTEuOTQtLjAwMi0uMDk2LjAwMkg3YTMgMyAwIDAxLTIuODctMy44NzJsLjA3Mi0uMjA5IDYuMTgzLTE2YTMuMDAxIDMuMDAxIDAgMDEyLjYwNC0xLjkxM0wxMy4xODQgOWwzLjkuMDAxLjA5OS0uMDAxIDMuOTI0LjAwMi4wOTUtLjAwMiAzLjkwNS4wMDIuMDk1LS4wMDJoMi42MzJ6IiBmaWxsLW9wYWNpdHk9Ii4xNSIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yNS42NjMgMjFsLjgxNi0yLjA5OS44MTYgMi4wOTloLTEuNjMyem0xMC4yNTggNi4yNzVsLTYuMjIzLTE2LS4wNzUtLjE2OC0uMDg1LS4xNDVjLS4zODctLjYxMS0xLjAxOS0uOTYyLTEuNzAzLS45NjJoLTIuNjMzbC0uMDk2LjAwMi0uMDYyLS4wMDFMMjEuMjAyIDEwbC0uMDk2LjAwMi0uMDYyLS4wMDFMMTcuMTgzIDEwbC0uMDg2LjAwMkwxMy4xODQgMTBsLS4xNjUuMDA3YTIuMDAzIDIuMDAzIDAgMDAtMS43MDIgMS4yNzJsLTYuMTgyIDE2LS4wNTkuMTc1QTIgMiAwIDAwNyAzMGgxMS43OThsLjA4OC0uMDAyIDEuOTQ5LjAwMi4xNjMtLjAwNy4xNjEtLjAxOWEyIDIgMCAwMDEuNTM5LTEuMjQ5bC42Ny0xLjcyNWg2LjI5OWwuNjcyIDEuNzI2LjA3NC4xNjcuMDg2LjE0NWMuMzg3LjYxMSAxLjAxOC45NjIgMS43MDMuOTYyaDEuODU1bC4xNzQtLjAwOS4xNjQtLjAyNGMuOTc2LS4xODcgMS42NjItMS4wMDMgMS42NjItMS45NjcgMC0uMjQ4LS4wNDYtLjQ5NC0uMTM2LS43MjV6IiBmaWxsLW9wYWNpdHk9Ii4yNSIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0xMy4xODMgMTFoMy44MThhMSAxIDAgMDEuOTQxIDEuMzM4bC01Ljc0MiAxNmExIDEgMCAwMS0uOTQuNjYySDdhMSAxIDAgMDEtLjkzMy0xLjM2bDYuMTgzLTE2YTEgMSAwIDAxLjkzMy0uNjR6IiBmaWxsPSIjNEM5N0ZGIi8+PHBhdGggZD0iTTE3LjE4MyAxMUgyMWExIDEgMCAwMS45NDIgMS4zMzhsLTUuNzQyIDE2YTEgMSAwIDAxLS45NDEuNjYyaC00LjI2YTEgMSAwIDAxLS45MzItMS4zNmw2LjE4My0xNmExIDEgMCAwMS45MzMtLjY0eiIgZmlsbD0iI0NGNjNDRiIvPjxwYXRoIGQ9Ik0yMS4yMDIgMTFIMjVhMSAxIDAgMDEuOTMzIDEuMzYxbC02LjIwMyAxNmExIDEgMCAwMS0uOTMyLjYzOUgxNWExIDEgMCAwMS0uOTMzLTEuMzYxbDYuMjAzLTE2YTEgMSAwIDAxLjkzMi0uNjM5eiIgZmlsbD0iI0ZGQkYwMCIvPjxwYXRoIGQ9Ik0yNy44MzQgMTFhMSAxIDAgMDEuOTMyLjYzOGw2LjIyMiAxNkExIDEgMCAwMTM0LjA1NiAyOWgtMS44NTRhMSAxIDAgMDEtLjkzMi0uNjM4TDMwLjM1MSAyNmgtNy42NjZsLS45MTkgMi4zNjJhMSAxIDAgMDEtLjkzMi42MzhIMTguOThhMSAxIDAgMDEtLjkzMi0xLjM2Mmw2LjIyMi0xNmExIDEgMCAwMS45MzItLjYzOHptLTEuMzE2IDUuMTQzTDI0LjI0IDIyaDQuNTU2bC0yLjI3OC01Ljg1N3oiIGZpbGw9IiNGRkYiLz48L2c+PC9zdmc+",blocks:[{opcode:"setText",text:i({id:"text.setText",default:"show text [TEXT]",description:""}),blockType:n.COMMAND,arguments:{TEXT:{type:r.STRING,defaultValue:i({id:"text.defaultText",default:"Welcome to my project!",description:""})}}},{opcode:"animateText",text:i({id:"text.animateText",default:"[ANIMATE] text [TEXT]",description:""}),blockType:n.COMMAND,arguments:{ANIMATE:{type:r.STRING,menu:"ANIMATE",defaultValue:"rainbow"},TEXT:{type:r.STRING,defaultValue:i({id:"text.defaultAnimateText",default:"Here we go!",description:""})}}},{opcode:"clearText",text:i({id:"text.clearText",default:"show sprite",description:""}),blockType:n.COMMAND,arguments:{}},"---",{opcode:"setFont",text:i({id:"text.setFont",default:"set font to [FONT]",description:""}),blockType:n.COMMAND,arguments:{FONT:{type:r.STRING,menu:"FONT",defaultValue:"Pixel"}}},{opcode:"setColor",text:i({id:"text.setColor",default:"set text color to [COLOR]",description:""}),blockType:n.COMMAND,arguments:{COLOR:{type:r.COLOR}}},{opcode:"setWidth",text:i({id:"text.setWidth",default:"set width to [WIDTH] aligned [ALIGN]",description:""}),blockType:n.COMMAND,arguments:{WIDTH:{type:r.NUMBER,defaultValue:200},ALIGN:{type:r.STRING,defaultValue:"left",menu:"ALIGN"}}}],menus:{FONT:{items:[{text:"Sans Serif",value:M},{text:"Serif",value:o},{text:"Handwriting",value:u},{text:"Marker",value:l},{text:"Curly",value:g},{text:"Pixel",value:d},{text:"中文",value:I},{text:"日本語",value:A},{text:"한국어",value:m},{text:i({id:"text.randomFont",default:"random font"}),value:S}]},ALIGN:{items:[{text:i({id:"text.left",default:"left"}),value:"left"},{text:i({id:"text.center",default:"center"}),value:"center"},{text:i({id:"text.right",default:"right"}),value:"right"}]},ANIMATE:{items:[{text:i({id:"text.type",default:"type"}),value:"type"},{text:i({id:"text.rainbow",default:"rainbow"}),value:"rainbow"},{text:i({id:"text.zoom",default:"zoom"}),value:"zoom"}]}}}}setText(t,e){var i=this._getTextState(e.target);return i.text=this._formatText(t.TEXT),i.visible=!0,i.animating=!1,this._renderText(e.target),Promise.resolve()}clearText(t,e){var e=e.target,i=((i=this._getTextState(e)).visible=!1,i.animating=!1,e.getCostumes()[e.currentCostume]);return this.runtime.renderer.updateDrawableSkinId(e.drawableID,i.skinId),Promise.resolve()}stopAll(){this.runtime.targets.forEach(t=>{this.clearText({},{target:t})})}addText(t,e){var i=this._getTextState(e.target);return i.text+=this._formatText(t.TEXT),i.visible=!0,i.animating=!1,this._renderText(e.target),Promise.resolve()}addLine(t,e){var i=this._getTextState(e.target);return i.text+="\n".concat(this._formatText(t.TEXT)),i.visible=!0,i.animating=!1,this._renderText(e.target),Promise.resolve()}setFont(t,e){var i=this._getTextState(e.target);t.FONT===S?i.font=this._randomFontOtherThan(i.font):i.font=t.FONT,this._renderText(e.target)}_randomFontOtherThan(e){var t=this.FONT_IDS.filter(t=>t!==e);return t[Math.floor(Math.random()*t.length)]}setColor(t,e){this._getTextState(e.target).color=t.COLOR,this._renderText(e.target)}setWidth(t,e){var i=this._getTextState(e.target);i.maxWidth=T.toNumber(t.WIDTH),i.align=t.ALIGN,this._renderText(e.target)}setSize(t,e){this._getTextState(e.target).size=T.toNumber(t.SIZE),this._renderText(e.target)}setAlign(t,e){var i=this._getTextState(e.target);i.maxWidth=T.toNumber(t.WIDTH),i.align=t.ALIGN,this._renderText(e.target)}setOutlineWidth(t,e){this._getTextState(e.target).strokeWidth=T.toNumber(t.WIDTH),this._renderText(e.target)}setOutlineColor(t,e){var i=this._getTextState(e.target);i.strokeColor=t.COLOR,i.visible=!0,this._renderText(e.target)}_animateText(t,e){const i=e.target,r=this._getTextState(i);if(null===r.fullText)return r.fullText=this._formatText(t.TEXT),r.text=r.fullText[0],r.visible=!0,r.animating=!0,this._renderText(i),this.runtime.requestRedraw(),new Promise(t=>{const e=setInterval(()=>{r.animating&&r.visible&&r.text!==r.fullText?r.text=r.fullText.substring(0,r.text.length+1):(r.fullText=null,clearInterval(e),t()),this._renderText(i),this.runtime.requestRedraw()},60)})}_zoomText(t,e){const r=e.target,a=this._getTextState(r);if(null===a.targetSize){const n=new s,x=1e3*T.toNumber(t.SECS||.5);return a.text=this._formatText(t.TEXT),a.visible=!0,a.animating=!0,a.targetSize=r.size,r.setSize(0),this._renderText(r),this.runtime.requestRedraw(),n.start(),new Promise(e=>{const i=setInterval(()=>{var t=n.timeElapsed();a.animating&&a.visible&&t<x?r.setSize(a.targetSize*t/x):(r.setSize(a.targetSize),a.targetSize=null,clearInterval(i),e()),this._renderText(r),this.runtime.requestRedraw()},this.runtime.currentStepTime)})}}animateText(t,e){switch(t.ANIMATE){case"rainbow":return this.rainbow(t,e);case"type":return this._animateText(t,e);case"zoom":return this._zoomText(t,e)}}rainbow(t,e){const r=e.target,a=this._getTextState(r);if(!a.rainbow){const n=new s,x=1e3*T.toNumber(t.SECS||2);return a.text=this._formatText(t.TEXT),a.visible=!0,a.animating=!0,a.rainbow=!0,this._renderText(r),n.start(),new Promise(e=>{const i=setInterval(()=>{var t=n.timeElapsed();a.animating&&a.visible&&t<x?(a.rainbow=!0,r.setEffect("color",t/-5)):(a.rainbow=!1,r.setEffect("color",0),clearInterval(i),e()),this._renderText(r)},this.runtime.currentStepTime)})}}_getTextState(t){let e=t.getCustomState(D.STATE_KEY);return e||(e=x.simple(D.DEFAULT_TEXT_STATE),t.setCustomState(D.STATE_KEY,e)),e}_formatText(t){return""!==t&&("number"==typeof t&&.01<=Math.abs(t)&&t%1!=0&&(t=t.toFixed(2)),t=T.toString(t)),t}_renderText(t){var e;this.runtime.renderer&&(e=this._getTextState(t)).visible&&(e.skinId=this._updateTextCostumeSkin(e),this.runtime.renderer.updateDrawableSkinId(t.drawableID,e.skinId))}_updateTextCostumeSkin(t){var e,i,r=this.runtime.renderer;return t.skinId&&r._allSkins[t.skinId]instanceof a?(r._allSkins[t.skinId].setTextAndStyle(t),t.skinId):(e=r._nextSkinId++,i=new a(e,r),(r._allSkins[e]=i).setTextAndStyle(t),e)}_onTargetCreated(t,e){if(e=e&&e.getCustomState(D.STATE_KEY)){t.setCustomState(D.STATE_KEY,x.simple(e)),(e=t.getCustomState(D.STATE_KEY)).skinId=null,e.rainbow=!1,e.targetSize=null,e.fullText=null,e.animating=!1;const i=()=>{this._renderText(t),t.off("EVENT_TARGET_VISUAL_CHANGE",i)};t.on("EVENT_TARGET_VISUAL_CHANGE",i)}}_onTargetWillExit(t){(t=this._getTextState(t)).skinId&&(this.runtime.renderer.destroySkin(t.skinId),t.skinId=null)}})),t.extensions.translations({en:{"text.categoryName":"Animated Text","text.setText":"show text [TEXT]","text.animateText":"[ANIMATE] text [TEXT]","text.clearText":"show sprite","text.setFont":"set font to [FONT]","text.setColor":"set text color to [COLOR]","text.setWidth":"set width to [WIDTH] aligned [ALIGN]","text.defaultText":"Welcome to my project!","text.defaultAnimateText":"Here we go!","text.randomFont":"random font","text.left":"left","text.center":"center","text.right":"right","text.type":"type","text.rainbow":"rainbow","text.zoom":"zoom"},"zh-cn":{"text.categoryName":"动画文字","text.setText":"显示文字 [TEXT]","text.animateText":"将动画设为 [ANIMATE] 显示文字 [TEXT]","text.clearText":"显示角色","text.setFont":"将字体设为 [FONT]","text.setColor":"将颜色设为 [COLOR]","text.setWidth":"将文字宽度设为 [WIDTH] 靠 [ALIGN] 对齐","text.defaultText":"欢迎来到我的项目！","text.defaultAnimateText":"开始吧！","text.randomFont":"随机字体","text.left":"左","text.center":"中间","text.right":"右","text.type":"打字","text.rainbow":"彩虹","text.zoom":"放大"},"zh-tw":{"text.categoryName":"動畫文字","text.setText":"顯示文字 [TEXT]","text.animateText":"將動畫設為 [ANIMATE] 顯示文字 [TEXT]","text.clearText":"顯示角色","text.setFont":"將字體設為 [FONT]","text.setColor":"將顏色設為 [COLOR]","text.setWidth":"將文字寬度設為 [WIDTH] 靠 [ALIGN] 對齊","text.defaultText":"歡迎來到我的項目！","text.defaultAnimateText":"開始吧！","text.randomFont":"隨機字體","text.left":"左","text.center":"中間","text.right":"右","text.type":"打字","text.rainbow":"彩虹","text.zoom":"放大"}})})(Scratch,require);