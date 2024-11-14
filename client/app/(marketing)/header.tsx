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
import {useLoginModel, useRegisterModel} from "@/store/use-auth-modal";

export const Header = () =>{

    const {openLogin} = useLoginModel();
    const {openRegister} = useRegisterModel();

    return(
        <header className='h-20 w-full border-b-2 border-slate-200 px-4'>
            <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
                <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
                    <Image src='/mascot.svg' height={40} width={40} alt='mascot'/>
                    <h1 className='text-2xl font-extrabold text-green-500 tracking-wide'>vocLift</h1>
                </div>

                {/* <Loader className='h-5 w-5'/> */}

                <div>
                    <Button size='sm' variant='default' className='ms-2' onClick={openLogin}>Login</Button>
                    <Button size='sm' variant='default' className='ms-2'  onClick={openRegister}>Register</Button>

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
                            <DropdownMenuItem className="flex items-center gap-2" >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>




            </div>
        </header>
    )
}