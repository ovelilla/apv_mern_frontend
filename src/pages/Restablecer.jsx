import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const Restablecer = () => {
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                const url = `/usuarios/recuperar/${token}`;
                const respuesta = await clienteAxios(url);

                setTokenValido(true);
                setAlerta({ msg: respuesta.data.msg, error: false });
            } catch (error) {
                setAlerta({ msg: error.response.data.msg, error: true });
            }
        }

        comprobarToken();
    }, []);


    const handleSubmit = async e => {
        e.preventDefault();

        if (!password) {
            setAlerta({ msg: 'El password es obligatorio', error: true });
            return;
        }
        if (password.length < 6) {
            setAlerta({ msg: 'El password es muy corto', error: true });
            return;
        }
        if (password !== repetirPassword) {
            setAlerta({ msg: 'Los passwords no coinciden', error: true });
            return;
        }

        setAlerta({});

        try {
            const url = `/usuarios/recuperar/${token}`;
            const respuesta = await clienteAxios.post(url, { password });

            setPasswordModificado(true);
            setAlerta({ msg: respuesta.data.msg, error: false });
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true });
        }
    }


    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-4xl">Restablece tu password y no Pierdas Acceso <span className="text-black">tus Pacientes</span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {alerta.msg && <Alerta alerta={alerta} />}

                {tokenValido && !passwordModificado &&
                    <form onSubmit={handleSubmit} >
                        <div className="my-5">
                            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
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
                            value="Restablecer"
                            className="bg-indigo-600 text-white w-full py-3 px-10 rounded-lg uppercase font-bold mt-5 cursor-pointer transition-colors hover:bg-indigo-700 md:w-auto"
                        />
                    </form>
                }

                {passwordModificado && <Link to="/" className='block text-center my-5 text-gray-500'>Inicia sesión</Link>}

            </div>
        </>
    )
}

export default Restablecer;