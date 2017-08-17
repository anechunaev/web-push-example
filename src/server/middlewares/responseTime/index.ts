import { RequestHandler } from 'express';
import { now, parse, since } from 'microseconds';

export const responseTimeHandler: RequestHandler = async (req, res, next) => {
	const start = now();

	if (!!next) await next();

	const end = parse(since(start));
	const total = end.microseconds + (end.milliseconds * 1e3) + (end.seconds * 1e6);
	res.set('Response-Time', `${total / 1e3}ms`);
}