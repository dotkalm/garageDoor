import admin from 'firebase-admin'
if (!admin.apps.length) {
	const privateKey = () => {
		const a = process.env.FIREBASE_PRIVATE_KEY.split("\\n");
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
	const token = process.env.FIREBASE_TOKEN
	const jsonObject = JSON.parse(process.env.FIREBASE_CONFIG)
	jsonObject.type = process.env.FIREBASE_TYPE
	jsonObject.project_id = process.env.FIREBASE_PROJECT_ID
	jsonObject.private_key_id = process.env.FIREBASE_PRIVATE_KEY_ID
	jsonObject.private_key = privateKey()
	jsonObject.client_email = process.env.FIREBASE_CLIENT_EMAIL
	jsonObject.client_id = process.env.FIREBASE_CLIENT_ID
	admin.initializeApp({
		credential: admin.credential.cert(jsonObject)
	})
}else{
	admin.app()
}
const db = admin.firestore()

export const getDoc = async (collectionName, docUid) => {
	return db.collection(collectionName).doc(docUid)
	.get()
	.then(doc => {
		if(doc.exists){
			return {...doc.data(), uid: doc.id}
		}else{
			return 'not here'
		}
	})
}
export const addDoc = async (collectionName, obj) => {
	return db.collection(collectionName).add(obj)
	.then(doc => doc.id)
	.catch(err => err)
}
export const setDoc = async (collectionName, obj, uid) => {
	return db.collection(collectionName).doc(uid).set(obj)
	.then(() => 'success')
	.catch(err => err)
}
export const getCollection = async (collectionName, queryArray)  => {
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
export const updateDoc = async (collectionName, obj, uid) => {
	return db.collection(collectionName).doc(uid).update(obj)
	.then(() => 'success')
	.catch(err => err)
}
export const deleteField = async (uid, fields, collectionName) => {
	const obj = {}
	for(let i = 0; i < fields.length; i++){
		obj[fields[i]] = admin.firestore.FieldValue.delete()
	}
	return db.collection(collectionName).doc(uid).update(obj)
	.then(() => 'success')
	.catch(err => err)
}
export const deleteDoc = async (collectionName, uid) => {
	return db.collection(collectionName).doc(uid).delete()
	.then(() => 'success')
	.catch(err => err)
}
export const mergeDocIfExists = async (collectionName, obj, uid) => {
	return db.collection(collectionName).doc(uid).set(obj, {merge: true})
	.then(() => 'success')
	.catch(err => {
		console.log(obj, collectionName, uid, err)
		return err
	})
}

