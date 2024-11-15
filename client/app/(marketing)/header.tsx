"use client"

import Image from "next/image";
// import {Loader} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {HelpCircle, LogOut, Settings, User} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useLoginModel, useRegisterModel, userLoginStatus} from "@/store/use-auth-modal";
import {useRouter } from "next/navigation";

export const Header = () =>{
    const url = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const {isLoggedIn, logout} = userLoginStatus();

    const {openLogin} = useLoginModel();
    const {openRegister} = useRegisterModel();

    const onLogout = async () => {
        const response = await fetch(url+'auth/logout',{
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials:'include',
        });

        if(response.ok){
            logout(); // close login modal
            router.push('/');
        }


    }

    return(
        <header className='h-20 w-full border-b-2 border-slate-200 px-4'>
            <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
                <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
                    <Image src='/mascot.svg' height={40} width={40} alt='mascot'/>
                    <h1 className='text-2xl font-extrabold text-green-500 tracking-wide'>vocLift</h1>
                </div>

                {/* <Loader className='h-5 w-5'/> */}

                <div>
                    {isLoggedIn ?(
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full ms-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={''} alt={ ''} />
                                            <AvatarFallback>{ 'U'}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuItem className="flex items-center gap-2">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2">
                                        <HelpCircle className="mr-2 h-4 w-4" />
                                        <span>Help</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="flex items-center gap-2" onClick={onLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ):(
                        <div>
                            <Button size='sm' variant='default' className='ms-2' onClick={openLogin}>Login</Button>
                            <Button size='sm' variant='default' className='ms-2'  onClick={openRegister}>Register</Button>
                        </div>
                    )}


                </div>




            </div>
        </header>
    )
}