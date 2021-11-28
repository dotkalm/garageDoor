import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import styles from './GarageDoor.module.css'
import { GARAGE_LOG_QUERY_TO_LIMIT } from 'client/queries'
import { Open, Closed } from './State'


export default function GarageDoor(){
	const response = useQuery<{limit: number}>(gql`${GARAGE_LOG_QUERY_TO_LIMIT}`, {
	fetchPolicy: 'network-only',
	variables: { "limit": 3 } 
})
	const { data, loading, error, refetch } = response
	return(
		<div className={styles.garageDoor}>
			<Closed/>
		</div>
	)
}
