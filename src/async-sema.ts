import { checkEqual, loops, promiseWithResolvers } from './util';
import { concurrency } from './util';
import { Sema } from 'async-sema';

export default async function () {
	const s = new Sema(concurrency, {
		capacity: loops, // Prealloc space for [loops] tokens
	});
	let j = 0;
	const { promise, resolve } = promiseWithResolvers();
	for (let i = 0; i < loops; i++) {
		s.acquire().then(() => {
			++j === loops && resolve();
			s.release();
		});
	}
	await promise;
	checkEqual(j, loops);
	return new Response(String(j));
}
