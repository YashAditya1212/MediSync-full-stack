import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const { backendUrl } = props; // Get backendUrl from AppContext
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userData, setUserData] = useState(null);

    // Load user profile when token exists
    useEffect(() => {
        if (token) {
            loadUserProfile();
        }
    }, [token]);

    const loadUserProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
                headers: { token }
            });
            if (data.success) {
                setUserData(data.userData);
            }
        } catch (error) {
            console.error('Failed to load user profile:', error);
            // If token is invalid, clear it
            if (error.response?.status === 401) {
                logout();
            }
        }
    };

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        setToken(null);
        setUserData(null);
        localStorage.removeItem('token');
    };

    const value = {
        token,
        userData,
        setUserData,
        login,
        logout,
        loadUserProfile,
        backendUrl
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;



