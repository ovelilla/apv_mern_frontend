import formatearFecha from "../helpers/formatearFecha";
import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
    const { _id, email, fecha, nombre, propietario, sintomas } = paciente;

    const { setPaciente, eliminarPaciente } = usePacientes();

    return (
        <div className="mt-5 shadow-lg px-6 py-8 rounded-xl bg-white">
            <p className="font-bold uppercase text-indigo-700 my-2">Nombre mascota: <span className="font-normal normal-case text-black">{nombre}</span></p>
            <p className="font-bold uppercase text-indigo-700 my-2">Propietario: <span className="font-normal normal-case text-black">{propietario}</span></p>
            <p className="font-bold uppercase text-indigo-700 my-2">Email contacto: <span className="font-normal normal-case text-black">{email}</span></p>
            <p className="font-bold uppercase text-indigo-700 my-2">Fecha de alta: <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span></p>
            <p className="font-bold uppercase text-indigo-700 my-2">Sintomas: <span className="font-normal normal-case text-black">{sintomas}</span></p>
            <div className="flex justify-between mt-5">
                <button
                    className="w-full py-2 px-10 rounded-lg uppercase font-bold cursor-pointer transition-colors bg-indigo-600 text-white hover:bg-indigo-700 md:w-auto"
                    onClick={() => setPaciente(paciente)}
                >Editar</button>
                <button
                    className="w-full py-2 px-10 rounded-lg uppercase font-bold cursor-pointer transition-colors bg-red-600 text-white hover:bg-red-700 md:w-auto"
                    onClick={() => eliminarPaciente(_id)}
                >Eliminar</button>
            </div>
        </div>
    );
}

export default Paciente;