import React, { useEffect, useState, useRef } from 'react'
import { useQuery, gql } from '@apollo/client'
import styles from './GarageDoor.module.css'
import { GARAGE_STATE } from 'client/queries'
import { Open, Closed, Closing, Opening } from './State'
import type { GarageDoorPropsType } from 'client/types'
import animationCheck from 'actions/animationCheck'

export default function GarageDoor({ 
	active, 
	getNewHead,
	ms, 
	open, 
	syncHead, 
	headLoading: loading,
	setActive,
}: GarageDoorPropsType){

	const [ 
		{ 
			active: thisActive, 
			open: thisOpen
		}, 
		setState ] = useState({ active, open })

	const headerRef = useRef()

	useEffect(() => {
		function updateHead(){
			getNewHead({
				variables: {
					lastKnownTimeStamp: ms
				}, 
				onCompleted: ({ garageLog }) => {
					syncHead(garageLog)
					setState({ open, active })
				}
			})
		}
		active && updateHead()
	},[ active, open, thisOpen, ms ])

	// console.log({open, thisOpen, active, thisActive})

	const now = Date.now().valueOf()
	useEffect(() => {
		if(ms > 0){
			const secondsSince = Math.round((now - ms) / 1000)
			const minutesSince = Math.round(secondsSince / 60)
			const duration = animationCheck(headerRef)
			if(secondsSince > 20 && thisOpen !== open){
				setState({ active: thisActive, open })
			}
		}
	}, [ ms, now ] )

	return(
		<header className={styles.garageDoor} ref={headerRef}>
		{thisActive
			? (!thisOpen ? <Closing/> : <Opening/>)
			: (!thisOpen ? <Closed/> : <Open/>)
		}
		</header>
	)
}
