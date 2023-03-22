import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";


//fake database


export interface User {
    username: string;
    role: string;
    fullName: string;
    email: string;
}
  
export const users: User[] = [
    {
      username: "Irisval",
      role: "admin",
      fullName: "Irisvaldo Silva",
      email: "irisvaldo.silva@example.com",
    },
    {
      username: "RetaxMaster",
      role: "admin",
      fullName: "Renato Silva",
      email: "renato.silva@example.com",
    },
    {
      username: "freddier",
      role: "admin",
      fullName: "Freddie Rojas",
      email: "freddie.rojas@example.com",
    },
    {
      username: "juanDC",
      role: "editor",
      fullName: "Juan Delgado",
      email: "juan.delgado@example.com",
    },
    {
      username: "santiagredo",
      role: "admin",
      fullName: "Santiago Agredo",
      email: "santiago.agredo@example.com",
    },
    {
        username: "mariaG",
        role: "editor",
        fullName: "Maria Gonzalez",
        email: "maria.gonzalez@example.com"
    },
    {
        username: "pabloM",
        role: "editor",
        fullName: "Pablo Martinez",
        email: "pablo.martinez@example.com"
    },
    {
        username: "luciaS",
        role: "editor",
        fullName: "Lucia Salazar",
        email: "lucia.salazar@example.com"
    }
];
  
  



interface Auth {
    user: User | null;
    login: ({ username }: { username: string }) => void;
    logout: () => void; 
};

const Auth_context = React.createContext<Auth | null>(null);

interface AuthProviderProps {
    children: React.ReactNode;
};

export function Auth_provider ({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const [user, set_user] = React.useState<User | null>(null);

    const login = ({ username }: {username: string}) => {
        const user_exists = users.find(ele => ele.username === username) || null;

        if (user_exists !== null){
            set_user(user_exists);
            console.log(user_exists?.username);
            // navigate('/profile');
        } else {
            alert(`User doesn't exist`); 
            // navigate('/login');
        };
    };

    const logout = () => {
        set_user(null);
        navigate('/');
    };

    const auth = {user, login, logout} as Auth | null ;

    return (
        <Auth_context.Provider value={auth}>
            {children}
        </Auth_context.Provider>
    );
};

export function use_auth (): Auth | null {
    const auth = React.useContext(Auth_context);
    return auth;
};

export function Auth_route (props: {children: React.ReactNode}): ReactElement | null {
    const auth = use_auth();

    return <React.Fragment>{props.children}</React.Fragment>;
};