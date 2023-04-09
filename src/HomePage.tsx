import React from "react";
import { Link } from "react-router-dom";
import { blog_data } from "./Blog/BlogData";
import './HomePage.css';

export function Home_Page () {
    const elements_per_page = 9;
    const total_pages = Math.ceil(blog_data.length / elements_per_page);

    const [current_page, set_current_page] = React.useState(1);

    const start_index = (current_page - 1) * elements_per_page;
    const end_index = start_index + elements_per_page;
    const current_page_posts = blog_data.slice(start_index, end_index);

    const page_numbers = [];
    for (let i = 1; i <= total_pages; i++) {
        page_numbers.push(i);
    };

    const handle_page_change = (page: number) => {
        if (page < 1) {return set_current_page(1)};
        if (page > total_pages) {return set_current_page(total_pages)};
        return set_current_page(page);
    };

    return (
        <div className="home_main_container">
            <h1>Home</h1>

            {current_page_posts.map((ele) => {
                const length = 200;
                const truncated_text = ele.content.length > 200 ? `${ele.content.slice(0, length)}...` : ele.content;

                return (
                    <div key={ele.slug} className='posts_containers'>
                        <Link to={`/post/${ele.slug}`}>
                            {ele.title}
                        </Link>
                        <p>{truncated_text}</p>
                        <p>Author: {ele.author}</p>
                    </div>
                )
            })}

            <div className='pagination_container'>
                <button type="button" className="prev_next_button" onClick={() => handle_page_change(current_page - 1)}>⬅️</button>
                {page_numbers.map((page) => (
                    <button type="button" className="pages_button" key={page} onClick={() => handle_page_change(page)} disabled={page === current_page}>
                        {page}
                    </button>
                ))}
                <button type="button" className="prev_next_button" onClick={() => handle_page_change(current_page + 1)}>➡️</button>
            </div>
        </div>
    );
};
