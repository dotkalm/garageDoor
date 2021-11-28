import admin from 'firebase-admin'
import { QueryType, CollectionType, DocumentReference } from './types/firestore'
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

export async function getDocumentSnapshot(collectionName: string, documentName: string){
	try{
		const observer = doc.onSnapshot(docSnapshot => {
			console.log(`Received doc snapshot: ${docSnapshot}`);
		}, err => {
			console.log(`Encountered error: ${err}`);
		});
	}catch(err){
	}
}

export async function getDocument(collectionName: string, documentName: string){
	try{
		const doc: DocumentReference = await db.collection(collectionName).doc(documentName).get()
		const lastUpdated = doc._updateTime
		return { ...doc.data(), lastUpdated }
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
