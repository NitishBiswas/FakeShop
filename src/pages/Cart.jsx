import React, { useEffect, useState } from 'react'
import Localbase from 'localbase'
import CartCard from '../components/CartCard.Component';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
let db = new Localbase('db')

const Cart = () => {
    const [carts, setcarts] = useState([]);
    const total = useSelector(totalPrice => totalPrice.totalCarts.totalPrice);
    const navigate = useNavigate();
    const [price, setPrice] = useState(0);

    const getCartProducts = () => {
        db.collection('products').get().then(carts => {
            setcarts(carts);
        }).catch(err => console.log(err));
    }

    const checkOut = () => {
        toast.success('Thank you!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        navigate('/FakeShop');
        window.screenTop(0, 0);
    }

    useEffect(() => {
        getCartProducts();
    }, [price]);

    return (
        <>
            {carts !== undefined ? <div className='container'>
                {carts.map(cart => {
                    return (
                        <CartCard cart={cart} key={cart.id} changePrice={(p) => setPrice(total + p)} />
                    )
                })}
                <div className='border-bottom mt-5' />
                <div className='text-end fs-2 m-4'>Total price = ${price !== 0 ? parseFloat(price).toFixed(2) : parseFloat(total).toFixed(2)}</div>
                <div>
                    <button className='check-out' onClick={checkOut}>Check out</button>
                </div>
            </div> : navigate('/FakeShop')}
        </>

    )
}

export default Cart