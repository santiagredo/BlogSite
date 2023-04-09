import React from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../auth";
import './ProfilesGenerator.css';


export function Profiles_generator () {
    const navigate = useNavigate();
    
    const [fullName, set_fullname] = React.useState('');
    const [username, set_username] = React.useState('');
    const [email, set_email] = React.useState('');
    const [role, set_role] = React.useState('editor');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {e.preventDefault()};

    const create_user = () => {
        const obj = {
            username: username,
            fullName: fullName,
            email: email,
            role: role,
            user_id: users.length + 1 || 0 + 1
        };
        // console.log(obj);

        if (users.some(user => user.username === obj.username)) {
            alert('User already exists')
        } else {
            users.unshift(obj);
            alert('User successfully created');
            
            set_fullname('');
            set_username('');
            set_email('');
            set_role('editor');

            console.log(users);
            navigate('/profile');
        };
    };


    return (
        <React.Fragment>
            <div className="profiles_generator_container">
                <h1>Create a new profile</h1>

                <form onSubmit={handleSubmit}>
                    <label>Full name</label>
                    <input className="fullname_input" type='text' value={fullName} onChange={(e) => set_fullname(e.target.value)}/>

                    <label>Username</label>
                    <input className="username_input" type='text' value={username} onChange={(e) => set_username(e.target.value)}/>

                    <label>Email</label>
                    <input className="email_input" type='email' value={email} onChange={(e) => set_email(e.target.value)}/>

                    <label>Role</label>
                    <select className="select_role" value={role} onChange={(e) => set_role(e.target.value)}>
                        <option value='editor'>editor</option>
                        <option value='admin'>admin</option>
                    </select>

                    <button onClick={create_user}>Create</button>
                </form>
            </div>
        </React.Fragment>
    );
};