import { readFileSync } from 'fs';
import { object, string, TypeOf } from 'zod';

enum name {
	required_error = 'Name is required',
}

enum password {
	required_error = 'Password is required',
	min_char_error = 'Password too short - should be 6 chars minimum',
}

enum passwordConfirmation {
	required_error = 'PasswordConfiguration is required',
}

enum email {
	required_error = 'Email is required',
	no_valid_error = 'Not a valid email',
}

enum bodyObj {
	refineMessage = 'Passwords do not match',
	refinePath = 'passwordConfirmation',
}

const Keys = {
	name,
	password,
	passwordConfirmation,
	email,
	bodyObj,
};

export const createUserSchema = object({
	body: object({
		name: string({ required_error: Keys.name.required_error }),
		password: string({ required_error: Keys.password.required_error }).min(
			6,
			Keys.password.min_char_error
		),
		passwordConfirmation: string({
			required_error: Keys.passwordConfirmation.required_error,
		}),
		email: string({ required_error: Keys.email.required_error }).email(
			Keys.email.no_valid_error
		),
	}).refine((data) => data.password === data.passwordConfirmation, {
		message: Keys.bodyObj.refineMessage,
		path: [Keys.bodyObj.refinePath],
	}),
});

export type CreateUserInput = Omit<
	TypeOf<typeof createUserSchema>,
	'body.passwordConfirmation'
>;
