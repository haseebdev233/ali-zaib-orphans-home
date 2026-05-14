import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAi6OpIfUgdS0sy3JYMjPsY6_HiPAXOvdE",
  authDomain: "ali-zaib-orphans-home.firebaseapp.com",
  projectId: "ali-zaib-orphans-home",
  storageBucket: "ali-zaib-orphans-home.appspot.com",
  messagingSenderId: "772028744498",
  appId: "1:772028744498:web:735f3fcc29b737f76a8d2b",
  databaseURL: "https://ali-zaib-orphans-home-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Only call this function manually when setting up the database for the first time
// DO NOT call automatically on every page load
export const initializeCounter = async () => {
  try {
    // Count existing donations
    const donationsRef = ref(db, 'donations');
    const snapshot = await get(donationsRef);

    let donationCount = 0;
    if (snapshot.exists()) {
      donationCount = Object.keys(snapshot.val()).length;
    }

    // Set counter to donation count + 1
    const counterRef = ref(db, 'counters/donationId');
    await set(counterRef, donationCount + 1);

    console.log(`✅ Database initialized!`);
    console.log(`Existing donations: ${donationCount}`);
    console.log(`Counter set to: ${donationCount + 1}`);
    console.log(`Next donation will be: AZOH-${donationCount + 1}`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
};

export { db };
