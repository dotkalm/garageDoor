import style from './TimeColumn.module.css'
import { EntriesType } from 'client/types'

export default function TimeColumn({timestamp}: Pick<EntriesType, 'timestamp'>){
	const time = new Date(Number(timestamp))
		.toLocaleTimeString()
		.replace(/:\d\d /,' ')
	return(
		<div className={style.timeColumn}>
			{time}
		</div>
	)
}
