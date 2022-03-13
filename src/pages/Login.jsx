import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const { autenticarUsuario } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({ msg: 'Hay campos vacios', error: true });
            return;
        }

        setAlerta({});

        try {
            const urlLogin = '/usuarios/login';
            const respuesta = await clienteAxios.post(urlLogin, { email, password });

            const { token } = respuesta.data;

            const urlSetCookie = '/cookies/setcookie';
            await clienteAxios.post(urlSetCookie, { name: 'token', value: token }, { withCredentials: true });

            await autenticarUsuario();

            navigate('/admin');
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true });
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-4xl">Inicia Sesión y Administra tus <span className="text-black">Pacientes</span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {alerta.msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email de registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Tu password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Iniciar sesión"
                        className="bg-indigo-600 text-white w-full py-3 px-10 rounded-lg uppercase font-bold mt-5 cursor-pointer transition-colors hover:bg-indigo-700 md:w-auto"
                    />
                </form>

                <nav className='mt-6 lg:flex lg:justify-between'>
                    <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿Aún no tienes cuenta? Regístrate</Link>
                    <Link to="/recuperar" className='block text-center my-5 text-gray-500'>Olvide mi Password</Link>
                </nav>
            </div>
        </>
    )
}

export default Login;