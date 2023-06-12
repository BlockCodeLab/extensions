// https://github.com/bricklife/scratch-lego-bluetooth-extensions/tree/master/scratch-vm/src/extensions/scratch3_legoble
(function (Scratch) {
    const BLE = Scratch.BLE;
    const Base64Util = Scratch.Base64Util;
    const MathUtil = Scratch.MathUtil;
    const RateLimiter = Scratch.RateLimiter;

    // const log = Scratch.log;

    const IOType = {
        SIMPLE_MEDIUM_LINEAR_MOTOR: 0x01,
        TRAIN_MOTOR: 0x02,
        BUTTION: 0x05,
        LIGHT: 0x08,
        VOLTAGE: 0x14,
        CURRENT: 0x15,
        PIEZO_TONE: 0x16,
        RGB_LIGHT: 0x17,
        TILT_SENSOR: 0x22,
        MOTION_SENSOR: 0x23,
        COLOR_DISTANCE_SENSOR: 0x25,
        MEDIUM_LINEAR_MOTOR: 0x26,
        MOVE_HUB_MOTOR: 0x27,
        MOVE_HUB_TILT_SENSOR: 0x28,
        DUPLO_TRAIN_BASE_MOTOR: 0x29,
        DUPLO_TRAIN_BASE_SPEAKER: 0x2a,
        DUPLO_TRAIN_BASE_COLOR_SENSOR: 0x2b,
        DUPLO_TRAIN_BASE_SPEEDOMETER: 0x2c,
        TECHNIC_LARGE_MOTOR: 0x2e,
        TECHNIC_XL_MOTOR: 0x2f,
        TECHNIC_MEDIUM_ANGULAR_MOTOR: 0x30,
        TECHNIC_LARGE_ANGULAR_MOTOR: 0x31,
        REMOTE_POWER_CONTROL_BUTTON: 0x37,
        TECHNIC_HUB_TILT_SENSOR: 0x3b,
        TECHNIC_COLOR_SENSOR: 0x3d,
        TECHNIC_DISTANCE_SENSOR: 0x3e,
        TECHNIC_FORCE_SENSOR: 0x3f,
        TECHNIC_SMALL_ANGULAR_MOTOR: 0x41,
        MARIO_COLOR_BARCODE_SENSOR: 0x49,
        MARIO_PANTS: 0x4a,
        TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY: 0x4b,
        TECHNIC_LARGE_ANGULAR_MOTOR_GRAY: 0x4c,
    };

    class GenericDevice {

        constructor(ioType) {
            this._ioType = ioType;
            this._inputValues = {};
        }

        get ioType() {
            return this._ioType;
        }

        get mode() {
            switch (this._ioType) {
                case IOType.MEDIUM_LINEAR_MOTOR:
                case IOType.MOVE_HUB_MOTOR:
                case IOType.TECHNIC_LARGE_MOTOR:
                case IOType.TECHNIC_XL_MOTOR:
                case IOType.TECHNIC_MEDIUM_ANGULAR_MOTOR:
                case IOType.TECHNIC_LARGE_ANGULAR_MOTOR:
                case IOType.TECHNIC_SMALL_ANGULAR_MOTOR:
                case IOType.TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY:
                case IOType.TECHNIC_LARGE_ANGULAR_MOTOR_GRAY:
                    return 2; // Relative Position
                case IOType.TILT_SENSOR:
                    return 0; // Tilt X, Y
                case IOType.MOTION_SENSOR:
                    return 0; // Distance
                case IOType.COLOR_DISTANCE_SENSOR:
                    return 8; // Color and Distance
                case IOType.MOVE_HUB_TILT_SENSOR:
                    return 0; // Tilt X, Y
                case IOType.DUPLO_TRAIN_BASE_SPEAKER:
                    return 1; // Sound
                case IOType.DUPLO_TRAIN_BASE_COLOR_SENSOR:
                    return 1; // Color
                case IOType.DUPLO_TRAIN_BASE_SPEEDOMETER:
                    return 1; // Driving Distance
                case IOType.REMOTE_POWER_CONTROL_BUTTON:
                    return 0; // Button
                case IOType.TECHNIC_HUB_TILT_SENSOR:
                    return 0; // Tilt X, Y, Z
                case IOType.TECHNIC_COLOR_SENSOR:
                    return 0; // Color
                case IOType.TECHNIC_DISTANCE_SENSOR:
                    return 0; // Distance
                case IOType.TECHNIC_FORCE_SENSOR:
                    return 0; // Force
                case IOType.MARIO_COLOR_BARCODE_SENSOR:
                    return 0
                case IOType.MARIO_PANTS:
                    return 0
                default:
                    return null;
            }
        }

        get inputValues() {
            return this._inputValues;
        }

        updateInputValues(data) {
            if (data.length == 0) {
                this._inputValues = {};
                return;
            }

            const buffer = Buffer.from(data);

            switch (this._ioType) {
                case IOType.MEDIUM_LINEAR_MOTOR:
                case IOType.MOVE_HUB_MOTOR:
                case IOType.TECHNIC_LARGE_MOTOR:
                case IOType.TECHNIC_XL_MOTOR:
                case IOType.TECHNIC_MEDIUM_ANGULAR_MOTOR:
                case IOType.TECHNIC_LARGE_ANGULAR_MOTOR:
                case IOType.TECHNIC_SMALL_ANGULAR_MOTOR:
                case IOType.TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY:
                case IOType.TECHNIC_LARGE_ANGULAR_MOTOR_GRAY:
                    this._inputValues = {
                        relativePosition: buffer.readInt32LE(0)
                    };
                    break;

                case IOType.TILT_SENSOR:
                    this._inputValues = {
                        tiltX: buffer.readInt8(0),
                        tiltY: buffer.readInt8(1)
                    };
                    break;

                case IOType.MOTION_SENSOR:
                    this._inputValues = {
                        distance: buffer.readInt8(0)
                    };
                    break;

                case IOType.COLOR_DISTANCE_SENSOR:
                    this._inputValues = {
                        color: buffer.readInt8(0),
                        distance: buffer.readInt8(1)
                    };
                    break;

                case IOType.MOVE_HUB_TILT_SENSOR:
                    this._inputValues = {
                        tiltX: buffer.readInt8(0),
                        tiltY: buffer.readInt8(1)
                    };
                    break;

                case IOType.DUPLO_TRAIN_BASE_COLOR_SENSOR:
                    const value = buffer.readInt8(0);
                    if (value > -1) {
                        this._inputValues = {
                            color: value
                        };
                        setTimeout(() => {
                            this._inputValues = {
                                color: -1
                            };
                        }, 100);
                    }
                    break;

                case IOType.DUPLO_TRAIN_BASE_SPEEDOMETER:
                    this._inputValues = {
                        drivingDistance: buffer.readInt32LE(0)
                    };
                    break;

                case IOType.REMOTE_POWER_CONTROL_BUTTON:
                    this._inputValues = {
                        button: buffer.readInt8(0)
                    };
                    break;

                case IOType.TECHNIC_HUB_TILT_SENSOR:
                    this._inputValues = {
                        tiltX: buffer.readInt16LE(4),
                        tiltY: buffer.readInt16LE(2),
                        tiltZ: buffer.readInt16LE(0)
                    };
                    break;

                case IOType.TECHNIC_COLOR_SENSOR:
                    this._inputValues = {
                        color: buffer.readInt8(0)
                    };
                    break;

                case IOType.TECHNIC_DISTANCE_SENSOR:
                    this._inputValues = {
                        distance: buffer.readInt16LE(0)
                    };
                    break;

                case IOType.TECHNIC_FORCE_SENSOR:
                    this._inputValues = {
                        force: buffer.readInt8(0)
                    };
                    break;

                case IOType.MARIO_COLOR_BARCODE_SENSOR:
                    this._inputValues = {
                        barcode: buffer.readInt16LE(0),
                        color: buffer.readInt16LE(2)
                    };
                    break;

                case IOType.MARIO_PANTS:
                    this._inputValues = {
                        pants: buffer.readInt8(0)
                    };
                    break;

                default:
                    this._inputValues = {};
                    break;
            }

            this._inputValues.bytes = buffer;
        }
    }

    class Motor extends GenericDevice {

        constructor(ioType) {
            super(ioType);

            switch (ioType) {
                case IOType.MEDIUM_LINEAR_MOTOR:
                case IOType.MOVE_HUB_MOTOR:
                    this._canUseSpeed = true;
                    this._canUsePosition = false;
                    this._speed = 75;
                    break;

                case IOType.TECHNIC_LARGE_MOTOR:
                case IOType.TECHNIC_XL_MOTOR:
                case IOType.TECHNIC_MEDIUM_ANGULAR_MOTOR:
                case IOType.TECHNIC_LARGE_ANGULAR_MOTOR:
                case IOType.TECHNIC_SMALL_ANGULAR_MOTOR:
                case IOType.TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY:
                case IOType.TECHNIC_LARGE_ANGULAR_MOTOR_GRAY:
                    this._canUseSpeed = true;
                    this._canUsePosition = true;
                    this._speed = 75;
                    break;

                default:
                    this._canUseSpeed = false;
                    this._canUsePosition = false;
                    this._speed = 0;
            }
        }

        get canUseSpeed() {
            return this._canUseSpeed;
        }

        get canUsePosition() {
            return this._canUsePosition;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            if (this._canUseSpeed) {
                this._speed = MathUtil.clamp(value, -100, 100);
            }
        }
    }

    const createDevice = function (ioType) {
        switch (ioType) {
            case IOType.SIMPLE_MEDIUM_LINEAR_MOTOR:
            case IOType.TRAIN_MOTOR:
            case IOType.LIGHT:
            case IOType.MEDIUM_LINEAR_MOTOR:
            case IOType.MOVE_HUB_MOTOR:
            case IOType.DUPLO_TRAIN_BASE_MOTOR:
            case IOType.TECHNIC_LARGE_MOTOR:
            case IOType.TECHNIC_XL_MOTOR:
            case IOType.TECHNIC_MEDIUM_ANGULAR_MOTOR:
            case IOType.TECHNIC_LARGE_ANGULAR_MOTOR:
            case IOType.TECHNIC_SMALL_ANGULAR_MOTOR:
            case IOType.TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY:
            case IOType.TECHNIC_LARGE_ANGULAR_MOTOR_GRAY:
                return new Motor(ioType);

            default:
                return new GenericDevice(ioType);
        }
    }

    let _TextDecoder;
    if (typeof TextDecoder === 'undefined') {
        _TextDecoder = null;
    } else {
        _TextDecoder = TextDecoder;
    }

    const ServiceUUID = '00001623-1212-efde-1623-785feabcd123';
    const CharacteristicUUID = '00001624-1212-efde-1623-785feabcd123';
    const SendRateMax = 20;
    const PollingInterval = 3000;

    const MAX_INT32 = Math.pow(2, 31) - 1;
    const MIN_INT32 = Math.pow(2, 31) * -1;
    const MAX_INT16 = Math.pow(2, 15) - 1;

    const MessageType = {
        HUB_PROPERTIES: 0x01,
        HUB_ATTACHED_IO: 0x04,
        GENERIC_ERROR_MESSAGES: 0x05,
        PORT_INPUT_FORMAT_SETUP: 0x41,
        PORT_INPUT_FORMAT_SETUP_COMBINED: 0x42,
        PORT_VALUE: 0x45,
        PORT_VALUE_COMBINED: 0x46,
        PORT_OUTPUT_COMMAND: 0x81,
        PORT_OUTPUT_COMMAND_FEEDBACK: 0x82,
    };

    const HubPropertyReference = {
        ADVERTISING_NAME: 0x01,
        BUTTON: 0x02,
        FW_VERSION: 0x03,
        BATTERY_VOLTAGE: 0x06,
        SPEAKER_VOLUME: 0x12,
    };

    const HubPropertyOperation = {
        SET: 0x01,
        ENABLE_UPDATES: 0x02,
        DISABLE_UPDATES: 0x03,
        RESET: 0x04,
        REQUEST_UPDATE: 0x05,
        UPDATE: 0x06,
    };

    const numberToInt32Array = function (number) {
        const buffer = new ArrayBuffer(4);
        const dataview = new DataView(buffer);
        dataview.setInt32(0, number);
        return [
            dataview.getUint8(3),
            dataview.getUint8(2),
            dataview.getUint8(1),
            dataview.getUint8(0)
        ];
    };

    const numberToInt16Array = function (number) {
        const buffer = new ArrayBuffer(2);
        const dataview = new DataView(buffer);
        dataview.setInt16(0, number);
        return [
            dataview.getUint8(1),
            dataview.getUint8(0)
        ];
    };

    class Hub {

        constructor(runtime, extensionId, hubType = null) {
            this._runtime = runtime;
            this._extensionId = extensionId;
            this._hubType = hubType;

            this._name = null;
            this._firmwareVersion = null;
            this._batteryLevel = 0;
            this._devices = [];

            this._firstNotificationCallback = null;
            this._outputCommandFeedbackCallbacks = [];
            this._outputCommandCompletionCallbacks = [];

            this._ble = null;
            this._runtime.registerPeripheralExtension(extensionId, this);
            this._runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));

            this._rateLimiter = new RateLimiter(SendRateMax);

            this._pollingId = null;

            this.reset = this.reset.bind(this);
            this._onConnect = this._onConnect.bind(this);
            this._onMessage = this._onMessage.bind(this);
        }

        get name() {
            return this._name;
        }

        get firmwareVersion() {
            return this._firmwareVersion;
        }

        get batteryLevel() {
            return this._batteryLevel;
        }

        // BLE

        scan() {
            if (this._ble) {
                this._ble.disconnect();
            }

            let hubTypeFilter = {
                dataPrefix: []
            };
            if (this._hubType) {
                hubTypeFilter = {
                    dataPrefix: [0x00, this._hubType],
                    mask: [0x00, 0xff]
                };
            }

            this._ble = new BLE(this._runtime, this._extensionId, {
                filters: [{
                    services: [ServiceUUID],
                    // manufacturerData: {
                    //     0x0397: hubTypeFilter
                    // }
                }],
                optionalServices: []
            }, this._onConnect, this.reset);
        }

        connect(id) {
            if (this._ble) {
                this._ble.connectPeripheral(id);
            }
        }

        disconnect() {
            if (this._ble) {
                this._ble.disconnect();
            }
            this.reset();
        }

        isConnected() {
            let connected = false;
            if (this._ble) {
                connected = this._ble.isConnected();
            }
            return connected;
        }

        _onConnect() {
            this._ble.startNotifications(
                ServiceUUID,
                CharacteristicUUID,
                this._onMessage
            );

            this._firstNotificationCallback = () => {
                this.sendMessage(MessageType.HUB_PROPERTIES, [HubPropertyReference.ADVERTISING_NAME, HubPropertyOperation.ENABLE_UPDATES], false);
                this.sendMessage(MessageType.HUB_PROPERTIES, [HubPropertyReference.FW_VERSION, HubPropertyOperation.REQUEST_UPDATE]);
            };

            this._startPollingBatteryLevel();
        }

        _onMessage(base64) {
            const data = Base64Util.base64ToUint8Array(base64);
            //logByteArray('<<', data);

            const length = data[0];
            if (length > 127) {
                //log.warn(`Unsupported message length: ${length}`);
                return;
            }

            const messageType = data[2];
            switch (messageType) {
                case MessageType.HUB_PROPERTIES: {
                    const property = data[3];
                    switch (property) {
                        case HubPropertyReference.ADVERTISING_NAME:
                            if (_TextDecoder) {
                                const uint8Array = new Uint8Array(data.slice(5));
                                this._name = (new _TextDecoder()).decode(uint8Array);
                            } else {
                                this._name = 'unsupported';
                            }
                            break;
                        case HubPropertyReference.FW_VERSION:
                            const value = data.slice(5);
                            if (value.length == 4) {
                                const s = value.reduce((output, elem) =>
                                    (('0' + (elem & 0xff).toString(16)).slice(-2)) + output, '');
                                this._firmwareVersion = s.slice(0, 1) + '.' + s.slice(1, 2) + '.' + s.slice(2, 4) + '.' + s.slice(4);
                            }
                            break;
                        case HubPropertyReference.BATTERY_VOLTAGE:
                            this._batteryLevel = data[5];
                            break;
                        default:
                            break;
                    }
                    break;
                }

                case MessageType.HUB_ATTACHED_IO: {
                    const portId = data[3];
                    const event = data[4];
                    const ioType = data[5];
                    switch (event) {
                        case 0x00: // Detached I/O
                            this._dettachDevice(portId);
                            break;
                        case 0x01: // Attached I/O
                            this._attachDevice(portId, ioType);
                            break;
                        case 0x02: // Attached Virtual I/O
                        default:
                            break;
                    }
                    break;
                }

                case MessageType.PORT_VALUE: {
                    const portId = data[3];
                    const device = this._devices[portId];
                    if (device) {
                        device.updateInputValues(data.slice(4));
                        //log.debug(portId, device.inputValues);
                    }
                    break;
                }

                case MessageType.PORT_OUTPUT_COMMAND_FEEDBACK: {
                    const portId = data[3];
                    const feedback = data[4];

                    const discarded = feedback & 0x04;
                    const completed = feedback & 0x02;
                    const inProgress = feedback & 0x01;

                    if (discarded) {
                        this._clearOutputCommandCompletionCallback(portId);
                    }
                    if (completed) {
                        this._clearOutputCommandFeedbackCallback(portId);
                        this._clearOutputCommandCompletionCallback(portId);
                    }
                    if (inProgress) {
                        this._moveOutputCommandFeedbackCallbackToCompletionCallback(portId);
                    }

                    break;
                }

                default:
                    break;
            }

            if (this._firstNotificationCallback) {
                this._firstNotificationCallback();
                this._firstNotificationCallback = null;
            }
        }

        _dettachDevice(portId) {
            this._devices[portId] = null;
        }

        _attachDevice(portId, ioType) {
            const device = createDevice(ioType);
            this._devices[portId] = device;

            const mode = device.mode;
            if (mode !== null) {
                setTimeout(() => {
                    this.sendMessage(MessageType.PORT_INPUT_FORMAT_SETUP, [portId, mode, 1, 0, 0, 0, 1], false);
                }, 100);
            }
        }

        send(data, useLimiter = true) {
            if (!this.isConnected()) {
                return Promise.resolve();
            }

            if (useLimiter) {
                if (!this._rateLimiter.okayToSend()) {
                    return Promise.resolve();
                }
            }

            //logByteArray('>>', data);

            return this._ble.write(
                ServiceUUID,
                CharacteristicUUID,
                Base64Util.uint8ArrayToBase64(data),
                'base64',
                true
            );
        }

        sendMessage(messageType, payload, useLimiter = true) {
            const command = [
                0x00, // Hub ID: Always set to 0x00 (zero)
                messageType,
                ...payload
            ];
            command.unshift(command.length + 1);

            return this.send(command, useLimiter);
        }

        sendOutputCommand(portId, subCommand, payload, needsFeedback = true, useLimiter = true) {
            const flag = needsFeedback ? 0x11 : 0x10;
            return this.sendMessage(MessageType.PORT_OUTPUT_COMMAND, [portId, flag, subCommand, ...payload], useLimiter);
        }

        // Reset and Stop

        reset() {
            this._name = null;
            this._firmwareVersion = null;
            this._batteryLevel = 0;
            this._devices = [];

            this._outputCommandFeedbackCallbacks = [];
            this._outputCommandCompletionCallbacks = [];

            this._stopPollingBatteryLevel();
        }

        stopAll() {
            if (this.isConnected()) {
                this.stopAllMotors();
            }
        }

        stopAllMotors() {
            for (const [portId, device] of Object.entries(this._devices)) {
                if (device instanceof Motor) {
                    this.sendOutputCommand(portId, 0x51, [0x00, 0], false);
                    this._outputCommandFeedbackCallbacks[portId] = null;
                    this._outputCommandCompletionCallbacks[portId] = null;
                }
            }
        }

        _startPollingBatteryLevel() {
            this.sendMessage(MessageType.HUB_PROPERTIES, [HubPropertyReference.BATTERY_VOLTAGE, HubPropertyOperation.REQUEST_UPDATE]);
            this._pollingId = window.setInterval(() => {
                this.sendMessage(MessageType.HUB_PROPERTIES, [HubPropertyReference.BATTERY_VOLTAGE, HubPropertyOperation.REQUEST_UPDATE]);
            }, PollingInterval);
        }

        _stopPollingBatteryLevel() {
            if (this._pollingId) {
                window.clearInterval(this._pollingId);
                this._pollingId = null;
            }
        }

        // Output Command Feedback

        _createOutputCommandFeedbackPromise(portId) {
            return new Promise(resolve => {
                this._outputCommandFeedbackCallbacks[portId] = resolve;
            });
        }

        _clearOutputCommandFeedbackCallback(portId) {
            if (this._outputCommandFeedbackCallbacks[portId]) {
                this._outputCommandFeedbackCallbacks[portId]();
                this._outputCommandFeedbackCallbacks[portId] = null;
            }
        }

        _clearOutputCommandCompletionCallback(portId) {
            if (this._outputCommandCompletionCallbacks[portId]) {
                this._outputCommandCompletionCallbacks[portId]();
                this._outputCommandCompletionCallbacks[portId] = null;
            }
        }

        _moveOutputCommandFeedbackCallbackToCompletionCallback(portId) {
            this._outputCommandCompletionCallbacks[portId] = this._outputCommandFeedbackCallbacks[portId];
            this._outputCommandFeedbackCallbacks[portId] = null;
        }

        // Motor

        getMotor(portId) {
            const device = this._devices[portId];
            if (device instanceof Motor) {
                return device;
            } else {
                return null;
            }
        }

        motorPWM(portId, power) {
            power = MathUtil.clamp(power, -100, 100);

            const motor = this.getMotor(portId);
            if (motor) {
                return this.sendOutputCommand(portId, 0x51, [0x00, power]);
            } else {
                return Promise.resolve();
            }
        }

        motorRunForDegrees(portId, direction, degrees) {
            direction = direction * Math.sign(degrees);
            degrees = MathUtil.clamp(Math.abs(degrees), 1, MAX_INT32);

            const motor = this.getMotor(portId);
            if (motor && motor.canUseSpeed) {
                let speed = motor.speed * direction;
                return this.sendOutputCommand(portId, 0x0b, [...numberToInt32Array(degrees), speed, 100, 0x7f, 0x00])
                    .then(this._createOutputCommandFeedbackPromise.bind(this, portId));
            } else {
                return Promise.resolve();
            }
        }

        motorRunTimed(portId, direction, seconds) {
            const milliseconds = MathUtil.clamp(seconds * 1000, 0, MAX_INT16);

            const motor = this.getMotor(portId);
            if (motor && motor.canUseSpeed) {
                let speed = motor.speed * direction;
                return this.sendOutputCommand(portId, 0x09, [...numberToInt16Array(milliseconds), speed, 100, 0x7f, 0x00])
                    .then(this._createOutputCommandFeedbackPromise.bind(this, portId));
            } else {
                return Promise.resolve();
            }
        }

        motorStart(portId, direction) {
            const motor = this.getMotor(portId);
            if (motor && motor.canUseSpeed) {
                let speed = motor.speed * direction;
                return this.sendOutputCommand(portId, 0x07, [speed, 100, 0x00]);
            } else {
                return Promise.resolve();
            }
        }

        motorSetSpeed(portId, speed) {
            const motor = this.getMotor(portId);
            if (motor && motor.canUseSpeed) {
                motor.speed = speed;
            }
        }

        motorResetRelativePosition(portId, relativePosition) {
            relativePosition = MathUtil.clamp(relativePosition, MIN_INT32, MAX_INT32);

            const motor = this.getMotor(portId);
            if (motor && motor.canUseSpeed) {
                return this.sendOutputCommand(portId, 0x51, [0x02, ...numberToInt32Array(relativePosition)]);
            } else {
                return Promise.resolve();
            }
        }

        // Input Values

        inputValue(portId, key) {
            const device = this._devices[portId];
            if (device && device.inputValues.hasOwnProperty(key)) {
                return device.inputValues[key];
            }
            return null;
        }

        internalInputValue(key) {
            for (const [portId, device] of Object.entries(this._devices)) {
                if (portId >= 0x32 && device.inputValues.hasOwnProperty(key)) {
                    return device.inputValues[key];
                }
            }
            return null;
        }

        // Hub LED

        setLEDColor(color) {
            if (color < 0 || color > 10) {
                color = 0;
            }

            const portId = this._devices.findIndex(device => device && device.ioType == IOType.RGB_LIGHT);
            if (portId != -1) {
                return this.sendOutputCommand(portId, 0x51, [0x00, color]);
            } else {
                return Promise.resolve();
            }
        }

        setVolume(volume) {
            volume = MathUtil.clamp(volume, 0, 100);
            return this.sendMessage(MessageType.HUB_PROPERTIES, [HubPropertyReference.SPEAKER_VOLUME, HubPropertyOperation.SET, volume]);
        }
    }

    const logByteArray = function (prefix, array) {
        bytes = array.reduce((output, elem) =>
            (output + ('0' + (elem & 0xff).toString(16)).slice(-2)) + ' ', '');
        //log.debug(`${prefix} ${bytes}`);
    };

    Scratch.export(Hub);

    Scratch.extensions.translations({
        en: {
            'legobluetooth.motorPWM': '[PORT] start motor at [POWER] % power',
            'legobluetooth.motorStop': '[PORT] stop motor',
            'legobluetooth.motorRunFor': '[PORT] run [DIRECTION] for [VALUE] [UNIT]',
            'legobluetooth.motorStart': '[PORT] start motor [DIRECTION]',
            'legobluetooth.motorSetSpeed': '[PORT] set speed to [SPEED] %',
            'legobluetooth.getRelativePosition': '[PORT] relative position',
            'legobluetooth.motorResetRelativePosition': '[PORT] reset relative position to [RELATIVE_POSITION]',
            'legobluetooth.getColor': '[PORT] color',
            'legobluetooth.getDistance': '[PORT] distance',
            'legobluetooth.getForce': '[PORT] force',
            'legobluetooth.getTilt': '[PORT] tilt [XY]',
            'legobluetooth.setHubLEDColor': 'set hub LED color to [COLOR]',
            'legobluetooth.getHubTilt': 'hub tilt [XYZ]',
            'legobluetooth.getName': 'name',
            'legobluetooth.getFirmwareVersion': 'firmware version',
            'legobluetooth.getBatteryLevel': 'battery level',
            'legobluetooth.rotations': 'rotations',
            'legobluetooth.degrees': 'degrees',
            'legobluetooth.seconds': 'seconds',
            'legobluetooth.black': 'black',
            'legobluetooth.pink': 'pink',
            'legobluetooth.purple': 'purple',
            'legobluetooth.blue': 'blue',
            'legobluetooth.lightBlue': 'light blue',
            'legobluetooth.lightGreen': 'light green',
            'legobluetooth.green': 'green',
            'legobluetooth.yellow': 'yellow',
            'legobluetooth.orange': 'orange',
            'legobluetooth.red': 'red',
            'legobluetooth.white': 'white',
        },
        'zh-cn': {
            'legobluetooth.motorPWM': '开启马达 [PORT] 功率设为 [POWER] %',
            'legobluetooth.motorStop': '关闭马达 [PORT]',
            'legobluetooth.motorRunFor': '开启马达 [PORT] 方向为 [DIRECTION] 运行 [VALUE] [UNIT]',
            'legobluetooth.motorStart': '开启马达 [PORT] 方向为 [DIRECTION]',
            'legobluetooth.motorSetSpeed': '将马达 [PORT] 速度设为 [SPEED] %',
            'legobluetooth.getRelativePosition': '马达 [PORT] 相对位置',
            'legobluetooth.motorResetRelativePosition': '将马达 [PORT] 相对位置重置为 [RELATIVE_POSITION]',
            'legobluetooth.getColor': '[PORT] 颜色',
            'legobluetooth.getDistance': '[PORT] 距离',
            'legobluetooth.getForce': '[PORT] 受力',
            'legobluetooth.getTilt': '[PORT] 倾斜 [XY]',
            'legobluetooth.setHubLEDColor': '将集线器 LED 设为 [COLOR]',
            'legobluetooth.getHubTilt': '集线器倾斜 [XYZ]',
            'legobluetooth.getName': '名称',
            'legobluetooth.getFirmwareVersion': '固件版本',
            'legobluetooth.getBatteryLevel': '电量',
            'legobluetooth.rotations': '圈',
            'legobluetooth.degrees': '度',
            'legobluetooth.seconds': '秒',
            'legobluetooth.black': '黑',
            'legobluetooth.pink': '粉',
            'legobluetooth.purple': '紫',
            'legobluetooth.blue': '蓝',
            'legobluetooth.lightBlue': '浅蓝',
            'legobluetooth.lightGreen': '浅绿',
            'legobluetooth.green': '绿',
            'legobluetooth.yellow': '黄',
            'legobluetooth.orange': '橙',
            'legobluetooth.red': '红',
            'legobluetooth.white': '白',
        },
        'zh-tw': {
            'legobluetooth.motorPWM': '開啟馬達 [PORT] 功率設為 [POWER] %',
            'legobluetooth.motorStop': '關閉馬達 [PORT]',
            'legobluetooth.motorRunFor': '開啟馬達 [PORT] 方向為 [DIRECTION] 運行 [VALUE] [UNIT]',
            'legobluetooth.motorStart': '開啟馬達 [PORT] 方向為 [DIRECTION]',
            'legobluetooth.motorSetSpeed': '將馬達 [PORT] 速度設為 [SPEED] %',
            'legobluetooth.getRelativePosition': '馬達 [PORT] 相對位置',
            'legobluetooth.motorResetRelativePosition': '將馬達 [PORT] 相對位置重置為 [RELATIVE_POSITION]',
            'legobluetooth.getColor': '[PORT] 顏色',
            'legobluetooth.getDistance': '[PORT] 距離',
            'legobluetooth.getForce': '[PORT] 力量',
            'legobluetooth.getTilt': '[PORT] 傾斜 [XY]',
            'legobluetooth.setHubLEDColor': '將集線器 LED 設為 [COLOR]',
            'legobluetooth.getHubTilt': '集線器傾斜 [XYZ]',
            'legobluetooth.getName': '名稱',
            'legobluetooth.getFirmwareVersion': '固件版本',
            'legobluetooth.getBatteryLevel': '電量',
            'legobluetooth.rotations': '圈',
            'legobluetooth.degrees': '度',
            'legobluetooth.seconds': '秒',
            'legobluetooth.black': '黑',
            'legobluetooth.pink': '粉',
            'legobluetooth.purple': '紫',
            'legobluetooth.blue': '藍',
            'legobluetooth.lightBlue': '淺藍',
            'legobluetooth.lightGreen': '淺綠',
            'legobluetooth.green': '綠',
            'legobluetooth.yellow': '黃',
            'legobluetooth.orange': '橙',
            'legobluetooth.red': '紅',
            'legobluetooth.white': '白',
        },
    });
})(window.Scratch);
