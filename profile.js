import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
  import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";
  
  // Your Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCK_LFO6-h3MUAfMeIvFJS6CuG3Z5Xwgto",
    authDomain: "aasha-b953c.firebaseapp.com",
    databaseURL: "https://aasha-b953c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "aasha-b953c",
    storageBucket: "aasha-b953c.appspot.com",
    messagingSenderId: "434505995830",
    appId: "1:434505995830:web:422186e79d4d4f5452aa97",
    measurementId: "G-HJCSS71TTV"
  };
  
   // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
  // Get a reference to the Firestore database service
  const database = getDatabase(app);
  
  var messagesRef = ref(database, 'profiles');

  // Listen for form submit
  document.getElementById('profileForm').addEventListener('submit', submitForm);
  
  function showAlert(message) {
    const alertElement = document.getElementById('alertMessage');
    alertElement.textContent = message;
    alertElement.style.display = 'block';
    alert('Profile updated successfully!');
  
    // Hide alert after 3 seconds
    setTimeout(() => {
      alertElement.style.display = 'none';
    }, 3000);
  }

  // Submit form
  function submitForm(e){
    e.preventDefault();
  
    // Get values
    const fullName = getInputVal('fullName');
    const email = getInputVal('email');
    const phone = getInputVal('phone');
    const emergencyContact = getInputVal('emergencyContact');
    const location = getInputVal('location');
  
    // Save message
    saveMessage(fullName, email, phone, emergencyContact, location);
  
    
    showAlert('Profile updated successfully!');

    // Clear form
    document.getElementById('profileForm').reset();
    
  }
  
  // Function to get get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  // Save message to firebase
  function saveMessage(fullName, email, phone, emergencyContact, location){
    push(ref(database, 'profiles'), {
        fullName: fullName,
        email: email,
        phone: phone,
        emergencyContact: emergencyContact,
        location: location
      });
}

