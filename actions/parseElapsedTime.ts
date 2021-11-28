import type { ElapsedTime } from 'server/types/firestore'
export default function parseElapsedTime(lastUpdated: number):ElapsedTime{
	const elapsedTime = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	}
	const secondsNow =  Math.round(new Date().getTime() / 1000)
	const secondsSince = secondsNow - lastUpdated
	const minutes = Math.floor(secondsSince / 60)
	const seconds = secondsSince % 60
	elapsedTime.seconds = seconds
	if(minutes >= 60){
		elapsedTime.minutes = minutes % 60
		const hours = Math.floor(minutes / 60)
		if(hours >= 24){
			elapsedTime.hours = hours % 24
			elapsedTime.days = hours / 24 
		}else{
			elapsedTime.hours = hours
		}
	}else{
		elapsedTime.minutes = minutes
	}
	return elapsedTime
}
