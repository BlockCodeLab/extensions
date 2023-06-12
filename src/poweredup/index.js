// https://github.com/bricklife/scratch-lego-bluetooth-extensions/tree/master/scratch-vm/src/extensions/scratch3_poweredup
(async function (Scratch) {
    const BleBaseBlocks = await Scratch.require('../legoble/ble-base-blocks.js');
    const Hub = await Scratch.require('../legoble/hub.js');

    const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAASKG51AAAByElEQVR4Ae3YP07DMBiG8QS4ACdBYmQtlwCmzhwAkICFSvzZmZkoCxyBlZ2TcIOEtJKrqlL6fGlqCdonS9y88WfnV0eWUhQeCiiggAIKKKCAAgoooIACCiiggAIKKKCAAgoooIACCiiQV6DsUv728W1QVfWwLIvduiw/Rhcn75P+m3o9YrMXuSndU9XVU9M+rOuiaOSPm/YUcFOvp+dedsYVeH3/2nBt7zG6OltqtLO9NOt58vArfHd5up4RF6rcPIynV3LVXxgu/DPNizqEASeFIkUTRJd7aZJ/OfcV7vnvdFqBaayjg/3UnJ2/vn9m7flGl3vn+/2X9tIdZvIQ7sLuwlkXc/gVPh8Oskzk+eVzWjdX/VUnneZF/d1ESAhyAQGIYgFJCHIBAYhiAUkIcgEBiGIBSQhyAQGIYgFJCHIBAYhiAUkIcgEBiGIBSQhyAQGIYgFJCPLw98Do9zEYrzXOXb914J6BK7AnYHgF5vpinFZervqr+qR5UX9XIAlBLiAAUSwgCUEuIABRLCAJQR7ehaO7EozXGueu3zpwz8AV2BPQ7goooIACCiiggAIKKKCAAgoooIACCiiggAIKKKCAAgookFvgF1zdypav+pVRAAAAAElFTkSuQmCC';

    const formatMessage = Scratch.formatMessage;

    class Scratch3PoweredUpBlocks extends BleBaseBlocks {

        static get EXTENSION_ID() {
            return 'poweredup';
        }

        constructor() {
            super(new Hub(Scratch.vm.runtime, Scratch3PoweredUpBlocks.EXTENSION_ID, 0x41));
        }

        get externalPorts() {
            return ['A', 'B'];
        }

        get multipleExternalPorts() {
            return ['A', 'B', 'A+B'];
        }

        get hasInternalTiltSensorBlocks() {
            return false;
        }

        getInfo() {
            return {
                id: Scratch3PoweredUpBlocks.EXTENSION_ID,
                name: 'Powered UP',
                extensionURL: Scratch3PoweredUpBlocks.extensionURL,
                blockIconURI: blockIconURI,
                showStatusButton: true,
                blocks: this.getBlocks(formatMessage),
                menus: this.getMenus(formatMessage)
            };
        }
    }

    Scratch.extensions.register(new Scratch3PoweredUpBlocks());
})(window.Scratch);
