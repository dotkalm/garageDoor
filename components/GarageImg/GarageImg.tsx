import Image from 'next/image'
import style from './GarageImg.module.css'
import { EntriesType } from '../../client/types'

export default function GarageImg({ action }){
	const dim = '6'
	return action === 'OPEN' ? (
		<div className={`${style.outside} ${style.open}`}>
			<Image 
				alt="open" 
				height={dim}
				src="/garageOpen.svg"
				width={dim} 
				layout='responsive'
			/>
		</div>
	) : (
		<div className={`${style.outside} ${style.closed}`}>
			<Image 
				alt="closed" 
				height={dim}
				src="/garageClosed.svg"
				width={dim} 
			/>
		</div>
	)
}
