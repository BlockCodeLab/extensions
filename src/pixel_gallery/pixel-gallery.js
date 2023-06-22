(async function (Scratch) {
    const Component = Scratch.gui.Component;

    await Scratch.require('./pixel-gallery-selector.js', false);
    await Scratch.require('./pixel-gallery-toolbar.js', false);
    await Scratch.require('./pixel-gallery-sidebar.js', false);
    await Scratch.require('./pixel-gallery-editor.js', false);

    class PixelGallery extends Component {
        static get observedState () {
            return ['galleryId', 'galleryName', 'imageData', 'width', 'height'];
        }

        connectedCallback () {
            super.connectedCallback();

            this.emit('menu', {
                resolve: menu => {
                    this.pixelSelector.updateMenu(menu);
                }
            });

            if (this.state.galleryId) {
                this.emit('list', {
                    id: this.state.galleryId,
                    resolve: images => {
                        this.pixelSelector.updateGallery(images);
                    }
                });
            }
        }

        stateChangedCallback (name, oldValue, newValue) {
            if (oldValue === newValue) return;

            if (name === 'galleryId') {
                this.setState({
                    galleryName: '',
                    imageData: null,
                });
                this.emit('list', {
                    id: this.state.galleryId,
                    resolve: images => {
                        this.pixelSelector.updateGallery(images);
                    }
                });
                return;
            }

            if (name === 'galleryName' && newValue) {
                this.emit('open', {
                    id: this.state.galleryId,
                    name: this.state.galleryName,
                    resolve: imageData => {
                        this.pixelEditor.openImage(imageData);
                    }
                });
                return;
            }
            
            if (name === 'imageData' && newValue) {
                this.emit('save', {
                    id: this.state.galleryId,
                    name: this.state.galleryName,
                    data: newValue,
                    width: this.state.width,
                    height: this.state.height
                });
                return;
            }
        }

        handleResizeImage (e) {
            e.preventDefault();
            const {width, height} = e.detail;
            this.pixelEditor.resizeImage(width, height);
        }

        handleNewImage (e) {
            e.preventDefault();
            const {width, height} = e.detail;
            if (width && height) {
                this.pixelSelector.newImage();
                this.pixelEditor.newImage(width, height);
            } else {
                this.pixelSidebar.handleNewImage(e);
            }
        }

        handleImportImage (e) {
            e.preventDefault();
            this.pixelEditor.importImage();
        }

        handleDownloadImage(e) {
            e.preventDefault();
            this.pixelEditor.downloadImage();
        }

        handleDeleteImage (e) {
            e.preventDefault();
            this.emit('delete', {
                id: this.state.galleryId,
                name: this.state.galleryName
            });
            this.pixelSelector.deleteImage();
        }

        render () {
            return `
                <div class="pixel-gallery-wrapper">
                    <pixel-gallery-editor id="pixel-editor"></pixel-gallery-editor>
                    <pixel-gallery-selector
                        id="pixel-selector"
                        onNewImage="this.handleNewImage"
                    ></pixel-gallery-selector>
                    <pixel-gallery-toolbar></pixel-gallery-toolbar>
                    <pixel-gallery-sidebar
                        id="pixel-sidebar"
                        onResizeImage="this.handleResizeImage"
                        onNewImage="this.handleNewImage"
                        onImportImage="this.handleImportImage"
                        onDownloadImage="this.handleDownloadImage"
                        onDeleteImage="this.handleDeleteImage"
                    ></pixel-gallery-sidebar>
                </div>
            `;
        }
    }

    customElements.define('pixel-gallery', PixelGallery);

    Scratch.extensions.translations({
        en: {
            'pixelGallery.nameInput': 'Name',
            'pixelGallery.untitledName': 'Untitled',
            'pixelGallery.colorSlider': 'Color',
            'pixelGallery.saturationSlider': 'Saturation',
            'pixelGallery.brightnessSlider': 'Brightness',
            'pixelGallery.sizeSlider': 'Size',
            'pixelGallery.widthInput': 'width',
            'pixelGallery.heightInput': 'height',
            'pixelGallery.resizeButton': 'Resize',
            'pixelGallery.newButton': 'New Image',
            'pixelGallery.importButton': 'Import',
            'pixelGallery.downloadButton': 'Download',
            'pixelGallery.deleteButton': 'Delete',
            'pixelGallery.penButton': 'Pen',
            'pixelGallery.fillButton': 'Fill',
            'pixelGallery.eraserButton': 'Eraser',
            'pixelGallery.pickerButton': 'Color Picker',
            'pixelGallery.menuButton': 'Gallery',
        },
        'zh-cn': {
            'pixelGallery.nameInput': '名称',
            'pixelGallery.untitledName': '未命名',
            'pixelGallery.colorSlider': '颜色',
            'pixelGallery.saturationSlider': '饱和度',
            'pixelGallery.brightnessSlider': '亮度',
            'pixelGallery.sizeSlider': '尺寸',
            'pixelGallery.widthInput': '宽',
            'pixelGallery.heightInput': '高',
            'pixelGallery.resizeButton': '更改尺寸',
            'pixelGallery.newButton': '新图像',
            'pixelGallery.importButton': '导入',
            'pixelGallery.downloadButton': '下载',
            'pixelGallery.deleteButton': '删除',
            'pixelGallery.penButton': '画笔',
            'pixelGallery.fillButton': '填充',
            'pixelGallery.eraserButton': '橡皮擦',
            'pixelGallery.pickerButton': '拾取颜色',
            'pixelGallery.menuButton': '图库',
        },
        'zh-tw': {
            'pixelGallery.nameInput': '名稱',
            'pixelGallery.untitledName': '未命名',
            'pixelGallery.colorSlider': '顏色',
            'pixelGallery.saturationSlider': '飽和度',
            'pixelGallery.brightnessSlider': '亮度',
            'pixelGallery.sizeSlider': '尺寸',
            'pixelGallery.widthInput': '寬',
            'pixelGallery.heightInput': '高',
            'pixelGallery.resizeButton': '更改尺寸',
            'pixelGallery.newButton': '新圖像',
            'pixelGallery.importButton': '導入',
            'pixelGallery.downloadButton': '下載',
            'pixelGallery.deleteButton': '刪除',
            'pixelGallery.penButton': '畫筆',
            'pixelGallery.fillButton': '填充',
            'pixelGallery.eraserButton': '橡皮擦',
            'pixelGallery.pickerButton': '拾取顏色',
            'pixelGallery.menuButton': '圖庫',
        }
    });
})(window.Scratch);
