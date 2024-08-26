import React from 'react';
import img from '../PromoOne/promo.png'
import { Link } from 'react-router-dom';

const PromoOne = () => {
    return (
        <div className='flex flex-col lg:flex-row'>
            <div className='lg:w-[50%]'>
                <img src={img} alt="" />
            </div>
            <div className='lg:w-[50%] bg-accent flex flex-col justify-center lg:items-start  items-center '>
                <h1 className='text-5xl text-white lg:w-[80%] lg:ml-10 text-center lg:text-start lg:mb-5 my-6 mx-2'>Elevate Your Space with Technology Elegance</h1>
                <Link to='/products'><button className='border border-white text-white ml-10 uppercase tracking-widest px-5 py-3 m-5'>Shop now</button>
                </Link>
            </div>
        </div>
    );
};

export default PromoOne;