import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../Pages/Home/home";
import Subscription from "../Pages/Subscription/Subscription";

import { CartProvider } from "../Provider/CartProvider";
import { CoffeeProvider } from "../Provider/CoffeeContext";
import { InfoCoffee } from "../Components/Coffee/Coffee";
import { Cart } from "../Components/Cart/Cart";



import { SubscripitonProvider } from "../Provider/Subscription";

const RoutesApp = () => {

    return (
        <CartProvider>
            <CoffeeProvider>
                <SubscripitonProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/*" element={<Home />} />
                            <Route path="/Coffees=/:name" element={<InfoCoffee />} />
                            <Route path="/Cart" element={<Cart />} />

                            <Route path="/Subscription" element={<Subscription />} />
                        </Routes>
                    </BrowserRouter>
                </SubscripitonProvider>
            </CoffeeProvider>
        </CartProvider>
    )

}

export default RoutesApp;

{/* <Route path="/Actor=/:name" element={<CelebrityInformation />} /> */ }