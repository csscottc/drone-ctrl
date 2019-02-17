const readline = require("readline");
const { createSocket } = require("dgram");
const CommandParser = require("./command-parser");
const Commander = require("./commander");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const TELLO_CMD_PORT = 8889;
const TELLO_HOST = "192.168.10.1";

function getSocket() {
    const socket = createSocket("udp4");
    socket.bind(TELLO_CMD_PORT);
    return socket;
}

(async function start() {
    const socket = getSocket();
    const cmder = new Commander(socket, TELLO_HOST, TELLO_CMD_PORT);
    await cmder.sendInitCommand();
    const cmdp = new CommandParser({
        onTakeoff: async () => { await cmder.sendTakeoff(); },
        onLand: async () => { await cmder.sendLand(); },
        onForward: async (dist) => { await cmder.sendForward(dist); },
        onBack: async (dist) => { await cmder.sendBack(dist); },
        onRight: async (dist) => { await cmder.sendRight(dist); },
        onLeft: async (dist) => { await cmder.sendLeft(dist); },
        onFlip: async () => { await cmder.sendFlip(); },
        onBattery: async () => { await cmder.getBattery(); }
    });
    console.log(`Lets get started!`);
    socket.on("message", (msg) => {
        console.log(`Message from drone: ${msg.toString()}`);
    });
    socket.on("error", (err) => {
        console.log(`There was an error: ${err}`);
    });
    socket.on("listening", () => {
        console.log("Socket is listening");
    });
    console.log(`Please enter a command:`);
    rl.on("line", (line) => {
        if (!cmdp.parseCommand(line)) {
            if(line === "exit") {
                console.log("Goodbye.");
                process.exit(0);
            }
            console.log("Not a valid command");
        }
    });
})();
