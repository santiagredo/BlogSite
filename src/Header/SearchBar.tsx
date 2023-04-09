import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { blog_data } from "../Blog/BlogData";
import { Search_context } from "./SearchContext";
import './SearchBar.css';

export function Search_bar () {
    const navigate = useNavigate();
    const { set_results, set_query } = React.useContext(Search_context);
    const [searchValue, setSearchValue] = React.useState('');

    const Search_results = () => {
        const query = searchValue.toLowerCase();

        const results = blog_data.filter((blog) => {
            return blog.content.toLowerCase().includes(query) || blog.author.toLowerCase().includes(query) ||
            blog.title.toLowerCase().includes(query)
        });
        set_query(searchValue);
        set_results(results);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {e.preventDefault()};

    return (
        <div className="search_bar_div">
            <form onSubmit={handleSubmit}>
                <input 
                    className="search_bar_input"
                    type="search" 
                    placeholder="Search in blogs" 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                    <button
                        className="search_bar_button"
                        type="button"
                        onClick={() => {Search_results(), navigate(`/search/${searchValue}`)}}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                navigate(`/search/${searchValue}`);
                                Search_results();
                            };
                        }}
                        >
                            🔍
                    </button>
            </form>
        </div>
    );
};


export function Search_results () {
    const { results, query } = React.useContext(Search_context);
    // console.log(results)
    return (
        <React.Fragment>
            {results.length > 0 && query.length !== 0 && (
                <div className="search_results_container">
                    <h1>Search results for: {query}</h1>
        
                    {results.map((ele) => {
                        return (
                            <div key={ele.slug}>
                                <Link to={`/post/${ele.blog_id}/${ele.slug}`} style={{fontSize: '2rem'}}>
                                    {ele.title}
                                </Link>
                                <p>{ele.content}</p>
                                <p>Author: {ele.author}</p>
                            </div>
                        )
                    })}
                </div>
            )}
            {results.length === 0 && query.length !== 0 && (
                <div className="search_results_container">
                    <h1>No results for: {query}</h1>
                </div>
            )}
        </React.Fragment>
    );
};