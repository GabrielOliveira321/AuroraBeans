import React from 'react';
import { useCart } from '../../Provider/CartProvider';

const Hero = () => (
  <header className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2070"
        alt="Coffee beans"
        className="w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c0a] via-transparent to-transparent"></div>
    </div>

    <div className="relative z-10 max-w-4xl">
      <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight">
        Crafted for your <span className="italic text-[#c4a484]">Senses</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
        Experimente a arte do café em cada xícara. Proveniente de fontes sustentáveis,
        torrado localmente e servido com paixão.
      </p>
      <button className="border border-[#c4a484] px-10 py-4 hover:bg-[#c4a484] hover:text-black transition duration-300">
        <a href='#menu'>
          EXPLORAR MENU
        </a>
      </button>
    </div>
  </header>
);

export default Hero;