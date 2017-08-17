import { RequestHandler } from 'express';

export const flashHandler: RequestHandler = (req, res, next) => {
	if (!req.session) return next();

	res.locals.sessionFlash = req.session.flash;
	delete req.session.flash;
	next();
}