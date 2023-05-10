(function () {
    const Serial = Scratch.Serial;
    const log = Scratch.log;

    const WAIT_TIMEOUT = 60000;

    class Repl {
        constructor (runtime, extensionId) {
            this._serial = null;

            this._runtime = runtime;
            this._extensionId = extensionId;

            this._decoder = new TextDecoder();

            this._messages = '';
            this._busy = false;
            this._waitingFor = {};
            this._listening = {};

            this.reset = this.reset.bind(this);
            this._onConnect = this._onConnect.bind(this);
            this._onMessage = this._onMessage.bind(this);
        }

        // must override
        get filters () {
            throw new Error('must override');
        }

        scan () {
            if (this._serial) {
                this._serial.disconnect();
            }
            this._serial = new Serial(this._runtime, this._extensionId, {
                filters: this.filters
            }, this._onConnect, this.reset);
        }

        connect (id) {
            if (this._serial) {
                this._serial.connectPeripheral(id);
            }
        }

        disconnect () {
            if (this._serial) {
                this._serial.disconnect();
            }
            this.reset();
        }

        reset () {
            this._serial = null
            this._messages = '';
            this._busy = false;
            this._waitingFor = {};
            this._listening = {};
        }

        isConnected () {
            let connected = false;
            if (this._serial) {
                connected = this._serial.isConnected();
            }
            return connected;
        }

        _onConnect () {
            this._serial.ondata = this._onMessage;
        }

        _onMessage (data) {
            // log.log(this._decoder.decode(data));
            this._messages += this._decoder.decode(data);
            this._receiveWaiting();
            this._receiveListening();
        }

        _receiveWaiting () {
            Object.entries(this._waitingFor).forEach(([timer, promise]) => {
                let waitFor = promise.waitFor;
                if (waitFor instanceof RegExp) {
                    if (!waitFor.multiline) {
                        waitFor = new RegExp(promise.waitFor, `m${promise.waitFor.flags}`);
                    }
                    const found = waitFor.exec(this._messages);
                    if (found) {
                        promise.resolve(found);
                        this._messages = this._messages.replace(waitFor, '');
                        this._removeWaiting(timer);
                    }
                } else if (this._messages.includes(waitFor)) {
                    promise.resolve();
                    this._messages = this._messages.replace(waitFor, '');
                    this._removeWaiting(timer);
                } else if (/Error:/.test(waitFor)) {
                    promise.reject();
                }
            })
        }

        async write (message, waitFor, timeout) {
            if (this._busy) return;
            if (this.isConnected()) {
                this._busy = true;
                if (typeof message === 'string') {
                    await this._serial.write(message, 'text');
                } else {
                    await this._serial.write(message, 'binary');
                }
                this._busy = false;
                if (waitFor) {
                    return this._promisesTo(waitFor, timeout);
                }
            }
        }

        async transfer (buffer) {
            if (this._busy) return;
            if (this.isConnected()) {
                this._busy = true;
                await this._serial.transfer('code', buffer);
                this._busy = false;
            }
        }

        _promisesTo (waitFor, timeout = WAIT_TIMEOUT) {
            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => this._waitingTimeout(timer), timeout);
                this._waitingFor[timer] = {waitFor, resolve, reject};
            });
        }

        _waitingTimeout (timer) {
            const promise = this._waitingFor[timer];
            if (promise) {
                promise.reject(new Error(`wait for '${promise.waitFor}' timeout`));
            }
            this._removeWaiting(timer);
        }

        _removeWaiting (timer) {
            clearTimeout(timer);
            this._waitingFor[timer] = null;
            delete this._waitingFor[timer];
        }

        on (finder, handler) {
            const name = `${finder}`;
            if (!finder.multiline) {
                finder = new RegExp(finder, `m${finder.flags}`);
            }
            this._listening[name] = [finder, handler];
        }

        off (finder) {
            const name = `${finder}`;
            delete this._listening[name];
        }

        _receiveListening () {
            Object.values(this._listening).forEach(([finder, handler]) => {
                const found = finder.exec(this._messages);
                if (found) {
                    handler(found);
                    this._messages = this._messages.replace(finder, '');
                }
            });
        }
    }

    Scratch.export(Repl);
})();
