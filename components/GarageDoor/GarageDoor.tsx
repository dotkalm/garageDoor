import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import styles from './GarageDoor.module.css'
import { GARAGE_STATE } from 'client/queries'
import { Open, Closed, Closing, Opening } from './State'
import type { GarageStateType, GarageDoorPropsType } from 'client/types'

export default function GarageDoor({ open, active }: GarageDoorPropsType){
	const [ thisActive, setThisActive ] = useState(active)
	const [ thisOpen, setThisOpen ] = useState(open)

	useEffect(() => {
		thisActive !== active && setTimeout(() => {
			setThisActive(active)
		}, 500)
	}, [ active, thisActive ])

	useEffect(() => {
		if(thisOpen !== open){
			setTimeout(() => setThisOpen(open), 500)
		}
	}, [open, thisOpen])

	return(
		<div className={styles.garageDoor}>
		{!thisActive ? 
			(!thisOpen ? <Closed/> : <Open/>) :
			(!thisOpen ? <Closing/> : <Opening/>) 
		}
		</div>
	)
}
