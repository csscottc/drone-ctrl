const readline = require("readline");
const rl = readline.createInterface({ "input": process.stdin, "output": process.stdout});
const Socket = require("dgram").Socket;
const createSocket = require("dgram").createSocket;

const TELLO_CMD_PORT = 8889;
const TELLO_HOST = "192.168.10.1";


async function handleInput(line, server) {
    switch (line) {
        case "takeoff":
            console.log("Detected takeoff command.");
            try { 
                await sendTakeOff(server);
            } catch (err) {
                console.log(err);
            }
            break;
        case "land":
            console.log("Detected land command.");
            try {
                await sendLand(server);
            } catch (err) {
                console.log(err);
            }
            break;
        case "battery":
            console.log("Detected battery command.");
            try {
                await getBattery(server);
            } catch (err) {
                console.log(err);
            }
            break;
        case "exit":
            console.log("Detected exit command.");
            server.close(() => {
                console.log("Socket was closed");
                process.exit(0);
            });
            break;
        default:
            break;
    }
}

function sendTakeOff(server) {
    return new Promise((resolve) => {
        server.send("takeoff",0,"takeoff".length,TELLO_CMD_PORT, TELLO_HOST, err => {
            if(err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
}

function sendLand(server) {
    return new Promise((resolve) => {
        server.send("land",0,"land".length,TELLO_CMD_PORT, TELLO_HOST, err => {
            if(err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
}

function getBattery(server) {
    return new Promise((resolve) => {
        server.send("battery?",0,"battery?".length,TELLO_CMD_PORT, TELLO_HOST, err => {
            if(err) {
                throw err;
            } else {
                return resolve();
            }
        });
    });
}

function sendInitCommand(server) {
    return new Promise((resolve) => {
        server.send("command",0,"command".length,TELLO_CMD_PORT, TELLO_HOST, err => {
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
    socket.bind(this.TELLO_CMD_PORT);
    return socket;
}

(async function(){
    console.log(`Lets get started!`);
    const server = getSocket();
    server.on("message", (msg) => {
        console.log(`Message from drone: ${msg.toString()}`);
    });
    server.on("error", (err) => {
        console.log(`There was an error: ${err}`);
    });
    server.on("listening", () => {
        console.log("Server is listening");
    });
    await sendInitCommand(server);
    console.log(`Please enter a command:`);
    rl.on("line", line => handleInput(line, server));
})();




