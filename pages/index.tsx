import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import Head from 'next/head'
import postRequest from 'actions/postRequest'
import styles from 'styles/Home.module.css'
import { LAZY_GARAGE_LOG, GARAGE_LOG_QUERY } from 'client/queries'
import { GarageLogResponse, GarageLogProps, GarageLogType } from 'client/types'
import GarageDoor from 'components/GarageDoor'
import Entries from 'components/Entries'
import { indexResolver } from 'server/staticPropGetter'


const Home = (props: GarageLogProps) => {
	const [ entries, setEntries ] = useState(props?.garageLog || [])
	const [ queryVariables, setQueryVariables ] = useState({
		lastUid: 1, limit: 4
	})
	const [ lastUpdated, setLastUpdated ] = useState(0)
	const response = useQuery(gql`${LAZY_GARAGE_LOG}`, {
		fetchPolicy: 'network-only',
		variables: queryVariables
	})
	const { data, error, loading, fetchMore } = response
	const mostRecentActivity = useQuery(gql`${GARAGE_LOG_QUERY}`, {
		fetchPolicy: 'network-only',
		variables: { 
			lastKnownTimeStamp: Math.floor(lastUpdated * 1000),
		}
	})
	useEffect(() => {
		function previousStatesMatch(one: GarageLogType, two: GarageLogType): boolean {
			const current = one.entries[0].timestamp
			const previous = two.entries[0].timestamp
			return current === previous
		}
		if(!mostRecentActivity.loading && mostRecentActivity.data){
			const { garageLog } = mostRecentActivity.data
			const copiedEntries = [...entries]
			const previousFirst = copiedEntries.shift()
			const currentFirst = garageLog[0]
			if(previousFirst !== undefined && currentFirst !== undefined){
				const diff: boolean = previousStatesMatch(previousFirst, currentFirst)
				if(!diff){
					setEntries([...garageLog, ...copiedEntries])
				}
			}
		}
	},[ entries, mostRecentActivity ])

	useEffect(() => {
		if(data?.lazyLoaderLogs && entries.length > 0){
			const { lazyLoaderLogs } = data
			if(lazyLoaderLogs.length > 0){
				const firstUid = lazyLoaderLogs[0]?.uid
				const found = entries.find(e => e?.uid === firstUid)
				if(!found){
					setEntries([...entries, ...lazyLoaderLogs])
				}
			}
		}
	}, [ data, entries ])

	useEffect(() => {
		function getUiSizes(){
			const clientHeight = window.document?.body?.clientHeight || 0
			const innerHeight = window.innerHeight || 0
			const yOffset = window.pageYOffset || 0
			const totalHeight = clientHeight - innerHeight
			const gap = totalHeight - yOffset
			return { gap, totalHeight, yOffset, innerHeight, clientHeight }
		}
		function scrollHandler(){
			const { 
				clientHeight,
				gap, 
				innerHeight, 
				totalHeight, 
				yOffset, 
			} = getUiSizes()
			if(gap < innerHeight){
				const uid = entries[entries.length -1]?.uid  || 10
				setQueryVariables({
					lastUid: uid,
					limit: 4,
				})
				fetchMore({
					variables: queryVariables,
				}).then(() => getUiSizes())
			}
		}
		if(window){
			scrollHandler()
			window.addEventListener('scroll', scrollHandler);
			return () => {
				window.removeEventListener('scroll', scrollHandler);
      };
		}
	}, [ entries, queryVariables, fetchMore ])
	

	return (
		<div className={styles.container}>
			<Head>
				<title>Garage Door Live</title>
				<meta name="description" content="garage door, open, close, log, art, surveillance" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<GarageDoor 
					lastUpdated={lastUpdated} 
					setLastUpdated={setLastUpdated}
				/>
				<Entries garageLog={entries} loading={loading}/>
			</main>
		</div>
	)
}
export async function getStaticProps(){
	const garageLog = await indexResolver()
	if(!garageLog){
		return { props: { garageLog: [] } }
	}
	return { props: { garageLog } }
}
export default Home
