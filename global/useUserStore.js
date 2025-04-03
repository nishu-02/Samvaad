import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useUserStore = create((set) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      set({ users, loading: false });
    } catch (error) {
      console.error("Error fetching users:", error);
      set({ loading: false });
    }
  },
  
  // To show the lastest message on the ChatListScreen 
  updateLatestMessage: (email, messageData) => {
    set(state => ({
      users: state.users.map(user => {
        if (user.email === email) {
          return {
            ...user,
            latestMessage: messageData.text,
            lastMessageTime: messageData.timestamp,
            isSender: messageData.sender === email
          };
        }
        return user;
      })
    }));
  }
}));

export default useUserStore;