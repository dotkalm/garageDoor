export default function animationCheck(headerRef){
	const svg = headerRef?.current?.childNodes 
		&& headerRef?.current?.childNodes[0]  
	const polygon = svg?.childNodes 
		&& svg?.childNodes[0]
	const animate = polygon?.childNodes 
		&& polygon?.childNodes[0]
	const dur = animate?.getAttribute('dur')
	return typeof dur === 'string' 
		&& Number(dur.replace('s','')) * 1000
}
