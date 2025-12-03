import { encodableTypes } from './encodableTypes.d.ts';

/**
 * Takes almost anything and encodes it as a Uint8Array using jba format
 */
export default function encode(...values: encodableTypes[]): Uint8Array;
