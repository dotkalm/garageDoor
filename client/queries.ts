export const GARAGE_LOG_QUERY = `query getEntries($lastKnownTimestamp:Float){
  garageLog(lastKnownTimeStamp: $lastKnownTimestamp){
    uid
    entries{
      timestamp
      action
    }
  }
}
