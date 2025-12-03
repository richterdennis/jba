import { register as registerEncode } from './encode.js';
import { register as registerDecode } from './decode.js';
import { sym } from './constants.js';

export function register(factoryFn) {
	const type = factoryFn(sym);

	registerEncode(type);
	registerDecode(type);
}

export { default as encode } from './encode.js';
export { default as decode } from './decode.js';

export * as default from './index.js';
