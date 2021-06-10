const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'verbose',
    format: format.combine(format.colorize(), format.splat(), format.simple()),
    transports: [new transports.Console()],
});

module.exports = logger;
