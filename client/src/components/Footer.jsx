import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (

        <div className="w-full bg-gray-900 py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center h-full">
                
                    <p className="text-white">© 2021 All Rights Reserved</p>
                    
                    <p
                        className="text-white flex justify-center items-center gap-5"
                    ><a
                    href="https://wa.me/+94711076474"
                    target="_blank"
                    className="text-xl font-bold text-white flex justify-end"
                  >
                    <img
                      src="https://tochat.be/whatsapp-icon-white.png"
                      alt="Contact us"
                     
                      className="w-6"
                    />
                  </a>
                        <Link to="/terms" className="text-white hover:text-gray-400">Terms & Conditions</Link>
                        <Link to={"/privacy"} className="text-white ml-5 hover:text-gray-400">Privacy Policy</Link>
                    </p>
                    
                </div>
            </div>
        </div>

    )
}

export default Footer;