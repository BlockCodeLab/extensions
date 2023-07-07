(async function(e,a){a("./style.css"),await a("./tilemap-editor.js"),await a("./tilemap-selector.js"),await a("./tilemap-sidebar.js"),await a("./tilemap-toolbar.js");a=e.gui.Component;class t extends a{static get observedState(){return[]}connectedCallback(){super.connectedCallback()}stateChangedCallback(e,a,t){}handleResizeMap(e){e.preventDefault();var{width:e,height:a}=e.detail;this.tilemapEditor.resizeMap(e,a)}handleNewMap(e){e.preventDefault();var{width:a,height:t}=e.detail;a&&t?(this.tilemapSelector.newMap(),this.tilemapEditor.newMap(a,t)):this.tilemapToolbar.handleNewMap(e)}handleImportMap(e){e.preventDefault(),this.tilemapEditor.importMap()}handleDownloadMap(e){e.preventDefault(),this.tilemapEditor.downloadMap()}handleDeleteMap(e){e.preventDefault(),this.emit("delete",{id:this.state.galleryId,name:this.state.galleryName}),this.tilemapSelector.deleteMap()}render(){return`
                <div class="tile-map-wrapper">
                    <tile-map-editor id="tile-map-editor"></tile-map-editor>
                    <tile-map-selector
                        id="tilemap-selector"
                        onNewMap="this.handleNewMap"
                    ></tile-map-selector>
                    <tile-map-toolbar
                        id="tilemap-toolbar"
                        onResizeMap="this.handleResizeMap"
                        onNewMap="this.handleNewMap"
                        onImportMap="this.handleImportMap"
                        onDownloadMap="this.handleDownloadMap"
                        onDeleteMap="this.handleDeleteMap"
                    ></tile-map-toolbar>
                    <tile-map-sidebar></tile-map-sidebar>
                </div>
            `}}customElements.define("tile-map",t)})(Scratch,require);