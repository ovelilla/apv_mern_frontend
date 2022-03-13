import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';
import Login from './pages/Login';
import Confirmar from './pages/Confirmar';
import Registrar from './pages/Registrar';
import Recuperar from './pages/Recuperar';
import Restablecer from './pages/Restablecer';
import AdministrarPacientes from './pages/AdministrarPacientes';
import EditarPerfil from './pages/EditarPerfil';
import CambiarPassword from './pages/CambiarPassword';
import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='confirmar/:token' element={<Confirmar />} />
              <Route path='recuperar' element={<Recuperar />} />
              <Route path='recuperar/:token' element={<Restablecer />} />
            </Route>

            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='cambiar-password' element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
