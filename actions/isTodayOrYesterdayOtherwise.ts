const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]

export default function isTodayOrYesterdayOtherwise(timestamp: number): string{ 
	const yesterdayAsLocalString = new Date(Date.now() - ((60 * 60) * 24) * 1000)
		.toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' })
	const todayAsLocalString = new Date(Date.now())
		.toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' })
	const entryAsLocalString = new Date(Number(timestamp))
		.toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' })
	if(todayAsLocalString === entryAsLocalString){
		return 'Today'
	}
	if(yesterdayAsLocalString === entryAsLocalString){
		return 'Yesterday'
	}
	let asLocalString = new Date(Number(timestamp)).toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' }).split('/')
	console.log(asLocalString)
	const [ month, day, year ] = asLocalString

	return `${months[month-1]} ${day}, ${year}`
}

