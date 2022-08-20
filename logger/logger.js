const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const logDir = "logs";

const {combine, timestamp, printf} = winston.format

const logFormat = printf(info => `${info.timestamp} ${info.level}: ${info.message}`)

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        logFormat
    ),
    defaultMeta: {service : "administrator"},
    transports:[
        new winstonDaily({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: logDir, 
            filename: "%DATE%.log",
            maxFiles: 30,
            zippedArchive: true
        }),

        new winstonDaily({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logDir + "/error", 
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        })
    ]
});

if(process.env.NODE_ENV !== "production"){
    logger.add(new winston.transports.Console(
        {
            format: winston.format.combine(
              winston.format.colorize(),  // 색깔 넣어서 출력
              winston.format.simple(),  // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
            )
        }
    ));
}

module.exports = logger;