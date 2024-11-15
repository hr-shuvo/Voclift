import React from "react";


type Props = {
    children: React.ReactNode
}

const MainLayout = ({children}:Props)=>{
    return(
        <>
            <main className='lg:pl-[256px] h-full pt-[50px] lg:pt-0'>
                <div className='h-full max-w-[1056px] mx-auto pt-6 '>
                    {children}
                </div>

            </main>
        </>

    )

}

export default MainLayout