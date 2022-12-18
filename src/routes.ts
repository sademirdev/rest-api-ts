import { Express, Request, Response } from 'express';
import { createUserHandler } from './controller/user.controller';
import validateResource from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express): void {
	app.get(Paths.healthCheck, healthCheckHandler);

	app.post(Paths.users, validateResource(createUserSchema), createUserHandler);

	app.post(
		Paths.sessions,
		validateResource(createSessionSschema),
		createUserSessionHandler
	);
}

enum Paths {
	healthCheck = '/healthCheck',
	users = '/users',
	sessions = '/sessions',
}

function healthCheckHandler(req: Request, res: Response) {
	res.sendStatus(200);
}

export default routes;
