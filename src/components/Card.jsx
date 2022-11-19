/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Localbase from 'localbase'
import { useDispatch, useSelector } from 'react-redux';
import { addCart, removeCart } from '../redux/actions/cartActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

let db = new Localbase('db')

const Card = ({ product }) => {
    const [cart, setCart] = useState(undefined);
    const dispatch = useDispatch();
    const totalCart = useSelector(cart => cart.totalCarts.count);
    const navigate = useNavigate();

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

    const navigateToDetails = () => {
        navigate('/FakeShop/details', { state: { product: product } });
        window.scrollTo(0, 0);
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
        <div className='product-card rounded col-sm-12 col align-self-center m-4' style={{ height: '380px', width: '270px', boxShadow: '0px 0px 34px 0px #e8e8e8', position: 'relative' }}>
            <div onClick={navigateToDetails} className='align-items-center mt-2'>
                <img src={product.image} alt={product.title} height='200px' width='170px' />
            </div>
            <hr></hr>
            <div onClick={navigateToDetails} className="text-start" style={{
                lineHeight: '1.5em',
                height: '3em',
                overflow: 'hidden',
            }}>
                <p className="my-0">{product.title}</p>
            </div>
            <div onClick={navigateToDetails} style={{ position: 'absolute', bottom: '40px', right: '15px' }}>
                <footer className="blockquote-footer text-end">{product.category}</footer>
            </div>
            <div onClick={navigateToDetails} style={{ position: 'absolute', bottom: '40px', left: '15px' }}>
                <p className="text-start fw-bold">$ {product.price}</p>
            </div>
            <div style={{ position: 'absolute', bottom: '10px', left: '30%' }}>
                {cart === undefined ? <button onClick={setCartItem} className='add-cart-btn'>Add to Cart</button> : <button onClick={setCartItem} className='remove-cart-btn'>Remove</button>}
            </div>
        </div>
    )
}

export default Card