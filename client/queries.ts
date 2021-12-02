import { gql } from '@apollo/client'
export const GARAGE_STATE_FRAGMENT = gql`fragment GarageStateFragment on GarageState {
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
export const DAILY_LOG_FRAGMENT = gql`fragment DailyLogFragment on DailyLogEntry {
  uid
  entries {
    timestamp
    action
  }
}`
export const GARAGE_LOG_QUERY = gql`query 
	getEntries($lastKnownTimeStamp :Float){
		garageLog(lastKnownTimeStamp: $lastKnownTimeStamp){
			...DailyLogFragment
		}
	}
	${DAILY_LOG_FRAGMENT}
`
export const LAZY_GARAGE_LOG = gql`query 
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
export const GARAGE_LOG_QUERY_TO_LIMIT = gql`query 
	getEntries($limit: Float){
		garageLog(limit: $limit){
			...DailyLogFragment
		}
	}
	${DAILY_LOG_FRAGMENT}
`
export const GARAGE_STATE = gql`{
	garageState{
		...GarageStateFragment
	}
}
${GARAGE_STATE_FRAGMENT}
`
