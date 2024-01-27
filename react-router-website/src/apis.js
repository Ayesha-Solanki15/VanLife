
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFireStore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwI2i_6y_G1IYfNHcJFdGSbtHJhSYhakg",
  authDomain: "vanlife-67bc6.firebaseapp.com",
  projectId: "vanlife-67bc6",
  storageBucket: "vanlife-67bc6.appspot.com",
  messagingSenderId: "884357510454",
  appId: "1:884357510454:web:19dbafb001278720c4af97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFireStore(app)
const vansCollectionRef = collection(db, "vans")

//Refactoring the fetching functions

export async function getVans(id) {
  const url = id ? `/api/vans/${id}` : "/api/vans"
  const res = await fetch(url)
  if (!res.ok) {
      throw {
          message: "Failed to fetch vans",
          statusText: res.statusText,
          status: res.status
      }
  }
  const data = await res.json()
  return data.vans
}

export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
  const res = await fetch(url)
  if (!res.ok) {
      throw {
          message: "Failed to fetch vans",
          statusText: res.statusText,
          status: res.status
      }
  }
  const data = await res.json()
  return data.vans
}

export async function loginUser(creds) {
  const res = await fetch("/api/login",
      { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
      throw {
          message: data.message,
          statusText: res.statusText,
          status: res.status
      }
  }

  return data
}