import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import styles from './GarageDoor.module.css'
import { GARAGE_STATE } from 'client/queries'
import { Open, Closed, Closing, Opening } from './State'
import type { GarageStateType, GarageDoorPropsType } from 'client/types'

export default function GarageDoor({ 
	active, 
	getNewHead,
	ms, 
	open, 
	syncHead, 
	headLoading,
	toggleActive,
}: GarageDoorPropsType){
	const [ thisActive, setThisActive ] = useState(active)
	const [ thisOpen, setThisOpen ] = useState(open)

	useEffect(() => {
		function updateHead(){
			getNewHead({
				variables: {
					lastKnownTimeStamp: ms
				}, 
				onCompleted: ({ garageLog }) => {
					syncHead(garageLog)
					toggleActive(!active)
				}
			})
		}
		active && updateHead()
	},[ active ])

	return(
		<header className={styles.garageDoor}>
		{!active ? 
			(!open ? <Closed/> : <Open/>) :
			(!open ? <Closing/> : <Opening/>) 
		}
		</header>
	)
}
