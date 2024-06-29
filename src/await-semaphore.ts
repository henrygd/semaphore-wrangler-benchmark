import { checkEqual, loops, promiseWithResolvers } from './util';
import { concurrency } from './util';
import { Semaphore } from 'await-semaphore';

export default async function () {
	const semaphore = new Semaphore(concurrency);
	let j = 0;
	const { promise, resolve } = promiseWithResolvers();
	for (let i = 0; i < loops; i++) {
		semaphore.acquire().then((release) => {
			++j === loops && resolve();
			release();
		});
	}
	await promise;
	checkEqual(j, loops);
	return new Response(String(j));
}
