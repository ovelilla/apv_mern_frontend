import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <>
            <main className="container mx-auto md:grid grid-cols-2 mt-12 p-5 gap-12">
                <Outlet />
            </main>
        </>
    )
}

export default AuthLayout;