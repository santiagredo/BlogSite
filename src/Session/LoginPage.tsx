import React from "react";
import ReactDOM from "react-dom";
import { use_auth } from "../auth";
import { Signup_page } from './SignupPage';
import { Login_modal_context, Signup_modal_context } from './ModalContext';
import './LoginPage.css';

export function Login_page () {
    const auth = use_auth();

    const {login_open, set_login_open} = React.useContext(Login_modal_context);

    const {signup_open, set_signup_open} = React.useContext(Signup_modal_context);

    const [username, set_username] = React.useState('');

    const login = (e: React.FormEvent) => {
        e.preventDefault();
        auth?.login({ username });
    }; 

    if (auth?.user) {
        set_login_open(false);
    };

    const prevent_scroll = () => {
        document.body.style.overflow = "hidden";
    };

    React.useEffect(() => {
        prevent_scroll();
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return ReactDOM.createPortal (
        <React.Fragment>
            {login_open && (
                <div className="session_container">
                    <h1>Login</h1>

                    <form className="session_container_form" onSubmit={login}>
                        <label>Insert your username:</label>
                        <input className="login_username_input" value={username} onChange={(e) => set_username(e.target.value)}/>
                    </form>

                    <div className='buttons_container'>
                        <div className='login_cancel_container'>
                            <button className='session_buttons' onClick={() => {set_login_open(false)}}>
                                Cancel
                            </button>
                            <button className='session_buttons' onClick={login} type="submit">Login</button>
                        </div>
                        
                        <button className='signup_button' onClick={() => {set_signup_open(true)}}>
                            Sign up now!
                        </button>
                    </div>
                </div>
            )}
            {signup_open && <Signup_page/>}
        </React.Fragment>,
        document.getElementById('session_modal')!
    );
};
