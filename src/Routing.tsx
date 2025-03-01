import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Register from "./components/Register";
import Landing from "./pages/Landing";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Login from "./components/Login";
import UserProfile from "./pages/UserProfile";
import AdminLogin from "./pages/AdminLogin";
import ShoppingCart from "./pages/ShoppingCart";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryServices from "./components/CategoryServices";

interface PrivateElementProps {
    element: React.ComponentType;
}

function PrivateElement({ element: Element }: PrivateElementProps) {
    return localStorage.getItem('loginToken') || localStorage.getItem('adminToken') ? <Element /> : <Landing />;
}

// function PrivateElementAdmin({ element: Element }: PrivateElementProps) {
//     return localStorage.getItem('adminToken') ? <Element /> : <Landing />;
// }

const router = createBrowserRouter([
    {
        path: '/',
        // element: <PrivateElement element={Home} />,
        element:<Landing/>
    },

    { path: '/register', element: <Register /> },

    { path: '/contact', element: <Contact /> },

    { path: '/services', element: <Services /> },

    { path: '/services/:subscriptionType/:category', element: <CategoryServices /> },
    { path: '/login', element: <Login /> },

    { path: '/shoppingCart', element: <ShoppingCart /> },

    { path: '/adminLogin', element: <AdminLogin /> },

    { path: '/profile', element: <PrivateElement element={UserProfile} /> },
    { path: '/dashboard', element: <PrivateElement element={AdminDashboard} /> },

]);

export default router;
