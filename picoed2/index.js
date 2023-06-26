!async function(t){const i=t.ArgumentType,a=t.BlockType,l=t.Cast,n=t.MathUtil,s=t.formatMessage;var e=await t.require("../repl/repl.js");const u=await t.require("./fonts.js");var d=await t.require("./translations.js");t.extensions.translations(d);const r="[0m\r7> ",o=`\r
[90mundefined[0m\r
`+r,p=(r,t=>new Promise(e=>setTimeout(e,t))),c=e=>!Number.isNaN(Number(e)),N={ON:"on",OFF:"off"},E={A:"a",B:"b",ANY:"any"},h={NO:"NO",SQUARE:"SQUARE",RECTANGLE:"RECTANGLE",RHOMBUS:"RHOMBUS",TARGET:"TARGET",CHESSBOARD:"CHESSBOARD",HAPPY:"HAPPY",SAD:"SAD",YES:"YES",HEART:"HEART",TRIANGLE:"TRIANGLE",CHAGRIN:"CHAGRIN",SMILING_FACE:"SMILING_FACE",CRY:"CRY",DOWNCAST:"DOWNCAST",LOOK_LEFT:"LOOK_LEFT",LOOK_RIGHT:"LOOK_RIGHT",TONGUE:"TONGUE",PEEK_LEFT:"PEEK_LEFT",PEEK_RIGHT:"PEEK_RIGHT",TEAR_EYES:"TEAR_EYES",PROUD:"PROUD",SNEER_LEFT:"SNEER_LEFT",SNEER_RIGHT:"SNEER_RIGHT",SUPERCILIOUS_LOOK:"SUPERCILIOUS_LOOK",EXCITED:"EXCITED"},I={DADADADUM:"DADADADUM",ENTERTAINER:"ENTERTAINER",PRELUDE:"PRELUDE",ODE:"ODE",NYAN:"NYAN",RINGTONE:"RINGTONE",FUNK:"FUNK",BLUES:"BLUES",BIRTHDAY:"BIRTHDAY",WEDDING:"WEDDING",FUNERAL:"FUNERAL",PUNCHLINE:"PUNCHLINE",PYTHON:"PYTHON",BADDY:"BADDY",CHASE:"CHASE",BA_DING:"BA_DING",WAWAWAWAA:"WAWAWAWAA",JUMP_UP:"JUMP_UP",JUMP_DOWN:"JUMP_DOWN",POWER_UP:"POWER_UP",POWER_DOWN:"POWER_DOWN"},M={NONE:"INPUT",DOWN:"INPUT_PULLDOWN",UP:"INPUT_PULLUP",OUTPUT:"OUTPUT"},A={LOW:"LOW",HIGH:"HIGH"},T={FALLING:"FALLING",RISING:"RISING",CHANGE:"CHANGE"},m={min:0,max:180},y={min:.5,max:2.5};class f extends e{constructor(e,t){super(e,t),this._encoder=new TextEncoder,this._runtime.registerPeripheralExtension(this._extensionId,this),this._files=[],this.state={}}get filters(){return[{usbProductId:10,usbVendorId:11914}]}disconnect(){this._runtime.emit("EXTENSION_DATA_DOWNLOADING",!1),super.disconnect()}async _onConnect(){super._onConnect(),await this.send(".reset"),await p(500),this._runtime.emit("EXTENSION_DATA_DOWNLOADING",!0);try{var e,t;for([e,t]of[].concat(this._files.concat,Object.entries(u)))await this.put(e,t)}catch(e){this._serial._handleRequestError(e)}finally{this._runtime.emit("EXTENSION_DATA_DOWNLOADING",!1)}}async put(t,i){var e=this._encoder.encode(i),i=`(function (fn,fc){require('fs').writeFile(fn,new TextEncoder().encode(fc))})('${t}', '${i.replaceAll("\\","\\\\").replaceAll("'","\\'").replaceAll("\n","\\n")}');`;try{await this.write("\r.ls\r",`\r
${e.length}	${t}\r
`,500)}catch(e){await this.write(`\r.rm ${t}\r`),await p(500),await this.run(i)}}async run(e){await this.write("\r.flash -w\r"),await p(500),await this.transfer(this._encoder.encode(e)),await p(500),await this.write("\r.load\r",r),this.state={}}async send(e,t=null){return this.write(`\r${e.replaceAll("\n","\\n")}\r`,t)}async led(e){await this.send(`picoed.led.${e}()`,o)}async toggle(){await this.send("picoed.led.toggle()",o)}async _setupButtons(){var e=e=>`console.log('
~ button_${e}_down')`;var t=e=>`(function check(){setTimeout((()=>${`picoed.button${e.toUpperCase()}.read()`}?${`console.log('
~ button_${e}_up')`}:check()),50)})();`;await this.send(`picoed.buttonA.on('click',()=>{${e("a")};${t("a")}})`),await this.send(`picoed.buttonB.on('click',()=>{${e("b")};${t("b")}})`),this.on(/^~ button_([ab])_down$/m,e=>this.state[e[1]]=!0),this.on(/^~ button_([ab])_up$/m,e=>this.state[e[1]]=!1),this.state.a=!1,this.state.b=!1}async isPressedA(){return void 0===this.state.a&&await this._setupButtons(code),this.state.a}async isPressedB(){return void 0===this.state.b&&await this._setupButtons(code),this.state.b}async clear(){await this.send("picoed.display.clear()",o)}async pixel(e,t,i=30){await this.send(`picoed.display.pixel(${e}, ${t}, ${i})`,o)}async scroll(e,t=30){var i=`
~ display_scroll_done.`;await this.send(`picoed.display.scroll('${e}', ${t}).then(() => console.log('${i}'))`,i)}async show(e,t=30){e=h[e]?e+`(${t})`:`image('${e}', ${t})`;await this.send("picoed.display."+e,o)}async playAndWait(e){var t=`
~ ${e}_done.`;await this.send(`picoed.music.play(picoed.music.${e}).then(() => console.log('${t}'))`,t)}async play(e){await this.send(`picoed.music.play(picoed.music.${e})`,"\r\n[96m[Promise][0m\r\n[0m\r7> ")}playTone(e,i){const a=Math.floor(e/12),s=e%12;return i=Math.floor(1e3*i),new Promise(e=>{var t=setTimeout(e,i);this._tonePromise=[e,t],this.send(`picoed.music._playNote(${a},${s},{duration:${i}})`)})}async stop(){var e,t;this._tonePromise&&([e,t]=this._tonePromise,clearTimeout(t),e(),this._tonePromise=null),await this.send("picoed.music.stop()",o)}async setPinMode(e,t=M.NONE){this.state[e]=t,await this.send(`pinMode(${e},${t})`,o)}async getPinValue(e){return void 0===this.state[e]&&(await this.setPinMode(e,M.NONE),this.state[e]="ANALOG_INPUT"),"ANALOG_INPUT"!==this.state[e]?(delete this.state[e],this.getPinValue(e)):(e=await this.send(`console.log('
~ pin${e}<'+analogRead(${e})+'>')`,/^~ pin\d+<([\d.]+)>$/m),c(e[1])?parseFloat(e[1]):void 0)}async isPinHigh(e){return void 0===this.state[e]&&await this.setPinMode(e,M.NONE),/^INPUT.*/.test(this.state[e])?"1"===(await this.send(`console.log('
~ pin${e}<'+digitalRead(${e})+'>')`,/^~ pin\d+<(\d)>$/m))[1]:(delete this.state[e],this.isPinHigh(e))}async setPinValue(e,t){if(void 0===this.state[e]&&await this.setPinMode(e,M.OUTPUT),this.state[e]!==M.OUTPUT)return delete this.state[e],this.setPinValue(e,t);void 0===t?await this.send(`digitalToggle(${e})`,o):c(t)?await this.send(`analogWrite(${e},${t})`,o):await this.send(`digitalWrite(${e},${t})`,o)}async setServoAngle(e,t){if(void 0===this.state[e]){this.state[e]="pwm_"+Date.now();const a=y.min/20;await this.send(`const ${this.state[e]}=board.pwm(${e},50,${a})`,o),await this.send(this.state[e]+".start();")}if(!this.state[e].includes("pwm_"))return delete this.state[e],this.setServoAngle(e,t);var i=(y.max-y.min)/m.max;const a=(y.min+t*i)/20;await this.send(`${this.state[e]}.setDuty(${a})`,o)}async setupWatcher(t){var e=`console.log('
~ pin_${t}_${T.FALLING}')`,i=`console.log('
~ pin_${t}_${T.RISING}')`,e=await this.send(`setWatch(()=>${e},${t},FALLING,10)`,WAIT_FOR_NUMBER),i=await this.send(`setWatch(()=>${i},${t},RISING,10)`,WAIT_FOR_NUMBER);(e||i)&&(this.state[t]={id:[e&&e[1],i&&i[1]],value:null},this.on(new RegExp(`^~ pin_(${t})_(${T.FALLING}|${T.RISING})$`,"m"),e=>{this.state[t].value=e[2],setTimeout(()=>this.state[t].value=null,50)}))}async stopWatch(e){if(this.state[e]){for(const t of this.state[e].id)await this.send(`clearWatch(${t})`);delete this.state[e]}}checkPinEvent(e,t){if(this.state[e])return t===T.CHANGE?null!==this.state[e].value:this.state[e].value===t}}const g="00001110001110000:00011111011111000:00011111111111000:00011111111111000:00001111111110000:00000011111000000:00000000100000000",R={min:0,max:127};t.extensions.register(new class P{static get EXTENSION_ID(){return"picoed2"}static get EXTENSION_NAME(){return"Pico:ed V2"}get LED_STATE_MENU(){return[{text:s({id:"picoed2.ledStateMenu.on",default:"on"}),value:N.ON},{text:s({id:"picoed2.ledStateMenu.off",default:"off"}),value:N.OFF}]}get BUTTONS_MENU(){return[{text:"A",value:E.A},{text:"B",value:E.B},{text:s({id:"picoed2.buttonsMenu.any",default:"any"}),value:E.ANY}]}get IMAGES_MENU(){return[{text:s({id:"picoed2.imagesMenu.no",default:"no"}),value:h.NO},{text:s({id:"picoed2.imagesMenu.yes",default:"yes"}),value:h.YES},{text:s({id:"picoed2.imagesMenu.heart",default:"heart"}),value:h.HEART},{text:s({id:"picoed2.imagesMenu.triangle",default:"triangle"}),value:h.TRIANGLE},{text:s({id:"picoed2.imagesMenu.square",default:"square"}),value:h.SQUARE},{text:s({id:"picoed2.imagesMenu.rectangle",default:"rectangle"}),value:h.RECTANGLE},{text:s({id:"picoed2.imagesMenu.rhombus",default:"rhombus"}),value:h.RHOMBUS},{text:s({id:"picoed2.imagesMenu.target",default:"target"}),value:h.TARGET},{text:s({id:"picoed2.imagesMenu.chessboard",default:"chessboard"}),value:h.CHESSBOARD},{text:s({id:"picoed2.imagesMenu.happy",default:"happy"}),value:h.HAPPY},{text:s({id:"picoed2.imagesMenu.sad",default:"sad"}),value:h.SAD},{text:s({id:"picoed2.imagesMenu.chagrin",default:"chagrin"}),value:h.CHAGRIN},{text:s({id:"picoed2.imagesMenu.smilingFace",default:"smiling face"}),value:h.SMILING_FACE},{text:s({id:"picoed2.imagesMenu.cry",default:"cry"}),value:h.CRY},{text:s({id:"picoed2.imagesMenu.downcast",default:"downcast"}),value:h.DOWNCAST},{text:s({id:"picoed2.imagesMenu.lookLeft",default:"look left"}),value:h.LOOK_LEFT},{text:s({id:"picoed2.imagesMenu.lookRight",default:"look right"}),value:h.LOOK_RIGHT},{text:s({id:"picoed2.imagesMenu.tongue",default:"tongue"}),value:h.TONGUE},{text:s({id:"picoed2.imagesMenu.peekLeft",default:"peek left"}),value:h.PEEK_LEFT},{text:s({id:"picoed2.imagesMenu.peekRight",default:"peek right"}),value:h.PEEK_RIGHT},{text:s({id:"picoed2.imagesMenu.tearEyes",default:"tear eyes"}),value:h.TEAR_EYES},{text:s({id:"picoed2.imagesMenu.proud",default:"proud"}),value:h.PROUD},{text:s({id:"picoed2.imagesMenu.sneerLeft",default:"sneer left"}),value:h.SNEER_LEFT},{text:s({id:"picoed2.imagesMenu.sneerRight",default:"sneer right"}),value:h.SNEER_RIGHT},{text:s({id:"picoed2.imagesMenu.superciliousLook",default:"supercilious look"}),value:h.SUPERCILIOUS_LOOK},{text:s({id:"picoed2.imagesMenu.excited",default:"excited"}),value:h.EXCITED}]}get MUSIC_MENU(){return[{text:s({id:"picoed2.musicMenu.dadadadum",default:"dadadadum"}),value:I.DADADADUM},{text:s({id:"picoed2.musicMenu.entertainer",default:"entertainer"}),value:I.ENTERTAINER},{text:s({id:"picoed2.musicMenu.prelude",default:"prelude"}),value:I.PRELUDE},{text:s({id:"picoed2.musicMenu.ode",default:"ode"}),value:I.ODE},{text:s({id:"picoed2.musicMenu.nyan",default:"nyan"}),value:I.NYAN},{text:s({id:"picoed2.musicMenu.ringtone",default:"ringtone"}),value:I.RINGTONE},{text:s({id:"picoed2.musicMenu.funk",default:"funk"}),value:I.FUNK},{text:s({id:"picoed2.musicMenu.blues",default:"blues"}),value:I.BLUES},{text:s({id:"picoed2.musicMenu.birthday",default:"birthday"}),value:I.BIRTHDAY},{text:s({id:"picoed2.musicMenu.wedding",default:"wedding"}),value:I.WEDDING},{text:s({id:"picoed2.musicMenu.funeral",default:"funeral"}),value:I.FUNERAL},{text:s({id:"picoed2.musicMenu.punchline",default:"punchline"}),value:I.PUNCHLINE},{text:s({id:"picoed2.musicMenu.python",default:"python"}),value:I.PYTHON},{text:s({id:"picoed2.musicMenu.baddy",default:"baddy"}),value:I.BADDY},{text:s({id:"picoed2.musicMenu.chase",default:"chase"}),value:I.CHASE},{text:s({id:"picoed2.musicMenu.baDing",default:"ba ding"}),value:I.BA_DING},{text:s({id:"picoed2.musicMenu.wawawawaa",default:"wawawawaa"}),value:I.WAWAWAWAA},{text:s({id:"picoed2.musicMenu.jumpUp",default:"jump up"}),value:I.JUMP_UP},{text:s({id:"picoed2.musicMenu.jumpDown",default:"jump down"}),value:I.JUMP_DOWN},{text:s({id:"picoed2.musicMenu.powerUp",default:"power up"}),value:I.POWER_UP},{text:s({id:"picoed2.musicMenu.powerDown",default:"power down"}),value:I.POWER_DOWN}]}get PIN_MODE_MENU(){return[{text:s({id:"picoed2.pinModeMenu.none",default:"none"}),value:M.NONE},{text:s({id:"picoed2.pinModeMenu.up",default:"pull up"}),value:M.UP},{text:s({id:"picoed2.pinModeMenu.down",default:"pull down"}),value:M.DOWN}]}get ANALOG_PINS_MENU(){var e=this.pinsMap();return[{text:"P0",value:""+e[0]},{text:"P1",value:""+e[1]},{text:"P2",value:""+e[2]},{text:"P3",value:""+e[3]}]}get DIGITAL_PINS_MENU(){return Object.entries(this.pinsMap()).map(([e,t])=>({text:"P"+e,value:""+t}))}get DIGITAL_VALUE_MENU(){return[{text:s({id:"picoed2.digitalValueMenu.low",default:"low"}),value:A.LOW},{text:s({id:"picoed2.digitalValueMenu.high",default:"high"}),value:A.HIGH}]}get INTERRUPT_EVENTS_MENU(){return[{text:s({id:"picoed2.interruptEventsMenu.falling",default:"falling"}),value:T.FALLING},{text:s({id:"picoed2.interruptEventsMenu.rising",default:"rising"}),value:T.RISING},{text:s({id:"picoed2.interruptEventsMenu.change",default:"change"}),value:T.CHANGE}]}constructor(){this.runtime=t.vm.runtime,this._peripheral=new f(this.runtime,P.EXTENSION_ID),this.runtime.on("PROJECT_STOP_ALL",()=>this.send(".reset","\r\nsoft reset\r\n")),this.runtime.on("PROJECT_STOP_ALL",this.stopMusic.bind(this))}async put(e){if(this._peripheral.isConnected()){this.runtime.emit("EXTENSION_DATA_DOWNLOADING",!0);try{for(var[t,i]of e)await this._peripheral.put(t,i)}catch(e){this._peripheral._serial._handleRequestError(e)}finally{this.runtime.emit("EXTENSION_DATA_DOWNLOADING",!1)}}else this._peripheral._files=this._peripheral._files.concat(e)}run(e){return this._peripheral.run(e)}send(e,t){return this._peripheral.send(e,t)}pinsMap(){return{0:26,1:27,2:28,3:29,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:11,12:12,13:13,14:14,15:15,16:16,19:19,20:18}}getInfo(){var e=s.setup().locale;return this._peripheral.setupAddon(P.EXTENSION_ID,P.EXTENSION_NAME,()=>this._peripheral.send(".hi")),{id:P.EXTENSION_ID,name:P.EXTENSION_NAME,blockIconURI:"data:image/png;base64,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",showStatusButton:!0,docsURI:t.require.resolve(`readme.${e}.html`),blocks:[{opcode:"setLEDState",text:s({id:"picoed2.setLEDState",default:"set LED [STATE]"}),blockType:a.COMMAND,arguments:{STATE:{type:i.STRING,menu:"ledState",defaultValue:N.ON}}},{opcode:"toggleLED",text:s({id:"picoed2.toggleLEDState",default:"toggle LED"}),blockType:a.COMMAND},"---",{opcode:"whenButtonPressed",text:s({id:"picoed2.whenButtonPressed",default:"when [BTN] button pressed"}),blockType:a.HAT,arguments:{BTN:{type:i.STRING,menu:"buttons",defaultValue:E.A}}},{opcode:"isButtonPressed",text:s({id:"picoed2.isButtonPressed",default:"[BTN] button pressed?"}),blockType:a.BOOLEAN,arguments:{BTN:{type:i.STRING,menu:"buttons",defaultValue:E.A}}},"---",{opcode:"displayText",text:s({id:"picoed2.displayText",default:"display text [TEXT] brightness: [BRIGHT]%"}),blockType:a.COMMAND,arguments:{TEXT:{type:i.STRING,defaultValue:s({id:"picoed2.defaultDisplayText",default:"Hello!"})},BRIGHT:{type:i.NUMBER,defaultValue:10}}},{opcode:"displayImage",text:s({id:"picoed2.displayImage",default:"display image [IMAGE] brightness: [BRIGHT]%"}),blockType:a.COMMAND,arguments:{IMAGE:{type:i.STRING,menu:"images",defaultValue:h.NO},BRIGHT:{type:i.NUMBER,defaultValue:10}}},{opcode:"displaySymbol",text:s({id:"picoed2.displaySymbol",default:"display [MATRIX] brightness: [BRIGHT]%"}),blockType:a.COMMAND,arguments:{MATRIX:{type:i.MATRIX,defaultValue:g},BRIGHT:{type:i.NUMBER,defaultValue:10}}},{opcode:"setSymbol",text:s({id:"picoed2.setSymbol",default:"set image [MATRIX]"}),blockType:a.REPORTER,arguments:{MATRIX:{type:i.MATRIX,defaultValue:g}}},{opcode:"displayPixel",text:s({id:"picoed2.displayPixel",default:"display pixel at x: [X] y: [Y] brightness: [BRIGHT]%"}),blockType:a.COMMAND,arguments:{X:{type:i.NUMBER,defaultValue:1},Y:{type:i.NUMBER,defaultValue:1},BRIGHT:{type:i.NUMBER,defaultValue:10}}},{opcode:"clearDisplay",text:s({id:"picoed2.clearDisplay",default:"clear display"}),blockType:a.COMMAND},"---",{opcode:"playMusicAndWait",text:s({id:"picoed2.playMusicAndWait",default:"play music [MUSIC] until done"}),blockType:a.COMMAND,arguments:{MUSIC:{type:i.STRING,menu:"music",defaultValue:I.DADADADUM}}},{opcode:"playMusic",text:s({id:"picoed2.playMusic",default:"play music [MUSIC]"}),blockType:a.COMMAND,arguments:{MUSIC:{type:i.STRING,menu:"music",defaultValue:I.DADADADUM}}},{opcode:"playTone",text:s({id:"picoed2.playTone",default:"play tone [NOTE] for [DURATION] seconds"}),blockType:a.COMMAND,arguments:{NOTE:{type:i.NOTE,defaultValue:60},DURATION:{type:i.NUMBER,defaultValue:.25}}},{opcode:"stopMusic",text:s({id:"picoed2.stopMusic",default:"stop music"}),blockType:a.COMMAND},"---",{opcode:"analogValue",text:s({id:"picoed2.analogValue",default:"analog value of pin [PIN]"}),blockType:a.REPORTER,arguments:{PIN:{type:i.NUMBER,menu:"analogPins",defaultValue:this.ANALOG_PINS_MENU[0].value}}},{opcode:"setPullMode",text:s({id:"picoed2.setPullMode",default:"set pin [PIN] to input [MODE]"}),blockType:a.COMMAND,arguments:{PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value},MODE:{type:i.STRING,menu:"pinModes",defaultValue:M.NONE}}},{opcode:"isPinHigh",text:s({id:"picoed2.isPinHigh",default:"[PIN] pin is high?"}),blockType:a.BOOLEAN,arguments:{PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value}}},"---",{opcode:"setAnalogValue",text:s({id:"picoed2.setAnalogValue",default:"set pin [PIN] analog [VALUE] %"}),blockType:a.COMMAND,arguments:{PIN:{type:i.NUMBER,menu:"analogPins",defaultValue:this.ANALOG_PINS_MENU[0].value},VALUE:{type:i.NUMBER,defaultValue:0}}},{opcode:"setDigitalValue",text:s({id:"picoed2.setDigitalValue",default:"set pin [PIN] digital [VALUE]"}),blockType:a.COMMAND,arguments:{PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value},VALUE:{type:i.STRING,menu:"digitalValues",defaultValue:A.LOW}}},{opcode:"toggleDigitalValue",text:s({id:"picoed2.toggleDigitalValue",default:"toggle pin [PIN] digital"}),blockType:a.COMMAND,arguments:{PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value}}},{opcode:"setServoAngle",text:s({id:"picoed2.setServoAngle",default:"set pin [PIN] servo angle [ANGLE]"}),blockType:a.COMMAND,arguments:{PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value},ANGLE:{type:i.NUMBER,defaultValue:90}}},"---",{opcode:"listenEvent",text:s({id:"picoed2.listenEvent",default:"listen event on [PIN]"}),blockType:a.COMMAND,arguments:{PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value}}},{opcode:"whenCatchEvent",text:s({id:"picoed2.whenCatchEvent",default:"when catch [EVENT] at pin [PIN]"}),blockType:a.HAT,arguments:{EVENT:{type:i.STRING,menu:"interruptEvents",defaultValue:this.INTERRUPT_EVENTS_MENU[0].value},PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value}}},{opcode:"isCatchEvent",text:s({id:"picoed2.isCatchEvent",default:"catch [EVENT] at pin [PIN]"}),blockType:a.BOOLEAN,arguments:{EVENT:{type:i.STRING,menu:"interruptEvents",defaultValue:this.INTERRUPT_EVENTS_MENU[0].value},PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value}}},{opcode:"stopListen",text:s({id:"picoed2.stopListen",default:"stop listen on [PIN]"}),blockType:a.COMMAND,arguments:{PIN:{type:i.NUMBER,menu:"digitalPins",defaultValue:this.DIGITAL_PINS_MENU[0].value}}}],menus:{ledState:{acceptReporters:!1,items:this.LED_STATE_MENU},buttons:{acceptReporters:!1,items:this.BUTTONS_MENU},images:{acceptReporters:!1,items:this.IMAGES_MENU},music:{acceptReporters:!1,items:this.MUSIC_MENU},analogPins:{acceptReporters:!1,items:this.ANALOG_PINS_MENU},digitalPins:{acceptReporters:!1,items:this.DIGITAL_PINS_MENU},pinModes:{acceptReporters:!1,items:this.PIN_MODE_MENU},digitalValues:{acceptReporters:!0,items:this.DIGITAL_VALUE_MENU},interruptEvents:{acceptReporters:!1,items:this.INTERRUPT_EVENTS_MENU}}}}async setLEDState(e){e=l.toString(e.STATE),await this._peripheral.led(e)}async toggleLED(){await this._peripheral.toggle()}whenButtonPressed(e){return!0===this.isButtonPressed(e)}async isButtonPressed(e){switch(l.toString(e.BTN)){case E.A:return this._peripheral.isPressedA();case E.B:return this._peripheral.isPressedB();default:return await this._peripheral.isPressedA()||await this._peripheral.isPressedB()}}async displaySymbol(e){var t=Math.floor(n.clamp(l.toNumber(e.BRIGHT),0,100)/100*255);let i=l.toString(e.MATRIX).replace(/\s/g,"");if(!i.includes(":")){var a=[];for(let e=0;e<7;e++){var s=17*e;a.push(i.slice(s,17+s))}i=a.join(":")}await this._peripheral.show(i,t)}async displayImage(e){let t=l.toString(e.IMAGE);c(t)&&(i=parseInt(t)-1,t=this.IMAGES_MENU.at(i%this.IMAGES_MENU.length).value);var i=Math.floor(n.clamp(l.toNumber(e.BRIGHT),0,100)/100*255);await this._peripheral.show(t,i)}async displayText(e){var t=l.toString(e.TEXT),e=Math.floor(n.clamp(l.toNumber(e.BRIGHT),0,100)/100*255);await this._peripheral.scroll(t,e)}async displayPixel(e){var t=n.clamp(l.toNumber(e.X),1,17)-1,i=n.clamp(l.toNumber(e.Y),1,7)-1,e=Math.floor(n.clamp(l.toNumber(e.BRIGHT),0,100)/100*255);await this._peripheral.pixel(t,i,e)}async clearDisplay(){await this._peripheral.clear()}setSymbol(e){return l.toString(e.MATRIX).replace(/\s/g,"")}async playMusicAndWait(e){let t=l.toString(e.MUSIC);c(t)&&(e=parseInt(t)-1,t=this.MUSIC_MENU.at(e%this.MUSIC_MENU.length).value),await this._peripheral.playAndWait(t)}async playMusic(e){let t=l.toString(e.MUSIC);c(t)&&(e=parseInt(t)-1,t=this.MUSIC_MENU.at(e%this.MUSIC_MENU.length).value),await this._peripheral.play(t)}async playTone(e){var t=l.toNumber(e.NOTE),t=n.clamp(t,R.min,R.max),e=l.toNumber(e.DURATION);await this._peripheral.playTone(t,e)}async stopMusic(){await this._peripheral.stop()}async analogValue(e){return e=l.toNumber(e.PIN),this._peripheral.getPinValue(e)}async setPullMode(e){var t=l.toNumber(e.PIN),e=l.toString(e.MODE);await this._peripheral.setPinMode(t,e)}async isPinHigh(e){return e=l.toNumber(e.PIN),this._peripheral.isPinHigh(e)}async setDigitalValue(e){var t=l.toNumber(e.PIN),e=l.toString(e.VALUE);await this._peripheral.setPinValue(t,e)}async toggleDigitalValue(e){e=l.toNumber(e.PIN),await this._peripheral.setPinValue(e)}async setAnalogValue(e){var t=l.toNumber(e.PIN),e=l.toNumber(e.VALUE)/100;await this._peripheral.setPinValue(t,e)}async setServoAngle(e){var t=l.toNumber(e.PIN),e=l.toNumber(e.ANGLE),e=n.clamp(e,m.min,m.max);await this._peripheral.setServoAngle(t,e)}async listenEvent(e){e=l.toNumber(e.PIN),await this._peripheral.setupWatcher(e)}whenCatchEvent(e){return this.isCatchEvent(e)}isCatchEvent(e){var t=l.toNumber(e.PIN),e=l.toString(e.EVENT);return this._peripheral.checkPinEvent(t,e)}async stopListen(e){e=l.toNumber(e.PIN),await this._peripheral.stopWatch(e)}})}(window.Scratch);