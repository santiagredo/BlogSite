import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { use_auth, Auth_route, users } from "../auth";
import { Profiles_management } from "./ProfilesManagement";
import { Profiles_generator } from "./ProfilesGenerator";
import './ProfilePage.css';

export function Profile_name () {
    const auth = use_auth();

    return (
        <Auth_route>
            <p>{auth?.user?.username}</p>
        </Auth_route>
    );
};

export function Profile_page () {
    const navigate = useNavigate();
    const auth = use_auth();

    if (!auth?.user) {return <Navigate to='/'/>};
    
    const [delete_confirmation_open, set_delete_confirmation_open] = React.useState(false);
    const [edit_profile, set_edit_profile] = React.useState(false);
    const [admin_panel, set_admin_panel] = React.useState(false);

    const [username, set_username] = React.useState(auth!.user!.username);
    const [fullName, set_fullname] = React.useState(auth!.user!.fullName);
    const [email, set_email] = React.useState(auth!.user!.email);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {e.preventDefault()};

    const update_account = () => {
        if (users.some(user => user.username === username) && auth!.user!.username !== username ) {
            alert('User already exists')
        } else {
            set_edit_profile(false);
            return (
                auth!.user!.fullName = fullName,
                auth!.user!.username = username,
                auth!.user!.email = email
            );
        };
    };

    const delete_account = () => {
        const current_user = String(auth!.user!.username);

        const active_user = users.find(ele => ele.username === current_user);

        alert('The account has been deleted');

        auth!.logout();

        users.splice(users.indexOf(active_user!), 1);
        set_delete_confirmation_open(false);
        // console.log(users);
        navigate('/');
    };

    const reset_form = () => {
        set_fullname(auth!.user!.fullName);
        set_username(auth!.user!.username);
        set_email(auth!.user!.email);
        set_edit_profile(false);
    };
    
    return (
        <React.Fragment>
            
            {auth?.user && !delete_confirmation_open && !edit_profile &&(
                <div className="profile_details_container">   
                    <h1>Welcome {auth?.user?.fullName}</h1>
                    <h3>Username: {auth?.user?.username}</h3>
                    <h3>Email: {auth?.user?.email}</h3>
                    <h3>Role: {auth?.user?.role}</h3>

                    <div className="profile_options_buttons_container">
                        <button onClick={() => set_edit_profile(true)}>Edit</button>
                        <button onClick={() => set_delete_confirmation_open(true)}>Delete account</button>
                    </div>
                </div>
            )}
            {delete_confirmation_open && !edit_profile &&(
                <div className="profile_details_container">
                    <h2>Do you want to delete your account?</h2>
                    <div className="delete_confirmation_buttons_container">
                        <button onClick={() => delete_account()}>Delete</button>
                        <button onClick={() => set_delete_confirmation_open(false)}>Cancel</button>
                    </div>   
                </div>
            )}
            {edit_profile && (
                <div className="edit_profile_container">
                    <h1>Welcome {auth?.user?.fullName}</h1>
                    <h1>Edit profile:</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <label>Username: </label>
                        <input className="username_input" type='text' value={username} onChange={(e) => set_username(e.target.value)}/>
                        
                        <label>Full name:</label>
                        <input className="fullname_input" type='text' value={fullName} onChange={(e) => set_fullname(e.target.value)}/>

                        <label>Email</label>
                        <input className="email_input" type='email' value={email} onChange={(e) => set_email(e.target.value)}/>

                        <div className="edit_profile_buttons_container">
                            <button onClick={() => reset_form()}>Cancel</button>
                            <button onClick={() => {update_account()}}>Save</button>
                        </div>
                    </form>
                </div>
            )}
            

            <div className="administration_panel_container">
                {auth?.user?.role === 'admin' && !admin_panel && !delete_confirmation_open && (
                    <div className="toggle_administration_panel_button_container">
                        <button onClick={() => set_admin_panel(true)}>Open administration panel</button>    
                    </div>
                )}
                {admin_panel && !delete_confirmation_open && (
                    <div className="toggle_administration_panel_button_container">
                        <button onClick={() => set_admin_panel(false)}>Close administration panel</button>
                    </div>
                )}
                {admin_panel && !delete_confirmation_open && <Profiles_generator/>}
                {admin_panel && !delete_confirmation_open && <Profiles_management/>}
            </div>
        </React.Fragment>
    );
}