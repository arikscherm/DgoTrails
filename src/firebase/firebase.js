// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkkKKBTagSv8adbubxCVsCkBe98qrQye8",
  authDomain: "braveex-77282.firebaseapp.com",
  projectId: "braveex-77282",
  storageBucket: "braveex-77282.appspot.com",
  messagingSenderId: "608576994048",
  appId: "1:608576994048:web:bb4f2cae83eac92dcbd1e5",
  measurementId: "G-K5TQ8Q6MM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = initializeApp.database();

// Listen for changes to the other user's location
const otherUserLocationRef = database.ref('locations/otherUser');
otherUserLocationRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        const otherUserLocation = [data.longitude, data.latitude];
        // Update the other user's marker on the map
    }
});