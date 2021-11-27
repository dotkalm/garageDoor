import styles from './DayEntry.module.css'
import { DayEntryProps } from '../../client/types'
import Activity from '../Activity'

export default function DayEntry({entries, dayLabel}: DayEntryProps){
	const activities = entries.map(({timestamp, action}) => <Activity 
		action={action}
		key={timestamp}
		timestamp={timestamp}
	/>)
	return(
		<div className={styles.day}>
			{dayLabel}
		</div>
	)
}
