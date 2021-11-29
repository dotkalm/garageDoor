import admin from 'firebase-admin'
import { 
	CollectionType, 
	DocumentReference,
	DocumentSnapshot, 
	ElapsedTime,
	QueryType, 
} from './types/firestore'
import parseElapsedTime from 'actions/parseElapsedTime'
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
export async function getDocument(collectionName: string, documentName: string){
	try{
		const doc: DocumentSnapshot = await db.collection(collectionName).doc(documentName).get()
		if(!doc.exists || doc === undefined){
			throw new Error('does not exist')
		}
		if(!doc.updateTime){
			throw new Error('updatedTime does not exist')
		}
		const lastUpdated = doc.updateTime.seconds
		const data = doc.data()
		if(data === undefined){
			throw new Error('data is undefined')
		}
		data.lastUpdated = lastUpdated
		data.lastUpdatedObject = parseElapsedTime(lastUpdated)
		return data 
	}catch(err){
		console.log(err)
		return err
	}
}

export async function getCollection(collectionName: string, queryArray?: QueryType[]): Promise<Array<object> | Error | undefined> {
	try{
		let collectionReference: CollectionType = db.collection(collectionName)
		if(queryArray){
			for(let i=0; i < queryArray.length; i++){
				const { field, opperator, value, orderBy, limit } = queryArray[i]
				if(orderBy && !value && field){
					collectionReference = collectionReference.orderBy(field, orderBy)
				}else if(value === 'firestoreDocumentId' && orderBy){
					const docSort = admin.firestore.FieldPath.documentId()
					collectionReference = collectionReference.orderBy(docSort, orderBy)
				}else if(limit && typeof value === 'number'){
					collectionReference = collectionReference.limit(value)
				}else if((field === 'firestoreDocumentId') && opperator){
					const f = admin.firestore.FieldPath.documentId() 
					collectionReference = collectionReference.where(f, opperator, value)
				}else if(field && opperator && value){
					collectionReference = collectionReference.where(field, opperator, value)
				}else{
					throw new Error('conditions not met')
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
