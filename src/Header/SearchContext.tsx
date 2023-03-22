import React from "react";
import { blog_object } from "../Blog/BlogData";


type Search_context_type = {
    results: blog_object[];
    set_results: React.Dispatch<React.SetStateAction<blog_object[]>>;
    query: string;
    set_query: React.Dispatch<React.SetStateAction<string>>;
};

export const Search_context = React.createContext<Search_context_type>({
    results: [],
    set_results: () => {},
    query: "",
    set_query: () => {},
});

type Props = {
    children: React.ReactNode;
};

export function Search_provider ({children}: Props) {
    const [results, set_results] = React.useState<blog_object[]>([]);
    const [query, set_query] = React.useState('');

    return (
        <Search_context.Provider value={{results, set_results, query, set_query}}>
            {children}
        </Search_context.Provider>
    );
};