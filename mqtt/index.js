!async function(){Scratch.require("https://unpkg.com/mqtt@4.3.7/dist/mqtt.min.js");const e=Scratch.ArgumentType,t=Scratch.BlockType,n=Scratch.Cast,M=Scratch.formatMessage,i="localhost"===location.hostname;Scratch.extensions.register(new class{constructor(){this.client=null,this.received=new Set,this.messages=new Map}get Blocks(){return[{opcode:"connect",blockType:t.COMMAND,text:M({id:"mqtt.connect",default:"connect to MQTT broker: [URL]"}),arguments:{URL:{type:e.STRING,defaultValue:"ws://"+(i?"test.mosquitto.org:8081":"mqtt.example.com")}}},{opcode:"whenConnected",blockType:t.HAT,text:M({id:"mqtt.whenConnected",default:"when connected to MQTT broker"})},{opcode:"isConnected",blockType:t.BOOLEAN,text:M({id:"mqtt.isConnected",default:"connected to MQTT broker?"})},"---",{opcode:"whenReceived",blockType:t.HAT,text:M({id:"mqtt.whenReceived",default:"when I receive [TOPIC]"}),arguments:{TOPIC:{type:e.STRING,defaultValue:M({id:"mqtt.message.topic",default:"topic"})}}},{opcode:"message",blockType:t.REPORTER,text:M({id:"mqtt.message",default:"last message from [TOPIC]"}),arguments:{TOPIC:{type:e.STRING,defaultValue:M({id:"mqtt.message.topic",default:"topic"})}}},"---",{opcode:"publish",blockType:t.COMMAND,text:M({id:"mqtt.publish",default:"publish [MESSAGE] to [TOPIC]"}),arguments:{MESSAGE:{type:e.STRING,defaultValue:M({id:"mqtt.message.content",default:"message"})},TOPIC:{type:e.STRING,defaultValue:M({id:"mqtt.message.topic",default:"topic"})}}},"---",{opcode:"end",blockType:t.COMMAND,text:M({id:"mqtt.end",default:"disconnect"})}]}getInfo(){return{id:"mqtt",name:M({id:"mqtt.name",default:"MQTT Protocol"}),blockIconURI:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjwhLS0gQ3JlYXRlZCB3aXRoIFZlY3Rvcm5hdG9yIChodHRwOi8vdmVjdG9ybmF0b3IuaW8vKSAtLT4KPHN2ZyBoZWlnaHQ9IjEwMCUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3R5bGU9ImZpbGwtcnVsZTpub256ZXJvO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI2MCAyNjAiIHdpZHRoPSIxMDAlIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPGRlZnMvPgo8ZyBpZD0ibG9nb3MiPgo8cGF0aCBkPSJNMzAuMDk4NiA0OS43MTQxTDMwLjA5ODYgODAuMjcxMUMzMC4yOTU3IDgwLjI3MTEgMzAuNDkyOSA4MC4yNzExIDMwLjY5IDgwLjI3MTFDMTEzLjg4NCA4MC4yNzExIDE4MS43IDE0Ny4yOTkgMTgyLjM5IDIyOS45MDFMMjEyLjA2IDIyOS45MDFDMjExLjI3MiAxMzAuNjQxIDEzMC4wNDkgNTAuMDA5OSAzMC4wOTg2IDQ5LjcxNDFaIiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8cGF0aCBkPSJNMzAuMDk4NiAxMTIuNzk5TDMwLjA5ODYgMTQzLjM1NkMzMC4yOTU3IDE0My4zNTYgMzAuNDkyOSAxNDMuMzU2IDMwLjY5IDE0My4zNTZDNzguODkxMSAxNDMuMzU2IDExOC4yMjEgMTgyLjA5NSAxMTguOTExIDIyOS45MDFMMTQ4LjU4MSAyMjkuOTAxQzE0Ny44OTEgMTY1LjQzNiA5NS4wNTY3IDExMy4wOTUgMzAuMDk4NiAxMTIuNzk5WiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIxIiBzdHJva2U9Im5vbmUiLz4KPHBhdGggZD0iTTIzMCAxNTAuODQ4TDIzMCA4OS4yNDFDMjIyLjQxIDc4Ljg5MTEgMjEzLjA0NiA2Ny4wNjI2IDIwMy42ODIgNTcuODk1NUMxOTMuMjMzIDQ3LjU0NTYgMTgxLjAxIDM4LjE4MTQgMTY5LjE4MiAzMEwxMDMuNzMxIDMwQzE2MS4wOTkgNTAuNjAxMyAyMDcuMTMyIDk0Ljg1OTUgMjMwIDE1MC44NDhaIiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8cGF0aCBkPSJNMzAuNTkxNCAxNDMuMzU2QzMwLjM5NDMgMTQzLjM1NiAzMC4xOTcxIDE0My4zNTYgMzAgMTQzLjM1NkwzMCAyMTkuODQ3QzMwIDIyNS4zNjcgMzQuNTM0MyAyMjkuOTAxIDQwLjA1NDIgMjI5LjkwMUwxMTguODEyIDIyOS45MDFDMTE4LjEyMiAxODIuMDk1IDc4Ljg5MTEgMTQzLjM1NiAzMC41OTE0IDE0My4zNTZaIiBmaWxsPSIjNjYwMDY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8cGF0aCBkPSJNMzAuNTkxNCA4MC4yNzExQzMwLjM5NDMgODAuMjcxMSAzMC4xOTcxIDgwLjI3MTEgMzAgODAuMjcxMUwzMCAxMTIuNzk5Qzk0Ljk1ODEgMTEzLjA5NSAxNDcuNzkyIDE2NS4zMzggMTQ4LjQ4MiAyMjkuOTAxTDE4Mi4xOTMgMjI5LjkwMUMxODEuNjAyIDE0Ny4yOTkgMTEzLjg4NCA4MC4yNzExIDMwLjU5MTQgODAuMjcxMVoiIGZpbGw9IiM2NjAwNjYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIi8+CjxwYXRoIGQ9Ik0yMzAgMjE5Ljk0NkwyMzAgMTUwLjg0OEMyMDcuMTMyIDk0Ljg1OTUgMTYxLjA5OSA1MC42MDEzIDEwMy44MjkgMzBMNDAuMDU0MiAzMEMzNC41MzQzIDMwIDMwIDM0LjUzNDMgMzAgNDAuMDU0MkwzMCA0OS44MTI3QzEyOS45NTEgNTAuMTA4NCAyMTEuMjcyIDEzMC42NDEgMjExLjg2MyAyMzBMMjE5Ljk0NiAyMzBDMjI1LjU2NCAyMjkuOTAxIDIzMCAyMjUuNDY2IDIzMCAyMTkuOTQ2WiIgZmlsbD0iIzY2MDA2NiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIxIiBzdHJva2U9Im5vbmUiLz4KPHBhdGggZD0iTTIwMy42ODIgNTcuODk1NUMyMTIuOTQ3IDY3LjE2MTIgMjIyLjQxIDc4Ljg5MTEgMjMwIDg5LjI0MUwyMzAgMzkuOTU1NkMyMzAgMzQuNDM1NyAyMjUuNTY0IDMwIDIyMC4wNDQgMzBMMTY5LjI4IDMwQzE4MS4xMDkgMzguMTgxNCAxOTMuMzMyIDQ3LjU0NTYgMjAzLjY4MiA1Ny44OTU1WiIgZmlsbD0iIzY2MDA2NiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIxIiBzdHJva2U9Im5vbmUiLz4KPC9nPgo8L3N2Zz4K",blocks:this.Blocks}}_onMessage(e,t){this.received.add(e),this.messages.set(e,t.toString())}_subscribe(t){this.client&&!this.messages.has(t)&&this.client.subscribe(t,e=>e?null:this.messages.set(t,""))}connect(e){if(!this.isConnected()){if(!this.client){const M=window.mqtt.connect(n.toString(e.URL));return new Promise((e,t)=>{M.on("connect",()=>{this.received.clear(),this.messages.clear(),(this.client=M).on("message",this._onMessage.bind(this)),e()}),M.on("reconnect",()=>{M.end(!0),e()}),M.on("disconnect",()=>{this.end(),e()}),M.on("offline",()=>{this.end(),e()}),M.on("error",()=>{t()})})}this.client.reconnect()}}whenConnected(){return this.isConnected()}isConnected(){return!(!this.client||!this.client.connected)}whenReceived(e){var t;if(this.client)return e=n.toString(e.TOPIC),this._subscribe(e),t=this.received.has(e),this.received.delete(e),t}message(e){e=n.toString(e.TOPIC);return this._subscribe(e),this.messages.get(e)||""}publish(e){if(this.client){const i=n.toString(e.TOPIC),c=n.toString(e.MESSAGE);return new Promise((t,M)=>this.client.publish(i,c,e=>(e?M:t)()))}}end(){this.client&&this.client.end(!0,()=>{this.client=null,this.received.clear(),this.messages.clear()})}}),Scratch.extensions.translations({en:{"window.name":"MQTT Protocol","mqtt.connect":"connect to MQTT broker [URL]","mqtt.whenConnected":"when connected to MQTT broker","mqtt.isConnected":"connected to MQTT broker?","mqtt.whenReceived":"when I receive from [TOPIC] topic","mqtt.message":"last message from [TOPIC] topic","mqtt.publish":"publish message [MESSAGE] to [TOPIC] topic","mqtt.message.topic":"topic","mqtt.message.content":"content","mqtt.end":"disconnect"},"zh-cn":{"mqtt.name":"MQTT 协议","mqtt.connect":"连接到 MQTT 服务器 [URL]","mqtt.whenConnected":"当连接到 MQTT 服务器","mqtt.isConnected":"连接到 MQTT 服务器？","mqtt.whenReceived":"当接收到主题 [TOPIC] 的消息","mqtt.message":"主题 [TOPIC] 最后的消息","mqtt.publish":"发布主题 [TOPIC] 的消息 [MESSAGE]","mqtt.message.topic":"标题","mqtt.message.content":"内容","mqtt.end":"结束连接"},"zh-tw":{"mqtt.name":"MQTT 協議","mqtt.connect":"連接到 MQTT 服務器 [URL]","mqtt.whenConnected":"當連接到 MQTT 服務器","mqtt.isConnected":"連接到 MQTT 服務器？","mqtt.whenReceived":"當接收到主題 [TOPIC] 的消息","mqtt.message":"主題 [TOPIC] 最後的消息","mqtt.publish":"發布主題 [TOPIC] 的消息 [MESSAGE]","mqtt.message.topic":"標題","mqtt.message.content":"內容","mqtt.end":"結束連接"}})}();