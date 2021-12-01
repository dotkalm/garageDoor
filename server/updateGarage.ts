import { updateDoc, mergeDocIfExists } from 'server/firestore'
import makeDateString from 'actions/makeDateString'
import type { 
	ActivityObjectType,
	UpdateStateType, 
	UpdateGarageType, 
} from 'server/types'
import type { UpdateOrMergeType } from 'server/types/firestore'

export default async function updateGarage(action: UpdateGarageType): Promise<UpdateOrMergeType>{
	try{ 
		const ms = new Date(Date.now()).valueOf()
		const dateString: number = makeDateString(ms)
		const entryDict: ActivityObjectType = { 
			[ms] : action,
			uid  : dateString
		}
		const uid = String(entryDict.uid)
		const timestamp = await mergeDocIfExists('activity', entryDict, uid)

		if(timestamp instanceof Error){
			throw timestamp
		}
		const stateObject: UpdateStateType = { 
			open: action === 'OPEN',
			mostRecentDay: dateString,
			mostRecentMs: ms
		} 
		const current = await updateDoc('garage', stateObject, 'status')
		if(current instanceof Error){
			throw current
		}
		return current 
	}catch(err){
		if(err instanceof Error){
			return err
		}else{
			return new Error('uncaught')
		}
	}
}
