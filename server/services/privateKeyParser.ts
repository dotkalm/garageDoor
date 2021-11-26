export default function privateKeyParser(privateKey: string): string{
	const a = privateKey.split("\\n");
	let string = [];
	for (let i = 0; i < a.length; i++) {
		if (i === 0) {
			string = [ a[0].replace('\\', "") ]
		} else if (i === a[a.length] - 1) {
			break;
		} else {
			string.push(a[i].replace('\\', ""))
		}
	}
	return string.join('\n').replace(/^"/,'').replace(/"$/,'')
}

