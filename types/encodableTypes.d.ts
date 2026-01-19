export type EncodableTypes =
	| null
	| undefined
	| string
	| number
	| boolean
	| bigint
	| Date
	| EncodableTypes[]
	| EncodableObject
	| Set<EncodableTypes>
	| Map<EncodableTypes, EncodableTypes>

type EncodableObject = {
	[key: string | number]: EncodableTypes;
};
