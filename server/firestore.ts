import admin from 'firebase-admin'
import { QueryType, CollectionType } from './types/firestore'
import privateKeyParser from './services/privateKeyParser'
if (!admin.apps.length) {
	const firebaseCreds: object = { 
		type: process.env.FIREBASE_TYPE,
		project_id: process.env.FIREBASE_PROJECT_ID,
		private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
		private_key: privateKeyParser(process.env.FIREBASE_PRIVATE_KEY || ''),
		client_email: process.env.FIREBASE_CLIENT_EMAIL,
		client_id: process.env.FIREBASE_CLIENT_ID,
	}
	admin.initializeApp({
		credential: admin.credential.cert(firebaseCreds)
	})
}else{
	admin.app()
}
const db = admin.firestore()

export async function getCollection(collectionName: string, queryArray?: QueryType[]): Promise<Array<object> | Error | undefined> {
	try{
		let collectionReference: CollectionType = db.collection(collectionName)
		if(queryArray){
			for(let i=0; i < queryArray.length; i++){
				const [ field, opperator, value ] = queryArray[i]
				if(field === 'orderBy'){
					let val = value
					if(value === 'firestoreDocumentId'){
						val = admin.firestore.FieldPath.documentId()
					}
					collectionReference = collectionReference.orderBy(val, opperator)
				}else if(field === 'limit' && !opperator){
					collectionReference = collectionReference.limit(value)
				}else{
					let f = field
					if(field === 'firestoreDocumentId'){
						f = admin.firestore.FieldPath.documentId() 
					}
					collectionReference = collectionReference.where(f, opperator, value)
				}
			}
		}
		const querySnapshot = await collectionReference.get()
		return Promise.all(querySnapshot.docs.map((e: {data: () => object, id: string}) => ({...e.data(), uid: e.id})))
	}catch(err){
		if(err instanceof Error){
			return err
		}
	}
}
