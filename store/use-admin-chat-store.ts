import { create } from 'zustand'
import {subscribeWithSelector} from "zustand/middleware";

interface AdminChatState {
    event: string | undefined
    setEvent: (event: string | undefined) => void
}

export const useAdminChatStore = create<AdminChatState>()(subscribeWithSelector(
    (set) => ({
        event: undefined,
        setEvent: (event: string | undefined) => set(() => ({ event: event })),
    })
))