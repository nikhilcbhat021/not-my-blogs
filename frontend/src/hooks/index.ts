import { useEffect, useState } from "react"
import axios from 'axios';
import * as configs from '../../config.json';
import { useNavigate } from "react-router-dom";


export function useBlogs<T>(id: string|undefined): { "loading":boolean, "blogs":T[] } 
{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<T[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // if (localStorage.getItem('authToken')) {
            if (id) {
                console.log("Get the blog with id - "+ id);
                axios.get(`${configs.backend_url}/blogs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }).then(resp => {
                    console.log(new Array<T>(resp.data))
                    setBlogs(new Array<T>(resp.data))
                    setLoading(false)
                    console.log("loading = "+loading);
                }).catch(err => {
                    console.error(err);
                    navigate('/error', {state: {error: err.response.data.error, redirect: '/signin'}});
                })
            } else {
                console.log("Get all the blogs");
                axios.get(`${configs.backend_url}/blogs/bulk`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }).then(resp => {
                    console.log(resp.data);
                    setBlogs(resp.data.blogs);
                    setLoading(false)
                    console.log("loading = "+loading);
                }).catch(err => {
                    console.error(err);
                    navigate('/error', {state: {error: err.response.data.error}});
                })
            }
        // } else {
        //     // navigate('/signup');
        // }
    }, [id]);

    return {
        loading, 
        blogs
    }
}

export const useFalana = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Get all the blogs");
        axios.get(`${configs.backend_url}/blogs/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }).then(resp => {
            console.log(resp.data);
            setBlogs(resp.data);
            setLoading(false)
            console.log("loading = "+loading);
        }).catch(err => {
            console.error(err);
            navigate('/error', {state: {error: err.response.data.error}});
        })
    }, []);

    return {loading, blogs}
}