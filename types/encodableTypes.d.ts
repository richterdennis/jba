export type encodableTypes =
	| null
	| undefined
	| string
	| number
	| boolean
	| bigint
	| Date
	| encodableTypes[]
	| encodableObject
	| Set<encodableTypes>
	| Map<encodableTypes, encodableTypes>

type encodableObject = {
	[key: string | number]: encodableTypes;
};
