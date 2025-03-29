import { create } from "zustand";
import { sendMessage, listenMessages } from "../services/chatService";

const useChatStore = create((set) => ({
  messages: [],
  loading: false,

  sendMessage: async (message, sender) => {
    await sendMessage(message, sender);
  },

  listenMessages: () => {
    listenMessages((newMessages) => {
      set({ messages: newMessages });
    });
  },
}));

export default useChatStore;
