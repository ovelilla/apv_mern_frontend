import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';
import isEmpty from '../../../backend/helpers/isEmpty';

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();

    if (cargando) {
        return 'cargando...';
    }

    return (
        isEmpty(auth) ?
            <Navigate to={'/'} />
            :
            <>
                <Header />
                <main className='container mx-auto mt-10'>
                    <Outlet />
                </main>
                <Footer />
            </>
    );
}

export default RutaProtegida;