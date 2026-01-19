const INITIAL_SIZE = 1024;
const MAX_INCREMENT = 1024 * 1024 * 16;
const MAX_SIZE = 1024 * 1024 * 1024;

export default class Buffer {

	static from(value) {
		if (ArrayBuffer.isView(value)) {
			const buffer = new Buffer(value.byteLength);
			buffer.write(value);
			return buffer.reset();
		}

		if (value instanceof ArrayBuffer) {
			return Buffer.from(new DataView(value)).reset();
		}

		if (value instanceof Array) {
			const buffer = new Buffer(value.length);
			buffer.write(value);
			return buffer.reset();
		}

		if (typeof value === 'string') {
			const encoder = new TextEncoder();
			value = encoder.encode(value);
			return Buffer.from(value).reset();
		}

		throw new TypeError('Unsupported type');
	}

	static concat(list) {
		let byteLength = 0;
		list.map((b) => {
			byteLength += b.byteLength ?? b.length;
		});

		const buffer = new Buffer(byteLength);
		list.forEach(b => buffer.write(b.array ? b.array : b));
		return buffer.reset();
	}

	#cursor = 0;
	#buffer = null;
	#view = null;
	#array = null;

	constructor(length) {
		this.#buffer = length == null
			? new ArrayBuffer(INITIAL_SIZE, { maxByteLength: MAX_SIZE })
			: new ArrayBuffer(length);

		this.#view = new DataView(this.#buffer);
		this.#array = new Uint8Array(this.#buffer);
	}

	get cursor() {
		return this.#cursor;
	}

	get byteLength() {
		return this.#buffer.byteLength;
	}

	get length() {
		return this.#buffer.byteLength;
	}

	get array() {
		return this.#array;
	}

	#resize(length) {
		if (!this.#buffer.resizable) return;

		if (length == null) {
			const newSize = Math.min(this.#buffer.byteLength * 2, this.#buffer.byteLength + MAX_INCREMENT);
			this.#buffer.resize(Math.min(newSize, this.#buffer.maxByteLength));
		}
		else if (length === this.#buffer.byteLength) {
			return;
		}
		else if (length < this.#buffer.byteLength) {
			this.#buffer.resize(length);
		}
		else {
			let newSize = Math.min(this.#buffer.byteLength * 2, this.#buffer.byteLength + MAX_INCREMENT);
			if (length > newSize) newSize = Math.ceil(length / 1024) * 1024;
			this.#buffer.resize(Math.min(newSize, this.#buffer.maxByteLength));
		}
	}

	end() {
		this.#resize(this.#cursor);
		this.#cursor = 0;

		if (this.#buffer.resizable) {
			// Convert buffer into non resizable one
			this.#buffer = ArrayBuffer.prototype.transferToFixedLength
				? this.#buffer.transferToFixedLength()
				: this.#buffer.slice(0);

			this.#view = new DataView(this.#buffer);
			this.#array = new Uint8Array(this.#buffer);
		}

		return this;
	}

	offset(offset) {
		this.#cursor += offset;
		return this;
	}

	reset() {
		this.#cursor = 0;
		return this;
	}

	read(byteLength = -0, encoding = null) {
		if (byteLength < 0 || Object.is(byteLength, -0)) {
			byteLength = this.#buffer.byteLength - this.#cursor + byteLength;
		}

		const sub = this.#array.subarray(this.#cursor, (this.#cursor += byteLength));
		if (!encoding) return sub;

		const decoder = new TextDecoder(encoding);
		return decoder.decode(sub);
	}

	rest(encoding = null) {
		return this.read(-0, encoding);
	}

	#read(type, byteLength) {
		const val = this.#view[`get${type}`](this.#cursor);
		this.#cursor += byteLength;
		return val;
	}

	readInt8() {
		return this.#read('Int8', 1);
	}
	readUInt8() {
		return this.#read('Uint8', 1);
	}
	readInt16() {
		return this.#read('Int16', 2);
	}
	readUInt16() {
		return this.#read('Uint16', 2);
	}
	readInt32() {
		return this.#read('Int32', 4);
	}
	readUInt32() {
		return this.#read('Uint32', 4);
	}
	readBigInt64() {
		return this.#read('BigInt64', 8);
	}
	readBigUInt64() {
		return this.#read('BigUint64', 8);
	}
	readFloat() {
		return this.#read('Float32', 4);
	}
	readDouble() {
		return this.#read('Float64', 8);
	}

	write(value, encoding = null) {
		if (encoding) {
			const encoder = new TextEncoder(encoding);
			value = encoder.encode(value);
		}

		const byteLength = value.byteLength ?? value.length;

		if (this.#cursor + byteLength > this.#buffer.byteLength) {
			this.#resize(this.#cursor + byteLength);
		}

		this.#array.set(value, this.#cursor);
		this.#cursor += byteLength;

		return this;
	}

	#write(type, byteLength, val) {
		if (this.#cursor + byteLength > this.#buffer.byteLength) {
			this.#resize(this.#cursor + byteLength);
		}

		this.#view[`set${type}`](this.#cursor, val);
		this.#cursor += byteLength;

		return this;
	}

	writeInt8(val) {
		return this.#write('Int8', 1, val);
	}
	writeUInt8(val) {
		return this.#write('Uint8', 1, val);
	}
	writeInt16(val) {
		return this.#write('Int16', 2, val);
	}
	writeUInt16(val) {
		return this.#write('Uint16', 2, val);
	}
	writeInt32(val) {
		return this.#write('Int32', 4, val);
	}
	writeUInt32(val) {
		return this.#write('Uint32', 4, val);
	}
	writeBigInt64(val) {
		return this.#write('BigInt64', 8, val);
	}
	writeBigUInt64(val) {
		return this.#write('BigUint64', 8, val);
	}
	writeFloat(val) {
		return this.#write('Float32', 4, val);
	}
	writeDouble(val) {
		return this.#write('Float64', 8, val);
	}
}
