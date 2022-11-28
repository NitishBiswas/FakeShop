import React, { useState } from 'react'
import '../App.css'
import { AiFillCreditCard, AiFillIdcard } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VISA_CARD from '../images/visa.png';
import MonthPicker from 'month-year-picker';
import { toast } from 'react-toastify';

const Payment = () => {
    const isUser = useSelector(user => user.user.users)
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [securityCode, setSecurityCode] = useState('');

    const payMoney = () => {
        if (cardNumber === '' || cardHolderName === '' || securityCode === '') {
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
        } else {
            toast.success('Payment successful!', {
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
            window.scrollTo(0, 0);
        }

    }

    return (
        <>
            {isUser ? <div className='login container d-flex justify-content-center align-items-center'>
                <div className='shadow p-4'>
                    <img src={VISA_CARD} alt='visa card' style={{ height: '200px', marginTop: '-120px' }} />
                    <div className='m-2 text-start'>
                        <AiFillCreditCard size={24} className='text-primary' />
                        <label className='mx-3'>Card Number</label>
                    </div>
                    <input type='number' value={cardNumber} onChange={e => setCardNumber(e.target.value)} className='form-control shadow' style={{ width: '300px' }} placeholder='Enter card number' />
                    <div className='m-2 mt-3 text-start'>
                        <AiFillIdcard size={24} className='text-primary' />
                        <label className='mx-3'>Card Holder Name</label>
                    </div>
                    <input type='text' value={cardHolderName} onChange={e => setCardHolderName(e.target.value)} className='form-control shadow' style={{ width: '300px' }} placeholder='Enter card holder name' />

                    <div className='mt-4 mx-1 d-flex justify-content-between'>
                        <div className='text-start'>
                            <label className='mb-3'>Expairation Date</label>
                            <div className='shadow rounded-5 text-center' style={{ width: '92px' }}>
                                <MonthPicker
                                    name="MonthYear"
                                />
                            </div>
                        </div>
                        <div className='text-start'>
                            <label className='mb-3'>CVV (security code)</label>
                            <input type='text' value={securityCode} onChange={e => setSecurityCode(e.target.value)} className='form-control shadow' style={{ width: '100px' }} placeholder='cvv' />
                        </div>
                    </div>

                    <div className='d-flex flex-column align-items-center mt-4'>
                        <button id='button' onClick={payMoney} className='btn btn-primary shadow w-100'>Pay</button>
                    </div>
                </div>
            </div> : navigate('/FakeShop/login')}
        </>
    )
}

export default Payment