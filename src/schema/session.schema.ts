import { string, object } from 'zod';

enum email {
	required_error = 'Email is required',
}

enum password {
	required_error = 'Password is required',
}

const Keys = {
	email,
	password,
};

export const createSessionSchema = object({
	body: object({
		email: string({ required_error: Keys.email.required_error }),
		password: string({ required_error: Keys.password.required_error }),
	}),
});
