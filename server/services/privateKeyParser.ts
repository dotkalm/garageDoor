export default function privateKeyParser(privateKey: string): string{
	const a = privateKey.split("\\n");
	const stringKey: string[] = [''];
	for (let i = 0; i < a.length; i++) {
		if (i === 0) {
			stringKey[0] = a[0].replace('\\', "")
		} else if (i === a.length - 1) {
			break;
		} else { 
			stringKey.push(a[i].replace('\\', ""))
		}
	}
	return stringKey.join('\n').replace(/^"/,'').replace(/"$/,'')
}

