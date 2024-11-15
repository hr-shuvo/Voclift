import {StickyWrapper} from "@/components/sticky-wrapper";
import {FeedWrapper} from "@/components/feed-wrapper";
import {UserProgress} from "@/components/user-progress";
import {Header} from "@/app/(main)/learn/header";


const LearnPage = () =>{
    return(
        <div className='flex flex-row-reverse gap-[48px] px-6'>
             <StickyWrapper>
                 <UserProgress></UserProgress>
             </StickyWrapper>
            <FeedWrapper>
                <Header title={'IELTS'}/>
            </FeedWrapper>
        </div>
    )
};


export default LearnPage;