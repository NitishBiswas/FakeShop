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
import Profile from './Profile';
import { CgProfile } from 'react-icons/cg';
let db = new Localbase('db')

const NavComponent = () => {
    const user = useSelector(user => user.user.users)
    const [cartCount, setCartCount] = useState(0);
    const totalCart = useSelector(cart => cart.totalCarts.count);
    const navigate = useNavigate();
    const [activeClass, setActiveClass] = useState('/FakeShop');
    const [searchText, setSearchText] = useState('');
    const [profileView, setProfileView] = useState(false);

    const loginProfile = () => {
        navigate('/FakeShop/login', { state: activeClass });
    }

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
            setActiveClass('/FakeShop/carts');
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
                        setActiveClass('/FakeShop');
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
                            <Nav.Link as={Link} to='/FakeShop/all-products' className={activeClass === '/FakeShop/all-products' ? 'active' : ''} onClick={() => {
                                window.scrollTo(0, 0);
                                setActiveClass('/FakeShop/all-products');
                            }}>All Products</Nav.Link>
                            <Nav.Link as={Link} to='/FakeShop/men-products' className={activeClass === '/FakeShop/men-products' ? 'active' : ''} onClick={() => {
                                window.scrollTo(0, 0);
                                setActiveClass('/FakeShop/men-products');
                            }}>Men's clothing</Nav.Link>
                            <Nav.Link as={Link} to='/FakeShop/women-products' className={activeClass === '/FakeShop/women-products' ? 'active' : ''} onClick={() => {
                                window.scrollTo(0, 0);
                                setActiveClass('/FakeShop/women-products');
                            }}>Women's clothing</Nav.Link>
                            <Nav.Link as={Link} to='/FakeShop/electronic-products' className={activeClass === '/FakeShop/electronic-products' ? 'active' : ''} onClick={() => {
                                window.scrollTo(0, 0);
                                setActiveClass('/FakeShop/electronic-products');
                            }}>Electronics</Nav.Link>
                            <Nav.Link as={Link} to='/FakeShop/jewelry-products' className={activeClass === '/FakeShop/jewelry-products' ? 'active' : ''} onClick={() => {
                                window.scrollTo(0, 0);
                                setActiveClass('/FakeShop/jewelry-products');
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
                        {user !== null ? <div onClick={() => setProfileView(!profileView)} className='m-2' style={{ borderRadius: '50%', cursor: 'pointer' }}>
                            <img src={user.imageURL} alt='User' height='40px' width='40px' style={{ borderRadius: '50%' }} />
                        </div> : <CgProfile size={40} onClick={loginProfile} className='login-profile mx-2' />}
                    </Navbar.Collapse>
                </Container>
                {searchText !== '' && <div className='text-white shadow bg-dark search-view'>
                    <Searched searchText={searchText} onChange={() => setSearchText('')} />
                </div>}
                {profileView && <Profile path={activeClass} onChange={() => setProfileView(false)} />}
            </Navbar>
        </>
    )
}

export default NavComponent