import {
	ARRAY,
	SET,
	MAP,
	OBJECT,
	END,
} from '../constants.js';

export const $END = {
	register: [END],
	decode() {
		return END;
	},
};

export const $ARRAY = {
	'register': [ARRAY],
	'instanceof': Array,
	encode(buffer, value, encode) {
		buffer.writeUInt8(ARRAY);
		for (let i = 0; i < value.length; i++) {
			encode(buffer, value[i]);
		}
		buffer.writeUInt8(END);
	},
	decode(type, buffer, decode) {
		const values = [];

		while (buffer.cursor < buffer.length) {
			const val = decode(buffer, decode);
			if (val === END) break;
			values.push(val);
		}

		return values;
	},
};

export const $SET = {
	'register': [SET],
	'instanceof': Set,
	encode(buffer, value, encode) {
		buffer.writeUInt8(SET);
		for (const entry of value) {
			encode(buffer, entry);
		}
		buffer.writeUInt8(END);
	},
	decode(type, buffer, decode) {
		const value = new Set();

		while (buffer.cursor < buffer.length) {
			const val = decode(buffer, decode);
			if (val === END) break;
			value.add(val);
		}

		return value;
	},
};

export const $MAP = {
	'register': [MAP],
	'instanceof': Map,
	encode(buffer, value, encode) {
		buffer.writeUInt8(MAP);
		for (const [key, val] of value) {
			encode(buffer, key);
			encode(buffer, val);
		}
		buffer.writeUInt8(END);
	},
	decode(type, buffer, decode) {
		const value = new Map();

		while (buffer.cursor < buffer.length) {
			const key = decode(buffer, decode);
			if (key === END) break;
			const val = decode(buffer, decode);
			value.set(key, val);
		}

		return value;
	},
};

export const $OBJECT = {
	'register': [OBJECT],
	'if': value => value.constructor === Object || Object.getPrototypeOf(value) === null,
	encode(buffer, value, encode) {
		buffer.writeUInt8(OBJECT);
		for (const [key, val] of Object.entries(value)) {
			encode(buffer, key);
			encode(buffer, val);
		}
		buffer.writeUInt8(END);
	},
	decode(type, buffer, decode) {
		const value = {};

		while (buffer.cursor < buffer.length) {
			const key = decode(buffer, decode);
			if (key === END) break;
			const val = decode(buffer, decode);
			value[key] = val;
		}

		return value;
	},
};
