import React from 'react'
import { useParams } from 'react-router-dom'
import { useBlogs } from '../hooks';
import type { Blog } from '../components/Constants';
import AppBar from '../components/AppBar';
import { Avatar } from '../components/Utils';

const Blog = () => {

    const { id } = useParams();
    const { loading, blogs } = useBlogs<Blog>(id);

    if (loading) {
        return <div className='flex flex-col w-dvw h-dvh justify-center items-center text-8xl font-bold'>
            Loading...
        </div>
    }

    return (
        <div>
            {/* <AppBar name={blogs[0].author.name} /> */}
            <AppBar name={localStorage.getItem('name')} />
            <div className='flex justify-center'>
                <div className='grid grid-cols-12 w-full m-16 lg:w-[48rem] lg:my-28 xl:w-[62rem] 2xl:w-[84rem] '>
                    <div className='col-span-12 xl:col-span-9'>
                        <h2 className='text-6xl font-extrabold text-black'>
                            {blogs[0].title}
                        </h2>
                        <p className='text-2xl text-slate-400 pt-5 font-light'>Posted on August 24, 2023</p>
                        <p className='text-2xl text-slate-800 mt-4 pt-6'>
                            {blogs[0].content}
                        </p>
                        <div className='col-span-12 border-t mt-28 pt-10 xl:hidden'>
                            <p className='text-3xl font-medium mb-6'>Author</p>
                            <div className='flex gap-6 items-center'>
                                <Avatar name={blogs[0].author.name} size='big'/>
                                <div className='text-3xl font-bold text-black'>
                                    {blogs[0].author.name||"Anonymous"}
                                    <span className='text-2xl text-slate-400 pt-4 font-light block'>Author trying to grab unwanted attention</span>
                                </div>
                            </div>
                        </div>
                        <h4 className='text-3xl font-medium mt-60 border-t pt-6'>
                            {blogs[0].comments ? 'Comments' : 'No Comments'}
                        </h4>
                        {
                            blogs[0].comments?.map(comment => {
                                return <div className='text-xl font-gray-800 font-light divide-y divide-gray-300'>
                                    {comment}
                                </div>
                            })
                        }
                    </div>
                    <div className='hidden xl:block xl:col-span-3 xl:pl-16 xl:border-t-0 xl:mt-6'>
                        <p className='text-3xl font-medium mb-6'>Author</p>
                        <div className='flex gap-6 items-center'>
                            <Avatar name={blogs[0].author.name} size='big'/>
                            <div className='text-3xl font-bold text-black'>
                                {blogs[0].author.name||"Anonymous"}
                                <span className='text-2xl text-slate-400 pt-4 font-light block'>Author trying to grab unwanted attention</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog