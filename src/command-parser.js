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
        this.onTakeoff = config.onTakeoff;
        this.onLand = config.onLand;
        this.onRight = config.onRight;
        this.onLeft = config.onLeft;
        this.onForward = config.onForward;
        this.onBack = config.onBack;
        this.onBattery = config.onBattery;
        this.onFlip = config.onFlip;
    }

    parseCommand(line) {
        if (isTakeoff(line)) {
            this.onTakeoff();
            return true;
        }
        if (isLand(line)) {
            this.onLand();
            return true;
        }
        if(isForward(line)) {
            const [, dist] = line.split(" ");
            this.onForward(dist);
            return true;
        }
        if(isBack(line)) {
            const [, dist] = line.split(" ");
            this.onBack(dist);
            return true;
        }
        if(isRight(line)){
            const [, dist] = line.split(" ");
            this.onRight(dist);
            return true;
        }
        if(isLeft(line)) {
            const [, dist] = line.split(" ");
            this.onLeft(dist);
            return true;
        }
        if(isBattery(line)) {
            this.onBattery(line);
            return true;
        }
        if(isFlip(line)) {
            this.onFlip(line);
            return true;
        }
        return false
    }
}

module.exports = CommandParser;
