import React, { useEffect, useState } from 'react'
import styles from './GarageDoor.module.css'
import { Open, Closed, Closing, Opening } from './State'
import type { GarageDoorPropsType } from 'client/types'
import { duration } from 'fixtures/animation'

export default function GarageDoor({ 
	active, 
	getNewHead,
	ms, 
	open, 
	syncHead, 
	setActive,
}: GarageDoorPropsType){

	const [ 
		{ 
			active: thisActive, 
			open: thisOpen
		}, 
		setState ] = useState({ active, open })


	useEffect(() => {
		function updateHead(){
			getNewHead({
				variables: {
					lastKnownTimeStamp: ms
				}, 
				onCompleted: ({ garageLog }) => {
					syncHead(garageLog)
					setTimeout(() => setState({ open, active }), 5000)
				}
			})
		}
		active && updateHead()
	},[ active, open, thisOpen, ms, getNewHead, syncHead ])


	useEffect(() => {
		thisActive && updateState() 
		function updateState(){
			setTimeout(() => {
				setActive(false)
				setState({open, active: false}) 
			}, (duration * 1000) + 500)
		}
	}, [ thisActive, open, active, setActive ])

	useEffect(() => {
		const now = Date.now().valueOf()
		if(ms > 0){
			const secondsSince = Math.round((now - ms) / 1000)
			const minutesSince = Math.round(secondsSince / 60)
			if(secondsSince > 20 && thisOpen !== open){
				setState({ active: thisActive, open })
			}
		}
	}, [ ms, open, thisOpen, thisActive ] )

	return(
		<header className={styles.garageDoor}>
			{thisActive
				? (!thisOpen ? <Closing/> : <Opening/>)
				: (!thisOpen ? <Closed/> : <Open/>)
			}
		</header>
	)
}
