// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	getFirestore,
	updateDoc
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCE5_rHD2WSqkJEcS4meUl8G9wOIIEZxBU',
  authDomain: 'sankey-d7182.firebaseapp.com',
  projectId: 'sankey-d7182',
  storageBucket: 'sankey-d7182.appspot.com',
  messagingSenderId: '382965835236',
  appId: '1:382965835236:web:4d2a80244fe544a2b153f1',
  measurementId: 'G-SSSHEPD0Z3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore();

export async function addUser() {
  // Add a second document with a generated ID.

  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name: 'Test',
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function addItemForUser(isIncome = false, userId) {
  try {
    const docRef = doc(db, 'users', userId);
    const keyToUpdate = isIncome ? 'income' : 'outgoings';
    await updateDoc(docRef, {
      outgoings: arrayUnion({ title: 'example', amount: 200 }),
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function getUsers() {}
