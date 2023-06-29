
import React from "react";
import { Link } from "react-router-dom";
import phone from "../assets/phone.png";


const Footer = () => {
  const isMobileView = window.innerWidth <= 600;


  return (
    <div className="w-full bg-gray-900 py-4">
      <div className="container mx-auto px-4">
        {isMobileView ? (
          <div className="flex flex-col sm:flex-row justify-between items-center  px-0 h-full">
            <div className="justify-start flex mb-4">
              <Link to="/terms" className="text-white hover:text-gray-400">
                Terms & Conditions
              </Link>
              <Link
                to={"/privacy"}
                className="text-white ml-5 hover:text-gray-400"
              >
                Privacy Policy
              </Link>

            </div>

            <div className="flex items-center justify-between gap-5 mb-4">
              <a
                href="https://wa.me/+94711076474"
                target="_blank"
                className="text-xl font-bold text-white flex"
              >
                <img
                  src="https://tochat.be/whatsapp-icon-white.png"
                  alt="Contact us"
                  className="w-8"
                />
              </a>
              <a
                href="tel:+94711076474"
                target="_blank"
                className="text-xl font-bold text-white flex justify-end"
              >
                <img src={phone} alt="Contact us" className="w-7  " />
              </a>
            </div>

            <p className="text-white">© 2021 All Rights Reserved</p>
          </div>
        ) : (
          <>
            {" "}
            <div className="flex flex-col sm:flex-row justify-between items-c h-full">
              <p className="text-white">© 2021 All Rights Reserved</p>
              <p className="text-white flex justify-center items-center gap-5">
                <a
                  href="https://wa.me/+94711076474"
                  target="_blank"
                  className="text-xl font-bold text-white flex justify-end"
                >
                  <img
                    src="https://tochat.be/whatsapp-icon-white.png"
                    alt="Contact us"
                    className="w-8"
                  />
                </a>
                <a
                  href="tel:+94711076474"
                  target="_blank"
                  className="text-xl font-bold text-white flex justify-end"
                >
                  <img src={phone} alt="Contact us" className="w-7  " />
                </a>
                <Link to="/terms" className="text-white hover:text-gray-400">
                  Terms & Conditions
                </Link>
                <Link
                  to={"/privacy"}
                  className="text-white ml-5 hover:text-gray-400"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Footer;
