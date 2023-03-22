import React from 'react';
import { NavLink } from 'react-router-dom';
import { use_auth } from "../auth";
import { Create_button } from './CreateButton';
import { Search_bar } from './SearchBar';
import { Dropdown_menu } from './DropdownMenu';

import './Menu.css';

interface route_object {
    to: string,
    text: string,
    private: boolean
};

const routes: route_object[] = [
    { to: '/', text: 'Home', private: false },
    { to: '/blog', text: 'Blog', private: false }
];
  



export function Menu () {
    const auth = use_auth();

    const [side_menu, set_side_menu] = React.useState(false);

    return (
        <React.Fragment>
        <nav>
            <ul>
                {routes.map((route: route_object) => {
                    if (route.private && !auth?.user) return null;
                    return (
                        <li key={route.to}>
                            <NavLink to={route.to}>
                                {route.text}
                            </NavLink>
                        </li>
                    )
                })}
                <li><Search_bar/></li>
                <li>
                    <div>
                        <button className='side_menu_button' onClick={() => {set_side_menu(!side_menu)}}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </button>
                        {side_menu && (
                            <div className='side_menu'>
                                <Create_button/>
                                <Dropdown_menu/>
                            </div>
                        )}
                    </div> 
                </li>
            </ul>
        </nav>
        </React.Fragment>
    );
};
