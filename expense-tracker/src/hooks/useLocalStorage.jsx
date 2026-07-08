import { useState } from "react";

function useLocalStorage(key, initialState){
    const [storedValue, setStoredValue] = useState(()=>{
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialState;
        } catch (error) {
            console.error(`Error in data retrieval:`, error);
            return initialState;
        }
    });

    const setValue = (value) =>{
        try {
            setStoredValue(value);
            const valueToStore = value instanceof Function ? value(storedValue): value;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error in data storing key ${key} : `,error);
        }

    }
    return [storedValue, setValue];
}

export default useLocalStorage