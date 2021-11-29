import { subscribe } from 'graphql'
import { getCollection, getDocument } from 'server/firestore'
import { QueryType, ElapsedTime } from 'server/types/firestore'
import makeDateString from 'actions/makeDateString'
import sleep from 'actions/sleep'
import type { Request } from 'pages/api/graphql'
import type { GarageEntriesArgs, LazyLoadArgsType } from 'server/types/args'

export async function garageStateResolver(parent: undefined, args: object, request: Request){
	try{
		const data = await getDocument('garage', 'status')
		if(!data){
			throw new Error('data is undefined')
		}
		if(typeof data !== 'object'){
			throw new Error('data is not an object')
		}
		return data 
	}catch(err){
		return err
	}
}
export async function lazyResolver(parent: undefined, args: LazyLoadArgsType, request: Request){
	try{
		const queryArray: QueryType[] = [
			{ field: 'uid', opperator: '<', value: args.lastUid },
			{ value: args.limit, limit: true },
			{ orderBy: 'desc', field: 'uid' },
		]
		return getCollection('activity', queryArray)
	}catch(err){
		return err
	}
}
export async function garageEntries(parent: undefined, args: GarageEntriesArgs, request: Request){
	const queryArray: QueryType[] = [
		{ orderBy: 'desc', field: 'uid' }
	]
	for(const key in args){
		if('limit' === key){
			queryArray.unshift({
				value: args.limit,
				limit: true
			})
		}
		if(key === 'lastKnownTimeStamp' && typeof args.lastKnownTimeStamp === 'number'){
			const valueToQuery = makeDateString(args.lastKnownTimeStamp)
			queryArray.unshift({ field: 'uid', opperator: '>=', value: valueToQuery, })
		}
	}
	if(queryArray.length === 1){
		queryArray.unshift({ value: 3, limit: true })
	}
	return getCollection('activity', queryArray)
}
