!function(M){var N=M.gui.Component,M=M.defineMessages;const I=M({PenButton:{id:"tilemap.penButton",default:"Pen"},EraserButton:{id:"tilemap.eraserButton",default:"Eraser"},Map:{id:"tilemap.mapLabel",default:"Map"},Name:{id:"tilemap.nameInput",default:"name"},Size:{id:"tilemap.sizeInput",default:"Size"},TileSize:{id:"tilemap.tileSizeInput",default:"Tile size"},Width:{id:"tilemap.widthInput",default:"width"},Height:{id:"tilemap.heightInput",default:"height"},NewButton:{id:"tilemap.newButton",default:"New Map"},ResizeButton:{id:"tilemap.resizeButton",default:"Resize"},ImportButton:{id:"tilemap.importButton",default:"Import Map"},DownloadButton:{id:"tilemap.downloadButton",default:"Download Map"},DeleteButton:{id:"tilemap.deleteButton",default:"Delete Map"}}),j={PEN:"pen",ERASER:"eraser"};N.initialState={tilemapId:"",tilemapName:""};class D extends N{static get observedState(){return["tool","tilemapName","width","height","size","tilemapData"]}stateChangedCallback(M,N,I){"width"===M?this.widthInput.value=I:"height"===M?this.heightInput.value=I:"size"===M&&(this.sizeInput.value=I)}unactiveTool(){this.querySelectorAll(".tile-map-tool-button.actived").forEach(M=>{M.classList.remove("actived"),M.style.borderColor=null,M.style.boxShadow=null})}handleToolClick(M){M.preventDefault(),this.unactiveTool();let N=M.target;(N="button"!==N.tagName.toLowerCase()?N.parentElement:N).classList.add("actived"),this.setState("tool",N.dataset.tool),N.dataset.tool,j}setTile(M){}unactiveTile(){this.querySelectorAll(".tile-map-palette-color.actived").forEach(M=>{M.classList.remove("actived"),M.style.borderColor=null,M.style.boxShadow=null})}activedTile(M){var M=this.palette.indexOf(M);-1!==M&&(M=this.querySelector(`.tile-map-palette-color[data-index="${M}"]`))&&M.classList.add("actived")}handleNewMap(M){M.preventDefault(),this.emit("NewMap",{width:parseInt(this.widthInput.value),height:parseInt(this.heightInput.value)})}handleResizeTileMap(M){M.preventDefault(),this.emit("ResizeMap",{width:parseInt(this.widthInput.value),height:parseInt(this.heightInput.value)})}handleDownloadTileMap(M){M.preventDefault(),this.emit("DownloadMap")}handleImportTileMap(M){M.preventDefault(),this.emit("ImportMap")}handleDeleteTileMap(M){M.preventDefault(),this.emit("DeleteMap")}handleNameChange(M){M.preventDefault(),this.setState("tilemapName",M.target.value)}render(){var M=this.state.tilemapData?"":"disabled",N=M=>M===this.state.tool?"actived":"";return`
                <div class="tile-map-toolbar-wrapper">
                    <div class="tile-map-tools-wrapper">
                        <button
                            class="tile-map-tool-button ${N(j.PEN)}"
                            data-tool="${j.PEN}"
                            onclick="this.handleToolClick"
                        >
                            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmlld0JveD0iMCAwIDIwIDIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0My4yICgzOTA2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+YnJ1c2g8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgICAgIDxnIGlkPSJicnVzaCIgc3Ryb2tlPSIjNTc1RTc1IiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0iIzU3NUU3NSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMi41Nzg3MjI1LDExLjIxMDIwMjYgQzExLjYxOTYyODQsMTIuMTY5Mjk2NyAxMC45MTI5Mjc0LDEyLjY2MTQ2MzQgMTAuMzU3NjYyNCwxMi44NTA3NTgzIEMxMC4xOTM2MDY5LDEyLjM0NTk3MTkgOS45MTU5NzQzNywxMS44NzkwNDQ1IDkuNTI0NzY0OTQsMTEuNDg3ODM1MSBDOS4xMjA5MzU4NSwxMS4wOTY2MjU3IDguNjU0MDA4NDYsMTAuODE4OTkzMiA4LjE0OTIyMjA5LDEwLjY0MjMxNzkgQzguMzUxMTM2NjQsMTAuMDg3MDUyOSA4Ljg0MzMwMzM1LDkuMzgwMzUyMDMgOS43ODk3Nzc3OCw4LjQzMzg3NzU5IEMxMi4wNjEzMTY0LDYuMTQ5NzE5MjkgMTYuMDk5NjA3NCwzLjM2MDc3NDYxIDE2Ljg2OTQwNjYsNC4xMzA1NzM4MiBDMTcuNjM5MjA1OCw0LjkwMDM3MzAzIDE0Ljg1MDI2MTEsOC45Mzg2NjM5NiAxMi41Nzg3MjI1LDExLjIxMDIwMjYgWiBNOC4zOTEyNDMzNCwxNS40MTIwMTA0IEM4LjAxNTY5MTk3LDE1Ljc3NDg2NTcgNy41MzExMDk1NSwxNS45NjIxNDU5IDcuMDQ2NTI3MTMsMTUuOTg1NTU1OSBMNy4wNDY1MjcxMywxNS45OTcyNjA5IEw2LjkyNTM4MTUzLDE1Ljk5NzI2MDkgQzMuNjc4Njc5MzQsMTYuMTE0MzExIDIuMjYxMjc1NzcsMTIuNDM4OTM3OSAzLjM3NTgxNTMzLDEyLjgyNTIwMzIgQzQuODQxNjc3MTQsMTMuMzI4NTE4NiA1LjQzNjUwMjA1LDEyLjYwMjgwOCA1LjQ1OTUxOTcyLDEyLjU3OTM5OCBDNi4yNzExOTUyNywxMS44MDY4NjczIDcuNTc5NTY3NzksMTEuODA2ODY3MyA4LjM5MTI0MzM0LDEyLjU3OTM5OCBDOS4yMDI5MTg4OSwxMy4zNjM2MzM3IDkuMjAyOTE4ODksMTQuNjM5NDc5OCA4LjM5MTI0MzM0LDE1LjQxMjAxMDQgWiIgaWQ9ImJ1cnNoLWljb24iPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" alt="${I.PenButton}" title="${I.PenButton}" />
                        </button>
                        <button
                            class="tile-map-tool-button ${N(j.ERASER)}"
                            data-tool="${j.ERASER}"
                            onclick="this.handleToolClick"
                        >
                            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmlld0JveD0iMCAwIDIwIDIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0My4yICgzOTA2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+ZXJhc2VyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImVyYXNlciIgZmlsbD0iIzU3NUU3NSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMy41MzcwMDYxLDE0LjgyOTE1OTcgTDEwLjk2NjA1NDUsMTQuODI5MTU5NyBMOC4zMDE2MTM4LDEyLjE2NDcxOSBMMTEuMTY4NjE0NCw5LjI5NzcxODQyIEwxNS4xMjYzMjE2LDEzLjI1NTQyNTcgTDEzLjUzNzAwNjEsMTQuODI5MTU5NyBaIE0xNi43Nzc5NjMzLDEyLjY5NDQ5MDggTDExLjE2ODYxNDQsNy4xMDA3MjM0MyBMOC4zMDE2MTM4LDQuMjMzNzIyODcgQzguMDA1NTY0ODMsMy45MjIwOTIzOCA3LjUwNjk1NjA0LDMuOTIyMDkyMzggNy4xOTUzMjU1NCw0LjIzMzcyMjg3IEwzLjIyMjAzNjczLDguMjA3MDExNjkgQzIuOTI1OTg3NzYsOC41MDMwNjA2NiAyLjkyNTk4Nzc2LDkuMDAxNjY5NDUgMy4yMjIwMzY3Myw5LjI5NzcxODQyIEw2LjEwNDYxODgxLDEyLjE2NDcxOSBMMTAuMDkzNDg5MSwxNi4xNTM1ODkzIEMxMC4yMzM3MjI5LDE2LjMwOTQwNDYgMTAuNDM2MjgyNywxNi4zODczMTIyIDEwLjYzODg0MjUsMTYuMzg3MzEyMiBMMTMuODY0MjE4MSwxNi4zODczMTIyIEMxNC4wNjY3NzgsMTYuMzg3MzEyMiAxNC4yNjkzMzc4LDE2LjMwOTQwNDYgMTQuNDA5NTcxNSwxNi4xNTM1ODkzIEwxNi43Nzc5NjMzLDEzLjgwMDc3OTEgQzE3LjA3NDAxMjIsMTMuNTA0NzMwMSAxNy4wNzQwMTIyLDEzLjAwNjEyMTMgMTYuNzc3OTYzMywxMi42OTQ0OTA4IEwxNi43Nzc5NjMzLDEyLjY5NDQ5MDggWiIgaWQ9ImVyYXNlci1pY29uIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=" alt="${I.EraserButton}" title="${I.EraserButton}" />
                        </button>
                    </div>
                    <div class="tile-map-info-wrapper">
                        <hr class="tile-map-info-divider"></hr>
                        <div class="tile-map-info-item group">
                            <span class="tile-map-info-item-name">${I.Map}</span>
                            <input
                                type="text"
                                id="name-input"
                                class="tile-map-info-input"
                                placeholder="${I.Name}"
                                disabled="${M}"
                                value="${this.state.galleryName||""}"
                                onchange="this.handleNameChange"
                            >
                        </div>
                        <div class="tile-map-info-item group">
                            <span class="tile-map-info-item-name">${I.Size}</span>
                            <input
                                type="text"
                                id="width-input"
                                class="tile-map-info-input half"
                                placeholder="${I.Width}"
                                value="${this.state.width||16}"
                            >
                            <span style="margin:0 0.3rem">×</span>
                            <input
                                type="text"
                                id="height-input"
                                class="tile-map-info-input half"
                                placeholder="${I.Height}"
                                value="${this.state.height||16}"
                            >
                        </div>
                        <div class="tile-map-info-item group">
                            <span class="tile-map-info-item-name">${I.TileSize}</span>
                            <input
                                type="text"
                                id="size-input"
                                class="tile-map-info-input half"
                                placeholder="${I.Width}"
                                value="${this.state.size||16}"
                            >
                        </div>
                        <div class="tile-map-info-item group">
                        <button
                            class="tile-map-info-button ok-button"
                            onclick="this.handleNewMap"
                        >${I.NewButton}</button>
                        <button
                            class="tile-map-info-button ${M}"
                            onclick="this.handleResizeMap"
                            disabled="${!this.state.imageData}"
                        >${I.ResizeButton}</button>
                        <button
                            class="tile-map-icon-button ${M}"
                            onclick="this.handleImportMap"
                            disabled="${!this.state.imageData}"
                        >
                            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgaGVpZ2h0PSIyMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHdpZHRoPSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxwYXRoIGQ9Ik03LjMzMzMzIDZDNy4zMzMzMyA2LjczNjM4IDcuOTMwMjkgNy4zMzMzMyA4LjY2NjY3IDcuMzMzMzNDOS40MDMwNSA3LjMzMzMzIDEwIDYuNzM2MzggMTAgNkMxMCA1LjI2MzYyIDkuNDAzMDUgNC42NjY2NyA4LjY2NjY3IDQuNjY2NjdDNy45MzAyOSA0LjY2NjY3IDcuMzMzMzMgNS4yNjM2MiA3LjMzMzMzIDZaIiBmaWxsPSIjNTc1ZTc1Ii8+CjxwYXRoIGQ9Ik0xOC42NjY3IDEzLjA2NjdMMTUuOTU1NiAxMC42NjY3QzE1LjY0NDQgMTAuMzU1NiAxNS4xNTU2IDEwLjM1NTYgMTQuOCAxMC42NjY3TDExLjk1NTYgMTMuMDIyMkMxMS43Nzc4IDEzLjIgMTEuNzMzMyAxMy40NjY3IDExLjkxMTEgMTMuNjQ0NEwxMi40ODg5IDE0LjMxMTFDMTIuNjY2NyAxNC40ODg5IDEyLjkzMzMgMTQuNTMzMyAxMy4xMTExIDE0LjM1NTZMMTQuNDg4OSAxMy4yTDE0LjQ4ODkgMTcuNTU1NkMxNC40ODg5IDE3LjgyMjIgMTQuNjY2NyAxOCAxNC45MzMzIDE4TDE1LjgyMjIgMThDMTYuMDg4OSAxOCAxNi4yNjY3IDE3LjgyMjIgMTYuMjY2NyAxNy41NTU2TDE2LjI2NjcgMTMuMjg4OUwxNy40NjY3IDE0LjM1NTZDMTcuNjQ0NCAxNC41MzMzIDE3LjkxMTEgMTQuNDg4OSAxOC4wODg5IDE0LjMxMTFMMTguNjY2NyAxMy42NDQ0QzE4Ljg4ODkgMTMuNTExMSAxOC44NDQ0IDEzLjI0NDQgMTguNjY2NyAxMy4wNjY3WiIgZmlsbD0iIzU3NWU3NSIvPgo8cGF0aCBkPSJNMTYuMjIyMiAyTDMuNzc3NzggMkMyLjggMiAyIDIuOCAyIDMuNzc3NzhMMiAxNi4yMjIyQzIgMTcuMiAyLjggMTggMy43Nzc3OCAxOEwxMC40NDQ0IDE4QzEwLjcxMTEgMTggMTAuODg4OSAxNy44MjIyIDEwLjg4ODkgMTcuNTU1NkwxMC44ODg5IDE2LjY2NjdDMTAuODg4OSAxNi40IDEwLjcxMTEgMTYuMjIyMiAxMC40NDQ0IDE2LjIyMjJMNC42NjY2NyAxNi4yMjIyQzQuMTc3NzggMTYuMjIyMiAzLjc3Nzc4IDE1LjgyMjIgMy43Nzc3OCAxNS4zMzMzTDMuNzc3NzggMTEuMzc3OEw3LjE1NTU2IDkuMjQ0NDRMMTAuMzExMSAxMS41NTU2QzEwLjYyMjIgMTEuNzc3OCAxMS4wMjIyIDExLjc3NzggMTEuMzMzMyAxMS41NTU2TDE2LjIyMjIgOC4wODg4OUwxNi4yMjIyIDkuNTU1NTZDMTYuMjIyMiA5LjgyMjIyIDE2LjQgMTAgMTYuNjY2NyAxMEwxNy41NTU2IDEwQzE3LjgyMjIgMTAgMTggOS44MjIyMiAxOCA5LjU1NTU2TDE4IDMuNzc3NzhDMTggMi44IDE3LjIgMiAxNi4yMjIyIDJaTTEwLjg4ODkgOS43MzMzM0w3LjczMzMzIDcuNDY2NjdDNy40MjIyMiA3LjI0NDQ0IDcuMDY2NjcgNy4yNDQ0NCA2Ljc1NTU2IDcuNDIyMjJMMy43Nzc3OCA5LjI4ODg5TDMuNzc3NzggNC42NjY2N0MzLjc3Nzc4IDQuMTc3NzggNC4xNzc3OCAzLjc3Nzc4IDQuNjY2NjcgMy43Nzc3OEwxNS4zMzMzIDMuNzc3NzhDMTUuODIyMiAzLjc3Nzc4IDE2LjIyMjIgNC4xNzc3OCAxNi4yMjIyIDQuNjY2NjdMMTYuMjIyMiA1Ljg2NjY3QzE2LjIyMjIgNS44NjY2NyAxMC44ODg5IDkuNzMzMzMgMTAuODg4OSA5LjczMzMzWiIgZmlsbD0iIzU3NWU3NSIvPgo8L3N2Zz4K" alt="${I.ImportButton}" title="${I.ImportButton}" />
                        </button>
                        <button
                            class="tile-map-icon-button ${M}"
                            onclick="this.handleDownloadMap"
                            disabled="${!this.state.imageData}"
                        >
                            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgaGVpZ2h0PSIyMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHdpZHRoPSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxwYXRoIGQ9Ik03LjMzMzMzIDZDNy4zMzMzMyA2LjczNjM4IDcuOTMwMjkgNy4zMzMzMyA4LjY2NjY3IDcuMzMzMzNDOS40MDMwNSA3LjMzMzMzIDEwIDYuNzM2MzggMTAgNkMxMCA1LjI2MzYyIDkuNDAzMDUgNC42NjY2NyA4LjY2NjY3IDQuNjY2NjdDNy45MzAyOSA0LjY2NjY3IDcuMzMzMzMgNS4yNjM2MiA3LjMzMzMzIDZaIiBmaWxsPSIjNTc1ZTc1Ii8+CjxwYXRoIGQ9Ik0xOC42NjY3IDYuOTMzMzNMMTUuOTU1NiA5LjMzMzMzQzE1LjY0NDQgOS42NDQ0NCAxNS4xNTU2IDkuNjQ0NDQgMTQuOCA5LjMzMzMzTDExLjk1NTYgNi45Nzc3OEMxMS43Nzc4IDYuOCAxMS43MzMzIDYuNTMzMzMgMTEuOTExMSA2LjM1NTU2TDEyLjQ4ODkgNS42ODg4OUMxMi42NjY3IDUuNTExMTEgMTIuOTMzMyA1LjQ2NjY3IDEzLjExMTEgNS42NDQ0NEwxNC40ODg5IDYuOEwxNC40ODg5IDIuNDQ0NDRDMTQuNDg4OSAyLjE3Nzc4IDE0LjY2NjcgMiAxNC45MzMzIDJMMTUuODIyMiAyQzE2LjA4ODkgMiAxNi4yNjY3IDIuMTc3NzggMTYuMjY2NyAyLjQ0NDQ0TDE2LjI2NjcgNi43MTExMUwxNy40NjY3IDUuNjQ0NDRDMTcuNjQ0NCA1LjQ2NjY3IDE3LjkxMTEgNS41MTExMSAxOC4wODg5IDUuNjg4ODlMMTguNjY2NyA2LjM1NTU2QzE4Ljg4ODkgNi40ODg4OSAxOC44NDQ0IDYuNzU1NTYgMTguNjY2NyA2LjkzMzMzWiIgZmlsbD0iIzU3NWU3NSIvPgo8cGF0aCBkPSJNMTYuMjIyMiAxOEwzLjc3Nzc4IDE4QzIuOCAxOCAyIDE3LjIgMiAxNi4yMjIyTDIgMy43Nzc3OEMyIDIuOCAyLjggMiAzLjc3Nzc4IDJMMTAuNDQ0NCAyQzEwLjcxMTEgMiAxMC44ODg5IDIuMTc3NzggMTAuODg4OSAyLjQ0NDQ0TDEwLjg4ODkgMy4zMzMzM0MxMC44ODg5IDMuNiAxMC43MTExIDMuNzc3NzggMTAuNDQ0NCAzLjc3Nzc4TDQuNjY2NjcgMy43Nzc3OEM0LjE3Nzc4IDMuNzc3NzggMy43Nzc3OCA0LjE3Nzc4IDMuNzc3NzggNC42NjY2N0wzLjc3Nzc4IDguNjIyMjJMNy4xNTU1NiAxMC43NTU2TDEwLjMxMTEgOC40NDQ0NEMxMC42MjIyIDguMjIyMjIgMTEuMDIyMiA4LjIyMjIyIDExLjMzMzMgOC40NDQ0NEwxNi4yMjIyIDExLjkxMTFMMTYuMjIyMiAxMC40NDQ0QzE2LjIyMjIgMTAuMTc3OCAxNi40IDEwIDE2LjY2NjcgMTBMMTcuNTU1NiAxMEMxNy44MjIyIDEwIDE4IDEwLjE3NzggMTggMTAuNDQ0NEwxOCAxNi4yMjIyQzE4IDE3LjIgMTcuMiAxOCAxNi4yMjIyIDE4Wk0xMC44ODg5IDEwLjI2NjdMNy43MzMzMyAxMi41MzMzQzcuNDIyMjIgMTIuNzU1NiA3LjA2NjY3IDEyLjc1NTYgNi43NTU1NiAxMi41Nzc4TDMuNzc3NzggMTAuNzExMUwzLjc3Nzc4IDE1LjMzMzNDMy43Nzc3OCAxNS44MjIyIDQuMTc3NzggMTYuMjIyMiA0LjY2NjY3IDE2LjIyMjJMMTUuMzMzMyAxNi4yMjIyQzE1LjgyMjIgMTYuMjIyMiAxNi4yMjIyIDE1LjgyMjIgMTYuMjIyMiAxNS4zMzMzTDE2LjIyMjIgMTQuMTMzM0MxNi4yMjIyIDE0LjEzMzMgMTAuODg4OSAxMC4yNjY3IDEwLjg4ODkgMTAuMjY2N1oiIGZpbGw9IiM1NzVlNzUiLz4KPC9zdmc+Cg==" alt="${I.DownloadButton}" title="${I.DownloadButton}" />
                        </button>
                        <button
                            class="tile-map-icon-button ${M}"
                            onclick="this.handleDeleteMap"
                            disabled="${!this.state.imageData}"
                        >
                            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUwLjIgKDU1MDQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5kZWxldGU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iZGVsZXRlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRGVsZXRlLUljb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAxLjUwMDAwMCkiIGZpbGw9IiM1NzVFNzUiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLDMuMjUgTDE0LDMuMjUgQzE0LjQ0MzcxNjQsMy4yNSAxNC43OTA0MjkzLDMuNjMzMTEzNDMgMTQuNzQ2Mjc3OSw0LjA3NDYyNzc5IEwxMy42MzYzMjc1LDE1LjE3NDEzMTUgQzEzLjU0Njg2NzIsMTYuMDY4NzM0NyAxMi43OTQwNzc1LDE2Ljc1IDExLjg5NTAxMjQsMTYuNzUgTDQuMTA0OTg3NTYsMTYuNzUgQzMuMjA1OTIyNTMsMTYuNzUgMi40NTMxMzI3OSwxNi4wNjg3MzQ3IDIuMzYzNjcyNDgsMTUuMTc0MTMxNSBMMS4yNTM3MjIxMSw0LjA3NDYyNzc5IEMxLjIwOTU3MDY3LDMuNjMzMTEzNDMgMS41NTYyODM1NiwzLjI1IDIsMy4yNSBaIE04Ljc1LDEyIEw4Ljc1LDcgQzguNzUsNi41ODU3ODY0NCA4LjQxNDIxMzU2LDYuMjUgOCw2LjI1IEM3LjU4NTc4NjQ0LDYuMjUgNy4yNSw2LjU4NTc4NjQ0IDcuMjUsNyBMNy4yNSwxMiBDNy4yNSwxMi40MTQyMTM2IDcuNTg1Nzg2NDQsMTIuNzUgOCwxMi43NSBDOC40MTQyMTM1NiwxMi43NSA4Ljc1LDEyLjQxNDIxMzYgOC43NSwxMiBaIE0xMS4yNSwxMiBMMTEuMjUsNyBDMTEuMjUsNi41ODU3ODY0NCAxMC45MTQyMTM2LDYuMjUgMTAuNSw2LjI1IEMxMC4wODU3ODY0LDYuMjUgOS43NSw2LjU4NTc4NjQ0IDkuNzUsNyBMOS43NSwxMiBDOS43NSwxMi40MTQyMTM2IDEwLjA4NTc4NjQsMTIuNzUgMTAuNSwxMi43NSBDMTAuOTE0MjEzNiwxMi43NSAxMS4yNSwxMi40MTQyMTM2IDExLjI1LDEyIFogTTYuMjUsMTIgTDYuMjUsNyBDNi4yNSw2LjU4NTc4NjQ0IDUuOTE0MjEzNTYsNi4yNSA1LjUsNi4yNSBDNS4wODU3ODY0NCw2LjI1IDQuNzUsNi41ODU3ODY0NCA0Ljc1LDcgTDQuNzUsMTIgQzQuNzUsMTIuNDE0MjEzNiA1LjA4NTc4NjQ0LDEyLjc1IDUuNSwxMi43NSBDNS45MTQyMTM1NiwxMi43NSA2LjI1LDEyLjQxNDIxMzYgNi4yNSwxMiBaIE0xLjUsNCBMMTQuNSw0IEwxLjUsNCBaIE0xLjUsMyBMMTQuNSwzIEMxNS4wNTIyODQ3LDMgMTUuNSwzLjQ0NzcxNTI1IDE1LjUsNCBDMTUuNSw0LjU1MjI4NDc1IDE1LjA1MjI4NDcsNSAxNC41LDUgTDEuNSw1IEMwLjk0NzcxNTI1LDUgMC41LDQuNTUyMjg0NzUgMC41LDQgQzAuNSwzLjQ0NzcxNTI1IDAuOTQ3NzE1MjUsMyAxLjUsMyBaIE05LjI1LDMuMjUgTDkuMjUsMiBDOS4yNSwxLjg2MTkyODgxIDkuMTM4MDcxMTksMS43NSA5LDEuNzUgTDcsMS43NSBDNi44NjE5Mjg4MSwxLjc1IDYuNzUsMS44NjE5Mjg4MSA2Ljc1LDIgTDYuNzUsMy4yNSBMOS4yNSwzLjI1IFogTTcsMC4yNSBMOSwwLjI1IEM5Ljk2NjQ5ODMxLDAuMjUgMTAuNzUsMS4wMzM1MDE2OSAxMC43NSwyIEwxMC43NSw0Ljc1IEw1LjI1LDQuNzUgTDUuMjUsMiBDNS4yNSwxLjAzMzUwMTY5IDYuMDMzNTAxNjksMC4yNSA3LDAuMjUgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=" alt="${I.DeleteButton}" title="${I.DeleteButton}" />
                        </button>
                        </div>
                    </div>
                </div>
            `}}customElements.define("tile-map-toolbar",D)}(Scratch);