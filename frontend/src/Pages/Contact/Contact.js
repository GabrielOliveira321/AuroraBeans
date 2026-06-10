import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader, Coffee, ArrowLeft } from 'lucide-react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { sendContact } from '../../api/contactApi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await sendContact(formData);
      setStatus({ type: 'success', message: result.message });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Endereço',
      content: 'Rua das Torras, 123\nCentro, São Paulo - SP',
    },
    {
      icon: Phone,
      title: 'Telefone',
      content: '(11) 99999-8888\n(11) 3333-4444',
      href: 'tel:+5511999998888',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contato@aurorabeans.com.br\nsac@aurorabeans.com.br',
      href: 'mailto:contato@aurorabeans.com.br',
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      content: 'Seg - Sex: 07:00 - 20:00\nSáb: 08:00 - 18:00',
    },
  ];

  const subjects = [
    'Dúvida sobre produtos',
    'Eventos e parcerias',
    'Sugestões',
    'Reclamações',
    'Trabalhe conosco',
    'Outro',
  ];

  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#fdfaf1] flex flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#c4a484] transition-colors text-sm uppercase tracking-widest"
            >
              <ArrowLeft size={14} />
              Voltar ao Início
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[#c4a484] uppercase tracking-[0.3em] text-sm mb-4 block">
              Fale Conosco
            </span>
            <h1 className="text-4xl md:text-6xl font-serif mb-4">
              Entre em <span className="italic text-[#c4a484]">contato</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              Tem alguma pergunta, sugestão ou quer saber mais sobre nossos cafés? 
              Adoraríamos ouvir você.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
              {contactInfo.map((info, index) => (
                <div key={index} className="group flex items-start gap-5 p-6 bg-[#1a1714] border border-white/5 rounded-sm hover:border-[#c4a484]/20 transition-all duration-300">
                  <div className="p-3 bg-[#c4a484]/10 rounded-sm group-hover:bg-[#c4a484]/20 transition-colors">
                    <info.icon size={22} className="text-[#c4a484]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg mb-1">{info.title}</h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-400 text-sm leading-relaxed whitespace-pre-line hover:text-[#c4a484] transition-colors"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                        {info.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Social */}
              <div className="p-6 bg-[#1a1714] border border-white/5 rounded-sm">
                <h4 className="font-serif text-lg mb-4">Redes Sociais</h4>
                <div className="flex gap-4">
                  {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                    <span
                      key={social}
                      className="text-gray-500 text-sm uppercase tracking-widest cursor-pointer hover:text-[#c4a484] transition-colors"
                    >
                      {social}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="bg-[#1a1714] border border-white/5 rounded-sm p-8 md:p-12">
                {/* Status message */}
                {status.message && (
                  <div
                    className={`mb-8 p-5 rounded-sm flex items-start gap-3 text-sm ${
                      status.type === 'success'
                        ? 'bg-green-900/20 border border-green-700/30 text-green-400'
                        : 'bg-red-900/20 border border-red-700/30 text-red-400'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle size={20} className="shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={20} className="shrink-0 mt-0.5" />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name */}
                  <div className="md:col-span-2 md:grid md:grid-cols-2 md:gap-6 space-y-6 md:space-y-0">
                    <div>
                      <label className="block text-sm uppercase tracking-widest text-gray-400 mb-2">
                        Nome <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Seu nome completo"
                        className="w-full bg-[#0f0c0a] border border-white/10 rounded-sm px-4 py-3.5 text-[#fdfaf1] placeholder-gray-600 focus:outline-none focus:border-[#c4a484] focus:ring-1 focus:ring-[#c4a484]/30 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm uppercase tracking-widest text-gray-400 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="seu@email.com"
                        className="w-full bg-[#0f0c0a] border border-white/10 rounded-sm px-4 py-3.5 text-[#fdfaf1] placeholder-gray-600 focus:outline-none focus:border-[#c4a484] focus:ring-1 focus:ring-[#c4a484]/30 transition-all text-sm"
                      />
                    </div>
                  </div> {/* close name+email grid */}

                  {/* Phone */}
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-gray-400 mb-2">
                      Telefone <span className="text-gray-600">(opcional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 99999-8888"
                      className="w-full bg-[#0f0c0a] border border-white/10 rounded-sm px-4 py-3.5 text-[#fdfaf1] placeholder-gray-600 focus:outline-none focus:border-[#c4a484] focus:ring-1 focus:ring-[#c4a484]/30 transition-all text-sm"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-gray-400 mb-2">
                      Assunto <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0f0c0a] border border-white/10 rounded-sm px-4 py-3.5 text-[#fdfaf1] focus:outline-none focus:border-[#c4a484] focus:ring-1 focus:ring-[#c4a484]/30 transition-all text-sm appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 12px center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '20px',
                      }}
                    >
                      <option value="" disabled>Selecione um assunto</option>
                      {subjects.map((s) => (
                        <option key={s} value={s} className="bg-[#0f0c0a]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label className="block text-sm uppercase tracking-widest text-gray-400 mb-2">
                    Mensagem <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Escreva sua mensagem aqui... (mín. 10 caracteres)"
                    className="w-full bg-[#0f0c0a] border border-white/10 rounded-sm px-4 py-3.5 text-[#fdfaf1] placeholder-gray-600 focus:outline-none focus:border-[#c4a484] focus:ring-1 focus:ring-[#c4a484]/30 transition-all text-sm resize-y min-h-[140px]"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full bg-[#c4a484] text-[#0f0c0a] px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-[#a38665] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] shadow-[0_0_25px_rgba(196,164,132,0.15)] flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center p-12 md:p-16 border border-[#c4a484]/10 rounded-sm bg-gradient-to-b from-[#1a1714] to-[#0f0c0a]">
            <Coffee size={36} className="text-[#c4a484] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif mb-3">
              Prefere uma visita?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-6 leading-relaxed">
              Nossa cafeteria está sempre aberta para receber você. 
              Venha tomar um café e conhecer nosso espaço.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 border border-[#c4a484]/30 text-[#c4a484] px-8 py-3 rounded-sm uppercase tracking-widest text-sm hover:border-[#c4a484]/60 hover:bg-[#c4a484]/5 transition-all duration-300"
            >
              <MapPin size={16} />
              Como Chegar
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
