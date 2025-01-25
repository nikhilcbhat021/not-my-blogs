import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

const Blog = ({all=false}) => {

    const { id } = useParams();
    console.log("Inside Blog page, send the requests with auth header...");

    if (!id)
        console.log("No id is passed, to get all the blogs, send the `all` parameter as true.");

    if (all)
        console.log("Get all the blogs");

    return (
        <div>
            Blog
            <Outlet />
        </div>
    )
}

export default Blog