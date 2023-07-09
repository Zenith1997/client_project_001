import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import Products from "../components/Products";
import Cart from "../components/Cart";
import ShippingData from "../components/ShippingData";
import Footer from "../components/Footer";
import ring from "../assets/ring.gif";
import image1 from "../assets/phone.png";

const Home = () => {
  const isMobileView = window.innerWidth <= 600;
  const [viewCart, setViewCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [imageVisible, setImageVisible] = useState(true);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".image-container")) {
        setImageVisible(true);
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  function onClose() {
    setShowForm(false);
  }

  function handleImageClick() {
    setImageVisible(false);
  }
  const backgroundImageUrl = `${process.env.REACT_APP_BASE_URL}/assets/image/backgroundImage.png`;

  return (
      <div   className="w-full h-full bg-gray-800 home" style={{backgroundImage: `url(${backgroundImageUrl})`,

      }}
             className="home"
      >> 
        <Header setViewCart={setViewCart} />
        <HeroBanner />
        <Products />

        {imageVisible && isMobileView ? (
            <div className="  fixed bottom-0 right-5 image-container">
              <a className=" py-6 px-6 rounded-full " onClick={handleImageClick}>
                <img
                    src={ring}
                    alt=""
                    className="w-12 h-12 opacity-45 rounded-full"
                />
              </a>
            </div>
        ) : (
            <></>
        )}

        {!imageVisible && (
            <div className="fixed bottom-12 right-10 flex items-center justify-center space-x-4 image-container">
              <a href="tel:+94711076474">
                <img src={image1} alt="" className="w-20 h-20 rounded-full " />
              </a>
              <a href="https://wa.me/+94711076474">
                <img
                    src="https://tochat.be/whatsapp-icon-white.png"
                    alt=""
                    className="w-20 h-20 rounded-full "
                />
              </a>
            </div>
        )}

        {viewCart && (
            <Cart
                setViewCart={setViewCart}
                viewCart={viewCart}
                setShowForm={setShowForm}
            />
        )}

        {showForm && <ShippingData onClose={onClose} />}

        <Footer />
      </div>
  );
};

export default Home;
