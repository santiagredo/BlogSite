import React from "react";
import ReactDOM from "react-dom";
import { use_auth } from "../auth";
import { Logout_modal_context } from "./ModalContext";
import './LogoutPage.css';


export function Logout_page () {
    const auth = use_auth();

    const { logout_open, set_logout_open} = React.useContext(Logout_modal_context);


    const logout = (e: React.FormEvent) => {
        e.preventDefault();
        auth?.logout();
        set_logout_open(false)
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
            {logout_open && (
                <div className="session_container">
        
                    <form className="logout_form" onSubmit={logout}>
                    <h1>Logout</h1>
                        <label>Do you want to logout?</label>
                    </form>

                    <div className="logout_buttons_container">
                        <button onClick={() => {set_logout_open(false)}}>
                            Cancel
                        </button>
                        <button onClick={logout} type="submit">Logout</button>
                    </div>
                </div>
            )}
        </React.Fragment>,
        document.getElementById('session_modal')!
    );
};
