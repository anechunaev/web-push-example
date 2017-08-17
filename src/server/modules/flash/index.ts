import { Request } from 'express';

export const flash = (req: Request, type: string, message?: string) => {
	if (!req.session) return;

	req.session['flash'] = req.session['flash'] || [];

	req.session.flash.push({ type, message });
}