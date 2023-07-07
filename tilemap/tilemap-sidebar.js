(async function(M){var j=M.gui.Component,M=M.defineMessages;const z=M({Name:{id:"tilemap.nameInput",default:"Name"},ChangeButton:{id:"tilemap.changeButton",default:"Send to back"},BackgroundButton:{id:"tilemap.backgroundButton",default:"Background"},ForegroundButton:{id:"tilemap.foregroundButton",default:"Foreground"},WallButton:{id:"tilemap.wallButton",default:"Wall tile"},FloorButton:{id:"tilemap.floorButton",default:"Floor tile"}});class i extends j{static get observedState(){return[]}constructor(){super(),this.state={menuVisible:!1}}stateChangedCallback(M,j,z){j!==z&&"menuVisible"===M&&(this.dropdownMenu.style.display=z?"block":"none")}handleMenuClick(M){M.preventDefault(),M.stopPropagation(),this.dropdownMenu.click();const j=()=>{document.removeEventListener("click",j),this.setState("menuVisible",!1)};document.addEventListener("click",j),this.setState("menuVisible",!this.state.menuVisible)}handleMenuItemClick(M){M.preventDefault(),this.querySelectorAll(".tile-map-dropdown-content-item.actived").forEach(M=>{M.classList.remove("actived")});let j=M.target;(j="tile-map-dropdown-content-item"!==j.className?j.parentElement:j).classList.add("actived"),this.setState("tilemapId",j.dataset.id)}render(){return`
                <div class="tile-map-sidebar-wrapper">
                    <button
                        id="menu-button"
                        class="tile-map-sidebar-item tile-map-sidebar-dropdown-button"
                        onclick="this.handleMenuClick"
                    >
                        dropdown
                    </button>
                    <hr class="tile-map-sidebar-divider"></hr>
                    <div class="tile-map-sidebar-item">
                        <div class="tile-map-sidebar-tile-view"></div>
                        <div class="tile-map-sidebar-tile-view thumb"></div>
                        <button class="tile-map-icon-button tile-map-sidebar-tile-button">
                            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg4MDMxMTE2MjQ4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEzNDYgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQwODQ1IiB3aWR0aD0iMjEuMDMxMjUiIGhlaWdodD0iMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNNjI3LjU2MSA2MzAuODFjLTY5Ljc4IDE3LjUwMS0xOTMuODQ3IDAuNTM5LTMwMS4wMDUtNjIuMDY1LTEwNy4xNjQtNjIuNTk5LTE3OS40ODEtMTQyLjMwNS0xNzkuNDgxLTE0Mi4zMDVzNzUuNjUzIDE3Ljk2NCAxMDMuNzU2IDIyLjY3OWMyOC4xMDMgNC43MTUgMTM4LjUyMSAxNi41NzIgMjUwLjQ0Ni0yNC40ODcgMTExLjkyNS00MS4wNTkgMjMzLjQ2Mi0xNzUuMjI3IDIzMy40NjItMTc1LjIyN2wtMTQ3LjU0Ni0xNDcuNTQ2IDYwMy4xNTYtMTAxLjU5LTEwMS41OSA2MDMuMTU2LTE0OC45MDUtMTQ4LjkwNXMtOTEuMDQ5IDc4LjI0OS0xNDQuNTAyIDExMy4yODNjLTkwLjAyNiA1OS4wMTUtMTY3Ljc4NiA2My4wMTAtMTY3Ljc4NiA2My4wMTB6IiBwLWlkPSI0MDg0NiIgZmlsbD0iIzRjOTdmZiI+PC9wYXRoPjwvc3ZnPg==" alt="${z.ChangeButton}" title="${z.ChangeButton}" />
                        </button>
                    </div>
                    <div class="tile-map-sidebar-item group">
                        <div class="tile-map-icon-button-group">
                            <button class="tile-map-icon-button">
                                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg4MDMwODMxMTEzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0MDQ2IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNNTEyIDk0Ny43Njg4ODljLTUuMTIgMC0xMC4yNC0xLjEzNzc3OC0xNC43OTExMTEtMy45ODIyMjJsLTQzNy40NzU1NTYtMjYyLjI1Nzc3OGEyOC4xNiAyOC4xNiAwIDAgMS0xMy42NTMzMzMtMjQuNDYyMjIyYzAtMTAuMjQgNS4xMi0xOS4zNDIyMjIgMTMuNjUzMzMzLTI0LjQ2MjIyM0wxOTUuMTI4ODg5IDU1MS44MjIyMjJjMTMuNjUzMzMzLTcuOTY0NDQ0IDMxLjI4ODg4OS0zLjQxMzMzMyAzOS4yNTMzMzMgOS42NzExMTEgNy45NjQ0NDQgMTMuNjUzMzMzIDMuNDEzMzMzIDMwLjcyLTkuNjcxMTExIDM5LjI1MzMzNGwtOTQuNDM1NTU1IDU2LjMyTDUxMiA4ODYuMzI4ODg5bDM4Mi4yOTMzMzMtMjI5LjI2MjIyMi05NC40MzU1NTUtNTYuMzJhMjguMTAzMTExIDI4LjEwMzExMSAwIDAgMS05LjY3MTExMS0zOS4yNTMzMzRjNy45NjQ0NDQtMTMuNjUzMzMzIDI1LjYtMTcuNjM1NTU2IDM5LjI1MzMzMy05LjY3MTExMWwxMzUuMzk1NTU2IDgwLjc4MjIyMmM4LjUzMzMzMyA1LjEyIDEzLjY1MzMzMyAxNC4yMjIyMjIgMTMuNjUzMzMzIDI0LjQ2MjIyM3MtNS4xMiAxOS4zNDIyMjItMTMuNjUzMzMzIDI0LjQ2MjIyMmwtNDM3LjQ3NTU1NiAyNjIuMjU3Nzc4Yy01LjEyIDIuODQ0NDQ0LTEwLjI0IDMuOTgyMjIyLTE1LjM2IDMuOTgyMjIyeiIgZmlsbD0iIzRjOTdmZiIgcC1pZD0iMTQwNDciPjwvcGF0aD48cGF0aCBkPSJNOTYzLjEyODg4OSA0MDguNDYyMjIybC00MzkuMTgyMjIyIDI2My4zOTU1NTZhMjEuNjE3Nzc4IDIxLjYxNzc3OCAwIDAgMS0yMy4zMjQ0NDUgMEw2MC44NzExMTEgNDA4LjQ2MjIyMmEyMi45MjYyMjIgMjIuOTI2MjIyIDAgMCAxIDAtMzkuMjUzMzMzbDQzOS4xODIyMjItMjYxLjY4ODg4OWEyMS42MTc3NzggMjEuNjE3Nzc4IDAgMCAxIDIzLjMyNDQ0NSAwbDQzOS4xODIyMjIgMjYxLjY4ODg4OWMxNS4zNiA5LjEwMjIyMiAxNS4zNiAzMC4xNTExMTEgMC41Njg4ODkgMzkuMjUzMzMzeiIgZmlsbD0iIzRjOTdmZiIgcC1pZD0iMTQwNDgiPjwvcGF0aD48L3N2Zz4=" alt="${z.ForegroundButton}" title="${z.ForegroundButton}" />
                            </button><button class="tile-map-icon-button">
                            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg4MDMwODQ3NzEyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0NDU0IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNNTEyIDY0MC41Njg4ODljLTUuMTIgMC0xMC4yNC0xLjEzNzc3OC0xNC43OTExMTEtMy45ODIyMjJMNjcuNjk3Nzc4IDM3OC44OGEyOC4xNiAyOC4xNiAwIDAgMS0xMy42NTMzMzQtMjQuNDYyMjIyYzAtMTAuMjQgNS4xMi0xOS4zNDIyMjIgMTMuNjUzMzM0LTI0LjQ2MjIyMmw0MjkuNTExMTExLTI1NmM5LjEwMjIyMi01LjEyIDE5LjkxMTExMS01LjEyIDI5LjAxMzMzMyAwbDQyOS41MTExMTEgMjU2YzguNTMzMzMzIDUuMTIgMTMuNjUzMzMzIDE0LjIyMjIyMiAxMy42NTMzMzQgMjQuNDYyMjIycy01LjEyIDE5LjM0MjIyMi0xMy42NTMzMzQgMjQuNDYyMjIybC00MjkuNTExMTExIDI1Ny43MDY2NjdhMjQuNDYyMjIyIDI0LjQ2MjIyMiAwIDAgMS0xNC4yMjIyMjIgMy45ODIyMjJ6TTEzNy42NzExMTEgMzU0LjQxNzc3OEw1MTIgNTc5LjEyODg4OWwzNzQuMzI4ODg5LTIyNC43MTExMTFMNTEyIDEzMS40MTMzMzMgMTM3LjY3MTExMSAzNTQuNDE3Nzc4eiIgZmlsbD0iIzRjOTdmZiIgcC1pZD0iMTQ0NTUiPjwvcGF0aD48cGF0aCBkPSJNNzg5LjA0ODg4OSA1MzAuMjA0NDQ0bC0yNjUuMTAyMjIyIDE1NC4xNjg4ODljLTcuMzk1NTU2IDMuOTgyMjIyLTE2LjQ5Nzc3OCAzLjk4MjIyMi0yMy4zMjQ0NDUtMC41Njg4ODlMMjQ0LjYyMjIyMiA1MjUuMDg0NDQ0YTIyLjU4NDg4OSAyMi41ODQ4ODkgMCAwIDAtMjMuODkzMzMzIDBMNjAuODcxMTExIDYyMC4wODg4ODljLTE0Ljc5MTExMSA4LjUzMzMzMy0xNC43OTExMTEgMzAuMTUxMTExIDAgMzkuMjUzMzMzbDQzOS4xODIyMjIgMjYzLjM5NTU1NmM3LjM5NTU1NiA0LjU1MTExMSAxNS45Mjg4ODkgNC41NTExMTEgMjMuMzI0NDQ1IDBsNDM5LjE4MjIyMi0yNjMuMzk1NTU2YzE0Ljc5MTExMS05LjEwMjIyMiAxNC43OTExMTEtMzAuMTUxMTExIDAtMzkuMjUzMzMzbC0xNTAuNzU1NTU2LTg5Ljg4NDQ0NWEyMS44NDUzMzMgMjEuODQ1MzMzIDAgMCAwLTIyLjc1NTU1NSAweiIgZmlsbD0iIzRjOTdmZiIgcC1pZD0iMTQ0NTYiPjwvcGF0aD48L3N2Zz4=" alt="${z.BackgroundButton}" title="${z.BackgroundButton}" />
                        </button>
                        </div>
                        <div class="tile-map-icon-button-group">
                            <button class="tile-map-icon-button">
                                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg4MDMwODY4ODYyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1Nzk5IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNODcwLjQgMzU4LjRoMTAyLjR2MTM2LjUzMzMzM2gtMTAyLjR6TTE4Ny43MzMzMzMgMzU4LjRoMzA3LjJ2MTM2LjUzMzMzM2gtMzA3LjJ6TTUyOS4wNjY2NjcgMzU4LjRoMzA3LjJ2MTM2LjUzMzMzM2gtMzA3LjJ6TTY5OS43MzMzMzMgNTI5LjA2NjY2N2gyNzMuMDY2NjY3djEzNi41MzMzMzNoLTI3My4wNjY2Njd6TTUxLjIgNTI5LjA2NjY2N2gyNzMuMDY2NjY3djEzNi41MzMzMzNoLTI3My4wNjY2Njd6TTM1OC40IDE4Ny43MzMzMzNoMzA3LjJ2MTM2LjUzMzMzNGgtMzA3LjJ6TTM1OC40IDUyOS4wNjY2NjdoMzA3LjJ2MTM2LjUzMzMzM2gtMzA3LjJ6TTUyOS4wNjY2NjcgNjk5LjczMzMzM2gzMDcuMnYxMzYuNTMzMzM0aC0zMDcuMnpNMTUzLjYgNjk5LjczMzMzM2gtMTAyLjRWODE5LjJjMCAxMC4yNCA2LjgyNjY2NyAxNy4wNjY2NjcgMTcuMDY2NjY3IDE3LjA2NjY2N2g4NS4zMzMzMzN2LTEzNi41MzMzMzR6TTE4Ny43MzMzMzMgNjk5LjczMzMzM2gzMDcuMnYxMzYuNTMzMzM0aC0zMDcuMnpNODcwLjQgODM2LjI2NjY2N0g5NTUuNzMzMzMzYzEwLjI0IDAgMTcuMDY2NjY3LTYuODI2NjY3IDE3LjA2NjY2Ny0xNy4wNjY2Njd2LTExOS40NjY2NjdoLTEwMi40djEzNi41MzMzMzR6TTMyNC4yNjY2NjcgMzI0LjI2NjY2N3YtMTM2LjUzMzMzNEg2OC4yNjY2NjdjLTEwLjI0IDAtMTcuMDY2NjY3IDYuODI2NjY3LTE3LjA2NjY2NyAxNy4wNjY2Njd2MTE5LjQ2NjY2N2gyNzMuMDY2NjY3ek01MS4yIDM1OC40aDEwMi40djEzNi41MzMzMzNoLTEwMi40ek02OTkuNzMzMzMzIDMyNC4yNjY2NjdoMjczLjA2NjY2N1YyMDQuOGMwLTEwLjI0LTYuODI2NjY3LTE3LjA2NjY2Ny0xNy4wNjY2NjctMTcuMDY2NjY3aC0yNTZ2MTM2LjUzMzMzNHoiIGZpbGw9IiM0Yzk3ZmYiIHAtaWQ9IjE1ODAwIj48L3BhdGg+PC9zdmc+" alt="${z.WallButton}" title="${z.WallButton}" />
                            </button><button class="tile-map-icon-button">
                                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg4MDMwOTQwNTgzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxMjE3IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNOTA0LjIzNDY2NyA3MjIuMzg5MzMzYTIxLjMzMzMzMyAyMS4zMzMzMzMgMCAwIDEtMTIuMDc0NjY3IDE5LjJsLTM1OS4zMzg2NjcgMTczLjY1MzMzNGEyMS4zMzMzMzMgMjEuMzMzMzMzIDAgMCAxLTE5LjAyOTMzMy0wLjI1NmwtMzUyLjg1MzMzMy0xODEuMjQ4YTIxLjMzMzMzMyAyMS4zMzMzMzMgMCAwIDEtMTEuNjA1MzM0LTE4Ljk4NjY2N1YyOTkuODYxMzMzYTIxLjMzMzMzMyAyMS4zMzMzMzMgMCAwIDEgMTEuOTg5MzM0LTE5LjJsMzUyLjI5ODY2Ni0xNzEuNTJhMjEuNjc0NjY3IDIxLjY3NDY2NyAwIDAgMSAxNS4xNDY2NjctMS44MzQ2NjZjMS4yOCAwLjM0MTMzMyAyLjY0NTMzMyAwLjgxMDY2NyA0LjAxMDY2NyAxLjQ1MDY2NmwtMi42ODgtMS4wNjY2NjZhMjEuNTA0IDIxLjUwNCAwIDAgMSAxLjQ5MzMzMyAwLjU1NDY2NmwxLjE5NDY2NyAwLjUxMiAzNTkuMjk2IDE3MS44NjEzMzRhMjEuMzMzMzMzIDIxLjMzMzMzMyAwIDAgMSAxMi4xNiAxOS4yek01NDQuMTcwNjY3IDE2MS40OTMzMzNsLTIuNjg4IDEzNC4zMTQ2NjctMi41NiAxMjcuNzg2NjY3IDMyMi42MDI2NjYgMTUwLjc4NHYtMjYxLjEybC0zMTcuMzU0NjY2LTE1MS43NjUzMzR6IG0tNDIuNjY2NjY3IDAuOTM4NjY3TDE5MiAzMTMuMTczMzMzdjI1Ni40NjkzMzRsMzA0LjI1Ni0xNDguMTM4NjY3IDUuMjQ4LTI1OS4wNzJ6IiBmaWxsPSIjNGM5N2ZmIiBwLWlkPSIyMTIxOCI+PC9wYXRoPjxwYXRoIGQ9Ik01MTUuNDEzMzMzIDQ1OS42OTA2NjdsMzE3LjUyNTMzNCAxNDguNDM3MzMzLTMwOS4xNjI2NjcgMTQ3LjkyNTMzMy0zMDQuODUzMzMzLTE1Mi4wNjR6IiBmaWxsPSIjNGM5N2ZmIiBwLWlkPSIyMTIxOSI+PC9wYXRoPjxwYXRoIGQ9Ik0xOTIgNjM4LjI5MzMzM2wzMjIuMDQ4IDE2MC41OTczMzQgMy42NjkzMzMgMS40MDhhMjEuMzMzMzMzIDIxLjMzMzMzMyAwIDAgMCAxNS4xODkzMzQtMS4zNjUzMzRsMzI4LjYxODY2Ni0xNjAuNjR2NzAuNjk4NjY3bC0zMzcuNjY0IDE2My4xMTQ2NjdMMTkyIDcwMS43Mzg2NjdWNjM4LjI5MzMzM3oiIGZpbGw9IiM0Yzk3ZmYiIHAtaWQ9IjIxMjIwIj48L3BhdGg+PHBhdGggZD0iTTU0OC4wOTYgNzc5Ljc3NlY4OTZoLTQyLjY2NjY2N3YtMTE2LjIyNHoiIGZpbGw9IiM0Yzk3ZmYiIHAtaWQ9IjIxMjIxIj48L3BhdGg+PC9zdmc+" alt="${z.FloorButton}" title="${z.FloorButton}" />
                            </button>
                        </div>
                    </div>
                    <hr class="tile-map-sidebar-divider"></hr>
                    <div class="tile-map-sidebar-item tile-map-tiles-wrapper">
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                        <div class="tile-map-tile-item"></div>
                    </div>
                </div>
                <div
                    id="dropdown-menu"
                    class="tile-map-dropdown-wrapper tile-map-sidebar-dropdown"
                >
                    <div
                        id="menu-content"
                        class="tile-map-dropdown-content"
                    >
                        <div class="tile-map-dropdown-content-item">dddd</div>
                    </div>
                    <div class="tile-map-dropdown-arrow"></div>
                </div>
            `}}customElements.define("tile-map-sidebar",i)})(Scratch);