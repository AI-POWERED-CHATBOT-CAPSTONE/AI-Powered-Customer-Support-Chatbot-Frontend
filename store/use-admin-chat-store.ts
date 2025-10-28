import { create } from 'zustand'

interface AdminChatState {
    selectedChatId: string | undefined
    selectChat: (chatId: string | undefined) => void
}


export const useAdminChatStore = create<AdminChatState>()((set) => ({
    selectedChatId: undefined,
    selectChat: (chatId: string | undefined) => set(() => ({ selectedChatId: chatId })),
}))