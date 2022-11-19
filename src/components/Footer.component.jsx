import React, { useState } from 'react'
import FAKE_SHOP from '../images/fakeshop.png';
import '../App.css'
import { AiFillFacebook, AiFillLinkedin } from 'react-icons/ai';
import { VscGithub } from 'react-icons/vsc'
import { SiBiolink } from 'react-icons/si';
import Tippy from '@tippyjs/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import 'tippy.js/dist/tippy.css';

const nitishFB = 'https://www.facebook.com/profile.php?id=100009017233862';
const nitishLinked = 'https://www.linkedin.com/in/nitish-biswas-9298841b6/';
const nitishGithub = 'https://github.com/NITISHBISWAS';
const nitishProfile = 'https://nitishbiswas.github.io/portfolio/';

const Footer = () => {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const subscribe = () => {
        if (email === '') {
            toast.error('Please enter an email!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (!email.includes('@gmail.com')) {
            toast.warn('Please enter a valid email!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
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
            setEmail('');
        }
    }

    return (
        <>
            <div className='bg-dark mt-4 py-4'>
                <div className='container d-flex justify-content-center align-items-center'>
                    <div className='row w-100'>
                        <div className='col-md-3 text-start-lg'>
                            <img src={FAKE_SHOP} height='150px' width='150px' alt='fakeshop' />
                            <h2 className='text-info brand-name'>FakeShop</h2>
                        </div>
                        <div className='col-md-4 text-start'>
                            <div className='row my-2'>
                                <h3 className='text-info my-2'>Menu</h3>
                            </div>
                            <div className='row my-2'>
                                <div className='d-flex justify-content-between'>
                                    <div className='col-md-6 my-4'>
                                        <h6 className='menu-text' onClick={() => {
                                            navigate('/FakeShop');
                                            window.scrollTo(0, 0);
                                        }}>Home</h6>
                                        <h6 className='menu-text' onClick={() => {
                                            navigate('/FakeShop/all-products');
                                            window.scrollTo(0, 0);
                                        }}>All products</h6>
                                        <h6 className='menu-text' onClick={() => {
                                            navigate('/FakeShop/men-products');
                                            window.scrollTo(0, 0);
                                        }}>Men's clothing</h6>
                                    </div>
                                    <div className='col-md-6 my-4'>
                                        <h6 className='menu-text' onClick={() => {
                                            navigate('/FakeShop/women-products');
                                            window.scrollTo(0, 0);
                                        }}>Women's clothing</h6>
                                        <h6 className='menu-text' onClick={() => {
                                            navigate('/FakeShop/electronic-products');
                                            window.scrollTo(0, 0);
                                        }}>Electronics</h6>
                                        <h6 className='menu-text' onClick={() => {
                                            navigate('/FakeShop/jewelry-products');
                                            window.scrollTo(0, 0);
                                        }}>Jewelry</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 text-start'>
                            <div className='row my-2'>
                                <h3 className='text-info my-2'>Contacts</h3>
                            </div>
                            <div className='row my-2'>
                                <div className='col-md-12 my-4 d-flex'>
                                    <Tippy content="Facebook" className='text-info box'>
                                        <span>
                                            <AiFillFacebook size={35} onClick={() => window.open(nitishFB, '_blank')} className='buttonHover mx-4' />
                                        </span>
                                    </Tippy>
                                    <Tippy content="LinkedIn" className='text-info box'>
                                        <span>
                                            <AiFillLinkedin size={35} onClick={() => window.open(nitishLinked, '_blank')} className='buttonHover mx-4' />
                                        </span>
                                    </Tippy>
                                    <Tippy content="GitHub" className='text-info box'>
                                        <span>
                                            <VscGithub size={35} onClick={() => window.open(nitishGithub, '_blank')} className='buttonHover mx-4' />
                                        </span>
                                    </Tippy>
                                    <Tippy content="Profile" className='text-info box'>
                                        <span>
                                            <SiBiolink size={35} onClick={() => window.open(nitishProfile, '_blank')} className='buttonHover mx-4' />
                                        </span>
                                    </Tippy>
                                </div>
                            </div>
                            <div className='row my-2'>
                                <div className='my-2 d-flex'>
                                    <input type='email' className='form-control w-100' onChange={e => setEmail(e.target.value)} placeholder='Enter your email address' />
                                    <button className='subscribe-btn mx-3 border-info text-info' onClick={subscribe}>Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className='mt-3 text-secondary'>Copyright Ⓒ 2022 FakeShop. All Rights Reserved | Privacy & Data Protection | Disclaimer</p>
        </>
    )
}

export default Footer