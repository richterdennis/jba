# JBA

**J**avascript Data encoded as **B**inary **A**rray - A binary encoding format for JavaScript data

JBA is a lightweight library that encodes JavaScript data into a compact `Uint8Array` format and decodes it back to its original form. It's like JSON, but binary, more efficient, and supports more JavaScript types like Dates. It works in both Node.js and browsers.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Supported Types](#supported-types)
- [API](#api)
  - [encode(...values)](#encodevalues)
  - [decode(uint8Array)](#decodeuint8array)
  - [register(factoryFn)](#registerfactoryfn)
- [Examples](#examples)
  - [Primitives](#primitives)
  - [Special Values](#special-values)
  - [Complex Data](#complex-data)
  - [Sets and Maps](#sets-and-maps)
  - [Custom Types](#custom-types)
- [Why JBA?](#why-jba)
- [Platform Support](#platform-support)
- [License](#license)

## Features

- 🚀 **Compact binary format** - More efficient than JSON for many use cases
- 📦 **Rich type support** - Handles types that JSON can't: `undefined`, `BigInt`, `Date`, `Set`, `Map`, `Infinity`, `NaN`
- 🔄 **Lossless encoding** - Preserves the exact structure and types of your data
- 🎯 **Simple API** - Just `encode()` and `decode()`
- 🔌 **Extensible** - Register custom types for your own classes
- 🌐 **Universal** - Works in Node.js and browsers
- 📘 **TypeScript support** - Fully typed with TypeScript definitions included

## Installation

```bash
npm install jba
```

## Quick Start

```javascript
import JBA from 'jba';

// Encode data to Uint8Array
const data = { name: 'Alice', age: 30, active: true };
const encoded = JBA.encode(data);

// Decode back to original data
const decoded = JBA.decode(encoded);
console.log(decoded); // { name: 'Alice', age: 30, active: true }
```

## Supported Types

JBA supports all JSON types plus many JavaScript-specific types:

- **Primitives**: `null`, `undefined`, `string`, `number`, `boolean`, `bigint`
- **Special numbers**: `Infinity`, `-Infinity`, `NaN`
- **Objects**: Plain objects, arrays
- **Built-ins**: `Date`, `Set`, `Map`
- **Custom types**: Register your own classes

## API

### `encode(...values)`

Encodes one or more JavaScript values into a `Uint8Array`.

```javascript
import { encode } from 'jba';

const uint8 = encode({ foo: 'bar' });
const multiple = encode('hello', 42, true); // Encode multiple values
```

### `decode(uint8Array)`

Decodes a `Uint8Array` back to the original JavaScript value(s).

```javascript
import { decode } from 'jba';

const data = decode(uint8);
```

If multiple values were encoded, `decode()` returns an array of values.

### `register(factoryFn)`

Register a custom type for encoding and decoding.

```javascript
import JBA from 'jba';

class Dog {
  constructor(name) {
    this.name = name;
  }
}

JBA.register((createSym) => {
  const DOG = createSym();

  return {
    register: [DOG],
    instanceof: Dog,

    encode(buffer, value, encode) {
      buffer.writeUInt8(DOG);
      encode(buffer, value.name);
    },

    decode(type, buffer, decode) {
      const name = decode(buffer);
      return new Dog(name);
    }
  };
});

// Now you can encode/decode Dog instances
const dog = new Dog('Wuffi');
const encoded = JBA.encode(dog);
const decoded = JBA.decode(encoded); // Dog { name: 'Wuffi' }
```

## Examples

### Primitives

```javascript
import JBA from 'jba';

// All primitives work
JBA.encode(null);
JBA.encode(undefined);
JBA.encode(true);
JBA.encode(42);
JBA.encode('hello');
JBA.encode(100_000_000_000_000_000n); // BigInt
```

### Special Values

```javascript
// Values that JSON can't handle
JBA.encode(Infinity);
JBA.encode(-Infinity);
JBA.encode(NaN);
JBA.encode(undefined);
```

### Complex Data

```javascript
// Nested objects and arrays
const data = {
  user: 'Alice',
  scores: [10, 20, 30],
  metadata: {
    created: new Date(),
    tags: ['foo', 'bar']
  }
};

const encoded = JBA.encode(data);
const decoded = JBA.decode(encoded);
```

### Sets and Maps

```javascript
// Set
const set = new Set([1, 2, 3, 'foo', true]);
const encodedSet = JBA.encode(set);
const decodedSet = JBA.decode(encodedSet); // Set(5)

// Map with any key/value types
const map = new Map([
  ['key', 'value'],
  [42, 'number key'],
  [true, false],
  [{ nested: 'object' }, ['array', 'value']]
]);

const encodedMap = JBA.encode(map);
const decodedMap = JBA.decode(encodedMap); // Map(4)
```

### Custom Types

The `register()` function allows you to define how your custom classes should be encoded and decoded:

```javascript
register((createSym) => {
  const MY_TYPE = createSym(); // Or createSym(1) for cross-codebase compatibility

  return {
    register: [MY_TYPE], // Symbols to register for decoding

    // Choose ONE matching strategy:
    instanceof: MyClass,           // Match by instanceof
    // typeof: 'string',           // Match by typeof
    // equals: someValue,          // Match by equality
    // if: (val) => check(val),    // Match by custom function

    encode(buffer, value, encode) {
      buffer.writeUInt8(MY_TYPE);
      // Use encode() to write nested data
      encode(buffer, value.data);
    },

    decode(type, buffer, decode) {
      // Use decode() to read nested data
      const data = decode(buffer);
      return new MyClass(data);
    }
  };
});
```

## Why JBA?

### vs JSON

- **More types**: Supports `undefined`, `BigInt`, `Date`, `Set`, `Map`, `Infinity`, `NaN`
- **Binary format**: More compact for certain data structures
- **Type preservation**: Maintains exact types (e.g., `Date` stays `Date`, not a string)

### vs Other Binary Formats

- **Simpler**: Minimal API, easy to understand
- **JavaScript-first**: Designed specifically for JavaScript types
- **Extensible**: Easy to add custom type support

## Platform Support

JBA works seamlessly across different JavaScript environments:

- **Node.js**: Full support for all Node.js versions with ES modules
- **Browsers**: Works in all modern browsers that support `Uint8Array` and ES modules
- **Universal**: The same code works in both environments without modifications

The library uses standard JavaScript features and has no platform-specific dependencies, making it ideal for isomorphic applications that run on both client and server.

## License

MIT
