import React, { Dispatch, EventHandler, FormEvent, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import '../App.css'
import './Button.css'
import { FontSize } from './Constants';
import axios from 'axios';
import * as configs from '../../config.json';
import { useNavigate } from 'react-router-dom';

const NewBlog = () => {
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [disabled, setDisabled] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
        console.log("Mount");

        return () => {
            console.log("Unmount");
        }
    }, []);

    useEffect(() => {
        // console.log("Re-render")
        if (title!=='' && content!=='') {
            /**
             * Originally, tried to make the App-bar button behave as the btn that can control 'publish' functionality, but 
             * to get that done, we need to have a state management system, else, we'll have to drill the title, content states, through 2 nodes,
             * I feel is Moot.
             */

            // setDisable(false)
            setDisabled(false)
        } else {
            // setDisable(true)
            setDisabled(true)
        }
    }, [title , content]);

  
    const handlePublish = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("handling");

    
        try {
            const response = await axios.post(`${configs.backend_url}/blogs`, {
                "title": title,
                "content": content
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                }
            }, );

            console.log(response);
            const id = response.data.id;

            console.log(`${configs.backend_url}/blogs/${id}`);
            navigate(`/blogs/${id}`);
        } catch (err) {
            console.error(err);
            navigate('/error', {state: {error: err.response.data.error}});
        }
    } 

    return (
        <div className='max-w-6xl justify-self-center'>
            <form action="POST" onSubmit={e => handlePublish(e)}>
                <div className='w-full flex gap-6 items-start divide-x divide-gray-300 px-20 my-8 '>
                    <div className='pl-2'>
                        <RichInputElement refObj={titleRef} value={title} setValue={setTitle} fontSize={FontSize['6xl']} placeholder='Title' classList='tracking-wide word-space-title' />
                        <RichInputElement refObj={contentRef} value={content} setValue={setContent} fontSize={FontSize['3xl']}  placeholder='Tell Your Story....' classList='min-h-4xl tracking-wide word-space-content'/>
                    </div>
                    <button className='text-4xl btn' type='submit' disabled={disabled} >Publish</button>
                </div>
            </form>
        </div>
    )
}

const RichInputElement = ({
    refObj, 
    value, 
    setValue,
    classList='',
    fontSize=FontSize.base,
    placeholder
}: {
    refObj: RefObject<HTMLTextAreaElement>,
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    classList?: string,
    fontSize: FontSize,
    placeholder: string
}) => {

    const handleInput = (refObj:RefObject<HTMLTextAreaElement>) => {
        const textarea = refObj.current;
        if (textarea) {

            // We are setting the height to auto First, cuz scrollHeight doesn't refresh its value unless the height is re-evaluated.
            // Its important to set it to auto and not some random value, cuz the browser needs to re-set the properties, and this forces the browser to do this.
            textarea.style.height = `auto`
            textarea.style.height = `${textarea.scrollHeight}px`; 
        }
    }
    
    return <textarea ref={refObj}
        value={value} onChange={(e) => setValue(e.target.value)}
        onInput={() => handleInput(refObj)} placeholder={placeholder} draggable={false} rows={1} 
        className={`resize-none font-light w-full break-words p-3 outline-0 ${classList} ${fontSize}`}>
    </textarea>
}

export default NewBlog