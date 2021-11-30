import updateGarage from 'server/updateGarage'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResType = { 
	status: number
	action? : 'OPEN' | 'CLOSED'
	errors?: Error[]
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResType>){
	try{
		const { authorization } = req.headers
		const open = process.env.WEBHOOK_OPEN
		const close = process.env.WEBHOOK_CLOSE
		if(authorization === open){
			await updateGarage('OPEN')
			res.json({
				status: 200,
				action: 'OPEN'
			})
		}
		if(authorization === close){
			await updateGarage('CLOSED')
			res.json({
				status: 200,
				action: 'CLOSED'
			})
		}
		throw new Error('NOT OKAY')
	}catch(err){
		const errors = []
		if(err instanceof Error){
			errors.push(err)
		}else{
			errors.push(new Error('uncaught'))
		}
		res.json({
			status: 500,
			errors,
		})
	}
}

