// /src/router.jsx (Asumiendo React Router v6)

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import QuotingPage from './pages/Quoting/Quoting';
import SummaryPage from './pages/Summary/Summary';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        // Esta es la ruta a la que navegas desde el botón "Cotiza aquí"
        path: '/planes-detallados', 
        element: <QuotingPage />,
    },
    {
        path: '/resumen',
        element: <SummaryPage />,
    },
]);

const Router = () => <RouterProvider router={router} />;
export default Router;