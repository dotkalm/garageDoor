import type { EntriesType } from '../../client/types'
import style from './Activity.module.css'

export default function Activity({ action, timestamp }:EntriesType){
	return(
		<div className={style.activity}>
			{action}
		</div>
	)
}
