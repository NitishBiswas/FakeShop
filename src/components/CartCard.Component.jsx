/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import '../App.css'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

import Localbase from 'localbase'
import { useDispatch } from 'react-redux';
import { addTotalPrice, removeCart, updateTotalPrice } from '../redux/actions/cartActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
let db = new Localbase('db')

const CartCard = ({ cart, changePrice }) => {

    const [countItem, setCountItem] = useState(cart.count);
    const [removedID, setRemovedID] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const increaseCartItem = () => {
        db.collection('products').doc({ id: cart.id }).update({
            count: countItem + 1,
        })
        dispatch(updateTotalPrice(cart.price))
        changePrice(cart.price);
        setCountItem(countItem + 1)
    }

    const decreaseCartItem = () => {
        if (countItem - 1 !== 0) {
            db.collection('products').doc({ id: cart.id }).update({
                count: countItem - 1,
            })
            dispatch(updateTotalPrice(-cart.price))
            changePrice(-(cart.price));
            setCountItem(countItem - 1)
        }
    }

    const getTotalPrice = () => {
        db.collection('products').get().then(cart => {
            const total = cart.map(item => {
                return item.price * item.count;
            })
            dispatch(addTotalPrice(total.reduce((total, num) => total + num, 0)));
        })
    }

    const removeCartItem = () => {
        db.collection('products').doc({ id: cart.id }).delete()
        dispatch(updateTotalPrice(-(cart.price * countItem)));
        changePrice(-(cart.price * countItem));
        db.collection('count').doc({ id: 1 }).get().then(item => {
            if (item !== undefined) {
                dispatch(removeCart(1));
                db.collection('count').doc({ id: 1 }).update({
                    count: item.count - 1,
                })
            }
            if (item.count - 1 === 0) {
                navigate('/');
                window.scrollTo(0, 0);
            }
        })
        setRemovedID(cart.id);
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
    }

    useEffect(() => {
        getTotalPrice();
    }, [])

    return (
        <>
            {removedID === 0 && <div className='rounded my-4 py-3' style={{ boxShadow: '0px 0px 34px 0px #e8e8e8' }}>
                <div className='row align-items-center'>
                    <div className='col-md-2 col-sm-bg-info'>
                        <img src={cart.image} alt="img" height='80px' width='80px' />
                    </div>
                    <div className='col-md-2 my-2'>
                        {cart.title}
                    </div>
                    <div className='col-md-2 my-2'>
                        Price = ${cart.price}
                    </div>
                    <div className='col-md-2 my-2'>
                        <div className='d-flex align-items-center justify-content-around'>
                            <AiFillMinusCircle className='minusBtn' onClick={decreaseCartItem} />
                            <div className='fs-1 text-primary'>{countItem}</div>
                            <AiFillPlusCircle className='plusBtn' onClick={increaseCartItem} />
                        </div>
                    </div>
                    <div className='col-md-2 my-2'>
                        Total  = ${cart.price * countItem}
                    </div>
                    <div className='col-md-2 my-2'>
                        <button className='remove-btn' onClick={removeCartItem}>Remove</button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default CartCard