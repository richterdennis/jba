import type Buffer from './buffer.d.ts';
import type { EncodableTypes } from './EncodableTypes.d.ts';

export type * as default from './index.d.ts';

export type { default as encode } from './encode.d.ts';
export type { default as decode } from './decode.d.ts';

export { EncodableTypes, Buffer };

/**
 * Register a custom type for encoding and decoding from and into the jba format
 */
export function register<T>(factoryFn: CreateType<T>): void;

export type CreateType<T> = (createSym: CreateSym) => NewType<T>;

export type CreateSym = (index?: number) => Sym;

export type Sym = {
	valueOf: () => number;
};

export type NewType<T> = {
	register: Sym[];
	encode(buffer: Buffer, value: T, encode: EncodeFn): void;
	decode(type: Sym, buffer: Buffer, decode: DecodeFn): T;
} & NewTypeXorExtension;

type NewTypeXorExtension =
	| { equals: any; typeof?: never; instanceof?: never; if?: never }
	| { equals?: never; typeof: string; instanceof?: never; if?: never }
	| { equals?: never; typeof?: never; instanceof: Klass; if?: never }
	| { equals?: never; typeof?: never; instanceof?: never; if: (value: EncodableTypes) => boolean }

export type EncodeFn = (buffer: Buffer, value: EncodableTypes) => void;
export type DecodeFn = (buffer: Buffer) => EncodableTypes;

type Klass<T = any> = new (...args: any[]) => T;
