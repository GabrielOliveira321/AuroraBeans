import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Clock, MapPin, Mail, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { subscribeNewsletter } from '../../api/contactApi';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await subscribeNewsletter({ email });
      setStatus({ type: 'success', message: result.message });
      setEmail('');
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status.message) setStatus({ type: '', message: '' });
          }}
          placeholder="seu@email.com"
          required
          className="flex-1 bg-[#0f0c0a] border border-white/10 rounded-sm px-3 py-2.5 text-sm text-[#fdfaf1] placeholder-gray-600 focus:outline-none focus:border-[#c4a484] transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#c4a484] text-[#0f0c0a] px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-[#a38665] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader size={16} className="animate-spin" />
          ) : (
            <Mail size={16} />
          )}
        </button>
      </div>
      {status.message && (
        <div className={`flex items-center gap-1.5 text-xs ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {status.type === 'success' ? (
            <CheckCircle size={12} />
          ) : (
            <AlertCircle size={12} />
          )}
          <span>{status.message}</span>
        </div>
      )}
    </form>
  );
};

const Footer = () => (
  <footer className="bg-[#0f0c0a] border-t border-white/5">
    {/* Newsletter Section */}
    <div className="border-b border-white/5">
      <div className="max-w-4xl mx-auto py-14 px-6 text-center">
        <Mail className="text-[#c4a484] mx-auto mb-4" size={28} />
        <h4 className="font-serif text-2xl mb-2">Newsletter</h4>
        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
          Receba novidades, ofertas exclusivas e dicas de preparo direto no seu email.
        </p>
        <div className="max-w-sm mx-auto">
          <NewsletterForm />
        </div>
      </div>
    </div>

    {/* Main Footer */}
    <div className="py-16 px-6 grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
      {/* Brand */}
      <div className="md:col-span-1">
        <h4 className="font-serif text-xl text-[#c4a484] mb-3">Aurora Beans</h4>
        <p className="text-gray-500 text-sm leading-relaxed">
          Desde 1994, levando o melhor café到 sua mesa com paixão e respeito pela tradição.
        </p>
      </div>
  
      {/* Quick Links */}
      <div>
        <h4 className="font-serif text-lg mb-4 text-[#c4a484]">Navegação</h4>
        <ul className="space-y-2.5 text-sm">
          <li><Link to="/" className="text-gray-400 hover:text-[#c4a484] transition-colors">Início</Link></li>
          <li><Link to="/Products" className="text-gray-400 hover:text-[#c4a484] transition-colors">Cafés</Link></li>
          <li><Link to="/about" className="text-gray-400 hover:text-[#c4a484] transition-colors">Nossa História</Link></li>
          <li><Link to="/Subscription" className="text-gray-400 hover:text-[#c4a484] transition-colors">Assinatura</Link></li>
          <li><Link to="/contact" className="text-gray-400 hover:text-[#c4a484] transition-colors">Contato</Link></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="font-serif text-lg mb-4 text-[#c4a484]">Contato</h4>
        <ul className="space-y-2.5 text-sm text-gray-400">
          <li className="flex items-center gap-2">
            <MapPin size={14} className="text-[#c4a484] shrink-0" />
            Rua das Torras, 123
          </li>
          <li className="flex items-center gap-2">
            <Clock size={14} className="text-[#c4a484] shrink-0" />
            Seg - Sex: 07:00 - 20:00
          </li>
          <li className="flex items-center gap-2">
            <Mail size={14} className="text-[#c4a484] shrink-0" />
            contato@aurorabeans.com.br
          </li>
        </ul>
      </div>

      {/* Social */}
      <div>
        <h4 className="font-serif text-lg mb-4 text-[#c4a484]">Siga-nos</h4>
        <div className="flex gap-4 mb-4">
          <Instagram size={22} className="text-gray-400 hover:text-[#c4a484] cursor-pointer transition-colors" />
          <Facebook size={22} className="text-gray-400 hover:text-[#c4a484] cursor-pointer transition-colors" />
        </div>
        <p className="text-gray-600 text-xs leading-relaxed">
          Acompanhe nosso dia a dia e fique por dentro das novidades.
        </p>
      </div>
    </div>

    <div className="py-8 text-center text-gray-600 text-xs tracking-widest uppercase border-t border-white/5">
      &copy; {new Date().getFullYear()} Aurora Beans Coffee Co. — Todos os direitos reservados.
    </div>
  </footer>
);

export default Footer;
