/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import '../App.css'
import { addCart, removeCart } from '../redux/actions/cartActions';

import Localbase from 'localbase'
let db = new Localbase('db')

const Details = () => {
    const product = useLocation().state.product;
    const [cart, setCart] = useState(undefined);
    const dispatch = useDispatch();
    const totalCart = useSelector(cart => cart.totalCarts.count);

    const setCartItem = () => {
        db.collection('products').doc({ id: product.id }).get().then(item => {
            if (item === undefined) {
                db.collection('products').add({ ...product, count: 1 });
                db.collection('count').doc({ id: 1 }).get().then(item => {
                    if (item === undefined) {
                        db.collection('count').add({ id: 1, count: 1 })
                    } else {
                        db.collection('count').doc({ id: 1 }).update({
                            count: item.count + 1,

                        })
                    }
                    if (totalCart !== 0) {
                        dispatch(addCart(1));
                    } else {
                        dispatch(addCart(item.count + 1));
                    }
                })
                toast.success('Item added to shopping cart!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setCart(product.id);

            } else {
                db.collection('products').doc({ id: product.id }).delete()
                setCart(undefined);
                db.collection('count').doc({ id: 1 }).get().then(item => {
                    if (item !== undefined) {
                        if (totalCart === 0) {
                            dispatch(addCart(item.count - 1));
                        }
                        db.collection('count').doc({ id: 1 }).update({
                            count: item.count - 1,
                        })
                    }
                })
                toast.warn('Item removed from shopping cart!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                dispatch(removeCart(1));
            }
        })
    }

    useEffect(() => {
        db.collection('products').doc({ id: product.id }).get().then(item => {
            if (item !== undefined) {
                setCart(item.id);
            } else {
                setCart(undefined);
            }
        })
    }, [])

    return (
        <>
            <div className='container my-4 d-flex justify-content-center align-items-center'>
                <div className='row mt-2'>
                    <div className='col-md-6 col-sm-12 my-2'>
                        <img className='detail-image' src={product.image} alt={product.title} style={{ width: '280px' }} />
                    </div>
                    <div className='col-md-5 col-sm-12 text-start my-2'>
                        <h4 className='my-2'>{product.title}</h4>
                        <h6 className='card-price my-2'>${product.price}</h6>
                        <div className='w-100 bg-dark fw-bold text-center py-1 my-2 rounded text-white'>
                            {product.category}
                        </div>
                        <p className='text-justify my-2'>{product.description}</p>
                        <div className='d-flex justify-content-center my-4'>
                            {cart === undefined ? <button onClick={setCartItem} className='add-cart-btn w-50'>Add to Cart</button> : <button onClick={setCartItem} className='remove-cart-btn w-50'>Remove</button>}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Details