import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";

const CambiarPassword = () => {
    const [password, setPassword] = useState({
        password_actual: '',
        password_nuevo: ''
    });
    const [alerta, setAlerta] = useState({});

    const { actualizarPassword } = useAuth();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setPassword({ ...password, [name]: value });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (Object.values(password).some(campo => campo === '')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        if (password.password_nuevo.length < 6) {
            setAlerta({ msg: 'El password debe tener mínimo 6 caracteres', error: true });
            return;
        }

        setAlerta({});

        const resultado = await actualizarPassword(password);

        setAlerta(resultado);
    }

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Password aquí</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    {alerta.msg && <Alerta alerta={alerta} />}

                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label htmlFor="password_actual" className="text-gray-600 block text-lg uppercase font-bold">Password actual</label>
                            <input
                                type="password"
                                name="password_actual"
                                id="password_actual"
                                placeholder="Escribe tu password actual"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                                value={password.password_actual || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="my-5">
                            <label htmlFor="password_nuevo" className="text-gray-600 block text-lg uppercase font-bold">Password nuevo</label>
                            <input
                                type="password"
                                name="password_nuevo"
                                id="password_nuevo"
                                placeholder="Escribe tu password nuevo"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                                value={password.password_nuevo || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <input
                            type="submit"
                            className="bg-indigo-600 text-white w-full py-3 px-10 rounded-lg uppercase font-bold mt-5 cursor-pointer transition-colors hover:bg-indigo-700 md:w-auto"
                            value="Actualizar password"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default CambiarPassword;