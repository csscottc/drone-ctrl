class CommandParser {

    constructor(cmder) {
        this.cmder = cmder;
    }

    // eslint-disable-next-line class-methods-use-this
    isStartsCommand(line, cmd) {
        return line.startsWith(cmd);
    }

    parseCommand(line) {
        // getConfig(line) {
        this.setConfig();

        const singleCommand = [
            'takeoff', 'land', 'battary', 'flip'
        ];
        if (line in singleCommand) {
            this.config[`on${line}`]();
            return true;
        }

        if (this.isStartsCommand(line, 'forward')) {
            const [, dist] = line.split(' ');
            this.config.onForward(dist);
            return true;
        }

        if (this.isStartsCommand(line, 'back')) {
            const [, dist] = line.split(' ');
            this.config.onBack(dist);
            return true;
        }

        if (this.isStartsCommand(line, 'right')) {
            const [, dist] = line.split(' ');
            this.config.onRight(dist);
            return true;
        }

        if (this.isStartsCommand(line, 'left')) {
            const [, dist] = line.split(' ');
            this.config.onLeft(dist);
            return true;
        }

        return false
    }

    setConfig() {
        this.config = {
            onTakeoff: async () => { await this.cmder.sendTakeoff(); },
            onLand: async () => { await this.cmder.sendLand(); },
            onForward: async (dist) => { await this.cmder.sendForward(dist); },
            onBack: async (dist) => { await this.cmder.sendBack(dist); },
            onRight: async (dist) => { await this.cmder.sendRight(dist); },
            onLeft: async (dist) => { await this.cmder.sendLeft(dist); },
            onFlip: async () => { await this.cmder.sendFlip(); },
            onBattery: async () => { await this.cmder.getBattery(); }
        };
    }
}

module.exports = CommandParser;
