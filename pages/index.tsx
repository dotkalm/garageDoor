import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import Head from 'next/head'
import postRequest from 'actions/postRequest'
import styles from 'styles/Home.module.css'
import { 
	GARAGE_LOG_QUERY_TO_LIMIT, 
	GARAGE_STATE, 
	LAZY_GARAGE_LOG 
} from 'client/queries'
import { GarageLogResponse, GarageLogProps } from 'client/types'
import GarageDoor from 'components/GarageDoor'
import Entries from 'components/Entries'

const url = `${process.env.GRAPHQL_HOST}${process.env.GRAPHQL_API}`

const Home = (props: GarageLogProps) => {
	const [ entries, setEntries ] = useState(props?.garageLog || [])
	const [ inRange, setInRange ] = useState(false)
	const [ queryVariables, setQueryVariables ] = useState({
		lastUid: 1, limit: 4
	})
	const response = useQuery(gql`${LAZY_GARAGE_LOG}`, {
		fetchPolicy: 'network-only',
		variables: queryVariables
	})
	const { 
		data, 
		error, 
		loading, 
		previousData,
		refetch, 
		startPolling, 
		fetchMore,
	} = response
	useEffect(() => {
		if(data?.lazyLoaderLogs && entries.length > 0){
			const { lazyLoaderLogs } = data
			if(lazyLoaderLogs.length > 0){
				const firstUid = lazyLoaderLogs[0]?.uid
				const found = entries.find(e => e.uid === firstUid)
				if(!found){
					setEntries([...entries, ...lazyLoaderLogs])
				}
				console.log(found)
			}
		}

	}, [ data, entries ])
	useEffect(() => {
		function scrollHandler(){
			const clientHeight = window.document?.body?.clientHeight || 0
			const innerHeight = window.innerHeight || 0
			const yOffset = window.pageYOffset || 0
			const totalHeight = clientHeight - innerHeight
			const gap = totalHeight - yOffset
			if(gap < innerHeight && !inRange){
				const { uid } = entries[entries.length -1]
				setInRange(true)
				setQueryVariables({
					lastUid: uid,
					limit: 4,
				})
				response.fetchMore({
					variables: queryVariables,
				})
			}
		}
		if(window){
			scrollHandler()
			window.addEventListener('scroll', scrollHandler);
			return () => {
				window.removeEventListener('scroll', scrollHandler);
      };
		}
	}, [entries, inRange, queryVariables])
	return (
		<div className={styles.container}>
			<Head>
				<title>Garage Door Live</title>
				<meta name="description" content="garage door, open, close, log, art, surveillance" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<GarageDoor/>
				<Entries garageLog={entries} />
			</main>
		</div>
	)
}
export async function getStaticProps(){
	const variables = { "limit": 3 } 
	const response = await postRequest(url, GARAGE_LOG_QUERY_TO_LIMIT, variables)
	const data: GarageLogResponse = response.data 
	if(!data || response.errors){
		return { 
			props: { 
				garageLog: [],
			}
		}
	}
	return {
		props: {
			garageLog: data.garageLog
		}
	}
}
export default Home
