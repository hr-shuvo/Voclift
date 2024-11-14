import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
      <div className='max-w-[988px] max-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2'>
          <div className='relative w-[280px] h-[280px] lg:w[424px] lg:h-[424px mb-8 lg:mb-0'>
              <Image src='/logo/ielts1.gif' alt='hero' fill/>
          </div>

          <div className='flex flex-col items-center gap-y-8'>
              <h1 className='text-xl lg:text-3xl font-bold text-neutral-600 text-center'>
                  Learn, practice, and master with <strong>vocLift</strong>.
              </h1>

              <div>
                  <Button size='lg' variant='secondary' className='w-full' asChild>
                      <Link href='/'>Continue Learning</Link>
                  </Button>
              </div>
          </div>
      </div>
  );
}
