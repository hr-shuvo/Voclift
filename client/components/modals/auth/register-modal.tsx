'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import { useRegisterModel} from "@/store/use-auth-modal";

export const RegisterModal =() =>{

    const [isClient, setIsClient] = useState(false);
    const {isOpen, close} = useRegisterModel();

    useEffect(() =>setIsClient(true), []);

    if(!isClient){
        return null;
    }

    return(
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Register</DialogTitle>
                    <DialogDescription>enter credentials</DialogDescription>
                    <DialogFooter>welcome</DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}