import React, { useCallback, useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import Head from 'next/head'
import Entries from 'components/Entries'
import GarageDoor from 'components/GarageDoor'
import ScrollHandler from 'components/ScrollHandler'
import postRequest from 'actions/postRequest'
import styles from 'styles/Home.module.css'
import { GarageLogResponse, GarageLogProps, GarageLogType } from 'client/types'
import { 
	LAZY_GARAGE_LOG, 
	GARAGE_LOG_QUERY,
	GARAGE_STATE,
} from 'client/queries'
import { contentString } from 'fixtures/meta'
import { indexResolver } from 'server/staticPropGetter'
const initialOptions = { fetchPolicy: 'network-only' }

const Home = (props: GarageLogProps) => {
	const [ active, setActive ] = useState(false)
	const [ entries, setEntries ] = useState(props?.garageLog || [])
	const [ last, setLast ] = useState({ ms: 0, yyyymmdd: 0 })
	const [ open, setOpen ] = useState(false)
	const [ options, setOptions ] = useState(initialOptions)
	const [ pollMs, setPollMs ] = useState(500)
	const [ query, setQuery ] = useState(GARAGE_STATE)
	const [ queryVariables, setQueryVariables ] = useState({ lastUid: 1, limit: 4 })
	const [ timerId, setTimerId ] = useState(0)

	const { 
		data, 
		error, 
		loading, 
		fetchMore, 
		startPolling, 
		stopPolling,
	} = useQuery(gql`${query}`, options)

	const garageState = data?.garageState
	const lazyLoaderLogs = data?.lazyLoaderLogs
	const garageLog = data?.garageLog
	const lazyLoadConditions = lazyLoaderLogs && 
		entries.length > 0 && 
		lazyLoaderLogs.length > 0
	
	pollMs === 500 ? startPolling(500) : stopPolling()

	function scrollHandlerCallback():void{
		!loading && handleNotLoading()
		function handleNotLoading(){
			const lastEntry = entries[entries.length -1]
			setQueryVariables({
				lastUid: lastEntry.uid,
				limit: 4
			})
			setOptions({
				...options,
				variables: {
					...queryVariables, 
					lastUid: lastEntry.uid,
					limit: 4
				}
			})
			setQuery(LAZY_GARAGE_LOG)
		}
	}

	useEffect(() => {
		if(last.ms !== 0){
			!active && syncHead() 
		}
		function syncHead(){
			const { ms, yyyymmdd } = last;
			const [ { uid, entries: firstDayEntries }] = entries
			const [ { timestamp, action } ] = firstDayEntries
			if(ms !== timestamp){
				const variables = {
					lastKnownTimeStamp: ms
				}
				//setOptions({ ...options, variables })
				//setQuery(GARAGE_LOG)
				console.log('READY TO ROCK')
			}
		}
	}, [ active ])

	useEffect(() => {
		active ? toggleActive() : resetPolling() 
	}, [ active ])

	useEffect(() => {
		garageState && newActivityHandler()
	},  [ garageState, open ])

	useEffect(() => {
		lazyLoadConditions && lazyLoad()
	}, [ lazyLoadConditions ])

	const updateHead = useCallback(() => {
		setQueryVariables({lastKnownTimeStamp: last.ms})
		setQuery(GARAGE_LOG_QUERY)
	}, [ entries, last ])

	const lazyLoad = useCallback(() => {
		const firstLazyUid = lazyLoaderLogs[0]?.uid
		const found = entries.find(e => e?.uid === firstLazyUid)
		!found && setEntries([...entries, ...lazyLoaderLogs])
		setQuery(GARAGE_STATE)
		setOptions(initialOptions)
	}, [ entries, lazyLoaderLogs ])


	const toggleActive = useCallback(() => {
		pollMs === 500 && clearActive()
		async function clearActive(){
			setPollMs(500*100)
			const uniqueTimer = await setTimeout(() => {
				setActive(false)
			}, 1000 * 12)
			setTimerId(0)
		}
	}, [ active, pollMs ]) 

	const newActivityHandler = useCallback(() => {
		open !== garageState.open && updateAccordingly()
		function updateAccordingly(){
			setActive(true)
			setOpen(garageState.open)
			setLast({ 
				ms: garageState.mostRecentMs, 
				yyyymmdd: garageState.mostRecentDay 
			})
		}
	}, [ garageState, open ])

	const resetPolling = useCallback(() => {
		pollMs !== 500 && pollResetter()
		function pollResetter(){
			setPollMs(500) 
		}
	}, [ pollMs ])


	ScrollHandler(scrollHandlerCallback)

	return (
		<div className={styles.container}>
			<Head>
				<title>Garage Door Live</title>
				<meta name="description" content={contentString} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<GarageDoor 
					active={active}
					last={last}
					open={open}
					setLast={setLast}
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
