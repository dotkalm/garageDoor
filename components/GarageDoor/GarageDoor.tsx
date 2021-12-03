import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import styles from './GarageDoor.module.css'
import { GARAGE_STATE } from 'client/queries'
import { Open, Closed, Closing, Opening } from './State'
import type { GarageStateType, GarageDoorPropsType } from 'client/types'

export default function GarageDoor({ 
	active, 
	getNewHead
	ms, 
	open, 
	syncHead, 
}: GarageDoorPropsType){
	const [ thisActive, setThisActive ] = useState(active)
	const [ thisOpen, setThisOpen ] = useState(open)

	useEffect(() => {
		thisActive !== active && setTimeout(() => {
			setThisOpen(open)
			setThisActive(active)
			getNewHead({
				variables: {
					lastKnownTimeStamp: ms
				}, 
				onCompleted: ({ garageLog }) => {
					syncHead(garageLog)
				}
			})
		}, 500)
	}, [ active ])

	return(
		<header className={styles.garageDoor}>
			{!thisActive ? 
				(!thisOpen ? <Closed/> : <Open/>) :
				(!thisOpen ? <Closing/> : <Opening/>) 
			}
		</header>
	)
}
