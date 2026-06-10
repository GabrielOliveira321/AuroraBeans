import React from 'react';
import { Coffee, ShoppingBag, Van } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Provider/AuthProvider';
import config from '../../config';

const Header = () => {


    const { token, user } = useAuth();

    const handlerAlertToken = (currentInfo) => {
        if (!token && currentInfo === "cart") alert("Faça login para acessar o carrinho!");
        if(!token && currentInfo === "subscription") alert("Faça login para pode ver as assinaturas!");
    }

    return (
        <header>
            <nav className="flex justify-between items-center p-6 lg:px-12 fixed w-full z-50 bg-black/30 backdrop-blur-md">
                <div className="flex gap-8 text-sm uppercase tracking-widest hidden md:flex">
                    <Link to="/Products" className="hover:text-[#c4a484] transition">Cafés</Link>
                    <Link to="/about" className="hover:text-[#c4a484] transition">Nossa História</Link>
                </div>

                <div className="text-2xl font-serif tracking-tighter flex items-center gap-2">
                    <Link to={"/"} className='flex items-center'>
                        <Coffee className="text-[#c4a484]" />
                        AURORA <span className="text-[#c4a484]">BEANS</span>
                    </Link>
                </div>

                <div className="flex gap-8 text-sm uppercase tracking-widest items-center">
                    <Link to={token ? "/Subscription" : "/login"} className="hidden md:block hover:text-[#c4a484] transition" onClick={() => handlerAlertToken("subscription")}>Assinatura</Link>
                    <Link to={token ? "/cart" : "/login"} className="bg-[#c4a484] px-5 py-2 text-black font-bold hover:bg-[#a68a6d] transition rounded-sm flex items-center gap-2" onClick={() => handlerAlertToken("cart")}>
                        <ShoppingBag size={18} /> Encomende Agora
                        <Van size={18} className="animate-pulse" /> 
                    </Link>

                    <Link to={token ? "/profile" : "/login"} className="hover:text-[#c4a484] transition flex items-center gap-2">
                        {token && user ? (
                            user.photoUrl ? (
                                <img
                                    src={`${config.API_URL}${user.photoUrl}`}
                                    alt="Avatar"
                                    className="w-8 h-8 rounded-full object-cover border border-[#c4a484]"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-[#c4a484] flex items-center justify-center text-black font-bold text-sm uppercase">
                                    {user.name?.charAt(0) || '?'}
                                </div>
                            )
                        ) : (
                            "Login"
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    )

};

export default Header;