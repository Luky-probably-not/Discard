import { useStore } from "@/store";

const apiBaseUrl = import.meta.env.VITE_API_URL
const store = useStore();

export const getAuthHeaders = () => {
    const token = store.jwtToken
    return {
        'Content-Type' : 'application/json',
        ...(token && {Authorization: `Bearer ${token}`}),
    }
}

export const getApiUrl= (endpoint: string): string => {
    return `${apiBaseUrl}${endpoint}`
}
