import { checkEqual, loops, promiseWithResolvers } from './util';
import { concurrency } from './util';
import { getSemaphore } from '@henrygd/semaphore';

export default async function () {
	const semaphore = getSemaphore(concurrency);
	let j = 0;
	const { promise, resolve } = promiseWithResolvers();
	for (let i = 0; i < loops; i++) {
		semaphore.acquire().then(() => {
			++j === loops && resolve();
			semaphore.release();
		});
	}
	await promise;
	checkEqual(j, loops);
	return new Response(String(j));
}
