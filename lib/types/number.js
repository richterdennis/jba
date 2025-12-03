import {
	NULL,
	NUM_Int8,
	NUM_UInt8,
	NUM_Int16,
	NUM_UInt16,
	NUM_Int32,
	NUM_UInt32,
	NUM_Double,
	NUM_NaN,
	NUM_INFINITY,
	NUM_NEGATIVE_INFINITY,
	NUM_STR_S3,
	NUM_STR_S4,
	NUM_STR_S5,
	NUM_STR_S6,
	NUM_STR_S7,
} from '../constants.js';

export const $NUMBER = {
	'register': [
		NUM_Int8,
		NUM_UInt8,
		NUM_Int16,
		NUM_UInt16,
		NUM_Int32,
		NUM_UInt32,
		NUM_Double,
		NUM_NaN,
		NUM_INFINITY,
		NUM_NEGATIVE_INFINITY,
		NUM_STR_S3,
		NUM_STR_S4,
		NUM_STR_S5,
		NUM_STR_S6,
		NUM_STR_S7,
	],
	'typeof': 'number',
	encode(buffer, value) {
		if (isNaN(value)) return void buffer.writeUInt8(NUM_NaN);
		if (value === Number.POSITIVE_INFINITY) return void buffer.writeUInt8(NUM_INFINITY);
		if (value === Number.NEGATIVE_INFINITY) return void buffer.writeUInt8(NUM_NEGATIVE_INFINITY);

		if (!Number.isFinite(value)) return void buffer.writeUInt8(NULL);

		if (Number.isInteger(value)) {
			if (value >= -128 && value <= 127) {
				buffer.writeUInt8(NUM_Int8);
				buffer.writeInt8(value);
				return;
			}
			if (value >= 0 && value <= 255) {
				buffer.writeUInt8(NUM_UInt8);
				buffer.writeUInt8(value);
				return;
			}
			if (value >= -32768 && value <= 32767) {
				buffer.writeUInt8(NUM_Int16);
				buffer.writeInt16(value);
				return;
			}
			if (value >= 0 && value <= 65535) {
				buffer.writeUInt8(NUM_UInt16);
				buffer.writeUInt16(value);
				return;
			}
			if (value >= -2147483648 && value <= 2147483647) {
				buffer.writeUInt8(NUM_Int32);
				buffer.writeInt32(value);
				return;
			}
			if (value >= 0 && value <= 4294967295) {
				buffer.writeUInt8(NUM_UInt32);
				buffer.writeUInt32(value);
				return;
			}

			buffer.writeUInt8(NUM_Double);
			buffer.writeDouble(value);
		}

		const strLen = value.toString().length;
		if (strLen > 2 && strLen < 8) {
			let type;
			switch (strLen) {
				case 3: type = NUM_STR_S3; break;
				case 4: type = NUM_STR_S4; break;
				case 5: type = NUM_STR_S5; break;
				case 6: type = NUM_STR_S6; break;
				case 7: type = NUM_STR_S7; break;
			}

			buffer.writeUInt8(type);
			buffer.write(value.toString(), 'utf-8');
			return;
		}

		buffer.writeUInt8(NUM_Double);
		buffer.writeDouble(value);
		return;
	},
	decode(type, buffer) {
		switch (type) {
			case NUM_Int8: return buffer.readInt8();
			case NUM_UInt8: return buffer.readUInt8();
			case NUM_Int16: return buffer.readInt16();
			case NUM_UInt16: return buffer.readUInt16();
			case NUM_Int32: return buffer.readInt32();
			case NUM_UInt32: return buffer.readUInt32();
			case NUM_Double: return buffer.readDouble();
			case NUM_NaN: return NaN;
			case NUM_INFINITY: return Number.POSITIVE_INFINITY;
			case NUM_NEGATIVE_INFINITY: return Number.NEGATIVE_INFINITY;
			case NUM_STR_S3: return parseFloat(buffer.read(3, 'utf-8'));
			case NUM_STR_S4: return parseFloat(buffer.read(4, 'utf-8'));
			case NUM_STR_S5: return parseFloat(buffer.read(5, 'utf-8'));
			case NUM_STR_S6: return parseFloat(buffer.read(6, 'utf-8'));
			case NUM_STR_S7: return parseFloat(buffer.read(7, 'utf-8'));
		}
	},
};
