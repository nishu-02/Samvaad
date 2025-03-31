import { create } from "zustand";
import { sendMessage, listenMessages } from "../firebase/chatService";

const useChatStore = create((set, get) => ({
  messages: [],
  loading: false,

  // Send message and update Zustand state
  sendMessage: async (message, sender, receiver) => {
    set({ loading: true });
    await sendMessage(message, sender, receiver);
    set({ loading: false });
  },

  // Listen for messages and update Zustand state
  listenMessages: () => {
    const unsubscribe = listenMessages((newMessages) => {
      set({ messages: newMessages });
    });

    return unsubscribe; // Return so it can be used to stop listening if needed
  },
}));

export default useChatStore;
