import { cache } from "react";
import axios from 'axios';
import { cookies } from "next/headers";
import apiClient from "@/app/utils/apiClient";


const url = process.env.NEXT_PUBLIC_API_URL;

// export const getCourses = cache(async ()=>{

//     const response = await fetch(url+'courses',{
//         method: 'GET',
//         headers: {
//             Cookie: cookies().toString() 
//         },
//         credentials:'include',
//     });

//     if(response.ok){
//         return await response.json();
//     }
//     else{
//         const data = await response.json();
//         console.error(data)
//         return [];
//     }
// });

export const getCourses = cache(async () => {
    try {
        const response = await apiClient.get('courses',{            
            headers: {
                Cookie: (await cookies()).toString()
            }
        });

        return response.data;
    }
    catch (err) {
        console.error(err);
        return []
    }
});

export const getUserProgress = cache(async () => {

    // const response = await fetch(url + 'userProgress', {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    //     credentials: 'include'
    // });

    const response = await apiClient.get('userProgress',{
        headers: {
            Cookie: (await cookies()).toString()
        }
    });

    return response.data;

})


// const handleSubmit = async (e: SyntheticEvent) => {
//     e.preventDefault()
//     // Handle login logic here
//     // console.log('Login attempted with:', {email, password});
//
//     const response = await fetch(url+'auth/login',{
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         credentials:'include',
//         body:JSON.stringify({
//             email, password
//         }),
//     });
//
//     if(response.ok){
//         close(); // close login modal
//         router.push('/learn');
//     }else{
//         const data = await response.json();
//         console.log(data)
//     }
//
//
// }