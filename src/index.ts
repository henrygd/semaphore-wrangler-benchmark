/**
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 *
 * Benchmark:
 * oha --no-tui -n 100 http://localhost:8787/henrygd-semaphore > /dev/null && oha -n 1000 http://localhost:8787/henrygd-semaphore
 *
 * A semaphore is created to handle each request, so this tests creation time as well as throughput.
 */

import hgdWorker from './henrygd-semaphore';
import asyncSemaWorker from './async-sema';
import asyncMutexWorker from './async-mutex';
import awaitSemaphoreWorker from './await-semaphore';
import shopifySemaphoreWorker from './shopify-semaphore';

const workers = {
	'henrygd-semaphore': hgdWorker,
	'async-sema': asyncSemaWorker,
	'async-mutex': asyncMutexWorker,
	'await-semaphore': awaitSemaphoreWorker,
	'shopify-semaphore': shopifySemaphoreWorker,
} as Record<string, () => Promise<Response>>;

export default {
	async fetch(request): Promise<Response> {
		const path = request.url.split('/').at(-1) ?? '_';

		if (path in workers) {
			return workers[path]();
		}

		return new Response(`Unknown path: ${path}`, { status: 404 });
	},
} satisfies ExportedHandler<Env>;
