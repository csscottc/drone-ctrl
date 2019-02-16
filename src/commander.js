class Commander {
    constructor(socket, host, port) {
        this.host = host;
        this.port = port;
        this.socket = socket;
    }

    sendTakeoff() {
        return new Promise((resolve) => {
            this.socket.send("takeoff", 0, "takeoff".length, this.port, this.host, (err) => {
                if (err) {
                    throw err;
                } else {
                    return resolve();
                }
            });
        });
    }

    sendLand() {
        return new Promise((resolve) => {
            this.socket.send("land", 0, "land".length, this.port, this.host, (err) => {
                if (err) {
                    throw err;
                } else {
                    return resolve();
                }
            });
        });
    }

    sendForward(distance = 20) {
        return new Promise((resolve) => {
            this.socket.send(`forward ${distance}`, 0, `forward ${distance}`.length, this.port, this.host, (err) => {
                if (err) {
                    throw err;
                } else {
                    return resolve();
                }
            });
        });
    }

    sendBack(distance = 20) {
        return new Promise((resolve) => {
            this.socket.send(`back ${distance}`, 0, `back ${distance}`.length, this.port, this.host, (err) => {
                if (err) {
                    throw err;
                } else {
                    return resolve();
                }
            });
        });
    }

    sendRight(distance = 20) {
        return new Promise((resolve) => {
            this.socket.send(`right ${distance}`, 0, `right ${distance}`.length, this.port, this.host, (err) => {
                if (err) {
                    throw err;
                } else {
                    return resolve();
                }
            });
        });
    }

    sendLeft(distance = 20) {
        return new Promise((resolve) => {
            this.socket.send(`left ${distance}`, 0, `left ${distance}`.length, this.port, this.host, (err) => {
                if (err) {
                    throw err;
                } else {
                    return resolve();
                }
            });
        });
    }

    getBattery() {
        return new Promise((resolve) => {
            this.socket.send("battery?", 0, "battery?".length, this.port, this.host, (err) => {
                if (err) {
                    throw err;
                } else {
                    return resolve();
                }
            });
        });
    }

    sendInitCommand() {
        return new Promise((resolve) => {
            this.socket.send("command", 0, "command".length, this.port, this.host, (err) => {
                if (err) {
                    throw err;
                } else {
                    return resolve();
                }
            });
        });
    }

    sendFlip() {
        return new Promise((resolve) => {
            this.socket.send("flip b", 0, "flip b".length, this.port, this.host, (err) => {
                if (err) {
                    throw err;
                } else {
                    return resolve();
                }
            });
        });
    }
}

module.exports = Commander;
