(async function (Scratch) {
    const defineMessages = Scratch.defineMessages;
    const Component = Scratch.gui.Component;

    // eslint-disable-next-line max-len
    const menuIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg2MzgwMDQzNjA3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5NTQ0IiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNMjM2Ljk4Mjg1NyAyOTIuNTcxNDI5bDE4NS41MjY4NTcgNzguNjY1MTQyYzU0LjEyNTcxNCAxOS40Mzc3MTQgMTI0LjgzNjU3MSAxOS40Mzc3MTQgMTc4Ljk4MDU3MiAwTDc4Ny4wMTcxNDMgMjkyLjU3MTQyOWwtMTg1LjUyNjg1Ny03OC42NjUxNDNjLTU0LjEyNTcxNC0xOS40Mzc3MTQtMTI0LjgzNjU3MS0xOS40Mzc3MTQtMTc4Ljk4MDU3MiAwTDIzNi45ODI4NTcgMjkyLjU3MTQyOXogbTE1OC43Mi0xNDYuNzQyODU4YzcxLjE0OTcxNC0yNi4xODUxNDMgMTYxLjQ0NDU3MS0yNi4xODUxNDMgMjMyLjU5NDI4NiAwbDI3Mi45MzI1NzEgMTE1LjczMDI4NmEzNi41NzE0MjkgMzYuNTcxNDI5IDAgMCAxIDAgNjIuMDI1MTQzTDYyOC4yOTcxNDMgNDM5LjMxNDI4NmMtNzEuMTQ5NzE0IDI2LjE4NTE0My0xNjEuNDQ0NTcxIDI2LjE4NTE0My0yMzIuNTk0Mjg2IDBMMTIyLjc3MDI4NiAzMjMuNTg0YTM2LjU3MTQyOSAzNi41NzE0MjkgMCAwIDEgMC02Mi4wMjUxNDNMMzk1LjcwMjg1NyAxNDUuODI4NTcxeiIgcC1pZD0iMTk1NDUiIGZpbGw9IiM1NzVFNzUiPjwvcGF0aD48cGF0aCBkPSJNNzQ4LjM3OTQyOSA0NTIuMDk2bDEyLjcwODU3MS03LjgwOGEzNi41NzE0MjkgMzYuNTcxNDI5IDAgMCAxIDM3LjE1NjU3MS0wLjY3NjU3MWwxMDcuMTU0Mjg2IDQyLjI5NDg1N2EzNi41NzE0MjkgMzYuNTcxNDI5IDAgMCAxIDAgNjIuMDI1MTQzbC0yNzIuOTUwODU3IDExNS43MzAyODVjLTcxLjE2OCAyNi4xODUxNDMtMTYxLjQ2Mjg1NyAyNi4xODUxNDMtMjMyLjU5NDI4NiAwTDEyNi45MDI4NTcgNTQ3LjkxMzE0M2EzNi41NzE0MjkgMzYuNTcxNDI5IDAgMCAxIDAtNjIuMDA2ODU3bDk1LjYzNDI4Ni00MS40OTAyODZhMzYuNTcxNDI5IDM2LjU3MTQyOSAwIDAgMSAzNy4xOTMxNDMtMC45MzI1NzFsMTUuNDUxNDI4IDguNTk0Mjg1YTI0LjIxMDI4NiAyNC4yMTAyODYgMCAwIDEgMS44Mjg1NzIgNDEuMTk3NzE1bC02MS43MTQyODYgMjMuNjQzNDI4IDIyMy4zMjM0MjkgODQuNzE3NzE0YzQ3LjQzMzE0MyAxMS4zNTU0MjkgMTA3LjYyOTcxNCAxMS4zNTU0MjkgMTU1LjA2Mjg1NyAwbDIyMy4zMDUxNDMtODQuNzE3NzE0LTY4Ljk5Mi0yNi4wMDIyODZhMjIuOTMwMjg2IDIyLjkzMDI4NiAwIDAgMSAwLjM2NTcxNC0zOC44MjA1NzF6IiBwLWlkPSIxOTU0NiIgZmlsbD0iIzU3NUU3NSI+PC9wYXRoPjxwYXRoIGQ9Ik03NDguMzc5NDI5IDY3MS41MjQ1NzFsMTIuNzA4NTcxLTcuODA4YTM2LjU3MTQyOSAzNi41NzE0MjkgMCAwIDEgMzcuMTU2NTcxLTAuNjc2NTcxbDEwNy4xNTQyODYgNDIuMjk0ODU3YTM2LjU3MTQyOSAzNi41NzE0MjkgMCAwIDEgMCA2Mi4wMjUxNDNsLTI3Mi45NTA4NTcgMTE1LjczMDI4NmMtNzEuMTY4IDI2LjE4NTE0My0xNjEuNDYyODU3IDI2LjE4NTE0My0yMzIuNTk0Mjg2IDBMMTI2LjkwMjg1NyA3NjcuMzQxNzE0YTM2LjU3MTQyOSAzNi41NzE0MjkgMCAwIDEgMC02Mi4wMDY4NTdsOTUuNjM0Mjg2LTQxLjQ5MDI4NmEzNi41NzE0MjkgMzYuNTcxNDI5IDAgMCAxIDM3LjE5MzE0My0wLjkzMjU3MWwxNS40NTE0MjggOC41OTQyODZhMjQuMjEwMjg2IDI0LjIxMDI4NiAwIDAgMSAxLjgyODU3MiA0MS4xOTc3MTRsLTYxLjcxNDI4NiAyMy42NDM0MjkgMjIzLjMyMzQyOSA4NC43MTc3MTRjNDcuNDMzMTQzIDExLjM1NTQyOSAxMDcuNjI5NzE0IDExLjM1NTQyOSAxNTUuMDYyODU3IDBsMjIzLjMwNTE0My04NC43MTc3MTQtNjguOTkyLTI2LjAwMjI4NmEyMi45MzAyODYgMjIuOTMwMjg2IDAgMCAxIDAuMzY1NzE0LTM4LjgyMDU3MnoiIHAtaWQ9IjE5NTQ3IiBmaWxsPSIjNTc1RTc1Ij48L3BhdGg+PC9zdmc+';

    const messages = defineMessages({
        MenuButton: {
            id: 'pixelGallery.menuButton',
            default: 'Menu',
        },
        UntitledName: {
            id: 'pixelGallery.untitledName',
            default: 'Untitled'
        },
    });

    Component.initialState = {
        galleryId: '',
        galleryName: '',
    };

    class PixelGallerySelector extends Component {
        static get observedState () {
            return ['width', 'height', 'galleryId', 'galleryName', 'imageData'];
        }

        constructor () {
            super();
            this.state = {
                menuVisible: false
            };
        }

        stateChangedCallback (name, oldValue, newValue) {
            if (oldValue === newValue) return;

            if (name === 'menuVisible') {
                this.dropdownMenu.style.display = newValue ? 'block' : 'none';
                return;
            }

            if (name === 'galleryId') {
                this.emit('ListImages', {
                    id: newValue,
                    resolve: images => {
                        this.updateGallery(images);
                    }
                });
                return;
            }

            if (name === 'galleryName') {
                const elem = this.querySelector('.pixel-gallery-list-image.actived');
                if (elem) {
                    elem.dataset.name = newValue;
                }
                return;
            }

            if (name === 'imageData') {
                const elem = this.querySelector('.pixel-gallery-list-image.actived');
                if (elem) {
                    elem.style.backgroundImage = `url(${newValue})`;
                }
                return;
            }
        }

        getUniqueName (serial) {
            serial = serial || (this.galleryList.childElementCount);
            const name = `${messages.UntitledName}${serial}`;
            const elem = this.querySelector(`.pixel-gallery-list-image[name="${name}"]`);
            if (elem) {
                return this.getUniqueName(serial + 1);
            }
            return name;
        }

        updateMenu (menu) {
            this.menuContent.innerHTML = '';

            menu.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.addEventListener('click', this.handleMenuItemClick.bind(this));
                menuItem.className = 'pixel-gallery-dropdown-content-item';
                // actived
                if (this.state.galleryId === item.value) {
                    menuItem.classList.add('actived');
                }
                menuItem.dataset.id = item.value;
                menuItem.innerHTML = `<div class="checkbox"></div>${item.text}`;
                this.menuContent.appendChild(menuItem);
            });

            // default actived
            if (!this.querySelector('.pixel-gallery-dropdown-content-item.actived')) {
                const menuItem = this.menuContent.firstElementChild;
                if (menuItem) {
                    menuItem.classList.add('actived');
                    this.setState({
                        galleryId:  menuItem.dataset.id,
                        galleryName: '',
                        imageData: null
                    });
                }
            }

            // style for 1 or 2 items
            if (menu.length < 3) {
                const wrapper = this.querySelector('.pixel-gallery-dropdown-wrapper');
                if (wrapper) {
                    wrapper.style.transform = `translate(60px, ${50 - menu.length * 9}px)`;
                }
                const arrow = this.querySelector('.pixel-gallery-dropdown-arrow');
                if (arrow) {
                    arrow.style.transform = `translate(-9px, ${menu.length * 9}px) rotate(-45deg)`;
                }
            }
        }

        updateGallery (images) {
            if (images) {
                const addButton = this.galleryList.lastElementChild;
                this.galleryList.innerHTML = '';
                Object.entries(images).forEach(([name, image]) => {
                    const imageItem = document.createElement('div');
                    imageItem.className = 'pixel-gallery-list-image';
                    // actived
                    if (this.state.galleryName === name) {
                        imageItem.classList.add('actived');
                    }
                    imageItem.dataset.name = name;
                    imageItem.style.backgroundImage = `url(${image.data})`;
                    imageItem.style.backgroundSize = 'contain';
                    imageItem.addEventListener('click', this.handleImageClick.bind(this));
                    this.galleryList.appendChild(imageItem);
                });
                this.galleryList.appendChild(addButton);
            }
        }

        handleMenuClick (e) {
            e.preventDefault();
            e.stopPropagation();
            const closeMenu = () => {
                document.removeEventListener('click', closeMenu);
                this.setState('menuVisible', false);
            };
            document.addEventListener('click', closeMenu);
            this.setState('menuVisible', !this.state.menuVisible);
        }

        handleMenuItemClick (e) {
            e.preventDefault();

            // remove '.actived'
            this.querySelectorAll('.pixel-gallery-dropdown-content-item.actived').forEach(elem => {
                elem.classList.remove('actived');
            });

            let target = e.target;
            if (target.className !== 'pixel-gallery-dropdown-content-item') {
                target = target.parentElement;
            }

            // actived
            target.classList.add('actived');
            this.setState('galleryId', target.dataset.id);
        }

        removeImageActived () {
            // remove '.actived'
            this.querySelectorAll('.pixel-gallery-list-image.actived').forEach(elem => {
                elem.classList.remove('actived');
            });
        }

        newImage () {
            this.removeImageActived();

            // new image
            const elem = document.createElement('div');
            elem.addEventListener('click', this.handleImageClick);
            elem.className = 'pixel-gallery-list-image';
            elem.dataset.name = this.getUniqueName();

            this.galleryList.insertBefore(elem, this.galleryList.lastElementChild);

            elem.classList.add('actived');
            this.setState('galleryName', elem.dataset.name);
        }

        handleImageClick (e) {
            e.preventDefault();

            const target = e.target;
            if (target === this.galleryList.lastElementChild) {
                this.emit('NewImage');
                return;
            }

            this.removeImageActived();

            // actived
            target.classList.add('actived');
            this.setState('galleryName', target.dataset.name);
        }

        deleteImage () {
            const elem = this.querySelector('.pixel-gallery-list-image.actived');
            if (elem) {
                elem.removeEventListener('click', this.handleImageClick);
                elem.classList.remove('actived');
                this.galleryList.removeChild(elem);

                this.setState({
                    galleryName: '',
                    imageData: null
                })
            }
        }

        render () {
            return `
                <div class="pixel-gallery-selector-wrapper">
                    <div
                        class="pixel-gallery-tools-wrapper"
                        style="display:grid"
                    >
                        <button
                            class="pixel-gallery-tool-button"
                            onclick="this.handleMenuClick"
                        >
                            <img src="${menuIcon}" alt="${messages.MenuButton}" title="${messages.MenuButton}" />
                        </button>
                    </div>
                    <div class="pixel-gallery-list-wrapper">
                        <div
                            id="gallery-list"
                            class="pixel-gallery-list"
                        >
                            <div
                                class="pixel-gallery-list-image add"
                                onclick="this.handleImageClick"
                            >
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="dropdown-menu"
                    class="pixel-gallery-dropdown-wrapper"
                >
                    <div
                        id="menu-content"
                        class="pixel-gallery-dropdown-content"
                    >
                    </div>
                    <div class="pixel-gallery-dropdown-arrow"></div>
                </div>
            `;
        }
    }

    customElements.define('pixel-gallery-selector', PixelGallerySelector);
})(window.Scratch);
