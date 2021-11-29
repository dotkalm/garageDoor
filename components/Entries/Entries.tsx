import MDSpinner from "react-md-spinner"
import DailyActivity from '../DailyActivity'
import styles from './Entries.module.css'
import { GarageLogProps } from 'client/types'

export default function Entries({ garageLog, loading }: GarageLogProps){
	const dayMap = garageLog.map((day, index) => <DailyActivity day={day} index={index} key={day.uid}/>)
	return(
		<div className={styles.entries}>
			{dayMap}
			{loading && 
				<div className={styles.spinner}>
					<MDSpinner
						borderColor={'black'}
						borderSize={10}
						color1={'#8ede97'}
						color2={'lightblue'}
						color3={'#8ede97'}
						color4={'lightblue'}
						size={99}
					/>
				</div>
			}
		</div>
	)
}
