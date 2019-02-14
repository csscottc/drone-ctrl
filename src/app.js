const readline = require("readline");
const rl = readline.createInterface({ "input": process.stdin, "output": process.stdout});
const Socket = require("dgram").Socket;
const createSocket = require("dgram").createSocket;

const TELLO_CMD_PORT = 8889;
const TELLO_HOST = "192.168.10.1";


async function handleInput(line, socket) {
    function isTakeoff(line) {
        return line === "takeoff";
    }
    function isLand(line) {
        return line === "land";
    }
    function isForward(line) {
        return line.startsWith("forward");
    }
    function isBack(line) {
        return line.startsWith("back");
    }
    function isLeft(line) {
        return line.startsWith("left");
    }
    function isRight(line) {
        return line.startsWith("right");
    }
    function isBattery(line) {
        return line === "battery";
    }
    function isFlip(line) {
        return line === "flip";
    }
    function isExit(line) {
        return line === "exit";
    }

    if(isTakeoff(line)) {
        try{
            await sendTakeOff(socket);
        } catch (err) {
            console.log(err);
        }
    };

    if(isLand(line)) {
        try {
            await sendLand(socket);
        } catch (err) {
            console.log(err);
        }
    }

    if(isForward(line)) {
        const [name, dist] = line.split(" ");
        try {
            await sendForward(socket, dist);
        } catch (err) {
            console.log(err);
        }
    }

    if(isBack(line)) {
        const [name, dist] = line.split(" ");
        try {
            await sendBack(socket, dist);
        } catch (err) {
            console.log(err);
        }
    }

    if(isLeft(line)) {
        const [name, dist] = line.split(" ");
        try {
            await sendLeft(socket, dist);
        } catch (err) {
            console.log(err);
        }
    }

    if(isRight(line)) {
        const [name, dist] = line.split(" ");
        try {
            await sendRight(socket, dist);
        } catch (err) {
            console.log(err);
        }
    }

    if(isBattery(line)) {
        try {
            await getBattery(socket);
        } catch (err) {
            console.log(err);
        }
    }

    if(isFlip(line)) {
        try {
            await sendFlip(socket);
        } catch (err) {
            console.log(err);
        }
    }

    if(isExit(line)) {
        try {
            console.log("Detected exit command.");
            socket.close(() => {
                console.log("Socket was closed");
                process.exit(0);
            });
        } catch (err) {
            console.log(err);
        }
    }
}

function sendTakeOff(socket) {
    return new Promise((resolve) => {
        socket.send("takeoff",0,"takeoff".length,TELLO_CMD_PORT, TELLO_HOST, err => {
            if(err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
}

function sendLand(socket) {
    return new Promise((resolve) => {
        socket.send("land",0,"land".length,TELLO_CMD_PORT, TELLO_HOST, err => {
            if(err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
}

function sendForward(socket, distance = 20) {
    return new Promise((resolve) => {
        socket.send(`forward ${distance}`,0,`forward ${distance}`.length,TELLO_CMD_PORT, TELLO_HOST, err => {
            if(err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
}

function sendBack(socket, distance = 20) {
    return new Promise((resolve) => {
        socket.send(`back ${distance}`,0,`back ${distance}`.length,TELLO_CMD_PORT, TELLO_HOST, err => {
            if(err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
}

function sendRight(socket, distance = 20) {
    return new Promise((resolve) => {
        socket.send(`right ${distance}`,0,`right ${distance}`.length,TELLO_CMD_PORT, TELLO_HOST, err => {
            if(err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
}

function sendLeft(socket, distance = 20) {
    return new Promise((resolve) => {
        socket.send(`left ${distance}`,0,`left ${distance}`.length,TELLO_CMD_PORT, TELLO_HOST, err => {
            if(err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
}
function getBattery(socket) {
    return new Promise((resolve) => {
        socket.send("battery?",0,"battery?".length,TELLO_CMD_PORT, TELLO_HOST, err => {
            if(err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
}

function sendInitCommand(socket) {
    return new Promise((resolve) => {
        socket.send("command",0,"command".length,TELLO_CMD_PORT, TELLO_HOST, err => {
            if(err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
}

function sendFlip(socket) {
    return new Promise((resolve) => {
        socket.send("flip b",0,"flip b".length,TELLO_CMD_PORT, TELLO_HOST, err => {
            if(err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
}

function getSocket() {
    const socket = createSocket("udp4");
    socket.bind(TELLO_CMD_PORT);
    return socket;
}

(async function(){
    console.log(`Lets get started!`);
    const socket = getSocket();
    socket.on("message", (msg) => {
        console.log(`Message from drone: ${msg.toString()}`);
    });
    socket.on("error", (err) => {
        console.log(`There was an error: ${err}`);
    });
    socket.on("listening", () => {
        console.log("Socket is listening");
    });
    await sendInitCommand(socket);
    console.log(`Please enter a command:`);
    rl.on("line", line => handleInput(line, socket));
})();