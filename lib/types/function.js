import { FUNCTION } from '../constants.js';

export const $FUNCTION = {
	'register': [FUNCTION],
	'instanceof': Function,
	encode(buffer, value, encode) {
		const str = value.toString().trim();

		let argsString = '';
		let bodyString = '';

		if (str.startsWith('function') || str.match(/^async function/)) {
			argsString = str.substring(str.indexOf('(') + 1, str.indexOf(')'));
			bodyString = str.substring(str.indexOf('{') + 1, str.lastIndexOf('}'));
		}
		else {
			const arrowIndex = str.indexOf('=>');
			argsString = str
				.slice(0, arrowIndex)
				.replace('(', '')
				.replace(')', '')
				.trim();

			bodyString = str.slice(arrowIndex + 2).trim();

			if (bodyString.startsWith('{')) {
				bodyString = bodyString.slice(1, bodyString.lastIndexOf('}'));
			}
			else {
				bodyString = `return ${bodyString};`;
			}
		}

		const args = argsString
			.split(',')
			.map(a => a.trim());

		buffer.writeUInt8(FUNCTION);
		encode(buffer, [...args, bodyString]);
	},
	decode(type, buffer, decode) {
		return new Function(...decode(buffer, decode));
	},
};
