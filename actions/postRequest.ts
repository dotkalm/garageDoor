export default async function postRequest(url: string, body: string, variables: object){
	try{
		let json = JSON.stringify({query: body})
		if(variables){
			json = JSON.stringify({query: body, variables})
		}
		const f = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			mode: 'cors',
			cache: 'default',
			body: json
		})
		const response = await f.json()
		return response
	}catch(err){
		return err
	}
}


