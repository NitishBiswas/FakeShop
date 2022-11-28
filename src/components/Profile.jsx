import { signOut } from 'firebase/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../App.css'
import { auth } from '../firebase/firebase'
import { removeAuth } from '../redux/actions/authAction'

const Profile = ({ onChange, path }) => {
    const user = useSelector(user => user.user.users)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        signOut(auth).then(() => {
            toast.success('Successfully logged out!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch(removeAuth())
            onChange();
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
        });
    }
    return (
        <div className='profile-view shadow p-3 rounded'>
            <div className='d-flex justify-content-center'>
                <img src={user.imageURL} alt="User" height="200px" width="200px" style={{ borderRadius: '50%', border: '3px solid blue' }} />
            </div>
            <h2 className='text-center mt-2'>{user.name}</h2>
            <h5 className='text-center mt-2'>{user.email}</h5>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-danger w-100 mt-2' onClick={logout}>Signout</button>
            </div>
        </div>
    )
}

export default Profile