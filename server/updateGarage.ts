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
		const actions: ActivityObjectType = { 
			[ms] : action,
			uid  : dateString
		}
		const uid = String(actions.uid)
		const timestamp = await mergeDocIfExists('activity', actions, uid)

		if(timestamp instanceof Error){
			throw timestamp
		}
		const updateactions: UpdateStateType = { 
			open: action === 'OPEN'
		} 
		const current = await updateDoc('garage', updateactions, 'status')
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
