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
		console.log(entries, ms)
	}, [ ms, entries, syncHead, getNewHead ])
}
