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
	let asLocalString = new Date(Number(timestamp)).toDateString('en-US', { timeZone: 'America/Los_Angeles' }).split(' ')
	asLocalString.splice(0,1)
	const [ month, day, year ] = asLocalString

	return `${month} ${day}, ${year}`
}

