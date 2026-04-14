import { createContext, useContext, useEffect, useState } from "react"

const CoffeeContext = createContext();

export const CoffeeProvider = ({children}) => {

    const [infoCoffee, setInfoCoffee] = useState(() => {
        const coffeeSeved = localStorage.getItem("coffee");
        return coffeeSeved ? JSON.parse(coffeeSeved) : null;
    });

    const handlerCoffee = (coffee) => {
        setInfoCoffee(coffee);
    }

    const clearInfoCoffee = () => {
        setInfoCoffee(null);
    }

    useEffect(() => {

        if (infoCoffee) {
            localStorage.setItem("coffee", JSON.stringify(infoCoffee));
        } else {
            localStorage.removeItem("coffee")
        } 
    }, [infoCoffee]);

    return (
        <CoffeeContext.Provider value={{infoCoffee, setInfoCoffee, handlerCoffee, clearInfoCoffee}}>
            {children}
        </CoffeeContext.Provider>
    )

}

export const useCoffee = () => useContext(CoffeeContext);