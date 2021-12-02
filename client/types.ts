export type DayProps = {
	day: GarageLogType,
	index: number
}
export type LastType = {
	ms: number 
	yyyymmdd: number
}
export type GarageDoorPropsType = {
	active: boolean
	last: LastType 
	open: boolean
	setLast: (last: LastType) => void
}
export type EntriesType = {
	timestamp: number,
	action: "OPEN" | "CLOSED"
}
export type DayEntryProps = {
	dayLabel: string,
	entries: EntriesType[]
}
export type GarageLogType = {
	uid: number,
	entries: EntriesType[]
}
export type GarageLogResponse = {
	garageLog: GarageLogType[]
}
export type GarageLogProps = { 
	garageLog: GarageLogType[]
	loading: boolean
}
export type TimeFieldType = {
	seconds: number
	minutes: number
	hours: number
	days: number
}
export type GarageStateType = {
	open: boolean
	lastUpdated: number
	lastUpdatedObject: TimeFieldType
}
