!async function(t){const r=t.Color;t=t.gui.Component;const i={PEN:"pen",FILL:"fill",ERASER:"eraser",PICKER:"picker"},o="transparent",s=(t.initialState={width:16,height:16,scaling:20,tool:i.PEN,background:"#ffffff",imageData:null},t=>r.rgbToHsv(r.hexToRgb(t))),h=t=>r.rgbToHex(r.hsvToRgb(t));class d{constructor(t,e){this.x=t,this.y=e}equals(t){return this.x==t.x&&this.y==t.y}}class e extends t{static get observedState(){return["width","height","scaling","tool","background","galleryName","imageData","color","saturation","brightness"]}constructor(){super(),this.state={dx:0,dy:0},this.prevPixel=new d}connectedCallback(){super.connectedCallback(),this.initialContext()}stateChangedCallback(t,e,a){"imageData"===t&&(a?this.emit("SaveImage"):this.drawingBoard.style.display="none"),e!==a&&("dx"!==t&&"dy"!==t||(this.drawingBoard.style.translate=`${this.state.dx}px ${this.state.dy}px`),"color"===t||"saturation"===t||"brightness"===t?(e={h:this.state.color,s:this.state.saturation,v:this.state.brightness},this.setColor(h(e))):"background"===t&&(this.drawingBoard.style.background=a))}initialContext(){this.ctx=this.drawingBoard.getContext("2d"),this.ctx.globalAlpha=1}resetData(){this.data=[...Array(this.drawingBoard.width)].map(()=>Array(this.drawingBoard.height).fill(o));for(let e=0;e<this.state.width;e++)for(let t=0;t<this.state.height;t++){var[a,i,s,h]=this.ctx.getImageData(e,t,1,1).data;0!==h&&(this.data[e][t]=r.rgbToHex({r:a,g:i,b:s}))}}openImage(t){if(t){const e=new Image;e.src=t,e.onload=()=>{this.newImage(e.width,e.height),this.ctx.drawImage(e,0,0,e.width,e.height),this.setState({width:e.width,height:e.height,imageData:this.drawingBoard.toDataURL()}),this.resetData()}}}newImage(t,e){this.drawingBoard.width=t,this.drawingBoard.height=e,this.drawingBoard.style.width=t*this.state.scaling+"px",this.drawingBoard.style.height=e*this.state.scaling+"px",this.drawingBoard.style.display="block",this.setState({width:t,height:e,imageData:this.drawingBoard.toDataURL()}),this.resetData();t={h:this.state.color,s:this.state.saturation,v:this.state.brightness};this.setColor(h(t))}resizeImage(t,e){if(t!==this.state.width||e!==this.state.height){var a=this.state.imageData;if(this.newImage(t,e),a){const i=new Image;i.src=a,i.onload=()=>{this.ctx.drawImage(i,0,0,i.width,i.height),this.setState({width:t,height:e,imageData:this.drawingBoard.toDataURL()}),this.resetData()}}}}importImage(){var t;this.state.imageData&&((t=document.createElement("input")).type="file",t.click(),t.onchange=t=>{const a=new FileReader;a.readAsDataURL(t.target.files[0]),a.onload=()=>{const e=new Image;e.width=this.state.width,e.height=this.state.height,e.src=a.result,e.onload=()=>{var t=document.createElement("canvas"),a=(t.width=this.state.width,t.height=this.state.width,t.getContext("2d"));a.drawImage(e,0,0,this.state.width,this.state.width);for(let e=0;e<this.state.width;e++)for(let t=0;t<this.state.height;t++){var[i,s,h,o]=a.getImageData(e,t,1,1).data;0!==o&&(this.setColor(r.rgbToHex({r:i,g:s,b:h})),this.draw(e,t))}this.setState("imageData",this.drawingBoard.toDataURL())}}})}downloadImage(){this.state.imageData&&this.drawingBoard.toBlob(t=>{var t=URL.createObjectURL(t),e=document.createElement("a");e.download=this.state.galleryName+".png",e.href=t,e.click()})}setColor(t){this.color=t,this.ctx.fillStyle=t}draw(t,e){0<=t&&t<this.drawingBoard.width&&0<=e&&e<this.drawingBoard.height&&(this.data[t][e]=this.color,this.ctx.fillRect(t,e,1,1))}fill(t,e,a){0<=t&&t<this.drawingBoard.width&&0<=e&&e<this.drawingBoard.height&&this.data[t][e]===a&&this.data[t][e]!=this.color&&(this.draw(t,e),this.fill(t+1,e,a),this.fill(t,e+1,a),this.fill(t-1,e,a),this.fill(t,e-1,a))}erase(t,e){0<=t&&t<this.drawingBoard.width&&0<=e&&e<this.drawingBoard.height&&(this.data[t][e]=o,this.ctx.clearRect(t,e,1,1))}handleWheel(t){t.preventDefault(),t.stopPropagation();let e=this.state.dx-t.deltaX/10,a=this.state.dy-t.deltaY/10;0<e&&(e=0),0<a&&(a=0);t=this.drawingBoard.getBoundingClientRect();Math.abs(e)>t.width&&(e=-t.width),Math.abs(a)>t.height&&(a=-t.height),this.setState({dx:e,dy:a})}handleMouseDown(t){t.preventDefault(),this.prevPixel=new d,this.drawing=!0;const e=()=>{this.drawing=!1,document.removeEventListener("mouseup",e)};document.addEventListener("mouseup",e)}handleMouseMove(t){var e,a;t.preventDefault(),this.drawing&&(e=this.drawingBoard.getBoundingClientRect(),a=t.clientX-e.left,t=t.clientY-e.top,a=Math.floor(this.state.width*a/this.drawingBoard.clientWidth),t=Math.floor(this.state.height*t/this.drawingBoard.clientHeight),this.state.tool===i.PEN?(e=new d(a,t)).equals(this.prevPixel)||(this.prevPixel=e,this.draw(e.x,e.y)):this.state.tool===i.ERASER&&this.erase(a,t))}handleTouchMove(t){t.preventDefault();var e=this.drawingBoard.getBoundingClientRect(),a=t.touches[0].clientX-e.left,t=t.touches[0].clientY-e.top,a=Math.floor(this.state.width*a/this.drawingBoard.clientWidth),t=Math.floor(this.state.height*t/this.drawingBoard.clientHeight);this.state.tool===i.PEN?(e=new d(a,t)).equals(this.prevPixel)||(this.prevPixel=e,this.draw(e.x,e.y)):this.state.tool===i.ERASER&&this.erase(a,t)}handleMouseUp(t){var e,a;t.preventDefault(),this.drawing=!1,void 0===this.prevPixel.x&&(e=this.drawingBoard.getBoundingClientRect(),a=t.clientX-e.left,t=t.clientY-e.top,a=Math.floor(this.state.width*a/this.drawingBoard.clientWidth),t=Math.floor(this.state.height*t/this.drawingBoard.clientHeight),this.state.tool===i.PEN?(this.prevPixel=new d(a,t),this.draw(a,t)):this.state.tool===i.ERASER?this.erase(a,t):this.state.tool===i.FILL?this.fill(a,t,this.data[a][t]):this.state.tool===i.PICKER&&this.data[a][t]!==o&&({h:e,s:a,v:t}=s(this.data[a][t]),this.setState({color:e,saturation:a,brightness:t}))),this.setState("imageData",this.drawingBoard.toDataURL())}render(){return`
                <div
                    onwheel="this.handleWheel"
                    class="pixel-gallery-editor-wrapper"
                >
                    <canvas
                        id="drawing-board"
                        style="background:${this.state.background}"
                        onmousedown="this.handleMouseDown"
                        ontouchmove="this.handleTouchMove"
                        onmousemove="this.handleMouseMove"
                        onmouseup="this.handleMouseUp"
                    ></canvas>
                </div>
            `}}customElements.define("pixel-gallery-editor",e)}(Scratch);