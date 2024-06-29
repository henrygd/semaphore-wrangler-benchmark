import { checkEqual, loops, promiseWithResolvers } from './util';
import { concurrency } from './util';
import { Semaphore } from 'async-mutex';

export default async function () {
	const asyncSemaphore = new Semaphore(concurrency);
	let j = 0;
	const { promise, resolve } = promiseWithResolvers();
	for (let i = 0; i < loops; i++) {
		asyncSemaphore.acquire().then(() => {
			++j === loops && resolve();
			asyncSemaphore.release();
		});
	}
	await promise;
	checkEqual(j, loops);
	return new Response(String(j));
}
