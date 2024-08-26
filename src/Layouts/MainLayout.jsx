import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/shared/Navbar';
import Footer from '../component/shared/Footer';

const MainLayout = () => {
    return (
        <div className='flex flex-col'>
            <Navbar/>
            <div className='flex-1'>
            <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;