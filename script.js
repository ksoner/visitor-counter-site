import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGCHqAuGfc_zvV-aX_9pR7y194DHVQYX0",
  authDomain: "visits-5bdc4.firebaseapp.com",
  databaseURL: "https://visits-5bdc4-default-rtdb.firebaseio.com",
  projectId: "visits-5bdc4",
  storageBucket: "visits-5bdc4.appspot.com",
  messagingSenderId: "974299963849",
  appId: "1:974299963849:web:d72d79295a9fae92998818"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function getVisitorNumber() {
  const counterRef = ref(db, 'visits');
  const snapshot = await get(counterRef);
  let num = 1;
  if (snapshot.exists()) {
    num = (snapshot.val() || 0) + 1;
  }
  await set(counterRef, num);
  return num;
}

export async function initCounter() {
  try {
    const visitorNumber = await getVisitorNumber();
    return visitorNumber;
  } catch (err) {
    console.error('Firebase error:', err);
    return Math.floor(Math.random() * 1000) + 1; // fallback
  }
}
