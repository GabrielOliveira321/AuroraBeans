import React from 'react';
import { Coffee, ShoppingBag, Van } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../Provider/CartProvider';

const Header = () => {

    const navigate = useNavigate();
    const { handlerOrderNow } = useCart();

    const token = true;

    const handlerOpenCart = () => {navigate("/cart");}

    return (
        <header>
            <nav className="flex justify-between items-center p-6 lg:px-12 fixed w-full z-50 bg-black/30 backdrop-blur-md">
                <div className="flex gap-8 text-sm uppercase tracking-widest hidden md:flex">
                    <Link to="/Products" className="hover:text-[#c4a484] transition">Cafés</Link>
                    <a href="/#story" className="hover:text-[#c4a484] transition">Nossa História</a>
                </div>

                <div className="text-2xl font-serif tracking-tighter flex items-center gap-2">
                    <a href={"/"} className='flex items-center'>
                        <Coffee className="text-[#c4a484]" />
                        AURORA <span className="text-[#c4a484]">BEANS</span>
                    </a>
                </div>

                <div className="flex gap-8 text-sm uppercase tracking-widest items-center">
                    <Link to="/Subscription" className="hidden md:block hover:text-[#c4a484] transition">Assinatura</Link>
                    <button className="bg-[#c4a484] px-5 py-2 text-black font-bold hover:bg-[#a68a6d] transition rounded-sm flex items-center gap-2" onClick={() => handlerOpenCart()}>
                        <ShoppingBag size={18} /> Encomende Agora
                        <Van size={18} className="animate-pulse" /> 
                    </button>
                </div>
            </nav>
        </header>
    )

};

export default Header;