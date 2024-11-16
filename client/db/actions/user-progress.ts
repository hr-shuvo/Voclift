import {cache} from "react";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";


const url = process.env.NEXT_PUBLIC_API_URL;
export const upsertUserProgress = cache(async (courseId: string) => {

    console.log('course Id: ', courseId)
    try{
        const response = await fetch(url+'userProgress/selectUserCourse',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials:'include',
            body:JSON.stringify({
                courseId
            })
        });

        if(response.ok){
            console.log('update success')


            // revalidatePath('/courses');
            // revalidatePath('/learn');
            // redirect('/learn');
        }
        else{
            return new Error('Failed to update user progress in');
        }

    } catch (error) {
        throw new Error('Failed to update user progress out 2');
    }



})