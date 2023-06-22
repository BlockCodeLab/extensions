(async function (Scratch) {
    const Color = Scratch.Color;
    const Component = Scratch.gui.Component;
    const defineMessages = Scratch.defineMessages;

    /* eslint-disable max-len */
    const downloadIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgaGVpZ2h0PSIyMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHdpZHRoPSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxwYXRoIGQ9Ik03LjMzMzMzIDZDNy4zMzMzMyA2LjczNjM4IDcuOTMwMjkgNy4zMzMzMyA4LjY2NjY3IDcuMzMzMzNDOS40MDMwNSA3LjMzMzMzIDEwIDYuNzM2MzggMTAgNkMxMCA1LjI2MzYyIDkuNDAzMDUgNC42NjY2NyA4LjY2NjY3IDQuNjY2NjdDNy45MzAyOSA0LjY2NjY3IDcuMzMzMzMgNS4yNjM2MiA3LjMzMzMzIDZaIiBmaWxsPSIjNTc1ZTc1Ii8+CjxwYXRoIGQ9Ik0xOC42NjY3IDYuOTMzMzNMMTUuOTU1NiA5LjMzMzMzQzE1LjY0NDQgOS42NDQ0NCAxNS4xNTU2IDkuNjQ0NDQgMTQuOCA5LjMzMzMzTDExLjk1NTYgNi45Nzc3OEMxMS43Nzc4IDYuOCAxMS43MzMzIDYuNTMzMzMgMTEuOTExMSA2LjM1NTU2TDEyLjQ4ODkgNS42ODg4OUMxMi42NjY3IDUuNTExMTEgMTIuOTMzMyA1LjQ2NjY3IDEzLjExMTEgNS42NDQ0NEwxNC40ODg5IDYuOEwxNC40ODg5IDIuNDQ0NDRDMTQuNDg4OSAyLjE3Nzc4IDE0LjY2NjcgMiAxNC45MzMzIDJMMTUuODIyMiAyQzE2LjA4ODkgMiAxNi4yNjY3IDIuMTc3NzggMTYuMjY2NyAyLjQ0NDQ0TDE2LjI2NjcgNi43MTExMUwxNy40NjY3IDUuNjQ0NDRDMTcuNjQ0NCA1LjQ2NjY3IDE3LjkxMTEgNS41MTExMSAxOC4wODg5IDUuNjg4ODlMMTguNjY2NyA2LjM1NTU2QzE4Ljg4ODkgNi40ODg4OSAxOC44NDQ0IDYuNzU1NTYgMTguNjY2NyA2LjkzMzMzWiIgZmlsbD0iIzU3NWU3NSIvPgo8cGF0aCBkPSJNMTYuMjIyMiAxOEwzLjc3Nzc4IDE4QzIuOCAxOCAyIDE3LjIgMiAxNi4yMjIyTDIgMy43Nzc3OEMyIDIuOCAyLjggMiAzLjc3Nzc4IDJMMTAuNDQ0NCAyQzEwLjcxMTEgMiAxMC44ODg5IDIuMTc3NzggMTAuODg4OSAyLjQ0NDQ0TDEwLjg4ODkgMy4zMzMzM0MxMC44ODg5IDMuNiAxMC43MTExIDMuNzc3NzggMTAuNDQ0NCAzLjc3Nzc4TDQuNjY2NjcgMy43Nzc3OEM0LjE3Nzc4IDMuNzc3NzggMy43Nzc3OCA0LjE3Nzc4IDMuNzc3NzggNC42NjY2N0wzLjc3Nzc4IDguNjIyMjJMNy4xNTU1NiAxMC43NTU2TDEwLjMxMTEgOC40NDQ0NEMxMC42MjIyIDguMjIyMjIgMTEuMDIyMiA4LjIyMjIyIDExLjMzMzMgOC40NDQ0NEwxNi4yMjIyIDExLjkxMTFMMTYuMjIyMiAxMC40NDQ0QzE2LjIyMjIgMTAuMTc3OCAxNi40IDEwIDE2LjY2NjcgMTBMMTcuNTU1NiAxMEMxNy44MjIyIDEwIDE4IDEwLjE3NzggMTggMTAuNDQ0NEwxOCAxNi4yMjIyQzE4IDE3LjIgMTcuMiAxOCAxNi4yMjIyIDE4Wk0xMC44ODg5IDEwLjI2NjdMNy43MzMzMyAxMi41MzMzQzcuNDIyMjIgMTIuNzU1NiA3LjA2NjY3IDEyLjc1NTYgNi43NTU1NiAxMi41Nzc4TDMuNzc3NzggMTAuNzExMUwzLjc3Nzc4IDE1LjMzMzNDMy43Nzc3OCAxNS44MjIyIDQuMTc3NzggMTYuMjIyMiA0LjY2NjY3IDE2LjIyMjJMMTUuMzMzMyAxNi4yMjIyQzE1LjgyMjIgMTYuMjIyMiAxNi4yMjIyIDE1LjgyMjIgMTYuMjIyMiAxNS4zMzMzTDE2LjIyMjIgMTQuMTMzM0MxNi4yMjIyIDE0LjEzMzMgMTAuODg4OSAxMC4yNjY3IDEwLjg4ODkgMTAuMjY2N1oiIGZpbGw9IiM1NzVlNzUiLz4KPC9zdmc+Cg==';
    const importIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgaGVpZ2h0PSIyMCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHdpZHRoPSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxwYXRoIGQ9Ik03LjMzMzMzIDZDNy4zMzMzMyA2LjczNjM4IDcuOTMwMjkgNy4zMzMzMyA4LjY2NjY3IDcuMzMzMzNDOS40MDMwNSA3LjMzMzMzIDEwIDYuNzM2MzggMTAgNkMxMCA1LjI2MzYyIDkuNDAzMDUgNC42NjY2NyA4LjY2NjY3IDQuNjY2NjdDNy45MzAyOSA0LjY2NjY3IDcuMzMzMzMgNS4yNjM2MiA3LjMzMzMzIDZaIiBmaWxsPSIjNTc1ZTc1Ii8+CjxwYXRoIGQ9Ik0xOC42NjY3IDEzLjA2NjdMMTUuOTU1NiAxMC42NjY3QzE1LjY0NDQgMTAuMzU1NiAxNS4xNTU2IDEwLjM1NTYgMTQuOCAxMC42NjY3TDExLjk1NTYgMTMuMDIyMkMxMS43Nzc4IDEzLjIgMTEuNzMzMyAxMy40NjY3IDExLjkxMTEgMTMuNjQ0NEwxMi40ODg5IDE0LjMxMTFDMTIuNjY2NyAxNC40ODg5IDEyLjkzMzMgMTQuNTMzMyAxMy4xMTExIDE0LjM1NTZMMTQuNDg4OSAxMy4yTDE0LjQ4ODkgMTcuNTU1NkMxNC40ODg5IDE3LjgyMjIgMTQuNjY2NyAxOCAxNC45MzMzIDE4TDE1LjgyMjIgMThDMTYuMDg4OSAxOCAxNi4yNjY3IDE3LjgyMjIgMTYuMjY2NyAxNy41NTU2TDE2LjI2NjcgMTMuMjg4OUwxNy40NjY3IDE0LjM1NTZDMTcuNjQ0NCAxNC41MzMzIDE3LjkxMTEgMTQuNDg4OSAxOC4wODg5IDE0LjMxMTFMMTguNjY2NyAxMy42NDQ0QzE4Ljg4ODkgMTMuNTExMSAxOC44NDQ0IDEzLjI0NDQgMTguNjY2NyAxMy4wNjY3WiIgZmlsbD0iIzU3NWU3NSIvPgo8cGF0aCBkPSJNMTYuMjIyMiAyTDMuNzc3NzggMkMyLjggMiAyIDIuOCAyIDMuNzc3NzhMMiAxNi4yMjIyQzIgMTcuMiAyLjggMTggMy43Nzc3OCAxOEwxMC40NDQ0IDE4QzEwLjcxMTEgMTggMTAuODg4OSAxNy44MjIyIDEwLjg4ODkgMTcuNTU1NkwxMC44ODg5IDE2LjY2NjdDMTAuODg4OSAxNi40IDEwLjcxMTEgMTYuMjIyMiAxMC40NDQ0IDE2LjIyMjJMNC42NjY2NyAxNi4yMjIyQzQuMTc3NzggMTYuMjIyMiAzLjc3Nzc4IDE1LjgyMjIgMy43Nzc3OCAxNS4zMzMzTDMuNzc3NzggMTEuMzc3OEw3LjE1NTU2IDkuMjQ0NDRMMTAuMzExMSAxMS41NTU2QzEwLjYyMjIgMTEuNzc3OCAxMS4wMjIyIDExLjc3NzggMTEuMzMzMyAxMS41NTU2TDE2LjIyMjIgOC4wODg4OUwxNi4yMjIyIDkuNTU1NTZDMTYuMjIyMiA5LjgyMjIyIDE2LjQgMTAgMTYuNjY2NyAxMEwxNy41NTU2IDEwQzE3LjgyMjIgMTAgMTggOS44MjIyMiAxOCA5LjU1NTU2TDE4IDMuNzc3NzhDMTggMi44IDE3LjIgMiAxNi4yMjIyIDJaTTEwLjg4ODkgOS43MzMzM0w3LjczMzMzIDcuNDY2NjdDNy40MjIyMiA3LjI0NDQ0IDcuMDY2NjcgNy4yNDQ0NCA2Ljc1NTU2IDcuNDIyMjJMMy43Nzc3OCA5LjI4ODg5TDMuNzc3NzggNC42NjY2N0MzLjc3Nzc4IDQuMTc3NzggNC4xNzc3OCAzLjc3Nzc4IDQuNjY2NjcgMy43Nzc3OEwxNS4zMzMzIDMuNzc3NzhDMTUuODIyMiAzLjc3Nzc4IDE2LjIyMjIgNC4xNzc3OCAxNi4yMjIyIDQuNjY2NjdMMTYuMjIyMiA1Ljg2NjY3QzE2LjIyMjIgNS44NjY2NyAxMC44ODg5IDkuNzMzMzMgMTAuODg4OSA5LjczMzMzWiIgZmlsbD0iIzU3NWU3NSIvPgo8L3N2Zz4K';
    const deleteIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUwLjIgKDU1MDQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5kZWxldGU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iZGVsZXRlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRGVsZXRlLUljb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAxLjUwMDAwMCkiIGZpbGw9IiM1NzVFNzUiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLDMuMjUgTDE0LDMuMjUgQzE0LjQ0MzcxNjQsMy4yNSAxNC43OTA0MjkzLDMuNjMzMTEzNDMgMTQuNzQ2Mjc3OSw0LjA3NDYyNzc5IEwxMy42MzYzMjc1LDE1LjE3NDEzMTUgQzEzLjU0Njg2NzIsMTYuMDY4NzM0NyAxMi43OTQwNzc1LDE2Ljc1IDExLjg5NTAxMjQsMTYuNzUgTDQuMTA0OTg3NTYsMTYuNzUgQzMuMjA1OTIyNTMsMTYuNzUgMi40NTMxMzI3OSwxNi4wNjg3MzQ3IDIuMzYzNjcyNDgsMTUuMTc0MTMxNSBMMS4yNTM3MjIxMSw0LjA3NDYyNzc5IEMxLjIwOTU3MDY3LDMuNjMzMTEzNDMgMS41NTYyODM1NiwzLjI1IDIsMy4yNSBaIE04Ljc1LDEyIEw4Ljc1LDcgQzguNzUsNi41ODU3ODY0NCA4LjQxNDIxMzU2LDYuMjUgOCw2LjI1IEM3LjU4NTc4NjQ0LDYuMjUgNy4yNSw2LjU4NTc4NjQ0IDcuMjUsNyBMNy4yNSwxMiBDNy4yNSwxMi40MTQyMTM2IDcuNTg1Nzg2NDQsMTIuNzUgOCwxMi43NSBDOC40MTQyMTM1NiwxMi43NSA4Ljc1LDEyLjQxNDIxMzYgOC43NSwxMiBaIE0xMS4yNSwxMiBMMTEuMjUsNyBDMTEuMjUsNi41ODU3ODY0NCAxMC45MTQyMTM2LDYuMjUgMTAuNSw2LjI1IEMxMC4wODU3ODY0LDYuMjUgOS43NSw2LjU4NTc4NjQ0IDkuNzUsNyBMOS43NSwxMiBDOS43NSwxMi40MTQyMTM2IDEwLjA4NTc4NjQsMTIuNzUgMTAuNSwxMi43NSBDMTAuOTE0MjEzNiwxMi43NSAxMS4yNSwxMi40MTQyMTM2IDExLjI1LDEyIFogTTYuMjUsMTIgTDYuMjUsNyBDNi4yNSw2LjU4NTc4NjQ0IDUuOTE0MjEzNTYsNi4yNSA1LjUsNi4yNSBDNS4wODU3ODY0NCw2LjI1IDQuNzUsNi41ODU3ODY0NCA0Ljc1LDcgTDQuNzUsMTIgQzQuNzUsMTIuNDE0MjEzNiA1LjA4NTc4NjQ0LDEyLjc1IDUuNSwxMi43NSBDNS45MTQyMTM1NiwxMi43NSA2LjI1LDEyLjQxNDIxMzYgNi4yNSwxMiBaIE0xLjUsNCBMMTQuNSw0IEwxLjUsNCBaIE0xLjUsMyBMMTQuNSwzIEMxNS4wNTIyODQ3LDMgMTUuNSwzLjQ0NzcxNTI1IDE1LjUsNCBDMTUuNSw0LjU1MjI4NDc1IDE1LjA1MjI4NDcsNSAxNC41LDUgTDEuNSw1IEMwLjk0NzcxNTI1LDUgMC41LDQuNTUyMjg0NzUgMC41LDQgQzAuNSwzLjQ0NzcxNTI1IDAuOTQ3NzE1MjUsMyAxLjUsMyBaIE05LjI1LDMuMjUgTDkuMjUsMiBDOS4yNSwxLjg2MTkyODgxIDkuMTM4MDcxMTksMS43NSA5LDEuNzUgTDcsMS43NSBDNi44NjE5Mjg4MSwxLjc1IDYuNzUsMS44NjE5Mjg4MSA2Ljc1LDIgTDYuNzUsMy4yNSBMOS4yNSwzLjI1IFogTTcsMC4yNSBMOSwwLjI1IEM5Ljk2NjQ5ODMxLDAuMjUgMTAuNzUsMS4wMzM1MDE2OSAxMC43NSwyIEwxMC43NSw0Ljc1IEw1LjI1LDQuNzUgTDUuMjUsMiBDNS4yNSwxLjAzMzUwMTY5IDYuMDMzNTAxNjksMC4yNSA3LDAuMjUgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=';
    /* eslint-enable max-len */

    const messages = defineMessages({
        Name: {
            id: 'pixelGallery.nameInput',
            default: 'Name'
        },
        Color: {
            id: 'pixelGallery.colorSlider',
            default: 'Color'
        },
        Saturation: {
            id: 'pixelGallery.saturationSlider',
            default: 'Saturation'
        },
        Brightness: {
            id: 'pixelGallery.brightnessSlider',
            default: 'Brightness'
        },
        Size: {
            id: 'pixelGallery.sizeSlider',
            default: 'Size'
        },
        Width: {
            id: 'pixelGallery.widthInput',
            default: 'width'
        },
        Height: {
            id: 'pixelGallery.heightInput',
            default: 'height'
        },
        ResizeButton: {
            id: 'pixelGallery.resizeButton',
            default: 'Resize'
        },
        NewButton: {
            id: 'pixelGallery.newButton',
            default: 'New Image'
        },
        ImportButton: {
            id: 'pixelGallery.importButton',
            default: 'Import'
        },
        DownloadButton: {
            id: 'pixelGallery.downloadButton',
            default: 'Download Image'
        },
        DeleteButton: {
            id: 'pixelGallery.deleteButton',
            default: 'Delete Image'
        },
    });

    const Hue = [0, 0, 324, 288, 252, 216, 180, 144, 108, 72, 36, 0, 0];

    const SliderMax = 124;

    const hsvToRgbStyle = (h, s, v) => {
        const {r, g, b} = Color.hsvToRgb({h, s, v});
        return `rgb(${r}, ${g}, ${b})`;
    }

    class PixelGallerySidebar extends Component {
        static get observedState () {
            return ['color', 'saturation', 'brightness', 'galleryName', 'width', 'height', 'imageData'];
        }

        connectedCallback () {
            super.connectedCallback();
            this.setColor(this.state.color, this.state.saturation, this.state.brightness);
        }

        stateChangedCallback (name, oldValue, newValue) {
            if (name === 'width') {
                this.widthInput.value = newValue;
                return;
            }

            if (name === 'height') {
                this.heightInput.value = newValue;
                return;
            }

            if (oldValue === newValue) return;

            if (name === 'galleryName') {
                this.nameInput.value = newValue;
                return;
            }

            if (name === 'color' || name === 'saturation' || name === 'brightness') {
                this.setColor(this.state.color, this.state.saturation, this.state.brightness);
                return;
            }

            if (name === 'imageData') {
                this.querySelectorAll('#name-input, .pixel-gallery-sidebar-button:not(.ok-button), .pixel-gallery-sidebar-icon-button')
                    .forEach(elem => {
                        elem.disabled = !newValue;
                        if (newValue) {
                            elem.classList.remove('disabled');
                        } else {
                            elem.classList.add('disabled');
                        }
                    });
                return;
            }
        }

        setColor (color, saturation, brightness) {
            const hue = color / 360;
            const rgb = Hue.map(c => hsvToRgbStyle(c, saturation, brightness));
            this.colorSliderReadout.innerText = Math.round(hue * 100);
            this.colorSliderHandle.style.left = `${Math.round(hue * SliderMax)}px`;
            this.colorSliderContainer.style.background = `linear-gradient(to left, ${rgb[0]} 0px, ${rgb[1]} 13px, ${rgb[2]}, ${rgb[3]}, ${rgb[4]}, ${rgb[5]}, ${rgb[6]}, ${rgb[7]}, ${rgb[8]}, ${rgb[9]}, ${rgb[10]}, ${rgb[11]} 137px, ${rgb[12]} 100%)`;

            const s1 = hsvToRgbStyle(color, 0, brightness);
            const s2 = hsvToRgbStyle(color, 1, brightness);
            this.saturationSliderReadout.innerText = Math.round(saturation * 100);
            this.saturationSliderHandle.style.left = `${Math.round(saturation * SliderMax)}px`;
            this.saturationSliderContainer.style.background = `linear-gradient(to right, ${s1} 0px, ${s2} 100%)`;

            const v1 = hsvToRgbStyle(color, saturation, 0);
            const v2 = hsvToRgbStyle(color, saturation, 1);
            this.brightnessSliderReadout.innerText = Math.round(brightness * 100);
            this.brightnessSliderHandle.style.left = `${Math.round(brightness * SliderMax)}px`;
            this.brightnessSliderContainer.style.background = `linear-gradient(to right, ${v1} 0px, ${v2} 100%)`;
        }

        moveSliderHandle (e, setValue) {
            e.preventDefault();
            const target = e.target;
            const cx = e.clientX;
            const left = target.offsetLeft;
            const mouseMove = evt => {
                evt.preventDefault();
                let x = evt.clientX - cx + left;
                if (x >= SliderMax) {
                    x = SliderMax;
                }
                if (x <= 0) {
                    x = 0;
                }
                target.style.left = `${x}px`;
                setValue(x / SliderMax);
            };
            const mouseUp = () => {
                document.removeEventListener('mousemove', mouseMove);
                document.removeEventListener('mouseup', mouseUp);  
            };
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
        }

        handleColorSliderMousedown (e) {
            this.moveSliderHandle(e, value => {
                this.colorSliderReadout.innerText = Math.round(value * 100);
                const color = value * 360
                this.setColor(color, this.state.saturation, this.state.brightness);
                this.setState('color', color);
            });
        }

        handleSaturationSliderMousedown (e) {
            this.moveSliderHandle(e, value => {
                this.saturationSliderReadout.innerText = Math.round(value * 100);
                this.setColor(this.state.color, value, this.state.brightness);
                this.setState('saturation', value);
            });
        }

        handleBrightnessSliderMousedown (e) {
            this.moveSliderHandle(e, value => {
                this.brightnessSliderReadout.innerText = Math.round(value * 100);
                this.setColor(this.state.color, this.state.saturation, value);
                this.setState('brightness', value);
            });
        }

        handleResizeImage (e) {
            e.preventDefault();
            this.emit('ResizeImage', {
                width: parseInt(this.widthInput.value),
                height: parseInt(this.heightInput.value)
            });
        }

        handleNewImage (e) {
            e.preventDefault();
            this.emit('NewImage', {
                width: parseInt(this.widthInput.value),
                height: parseInt(this.heightInput.value)
            });
        }

        handleDownloadImage (e) {
            e.preventDefault();
            this.emit('DownloadImage');
        }

        handleImportImage (e) {
            e.preventDefault();
            this.emit('ImportImage');
        }

        handleDeleteImage (e) {
            e.preventDefault();
            this.emit('DeleteImage');
        }

        handleNameChange (e) {
            e.preventDefault();
            this.setState('galleryName', e.target.value);
        }

        render () {
            const isDisabled = this.state.imageData ? '' : 'disabled';
            return `
                <div class="pixel-gallery-sidebar-wrapper">
                    <input
                        type="text"
                        id="name-input"
                        class="pixel-gallery-sidebar-item pixel-gallery-sidebar-input"
                        placeholder="${messages.Name}"
                        disabled="${isDisabled}"
                        value="${this.state.galleryName || ''}"
                        onchange="this.handleNameChange"
                    >
                    <hr class="pixel-gallery-sidebar-divider"></hr>
                    <div id="color-slider">
                        <div class="pixel-gallery-sidebar-item">
                            <span class="pixel-gallery-sidebar-item-name">${messages.Color}</span>
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
                            <span class="pixel-gallery-sidebar-item-name">${messages.Saturation}</span>
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
                            <span class="pixel-gallery-sidebar-item-name">${messages.Brightness}</span>
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
                            <span class="pixel-gallery-sidebar-item-name">${messages.Size}</span>
                        </div>
                        <div class="pixel-gallery-sidebar-item group">
                            <input
                                type="text"
                                id="width-input"
                                class="pixel-gallery-sidebar-input half"
                                placeholder="${messages.Width}"
                                value="${this.state.width || 16}"
                            >
                            <span style="margin:0 0.3rem">×</span>
                            <input
                                type="text"
                                id="height-input"
                                class="pixel-gallery-sidebar-input half"
                                placeholder="${messages.Height}"
                                value="${this.state.height || 16}"
                            >
                        </div>
                    </div>
                    <button
                        class="pixel-gallery-sidebar-item pixel-gallery-sidebar-button ${isDisabled}"
                        onclick="this.handleResizeImage"
                        disabled="${!this.state.imageData}"
                    >${messages.ResizeButton}</button>
                    <button
                        class="pixel-gallery-sidebar-item pixel-gallery-sidebar-button ok-button"
                        onclick="this.handleNewImage"
                    >${messages.NewButton}</button>
                    <div class="pixel-gallery-sidebar-item group">
                        <button
                            class="pixel-gallery-sidebar-icon-button ${isDisabled}"
                            onclick="this.handleImportImage"
                            disabled="${!this.state.imageData}"
                        >
                            <img src="${importIcon}" alt="${messages.ImportButton}" title="${messages.ImportButton}" />
                        </button>
                        <button
                            class="pixel-gallery-sidebar-icon-button ${isDisabled}"
                            onclick="this.handleDownloadImage"
                            disabled="${!this.state.imageData}"
                        >
                            <img src="${downloadIcon}" alt="${messages.DownloadButton}" title="${messages.DownloadButton}" />
                        </button>
                        <button
                            class="pixel-gallery-sidebar-icon-button ${isDisabled}"
                            onclick="this.handleDeleteImage"
                            disabled="${!this.state.imageData}"
                        >
                            <img src="${deleteIcon}" alt="${messages.DeleteButton}" title="${messages.DeleteButton}" />
                        </button>
                    </div>
                </div>
            `;
        }
    }

    customElements.define('pixel-gallery-sidebar', PixelGallerySidebar);
})(window.Scratch);
