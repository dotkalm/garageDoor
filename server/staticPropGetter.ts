import { QueryType } from 'server/types/firestore'
import { getCollection } from 'server/firestore'

export async function indexResolver(){
	const queryArray: QueryType[] = [
		{ value: 30, limit: true },
		{ orderBy: 'desc', field: 'uid' }
	]
	const thirtyEntries = await getCollection('activity', queryArray)
	const entries = thirtyEntries.map(({uid, ...entry}) => {
		const arr = new Array
		for(const timestamp in entry){
			arr.push({ timestamp, action: entry[timestamp] })
		}
		return { uid: Number(uid), entries: arr } 
	})
	return entries 
}
 
