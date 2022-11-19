import React from 'react'
import ProductCardComponent from './ProductCardComponent'
import { GiStarSattelites } from 'react-icons/gi';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const AllProductsComponent = () => {
    const products = useSelector(products => products.allProducts.products);

    return (
        <div className='container align-items-center justify-content-center d-flex'>
            <div className='mt-5 d-flex justify-content-around row'>
                <h1 className='brand-name'>All Products</h1>
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

export default AllProductsComponent