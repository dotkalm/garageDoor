import { getCollection } from 'server/firestore'
import { QueryType } from 'server/types/firestore'
import makeDateString from 'actions/makeDateString'

export async function garageEntries(parent, args, request){
	const queryArray: QueryType[] = [
		{ orderBy: 'desc', field: 'uid' }
	]
	if('limit' in args){
		queryArray.unshift({
			value: args.limit,
			limit: true
		})
	}else if('lastKnownTimeStamp' in args){
		queryArray.unshift({
			field: 'uid',
			opperator: '>=',
			value: makeDateString(args.lastKnownTimeStamp),
		})
	}else{
		queryArray.unshift({
			value: 3,
			limit: true
		})
	}
	return getCollection('activity', queryArray)
}
export async function garageStateResolver(){
	return true
}
