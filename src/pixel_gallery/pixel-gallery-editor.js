(async function (Scratch) {
    const Color = Scratch.Color;
    const Component = Scratch.gui.Component;

    const TOOL = {
        PEN: 'pen',
        FILL: 'fill',
        ERASER: 'eraser',
        PICKER: 'picker'
    }
    const TRANSPARENT = 'transparent';

    Component.initialState = {
        width: 16,
        height: 16,
        scaling: 20,
        tool: TOOL.PEN,
        background: '#ffffff',
        imageData: null,
    };

    const hexToHsv = hex => {
        return Color.rgbToHsv(Color.hexToRgb(hex));
    }

    const hsvToHex = hsv => {
        return Color.rgbToHex(Color.hsvToRgb(hsv));
    }

    class Pixel {
        constructor (x, y) {
            this.x = x;
            this.y = y;
        }
        equals (point) {
            return this.x == point.x && this.y == point.y;
        }
    }

    class PixelGalleryEditor extends Component {
        static get observedState () {
            return [
                'width', 'height', 'scaling', 'tool', 'background',
                'galleryName', 'imageData',
                'color', 'saturation', 'brightness'
            ];
        }

        constructor () {
            super();

            this.state = {
                dx: 0,
                dy: 0
            };

            this.prevPixel = new Pixel();
        }

        connectedCallback () {
            super.connectedCallback();
            this.initialContext();
            // this.openImage(this.state.imageData);
        }

        stateChangedCallback (name, oldValue, newValue) {
            if (name === 'imageData') {
                if (newValue) {
                    this.emit('SaveImage');
                } else {
                    this.drawingBoard.style.display = 'none';
                }
            }

            if (oldValue === newValue) return;

            if (name === 'dx' || name === 'dy') {
                this.drawingBoard.style.translate = `${this.state.dx}px ${this.state.dy}px`;
            }
            
            if (name === 'color' || name === 'saturation' || name === 'brightness') {
                const hsv = {
                    h: this.state.color,
                    s: this.state.saturation,
                    v: this.state.brightness
                };
                this.setColor(hsvToHex(hsv));
                return;
            }

            if (name === 'background') {
                this.drawingBoard.style.background = newValue;
                return;
            }
        }

        initialContext () {
            this.ctx = this.drawingBoard.getContext('2d');
            this.ctx.globalAlpha = 1;
        }

        resetData () {
            this.data = [...Array(this.drawingBoard.width)].map(() =>
                Array(this.drawingBoard.height).fill(TRANSPARENT)
            );

            for (let x = 0; x < this.state.width; x++) {
                for (let y = 0; y < this.state.height; y++) {
                    const [r, g, b, a] = this.ctx.getImageData(x, y, 1, 1).data;
                    if (a !== 0) {
                        this.data[x][y] = Color.rgbToHex({r, g, b});
                    }
                }
            }
        }

        openImage (imageData) {
            if (imageData) {
                const img = new Image();
                img.src = imageData;
                img.onload = () => {
                    this.newImage(img.width, img.height);
                    this.ctx.drawImage(img, 0, 0, img.width, img.height);
                    this.setState({
                        width: img.width,
                        height: img.height,
                        imageData: this.drawingBoard.toDataURL()
                    });
                    this.resetData();
                }
            }
        }

        newImage (width, height) {
            this.drawingBoard.width = width;
            this.drawingBoard.height = height;

            this.drawingBoard.style.width = `${width * this.state.scaling}px`;
            this.drawingBoard.style.height = `${height * this.state.scaling}px`;
            this.drawingBoard.style.display = 'block';

            this.setState({
                width,
                height,
                imageData: this.drawingBoard.toDataURL()
            });
            this.resetData();

            const hsv = {
                h: this.state.color,
                s: this.state.saturation,
                v: this.state.brightness
            };
            this.setColor(hsvToHex(hsv));
        }

        resizeImage (width, height) {
            if (width !== this.state.width || height !== this.state.height) {
                const imageData = this.state.imageData;
                this.newImage(width, height);
                if (imageData) {
                    const img = new Image();
                    img.src = imageData;
                    img.onload = () => {
                        this.ctx.drawImage(img, 0, 0, img.width, img.height);
                        this.setState({
                            width,
                            height,
                            imageData: this.drawingBoard.toDataURL()
                        });
                        this.resetData();
                    }
                }
            }
        }

        importImage () {
            if (this.state.imageData) {
                const fp = document.createElement('input');
                fp.type = 'file';
                fp.click();
                fp.onchange = e => {
                    const reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = () => {
                        const img = new Image();
                        img.width = this.state.width;
                        img.height = this.state.height;
                        img.src = reader.result;
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = this.state.width;
                            canvas.height = this.state.width;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0, this.state.width, this.state.width);
                            for (let x = 0; x < this.state.width; x++) {
                                for (let y = 0; y < this.state.height; y++) {
                                    const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
                                    if (a !== 0) {
                                        this.setColor(Color.rgbToHex({r, g, b}));
                                        this.draw(x, y);
                                    }
                                }
                            }
                            this.setState('imageData', this.drawingBoard.toDataURL());
                        };
                    };
                };
            }
        }

        downloadImage () {
            if (this.state.imageData) {
                this.drawingBoard.toBlob(blob => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = `${this.state.galleryName}.png`;
                    link.href = url;
                    link.click();
                });
            }
        }

        setColor (color) {
            this.color = color;
            this.ctx.fillStyle = color;
        }

        draw (x, y) {
            if (x >= 0 && x < this.drawingBoard.width && y >= 0 && y < this.drawingBoard.height) {
                this.data[x][y] = this.color;
                this.ctx.fillRect(x, y, 1, 1);
            }
        }

        fill (x, y, color) {
            if (x >= 0 && x < this.drawingBoard.width && y >= 0 && y < this.drawingBoard.height) {
                if (this.data[x][y] === color && this.data[x][y] != this.color) {
                    this.draw(x, y);
                    this.fill(x + 1, y, color);
                    this.fill(x, y + 1, color);
                    this.fill(x - 1, y, color);
                    this.fill(x, y - 1, color);
                }
            }
        }

        erase (x, y) {
            if (x >= 0 && x < this.drawingBoard.width && y >= 0 && y < this.drawingBoard.height) {
                this.data[x][y] = TRANSPARENT;
                this.ctx.clearRect(x, y, 1, 1);
            }
        }

        handleWheel (e) {
            e.preventDefault();
            e.stopPropagation();
            let dx = this.state.dx - e.deltaX / 10;
            let dy = this.state.dy - e.deltaY / 10;
            
            if (dx > 0) dx = 0;
            if (dy > 0) dy = 0;

            const rect = this.drawingBoard.getBoundingClientRect();
            if (Math.abs(dx) > rect.width) {
                dx = -rect.width;
            }
            if (Math.abs(dy) > rect.height) {
                dy = -rect.height;
            }

            this.setState({dx, dy});
        }

        handleMouseDown (e) {
            e.preventDefault();
            this.prevPixel = new Pixel();
            this.drawing = true;
            const mouseUp = () => {
                this.drawing = false;
                document.removeEventListener('mouseup', mouseUp);  
            };
            document.addEventListener('mouseup', mouseUp);
        }

        handleMouseMove (e) {
            e.preventDefault();

            if (this.drawing) {
                const rect = this.drawingBoard.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;
                x = Math.floor((this.state.width * x) / this.drawingBoard.clientWidth);
                y = Math.floor((this.state.height * y) / this.drawingBoard.clientHeight);

                if (this.state.tool === TOOL.PEN) {
                    const p = new Pixel(x, y);
                    if (!p.equals(this.prevPixel)) {
                        this.prevPixel = p;
                        this.draw(p.x, p.y);
                    }
                } else if (this.state.tool === TOOL.ERASER) {
                    this.erase(x, y);
                }
            }
        }

        handleTouchMove (e) {
            e.preventDefault();

            const rect = this.drawingBoard.getBoundingClientRect();
            let x = e.touches[0].clientX - rect.left;
            let y = e.touches[0].clientY - rect.top;
            x = Math.floor((this.state.width * x) / this.drawingBoard.clientWidth);
            y = Math.floor((this.state.height * y) / this.drawingBoard.clientHeight);

            if (this.state.tool === TOOL.PEN) {
                const p = new Pixel(x, y);
                if (!p.equals(this.prevPixel)) {
                    this.prevPixel = p;
                    this.draw(p.x, p.y);
                }
            } else if (this.state.tool === TOOL.ERASER) {
                this.erase(x, y);
            }
        }

        handleMouseUp (e) {
            e.preventDefault();
            this.drawing = false;

            // Don't re-paint the last point in a streak
            if (typeof this.prevPixel.x === 'undefined') {
                const rect = this.drawingBoard.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;
                x = Math.floor((this.state.width * x) / this.drawingBoard.clientWidth);
                y = Math.floor((this.state.height * y) / this.drawingBoard.clientHeight);
    
                if (this.state.tool === TOOL.PEN) {
                    this.prevPixel = new Pixel(x, y);
                    this.draw(x, y);
                } else if (this.state.tool === TOOL.ERASER) {
                    this.erase(x, y);
                } else if (this.state.tool === TOOL.FILL) {
                    this.fill(x, y, this.data[x][y]);
                } else if (this.state.tool === TOOL.PICKER) {
                    if (this.data[x][y] !== TRANSPARENT) {
                        const {
                            h: color,
                            s: saturation,
                            v: brightness
                        } = hexToHsv(this.data[x][y]);
                        this.setState({color, saturation, brightness});
                    }
                }
            }

            this.setState('imageData', this.drawingBoard.toDataURL());
        }

        render () {
            return `
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
            `;
        }
    }

    customElements.define('pixel-gallery-editor', PixelGalleryEditor);
})(Scratch);
