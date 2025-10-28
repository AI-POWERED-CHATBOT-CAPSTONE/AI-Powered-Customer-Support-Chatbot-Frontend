import { create } from 'zustand'

interface StudentChatState {
    selectedChatId: string | undefined
    selectChat: (chatId: string | undefined) => void
}


export const useStudentChatStore = create<StudentChatState>()((set) => ({
    selectedChatId: undefined,
    selectChat: (chatId: string | undefined) => set(() => ({ selectedChatId: chatId })),
}))