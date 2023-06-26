!async function(t){const a=t.ArgumentType,i=t.BlockType,y=t.Cast,s=t.formatMessage,f=t.Base64Util;t.log;var e=await t.require("./drawing.js");const l=await t.require("./library.js");var r=await t.require("./translations.js");t.extensions.translations(r);const h=t=>new Promise(e=>setTimeout(e,t)),m=(e,t,a)=>(248&e)<<8|(252&t)<<3|a>>3;r="[0m\r7> ";const E=`\r
[90mundefined[0m\r
`+r;const o={ON:"on",OFF:"off"},u={UP:"0",RIGHT:"1",DOWN:"2",LEFT:"3"},n={DIRECT:"direct",BUFFER:"buffer"},d={NONE:"0",SIDE_TO_SIDE:"1",TURN_UPSIDE_DOWN:"2",ROTATE_180:"3"},c={UP:"18",DOWN:"21",LEFT:"20",RIGHT:"19",A:"17",B:"16",X:"14",Y:"15",FN:"22"},p={DADADADUM:"DADADADUM",ENTERTAINER:"ENTERTAINER",PRELUDE:"PRELUDE",ODE:"ODE",NYAN:"NYAN",RINGTONE:"RINGTONE",FUNK:"FUNK",BLUES:"BLUES",BIRTHDAY:"BIRTHDAY",WEDDING:"WEDDING",FUNERAL:"FUNERAL",PUNCHLINE:"PUNCHLINE",PYTHON:"PYTHON",BADDY:"BADDY",CHASE:"CHASE",BA_DING:"BA_DING",WAWAWAWAA:"WAWAWAWAA",JUMP_UP:"JUMP_UP",JUMP_DOWN:"JUMP_DOWN",POWER_UP:"POWER_UP",POWER_DOWN:"POWER_DOWN"};class N{static get EXTENSION_ID(){return"picoarcade"}constructor(){this.runtime=t.vm.runtime,this.reset(),this.initialBoard(),this.reset=this.reset.bind(this),this.runtime.on("PROJECT_STOP_ALL",this.reset),this.runtime.on("PERIPHERAL_DISCONNECTED",this.reset)}async initialBoard(){const a=await t.extensions.getService("rpipico");a("put",Object.entries(l)),this.gpio=await a("pinsMap"),this.run=e=>a("run",e),this.send=(e,t)=>a("send",e,t)}reset(){this.display=null,this.option={width:240,height:240,baudrate:40,bus:1,sck:10,mosi:11,dc:8,cs:9,rst:12,bl:13,rotation:0,displayMode:n.BUFFER},this.imageCache=null}get DISPLAY_MODE_MENU(){return[{text:s({id:"st7789Display.direct",default:"direct"}),value:n.DIRECT},{text:s({id:"st7789Display.buffer",default:"buffer"}),value:n.BUFFER}]}get DISPLAY_ROTATION_MENU(){return[{text:s({id:"st7789Display.rotationUp",default:"up"}),value:u.UP},{text:s({id:"st7789Display.rotationLeft",default:"left"}),value:u.LEFT},{text:s({id:"st7789Display.rotationDown",default:"down"}),value:u.DOWN},{text:s({id:"st7789Display.rotationRight",default:"right"}),value:u.RIGHT}]}get BACKLIGHT_STATE_MENU(){return[{text:s({id:"st7789Display.on",default:"on"}),value:o.ON},{text:s({id:"st7789Display.off",default:"off"}),value:o.OFF}]}get FLIP_MENU(){return[{text:s({id:"st7789Display.none",default:"none"}),value:d.NONE},{text:s({id:"st7789Display.flip.side",default:"side to side"}),value:d.SIDE_TO_SIDE},{text:s({id:"st7789Display.flip.updown",default:"turn upside down"}),value:d.TURN_UPSIDE_DOWN},{text:s({id:"st7789Display.flip.rotate",default:"rotate 180"}),value:d.ROTATE_180}]}get BUTTONS_MENU(){return[{text:"↑",value:c.UP},{text:"↓",value:c.DOWN},{text:"←",value:c.LEFT},{text:"→",value:c.RIGHT},{text:"A",value:c.A},{text:"B",value:c.B},{text:"X",value:c.X},{text:"Y",value:c.Y},{text:"FN",value:c.FN}]}get MUSIC_MENU(){return[{text:s({id:"picoarcade.musicMenu.dadadadum",default:"dadadadum"}),value:p.DADADADUM},{text:s({id:"picoarcade.musicMenu.entertainer",default:"entertainer"}),value:p.ENTERTAINER},{text:s({id:"picoarcade.musicMenu.prelude",default:"prelude"}),value:p.PRELUDE},{text:s({id:"picoarcade.musicMenu.ode",default:"ode"}),value:p.ODE},{text:s({id:"picoarcade.musicMenu.nyan",default:"nyan"}),value:p.NYAN},{text:s({id:"picoarcade.musicMenu.ringtone",default:"ringtone"}),value:p.RINGTONE},{text:s({id:"picoarcade.musicMenu.funk",default:"funk"}),value:p.FUNK},{text:s({id:"picoarcade.musicMenu.blues",default:"blues"}),value:p.BLUES},{text:s({id:"picoarcade.musicMenu.birthday",default:"birthday"}),value:p.BIRTHDAY},{text:s({id:"picoarcade.musicMenu.wedding",default:"wedding"}),value:p.WEDDING},{text:s({id:"picoarcade.musicMenu.funeral",default:"funeral"}),value:p.FUNERAL},{text:s({id:"picoarcade.musicMenu.punchline",default:"punchline"}),value:p.PUNCHLINE},{text:s({id:"picoarcade.musicMenu.python",default:"python"}),value:p.PYTHON},{text:s({id:"picoarcade.musicMenu.baddy",default:"baddy"}),value:p.BADDY},{text:s({id:"picoarcade.musicMenu.chase",default:"chase"}),value:p.CHASE},{text:s({id:"picoarcade.musicMenu.baDing",default:"ba ding"}),value:p.BA_DING},{text:s({id:"picoarcade.musicMenu.wawawawaa",default:"wawawawaa"}),value:p.WAWAWAWAA},{text:s({id:"picoarcade.musicMenu.jumpUp",default:"jump up"}),value:p.JUMP_UP},{text:s({id:"picoarcade.musicMenu.jumpDown",default:"jump down"}),value:p.JUMP_DOWN},{text:s({id:"picoarcade.musicMenu.powerUp",default:"power up"}),value:p.POWER_UP},{text:s({id:"picoarcade.musicMenu.powerDown",default:"power down"}),value:p.POWER_DOWN}]}LISTS_MENU(){var e=this.runtime.getTargetForStage(),t=this.runtime.getEditingTarget(),e=Object.values(e.variables).filter(this._filter),t=Object.values(t.variables).filter(this._filter),e=[...new Set([...e,...t])];return 0<e.length?e.map(e=>({text:e.name,value:e.id})):[s({id:"st7789Display.none",default:"none"})]}_filter(e){if("list"!==e.type||!Array.isArray(e.value))return!1;if(0===e.value.length)return!0;const t=encodeURIComponent("data:image/png;base64");return e.value.every(e=>{e=(""+e).split(",");return 1<e.length&&e[1]&&e[1].includes(t)})}getInfo(){var e=s.setup()["locale"];return{id:N.EXTENSION_ID,name:s({id:"picoarcade.name",default:"Arcade"}),blockIconURI:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAACmElEQVR4nO3cv2sUQRwF8Kf4L2yZIqRKYhUyIfWVwcrizsqIgZQiVhKCiIhYiVgKhpjKs9BCCVYX0i234UhhkkpuwfL+iLNxZDniZnbf7M6g79Plbm937ntvbufHEUBERERERCq7Fvj6U0/nCfY+roe68L8i1Cc3BYA73dsAgAcPH9U6yZvXrwAAHz5+sg+1/n6CFvD8/DsAYGPjVq2THB5+BQAsLd20D7X+ftSFSTdCXvzZ0ydBX++DEkgKmsAy4/EYAJBlGQCg2+2GbM5fKYEkFZCkApJUQJIKSFIBSdEOY+zwJXZKIEkFJEXbhWOdecxSAkkqIKlSFzbG0HsYDd9dp8YY+iRZljkvzCqBJKcE2uQtzM/h8c6ut4t/+fwNAJAOR7Vev7y4CgA4PfXXppcvngO/txxckqgEkpz6uk1gv99Hp9NptEFbm9ulz797/7bR6w8GA/R6PQBKYCsqJXBhfq7295WLrc1tnF2clB6zvLjaaArX11bwY/wTgFsCo5iJ2G57dnHi9AHZ45vuzi7UhUl0Au3u2WWKg2aXua1L+tLh6M/wpW67im1j59xKIIlOYKwLn221Swkk0Qn0uW53sL+Hu/fuX3nM8VF65bnaWk9UAklRjAOL47mD/b3SY4+P0ijGf1YUBbRcChNT8QB1YVqlufBkMsH62oq3i9sBcd1UFaeAvqTDEfI8t39qNaZpTt+BdlXCGDO1KxUxsMnz2aYkSZDnufZE2lLpLlxlt6qMj929y/hqXxVRDWOK9Bvp/4QKSFIBSSogSQUkqYAkFZAU7Tgw1r2WWUogKdoExjrzmKUEklRAkgpIUgFJKiAp6F3Y/hqr7kaVfX2SJN7aVFXQ/53la2U6xEq0pS4sIiIiIiLt+wU17bwyB8UlTQAAAABJRU5ErkJggg==",docsURI:t.require.resolve(`readme.${e}.html`),blocks:[{opcode:"initialGallery",blockType:i.COMMAND,text:s({id:"st7789Display.initialGallery",default:"initial pixel gallery [GALLERY]"}),arguments:{GALLERY:{type:a.STRING,menu:"LISTS"},COLOR:{type:a.COLOR,defaultValue:"#000000"}}},"---",{opcode:"setMode",blockType:i.COMMAND,text:s({id:"st7789Display.setMode",default:"set display mode [MODE]"}),arguments:{MODE:{type:a.STRING,menu:"displayMode",defaultValue:n.DIRECT}}},{opcode:"setRotation",blockType:i.COMMAND,text:s({id:"st7789Display.setRotation",default:"set display rotation [ROTATION]"}),arguments:{ROTATION:{type:a.STRING,menu:"displayRotation",defaultValue:u.UP}}},{opcode:"setBacklight",blockType:i.COMMAND,text:s({id:"st7789Display.setBacklight",default:"set display backlight [STATE]"}),arguments:{STATE:{type:a.STRING,menu:"backlightState",defaultValue:o.OFF}}},{opcode:"getWidth",blockType:i.REPORTER,text:s({id:"st7789Display.getWidth",defalut:"display width"})},{opcode:"getHeight",blockType:i.REPORTER,text:s({id:"st7789Display.getHeight",defalut:"display height"})},"---",{opcode:"whenButtonPressed",text:s({id:"picoarcade.whenButtonPressed",default:"when [BTN] button pressed"}),blockType:i.HAT,arguments:{BTN:{type:a.STRING,menu:"buttons",defaultValue:c.A}}},{opcode:"isButtonPressed",text:s({id:"picoarcade.isButtonPressed",default:"[BTN] button pressed?"}),blockType:i.BOOLEAN,arguments:{BTN:{type:a.STRING,menu:"buttons",defaultValue:c.A}}},"---",{opcode:"playMusicAndWait",text:s({id:"picoarcade.playMusicAndWait",default:"play music [MUSIC] until done"}),blockType:i.COMMAND,arguments:{MUSIC:{type:a.STRING,menu:"music",defaultValue:p.DADADADUM}}},{opcode:"playMusic",text:s({id:"picoarcade.playMusic",default:"play music [MUSIC]"}),blockType:i.COMMAND,arguments:{MUSIC:{type:a.STRING,menu:"music",defaultValue:p.DADADADUM}}},{opcode:"playNotesAndWait",text:s({id:"picoarcade.playNotesAndWait",default:"play notes [NOTES] until done"}),blockType:i.COMMAND,arguments:{NOTES:{type:a.STRING,defaultValue:"b5:1,e6:3"}}},{opcode:"playNotes",text:s({id:"picoarcade.playNotes",default:"play notes [NOTES]"}),blockType:i.COMMAND,arguments:{NOTES:{type:a.STRING,defaultValue:"b5:1,e6:3"}}},{opcode:"playTone",text:s({id:"picoarcade.playTone",default:"play tone [NOTE] for [DURATION] seconds"}),blockType:i.COMMAND,arguments:{NOTE:{type:a.NOTE,defaultValue:60},DURATION:{type:a.NUMBER,defaultValue:.25}}},{opcode:"stopMusic",text:s({id:"picoarcade.stopMusic",default:"stop music"}),blockType:i.COMMAND},"---",{opcode:"fillScreen",blockType:i.COMMAND,text:s({id:"st7789Display.fillScreen",default:"set screen color to [COLOR]"}),arguments:{COLOR:{type:a.COLOR}}},{opcode:"drawImage",blockType:i.COMMAND,text:s({id:"st7789Display.drawImage",default:"draw image [IMAGE] at x: [X] y: [Y] size to [SIZE] and flip [FLIP]"}),arguments:{IMAGE:{type:a.STRING,defaultValue:"png;base64"},X:{type:a.NUMBER,defaultValue:0},Y:{type:a.NUMBER,defaultValue:0},SIZE:{type:a.NUMBER,defaultValue:100},FLIP:{type:a.NUMBER,menu:"flip",defaultValue:d.NONE}}},{opcode:"displayBuffer",blockType:i.COMMAND,text:s({id:"st7789Display.displayBuffer",default:"display buffer"})},{opcode:"clearScreen",blockType:i.COMMAND,text:s({id:"st7789Display.clearScreen",default:"clear screen"})}],menus:{LISTS:{items:"LISTS_MENU"},backlightState:{acceptReporters:!1,items:this.BACKLIGHT_STATE_MENU},displayRotation:{acceptReporters:!1,items:this.DISPLAY_ROTATION_MENU},displayMode:{acceptReporters:!1,items:this.DISPLAY_MODE_MENU},flip:{acceptReporters:!1,items:this.FLIP_MENU},buttons:{acceptReporters:!1,items:this.BUTTONS_MENU},music:{acceptReporters:!1,items:this.MUSIC_MENU}}}}async getDisplayDevice(){if(this.send){const{width:a,height:i,baudrate:s,bus:l,sck:r,mosi:o,dc:u,cs:n,rst:d,bl:c}=this.option;if(-1!==r&&-1!==o&&-1!==u&&-1!==n&&-1!==d){const p=`display_${l}_${r}_`+o;if(this.display){if(this.display.name===p)return this.display;this.display=null}else await this.send("const ST7789 = (function (f){return eval(new TextDecoder().decode(require('fs').readFile(f)))})('./st7789.js')",E);await this.send(`const ${p} = new ST7789()`,E);var e=JSON.stringify({baudrate:1e6*s,miso:-1,sck:r,mosi:o}),t=JSON.stringify({rotation:0,width:a,height:i,dc:u,cs:n,rst:d,bl:c});await this.send(p+`.setup(board.spi(${l}, ${e}), ${t})`,E),h(100);const N=this.send.bind(this),D=this.option;return this.display={get name(){return p},get gc(){return`${this.name}.getContext('${D.displayMode}')`},on(){if(-1!==c)return N(this.name+".on()",E)},off(){if(-1!==c)return N(this.name+".off()",E)},send(e){return N(this.gc+"."+e,E)},color16(e,t,a){return this.gc+`.color16(${e},${t},${a})`}},await this.display.send("clearScreen()"),await this.display.on(),this.display}}}async setRotation(e){this.option.rotation=y.toNumber(e.ROTATION);e=await this.getDisplayDevice();e&&await e.send(`setRotation(${this.option.rotation})`)}async setBacklight(e){var t=await this.getDisplayDevice();t&&await t[y.toString(e.STATE)]()}getWidth(){return this.option.width}getHeight(){return this.option.height}setMode(e){this.option.displayMode=y.toString(e.MODE)}async displayBuffer(){var e;this.option.displayMode===n.BUFFER&&(e=await this.getDisplayDevice())&&await e.send("display()")}async clearScreen(e){var t=await this.getDisplayDevice();t&&await t.send("clearScreen()")}async fillScreen(e){var t,a,i=await this.getDisplayDevice();i&&({r:e,g:t,b:a}=y.toRgbColorObject(e.COLOR),e=i.color16(e,t,a),await i.send(`fillScreen(${e})`))}async setPixel(e){var t,a,i,s,l=await this.getDisplayDevice();l&&(t=y.toNumber(e.X),a=y.toNumber(e.Y),{r:e,g:i,b:s}=y.toRgbColorObject(e.COLOR),e=l.color16(e,i,s),await l.send(`setPixel(${t},${a},${e})`))}async setPenColor(e){var t,a,i=await this.getDisplayDevice();i&&({r:e,g:t,b:a}=y.toRgbColorObject(e.COLOR),e=i.color16(e,t,a),await i.send(`setColor(${e})`))}async setFillColor(e){var t,a,i=await this.getDisplayDevice();i&&({r:e,g:t,b:a}=y.toRgbColorObject(e.COLOR),e=i.color16(e,t,a),await i.send(`setFillColor(${e})`))}async drawLine(e){var t,a,i,s=await this.getDisplayDevice();s&&(t=y.toNumber(e.X1),a=y.toNumber(e.Y1),i=y.toNumber(e.X2),e=y.toNumber(e.Y2),await s.send(`drawLine(${t},${a},${i},${e})`))}async drawRect(e){var t,a,i,s=await this.getDisplayDevice();s&&(t=y.toNumber(e.X),a=y.toNumber(e.Y),i=y.toNumber(e.WIDTH),e=y.toNumber(e.HEIGHT),await s.send(`drawRect(${t},${a},${i},${e})`))}async fillRect(e){var t,a,i,s=await this.getDisplayDevice();s&&(t=y.toNumber(e.X),a=y.toNumber(e.Y),i=y.toNumber(e.WIDTH),e=y.toNumber(e.HEIGHT),await s.send(`fillRect(${t},${a},${i},${e})`))}async drawCircle(e){var t,a,i=await this.getDisplayDevice();i&&(t=y.toNumber(e.X),a=y.toNumber(e.Y),e=y.toNumber(e.R),await i.send(`drawCircle(${t},${a},${e})`))}async fillCircle(e){var t,a,i=await this.getDisplayDevice();i&&(t=y.toNumber(e.X),a=y.toNumber(e.Y),e=y.toNumber(e.R),await i.send(`fillCircle(${t},${a},${e})`))}async drawRoundRect(e){var t,a,i,s,l=await this.getDisplayDevice();l&&(t=y.toNumber(e.X),a=y.toNumber(e.Y),i=y.toNumber(e.WIDTH),s=y.toNumber(e.HEIGHT),e=y.toNumber(e.R),await l.send(`drawRoundRect(${t},${a},${i},${s},${e})`))}async fillRoundRect(e){var t,a,i,s,l=await this.getDisplayDevice();l&&(t=y.toNumber(e.X),a=y.toNumber(e.Y),i=y.toNumber(e.WIDTH),s=y.toNumber(e.HEIGHT),e=y.toNumber(e.R),await l.send(`fillRoundRect(${t},${a},${i},${s},${e})`))}async initialGallery(p,e){var t=y.toString(p.GALLERY),e=e.target.lookupVariableById(t);const N=[],D=new Map;t=e.value.map(e=>{var[,e]=e.split(",");const c=decodeURIComponent(e);return new Promise(n=>{const d=new Image;d.src=c,d.onload=()=>{var a=new Uint16Array(d.width*d.height),e={width:d.width,height:d.height,bpp:16},t={color:65535},i=(p.COLOR&&(t.transparent=m(...y.toRgbColorList(p.COLOR)),a.fill(t.transparent)),document.createElement("canvas")),s=(i.width=d.width,i.height=d.height,i.getContext("2d"));s.drawImage(d,0,0,d.width,d.width);for(let t=0;t<d.width;t++)for(let e=0;e<d.height;e++){var[l,r,o,u]=s.getImageData(t,e,1,1).data;0!==u&&(a[e*d.width+t]=m(l,r,o))}e.data=f.arrayBufferToBase64(a.buffer);i="bitmap_"+Date.now().toString(36);N.push(`const ${i}=${JSON.stringify({bitmap:e,option:t})};`),D.set(c,i),n()}})});await Promise.all(t),await this.run(N.join("\n")),this.imageCache=D}async drawImage(e){var t,a,i,s,l=await this.getDisplayDevice();l&&(t=y.toNumber(e.X),a=y.toNumber(e.Y),i=y.toString(e.IMAGE),e={scaleX:s=y.toNumber(e.SIZE)/100,scaleY:s,flipX:!!((s=y.toNumber(e.FLIP))&d.TURN_UPSIDE_DOWN),flipY:!!(s&d.SIDE_TO_SIDE)},this.imageCache)&&this.imageCache.has(i)&&(s=this.imageCache.get(i),await l.send(`drawBitmap(${t},${a},${s}.bitmap,Object.assign(${s}.option, ${JSON.stringify(e)}))`))}}t.extensions.register(new N),t.extensions.register(new e(N.EXTENSION_ID)),await t.extensions.use("pixelGallery"),t.vm.emit("EXTENSION_SELECTED")}(window.Scratch);