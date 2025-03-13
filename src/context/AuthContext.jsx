import { createContext, useState, useEffect, useContext } from "react"; 
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    //   Register function
    const register = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password});
        if (error) {
            console.log("There was a problem signing up", error);
            return { success : false, error };
        }
        return { success : true, data };
    };

    //   Login function
    const login = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                console.log("There was a problem logging in", error);
                return { success : false, error: error.message };
            }
            console.log("Logged in", data);
            return { success : true, data };
        } catch (error) {
            console.log("There was a problem logging in", error);
            return { success : false, error: error.message };   
        }
    };

    //  Check if user is logged in
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        });
    
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        }
        );
    }, []);
  
    //   Logout function
    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
        console.log("There was a problem logging out", error);
        }
    };

  return (
    <AuthContext.Provider value={{ session, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const UserAuth = () => {
  return useContext(AuthContext);
}