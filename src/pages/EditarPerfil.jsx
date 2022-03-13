import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({});
    const { auth, actualizarPerfil } = useAuth();

    useEffect(() => {
        setPerfil(auth);
    }, [auth]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setPerfil({ ...perfil, [name]: value });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const { nombre, email } = perfil;

        if ([nombre, email].includes('')) {
            setAlerta({ msg: 'Nombre y Email son obligatorios', error: true });
            return;
        }

        setAlerta({});

        const resultado = await actualizarPerfil(perfil);

        setAlerta(resultado);
    }

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Información aquí</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    {alerta.msg && <Alerta alerta={alerta} />}

                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label htmlFor="nombre" className="text-gray-600 block text-lg uppercase font-bold">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                id="nombre"
                                placeholder="Nombre"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                                value={perfil.nombre || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="my-5">
                            <label htmlFor="web" className="text-gray-600 block text-lg uppercase font-bold">Sitio web</label>
                            <input
                                type="text"
                                name="web"
                                id="web"
                                placeholder="Sitio web"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                                value={perfil.web || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="my-5">
                            <label htmlFor="telefono" className="text-gray-600 block text-lg uppercase font-bold">Teléfono</label>
                            <input
                                type="text"
                                name="telefono"
                                id="telefono"
                                placeholder="Teléfono"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                                value={perfil.telefono || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="my-5">
                            <label htmlFor="email" className="text-gray-600 block text-lg uppercase font-bold">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                                value={perfil.email || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <input
                            type="submit"
                            className="bg-indigo-600 text-white w-full py-3 px-10 rounded-lg uppercase font-bold mt-5 cursor-pointer transition-colors hover:bg-indigo-700 md:w-auto"
                            value="Guardar cambios"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditarPerfil;