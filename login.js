// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
      
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK_LFO6-h3MUAfMeIvFJS6CuG3Z5Xwgto",
  authDomain: "aasha-b953c.firebaseapp.com",
  projectId: "aasha-b953c",
  storageBucket: "aasha-b953c.appspot.com",
  messagingSenderId: "434505995830",
  appId: "1:434505995830:web:422186e79d4d4f5452aa97",
  measurementId: "G-HJCSS71TTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const loginText = document.querySelector(".title-text .login");
const loginFormi = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

signupBtn.onclick = (()=>{
loginFormi.style.marginLeft = "-50%";
loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
loginFormi.style.marginLeft = "0%";
loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
signupBtn.click();
return false;
});

// Your Firebase authentication code
const auth = getAuth();

// Signup
const signupForm = document.querySelector("form.signup");
signupForm.addEventListener("submit", (event) => {
event.preventDefault();
const email = signupForm.elements.email.value;
const password = signupForm.elements.password.value;

createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
// Signed up successfully
const user = userCredential.user;
console.log('Signed up:', user);
alert("SignedUp successfully");
})
.catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
console.error('Signup error:', errorCode, errorMessage);
alert(errorMessage);
});
});

// Login
const loginForm = document.querySelector("form.login");
loginForm.addEventListener("submit", (event) => {
event.preventDefault();
const email = loginForm.elements.email.value;
const password = loginForm.elements.password.value;

signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
// Signed in successfully
const user = userCredential.user;
console.log('Signed in:', user);
alert("loggedIn successfully");
window.location.href = 'index.html';
})
.catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
console.error('Login error:', errorCode, errorMessage);
alert("invalid-login-credentials");
});
});
document.getElementById('loginForm').addEventListener('submit', function(event) {
event.preventDefault();
// Redirect to index.html

});