// https://github.com/microbit-more/mbit-more-v2/blob/master/src/vm/extensions/block/index.js
(function () {
    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    const Base64Util = Scratch.Base64Util;
    const formatMessage = Scratch.formatMessage;
    const Cast = Scratch.Cast;
    const log = Scratch.log;

    const BLE = Scratch.BLE;

    /**
     * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
     * @type {string}
     */
    // eslint-disable-next-line max-len
    const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAABZLkSWAAAAHGlET1QAAAACAAAAAAAAABQAAAAoAAAAFAAAABQAAAMTlIs5hQAAAt9JREFUWAliYBgFoyEwGgK0D4Gysrm8lW0LhUsaFomBcEX7UsHShvkStLKZSVxcnFtbVJSHWLxk1Y5Du/adeHbq9KUXILxj99FHcxZu2UOsfpA6PaCdQA8xEfIU8+ap8lu/HWP+9/8Mw390PKtVFy72fDfX/9UTVcH8vfPk/jt7hP53dA8nH7uFvbW190kFOpARpyNDbSVEf59kwuq4KY0G/338AsEOAjkuItzn/4JO7f9UcRzUYw5uYY+kpKS4cDqwOF1FCz3UQHyQ40ChA3IgzHEgfkaSCzjkXDxD/2cmu/zPSXUC4/QkV6D6MHJC8yPJDoQ5DuQgN+8QcMihR+WBBTL/J9QZ/a8vsgJjUFJYN1mF9g5Edhy6o5D51zcI/c9Nc/zv5hXyPzjEDxyyF1aL0taBxDoO5NDaQuv/++bL/t86QxGMQSGal+ZEOweS4jjkkCSVHR3p+X/PfLX/D7bx/Z/RrAfyEOE0SKzjPPxi//sEJoBDKSAs5b+LV+R/N5/o/37BSWAxEA3ig8RB8tgcnxjr/v/5Hj5wcQVK3wQdqGNqJ4vNIGxifRNn/d+0ZSfY4guXrv5PzSz7X1XX8f/Q4eNgMRAN4oPEQfLYzADl+p2z5f97+gbB5PGHIMyBbl5R/1OABqdklkNxxX8njwiYIWDawTXkv71LMJht5wKyIOy/g1soXAwkB+KDxCHyiEIcj/nEOTC3qOH/nXsP/x89ceb/qbMX/9+8ff9/VHwu2DGwkCgqa/rf0z8DLLZw6er/4bHZ/1Ozyv5Pn7UILAaiQXyQOEgepg9E4zGfsAMzc6v+l1e3/z905MT/kMj0//Ephf9Pn730PzohH8WS5IyS/+U1LWCxrt4p//1Dk4CeyPnf2NwDFgPRID5IvKt3More3MI6DPMzcqr+Z+fXfMZbUIOiuKyq7X91fc//I0dPAh2Y8T8upeD/GSwOpCSTgByIbn5uUd3/itqOL+gOBAAAAP//i1LovAAAA+xJREFUY2BAAjqmdrKO7uH/swvq/t+5+/D/0WOn/588ff7/zdv3/8ck5v8HycFw38RZ/zdt2QnmX7h09X9qZtn/qrqO/4cOHweLgWgQHyQOkofpI2D+RykpKS4kJ6EyYQ509Y76n5JZ8T8tq+R/ckbZ/+S00v9OHhEolji4hvy3dwkGi9m5BAHpsP8ObqFwMZAciA8Sh8gjPAczH2w2qvnEORDkS/+AgP9HFkn9j4v2RHEYLCSKypr+9/TPAMstXLr6f3hs9v/UrLL/02ctAouBaBAfJA6Sh+kjQBPnQG+/oP/bZyr8f7Of639wiB9Ww5MzSv6X17SA5bp6p/z3D036HxWf87+xuQcsBqJBfJB4V+9krGZgcSxxDlzZr/b/3la+/3vmq4JDEotB/z38Yv/7BCaALQ4IS/nv4hX5380n+r9fcBJYDESD+CBxkDw2M7CIEedALBoxLKAkk+Axn3oOpCSTUOzAvGTHN62FBn0VGTbXkQ2Lj/L8u6BRY92yVrWT/v4BKKGaGO3xf0mL2va5DRr70OXCQnz/L21T3b2gWX1neKgPkr6w/7MbdG4salZdkp/i+BVoF3EhuKBJ4wiwAGJc3qo019kDVFRAioieMuPHCgoKHHnhyjothRZwcZD8xErDd+Li4tyGhhKiDflWv2F6QHRXmcl3JSVBfiUlJf7mQvPvMLnocK//cxtUioB2scyq17kIFCfswKQY9/83lgn+2TdV+uyLDVy/2otN/3eVmvzvLDH5v2OSwv/js8XvXFki9HZNt8r/lkLz/21A+Z4yo/+7psj9PzlX/MGFhSIvN/Yq/W8uMP/fWmj2v7/C6P/6HuX/p+eJPT42W+Lhln5FsL7WIvP/M+p0/99dxf91/zTp80dnSf1NjHb/TLCgXtqm8f/hGt7/D9aK/v+/n+H/47Xc/79sZ/n/cRvr/weref+/3swLFn8CFAepe7eZ/f/3nUz/n63n/v9xO+f/T9s5/r/bygaWA3oQrPb5eq7/TzcIgvU+B4o9Xsvz/8k6brC+K8tk/x+dq/F/z1Sl/4tbNL/jdaCKkArfig717yCLQRZhc+DP3cw4Hfh1J9t/kDw2B4IcD5JHd+CrzXz/QfjILJn/KzrUXsnIyHCi1m+oPMbuEu3yDb2Kp+c1KNccniFx/NIioQ93V/B9ubWc//P5+SJvFzUptS9vU5x4banQR2B0vr+xTOATMGS/XF4s9A4md28V7+cLi0Q+XF0i9PHpOq5vl5cIf1jSotS/qEm5E6j+w4VFwh8uLRb+ANK3Y6LM9nkNSnXL2lRPTKtUTQSlfVQnYeFpa2uzDQTG4pRRodEQGA2BIR8CAIqTR/xc+hsRAAAAAElFTkSuQmCC';

    /**
     * Enum for version of the hardware.
     * @readonly
     * @enum {number}
     */
    const MbitMoreHardwareVersion =
    {
        MICROBIT_V1: 1,
        MICROBIT_V2: 2
    };

    /**
     * Communication route between Scratch and micro:bit
     *
     */
    const CommunicationRoute = {
        BLE: 0,
        SERIAL: 1
    };

    /**
     * Enum for micro:bit BLE command protocol.
     * https://github.com/LLK/scratch-microbit-firmware/blob/master/protocol.md
     * @readonly
     * @enum {number}
     */
    const BLECommand = {
        CMD_CONFIG: 0x00,
        CMD_PIN: 0x01,
        CMD_DISPLAY: 0x02,
        CMD_AUDIO: 0x03,
        CMD_DATA: 0x04
    };

    /**
     * Enum for command about gpio pins.
     * @readonly
     * @enum {number}
     */
    const MbitMorePinCommand =
    {
        SET_OUTPUT: 0x01,
        SET_PWM: 0x02,
        SET_SERVO: 0x03,
        SET_PULL: 0x04,
        SET_EVENT: 0x05
    };

    /**
     * Enum for command about gpio pins.
     * @readonly
     * @enum {number}
     */
    const MbitMoreDisplayCommand =
    {
        CLEAR: 0x00,
        TEXT: 0x01,
        PIXELS_0: 0x02,
        PIXELS_1: 0x03
    };

    /**
     * Enum for name of pull mode.
     * @readonly
     * @enum {number}
     */
    const MbitMorePullModeName = {
        NONE: 'NONE',
        DOWN: 'DOWN',
        UP: 'UP'
    };

    /**
     * Enum for ID of pull mode.
     * @readonly
     * @enum {number}
     */
    const MbitMorePullModeID = {
        NONE: 0,
        DOWN: 1,
        UP: 2
    };

    /**
     * Enum for data format.
     * @readonly
     * @enum {number}
     */
    const MbitMoreDataFormat = {
        CONFIG: 0x10, // not used at this version
        PIN_EVENT: 0x11,
        ACTION_EVENT: 0x12,
        DATA_NUMBER: 0x13,
        DATA_TEXT: 0x14
    };

    /**
     * Enum for action event type.
     * @readonly
     * @enum {number}
     */
    const MbitMoreActionEvent = {
        BUTTON: 0x01,
        GESTURE: 0x02
    };

    /**
     * Enum for ID of pin-mode
     * @readonly
     * @enum {string}
     */
    const MbitMorePinMode = {
        INPUT: 'INPUT',
        OUTPUT: 'OUTPUT',
        PWM: 'PWM',
        SERVO: 'SERVO',
        TOUCH: 'TOUCH'
    };

    /**
     * Enum for ID of buttons
     * @readonly
     * @enum {string}
     */
    const MbitMoreButtonName = {
        P0: 'P0',
        P1: 'P1',
        P2: 'P2',
        A: 'A',
        B: 'B',
        LOGO: 'LOGO'
    };

    /**
     * Enum for componentID of buttons
     * @readonly
     * @enum {string}
     */
    const MbitMoreButtonID = {
        1: 'A',
        2: 'B',
        100: 'P0',
        101: 'P1',
        102: 'P2',
        121: 'LOGO'
    };

    /**
     * Enum for index of pin for buttons
     * @readonly
     * @enum {number}
     */
    const MbitMoreButtonPinIndex = {
        P0: 0,
        P1: 1,
        P2: 2
    };

    /**
     * Enum for index in data of button state
     * @readonly
     * @enum {number}
     */
    const MbitMoreButtonStateIndex = {
        P0: 0,
        P1: 1,
        P2: 2,
        A: 3,
        B: 4,
        LOGO: 5
    };

    /**
     * Enum for name of event from button
     * @readonly
     * @enum {string}
     */
    const MbitMoreButtonEventName = {
        DOWN: 'DOWN',
        UP: 'UP',
        CLICK: 'CLICK',
        LONG_CLICK: 'LONG_CLICK',
        HOLD: 'HOLD',
        DOUBLE_CLICK: 'DOUBLE_CLICK'
    };

    /**
     * Enum for ID of event from button
     * @readonly
     * @enum {string}
     */
    const MbitMoreButtonEventID = {
        1: 'DOWN',
        2: 'UP',
        3: 'CLICK',
        4: 'LONG_CLICK',
        5: 'HOLD',
        6: 'DOUBLE_CLICK'
    };

    /**
     * Enum for name of gesture.
     * @readonly
     * @enum {string}
     */
    const MbitMoreGestureName =
    {
        TILT_UP: 'TILT_UP',
        TILT_DOWN: 'TILT_DOWN',
        TILT_LEFT: 'TILT_LEFT',
        TILT_RIGHT: 'TILT_RIGHT',
        FACE_UP: 'FACE_UP',
        FACE_DOWN: 'FACE_DOWN',
        FREEFALL: 'FREEFALL',
        G3: 'G3',
        G6: 'G6',
        G8: 'G8',
        SHAKE: 'SHAKE'
    };

    /**
     * Enum for ID of gesture.
     * @readonly
     * @enum {string}
     */
    const MbitMoreGestureID =
    {
        1: 'TILT_UP',
        2: 'TILT_DOWN',
        3: 'TILT_LEFT',
        4: 'TILT_RIGHT',
        5: 'FACE_UP',
        6: 'FACE_DOWN',
        7: 'FREEFALL',
        8: 'G3',
        9: 'G6',
        10: 'G8',
        11: 'SHAKE'
    };

    /**
     * Enum for event type in the micro:bit runtime.
     * @readonly
     * @enum {number}
     */
    const MbitMorePinEventType = {
        NONE: 0,
        ON_EDGE: 1,
        ON_PULSE: 2,
        ON_TOUCH: 3
    };

    /**
     * Enum for event value in the micro:bit runtime.
     * @readonly
     * @enum {number}
     */
    const MbitMorePinEvent = {
        RISE: 2,
        FALL: 3,
        PULSE_HIGH: 4,
        PULSE_LOW: 5
    };

    /**
     * Enum for data type of data-sending.
     * @readonly
     * @enum {number}
     */
    const MbitMoreSendingDataType = {
        NUMBER: 1,
        TEXT: 2
    };

    /**
     * Enum for sub-command about configurations.
     * @readonly
     * @enum {number}
     */
    const MbitMoreConfig =
    {
        MIC: 0x01,
        TOUCH: 0x02
    };

    /**
     * Enum for sub-command about audio.
     * @readonly
     * @enum {number}
     */
    const MbitMoreAudioCommand =
    {
        STOP_TONE: 0x00,
        PLAY_TONE: 0x01
    };

    /**
     * A time interval to wait (in milliseconds) before reporting to the BLE socket
     * that data has stopped coming from the peripheral.
     */
    const BLETimeout = 4500;


    /**
     * A string to report to the BLE socket when the micro:bit has stopped receiving data.
     * @type {string}
     */
    const BLEDataStoppedError = 'micro:bit extension stopped receiving data';

    const MM_SERVICE = {
        NAME_PREFIX: 'BBC micro:bit',
        ID: '0b50f3e4-607f-4151-9091-7d008d6ffc5c',
        COMMAND_CH: '0b500100-607f-4151-9091-7d008d6ffc5c',
        STATE_CH: '0b500101-607f-4151-9091-7d008d6ffc5c',
        MOTION_CH: '0b500102-607f-4151-9091-7d008d6ffc5c',
        PIN_EVENT_CH: '0b500110-607f-4151-9091-7d008d6ffc5c',
        ACTION_EVENT_CH: '0b500111-607f-4151-9091-7d008d6ffc5c',
        ANALOG_IN_CH: [
            '0b500120-607f-4151-9091-7d008d6ffc5c',
            '0b500121-607f-4151-9091-7d008d6ffc5c',
            '0b500122-607f-4151-9091-7d008d6ffc5c'
        ],
        MESSAGE_CH: '0b500130-607f-4151-9091-7d008d6ffc5c'
    };

    /**
     * Enum for axis menu options.
     * @readonly
     * @enum {string}
     */
    const AxisSymbol = {
        X: 'x',
        Y: 'y',
        Z: 'z',
        Absolute: 'absolute'
    };

    /**
     * The unit-value of the gravitational acceleration from Micro:bit.
     * @type {number}
     */
    const G = 1024;

    /**
     * Manage communication with a MicroBit peripheral over a Scrath Link client socket.
     */
    class MbitMore {

        /**
         * Construct a MicroBit communication object.
         * @param {Runtime} runtime - the Scratch 3.0 runtime
         * @param {string} extensionId - the id of the extension
         */
        constructor (runtime, extensionId) {

            /**
             * The Scratch 3.0 runtime used to trigger the green flag button.
             * @type {Runtime}
             * @private
             */
            this.runtime = runtime;

            /**
             * The BluetoothLowEnergy connection socket for reading/writing peripheral data.
             * @type {BLE}
             * @private
             */
            this._ble = null;
            this.runtime.registerPeripheralExtension(extensionId, this);

            /**
             * The id of the extension this peripheral belongs to.
             */
            this._extensionId = extensionId;

            this.digitalLevel = {};
            this.lightLevel = 0;
            this.temperature = 0;
            this.soundLevel = 0;
            this.pitch = 0;
            this.roll = 0;
            this.acceleration = {
                x: 0,
                y: 0,
                z: 0
            };
            this.compassHeading = 0;
            this.magneticForce = {
                x: 0,
                y: 0,
                z: 0
            };

            this.buttonState = {};

            /**
             * The most recently received button events for each buttons.
             * @type {Object} - Store of buttons which has events.
             * @private
             */
            this.buttonEvents = {};
            Object.keys(MbitMoreButtonStateIndex).forEach(name => {
                this.buttonEvents[name] = {};
            });

            /**
             * The most recently received gesture events.
             * @type {Object <number, number>} - Store of gesture ID and timestamp.
             * @private
             */
            this.gestureEvents = {};


            /**
             * The most recently received events for each pin.
             * @type {Object} - Store of pins which has events.
             * @private
             */
            this._pinEvents = {};

            /**
             * The most recently received data from micro:bit.
             * @type {Object} - Store of received data
             * @private
             */
            this.receivedData = {};

            this.analogIn = [0, 1, 2];
            this.analogValue = [];
            this.analogIn.forEach(pinIndex => {
                this.analogValue[pinIndex] = 0;
            });

            this.gpio = [
                0, 1, 2,
                8,
                12, 13, 14, 15, 16
            ];
            this.gpio.forEach(pinIndex => {
                this.digitalLevel[pinIndex] = 0;
            });

            /**
             * Interval ID for data reading timeout.
             * @type {number}
             * @private
             */
            this._timeoutID = null;

            /**
             * A flag that is true while we are busy sending data to the BLE socket.
             * @type {boolean}
             * @private
             */
            this.bleBusy = true;

            /**
             * ID for a timeout which is used to clear the busy flag if it has been
             * true for a long time.
             */
            this.bleBusyTimeoutID = null;

            this.onDisconnect = this.onDisconnect.bind(this);
            this._onConnect = this._onConnect.bind(this);
            this.onNotify = this.onNotify.bind(this);

            this.stopTone = this.stopTone.bind(this);
            if (this.runtime) {
                this.runtime.on('PROJECT_STOP_ALL', this.stopTone);
            }

            this.analogInUpdateInterval = 100; // milli-seconds
            this.analogInLastUpdated = [Date.now(), Date.now(), Date.now()];

            /**
             * A time interval to wait (in milliseconds) while a block that sends a BLE message is running.
             * @type {number}
             */
            this.sendCommandInterval = 30;

            this.initConfig();

            // keyboard state monitor
            this.keyState = {};
            document.body.addEventListener('keydown', e => {
                this.keyState[e.code] = {
                    key: e.key,
                    code: e.code,
                    alt: e.altKey,
                    ctrl: e.ctrlKey,
                    meta: e.metaKey,
                    shift: e.shiftKey
                };
            });
            document.body.addEventListener('keyup', e => {
                delete this.keyState[e.code];
            });
        }

        /**
         * Initialize configuration of the micro:bit.
         */
        initConfig () {
            this.config = {};
            this.config.mic = false;
            this.config.pinMode = {};
        }

        /**
         * Start updating process for micro:bit state and motion.
         */
        startUpdater () {
            if (this.updater) {
                clearTimeout(this.updater);
            }
            if (this.bleAccessWaiting) {
                this.updater = setTimeout(() => this.startUpdater(), 0);
                return;
            }
            this.updateState()
                .then(() => this.updateMotion())
                .finally(() => {
                    this.updater = setTimeout(
                        () => this.startUpdater(),
                        this.microbitUpdateInterval
                    );
                });
        }

        /**
         * Stop updating process for micro:bit state and motion.
         */
        stopUpdater () {
            clearTimeout(this.updater);
        }

        /**
         * @param {string} text - the text to display.
         * @param {number} delay - The time to delay between characters, in milliseconds.
         * @param {object} util - utility object provided by the runtime.
         * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
         */
        displayText (text, delay, util) {
            const textLength = Math.min(18, text.length);
            const textData = new Uint8Array(textLength + 1);
            for (let i = 0; i < textLength; i++) {
                textData[i] = text.charCodeAt(i);
            }
            return this.sendCommandSet(
                [{
                    id: (BLECommand.CMD_DISPLAY << 5) | MbitMoreDisplayCommand.TEXT,
                    message: new Uint8Array([
                        Math.min(255, (Math.max(0, delay) / 10)),
                        ...textData
                    ])
                }],
                util
            );
        }

        /**
         * Send display pixcels command to micro:bit.
         * @param {Array.<Array.<number>>} matrix - pattern to display.
         * @param {object} util - utility object provided by the runtime.
         * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
         */
        displayPixels (matrix, util) {
            const cmdSet = [
                {
                    id: (BLECommand.CMD_DISPLAY << 5) | MbitMoreDisplayCommand.PIXELS_0,
                    message: new Uint8Array([
                        ...matrix[0],
                        ...matrix[1],
                        ...matrix[2]
                    ])
                },
                {
                    id: (BLECommand.CMD_DISPLAY << 5) | MbitMoreDisplayCommand.PIXELS_1,
                    message: new Uint8Array([
                        ...matrix[3],
                        ...matrix[4]
                    ])
                }
            ];
            return this.sendCommandSet(cmdSet, util);
        }

        /**
         * Set pull mode to the pin.
         * @param {number} pinIndex - index of the pin
         * @param {MbitMorePullModeID} pullMode - pull mode to set
         * @param {BlockUtility} util - utility object provided from the runtime
         * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
         */
        setPullMode (pinIndex, pullMode, util) {
            this.config.pinMode[pinIndex] = MbitMorePinMode.INPUT;
            return this.sendCommandSet(
                [{
                    id: (BLECommand.CMD_PIN << 5) | MbitMorePinCommand.SET_PULL,
                    message: new Uint8Array([
                        pinIndex,
                        pullMode
                    ])
                }],
                util
            );
        }

        /**
         * Set pin to digital output mode on the level.
         * @param {number} pinIndex - Index of pin.
         * @param {boolean} level - Value in digital (true = High)
         * @param {BlockUtility} util - utility object provided by the runtime.
         * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
         */
        setPinOutput (pinIndex, level, util) {
            this.config.pinMode[pinIndex] = MbitMorePinMode.OUTPUT;
            return this.sendCommandSet(
                [{
                    id: (BLECommand.CMD_PIN << 5) | MbitMorePinCommand.SET_OUTPUT,
                    message: new Uint8Array(
                        [
                            pinIndex,
                            (level ? 1 : 0)
                        ]
                    )
                }],
                util
            );
        }

        /**
         * Set the pin to PWM mode on the level.
         * @param {number} pinIndex - index of the pin
         * @param {number} level - value of analog output [0..1024].
         * @param {BlockUtility} util - utility object provided by the runtime.
         * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
         */
        setPinPWM (pinIndex, level, util) {
            this.config.pinMode[pinIndex] = MbitMorePinMode.PWM;
            const dataView = new DataView(new ArrayBuffer(2));
            dataView.setUint16(0, level, true);
            return this.sendCommandSet(
                [{
                    id: (BLECommand.CMD_PIN << 5) | MbitMorePinCommand.SET_PWM,
                    message: new Uint8Array(
                        [
                            pinIndex,
                            dataView.getUint8(0),
                            dataView.getUint8(1)
                        ]
                    )
                }],
                util
            );
        }


        /**
         * Set the pin to Servo mode on the angle in the range and center.
         * @param {number} pinIndex - index of the pin.
         * @param {number} angle - the level to set on the output pin, in the range 0 - 180.
         * @param {number} range - the span of possible values. '0' means default(2000).
         * @param {number} center - the center point from which to calculate the lower and upper bounds.
         *                          '0' means default(1500).
         * @param {BlockUtility} util - utility object provided by the runtime.
         * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
         */
        setPinServo (pinIndex, angle, range, center, util) {
            this.config.pinMode[pinIndex] = MbitMorePinMode.SERVO;
            if (!range || range < 0) range = 0;
            if (!center || center < 0) center = 0;
            const dataView = new DataView(new ArrayBuffer(6));
            dataView.setUint16(0, angle, true);
            dataView.setUint16(2, range, true);
            dataView.setUint16(4, center, true);
            return this.sendCommandSet(
                [{
                    id: (BLECommand.CMD_PIN << 5) | MbitMorePinCommand.SET_SERVO,
                    message: new Uint8Array(
                        [
                            pinIndex,
                            dataView.getUint8(0),
                            dataView.getUint8(1),
                            dataView.getUint8(2),
                            dataView.getUint8(3),
                            dataView.getUint8(4),
                            dataView.getUint8(5)
                        ]
                    )
                }],
                util);
        }

        /**
         * Read light level from the light sensor.
         * @param {object} util - utility object provided by the runtime.
         * @return {number} - value of the light level [0..255].
         */
        readLightLevel () {
            if (!this.isConnected()) {
                return 0;
            }
            return this.lightLevel;
        }

        /**
         * Update data of the analog input.
         * @param {number} pinIndex - index of the pin to get value.
         * @param {object} util - utility object provided by the runtime.
         * @return {?Promise} a Promise that resolves value of analog input or undefined if this process was yield.
         */
        readAnalogIn (pinIndex, util) {
            if (!this.isConnected()) {
                return Promise.resolve(0);
            }
            if ((Date.now() - this.analogInLastUpdated[pinIndex]) < this.analogInUpdateInterval) {
                return Promise.resolve(this.analogValue[pinIndex]);
            }
            if (this.bleBusy) {
                this.bleAccessWaiting = true;
                if (util) util.yield(); // re-try this call after a while.
                return; // Do not return Promise.resolve() to re-try.
            }
            this.bleBusy = true;
            this.bleBusyTimeoutID = window.setTimeout(() => {
                this.bleBusy = false;
                this.bleAccessWaiting = false;
            }, 1000);
            return new Promise(resolve => this._ble.read(
                MM_SERVICE.ID,
                MM_SERVICE.ANALOG_IN_CH[pinIndex],
                false)
                .then(result => {
                    window.clearTimeout(this.bleBusyTimeoutID);
                    this.bleBusy = false;
                    this.bleAccessWaiting = false;
                    if (!result) {
                        return resolve(this.analogValue[pinIndex]);
                    }
                    // const data = Base64Util.base64ToUint8Array(result.message);
                    const dataView = new DataView(result.message.buffer, 0);
                    this.analogValue[pinIndex] = dataView.getUint16(0, true);
                    this.analogInLastUpdated = Date.now();
                    resolve(this.analogValue[pinIndex]);
                })
            );
        }

        /**
         * Update data of digital level, light level, temperature, sound level.
         * @return {Promise} - a Promise that resolves updated data holder.
         */
        updateState () {
            if (!this.isConnected()) return Promise.resolve(this);
            if (this.bleBusy) {
                return Promise.resolve(this);
            }
            this.bleBusy = true;
            this.bleBusyTimeoutID = window.setTimeout(() => {
                this.bleBusy = false;
            }, 1000);
            return new Promise(resolve => {
                this._ble.read(
                    MM_SERVICE.ID,
                    MM_SERVICE.STATE_CH,
                    false)
                    .then(result => {
                        window.clearTimeout(this.bleBusyTimeoutID);
                        this.bleBusy = false;
                        if (!result) return resolve(this);
                        // const data = Base64Util.base64ToUint8Array(result.message);
                        const dataView = new DataView(result.message.buffer, 0);
                        // Digital Input
                        const gpioData = dataView.getUint32(0, true);
                        for (let i = 0; i < this.gpio.length; i++) {
                            this.digitalLevel[this.gpio[i]] = (gpioData >> this.gpio[i]) & 1;
                        }
                        Object.keys(MbitMoreButtonStateIndex).forEach(
                            name => {
                                this.buttonState[name] = (gpioData >> (24 + MbitMoreButtonStateIndex[name])) & 1;
                            });
                        this.lightLevel = dataView.getUint8(4);
                        this.temperature = dataView.getUint8(5) - 128;
                        this.soundLevel = dataView.getUint8(6);
                        this.resetConnectionTimeout();
                        resolve(this);
                    });
            });
        }

        /**
         * Read temperature (integer in celsius) from the micro:bit cpu.
         * @return {number} - degrees of temperature [centigrade].
         */
        readTemperature () {
            if (!this.isConnected()) {
                return 0;
            }
            return this.temperature;
        }

        /**
         * Configure microphone.
         * @param {boolean} use - true to use microphone.
         * @param {object} util - utility object provided by the runtime.
         * @return {?Promise} - a Promise that resolves state of the microphone or undefined if the process was yield.
         */
        configMic (use, util) {
            use = (use === true);
            if (!this.isConnected()) {
                return Promise.resolve(false);
            }
            if (this.config.mic === use) {
                return Promise.resolve(this.config.mic);
            }
            const sendPromise = this.sendCommandSet(
                [{
                    id: (BLECommand.CMD_CONFIG << 5) | MbitMoreConfig.MIC,
                    message: new Uint8Array([(use ? 1 : 0)]) // use microphone
                }],
                util
            );
            if (sendPromise) {
                return sendPromise
                    .then(() => {
                        this.config.mic = use;
                        return this.config.mic;
                    });
            }
            return;
        }

        /**
         * Play tone on the speaker.
         * @param {number} frequency - wave frequency to play [Hz]
         * @param {number} volume laudness of tone [%]
         * @param {object} util - utility object provided by the runtime.
         * @return {?Promise} - a Promise that resolves to send command or undefined if this process was yield.
         */
        playTone (frequency, volume, util) {
            if (!this.isConnected()) {
                return Promise.resolve();
            }
            const frequencyData = new DataView(new ArrayBuffer(4));
            frequencyData.setUint32(0, Math.round(1000000 / frequency), true);
            volume = Math.round(volume * 0xff / 100);
            return this.sendCommandSet(
                [{
                    id: (BLECommand.CMD_AUDIO << 5) | MbitMoreAudioCommand.PLAY_TONE,
                    message: new Uint8Array([
                        frequencyData.getUint8(0),
                        frequencyData.getUint8(1),
                        frequencyData.getUint8(2),
                        frequencyData.getUint8(3),
                        volume
                    ])
                }],
                util
            );
        }

        /**
         * Stop playing tone on the speaker.
         * @param {object} util - utility object provided by the runtime.
         * @return {?Promise} - a Promise that resolves to send command or undefined if this process was yield.
         */
        stopTone (util) {
            if (!this.isConnected()) {
                return Promise.resolve();
            }
            return this.sendCommandSet(
                [{
                    id: (BLECommand.CMD_AUDIO << 5) | MbitMoreAudioCommand.STOP_TONE,
                    message: new Uint8Array([])
                }],
                util
            );
        }

        /**
         * Read sound level.
         * @return {number} - level of loudness (0 .. 255).
         */
        readSoundLevel () {
            if (!this.isConnected()) {
                return 0;
            }
            return this.soundLevel;
        }

        /**
         * Update data of acceleration, magnetic force.
         * @return {Promise} - a Promise that resolves updated data holder.
         */
        updateMotion () {
            if (!this.isConnected()) return Promise.resolve(this);
            if (this.bleBusy) {
                return Promise.resolve(this);
            }
            this.bleBusy = true;
            this.bleBusyTimeoutID = window.setTimeout(() => {
                this.bleBusy = false;
            }, 1000);
            return new Promise(resolve => {
                this._ble.read(
                    MM_SERVICE.ID,
                    MM_SERVICE.MOTION_CH,
                    false)
                    .then(result => {
                        window.clearTimeout(this.bleBusyTimeoutID);
                        this.bleBusy = false;
                        if (!result) return resolve(this);
                        // const data = Base64Util.base64ToUint8Array(result.message);
                        const dataView = new DataView(result.message.buffer, 0);
                        // Accelerometer
                        this.pitch = Math.round(dataView.getInt16(0, true) * 180 / Math.PI / 1000);
                        this.roll = Math.round(dataView.getInt16(2, true) * 180 / Math.PI / 1000);
                        this.acceleration.x = 1000 * dataView.getInt16(4, true) / G;
                        this.acceleration.y = 1000 * dataView.getInt16(6, true) / G;
                        this.acceleration.z = 1000 * dataView.getInt16(8, true) / G;
                        // Magnetometer
                        this.compassHeading = dataView.getUint16(10, true);
                        this.magneticForce.x = dataView.getInt16(12, true);
                        this.magneticForce.y = dataView.getInt16(14, true);
                        this.magneticForce.z = dataView.getInt16(16, true);
                        this.resetConnectionTimeout();
                        resolve(this);
                    });
            });
        }

        /**
         * Read pitch [degrees] of the micro:bit heading direction.
         * @return {number} - degree of pitch.
         */
        readPitch () {
            if (!this.isConnected()) {
                return 0;
            }
            return this.pitch;
        }

        /**
         * Read roll [degrees] of the micro:bit heading direction.
         * @return {number} - degree of roll.
         */
        readRoll () {
            if (!this.isConnected()) {
                return 0;
            }
            return this.roll;
        }

        /**
         * Read the value of gravitational acceleration [milli-g] for the axis.
         * @param {AxisSymbol} axis - direction of acceleration.
         * @return {number} - value of acceleration.
         */
        readAcceleration (axis) {
            if (!this.isConnected()) {
                return 0;
            }
            if (axis === AxisSymbol.Absolute) {
                return Math.round(
                    Math.sqrt(
                        (this.acceleration.x ** 2) +
                                (this.acceleration.y ** 2) +
                                (this.acceleration.z ** 2)
                    )
                );
            }
            return this.acceleration[axis];
        }

        /**
         * Read the angle (degrees) of heading direction from the north.
         * @return {number} - degree of compass heading.
         */
        readCompassHeading () {
            if (!this.isConnected()) {
                return 0;
            }
            return this.compassHeading;
        }


        /**
         * Read value of magnetic force [micro teslas] for the axis.
         * @param {AxisSymbol} axis - direction of magnetic force.
         * @return {number} - value of magnetic force.
         */
        readMagneticForce (axis) {
            if (!this.isConnected()) {
                return 0;
            }
            if (axis === AxisSymbol.Absolute) {
                return Math.round(
                    Math.sqrt(
                        (this.magneticForce.x ** 2) +
                                (this.magneticForce.y ** 2) +
                                (this.magneticForce.z ** 2)
                    )
                );
            }
            return this.magneticForce[axis];
        }

        /**
         * Start to scan Bluetooth LE devices to find micro:bit with MicroBit More service.
         */
        scan () {
            const connectorClass = BLE;
            this._ble = new connectorClass(
                this.runtime,
                this._extensionId,
                {
                    filters: [
                        {namePrefix: 'BBC micro:bit'},
                        {services: [MM_SERVICE.ID]}
                    ]
                },
                this._onConnect,
                this.onDisconnect
            );
        }

        /**
         * Whether the key is pressed at this moment.
         * @param {string} key - key in keyboard event
         * @returns {boolean} - return true when the key is pressed
         */
        isKeyPressing (key) {
            return Object.values(this.keyState).find(state => state.key === key);
        }

        /**
         * Called by the runtime when user wants to scan for a peripheral.
         */
        scan () {
            if (this._ble) {
                this._ble.disconnect();
            }
            this._ble = new BLE(this.runtime, this._extensionId, {
                filters: [
                    {namePrefix: MM_SERVICE.NAME_PREFIX},
                    {services: [MM_SERVICE.ID]}
                ]
            }, this._onConnect, this.onDisconnect);

            // The key state is cleared because the keyup event will be dropped by the browser dialog.
            this.keyState = {};
        }

        /**
         * Called by the runtime when user wants to connect to a certain peripheral.
         * @param {number} id - the id of the peripheral to connect to.
         */
        connect (id) {
            if (this._ble) {
                this._ble.connectPeripheral(id);
            }
        }

        /**
         * Disconnect from the micro:bit.
         */
        disconnect () {
            if (this._ble) {
                this._ble.disconnect();
            }
            this.onDisconnect();
        }

        /**
         * Reset all the state and timeout/interval ids.
         */
        onDisconnect () {
            this.stopUpdater();
            if (this._timeoutID) {
                window.clearTimeout(this._timeoutID);
                this._timeoutID = null;
            }
        }

        /**
         * Return true if connected to the micro:bit.
         * @return {boolean} - whether the micro:bit is connected.
         */
        isConnected () {
            let connected = false;
            if (this._ble) {
                connected = this._ble.isConnected();
            }
            return connected;
        }

        /**
         * Send a command to micro:bit.
         * @param {object} command command to send.
         * @param {number} command.id ID of the command.
         * @param {Uint8Array} command.message Contents of the command.
         * @return {Promise} a Promise that resolves when the data was sent and after send command interval.
         */
        sendCommand (command) {
            const data = Base64Util.uint8ArrayToBase64(
                new Uint8Array([
                    command.id,
                    ...command.message
                ])
            );
            return new Promise(resolve => {
                this._ble.write(
                    MM_SERVICE.ID,
                    MM_SERVICE.COMMAND_CH,
                    data,
                    'base64',
                    false
                );
                setTimeout(() => resolve(), this.sendCommandInterval);
            });
        }

        /**
         * Send multiple commands sequentially.
         * @param {Array.<{id: number, message: Uint8Array}>} commands array of command.
         * @param {BlockUtility} util - utility object provided by the runtime.
         * @return {?Promise} a Promise that resolves when the all commands was sent.
         */
        sendCommandSet (commands, util) {
            if (!this.isConnected()) return Promise.resolve();
            if (this.bleBusy) {
                this.bleAccessWaiting = true;
                if (util) {
                    util.yield(); // re-try this call after a while.
                } else {
                    setTimeout(() => this.sendCommandSet(commands, util), 1);
                }
                return; // Do not return Promise.resolve() to re-try.
            }
            this.bleBusy = true;
            // Clear busy and BLE access waiting flag when the scratch-link does not respond.
            this.bleBusyTimeoutID = window.setTimeout(() => {
                this.bleBusy = false;
                this.bleAccessWaiting = false;
            }, 1000);
            return new Promise(resolve => {
                commands.reduce((acc, cur) => acc.then(() => this.sendCommand(cur)),
                    Promise.resolve()
                )
                    .then(() => {
                        window.clearTimeout(this.bleBusyTimeoutID);
                    })
                    .catch(err => {
                        log.log(err);
                        this._ble.handleDisconnectError(err);
                    })
                    .finally(() => {
                        this.bleBusy = false;
                        this.bleAccessWaiting = false;
                        resolve();
                    });
            });
        }

        /**
         * Starts reading data from peripheral after BLE has connected to it.
         */
        _onConnect () {
            this._ble.read(
                MM_SERVICE.ID,
                MM_SERVICE.COMMAND_CH,
                false)
                .then(result => {
                    if (!result) {
                        throw new Error('Config is not readable');
                    }
                    // const data = Base64Util.base64ToUint8Array(result.message);
                    const dataView = new DataView(result.message.buffer, 0);
                    this.hardware = dataView.getUint8(0);
                    this.protocol = dataView.getUint8(1);
                    this.route = dataView.getUint8(2);
                    this._ble.startNotifications(
                        MM_SERVICE.ID,
                        MM_SERVICE.ACTION_EVENT_CH,
                        this.onNotify);
                    this._ble.startNotifications(
                        MM_SERVICE.ID,
                        MM_SERVICE.PIN_EVENT_CH,
                        this.onNotify);
                    if (this.hardware === MbitMoreHardwareVersion.MICROBIT_V1) {
                        this.microbitUpdateInterval = 100; // milliseconds
                    } else {
                        this._ble.startNotifications(
                            MM_SERVICE.ID,
                            MM_SERVICE.MESSAGE_CH,
                            this.onNotify);
                        this.microbitUpdateInterval = 50; // milliseconds
                    }
                    if (this.route === CommunicationRoute.SERIAL) {
                        this.sendCommandInterval = 100; // milliseconds
                    } else {
                        this.sendCommandInterval = 30; // milliseconds
                    }
                    this.initConfig();
                    this.bleBusy = false;
                    this.startUpdater();
                    this.resetConnectionTimeout();
                })
                .catch(err => this._ble.handleDisconnectError(err));
        }

        /**
         * Process the data from the incoming BLE characteristic.
         * @param {string} msg - the incoming BLE data.
         * @private
         */
        onNotify (data) {
            // const data = Base64Util.base64ToUint8Array(msg);
            const dataView = new DataView(data.buffer, 0);
            const dataFormat = dataView.getUint8(19);
            if (dataFormat === MbitMoreDataFormat.ACTION_EVENT) {
                const actionEventType = dataView.getUint8(0);
                if (actionEventType === MbitMoreActionEvent.BUTTON) {
                    const buttonName = MbitMoreButtonID[dataView.getUint16(1, true)];
                    const eventName = MbitMoreButtonEventID[dataView.getUint8(3)];
                    this.buttonEvents[buttonName][eventName] = dataView.getUint32(4, true); // Timestamp
                } else if (actionEventType === MbitMoreActionEvent.GESTURE) {
                    const gestureName = MbitMoreGestureID[dataView.getUint8(1)];
                    this.gestureEvents[gestureName] = dataView.getUint32(2, true); // Timestamp
                }
            } else if (dataFormat === MbitMoreDataFormat.PIN_EVENT) {
                const pinIndex = dataView.getUint8(0);
                if (!this._pinEvents[pinIndex]) {
                    this._pinEvents[pinIndex] = {};
                }
                const event = dataView.getUint8(1);
                this._pinEvents[pinIndex][event] =
                {
                    value: dataView.getUint32(2, true), // timesamp of the edge or duration of the pulse
                    timestamp: Date.now() // received time
                };
            } else if (dataFormat === MbitMoreDataFormat.DATA_NUMBER) {
                const label = new TextDecoder().decode(data.slice(0, 8).filter(char => (char !== 0)));
                this.receivedData[label] =
                {
                    content: dataView.getFloat32(8, true),
                    timestamp: Date.now()
                };
            } else if (dataFormat === MbitMoreDataFormat.DATA_TEXT) {
                const label = new TextDecoder().decode(data.slice(0, 8).filter(char => (char !== 0)));
                this.receivedData[label] =
                {
                    content: new TextDecoder().decode(data.slice(8, 20).filter(char => (char !== 0))),
                    timestamp: Date.now()
                };
            }
            this.resetConnectionTimeout();
        }

        /**
         * Cancel disconnect timeout and start counting again.
         */
        resetConnectionTimeout () {
            if (this._timeoutID) window.clearTimeout(this._timeoutID);
            this._timeoutID = window.setTimeout(() => this._ble.handleDisconnectError(BLEDataStoppedError), BLETimeout);
        }

        /**
         * Return whether the pin value is high.
         * @param {number} pin - the pin to check.
         * @return {boolean} - whether the pin is high or not.
         */
        isPinHigh (pin) {
            const level = this.readDigitalLevel(pin);
            return level === 1;
        }

        /**
         * Read digital input from the pin.
         * @param {number} pin - the pin to read.
         * @return {number} - digital input value of the pin [0|1].
         */
        readDigitalLevel (pin) {
            if (!this.isConnected()) {
                return 0;
            }
            return this.digitalLevel[pin];
        }

        /**
         * Return whether the button is pressed.
         * @param {string} buttonName - name of the button
         * @return {boolean} - true when it is pressed
         */
        isButtonPressed (buttonName) {
            if (!this.isConnected()) {
                return false;
            }
            return this.buttonState[buttonName] === 1;
        }

        /**
         * Return whether the pin is touch-mode.
         * @param {number} pinIndex - indesx of the pin
         * @return {boolean} - true when it is touch-mode
         */
        isPinTouchMode (pinIndex) {
            return this.config.pinMode[pinIndex] === MbitMorePinMode.TOUCH;
        }

        /**
         * Configurate touch mode of the pin.
         * @param {number} pinIndex - index of the pin as a button.
         * @param {object} util - utility object provided by the runtime.
         * @return {?Promise} - a Promise that resolves when configured or undefined if the process was yield.
         */
        configTouchPin (pinIndex, util) {
            if (!this.isConnected()) {
                return Promise.resolve();
            }
            if (this.isPinTouchMode(pinIndex)) {
                return Promise.resolve();
            }
            const sendPromise = this.sendCommandSet(
                [{
                    id: (BLECommand.CMD_CONFIG << 5) | MbitMoreConfig.TOUCH,
                    message: new Uint8Array([
                        pinIndex,
                        1
                    ])
                }],
                util
            );
            if (sendPromise) {
                return sendPromise
                    .then(() => {
                        this.config.pinMode[pinIndex] = MbitMorePinMode.TOUCH;
                    });
            }
            return;
        }

        /**
         * Return whether the touche-pin is touched.
         * @param {string} buttonName - ID to check.
         * @return {boolean} - whether the id is high or not.
         */
        isTouched (buttonName) {
            if (!this.isConnected()) {
                return false;
            }
            return this.buttonState[buttonName] === 1;
        }

        /**
         * Return the last timestamp of the button event or undefined if the event is not received.
         * @param {MbitMoreButtonName} buttonName - name of the button to get the event.
         * @param {MbitMoreButtonEventName} eventName - name of event to get.
         * @return {?number} Timestamp of the last event or null.
         */
        getButtonEventTimestamp (buttonName, eventName) {
            if (this.buttonEvents[buttonName] && this.buttonEvents[buttonName][eventName]) {
                return this.buttonEvents[buttonName][eventName];
            }
            return null;
        }

        /**
         * Return the last timestamp of the gesture event or undefined if the event is not received.
         * @param {MbitMoreGestureName} gestureName - name of the event.
         * @return {?number} Timestamp of the last event or null.
         */
        getGestureEventTimestamp (gestureName) {
            if (this.gestureEvents[gestureName]) {
                return this.gestureEvents[gestureName];
            }
            return null;
        }

        /**
         * Return the last value of the pin event or undefined if the event was not received.
         * @param {number} pinIndex - index of the pin to get the event.
         * @param {MbitMorePinEvent} event - event to get.
         * @return {?number} Timestamp of the last event or null.
         */
        getPinEventValue (pinIndex, event) {
            if (this._pinEvents[pinIndex] && this._pinEvents[pinIndex][event]) {
                return this._pinEvents[pinIndex][event].value;
            }
            return null;
        }

        /**
         * Return the last timestamp of the pin event or undefined if the event was not received.
         * @param {number} pinIndex - index of the pin to get the event.
         * @param {MbitMorePinEvent} event - event to get.
         * @return {?number} Timestamp of the last event or null.
         */
        getPinEventTimestamp (pinIndex, event) {
            if (this._pinEvents[pinIndex] && this._pinEvents[pinIndex][event]) {
                return this._pinEvents[pinIndex][event].timestamp;
            }
            return null;
        }

        /**
         * Set event type to be get from the pin.
         * @param {number} pinIndex - Index of the pin to set.
         * @param {MbitMorePinEventType} eventType - Event type to set.
         * @param {BlockUtility} util - utility object provided by the runtime.
         * @return {?Promise} a Promise that resolves when command sending done or undefined if this process was yield.
         */
        listenPinEventType (pinIndex, eventType, util) {
            return this.sendCommandSet(
                [{
                    id: (BLECommand.CMD_PIN << 5) | MbitMorePinCommand.SET_EVENT,
                    message: new Uint8Array([
                        pinIndex,
                        eventType
                    ])
                }],
                util
            );
        }

        /**
         * Send data to micro:bit.
         * @param {string} label - label of the data [ascii]
         * @param {string} content - content of the data [ascii | number]
         * @param {BlockUtility} util - utility object provided by the runtime.
         * @return {?Promise} a Promise that resolves when sending done or undefined if this process was yield.
         */
        sendData (label, content, util) {
            const labelData = new Array(8)
                .fill()
                .map((_value, index) => label.charCodeAt(index));
            const contentNumber = Number(content);
            let contentData;
            let type;
            if (Number.isNaN(contentNumber)) {
                type = MbitMoreSendingDataType.TEXT;
                contentData = content
                    .split('')
                    .map(ascii => ascii.charCodeAt(0))
                    .slice(0, 11);
            } else {
                type = MbitMoreSendingDataType.NUMBER;
                const dataView = new DataView(new ArrayBuffer(4));
                dataView.setFloat32(0, contentNumber, true);
                contentData = [
                    dataView.getUint8(0),
                    dataView.getUint8(1),
                    dataView.getUint8(2),
                    dataView.getUint8(3)
                ];
            }
            return this.sendCommandSet(
                [{
                    id: ((BLECommand.CMD_DATA << 5) | type),
                    message: new Uint8Array([
                        ...labelData,
                        ...contentData])
                }],
                util);
        }

        /**
         * Return the last data with the label or undefined if no data received with the label.
         * @param {string} label - label to get.
         * @return {?(number | string)} data of the label or null.
         */
        getDataLabeled (label) {
            if (this.receivedData[label]) {
                return this.receivedData[label].content;
            }
            return null;
        }

        /**
         * Return the last timestamp of the data or undefined if the data is not received.
         * @param {string} label - label of the data.
         * @return {?number} Timestamp of the last data or null.
         */
        getDataTimestamp (label) {
            if (this.receivedData[label]) {
                return this.receivedData[label].timestamp;
            }
            return null;
        }
    }

    /**
     * Scratch 3.0 blocks to interact with a MicroBit peripheral.
     */
    class MbitMoreBlocks {

        /**
         * @return {string} - the name of this extension.
         */
        static get EXTENSION_NAME () {
            return 'micro:bit more';
        }

        /**
         * @return {string} - the ID of this extension.
         */
        static get EXTENSION_ID () {
            return 'microbitMore';
        }

        /**
         * @return {array} - text and values for each gestures menu element
         */
        get GESTURES_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'microbitMore.gesturesMenu.tiltUp',
                        default: 'tilt up',
                        description: 'label for tilt up gesture in gesture picker for microbit more extension'
                    }),
                    value: MbitMoreGestureName.TILT_UP
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.gesturesMenu.tiltDown',
                        default: 'tilt down',
                        description: 'label for tilt down gesture in gesture picker for microbit more extension'
                    }),
                    value: MbitMoreGestureName.TILT_DOWN
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.gesturesMenu.tiltLeft',
                        default: 'tilt left',
                        description: 'label for tilt left gesture in gesture picker for microbit more extension'
                    }),
                    value: MbitMoreGestureName.TILT_LEFT
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.gesturesMenu.tiltRight',
                        default: 'tilt right',
                        description: 'label for tilt right gesture in gesture picker for microbit more extension'
                    }),
                    value: MbitMoreGestureName.TILT_RIGHT
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.gesturesMenu.faceUp',
                        default: 'face up',
                        description: 'label for face up gesture in gesture picker for microbit more extension'
                    }),
                    value: MbitMoreGestureName.FACE_UP
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.gesturesMenu.faceDown',
                        default: 'face down',
                        description: 'label for face down gesture in gesture picker for microbit more extension'
                    }),
                    value: MbitMoreGestureName.FACE_DOWN
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.gesturesMenu.freefall',
                        default: 'freefall',
                        description: 'label for freefall gesture in gesture picker for microbit more extension'
                    }),
                    value: MbitMoreGestureName.FREEFALL
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.gesturesMenu.g3',
                        default: '3G',
                        description: 'label for 3G gesture in gesture picker for microbit more extension'
                    }),
                    value: MbitMoreGestureName.G3
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.gesturesMenu.g6',
                        default: '6G',
                        description: 'label for 6G gesture in gesture picker for microbit more extension'
                    }),
                    value: MbitMoreGestureName.G6
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.gesturesMenu.g8',
                        default: '8G',
                        description: 'label for 3G gesture in gesture picker for microbit more extension'
                    }),
                    value: MbitMoreGestureName.G8
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.gesturesMenu.shake',
                        default: 'shake',
                        description: 'label for shaken gesture in gesture picker for microbit more extension'
                    }),
                    value: MbitMoreGestureName.SHAKE
                }

            ];
        }


        /**
         * @return {array} - text and values for each buttons menu element
         */
        get BUTTON_ID_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'microbitMore.buttonIDMenu.a',
                        default: 'A',
                        description: 'label for "A" element in button picker for Microbit More extension'
                    }),
                    value: MbitMoreButtonName.A
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.buttonIDMenu.b',
                        default: 'B',
                        description: 'label for "B" element in button picker for Microbit More extension'
                    }),
                    value: MbitMoreButtonName.B
                }
            ];
        }

        /**
         * @return {array} - Menu items for button event selector.
         */
        get BUTTON_EVENT_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'microbitMore.buttonEventMenu.down',
                        default: 'down',
                        description: 'label for button down event'
                    }),
                    value: MbitMoreButtonEventName.DOWN
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.buttonEventMenu.up',
                        default: 'up',
                        description: 'label for button up event'
                    }),
                    value: MbitMoreButtonEventName.UP
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.buttonEventMenu.click',
                        default: 'click',
                        description: 'label for button click event'
                    }),
                    value: MbitMoreButtonEventName.CLICK
                // },
                // // These events are not in use because they are unstable in coal-microbit-v2.
                // {
                //     text: formatMessage({
                //         id: 'microbitMore.buttonEventMenu.hold',
                //         default: 'hold',
                //         description: 'label for button hold event'
                //     }),
                //     value: MbitMoreButtonEventName.HOLD
                // },
                // {
                //     text: formatMessage({
                //         id: 'microbitMore.buttonEventMenu.longClick',
                //         default: 'long click',
                //         description: 'label for button long click event'
                //     }),
                //     value: MbitMoreButtonEventName.LONG_CLICK
                // },
                // {
                //     text: formatMessage({
                //         id: 'microbitMore.buttonEventMenu.doubleClick',
                //         default: 'double click',
                //         description: 'label for button double click event'
                //     }),
                //     value: MbitMoreButtonEventName.DOUBLE_CLICK
                }
            ];
        }

        /**
         * @return {array} - text and values for each buttons menu element
         */
        get TOUCH_ID_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'microbitMore.touchIDMenu.logo',
                        default: 'LOGO',
                        description: 'label for "LOGO" element in touch button picker for Microbit More extension'
                    }),
                    value: MbitMoreButtonName.LOGO
                },
                {
                    text: 'P0',
                    value: MbitMoreButtonName.P0
                },
                {
                    text: 'P1',
                    value: MbitMoreButtonName.P1
                },
                {
                    text: 'P2',
                    value: MbitMoreButtonName.P2
                }
            ];
        }

        /**
         * @return {array} - Menu items for touch event selector.
         */
        get TOUCH_EVENT_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'microbitMore.touchEventMenu.touched',
                        default: 'touched',
                        description: 'label for touched event'
                    }),
                    value: MbitMoreButtonEventName.DOWN
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.touchEventMenu.released',
                        default: 'released',
                        description: 'label for released event'
                    }),
                    value: MbitMoreButtonEventName.UP
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.touchEventMenu.tapped',
                        default: 'tapped',
                        description: 'label for tapped event'
                    }),
                    value: MbitMoreButtonEventName.CLICK
                // },
                // // These events are not in use because they are unstable in coal-microbit-v2.
                // {
                //     text: formatMessage({
                //         id: 'microbitMore.touchEventMenu.hold',
                //         default: 'hold',
                //         description: 'label for hold event in touch'
                //     }),
                //     value: MbitMoreButtonEventName.HOLD
                // },
                // {
                //     text: formatMessage({
                //         id: 'microbitMore.touchEventMenu.longTapped',
                //         default: 'long tapped',
                //         description: 'label for long click event in touch'
                //     }),
                //     value: MbitMoreButtonEventName.LONG_CLICK
                // },
                // {
                //     text: formatMessage({
                //         id: 'microbitMore.touchEventMenu.doubleTapped',
                //         default: 'double tapped',
                //         description: 'label for double click event in touch'
                //     }),
                //     value: MbitMoreButtonEventName.DOUBLE_CLICK
                }
            ];
        }

        get ANALOG_IN_PINS_MENU () {
            return this._peripheral.analogIn.map(
                pinIndex =>
                    Object.create({
                        text: `P${pinIndex.toString()}`,
                        value: pinIndex.toString()
                    })
            );
        }


        get GPIO_MENU () {
            return this._peripheral.gpio.map(
                pinIndex =>
                    Object.create({
                        text: `P${pinIndex.toString()}`,
                        value: pinIndex.toString()
                    })
            );
        }

        get DIGITAL_VALUE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'microbitMore.digitalValueMenu.Low',
                        default: 'Low',
                        description: 'label for low value in digital output menu for microbit more extension'
                    }),
                    value: 'false'
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.digitalValueMenu.High',
                        default: 'High',
                        description: 'label for high value in digital output menu for microbit more extension'
                    }),
                    value: 'true'
                }
            ];
        }

        get AXIS_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'microbitMore.axisMenu.x',
                        default: 'x',
                        description: 'label of X axis.'
                    }),
                    value: AxisSymbol.X
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.axisMenu.y',
                        default: 'y',
                        description: 'label of Y axis.'
                    }),
                    value: AxisSymbol.Y
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.axisMenu.z',
                        default: 'z',
                        description: 'label of Z axis.'
                    }),
                    value: AxisSymbol.Z
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.axisMenu.absolute',
                        default: 'absolute',
                        description: 'label of absolute value.'
                    }),
                    value: AxisSymbol.Absolute
                }
            ];
        }

        /**
         * @return {array} - text and values for each pin mode menu element
         */
        get PIN_MODE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'microbitMore.pinModeMenu.pullNone',
                        default: 'pull none',
                        description: 'label for pullNone mode'
                    }),
                    value: MbitMorePullModeName.NONE
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.pinModeMenu.pullUp',
                        default: 'pull up',
                        description: 'label for pullUp mode'
                    }),
                    value: MbitMorePullModeName.UP
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.pinModeMenu.pullDown',
                        default: 'pull down',
                        description: 'label for pullDown mode'
                    }),
                    value: MbitMorePullModeName.DOWN
                }
            ];
        }

        /**
         * @return {array} - Menu items for event selector.
         */
        get PIN_EVENT_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'microbitMore.pinEventMenu.pulseLow',
                        default: 'low pulse',
                        description: 'label for low pulse event'
                    }),
                    value: 'PULSE_LOW'
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.pinEventMenu.pulseHigh',
                        default: 'high pulse',
                        description: 'label for high pulse event'
                    }),
                    value: 'PULSE_HIGH'
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.pinEventMenu.fall',
                        default: 'fall',
                        description: 'label for fall event'
                    }),
                    value: 'FALL'
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.pinEventMenu.rise',
                        default: 'rise',
                        description: 'label for rise event'
                    }),
                    value: 'RISE'
                }
            ];
        }

        /**
         * @return {array} - Menu items for event selector.
         */
        get PIN_EVENT_TIMESTAMP_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'microbitMore.pinEventTimestampMenu.pulseLow',
                        default: 'low pulse',
                        description: 'label for low pulse event'
                    }),
                    value: 'PULSE_LOW'
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.pinEventTimestampMenu.pulseHigh',
                        default: 'high pulse',
                        description: 'label for high pulse event'
                    }),
                    value: 'PULSE_HIGH'
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.pinEventTimestampMenu.fall',
                        default: 'fall',
                        description: 'label for fall event'
                    }),
                    value: 'FALL'
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.pinEventTimestampMenu.rise',
                        default: 'rise',
                        description: 'label for rise event'
                    }),
                    value: 'RISE'
                }
            ];
        }

        /**
         * @return {array} - Menu items for event listening.
         */
        get PIN_EVENT_TYPE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'microbitMore.pinEventTypeMenu.none',
                        default: 'none',
                        description: 'label for remove event listener'
                    }),
                    value: 'NONE'
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.pinEventTypeMenu.pulse',
                        default: 'pulse',
                        description: 'label for pulse event type'
                    }),
                    value: 'ON_PULSE'
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.pinEventTypeMenu.edge',
                        default: 'edge',
                        description: 'label for edge event type'
                    }),
                    value: 'ON_EDGE'
                }
            ];
        }

        /**
         * @return {array} - Menu items for connection state.
         */
        get CONNECTION_STATE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'microbitMore.connectionStateMenu.connected',
                        default: 'connected',
                        description: 'label for connected'
                    }),
                    value: 'connected'
                },
                {
                    text: formatMessage({
                        id: 'microbitMore.connectionStateMenu.disconnected',
                        default: 'disconnected',
                        description: 'label for disconnected'
                    }),
                    value: 'disconnected'
                }
            ];
        }

        /**
         * Construct a set of MicroBit blocks.
         * @param {Runtime} runtime - the Scratch 3.0 runtime.
         */
        constructor () {
            /**
             * The Scratch 3.0 runtime.
             * @type {Runtime}
             */
            this.runtime = Scratch.vm.runtime;

            // Create a new MicroBit peripheral instance
            this._peripheral = new MbitMore(this.runtime, MbitMoreBlocks.EXTENSION_ID);

            /**
             * The previous timestamps of button events.
             * @type {Object.<number, Object.<number, number>>} button ID to object with event and timestamp.
             */
            this.prevButtonEvents = {};

            /**
             * The previous timestamps of gesture events.
             * @type {Object.<number, number>} key: event ID, value: timestamp.
             */
            this.prevGestureEvents = {};

            /**
             * The previous timestamps of pin events.
             * @type {Object.<number, Object.<number, number>>} pin index to object with event and timestamp.
             */
            this.prevPinEvents = {};

            /**
             * The previous timestamps of messages.
             * @type {Object.<number, Object>} pin index to object with event and timestamp.
             */
            this.prevReceivedData = {};
        }

        /**
         * @returns {object} metadata for this extension and its blocks.
         */
        getInfo () {
            const locale = formatMessage.setup().locale;
            return {
                id: MbitMoreBlocks.EXTENSION_ID,
                name: MbitMoreBlocks.EXTENSION_NAME,
                blockIconURI,
                showStatusButton: true,
                docsURI: Scratch.require.resolve(`readme.${locale}.html`),
                blocks: [
                    {
                        opcode: 'whenConnectionChanged',
                        text: formatMessage({
                            id: 'microbitMore.whenConnectionChanged',
                            default: 'when micro:bit [STATE]',
                            description: 'when a micro:bit connection state changed'
                        }),
                        blockType: BlockType.HAT,
                        arguments: {
                            STATE: {
                                type: ArgumentType.STRING,
                                menu: 'connectionStateMenu',
                                defaultValue: 'connected'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'whenButtonEvent',
                        text: formatMessage({
                            id: 'microbitMore.whenButtonEvent',
                            default: 'when button [NAME] is [EVENT]',
                            description: 'when the selected button on the micro:bit get the selected event'
                        }),
                        blockType: BlockType.HAT,
                        arguments: {
                            NAME: {
                                type: ArgumentType.STRING,
                                menu: 'buttonIDMenu',
                                defaultValue: MbitMoreButtonName.A
                            },
                            EVENT: {
                                type: ArgumentType.STRING,
                                menu: 'buttonEventMenu',
                                defaultValue: MbitMoreButtonEventName.DOWN
                            }
                        }
                    },
                    {
                        opcode: 'isButtonPressed',
                        text: formatMessage({
                            id: 'microbitMore.isButtonPressed',
                            default: 'button [NAME] pressed?',
                            description: 'is the selected button on the micro:bit pressed?'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            NAME: {
                                type: ArgumentType.STRING,
                                menu: 'buttonIDMenu',
                                defaultValue: MbitMoreButtonName.A
                            }
                        }
                    },
                    {
                        opcode: 'whenTouchEvent',
                        text: formatMessage({
                            id: 'microbitMore.whenTouchEvent',
                            default: 'when pin [NAME] is [EVENT]',
                            description: 'when the selected touch pin on the micro:bit is touched'
                        }),
                        blockType: BlockType.HAT,
                        arguments: {
                            NAME: {
                                type: ArgumentType.STRING,
                                menu: 'touchIDMenu',
                                defaultValue: MbitMoreButtonName.LOGO
                            },
                            EVENT: {
                                type: ArgumentType.STRING,
                                menu: 'touchEventMenu',
                                defaultValue: MbitMoreButtonEventName.DOWN
                            }
                        }
                    },
                    {
                        opcode: 'isPinTouched',
                        text: formatMessage({
                            id: 'microbitMore.isPinTouched',
                            default: 'pin [NAME] is touched?',
                            description: 'is the selected pin is touched?'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            NAME: {
                                type: ArgumentType.STRING,
                                menu: 'touchIDMenu',
                                defaultValue: MbitMoreButtonName.LOGO
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'whenGesture',
                        text: formatMessage({
                            id: 'microbitMore.whenGesture',
                            default: 'when [GESTURE]',
                            description: 'when the selected gesture is detected by the micro:bit'
                        }),
                        blockType: BlockType.HAT,
                        arguments: {
                            GESTURE: {
                                type: ArgumentType.STRING,
                                menu: 'gestures',
                                defaultValue: MbitMoreGestureName.SHAKE
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'displayMatrix',
                        text: formatMessage({
                            id: 'microbitMore.displayMatrix',
                            default: 'display pattern [MATRIX] ',
                            description: 'display a pattern on the micro:bit display'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MATRIX: {
                                type: ArgumentType.MATRIX,
                                defaultValue: '0101010101100010101000100'
                            }
                        }
                    },
                    {
                        opcode: 'displayText',
                        text: formatMessage({
                            id: 'microbitMore.displayText',
                            default: 'display text [TEXT] delay [DELAY] ms',
                            description: 'display text on the micro:bit display'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            TEXT: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello!'
                            },
                            DELAY: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 120
                            }
                        }
                    },
                    {
                        opcode: 'displayClear',
                        text: formatMessage({
                            id: 'microbitMore.clearDisplay',
                            default: 'clear display',
                            description: 'display nothing on the micro:bit display'
                        }),
                        blockType: BlockType.COMMAND
                    },
                    '---',
                    {
                        opcode: 'getLightLevel',
                        text: formatMessage({
                            id: 'microbitMore.lightLevel',
                            default: 'light intensity',
                            description: 'how much the amount of light falling on the LEDs on micro:bit'
                        }),
                        blockType: BlockType.REPORTER
                    },
                    {
                        opcode: 'getTemperature',
                        text: formatMessage({
                            id: 'microbitMore.temperature',
                            default: 'temperature',
                            description: 'temperature (celsius) on the surface of CPU of micro:bit'
                        }),
                        blockType: BlockType.REPORTER
                    },
                    {
                        opcode: 'getCompassHeading',
                        text: formatMessage({
                            id: 'microbitMore.compassHeading',
                            default: 'angle with the North',
                            description: 'angle from the North to the micro:bit heading direction'
                        }),
                        blockType: BlockType.REPORTER
                    },
                    {
                        opcode: 'getPitch',
                        text: formatMessage({
                            id: 'microbitMore.pitch',
                            default: 'pitch',
                            description: 'nose up movement of the micro:bit from level'
                        }),
                        blockType: BlockType.REPORTER
                    },
                    {
                        opcode: 'getRoll',
                        text: formatMessage({
                            id: 'microbitMore.roll',
                            default: 'roll',
                            description: 'clockwise circular movement of the micro:bit from level'
                        }),
                        blockType: BlockType.REPORTER
                    },
                    {
                        opcode: 'getSoundLevel',
                        text: formatMessage({
                            id: 'microbitMore.soundLevel',
                            default: 'sound level',
                            description: 'level of the sound from microphone on micro:bit'
                        }),
                        blockType: BlockType.REPORTER
                    },
                    {
                        opcode: 'getMagneticForce',
                        text: formatMessage({
                            id: 'microbitMore.magneticForce',
                            default: 'magnetic force',
                            description: 'value of magnetic force (micro tesla)'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            AXIS: {
                                type: ArgumentType.STRING,
                                menu: 'axis',
                                defaultValue: AxisSymbol.Absolute
                            }
                        }
                    },
                    {
                        opcode: 'getAcceleration',
                        text: formatMessage({
                            id: 'microbitMore.acceleration',
                            default: 'acceleration [AXIS]',
                            description: 'value of acceleration on the axis (milli-g)'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            AXIS: {
                                type: ArgumentType.STRING,
                                menu: 'axis',
                                defaultValue: AxisSymbol.X
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'getAnalogValue',
                        text: formatMessage({
                            id: 'microbitMore.analogValue',
                            default: 'analog value of pin [PIN]',
                            description: 'analog input value of the pin'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'analogInPins',
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'setPullMode',
                        text: formatMessage({
                            id: 'microbitMore.setPullMode',
                            default: 'set pin [PIN] to input [MODE]',
                            description: 'set a pin into the mode'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'gpio',
                                defaultValue: '0'
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'pinMode',
                                defaultValue: MbitMorePullModeName.UP
                            }
                        }
                    },
                    {
                        opcode: 'isPinHigh',
                        text: formatMessage({
                            id: 'microbitMore.isPinHigh',
                            default: '[PIN] pin is high?',
                            description: 'is the selected pin high as digital?'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'gpio',
                                defaultValue: '0'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'setDigitalOut',
                        text: formatMessage({
                            id: 'microbitMore.setDigitalOut',
                            default: 'set [PIN] Digital [LEVEL]',
                            description: 'set pin to Digital Output mode and the level(High = true)'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'gpio',
                                defaultValue: '0'
                            },
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: 'digitalValueMenu',
                                defaultValue: 'false'
                            }
                        }
                    },
                    {
                        opcode: 'setAnalogOut',
                        text: formatMessage({
                            id: 'microbitMore.setAnalogOut',
                            default: 'set [PIN] analog [LEVEL] %',
                            description: 'set pin to PWM mode and the level(0 to 1023)'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'gpio',
                                defaultValue: '0'
                            },
                            LEVEL: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'setServo',
                        text: formatMessage({
                            id: 'microbitMore.setServo',
                            default: 'set [PIN] Servo [ANGLE]',
                            description: 'set pin to Servo mode and the angle(0 to 180)'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'gpio',
                                defaultValue: '0'
                            },
                            ANGLE: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            RANGE: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 2000
                            },
                            CENTER: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 1500
                            }
                        }
                    },
                    {
                        opcode: 'playTone',
                        text: formatMessage({
                            id: 'microbitMore.playTone',
                            default: 'play tone [FREQ] Hz volume [VOL] %',
                            description: 'play tone on the speaker'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            FREQ: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 440
                            },
                            VOL: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 100
                            }
                        }
                    },
                    {
                        opcode: 'stopTone',
                        text: formatMessage({
                            id: 'microbitMore.stopTone',
                            default: 'stop tone',
                            description: 'stop tone on the speaker'
                        }),
                        blockType: BlockType.COMMAND
                    },
                    '---',
                    {
                        opcode: 'listenPinEventType',
                        text: formatMessage({
                            id: 'microbitMore.listenPinEventType',
                            default: 'listen [EVENT_TYPE] event on [PIN]',
                            description: 'listen the event on the pin'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            EVENT_TYPE: {
                                type: ArgumentType.STRING,
                                menu: 'pinEventTypeMenu',
                                defaultValue: 'NONE'
                            },
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'gpio',
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'whenPinEvent',
                        text: formatMessage({
                            id: 'microbitMore.whenPinEvent',
                            default: 'when catch [EVENT] at pin [PIN]',
                            description: 'when catch the event at the pin'

                        }),
                        blockType: BlockType.HAT,
                        arguments: {
                            EVENT: {
                                type: ArgumentType.STRING,
                                menu: 'pinEventMenu',
                                defaultValue: 'PULSE_LOW'
                            },
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'gpio',
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'getPinEventValue',
                        text: formatMessage({
                            id: 'microbitMore.getPinEventValue',
                            default: 'value of [EVENT] at [PIN]',
                            description: 'value of the value of the event (timestamp of the edge or duration of the pulse)'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            EVENT: {
                                type: ArgumentType.STRING,
                                menu: 'pinEventTimestampMenu',
                                defaultValue: 'PULSE_LOW'
                            },
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'gpio',
                                defaultValue: '0'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'whenDataReceived',
                        text: formatMessage({
                            id: 'microbitMore.whenDataReceived',
                            default: 'when data with label [LABEL] received from micro:bit',
                            description: 'when the data which has the label received'
                        }),
                        blockType: BlockType.HAT,
                        arguments: {
                            LABEL: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'microbitMore.sendData.label',
                                    default: 'label'
                                })
                            }
                        }
                    },
                    {
                        opcode: 'getDataLabeled',
                        text: formatMessage({
                            id: 'microbitMore.getDataLabeled',
                            default: 'data of label [LABEL]',
                            description: 'the last data which has the label'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            LABEL: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'microbitMore.sendData.label',
                                    default: 'label'
                                })
                            }
                        }
                    },
                    {
                        opcode: 'sendData',
                        text: formatMessage({
                            id: 'microbitMore.sendData',
                            default: 'send data [DATA] with label [LABEL] to micro:bit',
                            description: 'send data content with label to micro:bit'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            LABEL: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'microbitMore.sendData.label',
                                    default: 'label'
                                })
                            },
                            DATA: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'microbitMore.sendData.data',
                                    default: 'data'
                                })
                            }
                        }
                    }
                ],
                menus: {
                    buttonIDMenu: {
                        acceptReporters: false,
                        items: this.BUTTON_ID_MENU
                    },
                    buttonEventMenu: {
                        acceptReporters: false,
                        items: this.BUTTON_EVENT_MENU
                    },
                    touchIDMenu: {
                        acceptReporters: false,
                        items: this.TOUCH_ID_MENU
                    },
                    touchEventMenu: {
                        acceptReporters: false,
                        items: this.TOUCH_EVENT_MENU
                    },
                    gestures: {
                        acceptReporters: false,
                        items: this.GESTURES_MENU
                    },
                    analogInPins: {
                        acceptReporters: false,
                        items: this.ANALOG_IN_PINS_MENU
                    },
                    digitalValueMenu: {
                        acceptReporters: true,
                        items: this.DIGITAL_VALUE_MENU
                    },
                    gpio: {
                        acceptReporters: false,
                        items: this.GPIO_MENU
                    },
                    axis: {
                        acceptReporters: false,
                        items: this.AXIS_MENU
                    },
                    pinMode: {
                        acceptReporters: false,
                        items: this.PIN_MODE_MENU
                    },
                    pinEventTypeMenu: {
                        acceptReporters: false,
                        items: this.PIN_EVENT_TYPE_MENU
                    },
                    pinEventMenu: {
                        acceptReporters: false,
                        items: this.PIN_EVENT_MENU
                    },
                    pinEventTimestampMenu: {
                        acceptReporters: false,
                        items: this.PIN_EVENT_TIMESTAMP_MENU
                    },
                    connectionStateMenu: {
                        acceptReporters: false,
                        items: this.CONNECTION_STATE_MENU
                    }
                }
            };
        }

        /**
         * Update the previous occured time of all button events.
         */
        updatePrevButtonEvents () {
            this.prevButtonEvents = {};
            Object.entries(this._peripheral.buttonEvents).forEach(([componentID, events]) => {
                this.prevButtonEvents[componentID] = {};
                Object.entries(events).forEach(([eventName, timestamp]) => {
                    this.prevButtonEvents[componentID][eventName] = timestamp;
                });
            });
        }

        /**
         * Test whether the event raised at the button.
         * @param {object} args - the block's arguments.
         * @param {string} args.NAME - name of the button.
         * @param {string} args.EVENT - name of event to catch.
         * @return {boolean} - true if the event raised.
         */
        whenButtonEvent (args) {
            if (!this.updateLastButtonEventTimer) {
                this.updateLastButtonEventTimer = setTimeout(() => {
                    this.updatePrevButtonEvents();
                    this.updateLastButtonEventTimer = null;
                }, this.runtime.currentStepTime);
            }
            const buttonName = args.NAME;
            const eventName = args.EVENT;
            const lastTimestamp =
                this._peripheral.getButtonEventTimestamp(buttonName, eventName);
            if (lastTimestamp === null) return false;
            if (!this.prevButtonEvents[buttonName]) return true;
            return lastTimestamp !== this.prevButtonEvents[buttonName][eventName];
        }

        /**
         * Test whether the A or B button is pressed
         * @param {object} args - the block's arguments.
         * @param {string} args.NAME - name of the button.
         * @param {object} util - utility object provided by the runtime.
         * @return {boolean} - whether the button is pressed or not.
         */
        isButtonPressed (args) {
            const buttonName = args.NAME;
            return this._peripheral.isButtonPressed(buttonName);
        }


        /**
         * Test whether the touch event raised at the pin.
         * @param {object} args - the block's arguments.
         * @param {string} args.NAME - name of the pin to catch.
         * @param {string} args.EVENT - event to catch.
         * @param {object} util - utility object provided by the runtime.
         * @return {boolean|Promise<boolean>|undefined} - true if the event raised or promise that or undefinde if yield.
         */
        whenTouchEvent (args, util) {
            const buttonName = args.NAME;
            if (buttonName === MbitMoreButtonName.LOGO) {
                return this.whenButtonEvent(args);
            }
            if (this._peripheral.isPinTouchMode(MbitMoreButtonPinIndex[buttonName])) {
                return this.whenButtonEvent(args);
            }
            const configPromise = this._peripheral.configTouchPin(MbitMoreButtonPinIndex[buttonName], util);
            if (!configPromise) return; // This thread was yielded.
            return configPromise.then(() => this.whenButtonEvent(args));
        }

        /**
         * Test whether the touch-pin is touched.
         * @param {object} args - the block's arguments.
         * @param {string} args.NAME - name of the pin.
         * @param {object} util - utility object provided by the runtime.
         * @return {boolean|Promise<boolean>|undefined} - true if touched or promise that or undefinde if yield.
         */
        isPinTouched (args, util) {
            const buttonName = args.NAME;
            if (buttonName === MbitMoreButtonName.LOGO) {
                return this._peripheral.isTouched(buttonName);
            }
            if (this._peripheral.isPinTouchMode(MbitMoreButtonPinIndex[buttonName])) {
                return this._peripheral.isTouched(buttonName);
            }
            const configPromise = this._peripheral.configTouchPin(MbitMoreButtonPinIndex[buttonName], util);
            if (!configPromise) return; // This thread was yielded.
            return configPromise.then(() => this._peripheral.isTouched(buttonName));
        }

        /**
         * Update the last occured time of all gesture events.
         */
        updatePrevGestureEvents () {
            this.prevGestureEvents = {};
            Object.entries(this._peripheral.gestureEvents).forEach(([gestureName, timestamp]) => {
                this.prevGestureEvents[gestureName] = timestamp;
            });
        }

        /**
         * Test whether the gesture event raised.
         * @param {object} args - the block's arguments.
         * @param {string} args.GESTURE - name of the gesture.
         * @return {boolean} - true if the event raised.
         */
        whenGesture (args) {
            if (!this.updateLastGestureEventTimer) {
                this.updateLastGestureEventTimer = setTimeout(() => {
                    this.updatePrevGestureEvents();
                    this.updateLastGestureEventTimer = null;
                }, this.runtime.currentStepTime);
            }
            const gestureName = args.GESTURE;
            const lastTimestamp =
                this._peripheral.getGestureEventTimestamp(gestureName);
            if (lastTimestamp === null) return false;
            if (!this.prevGestureEvents[gestureName]) return true;
            return lastTimestamp !== this.prevGestureEvents[gestureName];
        }

        /**
         * Display pixcel pattern on the 5x5 LED matrix with brightness and write mode.
         * @param {object} args - the block's arguments.
         * @param {string} args.MATRIX - the pattern of the pixels.
         * @param {object} util - utility object provided by the runtime.
         * @return {?Promise} - a Promise that resolves after a tick or undefinde if yield.
         */
        displayMatrix (args, util) {
            const matrixString = Cast.toString(args.MATRIX).replace(/:/g, '')
                .replace(/[０-９，]/g, ws => String.fromCharCode(ws.charCodeAt(0) - 0xFEE0)); // zenkaku to hankaku
            let matrixData;
            if (matrixString.includes(',')) {
                // comma separated values
                matrixData = matrixString.split(/[,\n]/);
            } else if (/[ \t]\d*[ \t]/g.test(matrixString)) {
                // space|tab separated values
                matrixData = matrixString.split(/\s/g);
            } else {
                // 0|1 pattern.
                matrixData = matrixString.replace(/\s/g, '')
                    .split('');
                matrixData = matrixData.map(level => ((level === '0') ? 0 : 100));
            }
            matrixData = matrixData.map(brightness =>
                (Math.max(0,
                    Math.min(100,
                        Number(brightness)) * 255 / 100))); // percent to 8bits value
            const matrix = [];
            for (let line = 0; line < 5; line++) {
                matrix[line] = [];
                for (let col = 0; col < 5; col++) {
                    matrix[line][col] = matrixData[(line * 5) + col];
                }
            }
            return this._peripheral.displayPixels(matrix, util);
        }

        /**
         * Display text on the 5x5 LED matrix.
         * Displayable character is ascii and non-ascii is replaced to '?'.
         * @param {object} args - the block's arguments.
         * @param {string} args.TEXT - The contents to display.
         * @param {number} args.DELAY - The time to delay between characters, in milliseconds.
         * @param {object} util - utility object provided by the runtime.
         * @return {Promise} - a Promise that resolves after the text is done printing or undefinde if yield.
         * Note the limit is 18 characters
         * The print time is calculated by multiplying the number of horizontal pixels
         * by the default scroll delay of 120ms.
         * The number of horizontal pixels = 6px for each character in the string,
         * 1px before the string, and 5px after the string.
         */
        displayText (args, util) {
            // zenkaku to hankaku
            const text = Cast.toString(args.TEXT)
                .replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, ws => String.fromCharCode(ws.charCodeAt(0) - 0xFEE0))
                .replace(/”/g, '"')
                .replace(/’/g, "'")
                .replace(/‘/g, '`')
                .replace(/￥/g, '\\')
                // eslint-disable-next-line no-irregular-whitespace
                .replace(/　/g, ' ')
                .replace(/〜/g, '~');
            let delay = parseInt(args.DELAY, 10);
            delay = isNaN(delay) ? 120 : delay; // Use default delay if NaN.
            const resultPromise = this._peripheral.displayText(text, delay, util);
            if (!resultPromise) return; // This thread was yielded.
            const yieldDelay = delay * ((6 * text.length) + 6);
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, yieldDelay);
            });
        }

        /**
         * Turn all 5x5 matrix LEDs off.
         * @param {object} args - the block's arguments.
         * @param {object} util - utility object provided by the runtime.
         * @return {Promise} - a Promise that resolves after a tick or undefinde if yield.
         */
        displayClear (args, util) {
            const matrix = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
            return this._peripheral.displayPixels(matrix, util);
        }

        /**
         * Test the selected pin is high as digital.
         * @param {object} args - the block's arguments.
         * @param {number} args.PIN - pin ID.
         * @return {boolean} - true if the pin is high.
         */
        isPinHigh (args) {
            return this._peripheral.isPinHigh(parseInt(args.PIN, 10));
        }

        /**
         * Get amount of light (0 - 255) on the LEDs.
         * @param {object} args - the block's arguments.
         * @return {number} - light level.
         */
        getLightLevel () {
            const level = this._peripheral.readLightLevel();
            return Math.round(level * 1000 / 255) / 10;
        }

        /**
         * Get temperature (integer in celsius) of micro:bit.
         * @param {object} args - the block's arguments.
         * @return {number} - value of temperature [centigrade].
         */
        getTemperature () {
            return this._peripheral.readTemperature();
        }

        /**
         * Get loudness of the sound from microphone on micro:bit.
         * @param {object} args - the block's arguments.
         * @param {object} util - utility object provided by the runtime.
         * @return {Promise} - a Promise that resolves digital input value of the pin or undefinde if yield.
         */
        getSoundLevel (args, util) {
            const resultPromise = this._peripheral.configMic(true, util);
            if (!resultPromise) return; // This thread was yielded.
            return resultPromise
                .then(micState => {
                    if (micState) {
                        return Math.round(this._peripheral.readSoundLevel() * 1000 / 255) / 10;
                    }
                    return 0;
                });
        }

        /**
         * Return angle from the north to the micro:bit heading direction.
         * @return {number} - degree of compass heading angle from the north (0 - 359 degrees).
         */
        getCompassHeading () {
            return this._peripheral.readCompassHeading();
        }

        /**
         * Return analog value of the pin.
         * @param {object} args - the block's arguments.
         * @param {number} args.PIN - pin ID.
         * @param {object} util - utility object provided by the runtime.
         * @return {?Promise} a Promise that resolves analog input value of the pin or undefined if this process was yield.
         */
        getAnalogValue (args, util) {
            const pinIndex = parseInt(args.PIN, 10);
            const resultPromise = this._peripheral.readAnalogIn(pinIndex, util);
            if (!resultPromise) return;
            return resultPromise.then(level => Math.round(level * 100 * 10 / 1024) / 10);
        }

        /**
         * Return digital value of the pin.
         * @param {object} args - the block's arguments.
         * @param {number} args.PIN - pin ID.
         * @return {number} - digital input value of the pin.
         */
        getDigitalValue (args) {
            return this._peripheral.readDigitalLevel(parseInt(args.PIN, 10));
        }

        /**
         * Send data with label.
         * @param {object} args - the block's arguments.
         * @property {string} args.LABEL - label of the data.
         * @property {string} args.DATA - content of the data.
         * @param {object} util - utility object provided by the runtime.
         * @return {?Promise} - a Promise that resolves when the process was done or undefined if this process was yield.
         */
        sendData (args, util) {
            if (args.LABEL.length <= 0) {
                return;
            }
            return this._peripheral.sendData(args.LABEL, args.DATA, util);
        }

        /**
         * Set pull mode of the pin.
         * @param {object} args - the block's arguments.
         * @param {number} args.PIN - pin ID.
         * @param {MbitMorePullModeName} args.MODE - mode to set.
         * @param {BlockUtility} util - utility object provided by the runtime.
         * @return {promise | undefined} - a Promise that resolves when the command was sent
         *                                 or undefined if this process was yield.
         */
        setPullMode (args, util) {
            return this._peripheral.setPullMode(parseInt(args.PIN, 10), MbitMorePullModeID[args.MODE], util);
        }

        /**
         * Set the pin to Output mode and level.
         * @param {object} args - the block's arguments.
         * @param {number} args.PIN - pin ID.
         * @param {boolean | string | number} args.LEVEL - value to be set.
         * @param {object} util - utility object provided by the runtime.
         * @return {promise | undefined} - a Promise that resolves when the command was sent
         *                                 or undefined if this process was yield.
         */
        setDigitalOut (args, util) {
            let level = (args.LEVEL === true);
            level = level || (args.LEVEL === 'true');
            if (!level) {
                const num = Number(args.LEVEL);
                if (!isNaN(num)) {
                    level = (num > 0);
                }
            }
            return this._peripheral.setPinOutput(parseInt(args.PIN, 10), level, util);
        }

        /**
         * Set the pin to PWM mode and level.
         * @param {object} args - the block's arguments.
         * @param {number} args.PIN - pin ID.
         * @param {number} args.LEVEL - value[%] for PWM.
         * @param {BlockUtility} util - utility object provided by the runtime.
         * @return {promise | undefined} - a Promise that resolves when the command was sent
         *                                 or undefined if this process was yield.
         */
        setAnalogOut (args, util) {
            let percent = parseInt(args.LEVEL, 10);
            if (isNaN(percent)) {
                return;
            }
            percent = Math.max(0, Math.min(percent, 100));
            const level = Math.round(percent * 1024 / 100);
            return this._peripheral.setPinPWM(
                parseInt(args.PIN, 10),
                level,
                util
            );
        }

        /**
         * Set the pin to Servo mode and angle.
         * @param {object} args - the block's arguments.
         * @param {number} args.PIN - pin ID.
         * @param {BlockUtility} util - utility object provided by the runtime.
         * @return {promise | undefined} - a Promise that resolves when the command was sent
         *                                 or undefined if this process was yield.
         */
        setServo (args, util) {
            let angle = parseInt(args.ANGLE, 10);
            if (isNaN(angle)) return;
            angle = Math.max(0, angle);
            angle = Math.min(angle, 180);
            // let range = parseInt(args.RANGE, 10);
            // if (isNaN(range)) range = 0;
            // range = Math.max(0, range);
            // let center = parseInt(args.CENTER, 10);
            // if (isNaN(center)) range = 0;
            // center = Math.max(0, center);
            return this._peripheral.setPinServo(parseInt(args.PIN, 10), angle, null, null, util);
        }

        /**
         * Return the value of magnetic force [micro tesla] on axis.
         * @param {object} args - the block's arguments.
         * @property {AxisSymbol} AXIS - the axis (X, Y, Z, Absolute).
         * @return {number} - value of magnetic force.
         */
        getMagneticForce (args) {
            return this._peripheral.readMagneticForce(args.AXIS);
        }

        /**
         * Return the value of acceleration on the specified axis.
         * @param {object} args - the block's arguments.
         * @param {AxisSymbol} args.AXIS - direction to get.
         * @return {number} - value of acceleration.
         */
        getAcceleration (args) {
            return this._peripheral.readAcceleration(args.AXIS);
        }

        /**
         * Return pitch [degrees] of the micro:bit heading direction.
         * @return {number} - degree of pitch.
         */
        getPitch () {
            return this._peripheral.readPitch();
        }

        /**
         * Read roll [degrees] of the micro:bit heading direction.
         * @return {number} - degree of roll.
         */
        getRoll () {
            return this._peripheral.readRoll();
        }


        /**
         * Play tone on the speaker.
         * @param {object} args - the block's arguments.
         * @param {string} args.FREQ - wave frequency to play
         * @param {string} args.VOL laudness of tone
         * @param {object} util - utility object provided by the runtime.
         * @return {promise | undefined} - a Promise that resolves when the command was sent
         *                                 or undefined if this process was yield.
         */
        playTone (args, util) {
            const frequency = parseFloat(args.FREQ);
            let volume = parseInt(args.VOL, 10);
            volume = Math.min(100, (Math.max(0, volume)));
            return this._peripheral.playTone(frequency, volume, util);
        }

        /**
         * Stop playing tone on the speaker.
         * @param {object} args - the block's arguments.
         * @param {object} util - utility object provided by the runtime.
         * @return {promise | undefined} - a Promise that resolves when the command was sent
         *                                 or undefined if this process was yield.
         */
        stopTone (args, util) {
            return this._peripheral.stopTone(util);
        }

        /**
         * Set listening event type at the pin.
         * @param {object} args - the block's arguments.
         * @param {number} args.PIN - pin ID.
         * @param {string} args.EVENT_TYPE - event to listen.
         * @param {BlockUtility} util - utility object provided by the runtime.
         * @return {promise | undefined} - a Promise that resolves when the command was sent
         *                                 or undefined if this process was yield.
        */
        listenPinEventType (args, util) {
            return this._peripheral.listenPinEventType(parseInt(args.PIN, 10), MbitMorePinEventType[args.EVENT_TYPE], util);
        }

        /**
         * Rerutn value (timestamp of the edge or duration of the pulse) of the event or 0 when the event is not received.
         * @param {object} args - the block's arguments.
         * @param {number} args.PIN - pin ID.
         * @param {string} args.EVENT - event value to get.
         * @param {object} util - utility object provided by the runtime.
         * @return {number} - timestamp of the event or 0.
         */
        getPinEventValue (args) {
            const value = this._peripheral.getPinEventValue(parseInt(args.PIN, 10), MbitMorePinEvent[args.EVENT]);
            return value ? value : 0;
        }

        /**
         * Update the previous occured time of all pin events.
         */
        updatePrevPinEvents () {
            this.prevPinEvents = {};
            Object.entries(this._peripheral._pinEvents).forEach(([pinIndex, events]) => {
                this.prevPinEvents[pinIndex] = {};
                Object.entries(events).forEach(([eventID, eventData]) => {
                    this.prevPinEvents[pinIndex][eventID] = {};
                    Object.entries(eventData).forEach(([key, value]) => {
                        this.prevPinEvents[pinIndex][eventID][key] = value;
                    });
                });
            });
        }

        /**
         * Return the previous timestamp of the pin event or undefined if the event was not received.
         * @param {number} pinIndex - index of the pin to get the event.
         * @param {MbitMorePinEvent} eventID - ID of the event to get.
         * @return {?number} Timestamp of the previous event or null.
         */
        getPrevPinEventTimestamp (pinIndex, eventID) {
            if (this.prevPinEvents[pinIndex] && this.prevPinEvents[pinIndex][eventID]) {
                return this.prevPinEvents[pinIndex][eventID].timestamp;
            }
            return null;
        }

        /**
         * Test whether the event raised at the pin.
         * @param {object} args - the block's arguments.
         * @param {number} args.PIN - pin ID.
         * @param {string} args.EVENT - event to catch.
         * @return {boolean} - true if the event raised.
         */
        whenPinEvent (args) {
            if (!this.updateLastPinEventTimer) {
                this.updateLastPinEventTimer = setTimeout(() => {
                    this.updatePrevPinEvents();
                    this.updateLastPinEventTimer = null;
                }, this.runtime.currentStepTime);
            }
            const pinIndex = parseInt(args.PIN, 10);
            const eventID = MbitMorePinEvent[args.EVENT];
            const lastTimestamp =
                this._peripheral.getPinEventTimestamp(pinIndex, eventID);
            if (lastTimestamp === null) return false;
            const prevTimestamp = this.getPrevPinEventTimestamp(pinIndex, eventID);
            if (prevTimestamp === null) return true;
            return lastTimestamp !== prevTimestamp;
        }

        /**
         * Rerutn the last content of the messge or undefined if the data which has the label is not received.
         * @param {object} args - the block's arguments.
         * @param {number} args.LABEL - label of the data.
         * @return {?(string | number)} - content of the data or empty string when the data was null
         */
        getDataLabeled (args) {
            const data = this._peripheral.getDataLabeled(args.LABEL);
            if (data === null) {
                return '';
            }
            return data;
        }

        /**
         * Update the previous occured time of all received data.
         */
        updatePrevReceivedData () {
            this.prevReceivedData = {};
            Object.entries(this._peripheral.receivedData).forEach(([label, contentObject]) => {
                this.prevReceivedData[label] = {};
                Object.entries(contentObject).forEach(([key, value]) => {
                    this.prevReceivedData[label][key] = value;
                });
            });
        }

        /**
         * Return the previous timestamp of the data or undefined if the data was not received.
         * @param {string} label - label of the data.
         * @return {?number} Timestamp of the previous data or null.
         */
        getPrevReceivedDataTimestamp (label) {
            if (this.prevReceivedData[label]) {
                return this.prevReceivedData[label].timestamp;
            }
            return null;
        }

        /**
         * Test whether the data received which had the label.
         * @param {object} args - the block's arguments.
         * @param {number} args.LABEL - label of the data.
         * @return {boolean} - true if the data received.
         */
        whenDataReceived (args) {
            if (!this.updateLastDataTimer) {
                this.updateLastDataTimer = setTimeout(() => {
                    this.updatePrevReceivedData();
                    this.updateLastDataTimer = null;
                }, this.runtime.currentStepTime);
            }
            const label = args.LABEL;
            const lastTimestamp =
                this._peripheral.getDataTimestamp(label);
            if (lastTimestamp === null) return false;
            const prevTimestamp = this.getPrevReceivedDataTimestamp(label);
            if (prevTimestamp === null) return true;
            return lastTimestamp !== prevTimestamp;
        }

        /**
         * Test whether a micro:bit connected.
         * @param {object} args - the block's arguments.
         * @property {string} args.STATE - the state of connection to check.
         * @return {boolean} - true if the state is matched.
         */
        whenConnectionChanged (args) {
            const state = (args.STATE === 'connected');
            return (state === this._peripheral.isConnected());
        }
    }

    Scratch.extensions.register(new MbitMoreBlocks());

    Scratch.extensions.translations({
        en: {
            'microbitMore.gesturesMenu.tiltUp': 'tilt up',
            'microbitMore.gesturesMenu.tiltDown': 'tilt down',
            'microbitMore.gesturesMenu.tiltLeft': 'tilt left',
            'microbitMore.gesturesMenu.tiltRight': 'tilt right',
            'microbitMore.gesturesMenu.faceUp': 'face up',
            'microbitMore.gesturesMenu.faceDown': 'face down',
            'microbitMore.gesturesMenu.freefall': 'freefall',
            'microbitMore.gesturesMenu.g3': '3G',
            'microbitMore.gesturesMenu.g6': '6G',
            'microbitMore.gesturesMenu.g8': '8G',
            'microbitMore.gesturesMenu.shake': 'shake',
            'microbitMore.buttonIDMenu.a': 'A',
            'microbitMore.buttonIDMenu.b': 'B',
            'microbitMore.buttonEventMenu.down': 'down',
            'microbitMore.buttonEventMenu.up': 'up',
            'microbitMore.buttonEventMenu.click': 'click',
            // 'microbitMore.buttonEventMenu.hold': 'hold',
            // 'microbitMore.buttonEventMenu.longClick': 'long click',
            // 'microbitMore.buttonEventMenu.doubleClick': 'double click',
            'microbitMore.touchIDMenu.logo': 'LOGO',
            'microbitMore.touchEventMenu.touched': 'touched',
            'microbitMore.touchEventMenu.released': 'released',
            'microbitMore.touchEventMenu.tapped': 'tapped',
            // 'microbitMore.touchEventMenu.hold': 'hold',
            // 'microbitMore.touchEventMenu.longTapped': 'long tapped',
            // 'microbitMore.touchEventMenu.doubleTapped': 'double tapped',
            'microbitMore.digitalValueMenu.Low': 'low',
            'microbitMore.digitalValueMenu.High': 'high',
            'microbitMore.axisMenu.x': 'x',
            'microbitMore.axisMenu.y': 'y',
            'microbitMore.axisMenu.z': 'z',
            'microbitMore.axisMenu.absolute': 'absolute',
            'microbitMore.pinModeMenu.pullNone': 'pull none',
            'microbitMore.pinModeMenu.pullUp': 'pull up',
            'microbitMore.pinModeMenu.pullDown': 'pull down',
            'microbitMore.pinEventMenu.pulseLow': 'low pulse',
            'microbitMore.pinEventMenu.pulseHigh': 'high pulse',
            'microbitMore.pinEventMenu.fall': 'fall',
            'microbitMore.pinEventMenu.rise': 'rise',
            'microbitMore.pinEventTimestampMenu.pulseLow': 'low pulse',
            'microbitMore.pinEventTimestampMenu.pulseHigh': 'high pulse',
            'microbitMore.pinEventTimestampMenu.fall': 'fall',
            'microbitMore.pinEventTimestampMenu.rise': 'rise',
            'microbitMore.pinEventTypeMenu.none': 'none',
            'microbitMore.pinEventTypeMenu.pulse': 'pulse',
            'microbitMore.pinEventTypeMenu.edge': 'edge',
            'microbitMore.connectionStateMenu.connected': 'connected',
            'microbitMore.connectionStateMenu.disconnected': 'disconnected',
            'microbitMore.whenConnectionChanged': 'when micro:bit [STATE]',
            'microbitMore.whenButtonEvent': 'when button [NAME] is [EVENT]',
            'microbitMore.isButtonPressed': 'button [NAME] pressed?',
            'microbitMore.whenTouchEvent': 'when pin [NAME] is [EVENT]',
            'microbitMore.isPinTouched': 'pin [NAME] is touched?',
            'microbitMore.whenGesture': 'when [GESTURE]',
            'microbitMore.displayMatrix': 'display pattern [MATRIX] ',
            'microbitMore.displayText': 'display text [TEXT] delay [DELAY] ms',
            'microbitMore.clearDisplay': 'clear display',
            'microbitMore.lightLevel': 'light intensity',
            'microbitMore.temperature': 'temperature',
            'microbitMore.compassHeading': 'angle with the north',
            'microbitMore.pitch': 'pitch',
            'microbitMore.roll': 'roll',
            'microbitMore.soundLevel': 'sound level',
            'microbitMore.magneticForce': 'magnetic force',
            'microbitMore.acceleration': 'acceleration [AXIS]',
            'microbitMore.analogValue': 'analog value of pin [PIN]',
            'microbitMore.setPullMode': 'set pin [PIN] to input [MODE]',
            'microbitMore.isPinHigh': '[PIN] pin is high?',
            'microbitMore.setDigitalOut': 'set [PIN] digital [LEVEL]',
            'microbitMore.setAnalogOut': 'set [PIN] analog [LEVEL] %',
            'microbitMore.setServo': 'set [PIN] servo angle [ANGLE]',
            'microbitMore.playTone': 'play tone [FREQ] Hz volume [VOL] %',
            'microbitMore.stopTone': 'stop tone',
            'microbitMore.listenPinEventType': 'listen [EVENT_TYPE] event on [PIN]',
            'microbitMore.whenPinEvent': 'when catch [EVENT] at pin [PIN]',
            'microbitMore.getPinEventValue': 'value of [EVENT] at [PIN]',
            'microbitMore.whenDataReceived': 'when data with label [LABEL] received from micro:bit',
            'microbitMore.getDataLabeled': 'data of label [LABEL]',
            'microbitMore.sendData': 'send data [DATA] with label [LABEL] to micro:bit',
            'microbitMore.sendData.label': 'label',
            'microbitMore.sendData.data': 'data'
        },
        'zh-cn': {
            'microbitMore.gesturesMenu.tiltUp': '向前倾斜',
            'microbitMore.gesturesMenu.tiltDown': '向后倾斜',
            'microbitMore.gesturesMenu.tiltLeft': '向左倾斜',
            'microbitMore.gesturesMenu.tiltRight': '向右倾斜',
            'microbitMore.gesturesMenu.faceUp': '面朝上',
            'microbitMore.gesturesMenu.faceDown': '面朝下',
            'microbitMore.gesturesMenu.freefall': '自由坠落',
            'microbitMore.gesturesMenu.g3': '3G 加速度',
            'microbitMore.gesturesMenu.g6': '6G 加速度',
            'microbitMore.gesturesMenu.g8': '8G 加速度',
            'microbitMore.gesturesMenu.shake': '摇晃',
            'microbitMore.buttonIDMenu.a': 'A',
            'microbitMore.buttonIDMenu.b': 'B',
            'microbitMore.buttonEventMenu.down': '按下',
            'microbitMore.buttonEventMenu.up': '松开',
            'microbitMore.buttonEventMenu.click': '点击',
            // 'microbitMore.buttonEventMenu.hold': 'hold',
            // 'microbitMore.buttonEventMenu.longClick': 'long click',
            // 'microbitMore.buttonEventMenu.doubleClick': 'double click',
            'microbitMore.touchIDMenu.logo': '徽标',
            'microbitMore.touchEventMenu.touched': '触摸',
            'microbitMore.touchEventMenu.released': '松开',
            'microbitMore.touchEventMenu.tapped': '点击',
            // 'microbitMore.touchEventMenu.hold': 'hold',
            // 'microbitMore.touchEventMenu.longTapped': 'long tapped',
            // 'microbitMore.touchEventMenu.doubleTapped': 'double tapped',
            'microbitMore.digitalValueMenu.Low': '低电平',
            'microbitMore.digitalValueMenu.High': '高电平',
            'microbitMore.axisMenu.x': 'x',
            'microbitMore.axisMenu.y': 'y',
            'microbitMore.axisMenu.z': 'z',
            'microbitMore.axisMenu.absolute': '绝对',
            'microbitMore.pinModeMenu.pullNone': '无',
            'microbitMore.pinModeMenu.pullUp': '拉高',
            'microbitMore.pinModeMenu.pullDown': '拉低',
            'microbitMore.pinEventMenu.pulseLow': '低频脉冲',
            'microbitMore.pinEventMenu.pulseHigh': '高频脉冲',
            'microbitMore.pinEventMenu.fall': '下降',
            'microbitMore.pinEventMenu.rise': '上升',
            'microbitMore.pinEventTimestampMenu.pulseLow': '低频脉冲',
            'microbitMore.pinEventTimestampMenu.pulseHigh': '高频脉冲',
            'microbitMore.pinEventTimestampMenu.fall': '下降',
            'microbitMore.pinEventTimestampMenu.rise': '上升',
            'microbitMore.pinEventTypeMenu.none': '无',
            'microbitMore.pinEventTypeMenu.pulse': '脉冲',
            'microbitMore.pinEventTypeMenu.edge': '边缘',
            'microbitMore.connectionStateMenu.connected': '连接',
            'microbitMore.connectionStateMenu.disconnected': '断开',
            'microbitMore.whenConnectionChanged': '当 micro:bit [STATE]',
            'microbitMore.whenButtonEvent': '当按键 [NAME] 被 [EVENT]',
            'microbitMore.isButtonPressed': '按键 [NAME] 按下?',
            'microbitMore.whenTouchEvent': '当引脚 [NAME] 被 [EVENT]',
            'microbitMore.isPinTouched': '引脚 [NAME] 被触摸?',
            'microbitMore.whenGesture': '当 [GESTURE] 时',
            'microbitMore.displayMatrix': '显示图案 [MATRIX] ',
            'microbitMore.displayText': '显示文本 [TEXT] 延时 [DELAY] ms',
            'microbitMore.clearDisplay': '清空屏幕',
            'microbitMore.lightLevel': '亮度级别',
            'microbitMore.temperature': '温度',
            'microbitMore.compassHeading': '指南针面向',
            'microbitMore.pitch': '旋转',
            'microbitMore.roll': '横滚',
            'microbitMore.soundLevel': '声音响度',
            'microbitMore.magneticForce': '磁力',
            'microbitMore.acceleration': '加速度 [AXIS]',
            'microbitMore.analogValue': '引脚 [PIN] 模拟值',
            'microbitMore.setPullMode': '将引脚 [PIN] 输入模式设为 [MODE]',
            'microbitMore.isPinHigh': '引脚 [PIN] 是高电平?',
            'microbitMore.setDigitalOut': '将引脚 [PIN] 数字值设为 [LEVEL]',
            'microbitMore.setAnalogOut': '将引脚 [PIN] 模拟值设为 [LEVEL] %',
            'microbitMore.setServo': '将引脚 [PIN] 舵机角度设为 [ANGLE]',
            'microbitMore.playTone': '播放 [FREQ] Hz 音频并将音量设为 [VOL] %',
            'microbitMore.stopTone': '停止音频',
            'microbitMore.listenPinEventType': '监听引脚 [PIN] 事件 [EVENT_TYPE]',
            'microbitMore.whenPinEvent': '当引脚 [PIN] 发生 [EVENT] 事件',
            'microbitMore.getPinEventValue': '引脚 [PIN] 的 [EVENT] 值',
            'microbitMore.whenDataReceived': '当从 micro:bit 接收到主题为 [LABEL] 的消息',
            'microbitMore.getDataLabeled': '主题为 [LABEL] 的消息内容',
            'microbitMore.sendData': '广播主题为 [LABEL] 的消息 [DATA] 给 micro:bit',
            'microbitMore.sendData.label': '标题',
            'microbitMore.sendData.data': '数据'
        },
        'zh-tw': {
            'microbitMore.gesturesMenu.tiltUp': '向前傾斜',
            'microbitMore.gesturesMenu.tiltDown': '向後傾斜',
            'microbitMore.gesturesMenu.tiltLeft': '向左傾斜',
            'microbitMore.gesturesMenu.tiltRight': '向右傾斜',
            'microbitMore.gesturesMenu.faceUp': '面朝上',
            'microbitMore.gesturesMenu.faceDown': '面朝下',
            'microbitMore.gesturesMenu.freefall': '自由墜落',
            'microbitMore.gesturesMenu.g3': '3G 加速度',
            'microbitMore.gesturesMenu.g6': '6G 加速度',
            'microbitMore.gesturesMenu.g8': '8G 加速度',
            'microbitMore.gesturesMenu.shake': '搖晃',
            'microbitMore.buttonIDMenu.a': 'A',
            'microbitMore.buttonIDMenu.b': 'B',
            'microbitMore.buttonEventMenu.down': '按下',
            'microbitMore.buttonEventMenu.up': '鬆開',
            'microbitMore.buttonEventMenu.click': '點擊',
            // 'microbitMore.buttonEventMenu.hold': 'hold',
            // 'microbitMore.buttonEventMenu.longClick': 'long click',
            // 'microbitMore.buttonEventMenu.doubleClick': 'double click',
            'microbitMore.touchIDMenu.logo': '徽標',
            'microbitMore.touchEventMenu.touched': '觸摸',
            'microbitMore.touchEventMenu.released': '鬆開',
            'microbitMore.touchEventMenu.tapped': '點擊',
            // 'microbitMore.touchEventMenu.hold': 'hold',
            // 'microbitMore.touchEventMenu.longTapped': 'long tapped',
            // 'microbitMore.touchEventMenu.doubleTapped': 'double tapped',
            'microbitMore.digitalValueMenu.Low': '低電平',
            'microbitMore.digitalValueMenu.High': '高電平',
            'microbitMore.axisMenu.x': 'x',
            'microbitMore.axisMenu.y': 'y',
            'microbitMore.axisMenu.z': 'z',
            'microbitMore.axisMenu.absolute': '絕對',
            'microbitMore.pinModeMenu.pullNone': '無',
            'microbitMore.pinModeMenu.pullUp': '拉高',
            'microbitMore.pinModeMenu.pullDown': '拉低',
            'microbitMore.pinEventMenu.pulseLow': '低頻脈衝',
            'microbitMore.pinEventMenu.pulseHigh': '高頻脈衝',
            'microbitMore.pinEventMenu.fall': '下降',
            'microbitMore.pinEventMenu.rise': '上升',
            'microbitMore.pinEventTimestampMenu.pulseLow': '低頻脈衝',
            'microbitMore.pinEventTimestampMenu.pulseHigh': '高頻脈衝',
            'microbitMore.pinEventTimestampMenu.fall': '下降',
            'microbitMore.pinEventTimestampMenu.rise': '上升',
            'microbitMore.pinEventTypeMenu.none': '無',
            'microbitMore.pinEventTypeMenu.pulse': '脈衝',
            'microbitMore.pinEventTypeMenu.edge': '邊緣',
            'microbitMore.connectionStateMenu.connected': '連接',
            'microbitMore.connectionStateMenu.disconnected': '斷開',
            'microbitMore.whenConnectionChanged': '當 micro:bit [STATE]',
            'microbitMore.whenButtonEvent': '當按鍵 [NAME] 被 [EVENT]',
            'microbitMore.isButtonPressed': '按鍵 [NAME] 按下?',
            'microbitMore.whenTouchEvent': '當引腳 [NAME] 被 [EVENT]',
            'microbitMore.isPinTouched': '引腳 [NAME] 被觸摸?',
            'microbitMore.whenGesture': '當 [GESTURE] 時',
            'microbitMore.displayMatrix': '顯示圖案 [MATRIX] ',
            'microbitMore.displayText': '顯示文本 [TEXT] 延時 [DELAY] ms',
            'microbitMore.clearDisplay': '清空屏幕',
            'microbitMore.lightLevel': '亮度級別',
            'microbitMore.temperature': '溫度',
            'microbitMore.compassHeading': '指南針面向',
            'microbitMore.pitch': '旋轉',
            'microbitMore.roll': '橫滾',
            'microbitMore.soundLevel': '聲音響度',
            'microbitMore.magneticForce': '磁力',
            'microbitMore.acceleration': '加速度 [AXIS]',
            'microbitMore.analogValue': '引腳 [PIN] 模擬值',
            'microbitMore.setPullMode': '將引腳 [PIN] 輸入模式設為 [MODE]',
            'microbitMore.isPinHigh': '引腳 [PIN] 是高電平?',
            'microbitMore.setDigitalOut': '將引腳 [PIN] 數字值設為 [LEVEL]',
            'microbitMore.setAnalogOut': '將引腳 [PIN] 模擬值設為 [LEVEL] %',
            'microbitMore.setServo': '將引腳 [PIN] 舵機角度設為 [ANGLE]',
            'microbitMore.playTone': '播放 [FREQ] Hz 音頻並將音量設為 [VOL] %',
            'microbitMore.stopTone': '停止音頻',
            'microbitMore.listenPinEventType': '監聽引腳 [PIN] 事件 [EVENT_TYPE]',
            'microbitMore.whenPinEvent': '當引腳 [PIN] 發生 [EVENT] 事件',
            'microbitMore.getPinEventValue': '引腳 [PIN] 的 [EVENT] 值',
            'microbitMore.whenDataReceived': '當從 micro:bit 接收到主題為 [LABEL] 的消息',
            'microbitMore.getDataLabeled': '主題為 [LABEL] 的消息內容',
            'microbitMore.sendData': '廣播主題為 [LABEL] 的消息 [DATA] 給 micro:bit',
            'microbitMore.sendData.label': '標題',
            'microbitMore.sendData.data': '數據'
        },
    });
})();
