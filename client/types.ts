import type { DocumentNode } from '@apollo/client'
export type DayProps = {
	day: GarageLogType,
	index: number
}
export type LastType = {
	ms: number 
	yyyymmdd: number
}
export type GetNewHeadArgs = {
	variables: {
		lastKnownTimeStamp: number 
	},
	onCompleted: (g: GarageLogResponse) => void
}

export type SyncHeadType = (e: GarageLogType[]) => void

export type GetNewHeadType = (options: GetNewHeadArgs) => void

export type GarageDoorPropsType = {
	active: boolean
	getNewHead: GetNewHeadType 
	ms: number
	open: boolean
	syncHead: SyncHeadType
	setActive: (x: boolean) => void 
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
