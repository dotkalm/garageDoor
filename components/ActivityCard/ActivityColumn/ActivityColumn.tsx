import style from './ActivityColumn.module.css'
import { EntriesType } from '/client/types'


export default function ActivityColumn({ action }: Pick<EntriesType, 'action'>){
	return (
		<div className={style.activityColumn}>
			<div className={style.garageText}>
				Garage Door
			</div> 
			<div className={style.openOrClosedText}>
				{action.toLowerCase()}
			</div> 
		</div>
	)
}
