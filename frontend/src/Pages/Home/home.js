import react from "react";
import Header from "../../Components/Header/Header";
import Hero from "../../Components/Hero/Hero";
import Menu from "../../Components/Menu/Menu";
import Footer from "../../Components/Footer/Footer";
import Story from "../../Components/History/History";

import "../../UX/Ui/index.css"

const Home = () => {

    return (

        <div className="min-h-screen bg-[#0f0c0a] text-[#fdfaf1]">
            <Header />
            <main>
                <Hero />
                <Story />
                <Menu />
            </main>
            <Footer />
        </div>

    )

}

export default Home;