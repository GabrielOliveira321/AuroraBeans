import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoffee } from '../../Provider/CoffeeContext';
import { apiProd } from '../../api/api';

const Menu = () => {

  const navigate = useNavigate("")
  const { handlerCoffee } = useCoffee();

  const [filter, setFilter] = useState("Todos");

  const [coffeesArrays, setCoffeesArrays] = useState([]);
  
  useEffect(() => {
    let isMounted = true;
    const getAPI = async () => {
      try {
        const data = await apiProd();

        if (isMounted) {
          setCoffeesArrays(data);
        }
      } catch (error) {
        console.error("Erro ao buscar API:", error);
      }
    };
    getAPI();
    return () => {
      isMounted = false;
    };
  }, []);


  const filteredItems = filter === "Todos"
    ? coffeesArrays
    : coffeesArrays.filter(item => item.category === filter);

  const categories = ["Todos", "Quentes", "Gelados", "Grãos"];

  const HandlerChooseCoffee = (coffee, name) => {
    handlerCoffee(coffee);
    navigate(`/Coffees=/, ${name}`);
  }

  return (
    <section id="menu" className="py-24 px-6 lg:px-24 bg-[#161310]">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-[#c4a484] uppercase tracking-widest text-sm">
            O Cardápio
          </span>

          <h2 className="text-4xl md:text-5xl font-serif mt-2 mb-8 text-white">
            Explore Nossos Sabores
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => {
              const isActive = filter === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`
                  px-6 py-2 text-sm uppercase tracking-widest
                  border transition-all duration-300
                  ${isActive
                      ? "bg-[#c4a484] text-black border-[#c4a484]"
                      : "text-gray-400 border-gray-800 hover:border-[#c4a484]"
                    }
                `}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              onClick={() => HandlerChooseCoffee(item, item.name)}
              className="
              flex gap-6 items-center pb-6 cursor-pointer group
              border-b border-white/5
              hover:border-[#c4a484]/30
              transition-all duration-500 animate-fadeIn
            "
            >
              <div className="
              relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0
              overflow-hidden rounded-sm border border-white/10
              group-hover:border-[#c4a484]/50 transition-colors duration-500
            ">
                <img
                  src={item.img}
                  alt={item.name}
                  className="
                  w-full h-full object-cover
                  grayscale-[30%]
                  group-hover:grayscale-0 group-hover:scale-110
                  transition-all duration-700
                "
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="flex-1">

                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="
                  text-lg md:text-xl font-medium uppercase tracking-tight
                  text-[#fdfaf1] group-hover:text-[#c4a484]
                  transition-colors
                ">
                    {item.name}
                  </h3>

                  <span className="text-[#c4a484] font-serif text-lg ml-4">
                    R$ {Number(item.price).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-gray-500 text-sm italic line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="h-[1px] flex-1 bg-white/5 hidden lg:block" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm mb-6">
            Todos os nossos cafés são torrados semanalmente em nossa sede.
          </p>

          <button className="
          bg-transparent border border-[#c4a484] text-[#c4a484]
          px-12 py-4 font-bold uppercase text-xs tracking-widest
          hover:bg-[#c4a484] hover:text-black
          transition-all
        ">
            Download PDF Menu
          </button>
        </div>

      </div>
    </section>
  );
};

export default Menu;