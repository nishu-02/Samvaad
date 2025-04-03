import { create } from "zustand";
import { sendMessage, listenMessages } from "../firebase/chatService";
import useUserStore from "./useUserStore"; // Import the user store

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
      
      // Update latest messages in userStore for each conversation
      if (newMessages.length > 0) {
        const userStore = useUserStore.getState();
        
        // Group messages by conversation (sender-receiver pair)
        const conversations = {};
        
        newMessages.forEach(msg => {
          // Create unique conversation keys for both directions
          const key1 = `${msg.sender}-${msg.receiver}`;
          const key2 = `${msg.receiver}-${msg.sender}`;
          
          // Store the message with the latest timestamp
          if (!conversations[key1] || msg.timestamp > conversations[key1].timestamp) {
            conversations[key1] = msg;
          }
          
          if (!conversations[key2] || msg.timestamp > conversations[key2].timestamp) {
            conversations[key2] = msg;
          }
        });
        
        // Update each user with their latest message
        Object.values(conversations).forEach(msg => {
          // Update for receiver
          userStore.updateLatestMessage(msg.receiver, {
            text: msg.text,
            timestamp: msg.timestamp,
            sender: msg.sender
          });
          
          // Update for sender
          userStore.updateLatestMessage(msg.sender, {
            text: msg.text,
            timestamp: msg.timestamp,
            sender: msg.sender
          });
        });
      }
    });

    return unsubscribe;
  },
}));

export default useChatStore;