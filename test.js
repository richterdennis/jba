/* eslint-disable no-console */
import BOB from './lib/index.js';

const data = null;

// console.time('fill');
// for (let i = 0; i < 1_000_000; i += 1) {
// 	data.push(i);
// }
// console.timeEnd('fill');

let buf;

console.time('uint8');
// const uint8 = serialize(data);
const uint8 = BOB.encode(data);
console.timeEnd('uint8');

buf = Buffer.from(uint8);
console.log(`uint8(${buf.length}):`, buf);

console.time('json');
const json = JSON.stringify(data);
console.timeEnd('json');

buf = Buffer.from(json);
console.log(`json(${buf.length}):`, buf);

console.time('deserialize');
// const out = deserialize(uint8);
const out = BOB.decode(uint8);
console.timeEnd('deserialize');

console.log(out);
