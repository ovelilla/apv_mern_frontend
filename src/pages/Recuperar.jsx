import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const Recuperar = () => {
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if (!email) {
            setAlerta({ msg: 'El email es obligatorio', error: true });
            return;
        }

        setAlerta({});

        try {
            const url = '/usuarios/recuperar';
            const respuesta = await clienteAxios.post(url, { email });

            setAlerta({ msg: respuesta.data.msg, error: false });
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true });
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-4xl">Recupera el Acceso y no Pierdas <span className="text-black">tus Pacientes</span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {alerta.msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit} >
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

                    <input
                        type="submit"
                        value="Recuperar"
                        className="bg-indigo-600 text-white w-full py-3 px-10 rounded-lg uppercase font-bold mt-5 cursor-pointer transition-colors hover:bg-indigo-700 md:w-auto"
                    />
                </form>

                <nav className='mt-6 lg:flex lg:justify-between'>
                    <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes cuenta? Inicia sesión</Link>
                    <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿Aún no tienes cuenta? Regístrate</Link>
                </nav>
            </div>
        </>
    )
}

export default Recuperar;
