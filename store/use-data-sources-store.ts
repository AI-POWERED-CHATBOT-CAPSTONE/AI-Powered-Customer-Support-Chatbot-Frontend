import {create} from "zustand/index";
import { subscribeWithSelector } from 'zustand/middleware'

interface DataSourcesState {
    event: string | undefined
    setEvent: (event: string | undefined) => void
}

export const useDataSourcesStore = create<DataSourcesState>()(subscribeWithSelector(
    (set) => ({
        event: undefined,
        setEvent: (event: string | undefined) => set(() => ({ event: event })),
    })
))