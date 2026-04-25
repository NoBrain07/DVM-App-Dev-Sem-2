import {create} from 'zustand';
import {url} from "@/constants/get_data";

export type Event = {
    id: number,
    name: string,
    category: string,
    day: number,
    time: string,
    venue: string,
    registrations: number,
}

type EventStore = {
    events: Event[]
    error: null | string
    fetchEvents: () =>  Promise <void>
}

type LineupStore = {
    lineupIds: number[]
    lineupEvents: Event[]
    error: null | string
    fetchLineupEvents: () => Promise <void>   //return type ka issue
    addLineupEvent: (id: number) =>  Promise <void>
    removeLineupEvent: (id: number) =>  Promise <void>
}

export const useEventStore = create<EventStore>((set) => ({
    events: [],
    error: null,

    fetchEvents: async () => {
        set({error: null})
        try {
            const result = await fetch(url + "/events",{
                headers: {'ngrok-skip-browser-warning': 'true'}
            })
            const data = await result.json()
            set({events: data})
        } catch (e: any) {
            set({error: e.message})
        }
    }

}))

export const useLineupStore = create<LineupStore>((set, get) => ({
    lineupIds: [],
    lineupEvents: [],
    error: null,

    addLineupEvent:async (id: number) => {
        set((state) => ({
            lineupIds: [...state.lineupIds, id]
        }))
        await get().fetchLineupEvents()
    },
    removeLineupEvent: async (id: number) => {
        set((state) => ({
            lineupIds: state.lineupIds.filter(e => e !== id)
        }))
        await get().fetchLineupEvents()
    },

    fetchLineupEvents: async () => {
        try {
            const data1 = get().lineupIds
            const result = await Promise.all(
                data1.map((id: number) => fetch(url + `/events/${id}`))
            )
            const data: Event[] = await Promise.all(
                result.map((res) => {
                    if (!res.ok) throw new Error(`Failed to get Event ${res.url} id`)
                    return res.json()
                })
            )
            set({lineupEvents: data})
        } catch (e: any) {
            set({error: e.message})
        }
    }

}))