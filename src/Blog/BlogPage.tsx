import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import { blog_data } from "./BlogData";
import './BlogPage.css';

interface Post {
    slug: string;
    title: string;
    author: string;
    blog_id: number;
};
  

function Blog_link ({ post }: { post: Post }) {
    return (
        <li>
            <div className='blog_title_container'>
                <Link to={`/post/${post.blog_id}/${post.slug}`}>{post.title}</Link>
                By: {post.author}
                <br/>
                Id: {post.blog_id}
            </div>
        </li>
    )
};

export function Blog_page () {
    return (
        <div className='blog_page_main_container'>
            <h2>Blog</h2>

            <Outlet/>
            
            <ul className='blog_ul'>
                {blog_data.map((post) => (
                    <Blog_link key={post.slug} post={post}/>
                ))}
            </ul>
        </div>
    );
};
