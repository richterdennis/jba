import JBA from 'jba';

let { assert } = console;

// if node
if (typeof window === 'undefined') {
	({ ok: assert } = await import('node:assert'));
}

console.log('----------------------');

{
	const data = [];

	for (let i = 0; i < 1_000_000; i += 1) {
		data.push(i);
	}

	console.log('Original data:', data);

	console.time('encode to uint8');
	const encoded = JBA.encode(data);
	console.timeEnd('encode to uint8');

	console.log('uint8 size:', encoded.length);

	console.time('decode from uint8');
	const decoded = JBA.decode(encoded);
	console.timeEnd('decode from uint8');

	assert(
		(
			data.length === decoded.length
			&& data.at(0) === decoded.at(0)
			&& data.at(-1) === decoded.at(-1)
		),
		'Should be the same!',
	);

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
	const data = { foo: 'bar', bar: 123, baz: true, taz: '' };

	console.log('Original data:', data);

	console.time('encode to uint8');
	const encoded = JBA.encode(data);
	console.timeEnd('encode to uint8');

	console.log('uint8 size:', encoded.length);

	console.time('decode from uint8');
	const decoded = JBA.decode(encoded);
	console.timeEnd('decode from uint8');

	assert(
		JSON.stringify(data) === JSON.stringify(decoded),
		'Should be the same!',
	);

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
	const data = new Set([null, undefined, 1, true, Infinity]);

	console.log('Original data:', data);

	console.time('encode to uint8');
	const encoded = JBA.encode(data);
	console.timeEnd('encode to uint8');

	console.log('uint8 size:', encoded.length);

	console.time('decode from uint8');
	const decoded = JBA.decode(encoded);
	console.timeEnd('decode from uint8');

	console.log('After JBA.decode:', decoded);
}

console.log('----------------------');

{
	const data = new Map([
		['foo', 'foobar'],
		['bar', 213],
		['baz', true],
		['faz', false],
		['taz', ['More', 'nested', 'data']],
		[0, 1],
		[1, 0],
		[true, false],
		[false, true],
		[{ 'An object can also': 'be a key' }, [['foobar']]],
	]);

	console.log('Original data:', data);

	console.time('encode to uint8');
	const encoded = JBA.encode(data);
	console.timeEnd('encode to uint8');

	console.log('uint8 size:', encoded.length);

	console.time('decode from uint8');
	const decoded = JBA.decode(encoded);
	console.timeEnd('decode from uint8');

	console.log('After JBA.decode:', decoded);
}
