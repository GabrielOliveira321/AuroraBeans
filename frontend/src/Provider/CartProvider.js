import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartCoffee, setCartCoffee] = useState(() => {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : [];
    });

    const addItem = (product) => {
        setCartCoffee((prev) => {
            const exists = prev.find((item) => item.id === product.id);

            if (exists) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }

    const decreaseItem = (id) => {
        setCartCoffee((prev) => {
            return prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                        : item
                )
        });
    };


    const clearCart = (removeId) => {
        setCartCoffee((prev) => prev.filter((coffee) => coffee.id !== removeId));
    };

    useEffect(() => {
        // console.log("Carrinho atualizado:", cartCoffee);
        if (cartCoffee.length) {
            localStorage.setItem("cart", JSON.stringify(cartCoffee));
        } else {
            localStorage.removeItem("cart");
        }
    }, [cartCoffee]);

    return (
        <CartContext.Provider value={{ cartCoffee, clearCart, addItem, decreaseItem }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);