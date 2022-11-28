import React, { useState } from 'react'
import '../App.css'
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { setAuth } from '../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
    const path = useLocation().state;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginAccount = () => {
        if (password !== '' && email !== '') {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    toast.success('Succefully logged in!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    onAuthStateChanged(auth, async (user) => {
                        if (user) {
                            const uid = user.uid;
                            const docRef = doc(db, "users", uid);
                            const docSnap = await getDoc(docRef);
                            if (docSnap.exists()) {
                                dispatch(setAuth(docSnap.data()))
                            }
                        }
                    });
                    setLoading(false);
                    console.log("nevigate to", path);
                    navigate(path);
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

    return (
        <>
            <div className='login container d-flex justify-content-center align-items-center'>
                <div className='shadow p-4'>
                    <h1 className='text-center text-info'>Login</h1>
                    <hr></hr>
                    <div className='m-2 text-start'>
                        <MdOutlineEmail size={24} className='text-primary' />
                        <label className='mx-3'>Email</label>
                    </div>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} className='form-control shadow' style={{ width: '300px' }} placeholder='Enter email address' />
                    <div className='m-2 mt-3 text-start'>
                        <RiLockPasswordLine size={24} className='text-primary' />
                        <label className='mx-3'>Password</label>
                    </div>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='form-control shadow' style={{ width: '300px' }} placeholder='Enter password' />
                    <div className='d-flex flex-column align-items-center mt-4'>
                        <button id='button' onClick={loginAccount} className='btn btn-primary shadow w-100' disabled={loading}>{loading ? 'Please wait...' : 'Login'}</button>
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                        <p>Don't have an account? </p><p onClick={() => navigate('/FakeShop/signup', { state: { path: path } })} className='mx-2 text-primary' style={{ cursor: 'pointer' }}>Register</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login