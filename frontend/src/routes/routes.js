import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../Pages/Home/home";
import Subscription from "../Pages/Subscription/Subscription";
import Auth from "../auth/auth";

import { CartProvider } from "../Provider/CartProvider";
import { CoffeeProvider } from "../Provider/CoffeeContext";
import { InfoCoffee } from "../Components/Coffee/Coffee";
import { Cart } from "../Components/Cart/Cart";

import { SubscripitonProvider } from "../Provider/Subscription";
import Products from "../Pages/Products/Products";
import { AuthProvider } from "../Provider/AuthProvider";
import Checkout from "../Pages/Checkout/Checkout";

const RoutesApp = () => {

    return (

        <AuthProvider>
            <CartProvider>
                <CoffeeProvider>
                    <SubscripitonProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/login" element={<Auth />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/*" element={<Home />} />
                                <Route path="/Coffees=/:name" element={<InfoCoffee />} />
                                <Route path="/Products" element={<Products />} />
                                <Route path="/Subscription" element={<Subscription />} />
                                <Route path="/checkout" element={<Checkout />} />
                            </Routes>
                        </BrowserRouter>
                    </SubscripitonProvider>
                </CoffeeProvider>
            </CartProvider>
        </AuthProvider>
    )

}

export default RoutesApp;