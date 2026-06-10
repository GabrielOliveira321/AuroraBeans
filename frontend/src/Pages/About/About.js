import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Award, Leaf, Heart, Users, MapPin, ArrowLeft, Star, Quote } from 'lucide-react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const milestones = [
  { year: '1994', title: 'A Fundação', desc: 'Um pequeno café artesanal nascido nas montanhas de Minas Gerais, movido pela paixão pelo grão perfeito.' },
  { year: '2002', title: 'Primeira Torrefação', desc: 'Inauguramos nossa própria torrefação, permitindo controle total sobre o perfil de sabor de cada lote.' },
  { year: '2010', title: 'Expansão Nacional', desc: 'Aberto nosso primeiro café em São Paulo. A Aurora Beans começa a ser reconhecida nacionalmente.' },
  { year: '2018', title: 'Comércio Direto', desc: 'Estabelecemos parcerias diretas com produtores em 5 estados, garantindo preços justos e qualidade excepcional.' },
  { year: '2024', title: 'Assinatura Digital', desc: 'Lançamos nosso clube de assinatura, levando café fresco diretamente para sua casa todo mês.' },
];

const values = [
  {
    icon: Leaf,
    title: 'Sustentabilidade',
    desc: 'Cultivamos relações de longo prazo com produtores que respeitam a terra e praticam agricultura regenerativa.',
  },
  {
    icon: Award,
    title: 'Qualidade',
    desc: 'Selecionamos apenas os melhores grãos specialty, com pontuação acima de 84 pontos pela SCAA.',
  },
  {
    icon: Heart,
    title: 'Paixão',
    desc: 'Cada xícara carrega o cuidado e a dedicação de uma equipe que ama o que faz, da torra ao preparo.',
  },
  {
    icon: Users,
    title: 'Comunidade',
    desc: 'Acreditamos no poder do café para conectar pessoas e construir comunidades mais fortes e acolhedoras.',
  },
];

const team = [
  { name: 'Carlos Mendes', role: 'Mestre Torrador', initials: 'CM' },
  { name: 'Ana Oliveira', role: 'Sommelier de Cafés', initials: 'AO' },
  { name: 'Pedro Costa', role: 'Diretor de Operações', initials: 'PC' },
  { name: 'Julia Santos', role: 'Head de Marketing', initials: 'JS' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#fdfaf1]">
      <Header />

      <main>
        {/* ===== HERO SECTION ===== */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=2078"
              alt="Plantação de café"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c0a] via-[#0f0c0a]/60 to-transparent" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
            <span className="text-[#c4a484] uppercase tracking-[0.3em] text-sm mb-6 block">
              Desde 1994
            </span>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
              Nossa <span className="italic text-[#c4a484]">História</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              Mais de três décadas dedicadas à arte de transformar grãos em momentos 
              inesquecíveis. Conheça a jornada da Aurora Beans.
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
            <span className="text-gray-500 text-xs uppercase tracking-widest">Role</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-[#c4a484]/60 to-transparent" />
          </div>
        </section>

        {/* ===== BREADCRUMB ===== */}
        <div className="px-6 lg:px-24 pt-8 pb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#c4a484] transition-colors text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            Voltar ao Início
          </Link>
        </div>

        {/* ===== OUR STORY SECTION ===== */}
        <section className="py-16 px-6 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
              <div className="flex-1">
                <span className="text-[#c4a484] uppercase tracking-[0.3em] text-sm mb-4 block">
                  Desde 1994
                </span>
                <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                  A busca pelo grão <br /> <span className="italic text-[#c4a484]">perfeito</span>.
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Nossa jornada começou nas montanhas de Minas Gerais, onde aprendemos que o segredo 
                  de um café excepcional não está apenas na torra, mas no respeito à terra e ao tempo 
                  de cada colheita.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Viajamos o mundo para conectar produtores locais diretamente com a sua xícara, 
                  eliminando intermediários e garantindo que cada nota sensorial seja preservada.
                </p>
              </div>
              <div className="flex-1 relative">
                <div className="absolute -inset-4 border border-[#c4a484]/20 translate-x-8 translate-y-8 hidden md:block" />
                <img
                  src="https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&q=80&w=800"
                  alt="Mãos segurando grãos de café colhidos"
                  className="relative z-10 w-full h-[500px] object-cover rounded-sm grayscale hover:grayscale-0 transition duration-700"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="flex-1">
                <span className="text-[#c4a484] uppercase tracking-[0.3em] text-sm mb-4 block">
                  O Processo
                </span>
                <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                  Mais que bebida, <br /> um <span className="italic text-[#c4a484]">ritual</span> diário.
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <span className="text-2xl font-serif text-[#c4a484]">01.</span>
                    <p className="text-gray-400">
                      <strong className="text-white">Torra Artesanal:</strong> Realizada em 
                      pequenos lotes para garantir controle total sobre a caramelização.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-2xl font-serif text-[#c4a484]">02.</span>
                    <p className="text-gray-400">
                      <strong className="text-white">Moagem Precisa:</strong> Ajustada para cada 
                      método, da Prensa Francesa ao Espresso italiano.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-2xl font-serif text-[#c4a484]">03.</span>
                    <p className="text-gray-400">
                      <strong className="text-white">Controle de Qualidade:</strong> Cada lote é 
                      provado e aprovado por nossos especialistas antes de chegar até você.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <img
                  src="https://images.unsplash.com/photo-1444418185997-1145401101e0?auto=format&fit=crop&q=80&w=800"
                  alt="Café sendo coado"
                  className="w-full h-[500px] object-cover rounded-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATS SECTION ===== */}
        <section className="py-20 px-6 border-y border-white/5">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '30+', label: 'Anos de História' },
              { number: '15', label: 'Origem de Grãos' },
              { number: '50k+', label: 'Clientes Atendidos' },
              { number: '98%', label: 'Satisfação' },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <p className="text-4xl md:text-5xl font-serif text-[#c4a484] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </p>
                <p className="text-gray-500 text-sm uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== TIMELINE ===== */}
        <section className="py-24 px-6 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#c4a484] uppercase tracking-[0.3em] text-sm mb-4 block">
                Nossa Trajetória
              </span>
              <h2 className="text-3xl md:text-5xl font-serif">
                Marcos que <span className="italic text-[#c4a484]">definem</span> quem somos
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#c4a484]/40 via-[#c4a484]/20 to-transparent transform -translate-x-1/2" />

              {milestones.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-start gap-8 mb-16 last:mb-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#c4a484] rounded-full transform -translate-x-1/2 mt-2 z-10 shadow-[0_0_12px_rgba(196,164,132,0.4)]" />

                  {/* Content */}
                  <div className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                    <span className="text-[#c4a484] font-serif text-2xl">{item.year}</span>
                    <h3 className="text-xl font-serif mt-1 mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== VALUES ===== */}
        <section className="py-24 px-6 lg:px-24 bg-[#12100E] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#c4a484] uppercase tracking-[0.3em] text-sm mb-4 block">
                Nossos Pilares
              </span>
              <h2 className="text-3xl md:text-5xl font-serif mb-4">
                O que nos <span className="italic text-[#c4a484]">move</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Cada decisão que tomamos é guiada por valores que cultivamos há mais de 30 anos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="group p-8 bg-[#0f0c0a] border border-white/5 rounded-sm hover:border-[#c4a484]/30 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="p-3 bg-[#c4a484]/10 rounded-sm inline-block mb-5 group-hover:bg-[#c4a484]/20 transition-colors">
                    <value.icon size={26} className="text-[#c4a484]" />
                  </div>
                  <h3 className="text-xl font-serif mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TEAM ===== */}
        <section className="py-24 px-6 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#c4a484] uppercase tracking-[0.3em] text-sm mb-4 block">
                Nossa Equipe
              </span>
              <h2 className="text-3xl md:text-5xl font-serif mb-4">
                Os rostos por trás do <span className="italic text-[#c4a484]">sabor</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Conheça algumas das pessoas dedicadas que fazem da Aurora Beans uma experiência única.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="group text-center">
                  <div className="w-32 h-32 mx-auto mb-5 rounded-full bg-gradient-to-b from-[#1a1714] to-[#0f0c0a] border-2 border-[#c4a484]/20 flex items-center justify-center group-hover:border-[#c4a484]/60 transition-all duration-300">
                    <span className="text-3xl font-serif text-[#c4a484]">{member.initials}</span>
                  </div>
                  <h3 className="text-lg font-serif">{member.name}</h3>
                  <p className="text-gray-500 text-sm uppercase tracking-widest mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIAL ===== */}
        <section className="py-24 px-6 lg:px-24 bg-[#12100E] border-y border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <Quote size={40} className="text-[#c4a484]/30 mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl font-serif italic text-gray-300 leading-relaxed mb-8">
              \"O café é mais do que uma bebida. É um momento de pausa, uma conversa, 
              uma descoberta. Na Aurora Beans, celebramos essa magia todos os dias.\"
            </blockquote>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} className="text-[#c4a484] fill-[#c4a484]" />
              ))}
            </div>
            <p className="text-[#c4a484] font-serif text-lg">— Carlos Mendes</p>
            <p className="text-gray-500 text-sm">Fundador & Mestre Torrador</p>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-24 px-6 lg:px-24 text-center">
          <div className="max-w-2xl mx-auto">
            <Coffee size={40} className="text-[#c4a484] mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">
              Faça parte da <span className="italic text-[#c4a484]">nossa história</span>
            </h2>
            <p className="text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed">
              Experimente você também o café que conquistou milhares de pessoas. 
             Visite nossa loja ou assine nosso clube de cafés especiais.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/Products"
                className="inline-flex items-center gap-3 bg-[#c4a484] text-[#0f0c0a] px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-[#a38665] transition-all duration-300 active:scale-95 shadow-[0_0_25px_rgba(196,164,132,0.15)]"
              >
                <Coffee size={18} />
                Conhecer Cafés
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-[#c4a484]/30 text-[#c4a484] px-8 py-4 rounded-sm uppercase tracking-widest text-sm hover:border-[#c4a484]/60 hover:bg-[#c4a484]/5 transition-all duration-300"
              >
                <MapPin size={16} />
                Visite-nos
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
