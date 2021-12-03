import React, { useRef, useEffect, useState } from 'react'
import { useLazyQuery, NetworkStatus } from '@apollo/client';
import { GARAGE_LOG_QUERY } from 'client/queries'

export default function LoggerHead(callback, last, entries){

	const [ getNewHead , { loading, error, data, called, refetch }] = useLazyQuery(GARAGE_LOG_QUERY)
	const [ variables, setVariables ] = useState({ lastKnownTimeStamp: 0 })

	const savedCallback: any = useRef()


	useEffect(() => {
		savedCallback.current = callback
	}, [callback, savedCallback])

	useEffect(() => {
		function syncHead(){
			const [ { uid, entries: firstDayEntries }] = entries
			const [ { timestamp, action } ] = firstDayEntries
			if(ms !== timestamp && ms !== 0){
				return { lastKnownTimeStamp: ms }
			}else{
				return false 
			}
		}
		const newVars = syncHead()
		console.log(newVars)
		if(entries.length > 0 && newVars){
			newVars.ms !== variables.ms && setVariables(newVars) 
		}
	}, [ ms, entries])


	useEffect(() => {
		console.log(data, variables)
		variables && getNewHead({ variables })
		savedCallback.current(data)
	}, [ variables ])

}
