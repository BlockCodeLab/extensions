(async function (Scratch, require) {
    await require('./pixel-gallery.js');

    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const Cast = Scratch.Cast;
    const formatMessage = Scratch.formatMessage;

    /* eslint-disable max-len */
    const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAFIUlEQVR4nO1cvZIeNRDs1trHGQKqKDJyImICqgh5A56DhJfiHSgiUngMEsoRP2e77FUTjLR/d4VnJN9F08H3c7caSa2RtOqZ/YBEIpFIJBKJRCKReGrQe2H96jsN16LSahOgBVj+hb74FVeDdNYgHq4n8e5FwfMfCJSDAcHdO1HWNBAE8fZ2xUdfV1fpZ74qAOGT/QvdvLfrdytSQSHAdwClky2vVbUXtvdyQ+j5CpV6suMdcaFzTwhAXZwFESCQJ/cYdcYKFgJYAapZ2W35rXIvT0KoKPXgdMHmrYuVE8yrI+7hJrC1NtayDUcvK5BoDR0cB0EHpxYkQgWoBAoBKdhOEVBts0GhdrkJrBRGPc9WQAKoECrACmFfyzr8ayDR/RckVgJLBUqxWqhYO9eitiRUALzXrv+Dm8Ay7H0wpmhWAAIqQ1Ot40o0WxXg2ETp01aH716UWFWJK5LASSSBk0gCJ5EETiIJnEQSOIkkcBJJ4CSSwEkkgZNIAieRBE4ioEjP6DEFpnWofS4m8w8HCU7aCaACcTWdFXGzvWVdxhL9VvyC6s33cSm/YQ9PCMIC1L+Bl68AcMikKceLqdICan2Nl1/+Bj1fL3pWgEoC0ALxLe64AKiuYn5Jf/nc35iHoCbDi+ByA7z59DIg/lG3IJB1kirQ2xu8/niFblZAFhpqV/rsbR9MJn8dIN5PYFQmP5Yl0L1iAY3EzdyVRIc91K2zvVSBIGmPOEXad6paob6GJH0OroJi6yDRRPM2IKNjspXdQkGoICr7nyw8aeGD95ujCPWQBYEaaJhf0q/jGzYp6xSbB3YWO4LeLZY2AJ0xWlhyW7aELWricMZ+LaUW4lzdbfFvImV4y7RoWVULJi2HjjcEw3PctqU9OHwNUsV34h5Map7sRN4HTiIJnEQSOIkkcBJJ4CSSwEkkgZNIAieRBE7CfxKZgfqZtRw+H/S8Kdv2oi1hc7caPzvJtMBAetzTEPggLsQ1ucsDO8gdj3IEZefhc8KwnwirngfbPgQIDGRte6xJ4KBA2yxs72pKj0pTe7Z8P688dj5LRzw3QOCHIa/PEMsGPSzBgYxLbrJLWxa6FKWuzdj/vC3efVWIeq4/JqI9jXPcc7QvL4LlJQNbbrIbrG3OWWY5VfEMPZZhslS0hTYEJrk9e4wc6V+WbzG6NANWTBSKiH8A/HT7DUDuFptm6AJXUMvmL29uX+F3/Yy1vsPRB2MwkbKqgPgLwI+uUm4C7/TiIMPHdlDB1rtKoQC4g/Bnud3s9b1DzpsqsZrA29TnN7zDH+UzrOUshLqT1kEU1G3SP8pjDrwndPs3FZr7ocA8sFCg9jBp/HEHU6T7qmIxjIJrJM3r0EI5laQvIAcgsgaSNkKMeR+wxz/MhlFfuyKPfdJFlGC1jHypldPln5H2bbtvu4EJrPGx+8CT3chtTQ+o7zvI9Ymg/pSQyxoPdW+xqUPhwI5+KjqwOQamMPdd817N7ym77Q+nZ4zG0d3v6Hn3BjeAvns7g+lH5Fl4EkngJJLASSSBk0gCJ5EETiIJnEQSOIkkcBIBAuN36VdQuMjuo4ZObweMZ5Cd4zR+PIkH7snbdvDv8vlo0mtPg77f3Xi26/n6uJb4tEGlPsgf4jjcPzxIJHaWXbgGtB5JjRnVox/yi4JBY8D2kyk903efRkeVZuRhh1Y0UDaQZG6xECNxIIm79a39bgek1nHGHXLFXub+r7GMroNHeWdmLU0kEolEIpFIJBKJx8Z/Y13fn4SNDiMAAAAASUVORK5CYII=';
    const TAB_ICON = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjwhLS0gQ3JlYXRlZCB3aXRoIFZlY3Rvcm5hdG9yIChodHRwOi8vdmVjdG9ybmF0b3IuaW8vKSAtLT4KPHN2ZyBoZWlnaHQ9IjIwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0eWxlPSJmaWxsLXJ1bGU6bm9uemVybztjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPGRlZnMvPgo8ZyBpZD0i5peg5qCH6aKYIj4KPHBhdGggZD0iTTYuNzk4ODYgMy41TDUuMTk1NDQgMy41TDUuMTk1NDQgNS4xMjYyNUw2Ljc5ODg2IDUuMTI2MjVMNi43OTg4NiAzLjVaTTE0Ljc5ODkgMy41TDEzLjIwMTEgMy41TDEzLjIwMTEgNS4xMjYyNUwxNC43OTg5IDUuMTI2MjVMMTQuNzk4OSAzLjVaTTguNDAyMjggNS4xMjYyNUw2Ljc5ODg2IDUuMTI2MjVMNi43OTg4NiA2Ljc1MjVMOC40MDIyOCA2Ljc1MjVMOC40MDIyOCA1LjEyNjI1Wk0xMy4yMDY4IDUuMTI2MjVMMTEuNjAzNCA1LjEyNjI1TDExLjYwMzQgNi43NTI1TDEzLjIwNjggNi43NTI1TDEzLjIwNjggNS4xMjYyNVpNNi43OTg4NiA2Ljc0Njc5TDUuMTk1NDQgNi43NDY3OUw1LjE5NTQ0IDguMzc4NzRMNi43OTg4NiA4LjM3ODc0TDYuNzk4ODYgNi43NDY3OVoiIGZpbGw9IiM0Yzk3ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIi8+CjxwYXRoIGQ9Ik04LjQwMjI4IDYuNzQ2NzlMNi43OTg4NiA2Ljc0Njc5TDYuNzk4ODYgOC4zNzg3NEw4LjQwMjI4IDguMzc4NzRMOC40MDIyOCA2Ljc0Njc5Wk0xMCA2Ljc0Njc5TDguNDAyMjggNi43NDY3OUw4LjQwMjI4IDguMzc4NzRMMTAgOC4zNzg3NEwxMCA2Ljc0Njc5WiIgZmlsbD0iIzRjOTdmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIxIiBzdHJva2U9Im5vbmUiLz4KPHBhdGggZD0iTTExLjYwMzQgNi43NDY3OUwxMCA2Ljc0Njc5TDEwIDguMzc4NzRMMTEuNjAzNCA4LjM3ODc0TDExLjYwMzQgNi43NDY3OVpNMTMuMjA2OCA2Ljc0Njc5TDExLjYwMzQgNi43NDY3OUwxMS42MDM0IDguMzc4NzRMMTMuMjA2OCA4LjM3ODc0TDEzLjIwNjggNi43NDY3OVoiIGZpbGw9IiM0Yzk3ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIi8+CjxwYXRoIGQ9Ik0xNC43OTg5IDYuNzQ2NzlMMTMuMjAxMSA2Ljc0Njc5TDEzLjIwMTEgOC4zNzg3NEwxNC43OTg5IDguMzc4NzRMMTQuNzk4OSA2Ljc0Njc5Wk02Ljc5ODg2IDguMzczMDRMNS4xOTU0NCA4LjM3MzA0TDUuMTk1NDQgOS45OTkyOUw2Ljc5ODg2IDkuOTk5MjlMNi43OTg4NiA4LjM3MzA0Wk0xMCA4LjM3MzA0TDguNDAyMjggOC4zNzMwNEw4LjQwMjI4IDkuOTk5MjlMMTAgOS45OTkyOUwxMCA4LjM3MzA0WiIgZmlsbD0iIzRjOTdmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIxIiBzdHJva2U9Im5vbmUiLz4KPHBhdGggZD0iTTExLjYwMzQgOC4zNzMwNEwxMCA4LjM3MzA0TDEwIDkuOTk5MjlMMTEuNjAzNCA5Ljk5OTI5TDExLjYwMzQgOC4zNzMwNFpNMTQuNzk4OSA4LjM3MzA0TDEzLjIwMTEgOC4zNzMwNEwxMy4yMDExIDkuOTk5MjlMMTQuNzk4OSA5Ljk5OTI5TDE0Ljc5ODkgOC4zNzMwNFpNNi43OTg4NiAxMC4wMDVMNS4xOTU0NCAxMC4wMDVMNS4xOTU0NCAxMS42MzEyTDYuNzk4ODYgMTEuNjMxMkw2Ljc5ODg2IDEwLjAwNVpNOC40MDIyOCAxMC4wMDVMNi43OTg4NiAxMC4wMDVMNi43OTg4NiAxMS42MzEyTDguNDAyMjggMTEuNjMxMkw4LjQwMjI4IDEwLjAwNVpNMTAgMTAuMDA1TDguNDAyMjggMTAuMDA1TDguNDAyMjggMTEuNjMxMkwxMCAxMS42MzEyTDEwIDEwLjAwNVoiIGZpbGw9IiM0Yzk3ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIi8+CjxwYXRoIGQ9Ik0xMS42MDM0IDEwLjAwNUwxMCAxMC4wMDVMMTAgMTEuNjMxMkwxMS42MDM0IDExLjYzMTJMMTEuNjAzNCAxMC4wMDVaTTEzLjIwNjggMTAuMDA1TDExLjYwMzQgMTAuMDA1TDExLjYwMzQgMTEuNjMxMkwxMy4yMDY4IDExLjYzMTJMMTMuMjA2OCAxMC4wMDVaIiBmaWxsPSIjNGM5N2ZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8cGF0aCBkPSJNMTQuNzk4OSAxMC4wMDVMMTMuMjAxMSAxMC4wMDVMMTMuMjAxMSAxMS42MzEyTDE0Ljc5ODkgMTEuNjMxMkwxNC43OTg5IDEwLjAwNVpNNi43OTg4NiAxMS42MjU1TDUuMTk1NDQgMTEuNjI1NUw1LjE5NTQ0IDEzLjI1MThMNi43OTg4NiAxMy4yNTE4TDYuNzk4ODYgMTEuNjI1NVpNOC40MDIyOCAxMS42MjU1TDYuNzk4ODYgMTEuNjI1NUw2Ljc5ODg2IDEzLjI1MThMOC40MDIyOCAxMy4yNTE4TDguNDAyMjggMTEuNjI1NVpNMTAgMTEuNjI1NUw4LjQwMjI4IDExLjYyNTVMOC40MDIyOCAxMy4yNTE4TDEwIDEzLjI1MThMMTAgMTEuNjI1NVoiIGZpbGw9IiM0Yzk3ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIi8+CjxwYXRoIGQ9Ik0xMS42MDM0IDExLjYyNTVMMTAgMTEuNjI1NUwxMCAxMy4yNTE4TDExLjYwMzQgMTMuMjUxOEwxMS42MDM0IDExLjYyNTVaTTEzLjIwNjggMTEuNjI1NUwxMS42MDM0IDExLjYyNTVMMTEuNjAzNCAxMy4yNTE4TDEzLjIwNjggMTMuMjUxOEwxMy4yMDY4IDExLjYyNTVaIiBmaWxsPSIjNGM5N2ZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8cGF0aCBkPSJNMTQuNzk4OSAxMS42MjU1TDEzLjIwMTEgMTEuNjI1NUwxMy4yMDExIDEzLjI1MThMMTQuNzk4OSAxMy4yNTE4TDE0Ljc5ODkgMTEuNjI1NVpNNi43OTg4NiAxMy4yNTE4TDUuMTk1NDQgMTMuMjUxOEw1LjE5NTQ0IDE0Ljg4MzdMNi43OTg4NiAxNC44ODM3TDYuNzk4ODYgMTMuMjUxOFpNMTQuNzk4OSAxMy4yNTE4TDEzLjIwMTEgMTMuMjUxOEwxMy4yMDExIDE0Ljg4MzdMMTQuNzk4OSAxNC44ODM3TDE0Ljc5ODkgMTMuMjUxOFpNNS4yMDExNCA4LjM3MzA0TDMuNTk3NzIgOC4zNzMwNEwzLjU5NzcyIDkuOTk5MjlMNS4yMDExNCA5Ljk5OTI5TDUuMjAxMTQgOC4zNzMwNFpNNS4yMDExNCAxMC4wMDVMMy41OTc3MiAxMC4wMDVMMy41OTc3MiAxMS42MzEyTDUuMjAxMTQgMTEuNjMxMkw1LjIwMTE0IDEwLjAwNVpNMy41OTc3MiAxMC4wMDVMMiAxMC4wMDVMMiAxMS42MzEyTDMuNTk3NzIgMTEuNjMxMkwzLjU5NzcyIDEwLjAwNVoiIGZpbGw9IiM0Yzk3ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIi8+CjxwYXRoIGQ9Ik0zLjU5NzcyIDExLjYyNTVMMiAxMS42MjU1TDIgMTMuMjUxOEwzLjU5NzcyIDEzLjI1MThMMy41OTc3MiAxMS42MjU1Wk0zLjU5NzcyIDEzLjI1MThMMiAxMy4yNTE4TDIgMTQuODgzN0wzLjU5NzcyIDE0Ljg4MzdMMy41OTc3MiAxMy4yNTE4Wk04LjQwMjI4IDE0Ljg3MjNMNi43OTg4NiAxNC44NzIzTDYuNzk4ODYgMTYuNTA0M0w4LjQwMjI4IDE2LjUwNDNMOC40MDIyOCAxNC44NzIzWk0xMy4yMDY4IDE0Ljg3MjNMMTEuNjAzNCAxNC44NzIzTDExLjYwMzQgMTYuNTA0M0wxMy4yMDY4IDE2LjUwNDNMMTMuMjA2OCAxNC44NzIzWk0xNi40MDIzIDguMzczMDRMMTQuNzk4OSA4LjM3MzA0TDE0Ljc5ODkgOS45OTkyOUwxNi40MDIzIDkuOTk5MjlMMTYuNDAyMyA4LjM3MzA0Wk0xNi40MDIzIDEwLjAwNUwxNC43OTg5IDEwLjAwNUwxNC43OTg5IDExLjYzMTJMMTYuNDAyMyAxMS42MzEyTDE2LjQwMjMgMTAuMDA1WiIgZmlsbD0iIzRjOTdmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIxIiBzdHJva2U9Im5vbmUiLz4KPHBhdGggZD0iTTE4IDEwLjAwNUwxNi4zOTY2IDEwLjAwNUwxNi4zOTY2IDExLjYzMTJMMTggMTEuNjMxMkwxOCAxMC4wMDVaIiBmaWxsPSIjNGM5N2ZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8cGF0aCBkPSJNMTggMTEuNjI1NUwxNi4zOTY2IDExLjYyNTVMMTYuMzk2NiAxMy4yNTE4TDE4IDEzLjI1MThMMTggMTEuNjI1NVpNMTggMTMuMjUxOEwxNi4zOTY2IDEzLjI1MThMMTYuMzk2NiAxNC44ODM3TDE4IDE0Ljg4MzdMMTggMTMuMjUxOFoiIGZpbGw9IiM0Yzk3ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIi8+CjwvZz4KPC9zdmc+Cg==';
    /* eslint-enable max-len */

    class PixelGalleryBlocks {
        static get EXTENSION_ID () {
            return 'pixelGallery';
        }

        static get EXTENSION_NAME () {
            return formatMessage({
                id: 'pixelGallery.name',
                default: 'Pixel Gallery'
            });
        }

        constructor () {
            this.runtime = Scratch.vm.runtime;
            this._gallery = [];
        }

        initialList () {
            const uniqueLists = this._getUniqueLists();
            if (uniqueLists.length === 0) {
                const stage = this.runtime.getTargetForStage();
                const target = this.runtime.getEditingTarget();
                if (!stage || !target) return;
                const variable = this.runtime.createNewGlobalVariable(
                    formatMessage({
                        id: 'pixelGallery.defaultVariableName',
                        default: 'my gallery'
                    }),
                    null,
                    'list'
                );
                uniqueLists.push(variable);
                // update blocks
                // ? Why
                Scratch.vm.setEditingTarget(stage.id);
                Scratch.vm.setEditingTarget(target.id);
            }
        }

        setupAddon () {
            Scratch.gui.addon({
                id: PixelGalleryBlocks.EXTENSION_ID,
                type: 'tab',
                icon: TAB_ICON,
                title: PixelGalleryBlocks.EXTENSION_NAME,
                didMount: element => {
                    if (element) {
                        const pixelGallery = document.createElement('pixel-gallery');
                        pixelGallery.addEventListener('menu', e => {
                            e.detail.resolve(this.LISTS_MENU());
                        });
                        pixelGallery.addEventListener('list', e => {
                            const images = this._getGallery(e.detail.id)
                            e.detail.resolve(images);
                        });
                        pixelGallery.addEventListener('open', e => {
                            const {id, index} = e.detail;
                            if (index === -1) return;
                            const data = this._getValue(id, index);
                            e.detail.resolve(data);
                        });
                        pixelGallery.addEventListener('save', e => {
                            const {id, index, name, data, width, height} = e.detail;
                            this._addValue(id, index, {
                                name,
                                data,
                                width,
                                height
                            });
                        })
                        pixelGallery.addEventListener('delete', e => {
                            const {id, index} = e.detail;
                            this._removeValue(id, index);
                        })
                        element.appendChild(pixelGallery);
                    }
                }
            });
        }

        getInfo () {
            this.initialList();
            this.setupAddon();
            return {
                id: PixelGalleryBlocks.EXTENSION_ID,
                name: PixelGalleryBlocks.EXTENSION_NAME,
                blockIconURI,
                blocks: [
                    {
                        blockType: BlockType.BUTTON,
                        func: 'MAKE_A_LIST',
                        text: formatMessage({
                            id: 'pixelGallery.makeAGallery',
                            default: 'Make a List as a Gallery'
                        })
                    },
                    {
                        opcode: 'getValue',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'pixelGallery.getValue',
                            default: 'image [INDEX] of [GALLERY]'
                        }),
                        arguments: {
                            INDEX: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            GALLERY: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    },
                    {
                        opcode: 'getDesc',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'pixelGallery.getDesc',
                            default: '[DESC] of image [INDEX] of [GALLERY]'
                        }),
                        arguments: {
                            DESC: {
                                type: ArgumentType.STRING,
                                menu: 'imageDesc'
                            },
                            INDEX: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            GALLERY: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    },
                    {
                        opcode: 'getValueByName',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'pixelGallery.getValueByName',
                            default: 'image name [NAME] of [GALLERY]'
                        }),
                        arguments: {
                            NAME: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'pixelGallery.defaultName',
                                    default: 'one'
                                }),
                            },
                            GALLERY: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    },
                    {
                        opcode: 'getDescByName',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'pixelGallery.getDescByName',
                            default: '[DESC] of image name [NAME] of [GALLERY]'
                        }),
                        arguments: {
                            DESC: {
                                type: ArgumentType.STRING,
                                menu: 'imageDesc'
                            },
                            NAME: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'pixelGallery.defaultName',
                                    default: 'one'
                                }),
                            },
                            GALLERY: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    },
                    {
                        opcode: 'getLength',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'pixelGallery.getLength',
                            default: 'length of [GALLERY]'
                        }),
                        arguments: {
                            GALLERY: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    },
                    {
                        opcode: 'isContains',
                        blockType: BlockType.BOOLEAN,
                        text: formatMessage({
                            id: 'pixelGallery.isContains',
                            default: '[GALLERY] contains image [NAME]?'
                        }),
                        arguments: {
                            GALLERY: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            },
                            NAME: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'pixelGallery.defaultName',
                                    default: 'one'
                                }),
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'showGallery',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'pixelGallery.showGallery',
                            default: 'show gallery [GALLERY]'
                        }),
                        arguments: {
                            GALLERY: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    },
                    {
                        opcode: 'hideGallery',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'pixelGallery.hideGallery',
                            default: 'hide gallery [GALLERY]'
                        }),
                        arguments: {
                            GALLERY: {
                                type: ArgumentType.STRING,
                                menu: 'LISTS'
                            }
                        }
                    }
                ],
                menus: {
                    LISTS: {
                        items: 'LISTS_MENU'
                    },
                    imageDesc: {
                        acceptReporters: false,
                        items: this.IMAGE_DESC_MENU
                    }
                }
            }
        }

        get IMAGE_DESC_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'pixelGallery.imageDesc.width',
                        default: 'width'
                    }),
                    value: 'width'
                },
                {
                    text: formatMessage({
                        id: 'pixelGallery.imageDesc.height',
                        default: 'height'
                    }),
                    value: 'height'
                },
            ];
        }

        LISTS_MENU () {
            const uniqueLists = this._getUniqueLists();
            if (uniqueLists.length === 0) {
                this.initialList();
            }
            return uniqueLists.map(i => ({
                text: i.name,
                value: i.id
            }));
        }

        _getUniqueLists () {
            const stage = this.runtime.getTargetForStage();
            const target = this.runtime.getEditingTarget();
            const globalLists = stage ? Object.values(stage.variables).filter(this._filter) : [];
            const localLists = target ? Object.values(target.variables).filter(this._filter) : [];
            return [...new Set([...globalLists, ...localLists])];
        }

        _filter (item) {
            if (item.type !== 'list' || !Array.isArray(item.value)) {
                return false;
            }
            if (item.value.length === 0) {
                return true;
            }
            const imageType = encodeURIComponent('data:image/png;base64');
            return item.value.every(item => {
                const arr = `${item}`.split(',');
                return arr.length > 1 && arr[1] && arr[1].includes(imageType);
            });
        }

        _getGallery (id) {
            const list = this.runtime.getEditingTarget().lookupVariableById(id);
            if (list) {
                if (!this._gallery[id]) {
                    this._initialGallery(id, list)
                }
                return this._gallery[id];
            }
        }

        _getValue (id, index) {
            if (!this._gallery[id]) {
                const list = this.runtime.getEditingTarget().lookupVariableById(id);
                this._initialGallery(id, list);
            }
            return (this._gallery[id][index] && this._gallery[id][index].data) || '';
        }

        _addValue (id, index, value) {
            const list = this.runtime.getEditingTarget().lookupVariableById(id);
            if (list) {
                if (!this._gallery[id]) {
                    this._initialGallery(id, list)
                }
                this._gallery[id][index] = value;
                this._updateList(list);
            }
        }

        _removeValue (id, index) {
            const list = this.runtime.getEditingTarget().lookupVariableById(id);
            if (list) {
                if (!this._gallery[id]) {
                    this._initialGallery(id, list);
                }
    
                this._gallery[id].splice(index, 1);
                this._updateList(list);
            }
        }

        _initialGallery(id, list) {
            this._gallery[id] = list ? (list.value.reduce((result, item) =>  {
                const [name, data, width, height] = item.split(',');
                result.push({
                    name: decodeURIComponent(name),
                    data: decodeURIComponent(data),
                    width: parseInt(width),
                    height: parseInt(height),
                });
                return result;
            }, [])) : [];
        }

        _updateList (list) {
            const id = list.id;
            list.value = Object.values(this._gallery[id])
                .map(value => `${encodeURIComponent(value.name)},${encodeURIComponent(value.data)},${value.width},${value.height}`);
        }

        getValue (args, util) {
            const id = Cast.toString(args.GALLERY);
            const index = Cast.toNumber(args.INDEX) - 1;
            if (!this._gallery[id]) {
                const list = util.target.lookupVariableById(id);
                this._initialGallery(id, list);
            }
            return (this._gallery[id][index] && this._gallery[id][index].data) || '';
        }

        getDesc (args, util) {
            const id = Cast.toString(args.GALLERY);
            const desc = Cast.toString(args.DESC);
            const index = Cast.toNumber(args.INDEX) - 1;
            if (!this._gallery[id]) {
                const list = util.target.lookupVariableById(id);
                this._initialGallery(id, list);
            }
            return (this._gallery[id][index] && this._gallery[id][index][desc]) || '';
        }

        getValueByName (args, util) {
            const id = Cast.toString(args.GALLERY);
            if (!this._gallery[id]) {
                const list = util.target.lookupVariableById(id);
                this._initialGallery(id, list);
            }
            const name = Cast.toString(args.NAME);
            const index = this._gallery[id].findIndex(value => value.name === name);
            return (this._gallery[id][index] && this._gallery[id][index].data) || '';
        }

        getDescByName (args, util) {
            const id = Cast.toString(args.GALLERY);
            const desc = Cast.toString(args.DESC);
            if (!this._gallery[id]) {
                const list = util.target.lookupVariableById(id);
                this._initialGallery(id, list);
            }
            const name = Cast.toString(args.NAME);
            const index = this._gallery[id].findIndex(value => value.name === name);
            return (this._gallery[id][index] && this._gallery[id][index][desc]) || '';
        }

        getLength (args, util) {
            const id = Cast.toString(args.GALLERY);
            if (!this._gallery[id]) {
                const list = util.target.lookupVariableById(id);
                this._initialGallery(id, list);
            }
            return Object.keys(this._gallery[id]).length;
        }

        isContains (args) {
            const id = Cast.toString(args.GALLERY);
            const name = Cast.toString(args.NAME);
            const index = this._gallery[id].findIndex(value => value.name === name);
            return !!(this._gallery[id] && this._gallery[id][index]);
        }

        showGallery (args) {
            const id = Cast.toString(args.GALLERY);
            this._changeMonitorVisibility(id, true);
        }

        hideGallery (args) {
            const id = Cast.toString(args.GALLERY);
            this._changeMonitorVisibility(id, false);
        }

        _changeMonitorVisibility (id, visible) {
            // Send the monitor blocks an event like the flyout checkbox event.
            // This both updates the monitor state and changes the isMonitored block flag.
            this.runtime.monitorBlocks.changeBlock({
                id: id, // Monitor blocks for variables are the variable ID.
                element: 'checkbox', // Mimic checkbox event from flyout.
                value: visible
            }, this.runtime);
        }
    }

    Scratch.extensions.register(new PixelGalleryBlocks());

    Scratch.extensions.translations({
        en: {
            'pixelGallery.name': 'Pixel Gallery',
            'pixelGallery.makeAGallery': 'Make a List as a Gallery',
            'pixelGallery.defaultName': 'one',
            'pixelGallery.getValue': 'image [INDEX] of [GALLERY]',
            'pixelGallery.getValueByName': 'image name [NAME] of [GALLERY]',
            'pixelGallery.getDesc': '[DESC] of image [INDEX] of [GALLERY]',
            'pixelGallery.getDescByName': '[DESC] of image name [NAME] of [GALLERY]',
            'pixelGallery.imageDesc.width': 'width',
            'pixelGallery.imageDesc.height': 'height',
            'pixelGallery.getLength': 'length of [GALLERY]',
            'pixelGallery.isContains': '[GALLERY] contains image name [NAME]?',
            'pixelGallery.showGallery': 'show gallery [GALLERY]',
            'pixelGallery.hideGallery': 'hide gallery [GALLERY]',
            'pixelGallery.defaultVariableName': 'my pixel gallery',
        },
        'zh-cn': {
            'pixelGallery.name': '像素图库',
            'pixelGallery.makeAGallery': '建立一个列表作为图库',
            'pixelGallery.defaultName': '一个',
            'pixelGallery.getValue': '[GALLERY] 的第 [INDEX] 项图像',
            'pixelGallery.getValueByName': '[GALLERY] 名称为 [NAME] 的图像',
            'pixelGallery.getDesc': '[GALLERY] 的第 [INDEX] 项图像的 [DESC]',
            'pixelGallery.getDescByName': '[GALLERY] 名称为 [NAME] 的图像的 [DESC]',
            'pixelGallery.imageDesc.width': '宽',
            'pixelGallery.imageDesc.height': '高',
            'pixelGallery.getLength': '[GALLERY] 的图像数',
            'pixelGallery.isContains': '[GALLERY] 包含 [NAME] 名称的图像?',
            'pixelGallery.showGallery': '显示图库 [GALLERY]',
            'pixelGallery.hideGallery': '隐藏图库 [GALLERY]',
            'pixelGallery.defaultVariableName': '我的像素图库',
        },
        'zh-tw': {
            'pixelGallery.name': '像素圖庫',
            'pixelGallery.makeAGallery': '建立一個清單作為圖庫',
            'pixelGallery.defaultName': '一個',
            'pixelGallery.getValue': '[GALLERY] 的第 [INDEX] 項圖像',
            'pixelGallery.getValueByName': '[GALLERY] 名稱為 [NAME] 的圖像',
            'pixelGallery.getDesc': '[GALLERY] 的第 [INDEX] 項圖像的 [DESC]',
            'pixelGallery.getDescByName': '[GALLERY] 名稱為 [NAME] 的圖像的 [DESC]',
            'pixelGallery.imageDesc.width': '寬',
            'pixelGallery.imageDesc.height': '高',
            'pixelGallery.getLength': '[GALLERY] 的圖像數',
            'pixelGallery.isContains': '[GALLERY] 包含 [NAME] 名稱的圖像?',
            'pixelGallery.showGallery': '顯示圖庫 [GALLERY]',
            'pixelGallery.hideGallery': '隱藏圖庫 [GALLERY]',
            'pixelGallery.defaultVariableName': '我的像素圖庫',
        }
    });
})(Scratch, require);
