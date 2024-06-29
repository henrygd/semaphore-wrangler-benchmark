### About

Benchmark of popular async semaphore / mutex libraries (and also mine) in workerd.

All libraries run the same test. Each request creates a semaphore and resolves 5,000 acquisitions / releases.

### Results

Best of three runs.

| Library                                                                | Requests/sec | Total (sec) | Average | Slowest |
| :--------------------------------------------------------------------- | :----------- | :---------- | :------ | :------ |
| [@henrygd/semaphore](https://github.com/henrygd/semaphore)             | 959.9046     | 1.0418      | 0.0512  | 0.0772  |
| [async-mutex](https://www.npmjs.com/package/async-mutex)               | 582.7553     | 1.7160      | 0.0843  | 0.1221  |
| [async-sema](https://www.npmjs.com/package/async-sema)                 | 375.7332     | 2.6615      | 0.1308  | 0.1818  |
| [@shopify/semaphore](https://www.npmjs.com/package/@shopify/semaphore) | 167.8239     | 5.9586      | 0.2925  | 0.4063  |
| [await-semaphore](https://www.npmjs.com/package/await-semaphore)\*     | n/a          | n/a         | n/a     | n/a     |

> \* `await-semaphore` does not work with concurrent requests.

### Start server

```bash
pnpm i && pnpm dev
```

### Benchmark

Sends 100 requests to warm up the server, then 1,000 requests to benchmark using [oha](https://github.com/hatoo/oha).

Changing the warmup path doesn't make a difference. It's left on henrygd-semaphore to have a uniform warm time.

```bash
# @henrygd/semaphore
oha --no-tui -n 100 http://localhost:8787/henrygd-semaphore > /dev/null && oha -n 1000 http://localhost:8787/henrygd-semaphore
# async-mutex
oha --no-tui -n 100 http://localhost:8787/henrygd-semaphore > /dev/null && oha -n 1000 http://localhost:8787/async-mutex
# async-sema
oha --no-tui -n 100 http://localhost:8787/henrygd-semaphore > /dev/null && oha -n 1000 http://localhost:8787/async-sema
# await-semaphore
oha --no-tui -n 100 http://localhost:8787/henrygd-semaphore > /dev/null && oha -n 1000 http://localhost:8787/await-semaphore
# @shopify/semaphore
oha --no-tui -n 100 http://localhost:8787/henrygd-semaphore > /dev/null && oha -n 1000 http://localhost:8787/shopify-semaphore
```
