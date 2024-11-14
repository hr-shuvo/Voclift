import {create} from "zustand";


type AuthModalState = {
    isOpen:boolean;
    openLogin:() =>void;
    close:() =>void;
}

export const useLoginModel = create<AuthModalState>((set) =>({
    isOpen:false,
    openLogin:() => set({isOpen:true}),
    close:() => set({isOpen:false}),
}))
export const useRegisterModel = create<AuthModalState>((set) =>({
    isOpen:false,
    openRegister:() => set({isOpen:true}),
    close:() => set({isOpen:false}),
}))