import {createMMKV, MMKV} from "react-native-mmkv";

const storage:MMKV = createMMKV()

export const storageAdapter = {
    getItem : (key: string):any =>  storage.getString(key) ?? null,
    setItem : (key:string , value : string) => storage.set(key, value) ,
    removeItem : (key: string) => storage.remove(key)
}