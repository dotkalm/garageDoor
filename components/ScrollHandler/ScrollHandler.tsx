import React, { useEffect, useRef } from 'react'

export default function ScrollHandler(
	callback: () => void, 
){
	const savedCallback: any = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback, savedCallback])

	useEffect(() => {
		function getUiSizes(){
			const clientHeight = window.document?.body?.clientHeight || 0
			const innerHeight = window.innerHeight || 0
			const yOffset = window.pageYOffset || 0
			const totalHeight = clientHeight - innerHeight
			const gap = totalHeight - yOffset
			return { gap, totalHeight, yOffset, innerHeight, clientHeight }
		}
		function scrollHandler(){
			const { 
				clientHeight,
				gap, 
				innerHeight, 
				totalHeight, 
				yOffset, 
			} = getUiSizes()
			if(gap < innerHeight){
				const sizes = getUiSizes()
				savedCallback.current()
			}
		}
		if(window){
			scrollHandler()
			window.addEventListener('scroll', scrollHandler);
			return () => {
				window.removeEventListener('scroll', scrollHandler);
      };
		}
	})
}
