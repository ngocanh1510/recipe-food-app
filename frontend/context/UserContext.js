
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        image: "https://via.placeholder.com/100"
    });

    const updateUserData = (newData) => {
        setUserData(prev => ({ ...prev, ...newData }));
    };

    return (
        <UserContext.Provider value={{ userData, updateUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);