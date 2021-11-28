import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import styles from './GarageDoor.module.css'
import { GARAGE_LOG_QUERY_TO_LIMIT } from 'client/queries'
import { Open, Closed } from './State'

export default function GarageDoor(){
	const [ apiLoading, setApiLoading ] = useState(true)
	const options = { 
		fetchPolicy: 'network-only',
		variables: { "limit": 3 } 
	}
	const response = useQuery<{limit: number}>(gql`${GARAGE_LOG_QUERY_TO_LIMIT}`, options)
	const { data, loading, error, refetch } = response
	console.log(response)
	return(
		<div className={styles.garageDoor}>
			<Closed/>
		</div>
	)
}
