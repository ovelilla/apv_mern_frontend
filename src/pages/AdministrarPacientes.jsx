import { useState, useEffect } from "react";
import usePacientes from "../hooks/usePacientes";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  const { obtenerPacientes } = usePacientes();

  useEffect(() => obtenerPacientes(), []);
  
  return (
    <div className="flex flex-col md:flex-row gap-10">
      <button
        type="button"
        className="bg-indigo-600 text-white font-bold uppercase mx-10 py-3 px-10 rounded-md md:hidden"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>
      
      <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w:2/5 my-5 md:my-0`}>
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5 my-5 md:my-0">
        <ListadoPacientes />
      </div>
    </div>
  );
}

export default AdministrarPacientes;