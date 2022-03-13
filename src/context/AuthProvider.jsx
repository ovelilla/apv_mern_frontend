import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => autenticarUsuario(), []);

    const autenticarUsuario = async () => {
        const { data: { token } } = await clienteAxios.post('/cookies/getcookie', { cookie: 'token' }, { withCredentials: true });

        if (!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        try {
            const url = '/usuarios/perfil';
            const respuesta = await clienteAxios(url, config);

            setAuth(respuesta.data);
        } catch (error) {
            console.log(error.response.data.msg);
            setAuth({});
        }

        setCargando(false);
    }

    const cerrarSesion = async () => {
        await clienteAxios.post('/cookies/deletecookie', { cookie: 'token' }, { withCredentials: true });

        setAuth({});
    }

    const actualizarPerfil = async datos => {
        const { data: { token } } = await clienteAxios.post('/cookies/getcookie', { cookie: 'token' }, { withCredentials: true });

        if (!token) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        try {
            const url = `/usuarios/perfil/${datos._id}`;
            const respuesta = await clienteAxios.put(url, datos, config);

            return respuesta.data;
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const actualizarPassword = async datos => {
        const { data: { token } } = await clienteAxios.post('/cookies/getcookie', { cookie: 'token' }, { withCredentials: true });

        if (!token) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        try {
            const url = '/usuarios/actualizar-password';
            const respuesta = await clienteAxios.put(url, datos, config);

            return respuesta.data;
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                setCargando,
                autenticarUsuario,
                cerrarSesion,
                actualizarPerfil,
                actualizarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
