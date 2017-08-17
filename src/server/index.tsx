import 'isomorphic-fetch';

import * as express from 'express';
import { compose } from 'compose-middleware';
import * as morgan from 'morgan';
import { MONGO, SESSION_KEY } from 'config/project';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as expressSession from 'express-session';
import initAuth from 'src/server/modules/auth';

import {
	errorHandler,
	responseTimeHandler,
	flashHandler
} from 'src/server/middlewares';

import router from 'src/server/routes';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const app = express();

mongoose.createConnection(MONGO.url, { useMongoClient: true })
	.catch(err => {
		console.log(err.message);
		console.log(err);
	});

initAuth();

app.use(compose([
	errorHandler,
	responseTimeHandler,
	morgan('tiny'),
	expressSession({ secret: SESSION_KEY, resave: true, saveUninitialized: true }),
	passport.initialize(),
	passport.session(),
	flashHandler,
]));

app.use('/', express.static('dist/public'));
app.all('/', router);

app.listen(PORT, HOST);
console.log(`Server started on ${HOST}:${PORT}`);