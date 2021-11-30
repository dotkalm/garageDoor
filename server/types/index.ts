import type { IncomingMessage, ServerResponse } from 'http';
export type Request = IncomingMessage & { url: string };
export type Response = ServerResponse & { json?: (data: unknown) => void };
export type UpdateGarageType = 'OPEN' | 'CLOSED'
export type UpdateStateType = { 
	open: boolean
}
export type ActivityObjectType = {
	[time: number]: string 
	uid: number
} 
