import React, { useState } from 'react'
import '../App.css'
import { MdOutlineEmail, MdOutlinePhotoCamera } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BsPersonCircle } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, storage, db } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/actions/authAction';


const Signup = () => {
    const path = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(false);

    const createAccount = () => {
        setLoading(true);
        if (name !== '' && password !== '' && email !== '' && photo !== '') {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (res) => {
                    const userRef = doc(db, 'users', res.user.uid);
                    await setDoc(userRef, { name, email, imageURL })
                        .then(() => {
                            toast.success('Successfully Registered!', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                            dispatch(setAuth({ name, email, imageURL }))
                            setLoading(false);
                            navigate(path);
                        }).catch((error) => {
                            toast.error('Something went wrong!', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                            setLoading(false);
                        });
                })
                .catch((error) => {
                    toast.error('Something went wrong!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setLoading(false);
                });
        } else {
            toast.info('Please fill out all the required fields!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false);
        }
    }

    const uploadImage = e => {
        setPhoto(e.target.files[0])
        const imageRef = ref(storage, "images/" + Date.now());
        uploadBytes(imageRef, e.target.files[0]).then(res => {
            getDownloadURL(res.ref).then(url => {
                setImageURL(url);
            }).catch(err => {
                toast.error('Something went wrong!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
        }).catch(err => {
            toast.error('Something went wrong!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        });
    }

    return (
        <>
            <div className='login container d-flex justify-content-center align-items-center'>
                <div className='shadow p-4'>
                    <h1 className='text-center text-info'>Register</h1>
                    <hr></hr>
                    <div className='m-2 text-start'>
                        <BsPersonCircle size={24} className='text-primary' />
                        <label className='mx-3'>Name</label>
                    </div>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} className='form-control shadow' style={{ width: '300px' }} placeholder='Enter email address' />

                    <div className='m-2 mt-3 text-start'>
                        <MdOutlineEmail size={24} className='text-primary' />
                        <label className='mx-3'>Email</label>
                    </div>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} className='form-control shadow' style={{ width: '300px' }} placeholder='Enter email address' />

                    <div className='m-2 mt-3 text-start'>
                        <RiLockPasswordLine size={24} className='text-primary' />
                        <label className='mx-3'>Password</label>
                    </div>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='form-control shadow' style={{ width: '300px' }} placeholder='Enter password' />

                    <input type='file' onChange={uploadImage} id='photo' style={{ display: 'none' }} accept='image/*' />
                    <label htmlFor='photo' className='mt-4' style={{ cursor: 'pointer' }}>
                        <MdOutlinePhotoCamera size={24} className='text-primary mx-2' />
                        {photo !== '' ? imageURL !== '' ? photo.name : 'Please wait...' : 'Choose a photo'}
                    </label>

                    <div className='d-flex flex-column align-items-center mt-4'>
                        <button id='button' onClick={createAccount} className='btn btn-primary shadow w-100' disabled={loading}>{loading ? 'Please wait...' : 'Register'}</button>
                    </div>

                    <div className='d-flex justify-content-center mt-4'>
                        <p>Have an account? </p><p onClick={() => navigate('/FakeShop/login')} className='mx-2 text-primary' style={{ cursor: 'pointer' }}>Login</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup