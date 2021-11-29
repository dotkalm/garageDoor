import Image from 'next/image'
import style from './GarageImg.module.css'
import { EntriesType } from 'client/types'
import isTodayOrYesterdayOtherwise from 'actions/isTodayOrYesterdayOtherwise'

export default function GarageImg({ action, timestamp }: EntriesType){
	const dim = '6'
	const isToday = isTodayOrYesterdayOtherwise(timestamp) === 'Today'
	return action === 'OPEN' ? (
		<div className={`${style.outside} ${style.open}`}>
			<Image 
				alt="open" 
				height={dim}
				layout='responsive'
				priority={isToday}
				src="/garageOpen.svg"
				width={dim} 
			/>
		</div>
	) : (
		<div className={`${style.outside} ${style.closed}`}>
			<Image 
				alt="closed" 
				height={dim}
				layout='responsive'
				priority={isToday}
				src="/garageClosed.svg"
				width={dim} 
			/>
		</div>
	)
}
