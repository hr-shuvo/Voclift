'use client'


import {Card} from "@/app/(main)/courses/card";

type Course = {
    _id: string;
    title: string;
    imageSrc: string;
};

type Props = {
    courses: Course[]
    activeCourseId?: string;
};

export const List = ({courses, activeCourseId}: Props) => {
    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {
                courses.map((course) => (
                    <Card
                        key={course._id}
                        id={course._id}
                        title={course.title}
                        imageSrc={course.imageSrc}
                        onClick={()=>{}}
                        disabled={false}
                        active={course._id === activeCourseId}
                    />
                ))
            }

        </div>
    )
}




