import express from 'express';
import config from 'config';
import connect from './utility/connect';
import logger from './utility/logger';
import routes from './routes';

const configPortKey: string = 'port';
const serverRunningLog: string = 'Server is running at http://localhost:';

const port = config.get<number>(configPortKey);

const app = express();

app.use(express.json());

app.listen(port, async () => {
	logger.info(`${serverRunningLog}${port}`);
	await connect();
	routes(app);
});
