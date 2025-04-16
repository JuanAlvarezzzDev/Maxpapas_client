import { createHashRouter } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout'
import Inicio from './views/Inicio'
import Login from './views/Login'
import Productos from './views/Productos'
import Registro from './views/Registro'
import OrdenCombo from './views/OrdenCombo'
import OrdenesEnProceso from './views/OrdenesEnProceso'
import BandejaOrdenes from './views/BandejaOrdenes'
import { Ordenes } from './views/Ordenes'
import DashBoard from './views/DashBoard'
import { CalculadoraBilletes } from './views/CalculadoraBilletes'

const router = createHashRouter([
    {
        path: '/',
        element: <Inicio />,
    },
    {
        path: '/orden/:idProducto',
        element: <OrdenCombo/>, 
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <BandejaOrdenes/>
            },
            {
                path: '/admin/pedidos-en-proceso',
                element: <OrdenesEnProceso/>
            },
            {
                path: '/admin/calculadora-billetes',
                element: <CalculadoraBilletes/>
            },
            {
                path: '/admin/pedidos',
                element: <Ordenes/>
            },
            {
                path: '/admin/productos',
                element: <Productos />
            },
            {
                path: '/admin/dashboard',
                element: <DashBoard/>
            }

            
        ]
    }
])

export default router