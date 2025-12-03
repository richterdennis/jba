import JBA from 'jba';

let { assert } = console;

// if node
if (typeof window === 'undefined') {
	({ ok: assert } = await import('node:assert'));
}

console.log('----------------------');

const data = new Date();

console.log('Original data:', data);

console.time('encode to uint8');
const encoded = JBA.encode(data);
console.timeEnd('encode to uint8');

console.log('uint8 size:', encoded.length);

console.time('decode from uint8');
const decoded = JBA.decode(encoded);
console.timeEnd('decode from uint8');

assert(data.toISOString() === decoded.toISOString(), 'Should be the same!');
