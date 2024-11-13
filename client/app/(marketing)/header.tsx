import Image from "next/image";
// import {Loader} from "lucide-react";
import {Button} from "@/components/ui/button";

export const Header = () =>{
    return(
        <header className='h-20 w-full border-b-2 border-slate-200 px-4'>
            <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
                <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
                    <Image src='/mascot.svg' height={40} width={40} alt='mascot'/>
                    <h1 className='text-2xl font-extrabold text-green-500 tracking-wide'>vocLift</h1>
                </div>

                {/* <Loader className='h-5 w-5'/> */}

                <Button size='lg' variant='ghost'>Login</Button>

            </div>
        </header>
    )
}