import {
	NULL,
	NUM_BigInt,
	NUM_BigUInt,
} from '../constants.js';

export const $BIGINT = {
	'register': [
		NUM_BigInt,
		NUM_BigUInt,
	],
	'typeof': 'bigint',
	encode(buffer, value) {
		if (value >= 0n && value <= 0xFFFFFFFFFFFFFFFFn) {
			buffer.writeUInt8(NUM_BigUInt);
			buffer.writeBigUInt64(value);
			return;
		}

		if (value >= -0x8000000000000000n && value <= 0x7FFFFFFFFFFFFFFFn) {
			buffer.writeUInt8(NUM_BigInt);
			buffer.writeBigInt64(value);
			return;
		}

		buffer.writeUInt8(NULL);
	},
	decode(type, buffer) {
		if (type === NUM_BigInt) return buffer.readBigInt64();
		if (type === NUM_BigUInt) return buffer.readBigUInt64();
	},
};
