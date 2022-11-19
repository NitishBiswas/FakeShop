/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import '../App.css'
import Card from './Card'

const ProductCardComponent = ({ products }) => {

    return (
        <>
            {products.map(product => {
                return (
                    <Card key={product.id} product={product} />
                )
            })}
        </>

    )
}

export default ProductCardComponent