import { NULL, UNDEFINED } from '../constants.js';

export const $NULL = {
	register: [NULL],
	equals: null,
	encode(buffer) {
		buffer.writeUInt8(NULL);
	},
	decode() {
		return null;
	},
};

export const $UNDEFINED = {
	register: [UNDEFINED],
	equals: undefined,
	encode(buffer) {
		buffer.writeUInt8(UNDEFINED);
	},
	decode() {
		return undefined;
	},
};
