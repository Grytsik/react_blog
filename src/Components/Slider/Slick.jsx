import Slider from "react-slick";
import slider1 from '../../img/slider1.jpeg';
import slider2 from '../../img/slider2.jpeg';
import slider3 from '../../img/slider3.jpeg';
import slider4 from '../../img/slider4.jpeg';
import slider5 from '../../img/slider5.jpeg';
import slider6 from '../../img/slider6.jpeg';
import slider7 from '../../img/slider7.jpeg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slick.css';

export default function Slick() {
  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    // infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
  };

    return (
      <div className="slider__block">
        <Slider {...settings}>
          <div className="slider__item">
            <img className="slider__img" src={slider1} alt="" />
          </div>
          <div className="slider__items">
            <img className="slider__img" src={slider2} alt="" />
          </div>
          <div className="slider__items">
            <img className="slider__img" src={slider3} alt="" />
          </div>
          <div className="slider__items">
            <img className="slider__img" src={slider4} alt="" />
          </div>
          <div className="slider__items">
            <img className="slider__img" src={slider5} alt="" />
          </div>
          <div className="slider__items">
          <img className="slider__img" src={slider6} alt="" />
          </div>
          <div className="slider__items">
          <img className="slider__img" src={slider7} alt="" />
          </div>
        </Slider>
      </div>
    );
}