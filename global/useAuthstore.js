import { create } from "zustand";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Zustand store
const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // Login function
  loginUser: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, loading: false });
      return userCredential.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Register function
  registerUser: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, loading: false });
      return userCredential.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Logout function
  logoutUser: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  },

  // Auto-login when app starts
  checkAuthState: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user });
      } else {
        set({ user: null });
      }
    });
  },
}));

export default useAuthStore;