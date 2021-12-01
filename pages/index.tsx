import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import Head from 'next/head'
import Entries from 'components/Entries'
import GarageDoor from 'components/GarageDoor'
import ScrollHandler from 'components/ScrollHandler'
import postRequest from 'actions/postRequest'
import styles from 'styles/Home.module.css'
import { GarageLogResponse, GarageLogProps, GarageLogType } from 'client/types'
import { LAZY_GARAGE_LOG, GARAGE_LOG_QUERY } from 'client/queries'
import { contentString } from 'fixtures/meta'
import { indexResolver } from 'server/staticPropGetter'

const Home = (props: GarageLogProps) => {

	const [ entries, setEntries ] = useState(props?.garageLog || [])
	const [ atBottom, setAtBottom ] = useState(false)
	const [ queryVariables, setQueryVariables ] = useState({
		lastUid: 1, limit: 4
	})

	const response = useQuery(gql`${LAZY_GARAGE_LOG}`, {
		fetchPolicy: 'network-only',
		variables: queryVariables
	})

	const { data, error, loading, fetchMore } = response

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

	function scrollHandlerCallback():void{
		if(!loading){
			const lastEntry = entries[entries.length -1]
			setQueryVariables({
				lastUid: lastEntry.uid,
				limit: 4
			})
		}
	}
	ScrollHandler(scrollHandlerCallback)
	

	return (
		<div className={styles.container}>
			<Head>
				<title>Garage Door Live</title>
				<meta name="description" content={contentString} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<GarageDoor/>
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
