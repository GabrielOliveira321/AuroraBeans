import React from 'react';

import { Instagram, Facebook, Clock, MapPin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-[#0f0c0a] border-t border-white/5">
    <div className="py-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div className="flex flex-col items-center">
        <Clock className="text-[#c4a484] mb-4" size={32} />
        <h4 className="font-serif text-xl mb-2">Horário</h4>
        <p className="text-gray-400 text-sm">Seg - Sex: 07:00 - 20:00</p>
      </div>
      <div className="flex flex-col items-center">
        <MapPin className="text-[#c4a484] mb-4" size={32} />
        <h4 className="font-serif text-xl mb-2">Localização</h4>
        <p className="text-gray-400 text-sm">Rua das Torras, 123</p>
      </div>
      <div className="flex flex-col items-center flex justify-center" >
        <div className="flex gap-4 mb-4">
          <Instagram size={24} className="text-[#c4a484] cursor-pointer" />
          <Facebook size={24} className="text-[#c4a484] cursor-pointer" />
        </div>
        <h4 className="font-serif text-xl mb-2">Siga-nos</h4>
      </div>
    </div>
    <div className="py-10 text-center text-gray-600 text-xs tracking-widest uppercase border-t border-white/5">
      &copy; 2026 Aurora Beans Coffee Co.
    </div>
  </footer>
);

export default Footer;