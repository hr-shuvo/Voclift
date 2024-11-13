import {Button} from "@/components/ui/button";

const ButtonsPage =()=>{
    return (
        <div className='p-4 space-y-4 flex flex-col max-w-[200px]'>
            <Button variant='default' size='default'>Default</Button>
            <Button variant='primary' size='default'>Primary</Button>
            <Button variant='primaryOutline' size='default'>Primary Outline</Button>
            <Button variant='secondary' size='default'>Secondary</Button>
            <Button variant='secondaryOutline' size='default'>Secondary Outline</Button>
            <Button variant='danger' size='default'>Danger </Button>
            <Button variant='dangerOutline' size='default'>Danger Outline</Button>
            <Button variant='super' size='default'>Super </Button>
            <Button variant='superOutline' size='default'>Super Outline</Button>
            <Button variant='ghost' size='default'>Ghost </Button>


            <Button variant='sidebar' size='default'>Sidebar </Button>
            <Button variant='sidebarOutline' size='default'>Sidebar Outline</Button>

        </div>
    )
}

export default ButtonsPage;