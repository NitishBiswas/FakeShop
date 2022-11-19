import React from 'react'
import { Carousel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import SLIDER_1 from '../images/1.png';
import SLIDER_2 from '../images/2.png';
import SLIDER_3 from '../images/3.png';

const CarouselComponent = () => {
    const navigate = useNavigate();
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={SLIDER_1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <button onClick={() => navigate('/FakeShop/all-products')} className="btn btn-info my-4" style={{ width: '220px' }}>Buy now</button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={SLIDER_2}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <button onClick={() => navigate('/FakeShop/all-products')} className="btn btn-danger my-4" style={{ width: '220px' }}>Buy now</button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={SLIDER_3}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <button onClick={() => navigate('/FakeShop/all-products')} className="btn btn-info my-4" style={{ width: '220px' }}>Buy now</button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselComponent