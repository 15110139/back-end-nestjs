const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
class Logger {
    private config = {
        levels: {
            error: 0,
            debug: 1,
            warn: 2,
            data: 3,
            info: 4,
        },
        colors: {
            error: 'red',
            debug: 'blue',
            warn: 'yellow',
            data: 'grey',
            info: 'green',
        }
    };
    private logDir = 'log';
    private fileName
    private dailyRotateFileTransport = new DailyRotateFile({
        filename: `${this.logDir}/%DATE%-${this.fileName}.log`,
        datePattern: 'YYYY-MM-DD'
    });
    constructor(fileName: string) {
        console.log('----------------------')
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir);
        }
        this.fileName = fileName

    }



    public logger = createLogger({
        // change level if in dev environment versus production
        levels: this.config.levels,
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
        transports: [
            new transports.Console({
                levels: this.config.levels,
                format: format.combine(
                    format.colorize(),
                    format.printf(
                        info => `${info.timestamp} ${info.level}: ${info.message}`
                    )
                )
            }),
            this.dailyRotateFileTransport
        ]
    });

}
export default Logger