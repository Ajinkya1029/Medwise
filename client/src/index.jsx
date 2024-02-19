import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/homepage';
import{createBrowserRouter,RouterProvider}from 'react-router-dom';
import Authenticate from './pages/authenticatepage';
import DoctorListingPage from './pages/doctorlistpage';
import ProfilePage from './pages/profilepage';

const router=createBrowserRouter([
    {
        path:'/',
        element:<HomePage/>
    },
    {
        path:'/login',
        element:<Authenticate/>
    },
    {
        path:'/doctorlist',
        element:<DoctorListingPage/>
    },
    {
        path:'/profile',
        element:<ProfilePage/>
    }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}></RouterProvider>
);


