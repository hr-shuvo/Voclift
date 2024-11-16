import {getCourses} from "@/db/queries";
import { List } from "./list";

const CoursesPage = async () =>{

    const coursesData = getCourses();
    // const userProgressData = [];

    const [
        courses,
        // userProgress
    ] = await Promise.all([
        coursesData,
        // userProgressData
    ])

    // console.log(userProgress) 


    return(
        <div className="h-full max-w[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Language Courses
            </h1>

            <List
                courses = {courses}
                activeCourseId={'673821098c11aa725eba9577'}
            />
        </div>
    )
}

export default CoursesPage;