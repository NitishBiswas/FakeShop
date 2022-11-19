import React from 'react'
import ProductCardComponent from './ProductCardComponent'
import { GiStarSattelites } from 'react-icons/gi';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const MenClothingComponent = () => {
    const products = useSelector(products => products.allProducts.products.filter(product => product.category === "men's clothing"))

    return (
        <div className='container align-items-center justify-content-center d-flex'>
            <div className='mt-5 d-flex justify-content-around row'>
                <h1 className='brand-name'>Men's Clothing</h1>
                <div className='d-flex mb-5 align-items-center justify-content-center'>
                    <HiOutlineArrowNarrowLeft className='mx-3 text-info' size='30px' />
                    <GiStarSattelites className='text-info' size='30px' />
                    <HiOutlineArrowNarrowRight className='mx-3 text-info' size='30px' />
                </div>
                <ProductCardComponent products={products} />
            </div>
        </div>
    )
}

export default MenClothingComponent