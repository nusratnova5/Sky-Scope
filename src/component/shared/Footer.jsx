import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-gray'>
      <div className='border-b  border-slate-300'>
      <div className='flex justify-center items-center gap-5 flex-col lg:flex-row lg:justify-between w-3/4 mx-auto my-12'>
        <h1 className='text-3xl text-accent'>TechHub</h1>
        <div className='flex gap-5 text-accent'>
          <Link to='/'>HOME</Link>
          <Link to='/products'>SHOP</Link>
          <Link to='/contact'>CONTACT</Link>
        </div>
        <div className='flex text-xl gap-5 my-2'>
          <FaFacebook className='hover:text-accent' />
          <FaInstagram className='hover:text-accent' />
          <FaTwitter className='hover:text-accent' />
          <FaYoutube className='hover:text-accent' />
        </div>
      </div>
      </div>

      <div className='flex justify-between w-3/4 mx-auto my-8'>
        <p>Copyright © 2024</p>
        <p>All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;