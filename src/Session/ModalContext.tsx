import React from "react";

type Props = {
    children: React.ReactNode;
};

type Login_modal_context_type = {
    login_open: boolean,
    set_login_open: React.Dispatch<React.SetStateAction<boolean>>
};

export const Login_modal_context = React.createContext<Login_modal_context_type>({
    login_open: false, 
    set_login_open: () => {}
});

export function Login_modal_provider ({children}: Props) {
    const [login_open, set_login_open] = React.useState(false);

    return (
        <Login_modal_context.Provider value={{login_open, set_login_open}}>
            {children}
        </Login_modal_context.Provider>
    );
};


type Logout_modal_context_type = {
    logout_open: boolean,
    set_logout_open: React.Dispatch<React.SetStateAction<boolean>>
};

export const Logout_modal_context = React.createContext<Logout_modal_context_type>({
    logout_open: false, 
    set_logout_open: () => {}
});

export function Logout_modal_provider ({children}: Props) {
    const [logout_open, set_logout_open] = React.useState(false);

    return (
        <Logout_modal_context.Provider value={{logout_open, set_logout_open}}>
            {children}
        </Logout_modal_context.Provider>
    );
};


type Signup_modal_context_type = {
    signup_open: boolean,
    set_signup_open: React.Dispatch<React.SetStateAction<boolean>>
};

export const Signup_modal_context = React.createContext<Signup_modal_context_type>({
    signup_open: false, 
    set_signup_open: () => {}
});

export function Signup_modal_provider ({children}: Props) {
    const [signup_open, set_signup_open] = React.useState(false);

    return (
        <Signup_modal_context.Provider value={{signup_open, set_signup_open}}>
            {children}
        </Signup_modal_context.Provider>
    );
};
