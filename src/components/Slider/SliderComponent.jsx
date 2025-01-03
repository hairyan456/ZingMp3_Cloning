import React from 'react';
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import './style.scss';

const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
};

const SliderComponent = () => {
    const banner = useSelector(state => state.app.banner);

    if (banner?.length <= 0)
        return null;
    return (
        <div className='hidden xs:block xs:w-[320px] mx-auto sm:w-[450px] md:w-[520px] lg:w-[750px] xl:w-[900px] xl:px-5 py-5'>
            {banner?.length === 1 ?
                <img key={banner[0]?.encodeId} src={banner[0]?.banner ?? ''} alt=""
                    className='w-full h-14 xs:h-140 md:h-24 lg:h-32 object-cover'
                />
                :
                <Slider {...settings} >
                    {banner.map(item => (
                        <img key={item?.encodeId} src={item?.banner ?? ''} alt=""
                            className='w-full h-14 xs:h-140 md:h-24 lg:h-32 object-cover'
                        />
                    ))}
                </Slider>
            }
        </div>


    );
};

export default SliderComponent;