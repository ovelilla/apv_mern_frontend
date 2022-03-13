import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const Registrar = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ msg: 'Hay campos vacios', error: true });
            return;
        }
        if (password.length < 6) {
            setAlerta({ msg: 'El password es muy corto', error: true });
            return;
        }
        if (password !== repetirPassword) {
            setAlerta({ msg: 'Los passwords no son iguales', error: true });
            return;
        }

        setAlerta({});

        try {
            const url = '/usuarios';
            const respuesta = await clienteAxios.post(url, { nombre, email, password });

            setNombre('');
            setEmail('');
            setPassword('');
            setRepetirPassword('');

            setAlerta({ msg: respuesta.data.msg, error: false });
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true });
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-4xl">Crea tu Cuenta y Administra <span className="text-black">tus Pacientes</span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {alerta.msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            placeholder="Tu nombreo"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
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

                    <div className="my-5">
                        <label htmlFor="repetir-password" className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
                        <input
                            type="password"
                            name="repetir-password"
                            id="repetir-password"
                            placeholder="Repite tu password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Registrar"
                        className="bg-indigo-600 text-white w-full py-3 px-10 rounded-lg uppercase font-bold mt-5 cursor-pointer transition-colors hover:bg-indigo-700 md:w-auto"
                    />
                </form>

                <nav className='mt-6 lg:flex lg:justify-between'>
                    <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes cuenta? Inicia sesión</Link>
                    <Link to="/recuperar" className='block text-center my-5 text-gray-500'>Olvide mi Password</Link>
                </nav>
            </div>
        </>
    )
}

export default Registrar;
