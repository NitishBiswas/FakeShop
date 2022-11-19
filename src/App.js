/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import NavComponent from './components/NavComponent';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import AllProductsComponent from './components/AllProductsComponent';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setProducts } from './redux/actions/productActions';
import MenClothingComponent from './components/MenClothingComponent';
import WomenClothingComponent from './components/WomenClothingComponent';
import ElectronicProductsComponent from './components/ElectronicProductsComponent';
import JeweleryProductsComponent from './components/JeweleryProductsComponent';
import Cart from './pages/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer.component';
import Details from './pages/Details';

function App() {
  const dispatch = useDispatch();

  const getAllProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => dispatch(setProducts(data)))
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <div className="App">
      <NavComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<AllProductsComponent />} />
        <Route path="/men-products" element={<MenClothingComponent />} />
        <Route path="/women-products" element={<WomenClothingComponent />} />
        <Route path="/electronic-products" element={<ElectronicProductsComponent />} />
        <Route path="/jewelry-products" element={<JeweleryProductsComponent />} />
        <Route path="/carts" element={<Cart />} />
        <Route path="/details" element={<Details />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
