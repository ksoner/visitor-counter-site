# Visitor Counter Site

This project is a simple web page that guesses how many visitors came before you. It uses Firebase Realtime Database to keep a counter and Formspree to collect e‑mail addresses.

## Running the site

Open `index.html` in a browser or serve the directory with any static file server. The page will display four options asking what visitor number you think you are. After choosing an option, the page asks for your e‑mail to show the real visitor number. Once the form is submitted, the page reveals both the number you selected and the actual visitor count, followed by either **“Tebrikler, bildiniz!”** if you guessed correctly or **“Üzgünüm, bilemedin.”** otherwise.

## Firebase configuration

The Firebase keys included in `script.js` are intended for public client use. Make sure to restrict their usage in the Firebase console (e.g. domain restrictions) to prevent abuse.

## Collecting e‑mails

Form submissions are sent to Formspree. Replace the `action` attribute of the form with your own Formspree endpoint if needed.
