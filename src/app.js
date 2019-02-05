const readline = require("readline");
const rl = readline.createInterface({ "input": process.stdin, "output": process.stdout});

function handleInput(line) {
    switch (line) {
        case "takeoff":
            console.log("Detected takeoff command.");
            break;
        case "land":
            console.log("Detected land command.");
            break;
        default:
            break;
    }
}

console.log(`Lets get started!`);
console.log(`Please enter a command:`);
rl.on("line",handleInput);
