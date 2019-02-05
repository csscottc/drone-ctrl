const readline = require("readline");
const rl = readline.createInterface({ "input": process.stdin, "output": process.stdout});
const Socket = require("dgram").Socket;
const createSocket = require("dgram").createSocket;

const TELLO_CMD_PORT = 8889;
const TELLO_HOST = "192.168.10.1";


async function handleInput(line, socket) {
    switch (line) {
        case "takeoff":
            console.log("Detected takeoff command.");
            try { 
                await sendTakeOff(socket);
            } catch (err) {
                console.log(err);
            }
            break;
        case "land":
            console.log("Detected land command.");
            try {
                await sendLand(socket);
            } catch (err) {
                console.log(err);
            }
            break;
        case "battery":
            console.log("Detected battery command.");
            try {
                await getBattery(socket);
            } catch (err) {
                console.log(err);
            }
            break;
        case "flip":
            console.log("Detected flip command.");
            try {
                await sendFlip(socket);
            } catch (err) {
                console.log(err);
            }
            break;
        case "exit":
            console.log("Detected exit command.");
            socket.close(() => {
                console.log("Socket was closed");
                process.exit(0);
            });
            break;
        default:
            break;
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




