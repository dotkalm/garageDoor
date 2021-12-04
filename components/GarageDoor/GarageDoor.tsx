import React, { useEffect, useState, useRef } from 'react'
import { useQuery, gql } from '@apollo/client'
import styles from './GarageDoor.module.css'
import { GARAGE_STATE } from 'client/queries'
import { Open, Closed, Closing, Opening } from './State'
import type { GarageDoorPropsType } from 'client/types'

export default function GarageDoor({ 
	active, 
	getNewHead,
	ms, 
	open, 
	syncHead, 
	headLoading: loading,
	setActive,
}: GarageDoorPropsType){

	const [ state, setState ] = useState({ active, open })

	const { active: thisActive, open: thisOpen } = state

	const headerRef = useRef()

	console.log({ active, thisActive, open, thisOpen, ms, loading})


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
		(open !== thisOpen && ms > 0) && updateHead()
	},[ active, open, thisOpen, ms ])

	const svg = headerRef?.current?.childNodes 
		&& headerRef?.current?.childNodes[0]  
	const polygon = svg?.childNodes 
		&& svg?.childNodes[0]
	const animate = polygon?.childNodes 
		&& polygon?.childNodes[0]
	const dur = animate?.getAttribute('dur')

	useEffect(() => { 
		if(typeof dur === 'string' && active){
			const duration = Number(dur.replace('s','')) * 1000
			setTimeout(() => {
				setActive(false)
				setState({ ...state, active: false })
			}, duration)
		}
	}, [ dur, active ])

	return(
		<header className={styles.garageDoor} ref={headerRef}>
		{thisActive
			? (!thisOpen ? <Closing/> : <Opening/>)
			: (!thisOpen ? <Closed/> : <Open/>)
		}
		</header>
	)
}
