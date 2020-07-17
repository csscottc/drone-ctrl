/* eslint-disable no-underscore-dangle */
class Commander {

    constructor(socket, host, port) {
        this.host = host;
        this.port = port;
        this.socket = socket;
    }

    _sendCommand(command) {
        return new Promise((resolve) => {
            this.socket.send(command, 0, command.length, this.port, this.host, (err) => {
                if (err) {
                    throw err;
                } else {
                    return resolve();
                }
            });
        });
    }

    sendInitCommand() {
        return this._sendCommand('command');
    }

    sendTakeoff() {
        return this._sendCommand('takeoff');
    }

    sendLand() {
        return this._sendCommand('land');
    }

    sendForward(distance = 20) {
        return this._sendCommand(`forward ${distance}`);
    }

    sendBack(distance = 20) {
        return this._sendCommand(`back ${distance}`);
    }

    sendRight(distance = 20) {
        return this._sendCommand(`right ${distance}`);
    }

    sendLeft(distance = 20) {
        return this._sendCommand(`left ${distance}`);
    }

    getBattery() {
        return this._sendCommand('battery?');
    }

    sendFlip() {
        return this._sendCommand('flip b');
    }
}

module.exports = Commander;
