import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useCoffee } from '../../Provider/CoffeeContext';
import { apiProd } from '../../api/api';

const Products = () => {
  const navigate = useNavigate();
  const { handlerCoffee, handlerCategory } = useCoffee();

  const [filter, setFilter] = useState("Todos");
  const [coffeesArrays, setCoffeesArrays] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;
    const getAPI = async () => {
      try {
        const data = await apiProd();
        if (isMounted) {
          setCoffeesArrays(data);
          handlerCategory(data);
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

  const filteredItems = coffeesArrays.filter(item => {
    const matchesCategory = filter === "Todos" || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["Todos", "Quentes", "Gelados", "Grãos", "Clássicos", "Especiais", "Doces"];

  const HandlerChooseCoffee = (coffee, name) => {
    handlerCoffee(coffee);
    navigate(`/Coffees=/, ${name}`);
  };

  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#fdfaf1] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24 px-6 lg:px-24 bg-[#161310]">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16 animate-fadeIn">
            <span className="text-[#c4a484] uppercase tracking-widest text-sm font-semibold">
              Nossa Coleção Completa
            </span>
            <h1 className="text-5xl md:text-6xl font-serif mt-4 mb-8 text-white drop-shadow-lg">
              Todos os Nossos Cafés
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
              Explore nossa seleção cuidadosamente torrada. De grãos selecionados a misturas exclusivas, encontre o café perfeito para o seu paladar.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Buscar cafés..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/40 border border-[#c4a484]/30 rounded-full py-3 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-[#c4a484] transition-all"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => {
                  const isActive = filter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`
                        px-6 py-2 text-sm uppercase tracking-widest rounded-full
                        border transition-all duration-300
                        ${isActive
                          ? "bg-[#c4a484] text-black border-[#c4a484] shadow-[0_0_15px_rgba(196,164,132,0.4)]"
                          : "text-gray-400 border-gray-800 hover:border-[#c4a484] hover:text-[#c4a484]"
                        }
                      `}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-20 text-gray-500 text-xl">
              Nenhum café encontrado com esses critérios.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() => HandlerChooseCoffee(item, item.name)}
                  className="
                    flex flex-col bg-black/20 p-6 rounded-2xl cursor-pointer group
                    border border-white/5 hover:border-[#c4a484]/50 hover:bg-black/40
                    transition-all duration-500 animate-fadeIn hover:-translate-y-2
                    shadow-lg hover:shadow-[0_10px_30px_rgba(196,164,132,0.15)]
                  "
                >
                  <div className="
                    relative w-full h-64 mb-6 flex-shrink-0
                    overflow-hidden rounded-xl border border-white/10
                    group-hover:border-[#c4a484]/30 transition-colors duration-500
                  ">
                    <img
                      src={item.img}
                      alt={item.name}
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
                    <div className="flex justify-between items-start mb-3 gap-4">
                      <h3 className="
                        text-xl font-medium uppercase tracking-tight leading-tight
                        text-[#fdfaf1] group-hover:text-[#c4a484]
                        transition-colors
                      ">
                        {item.name}
                      </h3>
                      <span className="text-[#c4a484] font-serif text-xl whitespace-nowrap bg-[#c4a484]/10 px-3 py-1 rounded-lg">
                        R$ {Number(item.price).toFixed(2)}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm italic line-clamp-3 leading-relaxed flex-1">
                      {item.desc}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs text-gray-500 uppercase tracking-widest">{item.category}</span>
                      <span className="text-[#c4a484] text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                        Ver Detalhes
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
