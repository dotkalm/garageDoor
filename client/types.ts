export type DayProps = {
	day: GarageLogType
}
export type EntriesType = {
	timestamp: number,
	action: "OPEN" | "CLOSED"
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
