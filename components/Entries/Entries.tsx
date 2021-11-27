import Day from '../Day'
import styles from './Entries.module.css'
import { GarageLogProps } from '../client/types'

export default function Entries({ garageLog }: GarageLogProps){
	const dayMap = garageLog.map((day, index) => <Day day={day}/>)
	return(
		<div className={styles.entries}>
			log
		</div>
	)
}
