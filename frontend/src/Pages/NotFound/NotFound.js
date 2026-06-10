import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Home, ArrowLeft } from 'lucide-react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#fdfaf1] flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-2xl mx-auto text-center relative">

          {/* Decorative background rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <div className="w-[500px] h-[500px] rounded-full border border-[#c4a484]" />
            <div className="w-[380px] h-[380px] rounded-full border border-[#c4a484] absolute" />
            <div className="w-[260px] h-[260px] rounded-full border border-[#c4a484] absolute" />
          </div>

          {/* Coffee cup illustration */}
          <div className="relative mb-12 inline-block">
            {/* Steam */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex gap-4">
              <span className="w-1 h-12 bg-[#c4a484]/30 rounded-full animate-[steam_2.5s_ease-out_infinite]" />
              <span className="w-1 h-16 bg-[#c4a484]/20 rounded-full animate-[steam_2.5s_ease-out_infinite_0.4s]" />
              <span className="w-1 h-10 bg-[#c4a484]/25 rounded-full animate-[steam_2.5s_ease-out_infinite_0.8s]" />
              <span className="w-1 h-14 bg-[#c4a484]/20 rounded-full animate-[steam_2.5s_ease-out_infinite_1.2s]" />
            </div>

            {/* Cup */}
            <div className="relative">
              {/* Handle */}
              <div className="absolute -right-10 top-5 w-8 h-12 border-2 border-[#c4a484]/60 rounded-r-full" />
              {/* Cup body */}
              <div className="w-28 h-24 bg-gradient-to-b from-[#1a1512] to-[#0f0c0a] rounded-b-[40px] rounded-t-[10px] border-2 border-[#c4a484]/40 relative shadow-[0_10px_40px_rgba(196,164,132,0.1)]">
                {/* Coffee surface */}
                <div className="absolute top-2 left-2 right-2 h-6 bg-gradient-to-b from-[#3d2b1f] to-[#2a1f16] rounded-full" />
              </div>
              {/* Saucer */}
              <div className="w-36 h-4 bg-gradient-to-b from-[#1a1512] to-[#0f0c0a] rounded-b-full border border-[#c4a484]/30 mx-auto -mt-1" />
            </div>
          </div>

          {/* 404 */}
          <h1 className="text-9xl md:text-[10rem] font-serif text-[#c4a484] leading-none mb-4 tracking-tighter select-none">
            404
          </h1>

          {/* Divider */}
          <div className="w-16 h-[1px] bg-[#c4a484]/40 mx-auto mb-6" />

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-serif mb-4">
            Este café <span className="italic text-[#c4a484]">não está</span> no nosso menu
          </h2>

          <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed">
            A página que você procurava parece ter virado pó.<br />
            Que tal voltar e tomar um café fresquinho?
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-3 bg-[#c4a484] text-[#0f0c0a] px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-[#a38665] transition-all duration-300 active:scale-95 shadow-[0_0_25px_rgba(196,164,132,0.15)]"
            >
              <Home size={18} className="group-hover:scale-110 transition-transform" />
              Voltar ao Início
            </Link>

            <Link
              to="/Products"
              className="group inline-flex items-center gap-3 border border-[#c4a484]/30 text-[#c4a484] px-8 py-4 rounded-sm uppercase tracking-widest text-sm hover:border-[#c4a484]/60 hover:bg-[#c4a484]/5 transition-all duration-300"
            >
              <Coffee size={18} className="group-hover:rotate-12 transition-transform" />
              Ver Cafés
            </Link>
          </div>

          {/* Small navigation help */}
          <div className="mt-16 text-gray-600 text-xs tracking-widest uppercase">
            <Link to="/" className="hover:text-[#c4a484] transition-colors inline-flex items-center gap-1">
              <ArrowLeft size={12} /> Página Inicial
            </Link>
            <span className="mx-3">|</span>
            <Link to="/login" className="hover:text-[#c4a484] transition-colors">Login</Link>
            <span className="mx-3">|</span>
            <Link to="/Subscription" className="hover:text-[#c4a484] transition-colors">Assinatura</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
