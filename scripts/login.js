import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-_rkUvc-RxzYvRXuo7OwlqaRZ6pzKCTI",
    authDomain: "group-cafe-database.firebaseapp.com",
    projectId: "group-cafe-database",
    storageBucket: "group-cafe-database.firebasestorage.app",
    messagingSenderId: "296481585409",
    appId: "1:296481585409:web:692ca6a62bcf8d56484300"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault(); // Prevents page from refreshing everytime its clicked

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert("Logged in successfully as " + email + "!");
            window.location.href = "../home.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
}) 