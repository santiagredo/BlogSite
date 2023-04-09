import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { users, use_auth } from "../auth";
import { Login_modal_context, Signup_modal_context } from "./ModalContext";
import './SignupPage.css';


export function Signup_page () {
    const navigate = useNavigate();
    const auth = use_auth();

    const {login_open, set_login_open} = React.useContext(Login_modal_context);

    const {signup_open, set_signup_open} = React.useContext(Signup_modal_context);


    const [fullName, set_fullname] = React.useState('');
    const [username, set_username] = React.useState('');
    const [email, set_email] = React.useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {e.preventDefault()};

    const create_user = () => {
        const obj = {
            username: username,
            fullName: fullName,
            email: email,
            role: 'editor',
            user_id: users.length + 1 || 0 + 1
        };
        // console.log(obj);

        if (users.some(user => user.username === obj.username)) {
            alert('User already exists')
        } else {
            users.unshift(obj);
            alert('User successfully created');
            set_signup_open(false);
            console.log(users);
            login();
        };
    };

    const login = () => {
        auth?.login({ username });
    
        if (auth?.user) {
            set_signup_open(false);
            navigate('/profile');
        };
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
            {signup_open && (
                <div className="session_container">
                    <div className="close_signup_modal_button_container">
                        <button onClick={() => {set_signup_open(false), set_login_open(false)}}>
                            ❌
                        </button>
                    </div>
                    
                    <h1>Sign up now!</h1>
        
                    <form className="signup_form" onSubmit={handleSubmit}>
                        <label>Full name</label>
                        <input type='text' onChange={(e) => set_fullname(e.target.value)}/>
        
        
                        <label>Username</label>
                        <input type='text' onChange={(e) => set_username(e.target.value)}/>
        
                        
                        <label>Email</label>
                        <input type='email' onChange={(e) => set_email(e.target.value)}/>

                        <div className="signup_buttons_container">
                            <button onClick={() => {set_signup_open(false)}}>
                                Cancel
                            </button>
            
                            <button type="submit" onClick={create_user}>
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </React.Fragment>,
        document.getElementById('signup_modal')!
    );
};