import React from "react";
import { useNavigate } from "react-router-dom";
import { use_auth } from "../auth";
import { users, User } from "../auth";
import './ProfilesManagement.css';
import { blog_data } from "../Blog/BlogData";

export function Profiles_management () {

    const [showprofiles, setShowProfiles] = React.useState(false);

    function Profiles_renderer () {
        const auth = use_auth();
        // const navigate = useNavigate();
    
        const current_user = String(auth?.user?.username);
    
        return (
            <React.Fragment>
                        {users.map((ele) => {
                            if (ele.username !== current_user) {
                                return Profile_editor(ele)
                            };
                        })}
            </React.Fragment>
        );
    };

    return (
        <div className="manage_profiles_container">
            <h1>Manage profiles</h1>

            {!showprofiles && (<button className="show_profiles_button" onClick={() => setShowProfiles(true)}>Show profiles</button>)}
            {showprofiles && (<button className="show_profiles_button" onClick={() => setShowProfiles(false)}>Hide profiles</button>)}
            {showprofiles && <Profiles_renderer/>}
        </div>
    );
};





function Profile_editor (ele: User) {
    const navigate = useNavigate();

    const [edit_profile, set_edit_profile] = React.useState(false);

    const [delete_confirmation_open, set_delete_confirmation_open] = React.useState(false);

    const [fullName, set_fullname] = React.useState(ele.fullName);
    const [username, set_username] = React.useState(ele.username);
    const [email, set_email] = React.useState(ele.email);
    const [role, set_role] = React.useState(ele.role);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {e.preventDefault()};

    const delete_account = (user: string) => {
        const active_user = users.find(ele => ele.username === user);

        alert('The account has been deleted');

        users.splice(users.indexOf(active_user!), 1);

        navigate('/profile');
    };

    const update_account = () => {
        if (users.some(user => user.username === username && user.user_id !== ele.user_id)) {
            alert('User already exists')
        } else {
            set_edit_profile(false);
            blog_data.forEach((post) => {
                if (post.author === ele.username) {
                    return post.author = username; 
                };
            });
            users.find((profile) => {
                if (profile.user_id === ele.user_id) {
                    return (
                        profile.fullName = fullName,
                        profile.username = username,
                        profile.email = email,
                        profile.role = role
                    );
                };
            });
            // console.log(users);
        };
    };

    const reset_form = () => {
        set_fullname(ele.fullName);
        set_username(ele.username);
        set_email(ele.email);
        set_role(ele.role);
        set_edit_profile(false);
    };

    return (
        <div className="single_profile_details_container" key={ele.username}>
            {!edit_profile && !delete_confirmation_open &&(
                
                <React.Fragment>
                    <p>Full name: {ele.fullName} </p>
                    <p>Username: {ele.username} </p>
                    <p>Email: {ele.email} </p>
                    <p>Role: {ele.role} </p>
                    <p>Id: {ele.user_id}</p>
                    {ele.role !== 'admin' && (
                        <div className="individual_profile_options_buttons_container">
                            <button onClick={() => set_edit_profile(true)}>Edit</button>
                            <button onClick={() => set_delete_confirmation_open(true)}>Delete</button>
                        </div>
                    )}
                </React.Fragment>
            )}
            {edit_profile && !delete_confirmation_open && (
                <div className="edit_individual_profile_container">
                    <form onSubmit={handleSubmit}>
                        <label>Full name: </label>
                        <input type='text' value={fullName} onChange={(e) => set_fullname(e.target.value)}/>

                        <label>Username: </label>
                        <input type='text' value={username} onChange={(e) => set_username(e.target.value)}/>

                        <label>Email: </label>
                        <input type='email' value={email} onChange={(e) => set_email(e.target.value)}/>

                        <label>Role: </label>
                        <select value={role} onChange={(e) => set_role(e.target.value)}>
                            <option value='editor'>editor</option>
                            <option value='admin'>admin</option>
                        </select>
                        
                        <button onClick={() => {update_account()}}>Save</button>
                    </form>
                    <button onClick={() => reset_form()}>Cancel</button>
                </div>
            )}
            {delete_confirmation_open && (
                <React.Fragment>
                    <div className="delete_individual_profile_container">
                        <h1>Do you want to delete {ele.username}'s account?</h1>
                        
                        <div className="delete_individual_profile_confirmation_buttons_container">
                            <button onClick={() => set_delete_confirmation_open(false)}>Cancel</button>
                            <button onClick={() => delete_account(ele.username)}>Delete</button>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};