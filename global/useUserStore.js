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
      console.log(db)
      const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      set({ users, loading: false });
    } catch (error) {
      console.error("Error fetching users:", error);
      set({ loading: false });
    }
  },
}));

export default useUserStore;
