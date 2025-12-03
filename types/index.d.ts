import Buffer from './buffer.d.ts';
import { encodableTypes } from './encodableTypes.d.ts';

export * as default from './index.d.ts';

export { default as encode } from './encode.d.ts';
export { default as decode } from './decode.d.ts';

/**
 * Register a custom type for encoding and decoding from and into the jba format
 */
export function register<T>(factoryFn: CreateType<T>): void;

type CreateType<T> = (createSym: CreateSym) => NewType<T>;

type CreateSym = (index?: number) => Sym;

type Sym = {
	valueOf: () => number;
};

type NewType<T> = {
	register: Sym[];
	encode(buffer: Buffer, value: T, encode: encodeFn): void;
	decode(type: Sym, buffer: Buffer, decode: decodeFn): T;
} & NewTypeXorExtension;

type NewTypeXorExtension =
	| { equals: any; typeof?: never; instanceof?: never; if?: never }
	| { equals?: never; typeof: string; instanceof?: never; if?: never }
	| { equals?: never; typeof?: never; instanceof: Klass; if?: never }
	| { equals?: never; typeof?: never; instanceof?: never; if: (value: encodableTypes) => boolean }

type encodeFn = (buffer: Buffer, value: encodableTypes) => void;
type decodeFn = (buffer: Buffer) => encodableTypes;

type Klass<T = any> = new (...args: any[]) => T;
