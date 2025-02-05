import { FormEvent, memo, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBlogs } from '../hooks';
import type { Blog } from '../components/Constants';
import AppBar from '../components/AppBar';
import { Avatar, ControlledLabelledInput } from '../components/Utils';
import axios from 'axios';
import * as configs from '../../config.json';
import { BlogSkeleton } from '../components/Skeletons';

const Blog = () => {

    const { id } = useParams();
    const { loading, blogs } = useBlogs<Blog>(id);

    useEffect(() => { console.log("blogs re-render") });

    if (loading) {
        return <div>
            <AppBar name={localStorage.getItem('name')} />
            <BlogSkeleton/>
        </div>
    }

    return (
        <div>
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
                        <div className='border-t mt-48 pt-16 xl:hidden'>
                            <AboutAuthor name={blogs[0].author.name} />
                        </div>
                        <CommentSection comments={blogs[0].comments} id={id} />
                    </div>
                    <div className='hidden xl:block xl:col-span-3 xl:pl-20 xl:border-t-0 xl:mt-6'>
                        <AboutAuthor name={blogs[0].author.name} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const AboutAuthor = ({ name }: { name: string | null }) => {
    return <>
        <p className='text-3xl font-medium mb-6'>Author</p>
        <div className='flex gap-6 items-center'>
            <Avatar name={name} size='big' />
            <div className='text-3xl font-bold text-black'>
                {name || "Anonymous"}
                <span className='text-2xl text-slate-400 pt-4 font-light block'>Author trying to grab unwanted attention</span>
            </div>
        </div>
    </>
}


export const CommentSection = memo(({
    comments,
    id
}: {
    comments: string[] | undefined,
    id: string | undefined
}) => {

    const [opinions, neverSetOpinions] = useState<string>('');
    const [localComments, setLocalComments] = useState<typeof comments>(comments);
    const navigate = useNavigate();

    useEffect(() => { console.log("comments section rerender") });

    useEffect(() => { console.log("localcomments updated") }, [localComments])

    const handleAddComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedComments = comments ? ([opinions, ...comments]) : ([opinions]);
            const response = await axios.put(`${configs.backend_url}/blogs`, {
                id: id,
                comments: [...updatedComments]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            console.log(response);
            setLocalComments(updatedComments);
            neverSetOpinions('');
            // navigate(0);
        } catch (err) {
            console.error(err);
            navigate('/error', { state: { error: err.response.data.error } });
        }
    }

    return <div>
        <h4 className='text-3xl font-medium mt-16 border-t pt-16 xl:mt-60 mb-4'>
            {(localComments && localComments?.length) ? 'Comments' : 'No Comments yet'}
        </h4>
        <form action="POST" onSubmit={e => handleAddComment(e)}>
            <div className='flex justify-between items-end gap-4 w-full pb-8'>
                <ControlledLabelledInput value={opinions} onChange={useCallback((e) => neverSetOpinions(e.target.value), [neverSetOpinions])} label='Any Thoughts?' name='opinions' placeholder='Be respectful...' type='text' />
                <button className='btn' type='submit' disabled={!opinions.trim()}>Comment</button>
            </div>
        </form>
        {localComments && localComments?.length > 0 && <div className='flex flex-col divide-y divide-teal-200'>
            {
                localComments?.map((comment, i) => {
                    return <div key={i} className='text-xl font-gray-800 font-light divide-y divide-gray-300'>
                        <div className='my-4 rounded h-full py-8 px-4 hover:bg-gray-100 transition-all duration-500 ease-in-out'>
                            {comment}
                        </div>
                    </div>
                })
            }
        </div>
        }
    </div>
})

export default Blog