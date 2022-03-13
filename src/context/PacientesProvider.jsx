import { useState, createContext } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    const obtenerPacientes = async () => {
        try {
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

            const respuesta = await clienteAxios('/pacientes', config);

            setPacientes(respuesta.data);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    const crearPaciente = async paciente => {
        try {
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

            const respuesta = await clienteAxios.post('/pacientes', paciente, config);
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = respuesta.data;

            setPacientes([pacienteAlmacenado, ...pacientes]);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    const editarPaciente = async paciente => {
        try {
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

            const respuesta = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === respuesta.data._id ? respuesta.data : pacienteState);

            setPacientes(pacientesActualizados);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Confirmas que deseas eliminar?');

        if (!confirmar) {
           return; 
        }

        try {
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

            const respuesta = await clienteAxios.delete(`/pacientes/${id}`, config);

            const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== id);

            setPacientes(pacientesActualizados);
        } catch (error) {
            console.log(error.response.data.msg);
        }

    }

    const resetPacientes = () => {
        setPacientes([]);
        setPaciente({});
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                setPacientes,
                paciente,
                setPaciente,
                obtenerPacientes,
                crearPaciente,
                editarPaciente,
                eliminarPaciente,
                resetPacientes
            }}
        >
            {children}
        </PacientesContext.Provider>
    );
}

export default PacientesContext;
