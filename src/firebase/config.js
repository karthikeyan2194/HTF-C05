import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "ssssssssssssssssssssssssssssss",
	authDomain: "vvvvvvvvvvvvvvvvvvvv",
	projectId: "nnnnnnnnnn",
	storageBucket: "jjjjjjjjjjj",
	messagingSenderId: "hhhhhhhhhhh",
	appId: "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",
	measurementId: "gggggggggggggggg"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };