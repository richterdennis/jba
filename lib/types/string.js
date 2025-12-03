import { STRING_EMPTY, STRING_LONG, STRING_MIDDLE, STRING_SHORT } from '../constants.js';

export const $STRING_EMPTY = {
	register: [STRING_EMPTY],
	equals: '',
	encode(buffer) {
		buffer.writeUInt8(STRING_EMPTY);
	},
	decode() {
		return '';
	},
};

const encoder = new TextEncoder();

export const $STRING = {
	'register': [STRING_SHORT, STRING_MIDDLE, STRING_LONG],
	'typeof': 'string',
	encode(buffer, value) {
		const data = encoder.encode(value);
		if (data.length > 4294967295) throw new RangeError('To much data');

		if (data.length <= 255) {
			buffer.writeUInt8(STRING_SHORT);
			buffer.writeUInt8(data.length);
		}
		else if (data.length <= 65535) {
			buffer.writeUInt8(STRING_MIDDLE);
			buffer.writeUInt16(data.length);
		}
		else if (data.length <= 4294967295) {
			buffer.writeUInt8(STRING_LONG);
			buffer.writeUInt32(data.length);
		}

		buffer.write(data);
	},
	decode(type, buffer) {
		let byteLength;

		if (type === STRING_SHORT) {
			byteLength = buffer.readUInt8();
		}
		else if (type === STRING_MIDDLE) {
			byteLength = buffer.readUInt16();
		}
		else { // type === STRING_LONG
			byteLength = buffer.readUInt32();
		}

		return buffer.read(byteLength, 'utf-8');
	},
};
