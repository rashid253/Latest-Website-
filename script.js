// Firebase configuration – REPLACE with your Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Check if the form exists on the page
  const form = document.getElementById("userInfoForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form field values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const timestamp = Date.now();

      // Save data to Firebase under a unique timestamp key
      database.ref("users/" + timestamp).set({
        name: name,
        email: email,
        phone: phone,
        submittedAt: new Date(timestamp).toISOString()
      })
      .then(() => {
        // Provide a success message to the user
        document.getElementById("formMessage").textContent = "Thank you for your submission!";
        form.reset();
      })
      .catch((error) => {
        // Handle any errors
        document.getElementById("formMessage").textContent = "Error: " + error.message;
      });
    });
  }
});
