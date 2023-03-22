import React from "react";
import ReactDOM from "react-dom";
import { use_auth } from "../auth";
import { Logout_modal_context } from "./ModalContext";


export function Logout_page () {
    const auth = use_auth();

    const { logout_open, set_logout_open} = React.useContext(Logout_modal_context);


    const logout = (e: React.FormEvent) => {
        e.preventDefault();
        auth?.logout();
        set_logout_open(false)
    }; 

    return ReactDOM.createPortal (
        <React.Fragment>
            {logout_open && (
                <div className="session_container">
                    <h1>Logout</h1>
        
                    <form onSubmit={logout}>
                        <label>Do you want to logout?</label>
                    </form>

                    <div className="logout_buttons_container">
                        <button onClick={logout} type="submit">Logout</button>
                        <button onClick={() => {set_logout_open(false)}}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </React.Fragment>,
        document.getElementById('session_modal')!
    );
};
