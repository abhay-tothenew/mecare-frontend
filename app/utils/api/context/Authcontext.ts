import { createContext } from "react";


interface User{
    display_name: string;
    name: string;
    email: string;
    phone: string;
    user_type: string;
}

const AuthContext = createContext({
    user: [],
    isAuthenticated: false,
    isLoading: false,
    login: (user: User) =>[],
    logout: () => [],
});


export default AuthContext;