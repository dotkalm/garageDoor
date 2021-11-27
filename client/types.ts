export type DayProps = {
	day: GarageLogType,
	index: number
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
}
