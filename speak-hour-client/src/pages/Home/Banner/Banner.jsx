// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import slider1 from '../../../assets/slider1.jpg'
import slider2 from '../../../assets/slider2.jpg'
import slider3 from '../../../assets/slider3.jpg'
import slider4 from '../../../assets/slider4.jpg'
import img1 from '../../../assets/img1.jpg'
import img2 from '../../../assets/img2.jpg'


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";


// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
const Banner = () => {
    return (
        <div>
            <Swiper
                pagination={{
                    type: "progressbar",
                }}
                // navigation={true}
                autoplay={true}

                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper relative lg:h-[700px] "
            >
                <SwiperSlide>
                    <img src={slider1} alt="slider1" />
                    <img className="absolute w-24 h-24 md:w-48 md:h-48 top-0 right-0" src={img1} alt="slider1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider2} alt="slider2" />
                    <img className="absolute w-24 h-24 md:w-48 md:h-48 top-0 right-0" src={img2} alt="slider1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider3} alt="slider3" />
                    <img className="absolute w-24 h-24 md:w-48 md:h-48 top-0 right-0" src={img1} alt="slider1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider4} alt="slider4" />
                    <img className="absolute w-24 h-24 md:w-48 md:h-48 top-0 right-0" src={img2} alt="slider1" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;