import {create} from "zustand/index";

interface DataSourcesState {
    event: string | undefined
    setEvent: (event: string | undefined) => void
}

export const useDataSourcesStore = create<DataSourcesState>()((set) => ({
    event: undefined,
    setEvent: (event: string | undefined) => set(() => ({ event: event })),
}))