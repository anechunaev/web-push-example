import { RequestHandler } from 'express';

export const errorHandler: RequestHandler = async (req, res, next) => {
	try {
		if (!!next) {
			await next();
		} else {
			throw Error('Empty handler');
		}
	} catch (e) {
		console.error('Error: ', e.message);
		res.send('There was an error. Please try again later.');
	}
};