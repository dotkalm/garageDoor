import { firestore } from 'firebase-admin'

export type OrderByDirection = 'desc' | 'asc'
type CollectionReference = firestore.CollectionReference
export type DocumentReference = firestore.DocumentReference 
export type DocumentSnapshot = firestore.DocumentSnapshot
type Query = firestore.Query
type FieldPath = firestore.FieldPath
type FieldType = string | FieldPath
type OpperatorType =  '<'| '<='| '=='| '!='| '>='| '>'| 'array-contains'| 'in'| 'array-contains-any'| 'not-in' 
type ValueType = string | number | boolean | object | FieldPath
type OrderByType = OrderByDirection 

export type QueryType = {
	field?: FieldType,
	opperator?: OpperatorType,
	value?: ValueType,
	orderBy?: OrderByType,
	limit?: boolean,
}

export type CollectionType = CollectionReference | Query
export type ElapsedTime = {
	days: number
	hours: number
	minutes: number
	seconds: number
}
export type CollectionNameTypes = 'activity' | 'garage'

export type UpdateOrMergeType = 'success' | Error

