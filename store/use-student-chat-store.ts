import { create } from 'zustand'
import {subscribeWithSelector} from "zustand/middleware";

interface StudentChatState {
    event: string | undefined
    setEvent: (event: string | undefined) => void
}

export const useStudentChatStore = create<StudentChatState>()(subscribeWithSelector(
    (set) => ({
        event: undefined,
        setEvent: (event: string | undefined) => set(() => ({ event: event })),
    })
))