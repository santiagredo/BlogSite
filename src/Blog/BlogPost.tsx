import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { use_auth } from "../auth";
import { blog_data } from "./BlogData";
import './Blog.css';


export function Blog_post () {
    const navigate = useNavigate();
    const { slug } = useParams();

    const auth = use_auth();

    const blog_post = blog_data.find((post) => post.slug === slug);

    const can_delete = blog_post?.author === auth?.user?.username || String(auth?.user?.role) === 'admin';

    const [delete_confirmation_open, set_delete_confirmation_open] = React.useState(false);
    
    const [edit_post, set_edit_post] = React.useState(false);
    const [edit_title, set_edit_title] = React.useState(blog_post!.title);
    const [edit_content, set_edit_content] = React.useState(blog_post!.content);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {e.preventDefault()};

    const return_to_blog = () => {
        navigate(-1);
    };

    const delete_blog_post = () => {
        blog_data.splice(blog_data.indexOf(blog_post!), 1);
        alert('Blog successfully deleted');
        navigate('/')
    };

    const reset_form = () => {
        set_edit_title(blog_post!.title);
        set_edit_content(blog_post!.content);
        set_edit_post(false);
    };

    const save_changes = () => {
        blog_post!.title = edit_title;
        blog_post!.content = edit_content;
        set_edit_post(false);
    };

    return (
        <React.Fragment>
            <div className='return_button_container'>
                <button onClick={return_to_blog}>Return</button>
            </div>

            {!edit_post && (
                <div className='post_container'>
                    <h2>{blog_post!.title}</h2>

                    <p>{blog_post!.content.split('\n').map((line, index) => {return <React.Fragment>{line}<br/></React.Fragment>})}</p>
                    <p>By: {blog_post!.author}</p>

                    <div className='edition_options_container'>
                        {can_delete && !delete_confirmation_open && (
                            <button onClick={() => set_delete_confirmation_open(true)}>Delete blog</button>
                        )}
                        {blog_post!.author === auth?.user?.username && !delete_confirmation_open && (
                            <button onClick={() => set_edit_post(true)}>Edit blog</button>
                        )}
                        {delete_confirmation_open && (
                            <div className='delete_post_container'>
                                <p>Do you want to delete this post?</p>

                                <div>
                                    <button onClick={delete_blog_post}>Delete</button>
                                    <button onClick={() => set_delete_confirmation_open(false)}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {edit_post && (
                <React.Fragment>
                    <div className='edit_post_container'>
                        <form onSubmit={handleSubmit}>
                            <label>Title: </label>
                            <input className='title_input' value={edit_title} onChange={(e) => set_edit_title(e.target.value)}/>

                            <label>Content: </label>
                            <textarea className='content_input' value={edit_content} onChange={(e) => set_edit_content(e.target.value)}/>
                        </form>

                        <div>
                            <button onClick={() => reset_form()}>Cancel</button>
                            <button onClick={() => save_changes()}>Save</button>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};
