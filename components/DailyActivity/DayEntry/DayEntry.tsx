import styles from './DayEntry.module.css'
import { DayEntryProps } from '/client/types'
import ActivityCard from '../../ActivityCard'

export default function DayEntry({entries, dayLabel}: DayEntryProps){

	const activities = entries.map(({timestamp, action}) => <ActivityCard 
		action={action}
		key={timestamp}
		timestamp={timestamp}
	/>)

	return(
		<div className={styles.day}>
			<div className={styles.label}>
				{dayLabel}
			</div>
			{activities}
		</div>
	)
}
