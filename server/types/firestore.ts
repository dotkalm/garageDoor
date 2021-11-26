import type { firestore: {
	CollectionReference, 
	Query,
	FieldPath,
	OrderByDirection,

} } from 'firebase-admin'

export type QueryType = [
	string | FieldPath, 
	string | undefined | OrderByDirection, 
	string | number | boolean | object | FieldPath,
]
export type CollectionType = CollectionReference | Query
