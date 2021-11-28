import styles from './DayEntry.module.css'
import { DayEntryProps } from 'client/types'
import ActivityCard from 'components/ActivityCard'

export default function DayEntry({entries, dayLabel}: DayEntryProps){

	const activities = entries.map(({timestamp, action}) => (
		<div className={styles.activityRow} key={timestamp}>
			<ActivityCard 
				action={action}
				key={timestamp}
				timestamp={timestamp}
			/>
		</div>
	))

	return(
		<div className={styles.day}>
			<div className={styles.label}>
				<h1>{dayLabel}</h1>
			</div>
			{activities}
		</div>
	)
}
