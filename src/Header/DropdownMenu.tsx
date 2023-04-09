import React from "react";
import { useNavigate } from 'react-router-dom';
import { use_auth } from "../auth";
import { Profile_name } from '../Profile/ProfilePage';
import { Login_modal_context, Logout_modal_context } from "../Session/ModalContext";
import { Login_page } from "../Session/LoginPage";
import { Logout_page } from "../Session/LogoutPage";
import './DropdownMenu.css';

export function Dropdown_menu () {
    const navigate = useNavigate();
    const auth = use_auth();

    const side_menu_icon = new URL("./assets/side_menu.png", import.meta.url).href;
    
    const [side_menu, set_side_menu] = React.useState(false);

    const { login_open, set_login_open } = React.useContext(Login_modal_context); 

    const { logout_open, set_logout_open} = React.useContext(Logout_modal_context);

    const create_redirect = () => {
        navigate('/create');
    };

    const prevent_scroll = () => {
        document.body.style.overflow = "hidden";
    };

    React.useEffect(() => {
        if (side_menu) {
            prevent_scroll();
        };
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [side_menu]);

    return (
        <React.Fragment>
            <div className="dropdown_container">
                <button className='side_menu_toggle' onClick={() => {set_side_menu(!side_menu)}}>
                    <img alt="side menu icon" src={side_menu_icon}/>
                </button>
                {side_menu && (
                    <div className='side_menu'>
                        <button onClick={() => {set_side_menu(false)}}>
                            ❌
                        </button>
                        {auth?.user && (
                            <React.Fragment>
                                <Profile_name/>
                                <a key={'/profile'} onClick={(e) => {navigate('/profile'), e.preventDefault(), set_side_menu(false)}} href="">
                                    Profile
                                </a>
                                <a onClick={(e) => {create_redirect(), e.preventDefault(), set_side_menu(false)}} href="">
                                    Create Blog
                                </a>
                                <a key={'/Blogs'} onClick={(e) => {navigate('/blog'), e.preventDefault(), set_side_menu(false)}} href="">
                                    All Blogs
                                </a>
                                <a onClick={(e) => {set_logout_open(true), e.preventDefault(), set_side_menu(false)}} href="">
                                    Logout
                                </a>
                            </React.Fragment>
                        )}

                        {!auth?.user && (
                            <React.Fragment>
                                <a key={'/Blogs'} onClick={(e) => {navigate('/blog'), e.preventDefault(), set_side_menu(false)}} href="">
                                    All Blogs
                                </a>
                                <a onClick={(e) => {set_login_open(true), e.preventDefault(), set_side_menu(false)}} href="">
                                    Login
                                </a>
                            </React.Fragment>
                        )}
                    </div>  
                )}
            </div>

            {login_open && <Login_page/>}
            {logout_open && <Logout_page/>}
        </React.Fragment>
    );
};