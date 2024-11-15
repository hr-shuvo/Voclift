import React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {SidebarItem} from "@/components/sidebar-item";

type Props = {
    className: React.ReactNode
};


export const Sidebar = ({className}: Props) =>{
    return (
        <div className={cn('flex h-full lg:w-[256px] w-[256px] ' +
            'lg:fixed left-0 top-0 px-4 border-r-2 flex-col', className)}>

            <Link href='/learn'>
                <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
                    <Image src='/mascot.svg' height={40} width={40} alt='mascot'/>
                    <h1 className='text-2xl font-extrabold text-green-500 tracking-wide'>
                        vocLift
                    </h1>

                </div>
            </Link>


            <div className='flex flex-col gap-y-2 flex-1'>
                <SidebarItem label='Learn' href='/learn' iconSrc='/learn.svg'/>
                <SidebarItem label='Vocabs' href='/vocabs' iconSrc='/vocabs.png'/>
                <SidebarItem label='Leaderboard' href='/leaderboard' iconSrc='/leaderboard.svg'/>
                <SidebarItem label='Quests' href='/quests' iconSrc='/quests.svg'/>
                <SidebarItem label='Shop' href='/shop' iconSrc='/shop.svg'/>

            </div>


        </div>
    )
}

