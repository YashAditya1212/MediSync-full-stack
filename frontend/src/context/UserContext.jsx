import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const { backendUrl } = props;
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userData, setUserData] = useState(null);

    // Load user profile whenever token changes
    useEffect(() => {
        if (token) {
            loadUserProfile();
        } else {
            setUserData(null);
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
        setUserData,       // ← exposed so MyProfile can do optimistic updates
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