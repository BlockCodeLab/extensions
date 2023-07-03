// https://github.com/bricklife/scratch-lego-bluetooth-extensions/tree/master/scratch-vm/src/extensions/scratch3_spikeessential
(async function (Scratch, require) {
    const BleBaseBlocks = await require('../legoble/ble-base-blocks.js');
    const Hub = await require('../legoble/hub.js');

    const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAAx4ExPAAADMElEQVR4Ae3bT2gTQRQG8LetpI1GK4iUKhRSoQhVMfRealAEr4J40It/ToLgSVFEPHjoqSdv6kVBQXoVBIk2IHjRQjUVBKkKKh7VaBrFrvttM5ApSX3TyHYSvoGwmc2b2X2/ziS7dEeEhQIUoAAFKEABClCAAhSgAAUoQAEKUIACFKAABSiQhEDgepAwDIMrE/dORduTUduRUMKMax8+xQcSlKPzKQVBcPPq+aM3om3ocn5OgNcmpwYq1eodCcO8y0HaJjYICumenmOXzh3+rD3nddpAjLzLE3djvL5N6+XgvpxkB/sls6FX24WXceUfCzL/4Ys8fDwjX7/9zGOARLnu147Ebm1WYXrn6ajjs8A7c+KQbB/YIqmU2l97mMTjkEP/1s2S2z0ks3PvpFr9nZ1+Wvo4/WjqheZkujRBiKl958UjL92b0jZrmzjkhFmFYnLVnLwaMOpsBB1i2nZqqcstzlWTpxrQ/Nq2+3feSigmN5PrSrHmMzWgacCtLUBA28O5RkBnMrsBAW0P5xoBncnsBgS0PZxrBHQmsxsQ0PZwrhHQmcxuQEDbw7lGQGcyuwEBbQ/nGgGdyewGBLQ9nGsEdCazGxDQ9nCuEdCZzG7gzX+F/iwuSqE4KzOv5uV7uWKfZa22MZOW3K6s5Mf2SHeXH397bwCBV3w21xDO7ASsiTkwvtfsXtOtN4AYeSjHj4zL8NC2hihv3n6S2/efxKPUF0A/5kHEZaZtMzyIDu9YgjWxDZUT3ukNYMJ5/7fDEbBFSgISsEWBFptzBHYKIC6SUXCp0qyYz0xss7gk93tzHYg7DFwk4zrvXwWxvhRvAHF7hqK9lSPgMgHc2+LuAq+xi8+XfbpULV4Ybbh/LXfyR6RFfTVg7Wl2wTPFSZW+wVHBK6licjO5ao6rBow6K6FDPJDdqaUutzhXTZ5qQKyjQId4mr2y8EvTd1vFICfkhmJy1SSgBsQilKjnQrQUQK7feiAvX79PdDprkllNDKYtckFOyA05xrkqO+NCm3qoVSy0cQLEsaIlAFzqVY/O9xSgAAUoQAEKUIACFKAABShAAQpQgAIUoAAFKECBRAT+AigB5y5rdsAFAAAAAElFTkSuQmCC';

    const formatMessage = Scratch.formatMessage;

    class Scratch3SpikeEssentialBlocks extends BleBaseBlocks {

        static get EXTENSION_ID() {
            return 'spikeEssential';
        }

        constructor() {
            super(new Hub(Scratch.vm.runtime, Scratch3SpikeEssentialBlocks.EXTENSION_ID, 0x83));
        }

        get externalPorts() {
            return ['A', 'B'];
        }

        get multipleExternalPorts() {
            return ['A', 'B', 'A+B'];
        }

        getInfo() {
            return {
                id: Scratch3SpikeEssentialBlocks.EXTENSION_ID,
                name: 'SPIKE Essential',
                extensionURL: Scratch3SpikeEssentialBlocks.extensionURL,
                blockIconURI: blockIconURI,
                showStatusButton: true,
                blocks: this.getBlocks(formatMessage),
                menus: this.getMenus(formatMessage)
            };
        }

        getHubTilt(args) {
            const value = super.getHubTilt(args);
            return value != null ? value / 10 : 0;
        }
    }

    Scratch.extensions.register(new Scratch3SpikeEssentialBlocks());
})(Scratch, require);
