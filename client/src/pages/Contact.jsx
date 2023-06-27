import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact= () => {
    return (
        <div className="w-full h-auto bg-gray-800">
            <Header/>
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold text-white text-center my-5">Contact Information </h1>

                <div className="text-white text-justify pb-10">
                    <h1 className='text-2xl font-semibold text-white text-center my-5'>+ XXX XXX XXXX</h1><br/>
                    <h1 className='text-2xl font-semibold text-white text-center my-5'>+ XXX XXX XXXX</h1>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Contact;