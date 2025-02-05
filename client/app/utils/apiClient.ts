
import axios from 'axios';
import { cookies } from "next/headers";


const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/', 
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(
    async (config) =>{
        try{
            const cookieStore = await cookies();
            const cookieString = cookieStore.toString();
            if(cookieString){
                config.headers.Cookie = cookieString;
            }

        }catch(err){
            console.error("Error fetching cookies:", err);
        }

        return config;
    },
    (error) => Promise.reject(error)

)

export default apiClient;
