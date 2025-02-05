import { memo } from 'react'
import { Avatar } from './Utils'
import './Button.css'
import { Link } from 'react-router-dom'

const AppBar = memo((
    { name }: 
    { name: string | null }
) => {


    const handleBtnClick = async() => {
        console.log("Navigating to new-story page");
        // navigate('/blogs/new-story');
        // if (publishBlog == 'New Blog') {
        //     //
        // } else {
        //     try {
        //         await axios.post(`${configs.backend_url}/blogs/post`, {
        //             headers: {
        //                 Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        //             }
        //         }, )
        //     } catch (err) {
        //         console.error(err);
        //         navigate('/error', {state: {error: err.response.data.error}});
        //     }
        //     // backend post call to /blogs
        // }
    }

    return (
        <div className='flex justify-center'>
            <div className='px-12 py-6 flex 
                =fixed =top-10 =max-w-[90%] =rounded-full
                border-green-500 bg-teal-100 justify-between items-center w-full'>
                <div className='text-2xl cursor-pointer'>
                    <Link to={'/blogs'}>
                        Medium
                    </Link>
                </div>
                <div className='flex gap-4 items-center'>
                    <Link to={'/blogs/new-story'} reloadDocument={true}>
                        <button onClick={handleBtnClick} className={`btn`}>New Blog</button>
                    </Link>
                    <Avatar name={name} size="big" />
                </div>
            </div>
        </div>
    )
})

export default AppBar