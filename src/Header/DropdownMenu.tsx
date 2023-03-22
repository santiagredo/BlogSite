import React from "react";
import { useNavigate } from 'react-router-dom';
import { use_auth } from "../auth";
import { Profile_name } from '../Profile/ProfilePage';
import { Login_modal_context, Logout_modal_context } from "../Session/ModalContext";
import { Login_page } from "../Session/LoginPage";
import { Logout_page } from "../Session/LogoutPage";

interface route_object {
    to: string,
    text: string,
    private: boolean
};

const routes: route_object[] = [
    { to: '/profile', text: 'Profile', private: true },
    { to: '/login', text: 'Login', private: false },
    { to: '/logout', text: 'Logout', private: true },
];

export function Dropdown_menu () {
    const navigate = useNavigate();
    const auth = use_auth();
    // const [isOpen, setIsOpen] = React.useState(false);

    const menu_ref = React.useRef<HTMLDivElement>(null);

    // const toggle = () => setIsOpen(!isOpen);
    
    const { login_open, set_login_open } = React.useContext(Login_modal_context); 

    const { logout_open, set_logout_open} = React.useContext(Logout_modal_context);

    // React.useEffect(() => {
    //     const handle_click_outside = (e: MouseEvent) => {
    //         if (menu_ref.current && !menu_ref.current.contains(e.target as Node)) {
    //             setTimeout(() => {
    //                 setIsOpen(false);
    //             }, 300);
    //         };
    //     };

    //     document.addEventListener("mousedown", handle_click_outside);

    //     return () => {
    //         document.removeEventListener("mousedown", handle_click_outside);
    //     };

    // }, [menu_ref]);

    return (
        <React.Fragment>

            {auth?.user && (
                <React.Fragment>
                    <Profile_name/>
                    <button key={'/profile'} onClick={() => {navigate('/profile')}}>
                        Profile
                    </button>
                    <button onClick={() => {set_logout_open(true)}}>
                        Logout
                    </button>
                </React.Fragment>
            )}

            {!auth?.user && (
                <React.Fragment>
                    <button onClick={() => {set_login_open(true)}}>
                        Login
                    </button>
                </React.Fragment>
            )}
            {login_open && <Login_page/>}
            {logout_open && <Logout_page/>}
        </React.Fragment>
    );
};