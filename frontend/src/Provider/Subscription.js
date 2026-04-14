import { createContext, useContext, useState } from "react";


const SubscripitonContext = createContext();


export const SubscripitonProvider = ({children}) => {

    const [chosePlan, setChosePlan] = useState({});

    return (
        <SubscripitonContext.Provider value={{ chosePlan, setChosePlan }}>
            {children}
        </SubscripitonContext.Provider>
    )

}

export const useSubScription = () => useContext(SubscripitonContext);