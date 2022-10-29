import React, { createContext, useEffect, useState } from 'react';
import { GetLogin } from "../fetchers/GetLogin.js"

const UserContext = createContext();

function AuthProvider({ children }) {
    const [authenticate, setAuthenticate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [emailAndPasswordInvalid, setEmailAndPasswordInvalid] = useState(true);

    async function handleLogin(email, password) {
        const autorizationAuth = await GetLogin(email, password);
        console.log(autorizationAuth)
        if (autorizationAuth.status === 200) {
            let responseJson = await autorizationAuth.json();
            localStorage.setItem("token", responseJson.token);
            localStorage.setItem("userId", responseJson.idusuario);
            window.location.href = "/gestao"
        } else {
            setEmailAndPasswordInvalid(false);
        }
    }

    return (
        <UserContext.Provider value={{ authenticate, setAuthenticate, handleLogin, loading, setLoading, emailAndPasswordInvalid, setEmailAndPasswordInvalid }}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, AuthProvider };


