
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './LayoutComponents/Navbar';
import { useStateContext } from '../contexts/ContextProvider';

export default function DefaultLayout() {
    const { token } = useStateContext();
    if (!token) {
        return <Navigate to={'/login'} />
    }
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}
