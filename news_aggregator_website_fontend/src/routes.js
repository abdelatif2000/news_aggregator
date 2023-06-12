import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Preference from "./views/Preference";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/preference",
                element: <Preference />
            },
            {
                path: "/",
                element: <Home />
            },
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [

            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
        ]
    }


])
export default routes; 