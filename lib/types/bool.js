import { BOOL_TRUE, BOOL_FALSE } from '../constants.js';

export const $BOOL = {
	'register': [BOOL_TRUE, BOOL_FALSE],
	'typeof': 'boolean',
	encode(buffer, value) {
		buffer.writeUInt8(value ? BOOL_TRUE : BOOL_FALSE);
	},
	decode(type) {
		return type === BOOL_TRUE;
	},
};
