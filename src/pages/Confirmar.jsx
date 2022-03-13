import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const Confirmar = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/usuarios/confirmar/${token}`;
                const respuesta = await clienteAxios(url);

                setCuentaConfirmada(true);
                setAlerta({ msg: respuesta.data.msg, error: false });
            } catch (error) {
                setAlerta({ msg: error.response.data.msg, error: true });
            }

            setCargando(false);
        }

        confirmarCuenta();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-4xl">Confirma tu Cuenta y comienza a administrar <span className="text-black">tus Pacientes</span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {!cargando && <Alerta alerta={alerta} />}
                {cuentaConfirmada && <Link to="/" className='block text-center my-5 text-gray-500'>Inicia sesión</Link>}
            </div>
        </>
    )
}

export default Confirmar;
