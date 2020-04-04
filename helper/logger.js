const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
  require('winston-daily-rotate-file');

  const path=require('path');
  const logDir='log-file';

  const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });
  var transport = new (transports.DailyRotateFile)({
    filename:  `${logDir}/%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false
    
  });

  transport.on('rotate', function(oldFilename, newFilename) {
    // do something fun
  });

  var logger = createLogger({
    format: combine(
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    myFormat
    ),
     // transports: [new transports.transport]
    transports: [
      transport
    ]
  }); 
module.exports = logger;