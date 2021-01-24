import { createContext } from 'react';
export const AuthContext = createContext({
    signIn: async (data: any) => { },
    signOut: () => { },
    signUp: async (data: any) => { },
});