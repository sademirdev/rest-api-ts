import pino from 'pino';

const logger = pino({
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
			timestampKey: '',
			translateTime: true,
		},
	},
});

export default logger;
