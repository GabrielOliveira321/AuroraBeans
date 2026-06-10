import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Signature from './Signature';
import { Check, LogIn, Coffee, ArrowLeft } from 'lucide-react';
import { useSubScription } from '../../Provider/Subscription';
import { useAuth } from '../../Provider/AuthProvider';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubscriptionPage = () => {
  const { token } = useAuth();
  const { setChosePlan } = useSubScription();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: 1, name: "Iniciante", price: "45", highlight: false, features: ["1 café por mês", "Moagem padrão", "Frete fixo"] },
    { id: 2, name: "Entusiasta", price: "85", highlight: true, features: ["2 cafés por mês", "Moagem personalizada", "Frete Grátis"] },
    { id: 3, name: "Mestre", price: "120", highlight: false, features: ["3 cafés por mês", "Acesso antecipado", "Brinde exclusivo"] },
  ];

  function handlerChosePlan(plan) {
    setSelectedPlan(plan.id);
    setChosePlan(plan);
  }

  // Se não estiver logado, mostra mensagem pedindo login
  if (!token) {
    return (
      <div className="min-h-screen bg-[#0f0c0a] text-[#fdfaf1] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#1a1714] rounded-full flex items-center justify-center border border-white/5">
              <Coffee size={36} className="text-[#c4a484]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif mb-4">
              Faça <span className="italic text-[#c4a484]">login</span> para assinar
            </h1>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Você precisa estar autenticado para escolher um plano de assinatura e realizar o pagamento.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-3 bg-[#c4a484] text-[#0f0c0a] px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-[#a38665] transition-all duration-300 active:scale-95"
            >
              <LogIn size={18} />
              Fazer Login
            </Link>
            <div className="mt-6">
              <Link to="/" className="text-gray-500 hover:text-[#c4a484] transition-colors text-sm inline-flex items-center gap-1">
                <ArrowLeft size={14} /> Voltar ao Início
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#fdfaf1] flex flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#c4a484] transition-colors text-sm uppercase tracking-widest"
            >
              <ArrowLeft size={14} />
              Voltar ao Início
            </Link>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="text-[#c4a484] uppercase tracking-[0.3em] text-sm mb-4 block">
              Planos Mensais
            </span>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              Assine o clube <span className="italic text-[#c4a484]">Aurora</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              Receba cafés selecionados todo mês na sua casa. Cancele quando quiser.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* Signature Form */}
            <div className="xl:col-span-7 w-full">
              <Signature />
            </div>

            {/* Plan Selection */}
            <div className="xl:col-span-5 w-full space-y-4">
              <h3 className="text-white font-serif text-xl mb-6 ml-1">Seu Plano</h3>

              <div className="flex flex-col gap-4">
                {plans.map((plan) => {
                  const isSelected = selectedPlan === plan.id;

                  return (
                    <div
                      key={plan.id}
                      onClick={() => handlerChosePlan(plan)}
                      className={`p-6 border transition-all duration-500 cursor-pointer relative ${isSelected
                          ? "border-[#c4a484] bg-[#1a1612] ring-2 ring-[#c4a484]/30 shadow-[0_0_20px_rgba(196,164,132,0.1)]"
                          : plan.highlight
                            ? "border-[#c4a484]/30 bg-[#161310]"
                            : "border-white/5 bg-[#161310] hover:border-white/20"
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${isSelected || plan.highlight ? "bg-[#c4a484]/10" : "bg-white/5"}`}>
                            <Check size={18} className={isSelected ? "text-[#c4a484]" : "text-gray-600"} />
                          </div>
                          <div>
                            <h4 className="text-white font-serif text-lg">{plan.name}</h4>
                            <p className="text-gray-500 text-xs uppercase tracking-widest">Entrega mensal</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-baseline justify-end gap-1">
                            <span className="text-[#c4a484] text-xs">R$</span>
                            <span className="text-2xl font-serif text-white">{plan.price}</span>
                          </div>
                          {(plan.highlight && !isSelected) && (
                            <span className="text-[10px] text-[#c4a484] font-bold uppercase tracking-tighter">Melhor Escolha</span>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                        <ul className="flex gap-4">
                          {plan.features.slice(0, 2).map((f, i) => (
                            <li key={i} className="text-[10px] text-gray-400 flex items-center gap-1">
                              <Check size={10} className="text-[#c4a484]" /> {f}
                            </li>
                          ))}
                        </ul>

                        <button
                          className={`text-[10px] font-bold uppercase tracking-widest py-2 px-4 transition-all ${isSelected
                              ? "bg-[#c4a484] text-black"
                              : "text-white border border-white/10 hover:border-[#c4a484]"
                            }`}
                        >
                          {isSelected ? "Selecionado" : "Selecionar"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
};

export default SubscriptionPage;
