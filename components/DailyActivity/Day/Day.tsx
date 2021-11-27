import isTodayOrYesterdayOtherwise from '/actions/isTodayOrYesterdayOtherwise'
import { DayProps } from '/client/types'
import DayEntry from '../DayEntry'

export default function Day({day: {uid, entries}, index}: DayProps){
	const [ { timestamp } ] = entries
	const dayLabel = isTodayOrYesterdayOtherwise(timestamp)
	return <DayEntry entries={entries} dayLabel={dayLabel}/>
}
