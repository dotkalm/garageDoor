import React, { useEffect, useState } from 'react'
import { 
	GarageLogType,
	GetNewHeadType,
	SyncHeadType,
}from 'client/types'

export default function HeadFetcher(
	entries: GarageLogType[],
	getNewHead: GetNewHeadType,
	ms: number,
	syncHead: SyncHeadType,
){
	useEffect(() => {
		const [ { uid, entries: mostRecent } ] = entries
		const [ { timestamp } ] = mostRecent
		if(ms > 0 && timestamp !== ms){
			getNewHead({
				variables: {
					lastKnownTimeStamp: timestamp 
				}, 
				onCompleted: ({ garageLog }) => {
					syncHead(garageLog)
				}
			})

		}
	}, [ ms, entries, syncHead, getNewHead ])
}
