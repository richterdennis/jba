import type { EncodableTypes } from './EncodableTypes.d.ts';

/**
 * Takes almost anything and encodes it as a Uint8Array using jba format
 */
export default function encode(...values: EncodableTypes[]): Uint8Array;
