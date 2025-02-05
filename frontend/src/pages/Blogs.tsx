import { useEffect } from 'react'
import { useParams } from 'react-router-dom'


import BlogCard from '../components/BlogCard';
import AppBar from '../components/AppBar';
import { useBlogs } from '../hooks/index';
import { Loading } from '../components/Utils';
import { Blog } from '../components/Constants';
import { AllBlogsSkeleton } from '../components/Skeletons';

const Blogs = () => {

    const { id } = useParams();
    const { loading, blogs } = useBlogs<Blog>(id);

    useEffect(() => {
        // console.log(loading);
        // console.log(blogs);
    }, [])

    if (loading) {
        return <div>
            <AppBar name={localStorage.getItem('name')}/>
            <AllBlogsSkeleton />
        </div>
    }

    return (
        <div>
            <AppBar name={localStorage.getItem('name')}/>
            <div className='divide-y divide-gray-300 px-14'>
                {
                    !loading ? blogs.map(b => {
                        return <div key={b.id}>
                            <BlogCard blogId={b.id} authorName={b.author.name||"Anonymous"} content={b.content}
                                date='Dec 3, 2023' title={b.title} tags={['Side Hustle', 'Docker']}/>            
                        </div>
                    }) : <Loading status={loading}/>
                }
            </div>  
        </div>
    )
}

export default Blogs