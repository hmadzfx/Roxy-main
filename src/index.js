/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// index.js

import handleCorsRequest from './cors.js';
import proxy from './proxy.js';
import { thumbnailHandler } from './thumbnails.js';
import { handleRequest } from './utils/handler.js';

export default {
	async fetch(request) {
		const url = new URL(request.url);

		if (url.pathname === '/proxy') {
			return proxy(request);
		} else if (url.pathname === '/cors') {
			const [url, headers, origin] = handleRequest(request);
			return handleCorsRequest(url, headers);
		} else if (url.pathname === '/image') {
			const [url, headers, origin] = handleRequest(request);
			return handleCorsRequest(url, headers, origin);
		} else if (url.pathname === '/thumbnail') {
			const [url, headers, origin] = handleRequest(request);
			return thumbnailHandler(url, headers, origin);
		} else if (url.pathname === '/') {
			return new Response(
				JSON.stringify({
					message: 'Mady\'s Proxy',
				}),
				{
					status: 200,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
		}

		return new Response('Not Found', { status: 404 });
	},
};
