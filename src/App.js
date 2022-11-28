/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import NavComponent from './components/NavComponent';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import AllProductsComponent from './components/AllProductsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setProducts } from './redux/actions/productActions';
import MenClothingComponent from './components/MenClothingComponent';
import WomenClothingComponent from './components/WomenClothingComponent';
import ElectronicProductsComponent from './components/ElectronicProductsComponent';
import JeweleryProductsComponent from './components/JeweleryProductsComponent';
import Cart from './pages/Cart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer.component';
import Details from './pages/Details';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { setAuth } from './redux/actions/authAction';
import Payment from './pages/Payment';

function App() {
  const isUser = useSelector(user => user.user.users)
  const dispatch = useDispatch();

  const getAllProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => dispatch(setProducts(data)))
  }

  var alerted = localStorage.getItem('FakeShopAlert') || '';
  if (alerted !== 'yes') {
    toast.success('Wlecome to FakeShop!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    localStorage.setItem('FakeShopAlert', 'yes');
  }

  const getUser = () => {
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
  }

  useEffect(() => {
    getAllProducts();
    getUser();
  }, [])

  return (
    <div className="App">
      <NavComponent />
      <Routes>
        <Route path="/FakeShop" element={<Home />} />
        <Route path="/FakeShop/all-products" element={<AllProductsComponent />} />
        <Route path="/FakeShop/men-products" element={<MenClothingComponent />} />
        <Route path="/FakeShop/women-products" element={<WomenClothingComponent />} />
        <Route path="/FakeShop/electronic-products" element={<ElectronicProductsComponent />} />
        <Route path="/FakeShop/jewelry-products" element={<JeweleryProductsComponent />} />
        <Route path="/FakeShop/carts" element={<Cart />} />
        <Route path="/FakeShop/details" element={<Details />} />
        <Route path="/FakeShop/payment" element={<Payment />} />
        {isUser === null ? <>
          <Route path='/FakeShop/login' element={<Login />} />
          <Route path='/FakeShop/signup' element={<Signup />} />
        </> : null}
        <Route path="/FakeShop*" element={<Home />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
