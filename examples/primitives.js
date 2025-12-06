import JBA from 'jba';

let { assert } = console;

// if node
if (typeof window === 'undefined') {
	({ ok: assert } = await import('node:assert'));
}

{
	const data = null;

	console.log('Original data:', data);

	console.time('encode to uint8');
	const encoded = JBA.encode(data);
	console.timeEnd('encode to uint8');

	console.log('uint8 size:', encoded.length);

	console.time('decode from uint8');
	const decoded = JBA.decode(encoded);
	console.timeEnd('decode from uint8');

	assert(data === decoded, 'Should be the same!');

	console.time('encode to json');
	const jsonStr = JSON.stringify(data);
	console.timeEnd('encode to json');

	console.log('json string length:', jsonStr.length);

	console.time('decode from json');
	const parsedJson = JSON.parse(jsonStr);
	console.timeEnd('decode from json');

	console.log('After JSON.parse:', parsedJson);
}

console.log('----------------------');

{
	const data = undefined;

	console.log('Original data:', data);

	console.time('encode to uint8');
	const encoded = JBA.encode(data);
	console.timeEnd('encode to uint8');

	console.log('uint8 size:', encoded.length);

	console.time('decode from uint8');
	const decoded = JBA.decode(encoded);
	console.timeEnd('decode from uint8');

	assert(data === decoded, 'Should be the same!');

	/* JSON cannot stringify "undefined"
	console.time('encode to json');
	const jsonStr = JSON.stringify(data);
	console.timeEnd('encode to json');

	console.log('json string length:', jsonStr.length);

	console.time('decode from json');
	const parsedJson = JSON.parse(jsonStr);
	console.timeEnd('decode from json');
	*/
}

const test = [true, false, 1, 255, 256, 1000, 10_000, 0.1, 0.000000001, '', 'foobar'];

for (const data of test) {

	console.log('----------------------');

	console.log('Original data:', data);

	console.time('encode to uint8');
	const encoded = JBA.encode(data);
	console.timeEnd('encode to uint8');

	console.log('uint8 size:', encoded.length);

	console.time('decode from uint8');
	const decoded = JBA.decode(encoded);
	console.timeEnd('decode from uint8');

	assert(data === decoded, 'Should be the same!');

	console.time('encode to json');
	const jsonStr = JSON.stringify(data);
	console.timeEnd('encode to json');

	console.log('json string length:', jsonStr.length);

	console.time('decode from json');
	const parsedJson = JSON.parse(jsonStr);
	console.timeEnd('decode from json');

	console.log('After JSON.parse:', parsedJson);
}

console.log('----------------------');

{
	const data = 100_000_000_000_000_000n;

	console.log('Original data:', data);

	console.time('encode to uint8');
	const encoded = JBA.encode(data);
	console.timeEnd('encode to uint8');

	console.log('uint8 size:', encoded.length);

	console.time('decode from uint8');
	const decoded = JBA.decode(encoded);
	console.timeEnd('decode from uint8');

	assert(data === decoded, 'Should be the same!');

	/* JSON cannot stringify a BigInt
	console.time('encode to json');
	const jsonStr = JSON.stringify(data);
	console.timeEnd('encode to json');

	console.log('json string length:', jsonStr.length);

	console.time('decode from json');
	const parsedJson = JSON.parse(jsonStr);
	console.timeEnd('decode from json');
	*/
}

console.log('----------------------');

{
	const data = -1234567890123456789012345678901234567890n;

	console.log('Original data:', data);

	console.time('encode to uint8');
	const encoded = JBA.encode(data);
	console.timeEnd('encode to uint8');

	console.log('uint8 size:', encoded.length);

	console.time('decode from uint8');
	const decoded = JBA.decode(encoded);
	console.timeEnd('decode from uint8');

	assert(data === decoded, 'Should be the same!');

	/* JSON cannot stringify a BigInt
	console.time('encode to json');
	const jsonStr = JSON.stringify(data);
	console.timeEnd('encode to json');

	console.log('json string length:', jsonStr.length);

	console.time('decode from json');
	const parsedJson = JSON.parse(jsonStr);
	console.timeEnd('decode from json');
	*/
}

const jbaCanDoMoreThenJson = [undefined, Infinity, -Infinity, NaN];

for (const data of jbaCanDoMoreThenJson) {

	console.log('----------------------');

	console.log('Original data:', data);

	console.time('encode to uint8');
	const encoded = JBA.encode(data);
	console.timeEnd('encode to uint8');

	console.log('uint8 size:', encoded.length);

	console.time('decode from uint8');
	const decoded = JBA.decode(encoded);
	console.timeEnd('decode from uint8');

	console.log('After JBA.decode:', decoded);

	/*
	console.time('encode to json');
	const jsonStr = JSON.stringify(data);
	console.timeEnd('encode to json');

	console.log('json string length:', jsonStr.length);

	console.time('decode from json');
	const parsedJson = JSON.parse(jsonStr);
	console.timeEnd('decode from json');

	console.log('After JSON.parse:', parsedJson);
	*/
}
