export const GARAGE_STATE_FRAGMENT = `fragment GarageStateFragment on GarageState {
  open
  lastUpdated
  lastUpdatedObject {
    seconds
    minutes
    hours
    days
  }
  mostRecentDay
  mostRecentMs
}`
export const DAILY_LOG_FRAGMENT = `fragment DailyLogFragment on DailyLogEntry {
  uid
  entries {
    timestamp
    action
  }
}`
export const GARAGE_LOG_QUERY = `query 
	getEntries($lastKnownTimeStamp :Float){
		garageLog(lastKnownTimeStamp: $lastKnownTimeStamp){
			...DailyLogFragment
		}
	}
	${DAILY_LOG_FRAGMENT}
`
export const LAZY_GARAGE_LOG = `query 
	lazyEntries($limit: Float $lastUid: Float){
		lazyLoaderLogs(lastUid: $lastUid limit: $limit){
			...DailyLogFragment
		}
		garageState{
			...GarageStateFragment
		}
	}
	${DAILY_LOG_FRAGMENT}
	${GARAGE_STATE_FRAGMENT}
`
export const GARAGE_LOG_QUERY_TO_LIMIT = `query 
	getEntries($limit: Float){
		garageLog(limit: $limit){
			...DailyLogFragment
		}
	}
	${DAILY_LOG_FRAGMENT}
`
export const GARAGE_STATE = `{
	garageState{
		...GarageStateFragment
	}
}
${GARAGE_STATE_FRAGMENT}
`
