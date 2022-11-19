import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Searched = ({ searchText, onChange }) => {
    const products = useSelector(products => products.allProducts.products);
    const navigate = useNavigate();

    const searchedProducts = products.filter((product) => product.title.toUpperCase().includes(searchText.toUpperCase()) && product)

    const navigateToDetails = (product) => {
        navigate('/FakeShop/details', { state: { product: product } });
        window.scrollTo(0, 0);
        onChange();
    }

    return (
        <>
            {searchedProducts.length > 0 ? searchedProducts.map((product) => {
                return (
                    <div key={product.id} className='m-2 text-start search-card' onClick={() => navigateToDetails(product)}>
                        <div className='d-flex align-items-center px-2'>
                            <div className='d-flex flex-column align-items-center justify-content-center mt-2'>
                                <img src={product.image} alt={product.title} style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
                                <p className='mt-2'>${product.price}</p>
                            </div>
                            <p className='mt-2 mx-2'>{product.title}</p>
                        </div>
                    </div>
                )
            }) : <div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
                <div>
                    <h2 className='text-center text-info my-2'>Sorry!</h2>
                    <h3 className='text-center text-info'>Product is not available!</h3>
                </div>
            </div>}
        </>
    )
}

export default Searched