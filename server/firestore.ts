import admin from 'firebase-admin'
import { QueryType } from './types/firestore'

if (!admin.apps.length) {
	const privateKey = (privateKey: string): string => {
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
	const firebaseCreds: object = { 
		type: process.env.FIREBASE_TYPE,
		project_id: process.env.FIREBASE_PROJECT_ID,
		private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
		private_key: privateKey(process.env.FIREBASE_PRIVATE_KEY),
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
export const getCollection = async(collectionName: string, queryArray?: QueryArray[]):Promise<object> => {
	let collectionReference = db.collection(collectionName)
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
	return collectionReference.get()
	.then(querySnapshot => {
		return Promise.all(querySnapshot.docs
			.map(e => ({...e.data(), uid: e.id}))
		)
	})
	.catch(err => {
		console.log(err, 65)
		return err
	})
}
