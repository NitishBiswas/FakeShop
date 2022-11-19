/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import FAKE_SHOP from '../images/fakeshop.png';
import { BsCart4 } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import Localbase from 'localbase'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import '../App.css';
import { Form } from 'react-bootstrap';
import Searched from './Searched.Component';
let db = new Localbase('db')

const NavComponent = () => {
    const [cartCount, setCartCount] = useState(0);
    const totalCart = useSelector(cart => cart.totalCarts.count);
    const navigate = useNavigate();
    const [activeClass, setActiveClass] = useState('home');
    const [searchText, setSearchText] = useState('');

    const countCart = () => {
        if (totalCart === 0) {
            db.collection('count').doc({ id: 1 }).get().then(item => {
                if (item !== undefined) {
                    setCartCount(item.count);
                }
            })
        }

    }

    const navigateToCart = () => {
        if (totalCart !== 0 || cartCount !== 0) {
            navigate('/FakeShop/carts');
            window.scrollTo(0, 0);
            setActiveClass('carts');
        } else {
            toast.info('Add items to your cart first!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    useEffect(() => {
        countCart();
    }, [])

    return (
        <>
            <Navbar bg="dark" variant='dark' expand="lg" className='sticky-top'>
                <Container className='container' fluid>
                    <Navbar.Brand as={Link} to='/FakeShop' className='p-0 brand-name fs-3 text-info' onClick={() => {
                        window.scrollTo(0, 0);
                        setActiveClass('home');
                    }}>
                        <img src={FAKE_SHOP} alt="brand" height='42px' style={{ marginRight: '15px' }} />
                        FakeShop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to='/FakeShop/all-products' className={activeClass === 'allProducts' ? 'active' : ''} onClick={() => {
                                window.scrollTo(0, 0);
                                setActiveClass('allProducts');
                            }}>All Products</Nav.Link>
                            <Nav.Link as={Link} to='/FakeShop/men-products' className={activeClass === 'menProducts' ? 'active' : ''} onClick={() => {
                                window.scrollTo(0, 0);
                                setActiveClass('menProducts');
                            }}>Men's clothing</Nav.Link>
                            <Nav.Link as={Link} to='/FakeShop/women-products' className={activeClass === 'womenProducts' ? 'active' : ''} onClick={() => {
                                window.scrollTo(0, 0);
                                setActiveClass('womenProducts');
                            }}>Women's clothing</Nav.Link>
                            <Nav.Link as={Link} to='/FakeShop/electronic-products' className={activeClass === 'electronicProducts' ? 'active' : ''} onClick={() => {
                                window.scrollTo(0, 0);
                                setActiveClass('electronicProducts');
                            }}>Electronics</Nav.Link>
                            <Nav.Link as={Link} to='/FakeShop/jewelry-products' className={activeClass === 'jewelryProducts' ? 'active' : ''} onClick={() => {
                                window.scrollTo(0, 0);
                                setActiveClass('jewelryProducts');
                            }}>Jewelry</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search products..."
                                className="me-4 bg-dark text-info"
                                aria-label="Search"
                                onChange={e => setSearchText(e.target.value)}
                            />
                        </Form>
                        <div onClick={navigateToCart} style={{ cursor: 'pointer' }}>
                            <div className='text-info fw-bold m-0 p-0'>
                                {totalCart !== 0 ? totalCart : cartCount}
                            </div>
                            <BsCart4 className='text-info m-0 p-0' size={26} />
                        </div>
                    </Navbar.Collapse>
                </Container>
                {searchText !== '' && <div className='text-white shadow bg-dark search-view'>
                    <Searched searchText={searchText} onChange={() => setSearchText('')} />
                </div>}
            </Navbar>
        </>
    )
}

export default NavComponent