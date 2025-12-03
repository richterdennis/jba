import * as types from './types/index.js';
import Buffer from './utils/Buffer.js';

const compareEquals = new Map();
const compareTypeof = new Map();
const compareInstanceof = new Map();
const compareIf = new Map();

for (const type of Object.values(types)) {
	register(type);
}

export function register(type) {
	if (!type.encode) return;

	if (Object.hasOwn(type, 'equals')) compareEquals.set(type.equals, type.encode);
	else if (Object.hasOwn(type, 'typeof')) compareTypeof.set(type.typeof, type.encode);
	else if (Object.hasOwn(type, 'instanceof')) compareInstanceof.set(type.instanceof, type.encode);
	else if (Object.hasOwn(type, 'if')) compareIf.set(type.if, type.encode);
	else throw new Error('Type needs to have one of ["equals", "typeof", "instanceof", "if"] defined if encode is specified');
}

export default function encode(...values) {
	const buffer = new Buffer();
	values.forEach(val => _encode(buffer, val));
	buffer.end();
	return buffer.array;
}

function _encode(buffer, value) {
	let encodeFn;

	encodeFn = compareEquals.get(value);
	if (encodeFn) return encodeFn(buffer, value, _encode);

	encodeFn = compareTypeof.get(typeof value);
	if (encodeFn) return encodeFn(buffer, value, _encode);

	encodeFn = compareInstanceof.get(value.constructor);
	if (encodeFn) return encodeFn(buffer, value, _encode);

	for (const [compare, encodeFn] of compareIf) {
		if (compare(value)) return encodeFn(buffer, value, _encode);
	}

	if (value.toJSON) {
		return _encode(buffer, value.toJSON());
	}

	throw new TypeError('Unsupported Data Type');
}
