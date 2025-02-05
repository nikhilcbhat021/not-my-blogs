import { memo } from "react";
import { Circle } from "./Utils";

export const BlogSkeleton = memo(() => {

    return (<div>
        <div className='animate-pulse flex justify-center'>
            <div className=' grid grid-cols-12 w-full m-16 lg:w-[48rem] lg:my-28 xl:w-[62rem] 2xl:w-[84rem] '>
                <div className='col-span-12 xl:col-span-9'>
                    <h2 className='bg-gray-200 w-[90%] h-12 rounded-3xl mb-2 text-6xl font-extrabold text-gray-200'></h2>
                    <h2 className='bg-gray-200 w-[25%] h-8 rounded-3xl mb-2 text-6xl font-extrabold text-gray-200'></h2>
                    <p className='bg-gray-200 text-2xl h-4 rounded-full text-gray-800 mt-1 mb-8 w-[40%] font-light'></p>
                    <p className='bg-gray-200 text-base rounded-full h-5 text-gray-200 mt-2'></p>
                    <p className='bg-gray-200 text-base rounded-full h-5 text-gray-200 mt-2'></p>
                    <p className='bg-gray-200 text-base rounded-full h-4 text-gray-200 mt-8'></p>
                    <p className='bg-gray-200 text-base rounded-full h-4 text-gray-200 mt-2'></p>
                    <p className='bg-gray-200 text-base rounded-full h-4 text-gray-200 mt-2'></p>
                    <p className='bg-gray-200 text-base rounded-full h-4 text-gray-200 mt-2'></p>
                    <div className='border-t mt-48 pt-16 xl:hidden'>
                        <AboutAuthorSkeleton />
                    </div>
                    {/* <CommentSection comments={blogs[0].comments} id={id} /> */}
                </div>
                <div className='hidden xl:block xl:col-span-3 xl:pl-20 xl:border-t-0 xl:mt-6'>
                    <AboutAuthorSkeleton full={true}/>
                </div>
            </div>
        </div>
    </div>)
})


export const AllBlogsSkeleton = memo(() => {
    return (
        <div>
            <div className='animate-pulse divide-y divide-gray-300 px-14'>
                <BlogsListSkeleton />
                <BlogsListSkeleton />
                <BlogsListSkeleton />
            </div>
        </div>
    )
})


const BlogsListSkeleton = () => {
    return <div>
        <div className={`flex flex-col `}>
            <div className='grid grid-cols-4 gap-1 py-12'>
                <div className='col-span-4 xl:col-span-3 flex flex-col items-start justify-around gap-4 '>
                    <div className='flex items-center justify-between text-center gap-4 text-xl'>
                        <AvatarSkeleton/>
                        <p className={`bg-gray-200 rounded-xl h-4 w-[4rem]`}></p>
                        <Circle />
                        <p className={`bg-gray-200 rounded-xl h-4 w-[4rem]`}></p>
                    </div>
                    <h2 className={`bg-gray-200 rounded-full h-8 w-1/2`}></h2>
                    <p className={`bg-gray-200 rounded-full h-4 mt-4 w-full`}></p>
                    <p className={`bg-gray-200 rounded-full h-4 w-full`}></p>
                    <div className='flex gap-4 items-center'>
                        <span className='bg-gray-200 h-8 w-[3rem] rounded-full px-4 py-2 text-center'></span>
                        <span className='bg-gray-200 h-8 w-[9rem] rounded-full px-4 py-2 text-center'></span>
                        <span className='bg-gray-200 h-8 w-[7rem] rounded-full px-4 py-2 text-center'></span>
                        <p className={`bg-gray-200 h-8 w-[5rem] ml-24 rounded-full`}></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

const AvatarSkeleton = () => {
    return <div>
        <div className={`w-8 h-8 p-5 text-xl bg-gray-200 text-gray-200 rounded-full flex items-center justify-center`}>
            <span className="leading-none flex items-center justify-center h-full align-baseline"></span>
        </div> 
    </div>
}

const AboutAuthorSkeleton = memo(({
    full=false
}:{
    full?:boolean
}) => {
    return <>
        <p className={`bg-gray-200 text-gray-200 h-8 ${full ? 'w-full' : 'w-[40%]'} rounded-full text-3xl font-medium mb-6`}></p>
        <div className='flex gap-6 items-center'>
            <AvatarSkeleton />                          
            <div className='rounded-full h-full w-full flex flex-col gap-4 font-bold text-gray-200'>
                <p className={`bg-gray-200 ${full ? 'w-full' : 'w-[20%]'} h-8 rounded-full mt-2 text-3xl inline-block`}></p>
                <p className={`bg-gray-200 ${full ? 'w-full' : 'w-[40%]'} h-2 rounded-full mt-2 text-2xl text-gray-200 pt-4 font-light inline-block`}></p>
            </div>
        </div>
    </>
})