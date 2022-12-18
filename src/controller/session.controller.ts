import { Request, Response } from 'express';
import { createSession } from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { signJwt } from '../utility/jwt.utility';
import config from 'config';

const configAccessTokenExpiresIn = 'accessTokenTtl';
const configRefreshTokenExpiresIn = 'accessTokenTtl';

export async function createUserSessionHandler(req: Request, res: Response) {
	// VAlidate user's password
	const user = await validatePassword(req.body);

	if (!user) return res.status(401).send('Invalid email or password');

	// Create a session
	const session = await createSession(user._id, req.get('user-agent') || '');

	// Create an access token

	const accessToken = signJwt(
		{ ...user, session: session._id },
		{ expiresIn: config.get<string>(configAccessTokenExpiresIn) }
	);

	// Create refresh token

	const refreshToken = signJwt(
		{ ...user, session: session._id },
		{ expiresIn: config.get<string>(configRefreshTokenExpiresIn) }
	);

	// return access and refresh token

	return res.send({ accessToken, refreshToken });
}
