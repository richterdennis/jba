import * as types from './types/index.js';
import Buffer from './utils/Buffer.js';

const registered = new Map();

for (const type of Object.values(types)) {
	register(type);
}

export function register(type) {
	if (!type.decode) return;

	type.register.forEach((sym) => {
		if (registered.has(sym.valueOf())) throw new Error('Sym already registered');
		registered.set(sym.valueOf(), type.decode.bind(null, sym));
	});
}

export default function decode(uint8) {
	const buffer = Buffer.from(uint8);

	const values = [];

	while (buffer.cursor < buffer.byteLength) {
		values.push(_decode(buffer));
	}

	return values.length === 1 ? values[0] : values;
}

function _decode(buffer) {
	const type = buffer.readUInt8();

	const decodeFn = registered.get(type);
	if (decodeFn) return decodeFn(buffer, _decode);

	throw new TypeError('Malformed input');
}
