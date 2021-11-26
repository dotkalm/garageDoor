function convertToNumber(x: string): number{
	const num = Number(x)
	if(Number.isNaN(num)){
		return 0 
	}
	return num
}
export default function makeDateString(ms: number): number{
	const dateRef = !ms ? new Date(Date.now()) : new Date(ms)
	const toLocalString = dateRef.toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' })
	let [ m, d, y ] = toLocalString.split('/')
	const month = Number(m)
	const day = Number(d)
	const year = Number(y)
	const arr = [ year, month < 10 ? `0${month}` : month, day < 10 ? `0${day}` : day ]
	return Number(arr.join(''))
}

