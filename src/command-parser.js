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

class CommandParser {
    constructor(config) {
        this.parseCommand = function parseCommand(line) {
            if (isTakeoff(line)) {
                config.onTakeoff();
                return true;
            }
            if (isLand(line)) {
                config.onLand();
                return true;
            }
            if(isForward(line)) {
                const [, dist] = line.split(" ");
                config.onForward(dist);
                return true;
            }
            if(isBack(line)) {
                const [, dist] = line.split(" ");
                config.onBack(dist);
                return true;
            }
            if(isRight(line)){
                const [, dist] = line.split(" ");
                config.onRight(dist);
                return true;
            }
            if(isLeft(line)) {
                const [, dist] = line.split(" ");
                config.onLeft(dist);
                return true;
            }
            if(isBattery(line)) {
                config.onBattery(line);
                return true;
            }
            if(isFlip(line)) {
                config.onFlip(line);
                return true;
            }
            return false
        }
    }
}

module.exports = CommandParser;
