'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import { useRegisterModel} from "@/store/use-auth-modal";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export const RegisterModal =() =>{

    const [isClient, setIsClient] = useState(false);
    const {isOpen, close} = useRegisterModel();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() =>setIsClient(true), []);

    if(!isClient){
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login logic here
        console.log('Login attempted with:', {email, password})
    }

    return(


        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="sm:max-w-[425px] p-0 border-gray-800">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-2xl font-bold">Register</DialogTitle>
                    <p className="text-sm text-gray-600">Enter your email below to login to your account</p>
                </DialogHeader>
                <Card className="bg-white border-0 shadow-md">
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-800">
                                    Name
                                </label>
                                <Input
                                    type="text"
                                    placeholder="John Snow"
                                    className="bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-800">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    placeholder="m@example.com"
                                    className="bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-800">
                                        Password
                                    </label>
                                    <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    type="password"
                                    className="bg-gray-100 border-gray-300 text-gray-900"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />


                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-2">
                            <Button type="submit" variant='primary'
                                    className="w-full">
                                Login
                            </Button>
                            <p className="text-sm text-gray-600 text-center">
                                Already have an account?{' '}
                                <a  className="text-blue-500 hover:underline cursor-pointer">
                                    Sign In
                                </a>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
                <DialogDescription>
                    
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}