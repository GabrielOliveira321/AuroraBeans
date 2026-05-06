import { useCoffee } from "../../Provider/CoffeeContext";
import { useCart } from "../../Provider/CartProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { apiProd } from "../../api/api";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export const InfoCoffee = () => {

    const navigate = useNavigate();

    const { addItem, cartCoffee } = useCart();
    const { infoCoffee, handlerCoffee: setContextCoffee } = useCoffee();

    const [relatedCoffees, setRelatedCoffees] = useState([]);

    const trava = cartCoffee;

    useEffect(() => {
        let isMounted = true;
        const fetchCoffees = async () => {
            try {
                const data = await apiProd();
                console.log("Categoria atual:", infoCoffee?.category);

                if (isMounted && infoCoffee) {
                    const semelhantes = data.filter((caf) => { return caf.category === infoCoffee.category; })
                    setRelatedCoffees(semelhantes);
                }
            } catch (error) {
                console.error("Erro ao buscar cafés relacionados:", error);
            }
        };
        fetchCoffees();
        return () => {
            isMounted = false;
        };
    }, [infoCoffee]);

    if (!infoCoffee) return <div className="min-h-screen flex items-center justify-center bg-[#12100E] text-[#c5a47e]">Carregando coffee...</div>;

    const handlerOpenCart = () => { navigate("/cart") }

    const handlerAddItem = (eve) => {
        const id = eve.id;

        const jaExiste = trava.some(item => item.id === id);

        if (!jaExiste) {
            addItem(infoCoffee);
            toast.success("Item adicionado ao carrinho!");
        } else {
            alert("Já tem esse item no carrinho");
        }
    };

    const handleRelatedCoffeeClick = (coffee) => {
        setContextCoffee(coffee);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(`/Coffees=/${coffee.name}`);
    };


    return (
        <div className="min-h-screen bg-[#12100E] text-[#F4F1EA] font-sans flex flex-col">
            <Header />

            <main className="flex-1 pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">

                    <section className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-32 animate-fadeIn">

                        <div className="relative w-full md:w-1/2 flex justify-center">
                            <div className="absolute inset-0 border border-[#c5a47e] translate-x-4 translate-y-4 opacity-30"></div>
                            <img
                                src={infoCoffee.img}
                                alt={infoCoffee.name}
                                className="relative z-10 w-full max-w-sm h-[400px] object-cover shadow-2xl"
                            />
                        </div>

                        <div className="w-full md:w-1/2 space-y-6">
                            <header>
                                <span className="text-[#c5a47e] uppercase tracking-[0.3em] text-xs font-semibold">
                                    {infoCoffee.category}
                                </span>
                                <h3 className="text-5xl md:text-6xl font-serif mt-2 mb-4 leading-tight italic">
                                    {infoCoffee.name}
                                </h3>
                                <div className="h-1 w-20 bg-[#c5a47e]"></div>
                            </header>

                            <p className="text-3xl font-light text-[#c5a47e]">
                                R$ {Number(infoCoffee.price).toFixed(2)}
                            </p>

                            <p className="text-gray-400 leading-relaxed text-lg font-light max-w-lg">
                                {infoCoffee.desc}
                            </p>

                            <div className="pt-8 flex flex-col sm:flex-row gap-4">
                                <button className="bg-[#c5a47e] hover:bg-[#b38f66] text-black font-bold py-4 px-10 uppercase tracking-widest transition-all duration-300 active:scale-95" onClick={() => handlerOpenCart()}>
                                    Order Now
                                </button>

                                <button className="border border-[#c5a47e] text-[#c5a47e] hover:bg-[#c5a47e] hover:text-black py-4 px-10 uppercase tracking-widest transition-all duration-300" onClick={() => handlerAddItem(infoCoffee)}>
                                    Add to Cart
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/10 mt-10">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500">Origem</p>
                                    <p className="text-sm">Chapada de Minas, BR</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500">Torra</p>
                                    <p className="text-sm">Média-Escura</p>
                                </div>
                            </div>
                        </div>

                    </section>

                    {relatedCoffees.length > 0 && (
                        <section className="pt-16 border-t border-white/10">
                            <div className="text-center mb-12">
                                <span className="text-[#c5a47e] uppercase tracking-widest text-sm font-semibold">
                                    Continue Explorando
                                </span>
                                <h3 className="text-3xl font-serif mt-2 text-white">
                                    Você também pode gostar
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                                {relatedCoffees.map((coffee) => (
                                    <div
                                        key={coffee.id}
                                        onClick={() => handleRelatedCoffeeClick(coffee)}
                                        className="
                                            flex flex-col bg-black/20 p-4 rounded-xl cursor-pointer group
                                            border border-white/5 hover:border-[#c5a47e]/50 hover:bg-black/40
                                            transition-all duration-500 animate-fadeIn hover:-translate-y-1
                                            shadow-lg hover:shadow-[0_10px_30px_rgba(197,164,126,0.15)]
                                        "
                                    >
                                        <div className="
                                            relative w-full h-48 mb-4 flex-shrink-0
                                            overflow-hidden rounded-lg border border-white/10
                                            group-hover:border-[#c5a47e]/30 transition-colors duration-500
                                        ">
                                            <img
                                                src={coffee.img}
                                                alt={coffee.name}
                                                className="
                                                    w-full h-full object-cover
                                                    grayscale-[20%]
                                                    group-hover:grayscale-0 group-hover:scale-110
                                                    transition-all duration-700
                                                "
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                        </div>

                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2 gap-3">
                                                <h4 className="
                                                    text-base font-medium uppercase tracking-tight leading-tight
                                                    text-[#F4F1EA] group-hover:text-[#c5a47e]
                                                    transition-colors
                                                ">
                                                    {coffee.name}
                                                </h4>
                                                <span className="text-[#c5a47e] font-serif text-sm whitespace-nowrap bg-[#c5a47e]/10 px-2 py-1 rounded-lg text-xs">
                                                    R$ {Number(coffee.price).toFixed(2)}
                                                </span>
                                            </div>

                                            <p className="text-gray-400 text-xs italic line-clamp-2 leading-relaxed flex-1">
                                                {coffee.desc}
                                            </p>

                                            <div className="mt-4 flex items-center justify-between">
                                                <span className="text-xs text-gray-500 uppercase tracking-widest">{coffee.category}</span>
                                                <span className="text-[#c5a47e] text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                                                    Ver
                                                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
};