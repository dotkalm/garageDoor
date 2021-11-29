import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import styles from './GarageDoor.module.css'
import { GARAGE_STATE } from 'client/queries'
import { Open, Closed, Closing, Opening } from './State'


export default function GarageDoor({garageState}){
	const [ open, setOpen ] = useState(false)
	const [ active, setActive ] = useState(false)
	const response = useQuery<{limit: number}>(gql`${GARAGE_STATE}`, {
		fetchPolicy: 'network-only',
	})
	const { 
		data, 
		error, 
		loading, 
		previousData,
		refetch, 
		startPolling, 
	} = response
	useEffect(() => {
		if(data?.garageState){
			const { garageState } = data
			if(previousData){
				if(previousData.garageState.open !== garageState.open){
					setOpen(garageState.open)
					setActive(true)
					setTimeout(() => setActive(false), 1000 * 12)
				}
			}else{
				if(garageState.open !== open){
					setOpen(garageState.open)
				}
			}
		}
	}, [ data, previousData, loading ])
	console.log(response, open)
	startPolling(500)
	return(
		<div className={styles.garageDoor}>
		{!active ? 
			(!open ? <Closed/> : <Open/>) :
			(!open ? <Closing/> : <Opening/>) 
		}
		</div>
	)
}
