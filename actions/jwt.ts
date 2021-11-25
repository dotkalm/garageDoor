import { getSearchKey } from './jsonParsers'

export function jwtDecodeExp(jwt: string): number{
	return getSearchKey<number>(jwt, 'exp', 1000) 
}
