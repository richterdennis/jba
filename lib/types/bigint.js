import {
	NUM_BigInt,
	NUM_BigUInt,
	NUM_BigInt_MAN_POS,
	NUM_BigInt_MAN_NEG,
} from '../constants.js';

export const $BIGINT = {
	'register': [
		NUM_BigInt,
		NUM_BigUInt,
		NUM_BigInt_MAN_POS,
		NUM_BigInt_MAN_NEG,
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

		// encode manually
		const negative = value < 0n;
		value = negative ? -value : value;

		const bytes = [];
		while (value > 0n) {
			bytes.push(Number(value & 0xFFn));
			value >>= 8n;
		}

		if (bytes.length > 255) throw new RangeError('BigInts that big are not supported');

		buffer.writeUInt8(negative ? NUM_BigInt_MAN_NEG : NUM_BigInt_MAN_POS);
		buffer.writeUInt8(bytes.length);
		buffer.write(bytes.reverse());
	},
	decode(type, buffer) {
		if (type === NUM_BigInt) return buffer.readBigInt64();
		if (type === NUM_BigUInt) return buffer.readBigUInt64();

		// decode manually
		const negative = type === NUM_BigInt_MAN_NEG;
		const end = buffer.readUInt8() + buffer.cursor;

		let value = 0n;
		while (buffer.cursor < end) {
			const next = buffer.readUInt8();
			value = (value << 8n) + BigInt(next);
		}

		return negative ? -value : value;
	},
};
