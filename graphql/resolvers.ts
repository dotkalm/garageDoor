import { subscribe } from 'graphql'
import { getCollection, getDocument } from 'server/firestore'
import { QueryType } from 'server/types/firestore'
import makeDateString from 'actions/makeDateString'
import sleep from 'actions/sleep'

export async function* garageStateGenerator(){
	let i = 0
	while(i < 20){
		await sleep(500)
		yield { state: true }
		i += 1
	}
}

export async function garageStateResolver(parent, args, request){
	console.log('garage', 'status')
	const data = await getDocument('garage', 'status')
	console.log(data)
	return data 
}

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
