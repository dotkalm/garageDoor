import type { EntriesType } from '../../client/types'
import style from './Activity.module.css'
import GarageImg from '../GarageImg'
import ActivityColumn from '../ActivityColumn'
import TimeColumn from '../TimeColumn'

export default function Activity({ action, timestamp }:EntriesType){
	return(
		<div className={style.activity}>
			<GarageImg action={action}/>
			<ActivityColumn action={action} /> 
			<TimeColumn timestamp={timestamp} />
		</div>
	)
}
