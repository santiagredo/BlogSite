import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search_bar } from './SearchBar';
import { Dropdown_menu } from './DropdownMenu';
import './Header.css';


export function Header () {
    const navigate = useNavigate();

    return (
        <header className='header_container'>
            <a key={'/'} onClick={(e) => {navigate('/'), e.preventDefault()}} href="">Home</a>
            <Search_bar/>
            <Dropdown_menu/>
        </header>
    );
};
