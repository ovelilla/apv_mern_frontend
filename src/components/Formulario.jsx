import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {
    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [alerta, setAlerta] = useState({});

    const { paciente, crearPaciente, editarPaciente } = usePacientes();

    useEffect(() => {
        if (paciente?.nombre) {
            setId(paciente._id)
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    }, [paciente]);


    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        setAlerta({});

        if (id) {
            editarPaciente({ id, nombre, propietario, email, fecha, sintomas });
            setAlerta({ msg: 'Paciente actualizado correctamente', error: false });
            return;
        }

        crearPaciente({ nombre, propietario, email, fecha, sintomas });

        setAlerta({ msg: 'Paciente guardado correctamente', error: false });

        setId('')
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
    }

    return (
        <>
            <h2 className="text-center text-xl">Añade tus pacientes y <span className="text-indigo-600 font-bold">Administralos</span></h2>

            <form className='mt-5 shadow-lg px-5 py-10 rounded-xl bg-white' onSubmit={handleSubmit} >
                {alerta.msg && <Alerta alerta={alerta} />}

                <div>
                    <label htmlFor="nombre" className="text-gray-600 block text-lg uppercase font-bold">Nombre mascota</label>
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="Nombre de la Mascota"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label htmlFor="propietario" className="text-gray-600 block text-lg uppercase font-bold">Nombre propietario</label>
                    <input
                        type="text"
                        name="propietario"
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label htmlFor="email" className="text-gray-600 block text-lg uppercase font-bold">Email propietario</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email del propietario"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label htmlFor="fecha" className="text-gray-600 block text-lg uppercase font-bold">Fecha alta</label>
                    <input
                        type="date"
                        name="fecha"
                        id="fecha"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label htmlFor="sintomas" className="text-gray-600 block text-lg uppercase font-bold">Síntomas</label>
                    <textarea
                        name="sintomas"
                        id="sintomas"
                        placeholder="Describe los síntomas de la Mascota"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 text-white w-full py-3 px-10 rounded-lg uppercase font-bold mt-5 cursor-pointer transition-colors hover:bg-indigo-700 md:w-auto"
                    value={id ? 'Guardar cambios' : 'Añadir paciente'}
                />
            </form>
        </>
    );
}

export default Formulario;