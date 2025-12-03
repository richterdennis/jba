import JBA from 'jba';
import { $FUNCTION } from 'jba/types/function';

let { assert } = console;

// if node
if (typeof window === 'undefined') {
	({ ok: assert } = await import('node:assert'));
}

JBA.register(() => $FUNCTION);

console.log('----------------------');

const data = function(a, b) {
	return a + b;
};

console.log('Original data:', data);

console.time('encode to uint8');
const encoded = JBA.encode(data);
console.timeEnd('encode to uint8');

console.log('uint8 size:', encoded.length);

console.time('decode from uint8');
const decoded = JBA.decode(encoded);
console.timeEnd('decode from uint8');

assert(data(1, 2) === decoded(1, 2), 'Function result should be the same!');
