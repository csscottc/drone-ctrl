/* eslint-disable no-console */
require('assert');
const readline = require('readline');
const dgram = require('dgram');
const CommandParser = require('../src/command-parser');
const Commander = require('../src/commander');

// beforeEach((done) => {
//     done();
// })

describe('Commander class tests', () => {

    it('created readline interface', (done) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.on('line', (cmd) => {
            console.log(`"${cmd}" command ok!`);
            done();
        });
    });

    it('dgram socket opened is success', (done) => {
        const TELLO_CMD_PORT = 8889;

        function getSocket() {
            const socket = dgram.createSocket('udp4');
            socket.bind(TELLO_CMD_PORT);
            return socket;
        };

        const theSocket = getSocket();
        theSocket.on('error', (err) => {
            if (err) {
                throw err;
            }
            done();
        });
    });

    it('cli control is ok for dgram', (done) => {
        const TELLO_CMD_PORT = 8889;
        const TELLO_HOST = '192.168.10.1';

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        function getSocket() {
            const socket = dgram.createSocket('udp4');
            socket.bind(TELLO_CMD_PORT);
            return socket;
        };

        (async function start() {
            const socket = getSocket();
            const cmder = new Commander(socket, TELLO_HOST, TELLO_CMD_PORT);
            await cmder.sendInitCommand();
            const cmdp = new CommandParser(cmder);
            console.log(`Lets get started!`);
            socket.on('message', (msg) => {
                console.log(`Message from drone: ${msg.toString()}`);
            });
            socket.on('error', (err) => {
                console.log(`There was an error: ${err}`);
            });
            socket.on('listening', () => {
                console.log('Socket is listening');
            });
            console.log(`Please enter a command:`);
            rl.on('line', (line) => {
                if (!cmdp.parseCommand(line)) {
                    if (line === 'exit') {
                        console.log('Goodbye.');
                        process.exit(0);
                    }
                    console.log('Opps! Not a valid command!\nPlease enter a command:');
                }
                // done();
            });
            done();
        })();
    });
});
