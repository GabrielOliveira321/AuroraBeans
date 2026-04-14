import { useCart } from "../../Provider/CartProvider";
import { Trash2, Plus, Minus } from "lucide-react";

export const CartProducts = ({ itemCoffee }) => {
    const { clearCart, addItem, decreaseItem } = useCart();

    const { amount, category, id, desc, img, name, price, quan } = itemCoffee;

    return (
        <ul className="max-w-4xl mx-auto space-y-8">
            <li>
                <div className="flex flex-col md:flex-row items-center gap-8 bg-[#1a1714] border border-white/5 p-6 rounded-sm shadow-2xl">
                    <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-[#12100E] overflow-hidden border border-[#c5a47e]/20">
                        <img
                            src={img}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-grow">
                        <h3 className="text-[#c5a47e] text-xl font-semibold tracking-wide">{name}</h3>
                        <p className="text-gray-400 text-sm mb-2">{desc}</p>
                        <span className="text-white font-bold text-lg">R$ {price.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center gap-4 bg-[#12100E] px-3 py-2 border border-white/10 rounded-md">
                        <button
                            onClick={() => decreaseItem(id)}
                            className="text-gray-400 hover:text-[#c5a47e] transition-colors"
                            aria-label="Diminuir quantidade"
                        >
                            <Minus size={18} strokeWidth={2.5} />
                        </button>

                        <span className="text-white font-medium min-w-[24px] text-center">
                            {itemCoffee.quantity}
                        </span>

                        <button
                            onClick={() => addItem(itemCoffee)}
                            className="text-gray-400 hover:text-[#c5a47e] transition-colors"
                            aria-label="Aumentar quantidade"
                        >
                            <Plus size={18} strokeWidth={2.5} />
                        </button>
                    </div>

                    <button
                        onClick={() => clearCart(id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/5 rounded-full transition-all"
                        title="Remover item"
                    >
                        <Trash2 size={22} strokeWidth={1.5} />
                    </button>
                </div>
            </li>
        </ul>
    );
};