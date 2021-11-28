import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import styles from './GarageDoor.module.css'
import { GARAGE_LOG_QUERY_TO_LIMIT } from 'client/queries'
import { Open, Closed } from './State'

const options = {
	fetchPolicy: 'network-only',
	variables: { "limit": 3 } 
}

export default function GarageDoor(){
	const response = useQuery<{limit: number}>(gql`${GARAGE_LOG_QUERY_TO_LIMIT}`, options)
	const { data, loading, error, refetch } = response
	return(
		<div className={styles.garageDoor}>
			<Closed/>
		</div>
	)
}
