const readline = require("readline");
const rl = readline.createInterface({ "input": process.stdin, "output": process.stdout});
console.log(`Lets get started!`);
console.log(`Please enter a command:`);
rl.on("line", line => console.log(line));
