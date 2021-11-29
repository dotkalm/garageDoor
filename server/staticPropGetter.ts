import { QueryType } from 'server/types/firestore'
import { getCollection } from 'server/firestore'

type UidType = {
	uid: string,
}
type TimeStampsType = {
	[K: string ]: "OPEN" | "CLOSED"
}
type EntryType = UidType & TimeStampsType

function getEntries(x: object): EntryType[]
function getEntries(entries: object){
	return entries
}
async function makeEntries(){
	const queryArray: QueryType[] = [
		{ value: 30, limit: true },
		{ orderBy: 'desc', field: 'uid' }
	]
	const entries = await getCollection('activity', queryArray)
	if(entries === undefined){
		throw new Error('no docs in collection')
	}
	if(entries instanceof Error){
		throw new Error(entries.message)
	}
	return getEntries(entries)
}

export async function indexResolver(){
	try{
		const thirtyEntries = await makeEntries() 
		const entries = thirtyEntries.map((entry) => {
			const arr = new Array
			let uid: number = 0
			for(const timestamp in entry){
				if(timestamp === 'uid'){
					uid = Number(entry[timestamp])
				}else{
					const entryObject = {
						timestamp: Number(timestamp), 
						action: entry[timestamp]
					}
					arr.push(entryObject)
				}
			}
			return { uid, entries: arr } 
		})
		return entries 
	}catch(err){
		return err
	}
}
 
