(async function(e,t){var a=await t("./drawing.js");const i=await t("./library.js");var s=await t("./translations.js");const l=e.ArgumentType,o=e.BlockType,D=e.Cast,r=e.formatMessage,f=e.Base64Util;e.log;const m=t=>new Promise(e=>setTimeout(e,t)),h=(e,t,a)=>(248&e)<<8|(252&t)<<3|a>>3;var n="[0m\r7> ";const g=`\r
[90mundefined[0m\r
`+n;const u={ON:"on",OFF:"off"},d={UP:"0",RIGHT:"1",DOWN:"2",LEFT:"3"},c={DIRECT:"direct",BUFFER:"buffer"},p={NONE:"0",SIDE_TO_SIDE:"1",TURN_UPSIDE_DOWN:"2",ROTATE_180:"3"},N={UP:"18",DOWN:"21",LEFT:"20",RIGHT:"19",A:"17",B:"16",X:"14",Y:"15",FN:"22"},y={DADADADUM:"DADADADUM",ENTERTAINER:"ENTERTAINER",PRELUDE:"PRELUDE",ODE:"ODE",NYAN:"NYAN",RINGTONE:"RINGTONE",FUNK:"FUNK",BLUES:"BLUES",BIRTHDAY:"BIRTHDAY",WEDDING:"WEDDING",FUNERAL:"FUNERAL",PUNCHLINE:"PUNCHLINE",PYTHON:"PYTHON",BADDY:"BADDY",CHASE:"CHASE",BA_DING:"BA_DING",WAWAWAWAA:"WAWAWAWAA",JUMP_UP:"JUMP_UP",JUMP_DOWN:"JUMP_DOWN",POWER_UP:"POWER_UP",POWER_DOWN:"POWER_DOWN"};e.extensions.register(new(class{constructor(){this.runtime=e.vm.runtime,this.reset(),this.initialBoard(),this.reset=this.reset.bind(this),this.runtime.on("PROJECT_STOP_ALL",this.reset),this.runtime.on("PERIPHERAL_DISCONNECTED",this.reset)}async initialBoard(){const a=await e.extensions.getService("rpipico");a("put",Object.entries(i)),this.gpio=await a("pinsMap"),this.run=e=>a("run",e),this.send=(e,t)=>a("send",e,t)}reset(){this.display=null,this.option={width:240,height:240,baudrate:40,bus:1,sck:10,mosi:11,dc:8,cs:9,rst:12,bl:13,rotation:0,displayMode:c.BUFFER},this.imageCache=null}get DISPLAY_MODE_MENU(){return[{text:r({id:"st7789Display.direct",default:"direct"}),value:c.DIRECT},{text:r({id:"st7789Display.buffer",default:"buffer"}),value:c.BUFFER}]}get DISPLAY_ROTATION_MENU(){return[{text:r({id:"st7789Display.rotationUp",default:"up"}),value:d.UP},{text:r({id:"st7789Display.rotationLeft",default:"left"}),value:d.LEFT},{text:r({id:"st7789Display.rotationDown",default:"down"}),value:d.DOWN},{text:r({id:"st7789Display.rotationRight",default:"right"}),value:d.RIGHT}]}get BACKLIGHT_STATE_MENU(){return[{text:r({id:"st7789Display.on",default:"on"}),value:u.ON},{text:r({id:"st7789Display.off",default:"off"}),value:u.OFF}]}get FLIP_MENU(){return[{text:r({id:"st7789Display.none",default:"none"}),value:p.NONE},{text:r({id:"st7789Display.flip.side",default:"side to side"}),value:p.SIDE_TO_SIDE},{text:r({id:"st7789Display.flip.updown",default:"turn upside down"}),value:p.TURN_UPSIDE_DOWN},{text:r({id:"st7789Display.flip.rotate",default:"rotate 180"}),value:p.ROTATE_180}]}get BUTTONS_MENU(){return[{text:"↑",value:N.UP},{text:"↓",value:N.DOWN},{text:"←",value:N.LEFT},{text:"→",value:N.RIGHT},{text:"A",value:N.A},{text:"B",value:N.B},{text:"X",value:N.X},{text:"Y",value:N.Y},{text:"FN",value:N.FN}]}get MUSIC_MENU(){return[{text:r({id:"picoarcade.musicMenu.dadadadum",default:"dadadadum"}),value:y.DADADADUM},{text:r({id:"picoarcade.musicMenu.entertainer",default:"entertainer"}),value:y.ENTERTAINER},{text:r({id:"picoarcade.musicMenu.prelude",default:"prelude"}),value:y.PRELUDE},{text:r({id:"picoarcade.musicMenu.ode",default:"ode"}),value:y.ODE},{text:r({id:"picoarcade.musicMenu.nyan",default:"nyan"}),value:y.NYAN},{text:r({id:"picoarcade.musicMenu.ringtone",default:"ringtone"}),value:y.RINGTONE},{text:r({id:"picoarcade.musicMenu.funk",default:"funk"}),value:y.FUNK},{text:r({id:"picoarcade.musicMenu.blues",default:"blues"}),value:y.BLUES},{text:r({id:"picoarcade.musicMenu.birthday",default:"birthday"}),value:y.BIRTHDAY},{text:r({id:"picoarcade.musicMenu.wedding",default:"wedding"}),value:y.WEDDING},{text:r({id:"picoarcade.musicMenu.funeral",default:"funeral"}),value:y.FUNERAL},{text:r({id:"picoarcade.musicMenu.punchline",default:"punchline"}),value:y.PUNCHLINE},{text:r({id:"picoarcade.musicMenu.python",default:"python"}),value:y.PYTHON},{text:r({id:"picoarcade.musicMenu.baddy",default:"baddy"}),value:y.BADDY},{text:r({id:"picoarcade.musicMenu.chase",default:"chase"}),value:y.CHASE},{text:r({id:"picoarcade.musicMenu.baDing",default:"ba ding"}),value:y.BA_DING},{text:r({id:"picoarcade.musicMenu.wawawawaa",default:"wawawawaa"}),value:y.WAWAWAWAA},{text:r({id:"picoarcade.musicMenu.jumpUp",default:"jump up"}),value:y.JUMP_UP},{text:r({id:"picoarcade.musicMenu.jumpDown",default:"jump down"}),value:y.JUMP_DOWN},{text:r({id:"picoarcade.musicMenu.powerUp",default:"power up"}),value:y.POWER_UP},{text:r({id:"picoarcade.musicMenu.powerDown",default:"power down"}),value:y.POWER_DOWN}]}LISTS_MENU(){var e=this.runtime.getTargetForStage(),t=this.runtime.getEditingTarget(),e=Object.values(e.variables).filter(this._filter),t=Object.values(t.variables).filter(this._filter),e=[...new Set([...e,...t])];return 0<e.length?e.map(e=>({text:e.name,value:e.id})):[r({id:"st7789Display.none",default:"none"})]}_filter(e){if("list"!==e.type||!Array.isArray(e.value))return!1;if(0===e.value.length)return!0;const t=encodeURIComponent("data:image/png;base64");return e.value.every(e=>{e=(""+e).split(",");return 1<e.length&&e[1]&&e[1].includes(t)})}getInfo(){var e=r.setup()["locale"];return{id:"picoarcade",name:r({id:"picoarcade.name",default:"Arcade"}),blockIconURI:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAACmElEQVR4nO3cv2sUQRwF8Kf4L2yZIqRKYhUyIfWVwcrizsqIgZQiVhKCiIhYiVgKhpjKs9BCCVYX0i234UhhkkpuwfL+iLNxZDniZnbf7M6g79Plbm937ntvbufHEUBERERERCq7Fvj6U0/nCfY+roe68L8i1Cc3BYA73dsAgAcPH9U6yZvXrwAAHz5+sg+1/n6CFvD8/DsAYGPjVq2THB5+BQAsLd20D7X+ftSFSTdCXvzZ0ydBX++DEkgKmsAy4/EYAJBlGQCg2+2GbM5fKYEkFZCkApJUQJIKSFIBSdEOY+zwJXZKIEkFJEXbhWOdecxSAkkqIKlSFzbG0HsYDd9dp8YY+iRZljkvzCqBJKcE2uQtzM/h8c6ut4t/+fwNAJAOR7Vev7y4CgA4PfXXppcvngO/txxckqgEkpz6uk1gv99Hp9NptEFbm9ulz797/7bR6w8GA/R6PQBKYCsqJXBhfq7295WLrc1tnF2clB6zvLjaaArX11bwY/wTgFsCo5iJ2G57dnHi9AHZ45vuzi7UhUl0Au3u2WWKg2aXua1L+tLh6M/wpW67im1j59xKIIlOYKwLn221Swkk0Qn0uW53sL+Hu/fuX3nM8VF65bnaWk9UAklRjAOL47mD/b3SY4+P0ijGf1YUBbRcChNT8QB1YVqlufBkMsH62oq3i9sBcd1UFaeAvqTDEfI8t39qNaZpTt+BdlXCGDO1KxUxsMnz2aYkSZDnufZE2lLpLlxlt6qMj929y/hqXxVRDWOK9Bvp/4QKSFIBSSogSQUkqYAkFZAU7Tgw1r2WWUogKdoExjrzmKUEklRAkgpIUgFJKiAp6F3Y/hqr7kaVfX2SJN7aVFXQ/53la2U6xEq0pS4sIiIiIiLt+wU17bwyB8UlTQAAAABJRU5ErkJggg==",docsURI:t.resolve(`readme.${e}.html`),blocks:[{opcode:"initialGallery",blockType:o.COMMAND,text:r({id:"st7789Display.initialGallery",default:"initial pixel gallery [GALLERY]"}),arguments:{GALLERY:{type:l.STRING,menu:"LISTS"},COLOR:{type:l.COLOR,defaultValue:"#000000"}}},"---",{opcode:"setMode",blockType:o.COMMAND,text:r({id:"st7789Display.setMode",default:"set display mode [MODE]"}),arguments:{MODE:{type:l.STRING,menu:"displayMode",defaultValue:c.DIRECT}}},{opcode:"setRotation",blockType:o.COMMAND,text:r({id:"st7789Display.setRotation",default:"set display rotation [ROTATION]"}),arguments:{ROTATION:{type:l.STRING,menu:"displayRotation",defaultValue:d.UP}}},{opcode:"setBacklight",blockType:o.COMMAND,text:r({id:"st7789Display.setBacklight",default:"set display backlight [STATE]"}),arguments:{STATE:{type:l.STRING,menu:"backlightState",defaultValue:u.OFF}}},{opcode:"getWidth",blockType:o.REPORTER,text:r({id:"st7789Display.getWidth",defalut:"display width"})},{opcode:"getHeight",blockType:o.REPORTER,text:r({id:"st7789Display.getHeight",defalut:"display height"})},"---",{opcode:"whenButtonPressed",text:r({id:"picoarcade.whenButtonPressed",default:"when [BTN] button pressed"}),blockType:o.HAT,arguments:{BTN:{type:l.STRING,menu:"buttons",defaultValue:N.A}}},{opcode:"isButtonPressed",text:r({id:"picoarcade.isButtonPressed",default:"[BTN] button pressed?"}),blockType:o.BOOLEAN,arguments:{BTN:{type:l.STRING,menu:"buttons",defaultValue:N.A}}},"---",{opcode:"playMusicAndWait",text:r({id:"picoarcade.playMusicAndWait",default:"play music [MUSIC] until done"}),blockType:o.COMMAND,arguments:{MUSIC:{type:l.STRING,menu:"music",defaultValue:y.DADADADUM}}},{opcode:"playMusic",text:r({id:"picoarcade.playMusic",default:"play music [MUSIC]"}),blockType:o.COMMAND,arguments:{MUSIC:{type:l.STRING,menu:"music",defaultValue:y.DADADADUM}}},{opcode:"playNotesAndWait",text:r({id:"picoarcade.playNotesAndWait",default:"play notes [NOTES] until done"}),blockType:o.COMMAND,arguments:{NOTES:{type:l.STRING,defaultValue:"b5:1,e6:3"}}},{opcode:"playNotes",text:r({id:"picoarcade.playNotes",default:"play notes [NOTES]"}),blockType:o.COMMAND,arguments:{NOTES:{type:l.STRING,defaultValue:"b5:1,e6:3"}}},{opcode:"playTone",text:r({id:"picoarcade.playTone",default:"play tone [NOTE] for [DURATION] seconds"}),blockType:o.COMMAND,arguments:{NOTE:{type:l.NOTE,defaultValue:60},DURATION:{type:l.NUMBER,defaultValue:.25}}},{opcode:"stopMusic",text:r({id:"picoarcade.stopMusic",default:"stop music"}),blockType:o.COMMAND},"---",{opcode:"fillScreen",blockType:o.COMMAND,text:r({id:"st7789Display.fillScreen",default:"set screen color to [COLOR]"}),arguments:{COLOR:{type:l.COLOR}}},{opcode:"drawImage",blockType:o.COMMAND,text:r({id:"st7789Display.drawImage",default:"draw image [IMAGE] at x: [X] y: [Y] size to [SIZE] and flip [FLIP]"}),arguments:{IMAGE:{type:l.STRING,defaultValue:"png;base64"},X:{type:l.NUMBER,defaultValue:0},Y:{type:l.NUMBER,defaultValue:0},SIZE:{type:l.NUMBER,defaultValue:100},FLIP:{type:l.NUMBER,menu:"flip",defaultValue:p.NONE}}},{opcode:"displayBuffer",blockType:o.COMMAND,text:r({id:"st7789Display.displayBuffer",default:"display buffer"})},{opcode:"clearScreen",blockType:o.COMMAND,text:r({id:"st7789Display.clearScreen",default:"clear screen"})}],menus:{LISTS:{items:"LISTS_MENU"},backlightState:{acceptReporters:!1,items:this.BACKLIGHT_STATE_MENU},displayRotation:{acceptReporters:!1,items:this.DISPLAY_ROTATION_MENU},displayMode:{acceptReporters:!1,items:this.DISPLAY_MODE_MENU},flip:{acceptReporters:!1,items:this.FLIP_MENU},buttons:{acceptReporters:!1,items:this.BUTTONS_MENU},music:{acceptReporters:!1,items:this.MUSIC_MENU}}}}async getDisplayDevice(){if(this.send){const{width:a,height:i,baudrate:s,bus:l,sck:o,mosi:r,dc:n,cs:u,rst:d,bl:c}=this.option;if(-1!==o&&-1!==r&&-1!==n&&-1!==u&&-1!==d){const p=`display_${l}_${o}_`+r;if(this.display){if(this.display.name===p)return this.display;this.display=null}else await this.send("const ST7789 = (function (f){return eval(new TextDecoder().decode(require('fs').readFile(f)))})('./st7789.js')",g);await this.send(`const ${p} = new ST7789()`,g);var e=JSON.stringify({baudrate:1e6*s,miso:-1,sck:o,mosi:r}),t=JSON.stringify({rotation:0,width:a,height:i,dc:n,cs:u,rst:d,bl:c});await this.send(p+`.setup(board.spi(${l}, ${e}), ${t})`,g),m(100);const N=this.send.bind(this),y=this.option;return this.display={get name(){return p},get gc(){return`${this.name}.getContext('${y.displayMode}')`},on(){if(-1!==c)return N(this.name+".on()",g)},off(){if(-1!==c)return N(this.name+".off()",g)},send(e){return N(this.gc+"."+e,g)},color16(e,t,a){return this.gc+`.color16(${e},${t},${a})`}},await this.display.send("clearScreen()"),await this.display.on(),this.display}}}async setRotation(e){this.option.rotation=D.toNumber(e.ROTATION);e=await this.getDisplayDevice();e&&await e.send(`setRotation(${this.option.rotation})`)}async setBacklight(e){var t=await this.getDisplayDevice();t&&await t[D.toString(e.STATE)]()}getWidth(){return this.option.width}getHeight(){return this.option.height}setMode(e){this.option.displayMode=D.toString(e.MODE)}async displayBuffer(){var e;this.option.displayMode===c.BUFFER&&(e=await this.getDisplayDevice())&&await e.send("display()")}async clearScreen(e){var t=await this.getDisplayDevice();t&&await t.send("clearScreen()")}async fillScreen(e){var t,a,i=await this.getDisplayDevice();i&&({r:e,g:t,b:a}=D.toRgbColorObject(e.COLOR),e=i.color16(e,t,a),await i.send(`fillScreen(${e})`))}async setPixel(e){var t,a,i,s,l=await this.getDisplayDevice();l&&(t=D.toNumber(e.X),a=D.toNumber(e.Y),{r:e,g:i,b:s}=D.toRgbColorObject(e.COLOR),e=l.color16(e,i,s),await l.send(`setPixel(${t},${a},${e})`))}async setPenColor(e){var t,a,i=await this.getDisplayDevice();i&&({r:e,g:t,b:a}=D.toRgbColorObject(e.COLOR),e=i.color16(e,t,a),await i.send(`setColor(${e})`))}async setFillColor(e){var t,a,i=await this.getDisplayDevice();i&&({r:e,g:t,b:a}=D.toRgbColorObject(e.COLOR),e=i.color16(e,t,a),await i.send(`setFillColor(${e})`))}async drawLine(e){var t,a,i,s=await this.getDisplayDevice();s&&(t=D.toNumber(e.X1),a=D.toNumber(e.Y1),i=D.toNumber(e.X2),e=D.toNumber(e.Y2),await s.send(`drawLine(${t},${a},${i},${e})`))}async drawRect(e){var t,a,i,s=await this.getDisplayDevice();s&&(t=D.toNumber(e.X),a=D.toNumber(e.Y),i=D.toNumber(e.WIDTH),e=D.toNumber(e.HEIGHT),await s.send(`drawRect(${t},${a},${i},${e})`))}async fillRect(e){var t,a,i,s=await this.getDisplayDevice();s&&(t=D.toNumber(e.X),a=D.toNumber(e.Y),i=D.toNumber(e.WIDTH),e=D.toNumber(e.HEIGHT),await s.send(`fillRect(${t},${a},${i},${e})`))}async drawCircle(e){var t,a,i=await this.getDisplayDevice();i&&(t=D.toNumber(e.X),a=D.toNumber(e.Y),e=D.toNumber(e.R),await i.send(`drawCircle(${t},${a},${e})`))}async fillCircle(e){var t,a,i=await this.getDisplayDevice();i&&(t=D.toNumber(e.X),a=D.toNumber(e.Y),e=D.toNumber(e.R),await i.send(`fillCircle(${t},${a},${e})`))}async drawRoundRect(e){var t,a,i,s,l=await this.getDisplayDevice();l&&(t=D.toNumber(e.X),a=D.toNumber(e.Y),i=D.toNumber(e.WIDTH),s=D.toNumber(e.HEIGHT),e=D.toNumber(e.R),await l.send(`drawRoundRect(${t},${a},${i},${s},${e})`))}async fillRoundRect(e){var t,a,i,s,l=await this.getDisplayDevice();l&&(t=D.toNumber(e.X),a=D.toNumber(e.Y),i=D.toNumber(e.WIDTH),s=D.toNumber(e.HEIGHT),e=D.toNumber(e.R),await l.send(`fillRoundRect(${t},${a},${i},${s},${e})`))}async initialGallery(p,e){var t=D.toString(p.GALLERY),e=e.target.lookupVariableById(t);const N=[],y=new Map;t=e.value.map(e=>{var[,e]=e.split(",");const c=decodeURIComponent(e);return new Promise(u=>{const d=new Image;d.src=c,d.onload=()=>{var a=new Uint16Array(d.width*d.height),e={width:d.width,height:d.height,bpp:16},t={color:65535},i=(p.COLOR&&(t.transparent=h(...D.toRgbColorList(p.COLOR)),a.fill(t.transparent)),document.createElement("canvas")),s=(i.width=d.width,i.height=d.height,i.getContext("2d"));s.drawImage(d,0,0,d.width,d.width);for(let t=0;t<d.width;t++)for(let e=0;e<d.height;e++){var[l,o,r,n]=s.getImageData(t,e,1,1).data;0!==n&&(a[e*d.width+t]=h(l,o,r))}e.data=f.arrayBufferToBase64(a.buffer);i="bitmap_"+Date.now().toString(36);N.push(`const ${i}=${JSON.stringify({bitmap:e,option:t})};`),y.set(c,i),u()}})});await Promise.all(t),await this.run(N.join("\n")),this.imageCache=y}async drawImage(e){var t,a,i,s,l=await this.getDisplayDevice();l&&(t=D.toNumber(e.X),a=D.toNumber(e.Y),i=D.toString(e.IMAGE),e={scaleX:s=D.toNumber(e.SIZE)/100,scaleY:s,flipX:!!((s=D.toNumber(e.FLIP))&p.TURN_UPSIDE_DOWN),flipY:!!(s&p.SIDE_TO_SIDE)},this.imageCache)&&this.imageCache.has(i)&&(s=this.imageCache.get(i),await l.send(`drawBitmap(${t},${a},${s}.bitmap,Object.assign(${s}.option, ${JSON.stringify(e)}))`))}})),e.extensions.register(new a),e.extensions.translations(s),await e.extensions.use("pixelGallery"),await e.extensions.use("tilemap"),e.vm.emit("EXTENSION_SELECTED")})(Scratch,require);