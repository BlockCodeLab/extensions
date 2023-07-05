!async function(M){const t=M.Color;var e=M.gui.Component,M=M.defineMessages;const i=M({Name:{id:"pixelGallery.nameInput",default:"Name"},Color:{id:"pixelGallery.colorSlider",default:"Color"},Saturation:{id:"pixelGallery.saturationSlider",default:"Saturation"},Brightness:{id:"pixelGallery.brightnessSlider",default:"Brightness"},Size:{id:"pixelGallery.sizeSlider",default:"Size"},Width:{id:"pixelGallery.widthInput",default:"width"},Height:{id:"pixelGallery.heightInput",default:"height"},ResizeButton:{id:"pixelGallery.resizeButton",default:"Resize"},NewButton:{id:"pixelGallery.newButton",default:"New Image"},ImportButton:{id:"pixelGallery.importButton",default:"Import"},DownloadButton:{id:"pixelGallery.downloadButton",default:"Download Image"},DeleteButton:{id:"pixelGallery.deleteButton",default:"Delete Image"}}),a=[0,0,324,288,252,216,180,144,108,72,36,0,0],s=124,l=(M,e,i)=>{var{r:M,g:e,b:i}=t.hsvToRgb({h:M,s:e,v:i});return`rgb(${M}, ${e}, ${i})`};class N extends e{static get observedState(){return["color","saturation","brightness","galleryName","width","height","imageData"]}connectedCallback(){super.connectedCallback(),this.setColor(this.state.color,this.state.saturation,this.state.brightness)}stateChangedCallback(M,e,i){"width"===M?this.widthInput.value=i:"height"===M?this.heightInput.value=i:"imageData"===M?this.querySelectorAll("#name-input, .pixel-gallery-sidebar-button:not(.ok-button), .pixel-gallery-sidebar-icon-button").forEach(M=>{M.disabled=!i,i?M.classList.remove("disabled"):M.classList.add("disabled")}):e!==i&&("galleryName"===M?this.nameInput.value=i:"color"!==M&&"saturation"!==M&&"brightness"!==M||this.setColor(this.state.color,this.state.saturation,this.state.brightness))}setColor(M,e,i){var t=M/360,N=a.map(M=>l(M,e,i)),t=(this.colorSliderReadout.innerText=Math.round(100*t),this.colorSliderHandle.style.left=Math.round(t*s)+"px",this.colorSliderContainer.style.background=`linear-gradient(to left, ${N[0]} 0px, ${N[1]} 13px, ${N[2]}, ${N[3]}, ${N[4]}, ${N[5]}, ${N[6]}, ${N[7]}, ${N[8]}, ${N[9]}, ${N[10]}, ${N[11]} 137px, ${N[12]} 100%)`,l(M,0,i)),N=l(M,1,i),t=(this.saturationSliderReadout.innerText=Math.round(100*e),this.saturationSliderHandle.style.left=Math.round(e*s)+"px",this.saturationSliderContainer.style.background=`linear-gradient(to right, ${t} 0px, ${N} 100%)`,l(M,e,0)),N=l(M,e,1);this.brightnessSliderReadout.innerText=Math.round(100*i),this.brightnessSliderHandle.style.left=Math.round(i*s)+"px",this.brightnessSliderContainer.style.background=`linear-gradient(to right, ${t} 0px, ${N} 100%)`}moveSliderHandle(M,i){M.preventDefault();const t=M.target,N=M.clientX,a=t.offsetLeft,e=M=>{M.preventDefault();let e=M.clientX-N+a;(e=e>=s?s:e)<=0&&(e=0),t.style.left=e+"px",i(e/s)},l=()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",l)};document.addEventListener("mousemove",e),document.addEventListener("mouseup",l)}handleColorSliderMousedown(M){this.moveSliderHandle(M,M=>{this.colorSliderReadout.innerText=Math.round(100*M);M*=360;this.setColor(M,this.state.saturation,this.state.brightness),this.setState("color",M)})}handleSaturationSliderMousedown(M){this.moveSliderHandle(M,M=>{this.saturationSliderReadout.innerText=Math.round(100*M),this.setColor(this.state.color,M,this.state.brightness),this.setState("saturation",M)})}handleBrightnessSliderMousedown(M){this.moveSliderHandle(M,M=>{this.brightnessSliderReadout.innerText=Math.round(100*M),this.setColor(this.state.color,this.state.saturation,M),this.setState("brightness",M)})}handleResizeImage(M){M.preventDefault(),this.emit("ResizeImage",{width:parseInt(this.widthInput.value),height:parseInt(this.heightInput.value)})}handleNewImage(M){M.preventDefault(),this.emit("NewImage",{width:parseInt(this.widthInput.value),height:parseInt(this.heightInput.value)})}handleDownloadImage(M){M.preventDefault(),this.emit("DownloadImage")}handleImportImage(M){M.preventDefault(),this.emit("ImportImage")}handleDeleteImage(M){M.preventDefault(),this.emit("DeleteImage")}handleNameInput(M){M.preventDefault(),this.setState("galleryName",M.target.value),this.emit("SaveImage")}render(){return`
                <div class="pixel-gallery-sidebar-wrapper">
                    <input
                        type="text"
                        id="name-input"
                        class="pixel-gallery-sidebar-item pixel-gallery-sidebar-input"
                        placeholder="${i.Name}"
                        disabled="disabled"
                        oninput="this.handleNameInput"
                    >
                    <hr class="pixel-gallery-sidebar-divider"></hr>
                    <div id="color-slider">
                        <div class="pixel-gallery-sidebar-item">
                            <span class="pixel-gallery-sidebar-item-name">${i.Color}</span>
                            <span
                                id="color-slider-readout"
                                class="pixel-gallery-sidebar-item-readout"
                            >0</span>
                        </div>
                        <div
                            id="color-slider-container"
                            class="pixel-gallery-sidebar-item pixel-gallery-sidebar-slider-container"
                        >
                            <div
                                id="color-slider-handle"
                                class="pixel-gallery-sidebar-slider-handle"
                                onmousedown="this.handleColorSliderMousedown"
                            >
                        </div>
                    </div>
                    <div id="saturation-slider">
                        <div class="pixel-gallery-sidebar-item">
                            <span class="pixel-gallery-sidebar-item-name">${i.Saturation}</span>
                            <span
                                id="saturation-slider-readout"
                                class="pixel-gallery-sidebar-item-readout"
                            >0</span>
                        </div>
                        <div
                            id="saturation-slider-container"
                            class="pixel-gallery-sidebar-item pixel-gallery-sidebar-slider-container"
                        >
                            <div
                                id="saturation-slider-handle"
                                class="pixel-gallery-sidebar-slider-handle"
                                onmousedown="this.handleSaturationSliderMousedown"
                            >
                        </div>
                    </div>
                    <div id="brightness-slider">
                        <div class="pixel-gallery-sidebar-item">
                            <span class="pixel-gallery-sidebar-item-name">${i.Brightness}</span>
                            <span
                                id="brightness-slider-readout"
                                class="pixel-gallery-sidebar-item-readout"
                            >0</span>
                        </div>
                        <div
                            id="brightness-slider-container"
                            class="pixel-gallery-sidebar-item pixel-gallery-sidebar-slider-container"
                        >
                            <div
                                id="brightness-slider-handle"
                                class="pixel-gallery-sidebar-slider-handle"
                                onmousedown="this.handleBrightnessSliderMousedown"
                            >
                        </div>
                    </div>
                    <hr class="pixel-gallery-sidebar-divider"></hr>
                    <div>
                        <div class="pixel-gallery-sidebar-item">
                            <span class="pixel-gallery-sidebar-item-name">${i.Size}</span>
                        </div>
                        <div class="pixel-gallery-sidebar-item group">
                            <input
                                type="text"
                                id="width-input"
                                class="pixel-gallery-sidebar-input half"
                                placeholder="${i.Width}"
                                value="${this.state.width||16}"
                            >
                            <span style="margin:0 0.3rem">×</span>
                            <input
                                type="text"
                                id="height-input"
                                class="pixel-gallery-sidebar-input half"
                                placeholder="${i.Height}"
                                value="${this.state.height||16}"
                            >
                        </div>
                    </div>
                    <button
                        class="pixel-gallery-sidebar-item pixel-gallery-sidebar-button disabled"
                        onclick="this.handleResizeImage"
                        disabled="${!this.state.imageData}"
                    >${i.ResizeButton}</button>
                    <button
                        class="pixel-gallery-sidebar-item pixel-gallery-sidebar-button ok-button"
                        onclick="this.handleNewImage"
                    >${i.NewButton}</button>
                    <div class="pixel-gallery-sidebar-item group">
                        <button
                            class="pixel-gallery-sidebar-icon-button disabled"
                            onclick="this.handleImportImage"
                            disabled="${!this.state.imageData}"
                        >
                            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgaGVpZ2h0PSIyMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHdpZHRoPSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxwYXRoIGQ9Ik03LjMzMzMzIDZDNy4zMzMzMyA2LjczNjM4IDcuOTMwMjkgNy4zMzMzMyA4LjY2NjY3IDcuMzMzMzNDOS40MDMwNSA3LjMzMzMzIDEwIDYuNzM2MzggMTAgNkMxMCA1LjI2MzYyIDkuNDAzMDUgNC42NjY2NyA4LjY2NjY3IDQuNjY2NjdDNy45MzAyOSA0LjY2NjY3IDcuMzMzMzMgNS4yNjM2MiA3LjMzMzMzIDZaIiBmaWxsPSIjNTc1ZTc1Ii8+CjxwYXRoIGQ9Ik0xOC42NjY3IDEzLjA2NjdMMTUuOTU1NiAxMC42NjY3QzE1LjY0NDQgMTAuMzU1NiAxNS4xNTU2IDEwLjM1NTYgMTQuOCAxMC42NjY3TDExLjk1NTYgMTMuMDIyMkMxMS43Nzc4IDEzLjIgMTEuNzMzMyAxMy40NjY3IDExLjkxMTEgMTMuNjQ0NEwxMi40ODg5IDE0LjMxMTFDMTIuNjY2NyAxNC40ODg5IDEyLjkzMzMgMTQuNTMzMyAxMy4xMTExIDE0LjM1NTZMMTQuNDg4OSAxMy4yTDE0LjQ4ODkgMTcuNTU1NkMxNC40ODg5IDE3LjgyMjIgMTQuNjY2NyAxOCAxNC45MzMzIDE4TDE1LjgyMjIgMThDMTYuMDg4OSAxOCAxNi4yNjY3IDE3LjgyMjIgMTYuMjY2NyAxNy41NTU2TDE2LjI2NjcgMTMuMjg4OUwxNy40NjY3IDE0LjM1NTZDMTcuNjQ0NCAxNC41MzMzIDE3LjkxMTEgMTQuNDg4OSAxOC4wODg5IDE0LjMxMTFMMTguNjY2NyAxMy42NDQ0QzE4Ljg4ODkgMTMuNTExMSAxOC44NDQ0IDEzLjI0NDQgMTguNjY2NyAxMy4wNjY3WiIgZmlsbD0iIzU3NWU3NSIvPgo8cGF0aCBkPSJNMTYuMjIyMiAyTDMuNzc3NzggMkMyLjggMiAyIDIuOCAyIDMuNzc3NzhMMiAxNi4yMjIyQzIgMTcuMiAyLjggMTggMy43Nzc3OCAxOEwxMC40NDQ0IDE4QzEwLjcxMTEgMTggMTAuODg4OSAxNy44MjIyIDEwLjg4ODkgMTcuNTU1NkwxMC44ODg5IDE2LjY2NjdDMTAuODg4OSAxNi40IDEwLjcxMTEgMTYuMjIyMiAxMC40NDQ0IDE2LjIyMjJMNC42NjY2NyAxNi4yMjIyQzQuMTc3NzggMTYuMjIyMiAzLjc3Nzc4IDE1LjgyMjIgMy43Nzc3OCAxNS4zMzMzTDMuNzc3NzggMTEuMzc3OEw3LjE1NTU2IDkuMjQ0NDRMMTAuMzExMSAxMS41NTU2QzEwLjYyMjIgMTEuNzc3OCAxMS4wMjIyIDExLjc3NzggMTEuMzMzMyAxMS41NTU2TDE2LjIyMjIgOC4wODg4OUwxNi4yMjIyIDkuNTU1NTZDMTYuMjIyMiA5LjgyMjIyIDE2LjQgMTAgMTYuNjY2NyAxMEwxNy41NTU2IDEwQzE3LjgyMjIgMTAgMTggOS44MjIyMiAxOCA5LjU1NTU2TDE4IDMuNzc3NzhDMTggMi44IDE3LjIgMiAxNi4yMjIyIDJaTTEwLjg4ODkgOS43MzMzM0w3LjczMzMzIDcuNDY2NjdDNy40MjIyMiA3LjI0NDQ0IDcuMDY2NjcgNy4yNDQ0NCA2Ljc1NTU2IDcuNDIyMjJMMy43Nzc3OCA5LjI4ODg5TDMuNzc3NzggNC42NjY2N0MzLjc3Nzc4IDQuMTc3NzggNC4xNzc3OCAzLjc3Nzc4IDQuNjY2NjcgMy43Nzc3OEwxNS4zMzMzIDMuNzc3NzhDMTUuODIyMiAzLjc3Nzc4IDE2LjIyMjIgNC4xNzc3OCAxNi4yMjIyIDQuNjY2NjdMMTYuMjIyMiA1Ljg2NjY3QzE2LjIyMjIgNS44NjY2NyAxMC44ODg5IDkuNzMzMzMgMTAuODg4OSA5LjczMzMzWiIgZmlsbD0iIzU3NWU3NSIvPgo8L3N2Zz4K" alt="${i.ImportButton}" title="${i.ImportButton}" />
                        </button>
                        <button
                            class="pixel-gallery-sidebar-icon-button disabled"
                            onclick="this.handleDownloadImage"
                            disabled="${!this.state.imageData}"
                        >
                            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgaGVpZ2h0PSIyMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHdpZHRoPSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxwYXRoIGQ9Ik03LjMzMzMzIDZDNy4zMzMzMyA2LjczNjM4IDcuOTMwMjkgNy4zMzMzMyA4LjY2NjY3IDcuMzMzMzNDOS40MDMwNSA3LjMzMzMzIDEwIDYuNzM2MzggMTAgNkMxMCA1LjI2MzYyIDkuNDAzMDUgNC42NjY2NyA4LjY2NjY3IDQuNjY2NjdDNy45MzAyOSA0LjY2NjY3IDcuMzMzMzMgNS4yNjM2MiA3LjMzMzMzIDZaIiBmaWxsPSIjNTc1ZTc1Ii8+CjxwYXRoIGQ9Ik0xOC42NjY3IDYuOTMzMzNMMTUuOTU1NiA5LjMzMzMzQzE1LjY0NDQgOS42NDQ0NCAxNS4xNTU2IDkuNjQ0NDQgMTQuOCA5LjMzMzMzTDExLjk1NTYgNi45Nzc3OEMxMS43Nzc4IDYuOCAxMS43MzMzIDYuNTMzMzMgMTEuOTExMSA2LjM1NTU2TDEyLjQ4ODkgNS42ODg4OUMxMi42NjY3IDUuNTExMTEgMTIuOTMzMyA1LjQ2NjY3IDEzLjExMTEgNS42NDQ0NEwxNC40ODg5IDYuOEwxNC40ODg5IDIuNDQ0NDRDMTQuNDg4OSAyLjE3Nzc4IDE0LjY2NjcgMiAxNC45MzMzIDJMMTUuODIyMiAyQzE2LjA4ODkgMiAxNi4yNjY3IDIuMTc3NzggMTYuMjY2NyAyLjQ0NDQ0TDE2LjI2NjcgNi43MTExMUwxNy40NjY3IDUuNjQ0NDRDMTcuNjQ0NCA1LjQ2NjY3IDE3LjkxMTEgNS41MTExMSAxOC4wODg5IDUuNjg4ODlMMTguNjY2NyA2LjM1NTU2QzE4Ljg4ODkgNi40ODg4OSAxOC44NDQ0IDYuNzU1NTYgMTguNjY2NyA2LjkzMzMzWiIgZmlsbD0iIzU3NWU3NSIvPgo8cGF0aCBkPSJNMTYuMjIyMiAxOEwzLjc3Nzc4IDE4QzIuOCAxOCAyIDE3LjIgMiAxNi4yMjIyTDIgMy43Nzc3OEMyIDIuOCAyLjggMiAzLjc3Nzc4IDJMMTAuNDQ0NCAyQzEwLjcxMTEgMiAxMC44ODg5IDIuMTc3NzggMTAuODg4OSAyLjQ0NDQ0TDEwLjg4ODkgMy4zMzMzM0MxMC44ODg5IDMuNiAxMC43MTExIDMuNzc3NzggMTAuNDQ0NCAzLjc3Nzc4TDQuNjY2NjcgMy43Nzc3OEM0LjE3Nzc4IDMuNzc3NzggMy43Nzc3OCA0LjE3Nzc4IDMuNzc3NzggNC42NjY2N0wzLjc3Nzc4IDguNjIyMjJMNy4xNTU1NiAxMC43NTU2TDEwLjMxMTEgOC40NDQ0NEMxMC42MjIyIDguMjIyMjIgMTEuMDIyMiA4LjIyMjIyIDExLjMzMzMgOC40NDQ0NEwxNi4yMjIyIDExLjkxMTFMMTYuMjIyMiAxMC40NDQ0QzE2LjIyMjIgMTAuMTc3OCAxNi40IDEwIDE2LjY2NjcgMTBMMTcuNTU1NiAxMEMxNy44MjIyIDEwIDE4IDEwLjE3NzggMTggMTAuNDQ0NEwxOCAxNi4yMjIyQzE4IDE3LjIgMTcuMiAxOCAxNi4yMjIyIDE4Wk0xMC44ODg5IDEwLjI2NjdMNy43MzMzMyAxMi41MzMzQzcuNDIyMjIgMTIuNzU1NiA3LjA2NjY3IDEyLjc1NTYgNi43NTU1NiAxMi41Nzc4TDMuNzc3NzggMTAuNzExMUwzLjc3Nzc4IDE1LjMzMzNDMy43Nzc3OCAxNS44MjIyIDQuMTc3NzggMTYuMjIyMiA0LjY2NjY3IDE2LjIyMjJMMTUuMzMzMyAxNi4yMjIyQzE1LjgyMjIgMTYuMjIyMiAxNi4yMjIyIDE1LjgyMjIgMTYuMjIyMiAxNS4zMzMzTDE2LjIyMjIgMTQuMTMzM0MxNi4yMjIyIDE0LjEzMzMgMTAuODg4OSAxMC4yNjY3IDEwLjg4ODkgMTAuMjY2N1oiIGZpbGw9IiM1NzVlNzUiLz4KPC9zdmc+Cg==" alt="${i.DownloadButton}" title="${i.DownloadButton}" />
                        </button>
                        <button
                            class="pixel-gallery-sidebar-icon-button disabled"
                            onclick="this.handleDeleteImage"
                            disabled="${!this.state.imageData}"
                        >
                            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUwLjIgKDU1MDQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5kZWxldGU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iZGVsZXRlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRGVsZXRlLUljb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAxLjUwMDAwMCkiIGZpbGw9IiM1NzVFNzUiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLDMuMjUgTDE0LDMuMjUgQzE0LjQ0MzcxNjQsMy4yNSAxNC43OTA0MjkzLDMuNjMzMTEzNDMgMTQuNzQ2Mjc3OSw0LjA3NDYyNzc5IEwxMy42MzYzMjc1LDE1LjE3NDEzMTUgQzEzLjU0Njg2NzIsMTYuMDY4NzM0NyAxMi43OTQwNzc1LDE2Ljc1IDExLjg5NTAxMjQsMTYuNzUgTDQuMTA0OTg3NTYsMTYuNzUgQzMuMjA1OTIyNTMsMTYuNzUgMi40NTMxMzI3OSwxNi4wNjg3MzQ3IDIuMzYzNjcyNDgsMTUuMTc0MTMxNSBMMS4yNTM3MjIxMSw0LjA3NDYyNzc5IEMxLjIwOTU3MDY3LDMuNjMzMTEzNDMgMS41NTYyODM1NiwzLjI1IDIsMy4yNSBaIE04Ljc1LDEyIEw4Ljc1LDcgQzguNzUsNi41ODU3ODY0NCA4LjQxNDIxMzU2LDYuMjUgOCw2LjI1IEM3LjU4NTc4NjQ0LDYuMjUgNy4yNSw2LjU4NTc4NjQ0IDcuMjUsNyBMNy4yNSwxMiBDNy4yNSwxMi40MTQyMTM2IDcuNTg1Nzg2NDQsMTIuNzUgOCwxMi43NSBDOC40MTQyMTM1NiwxMi43NSA4Ljc1LDEyLjQxNDIxMzYgOC43NSwxMiBaIE0xMS4yNSwxMiBMMTEuMjUsNyBDMTEuMjUsNi41ODU3ODY0NCAxMC45MTQyMTM2LDYuMjUgMTAuNSw2LjI1IEMxMC4wODU3ODY0LDYuMjUgOS43NSw2LjU4NTc4NjQ0IDkuNzUsNyBMOS43NSwxMiBDOS43NSwxMi40MTQyMTM2IDEwLjA4NTc4NjQsMTIuNzUgMTAuNSwxMi43NSBDMTAuOTE0MjEzNiwxMi43NSAxMS4yNSwxMi40MTQyMTM2IDExLjI1LDEyIFogTTYuMjUsMTIgTDYuMjUsNyBDNi4yNSw2LjU4NTc4NjQ0IDUuOTE0MjEzNTYsNi4yNSA1LjUsNi4yNSBDNS4wODU3ODY0NCw2LjI1IDQuNzUsNi41ODU3ODY0NCA0Ljc1LDcgTDQuNzUsMTIgQzQuNzUsMTIuNDE0MjEzNiA1LjA4NTc4NjQ0LDEyLjc1IDUuNSwxMi43NSBDNS45MTQyMTM1NiwxMi43NSA2LjI1LDEyLjQxNDIxMzYgNi4yNSwxMiBaIE0xLjUsNCBMMTQuNSw0IEwxLjUsNCBaIE0xLjUsMyBMMTQuNSwzIEMxNS4wNTIyODQ3LDMgMTUuNSwzLjQ0NzcxNTI1IDE1LjUsNCBDMTUuNSw0LjU1MjI4NDc1IDE1LjA1MjI4NDcsNSAxNC41LDUgTDEuNSw1IEMwLjk0NzcxNTI1LDUgMC41LDQuNTUyMjg0NzUgMC41LDQgQzAuNSwzLjQ0NzcxNTI1IDAuOTQ3NzE1MjUsMyAxLjUsMyBaIE05LjI1LDMuMjUgTDkuMjUsMiBDOS4yNSwxLjg2MTkyODgxIDkuMTM4MDcxMTksMS43NSA5LDEuNzUgTDcsMS43NSBDNi44NjE5Mjg4MSwxLjc1IDYuNzUsMS44NjE5Mjg4MSA2Ljc1LDIgTDYuNzUsMy4yNSBMOS4yNSwzLjI1IFogTTcsMC4yNSBMOSwwLjI1IEM5Ljk2NjQ5ODMxLDAuMjUgMTAuNzUsMS4wMzM1MDE2OSAxMC43NSwyIEwxMC43NSw0Ljc1IEw1LjI1LDQuNzUgTDUuMjUsMiBDNS4yNSwxLjAzMzUwMTY5IDYuMDMzNTAxNjksMC4yNSA3LDAuMjUgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=" alt="${i.DeleteButton}" title="${i.DeleteButton}" />
                        </button>
                    </div>
                </div>
            `}}customElements.define("pixel-gallery-sidebar",N)}(Scratch);