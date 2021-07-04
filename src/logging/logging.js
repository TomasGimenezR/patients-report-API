const winston = require('winston');
require('winston-mongodb');

module.exports = () => {
    winston.handleExceptions(
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    process.on('unhandledRejection', (e) => {
        throw e;
    });

    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, {
        db: MONGODB_URL,
        level: 'error',
        collection: 'errorLogs',
        format: format.combine(format.timestamp(), format.json())
    });
}