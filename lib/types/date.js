import { DATE } from '../constants.js';

export const $DATE = {
	'register': [DATE],
	'instanceof': Date,
	encode(buffer, value) {
		buffer.writeUInt8(DATE);
		buffer.writeDouble(value.getTime());
	},
	decode(type, buffer) {
		return new Date(buffer.readDouble());
	},
};
