import { useCart } from "../../Provider/CartProvider";
import { LucideShoppingCart } from "lucide-react";

import { CartProducts } from "./CartProducts";

export const Cart = () => {
    const { cartCoffee } = useCart();

    const totalPrice = cartCoffee.reduce((total, item) => {
        return total + item.price * item.quantity;        
    }, 0);

    const showCart = (

        <div>
            <article className="min-h-screen bg-[#12100E] text-[#F4F1EA] p-6 md:p-12 font-sans">
                <h2 className="text-3xl font-serif italic mb-10 border-b border-[#c5a47e]/30 pb-4">
                    Seu Carrinho
                </h2>

                {
                    cartCoffee.map((item) => {
                        return <CartProducts key={item._id} itemCoffee={item} />

                    })
                }

                <div className="max-w-4xl mx-auto mt-12 p-8 bg-[#1a1714] border-t-2 border-[#c5a47e] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">

                    <div className="flex flex-col">
                        <span className="text-[#c5a47e] uppercase tracking-widest text-xs font-semibold">
                            Valor Total
                        </span>
                        <p className="text-4xl font-serif text-[#F4F1EA]">
                            <span className="text-sm mr-2 text-[#c5a47e]/60">R$</span>
                            {totalPrice.toFixed(2)}
                        </p>
                    </div>

                    <div className="w-full md:w-auto">
                        <button className="w-full md:w-64 bg-[#c5a47e] hover:bg-[#a38665] text-[#12100E] font-bold py-4 px-8 rounded-sm transition-all duration-300 uppercase tracking-widest text-sm active:scale-95 shadow-[0_0_20px_rgba(197,164,126,0.2)]">
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </article>
        </div>
    )

    const NoCoffeeInCart = <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="bg-purple-100 p-6 rounded-full mb-6">
            <LucideShoppingCart size={64} className="text-purple-700" weight="thin" />
        </div>

        <h3 className="font-baloo2 text-2xl font-extrabold text-gray-800 mb-2">
            Seu carrinho está vazio
        </h3>

        <p className="text-gray-600 max-w-[250px] mb-8 leading-relaxed">
            Parece que você ainda não escolheu seu café. Que tal voltar e conferir o menu?
        </p>

        <a href="/"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200 ease-in-out shadow-sm uppercase text-sm"
        >
            <p className="text-sm text-white">Voltar ao início</p>
        </a>
    </div>

    return (
        <div>
            {
                cartCoffee.length > 0 ? <div>{showCart}</div> : <div>{NoCoffeeInCart}</div>
            }
        </div>
    );
};

