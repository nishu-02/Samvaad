import { db } from "./firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

// Send Message
export const sendMessage = async (userId, message) => {
  try {
    await addDoc(collection(db, "messages"), {
      userId,
      message,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Message Error:", error.message);
  }
};

// Fetch Messages in Real-Time
export const fetchMessages = (callback) => {
  const messagesRef = query(collection(db, "messages"), orderBy("timestamp", "asc"));
  
  return onSnapshot(messagesRef, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};
