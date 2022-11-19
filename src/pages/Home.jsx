/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import AllProductsComponent from '../components/AllProductsComponent';
import CarouselComponent from '../components/CarouselComponent';

const Home = () => {
    return (
        <>
            <CarouselComponent />
            <div className='justify-content-center align-items-center d-flex'>
                <AllProductsComponent />
            </div>

        </>
    )
}

export default Home