import type { NextPage } from 'next'
import Head from 'next/head'
import postRequest from '../actions/postRequest'
import styles from '../styles/Home.module.css'
import { GARAGE_LOG_QUERY_TO_LIMIT, GARAGE_LOG_QUERY } from '../client/queries'
import { GarageLogResponse, GarageLogProps } from '../client/types'
import GarageDoor from '../components/GarageDoor'
import Entries from '../components/Entries'
const url = `${process.env.GRAPHQL_HOST}${process.env.GRAPHQL_API}`

const Home: NextPage = ({ garageLog }: GarageLogProps) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Garage Door dot Live</title>
				<meta name="description" content="garage door, open, close, log, art, surveillance" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<GarageDoor/>
				<Entries garageLog={garageLog}/>
			</main>
		</div>
	)
}
export async function getStaticProps(){
	const variables = { "limit": 3 } 
	const response = await postRequest(url, GARAGE_LOG_QUERY_TO_LIMIT, variables)
	if(response.errors){
		return { 
			props: { 
				garageLog: [],
				errors: response.errors
			}
		}
	}
	const data: GarageLogResponse = response.data 
	return {
		props: {
			garageLog: data.garageLog
		}
	}
}
export default Home
