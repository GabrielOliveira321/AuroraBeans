import { useCoffee } from "../../Provider/CoffeeContext";
import { useCart } from "../../Provider/CartProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';

export const InfoCoffee = () => {

    const navigate = useNavigate("");

    const { addItem, cartCoffee } = useCart();
    const { infoCoffee } = useCoffee();

    const trava = cartCoffee;

    if (!infoCoffee) return <div>Carregando coffee</div>;

    const handlerOpenCart = () => { navigate("/cart") }

    const handlerAddItem = (eve) => {
        const id = eve.id; // ou só eve se já for o id
        console.log(id);
        
        const jaExiste = trava.some(item => item.id === id);

        if (!jaExiste) {
            addItem(infoCoffee);
        } else {
            alert("Já tem esse item no carrinho");
        }
    };

    return (
        <div className="min-h-screen bg-[#12100E] text-[#F4F1EA] py-20 px-6 font-sans">
            <div className="max-w-6xl mx-auto">

                <section className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

                    <div className="relative w-full md:w-1/2 flex justify-center">
                        <div className="absolute inset-0 border border-[#c5a47e] translate-x-4 translate-y-4 opacity-30"></div>
                        <img
                            src={infoCoffee.img}
                            alt={infoCoffee.name}
                            className="relative z-10 w-full max-w-md h-[500px] object-cover shadow-2xl"
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
                            R$ {infoCoffee.price.toFixed(2)}
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
            </div>
        </div>
    );
};