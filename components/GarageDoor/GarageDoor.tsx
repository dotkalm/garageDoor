import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import styles from './GarageDoor.module.css'
import { GARAGE_STATE } from 'client/queries'
import { Open, Closed, Closing, Opening } from './State'
import type { GarageStateType, GarageDoorPropsType } from 'client/types'

export default function GarageDoor(){
	const [ open, setOpen ] = useState(false)
	const [ active, setActive ] = useState(false)
	const response = useQuery(gql`${GARAGE_STATE}`, {
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
				}
			}else{
				if(garageState.open !== open){
					setOpen(garageState.open)
				}
			}
			const { lastUpdatedObject } = garageState
			const { seconds, minutes, hours, days } = lastUpdatedObject
			const timeArray = [ minutes, hours, days ] 
			if(timeArray.every(unit => unit === 0) && seconds > 12){
				setActive(false)
			}
		}
	}, [ active, data, previousData, loading, open ])
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
