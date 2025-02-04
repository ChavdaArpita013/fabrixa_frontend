import React from 'react';
import HeroSection from './HeroSection';
import SliderImgSection from './SliderImgSection';
import Informative from './Informative';
import Footer from '../Common/Footer';

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <SliderImgSection />
            <Informative />
            <Footer />
        </div>
    );
}

export default HomePage;
