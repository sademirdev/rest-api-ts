import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

async function connect() {
	const configDbUriKey: string = 'dbUri';
	const successLogText: string = 'Database has been connected successfully.';
	const failureLogText: string = 'Could not connect to Database';

	const dbUri = config.get<string>(configDbUriKey);
	// this may be needed:	'useNewUrlParser: true'
	try {
		await mongoose.connect(dbUri);
		logger.info(successLogText);
	} catch (error) {
		logger.error(failureLogText);
		process.exit(1);
	}
}

export default connect;
