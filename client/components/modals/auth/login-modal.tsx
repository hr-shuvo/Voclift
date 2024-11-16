'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {SyntheticEvent, useEffect, useState} from "react";
import {useLoginModel, useRegisterModel} from "@/store/use-auth-modal";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export const LoginModal = () => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const {isOpen, close} = useLoginModel();
    const {openRegister} = useRegisterModel();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        // Handle login logic here
        // console.log('Login attempted with:', {email, password});

        const response = await fetch(url+'auth/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials:'include',
            body:JSON.stringify({
                email, password
            }),
        });

        if(response.ok){
            close(); // close login modal
            router.push('/learn');
        }else{
            const data = await response.json();
            console.log(data)
        }


    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="sm:max-w-[425px] p-0 border-gray-800">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-2xl font-bold">Login</DialogTitle>
                    <p className="text-sm text-gray-600">Enter your email below to login to your account</p>
                </DialogHeader>
                <Card className="bg-white border-0 shadow-md">
                    {/*<CardHeader>*/}
                    {/*    <p className="text-sm text-gray-600">Enter your email below to login to your account</p>*/}
                    {/*</CardHeader>*/}
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-800">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className="bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-gray-800">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="bg-gray-100 border-gray-300 text-gray-900"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </div>
                            <div className="space-y-2 flex justify-end">
                                <Link href="#" className="text-sm text-blue-500 hover:underline">
                                    Forgot your password?
                                </Link>
                            </div>

                        </CardContent>

                        <CardFooter className="flex flex-col space-y-2">
                            <Button type="submit" variant='primary'
                                    className="w-full">
                                Login
                            </Button>
                            <Button variant="default"
                                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-200">
                                Login with OTP Code
                            </Button>
                            <p className="text-sm text-gray-600 text-center">
                                Don&apos;t have an account?{' '}
                                <button className="text-blue-500 hover:underline" onClick={()=>{
                                    close();
                                    openRegister();
                                }}>
                                    Sign up
                                </button>
                            </p>
                        </CardFooter>
                    </form>
                </Card>


                <DialogDescription>
                    <span></span>

                </DialogDescription>
            </DialogContent>
        </Dialog>

    )
}