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
	headLoading,
	setActive,
}: GarageDoorPropsType){

	const [ thisActive, setThisActive ] = useState(active)
	const [ thisOpen, setThisOpen ] = useState(open)

	const headerRef = useRef()

	useEffect(() => {
		function updateHead(){
			getNewHead({
				variables: {
					lastKnownTimeStamp: ms
				}, 
				onCompleted: ({ garageLog }) => {
					syncHead(garageLog)
					setThisActive(true)
				}
			})
		}
		active && updateHead()
	},[ active ])

	const svg = headerRef?.current?.childNodes 
		&& headerRef?.current?.childNodes[0]  
	const polygon = svg?.childNodes 
		&& svg?.childNodes[0]
	const animate = polygon?.childNodes 
		&& polygon?.childNodes[0]
	const dur = animate?.getAttribute('dur')

	useEffect(() => { 
		if(dur === typeof 'string'){
			const duration = Number(dur.replace('s','')) * 1000
			setTimeout(() => {
				setThisOpen(open)
				setActive(!active)
			}, duration)
		}
	}, [ dur ])

	return(
		<header className={styles.garageDoor} ref={headerRef}>
		{thisActive 
			? (!open ? <Closing/> : <Opening/>)
			: (!open ? <Closed/> : <Open/>)
		}
		</header>
	)
}
