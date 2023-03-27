const { createLogger, format, transports} = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({level, message, timestamp})=>{
    return  `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormat

    ),
    transports: [
        new transports,Console(),
        new transports,MongoDB({
            level: 'info',
            db: process.env.mongoURL,
            options: {
                useUnifiedTopology:true
            },
            collection: 'logs'
        })
    ]
});

module.exports = logger;
