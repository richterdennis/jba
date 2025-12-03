import JBA from 'jba';

let { assert } = console;

// if node
if (typeof window === 'undefined') {
	({ ok: assert } = await import('node:assert'));
}

class Dog {
	constructor(name) {
		this.name = name;
	}

	toJSON() {
		return this.name;
	}
}

JBA.register((createSym) => {
	// If encode and decode is part of the same codebase, createSym doesn't need
	// an argument. Otherwise the function needs a number as argument. The number
	// needs to be the same for the same type. The number is written as one UInt8
	// into the UInt8Array and defines of which type the next bytes are. Library
	// types are defined starting with 255 backwards. You should define your own
	// types starting with 0 or 1 to avoid collisions.

	// const DOG = createSym(1);
	const DOG = createSym();

	return {

		// Register all needed Syms here to tell the decoder when to use your
		// decode function.
		'register': [DOG],

		// Tell the encoder what to look for to use your encode function. Use
		// either one of equals, typeof, instanceof or if. For 'if' use a
		// function returning true or false to check if the given value is matching.
		'instanceof': Dog,

		encode(buffer, value, encode) {

			// Write the Sym as a UInt8 into the buffer to tell the decoder what
			// type it is
			buffer.writeUInt8(DOG);

			// Use the encode function to write your custom data
			encode(buffer, value.toJSON());
		},

		decode(type, buffer, decode) {
			// type === DOG

			// Use the decode function to read what you had written as your custom data
			const value = decode(buffer);

			// Return the same type you originally encoded.
			return new Dog(value);
		},
	};
});

console.log('----------------------');

const data = new Dog('Wuffi');

console.log('Original data:', data);

console.time('encode to uint8');
const encoded = JBA.encode(data);
console.timeEnd('encode to uint8');

console.log('uint8 size:', encoded.length);

console.time('decode from uint8');
const decoded = JBA.decode(encoded);
console.timeEnd('decode from uint8');

assert(data.name === decoded.name, 'Should be the same Dog!');
