import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/layout/Layout';

import Login from './screens/Authentication/Login';
import Signup from './screens/Authentication/Signup';

import OnBoarding from './screens/OnBoarding/OnBoarding';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {path: "/", element: <h1>Home</h1>},
            {path: "/login", element: <Login />},
            {path: "/register", element: <Signup />},
            {path: "/onboarding", element: <OnBoarding />},

            {path: "*", element: <h1>404 Not Found</h1>}
        ]
    }
])

export default router