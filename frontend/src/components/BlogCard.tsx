import { Avatar, Circle, Pill } from './Utils';
import { Link } from 'react-router-dom';

interface IBlogCard {
    blogId: string;
    authorName: string;
    date: string;
    title: string;
    content: string;
    tags?: string[];
}

const BlogCard = ({ blogId, authorName, date, title, content, tags }: IBlogCard) => {
    return (
        <Link to={`/blogs/${blogId}`}>
            <div className='grid grid-cols-4 gap-1 py-12'>
                <div className='col-span-4 xl:col-span-3 flex flex-col items-start justify-around gap-4 cursor-pointer'>
                    <div className='flex items-center justify-between text-center gap-4 text-xl'>
                        <Avatar name={authorName} />
                        <p>{authorName}</p>
                        <Circle />
                        <p className='text-gray-400'>{date}</p>
                    </div>
                    <h2 className='font-bold text-4xl '>{title}</h2>
                    <p className='text-2xl mb-8'>{content.slice(0, 150)}...</p>
                    <div className='flex gap-4 items-center'>
                        {
                            tags && tags.map((tag, idx) => (
                                <Pill key={`${blogId}_${idx}`}>{tag}</Pill>
                            ))
                        }
                        <p className='text-2xl text-gray-400 font-light'>{Math.ceil(content.length / 300)} min read</p>
                    </div>
                </div>
                <div className='hidden xl:col-span-1 xl:inline-flex items-center justify-center p-4'>Image section</div>
            </div>
        </Link>
    )
}

export default BlogCard