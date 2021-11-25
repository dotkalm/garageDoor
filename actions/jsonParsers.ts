function isType<T>(value: T | undefined): value is T {
	return value !== undefined;
}
export function getSearchKey<T>(jsonString:string, searchKey: string, fallback: T): T{
	try{
		let title: T = fallback 
		const reviver =	(key: string, value: any) => {
			if(key === searchKey && isType<T>(value)){
				title = value
			}
			return value
		}
		const jsonObject = JSON.parse(jsonString, reviver)
		return title
	}catch(err){
		return fallback 
	}
}
