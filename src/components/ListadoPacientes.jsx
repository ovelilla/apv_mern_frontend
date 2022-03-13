import { PureComponent } from "react";
import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();

  return (
    <>
      {pacientes.length
        ?
        <>
          <h2 className="text-center text-xl">Listado de <span className="text-indigo-600 font-bold">Pacientes</span></h2>

          {pacientes.map(paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
        :
        <>
          <h2 className="text-center text-xl">No has añadido <span className="text-indigo-600 font-bold">Pacientes</span></h2>
          <p className="mt-5 text-center">Comienza agregando pacientes </p>
        </>
      }
    </>
  );
}

export default ListadoPacientes;