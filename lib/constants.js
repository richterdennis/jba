const pool = new Set();

for (let i = 0; i <= 0xFF; i++) {
	pool.add(i);
}

export function sym(val) {
	if (val != null) {
		if (!pool.has(val)) throw new Error('Sym already registered');
		pool.delete(val);
	}
	else {
		if (!pool.size) throw new Error('Too many types registered');
		[val] = pool;
		pool.delete(val);
	}

	return { valueOf: () => val };
}

let i = 0xFF;

export const NULL                  = sym(i--);
export const UNDEFINED             = sym(i--);
export const BOOL_FALSE            = sym(i--);
export const BOOL_TRUE             = sym(i--);
export const STRING_EMPTY          = sym(i--);
export const STRING_SHORT          = sym(i--);
export const STRING_MIDDLE         = sym(i--);
export const STRING_LONG           = sym(i--);
export const NUM_Int8              = sym(i--);
export const NUM_UInt8             = sym(i--);
export const NUM_Int16             = sym(i--);
export const NUM_UInt16            = sym(i--);
export const NUM_Int32             = sym(i--);
export const NUM_UInt32            = sym(i--);
export const NUM_Double            = sym(i--);
export const NUM_BigInt            = sym(i--);
export const NUM_BigUInt           = sym(i--);
export const NUM_NaN               = sym(i--);
export const NUM_INFINITY          = sym(i--);
export const NUM_NEGATIVE_INFINITY = sym(i--);
export const NUM_STR_S3            = sym(i--);
export const NUM_STR_S4            = sym(i--);
export const NUM_STR_S5            = sym(i--);
export const NUM_STR_S6            = sym(i--);
export const NUM_STR_S7            = sym(i--);
export const DATE                  = sym(i--);
export const ARRAY                 = sym(i--);
export const OBJECT                = sym(i--);
export const SET                   = sym(i--);
export const MAP                   = sym(i--);
export const FUNCTION              = sym(i--);
export const END                   = sym(i--);
