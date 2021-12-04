
export default function animationCheck(svg: HTMLElement): false | number{
	const polygon = svg?.childNodes 
		&& svg?.children[0]
	const animate = polygon?.childNodes 
		&& polygon?.children[0]
	const dur = animate?.getAttribute('dur')
	return typeof dur === 'string' 
		&& Number(dur.replace('s','')) * 1000
}
