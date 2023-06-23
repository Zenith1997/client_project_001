import React, {useState} from 'react';
import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import Products from "../components/Products";
import Cart from "../components/Cart";
import ShippingData from "../components/ShippingData";
import Footer from "../components/Footer";

const Home = () => {
    const [viewCart, setViewCart] = useState(false);
    const [showForm, setShowForm] = useState(false);

    function onClose() {
        setShowForm(false);
    }

    return (
        <div className="w-full h-full bg-gray-800 home">

            <Header setViewCart={setViewCart}/>
            <HeroBanner/>
            <Products/>

            {viewCart && (
                <Cart setViewCart={setViewCart} viewCart={viewCart} setShowForm={setShowForm}/>
            )}

            {
                showForm && (
                    <ShippingData onClose={onClose}/>
                )
            }

            <Footer/>
        </div>
    )
}

export default Home;