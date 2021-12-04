export default function animationCheck(({current: HTMLElement}): number{
	if(current){
		const svg = current?.children
			&& current?.children[0]
		const polygon = svg?.childNodes 
			&& svg?.children[0]
		const animate = polygon?.childNodes 
			&& polygon?.children[0]
		const dur = animate?.getAttribute('dur')
		return typeof dur === 'string' 
			? Number(dur.replace('s','')) * 1000
			: 0
	}
	return 0
}
