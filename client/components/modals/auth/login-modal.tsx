'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import {useLoginModel} from "@/store/use-auth-modal";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export const LoginModal = () => {

    const [isClient, setIsClient] = useState(false);
    const {isOpen, close} = useLoginModel();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login logic here
        console.log('Login attempted with:', {email, password})
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
                                <div className="flex justify-between">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-800">
                                        Password
                                    </label>
                                    <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
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
                            <Button variant="default"
                                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-200">
                                Login with OTP Code
                            </Button>
                            <p className="text-sm text-gray-600 text-center">
                                Don&apos;t have an account?{' '}
                                <Link href="/signup" className="text-blue-500 hover:underline">
                                    Sign up
                                </Link>
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