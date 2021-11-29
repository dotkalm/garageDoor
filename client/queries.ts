export const DAILY_LOG_FRAGMENT = `fragment DailyLogFragment on DailyLogEntry {
  uid
  entries {
    timestamp
    action
  }
}`
export const GARAGE_LOG_QUERY = `query 
	getEntries($lastKnownTimeStamp :Float $limit :Float){
		garageLog(lastKnownTimeStamp: $lastKnownTimeStamp limit: $limit){
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
	}
	${DAILY_LOG_FRAGMENT}
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
    open
    lastUpdated
    lastUpdatedObject{
      seconds
      minutes
      hours
      days
    }
  }
}`
