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


function generateOptions(correct) {
  const options = new Set([correct]);
  while (options.size < 4) {
    const offset = Math.floor(Math.random() * 20) - 10;
    const guess = Math.max(1, correct + offset);
    options.add(guess);
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
}

function setupPage(visitorNumber) {
  const optionsDiv = document.getElementById('options');
  const emailForm = document.getElementById('emailForm');
  const realAnswerInput = document.getElementById('realAnswer');
  const userGuessInput = document.getElementById('userGuess');
  const resultDiv = document.getElementById('result');
  const form = document.getElementById('form');

  let selectedGuess = null;

  const options = generateOptions(visitorNumber);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => {
      realAnswerInput.value = visitorNumber;
      userGuessInput.value = opt;
      selectedGuess = opt;
      emailForm.classList.remove('hidden');
      optionsDiv.classList.add('hidden');
    };
    optionsDiv.appendChild(btn);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    try {
      await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
    } catch (err) {
      console.error('Form submission failed:', err);
    }
    emailForm.classList.add('hidden');
    const success = selectedGuess === visitorNumber;
    const message = success ? 'Tebrikler, bildiniz!' : 'Üzgünüm, bilemedin.';
    resultDiv.textContent = `Gerçek ziyaretçi numarası: ${visitorNumber}. Senin tahminin: ${selectedGuess}. ${message}`;
    resultDiv.classList.remove('hidden');
  });
}

// Sayaç başlat
initCounter().then(setupPage);

