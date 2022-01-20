import { createLogger, format, transports } from 'winston'

export const log = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  handleExceptions: true,
  format: format.combine(
    format.errors({ stack: true }),
    format.colorize(),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    format.printf(({ timestamp, level, message, stack }) => {
      if (Array.isArray(message) && message.every((msg) => msg instanceof Error)) {
        return `${message.map((err: Error) => `[${level}]: ${err.message}\n${err.stack}\n \n`)}`
      }
      return `[${level}]: ${message}${stack ? `\n${stack}}\n` : ''}`
    })
  ),
  transports: [new transports.Console()],
})
