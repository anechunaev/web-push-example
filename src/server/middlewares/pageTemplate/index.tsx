import { RequestHandler } from 'express';
import createNewStore from 'lib/redux';
import * as React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { readFileSync } from 'fs';
import * as path from 'path';
import * as paths from 'config/paths';
import Html from 'src/server/views/server';
import App from 'src/common/App';

const [manifest, chunkManifest] = ['manifest', 'chunk-manifest'].map(
	name => JSON.parse(
		readFileSync(path.resolve(paths.dist, `${name}.json`), 'utf8'),
	),
);

const scripts = [
	'manifest.js',
	'vendor.js',
	'browser.js'
].map(key => manifest[key]);

export const pageTemplateHandler: RequestHandler = (req, res, next) => {
	const store = createNewStore({ reducers: [], middleware: [] });
	const components = (
		<StaticRouter location={req.baseUrl} context={{}}>
			<Provider store={store}>
				<App />
			</Provider>
		</StaticRouter>
	);

	const html = renderToString(components);

	res.send(`<!DOCTYPE html>\n${renderToStaticMarkup(
		<Html
			html={html}
			head={Helmet.rewind()}
			window={{
				webpackManifest: chunkManifest,
				__STATE__: store.getState(),
				__FLASH__: res.locals.sessionFlash || []
			}}
			scripts={scripts}
			css={manifest['browser.css']}
			vendorCss={manifest['vendor.css']}
		/>
	)}`);

	next();
}