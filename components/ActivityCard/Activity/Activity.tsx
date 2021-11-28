import type { EntriesType } from 'client/types'
import styles from './Activity.module.css'
import GarageImg from '../GarageImg'
import ActivityColumn from '../ActivityColumn'
import TimeColumn from '../TimeColumn'

export default function Activity({ action, timestamp }:EntriesType){
	return(
		<div className={styles.activity}>
			<GarageImg action={action}/>
			<ActivityColumn action={action} /> 
			<TimeColumn timestamp={timestamp} />
		</div>
	)
}
