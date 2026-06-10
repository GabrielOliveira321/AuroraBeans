import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useCoffee } from '../../Provider/CoffeeContext';
import { apiProd } from '../../api/api';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const ProductsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="flex flex-col bg-black/20 p-6 rounded-2xl border border-white/5 animate-pulse">
        <div className="w-full h-64 mb-6 rounded-xl bg-gray-800" />
        <div className="h-5 bg-gray-800 rounded w-3/4 mb-3" />
        <div className="h-3 bg-gray-800 rounded w-1/4 mb-3" />
        <div className="h-4 bg-gray-800 rounded w-full mb-2" />
        <div className="h-4 bg-gray-800 rounded w-2/3" />
      </div>
    ))}
  </div>
);

const Products = () => {
  const navigate = useNavigate();
  const { handlerCoffee } = useCoffee();

  const [filter, setFilter] = useState("Todos");
  const [coffeesArrays, setCoffeesArrays] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 9;
  const allLimit = 100; // Usado quando filtro ativo

  // Determina se devemos usar paginação ou buscar tudo
  const isFilterActive = filter !== "Todos" || searchTerm.trim() !== "";
  const effectiveLimit = isFilterActive ? allLimit : limit;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const getAPI = async () => {
      try {
        const result = await apiProd(page, effectiveLimit);
        if (isMounted) {
          const items = result.data || result || [];
          setCoffeesArrays(Array.isArray(items) ? items : []);
          if (result.meta) {
            setTotalPages(result.meta.totalPages);
            setTotalItems(result.meta.total);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar API:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    getAPI();
    return () => {
      isMounted = false;
    };
  }, [page, filter, searchTerm]); // Re-busca quando filtro ou busca muda

  const filteredItems = (Array.isArray(coffeesArrays) ? coffeesArrays : []).filter(item => {
    const matchesCategory = filter === "Todos" || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reseta para página 1 quando filtro muda
  useEffect(() => {
    setPage(1);
  }, [filter, searchTerm]);

  const categories = ["Todos", "Quentes", "Gelados", "Grãos", "Clássicos", "Especiais", "Doces"];

  const HandlerChooseCoffee = (coffee, name) => {
    handlerCoffee(coffee);
    navigate(`/Coffees=/${name}`);
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
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Buscar cafés..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/40 border border-[#c4a484]/30 rounded-full py-3 pl-10 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-[#c4a484] transition-all"
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

          {loading ? (
            <ProductsSkeleton />
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 text-gray-500 text-xl">
              Nenhum café encontrado com esses critérios.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
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

              {/* Paginação - apenas quando não há filtro ativo */}
              {!isFilterActive && totalPages > 1 && (
                <div className="mt-16 flex flex-col items-center gap-4">
                  <p className="text-gray-500 text-sm">
                    Mostrando página {page} de {totalPages} ({totalItems} cafés)
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      className="flex items-center gap-2 px-5 py-3 border border-white/10 rounded-lg text-sm text-gray-400 hover:border-[#c4a484] hover:text-[#c4a484] transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} /> Anterior
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                          p === page
                            ? 'bg-[#c4a484] text-black'
                            : 'border border-white/10 text-gray-400 hover:border-[#c4a484] hover:text-[#c4a484]'
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                      className="flex items-center gap-2 px-5 py-3 border border-white/10 rounded-lg text-sm text-gray-400 hover:border-[#c4a484] hover:text-[#c4a484] transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Próximo <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Mostra total de itens encontrados quando filtro ativo */}
              {isFilterActive && (
                <div className="mt-8 text-center">
                  <p className="text-gray-500 text-sm">
                    {filteredItems.length} café(s) encontrado(s)
                  </p>
                </div>
              )}
            </>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
