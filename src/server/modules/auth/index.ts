import * as passport from 'passport';
import User, { IUserModel } from 'src/server/models/user';
import { Strategy } from 'passport-local';
import { flash } from 'src/server/modules/flash';
import { compareSync, hashSync, genSaltSync } from 'bcrypt-nodejs';

const onLogin = (req, email, password, done) => (err, user) => {
	if (err) return done(err);
	if (!user) {
		return done(
			null,
			false,
			flash(req, 'error', 'User not found')
		);
	}
	if (!compareSync(password, user.password)) {
		return done(
			null,
			false,
			flash(req, 'error', 'Invalid password')
		);
	}
	return done(
		null,
		user,
		flash(req, 'success', `You logged in`)
	);
};

const onRegister = (req, email, password, done) => (err, user) => {
	if (err) return done(err);
	if (user) {
		return done(
			null,
			false,
			flash(req, 'error', 'User already exists')
		);
	} else {
		var newUser = new User();
		newUser.email = email;
		newUser.password = hashSync(password, genSaltSync(10), null);

		newUser.save(err => {
			if (err) {
				throw err;
			}
			return done(
				null,
				newUser,
				flash(req, 'success', `You registered with email ${email}`)
			);
		});
	}
}

export default () => {
	passport.serializeUser((user: any, done) => done(null, user._id));

	passport.deserializeUser((id, done) => User.findById(id, (err, user: IUserModel) => done(err, user)));

	passport.use('login', new Strategy({ passReqToCallback: true },
		(req, email, password, done) => {
			User.findOne({ 'email': email }, onLogin(req, email, password, done));
		})
	);

	passport.use('signup', new Strategy({ passReqToCallback: true },
		(req, email, password, done) => {
			const findOrCreateUser = () => User.findOne({ 'email': email }, onRegister(req, email, password, done));
			process.nextTick(findOrCreateUser);
		})
	);
}