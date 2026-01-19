import type { EncodableTypes } from './EncodableTypes.d.ts';

/**
 * Takes a Uint8Array with jba format and decodes it back to a copy of its original data
 */
export default function decode(uint8: Uint8Array): EncodableTypes | EncodableTypes[];
