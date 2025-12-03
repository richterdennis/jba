export default class Buffer {
	/**
	 * Used by the read and write functions as offset value and gets automatically
	 * incremented by the number of bytes written or read.
	 */
	readonly cursor: number;

	/**
	 * The size / number of bytes of the underlying ArrayBuffer. Same as length
	 */
	readonly byteLength: number;

	/**
	 * The size / number of bytes of the underlying ArrayBuffer. Same as byteLength
	 */
	readonly length: number;

	/**
	 * The underlying native Uint8Array instance
	 */
	readonly array: Uint8Array;

	/**
	 * Offset the internal cursor. No need to call this function. The cursor
	 * increments it self automatically.
	 */
	offset(offset: number): Buffer;

	/**
	 * Reads from the underlying Uint8Array. Converts the bytes into a string if
	 * an encoding is given otherwise it returns a subarray
	 */
	read(byteLength?: number): Uint8Array;
	read(byteLength: number, encoding: 'utf-8'): string;

	/**
	 * Reads 1 byte as an Int8 and returns it as a number
	 */
	readInt8(): number;

	/**
	 * Reads 1 byte as an UInt8 and returns it as a number
	 */
	readUInt8(): number;

	/**
	 * Reads 2 bytes as an Int16 and returns it as a number
	 */
	readInt16(): number;

	/**
	 * Reads 2 bytes as an UInt16 and returns it as a number
	 */
	readUInt16(): number;

	/**
	 * Reads 4 bytes as an Int32 and returns it as a number
	 */
	readInt32(): number;

	/**
	 * Reads 4 bytes as an UInt32 and returns it as a number
	 */
	readUInt32(): number;

	/**
	 * Reads 8 bytes as an BigInt64 and returns it as a bigint
	 */
	readBigInt64(): bigint;

	/**
	 * Reads 8 bytes as a BigUInt64 and returns it as a bigint
	 */
	readBigUInt64(): bigint;

	/**
	 * Reads 4 bytes as a Float and returns it as a number
	 */
	readFloat(): number;

	/**
	 * Reads 8 bytes as a Double and returns it as a number
	 */
	readDouble(): number;

	/**
	 * Writes into the underlying Uint8Array. Converts a string into bytes before
	 * writing if an encoding is given otherwise it writes the data directly
	 */
	write(value: Buffer | ArrayLike<number>): Buffer;
	write(value: string, encoding: 'utf-8'): Buffer;


	/**
	 * Writes the given number as Int8 using 1 byte
	 */
	writeInt8(val: number): Buffer;

	/**
	 * Writes the given number as UInt8 using 1 byte
	 */
	writeUInt8(val: number): Buffer;

	/**
	 * Writes the given number as Int16 using 2 bytes
	 */
	writeInt16(val: number): Buffer;

	/**
	 * Writes the given number as UInt16 using 2 bytes
	 */
	writeUInt16(val: number): Buffer;

	/**
	 * Writes the given number as Int32 using 4 bytes
	 */
	writeInt32(val: number): Buffer;

	/**
	 * Writes the given number as UInt32 using 4 bytes
	 */
	writeUInt32(val: number): Buffer;

	/**
	 * Writes the given bigint as BigInt64 using 8 bytes
	 */
	writeBigInt64(val: bigint): Buffer;

	/**
	 * Writes the given bigint as BigUInt64 using 8 bytes
	 */
	writeBigUInt64(val: bigint): Buffer;

	/**
	 * Writes the given number as Float using 4 bytes
	 */
	writeFloat(val: number): Buffer;

	/**
	 * Writes the given number as Double using 8 bytes
	 */
	writeDouble(val: number): Buffer;
}
