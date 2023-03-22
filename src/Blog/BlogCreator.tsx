import React from "react";
import { useNavigate } from 'react-router-dom';
import { use_auth } from "../auth";
import { blog_data } from "./BlogData";
import { Login_page } from "../Session/LoginPage";
import { Login_modal_context } from "../Session/ModalContext";
import './Blog.css';


export function Blog_creator () {
    const auth = use_auth();
    const navigate = useNavigate();

    const [title, set_title] = React.useState('');
    const [content, set_content] = React.useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {e.preventDefault()};

    const create_blog = () => {
        const obj = {
            title: title,
            slug: title.replaceAll(' ', '-'),
            content: content,
            author: String(auth?.user?.username)
        };

        console.log(obj);
        blog_data.unshift(obj);
        alert('Blog creado');
        navigate(`/post/${obj.slug}`);  
        reset_modal();
    };
    
    const { login_open, set_login_open } = React.useContext(Login_modal_context); 
    const reset_modal = () => {
        set_login_open(false);
    };

    return (
        <React.Fragment>
            {auth?.user && (
                <div className="blog_creator_main_container">
                    <h1>Create new blog</h1>
        
                    <form onSubmit={handleSubmit}>
                        <label>Title</label>
                        <input 
                            className="create_title_input"
                            type='text'
                            placeholder="Put your title here"
                            value={title}
                            onChange={(e) => set_title(e.target.value)}
                        />

                        <label>Content</label>
                        <textarea 
                            className="create_content_input"
                            placeholder="Put your content here"
                            value={content}
                            onChange={(e) => set_content(e.target.value)}
                        />

                        <button type='submit' onClick={create_blog}>Create</button>
                    </form>
                </div>
            )}
            {!auth?.user && (
                <div className="create_blog_redirect_container">
                    <h1>You must be logged in to create a post</h1>
                    <button onClick={() => set_login_open(true)}>
                        Login    
                    </button> 
                </div>
            )}
            {login_open && <Login_page/>}
        </React.Fragment>
    );
};