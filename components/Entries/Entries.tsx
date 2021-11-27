import DailyActivity from '../DailyActivity'
import styles from './Entries.module.css'
import { GarageLogProps } from '../client/types'

export default function Entries({ garageLog }: GarageLogProps){
	const dayMap = garageLog.map((day, index) => <DailyActivity day={day} index={index} key={day.uid}/>)
	return(
		<div className={styles.entries}>
			{dayMap}
		</div>
	)
}
