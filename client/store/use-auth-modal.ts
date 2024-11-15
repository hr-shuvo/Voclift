import {create} from "zustand";


type LoginModalState = {
    isOpen:boolean;
    openLogin:() =>void;
    close:() =>void;
}

export const useLoginModel = create<LoginModalState>((set) =>({
    isOpen:false,
    openLogin:() => set({isOpen:true}),
    close:() => set({isOpen:false}),
}))





type RegisterModalState = {
    isOpen:boolean;
    openRegister:() =>void;
    close:() =>void;
}
export const useRegisterModel = create<RegisterModalState>((set) =>({
    isOpen:false,
    openRegister:() => set({isOpen:true}),
    close:() => set({isOpen:false}),
}))