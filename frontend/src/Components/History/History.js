import React, { useEffect } from 'react';
import { useCoffee } from '../../Provider/CoffeeContext';

const Story = () => {

    return (
        <>
            <section id="story" className="py-24 px-6 lg:px-24 bg-[#0f0c0a] overflow-hidden">
                <div className="max-w-7xl mx-auto">

                    <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
                        <div className="flex-1">
                            <span className="text-[#c4a484] uppercase tracking-[0.3em] text-sm mb-4 block">Desde 1994</span>
                            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                                A busca pelo grão <br /> <span className="italic text-[#c4a484]">perfeito</span>.
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Nossa jornada começou nas montanhas de Minas Gerais, onde aprendemos que o segredo de um café excepcional não está apenas na torra, mas no respeito à terra e ao tempo de cada colheita.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Viajamos o mundo para conectar produtores locais diretamente com a sua xícara, eliminando intermediários e garantindo que cada nota sensorial seja preservada.
                            </p>
                        </div>
                        <div className="flex-1 relative">
                            <div className="absolute -inset-4 border border-[#c4a484]/20 translate-x-8 translate-y-8 hidden md:block"></div>
                            <img
                                src="https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&q=80&w=800"
                                alt="Mãos segurando grãos de café colhidos"
                                className="relative z-10 w-full h-[500px] object-cover rounded-sm grayscale hover:grayscale-0 transition duration-700"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                        <div className="flex-1">
                            <span className="text-[#c4a484] uppercase tracking-[0.3em] text-sm mb-4 block">O Processo</span>
                            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                                Mais que bebida, <br /> um <span className="italic text-[#c4a484]">ritual</span> diário.
                            </h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <span className="text-2xl font-serif text-[#c4a484]">01.</span>
                                    <p className="text-gray-400"><strong className="text-white">Torra Artesanal:</strong> Realizada em pequenos lotes para garantir controle total sobre a caramelização.</p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-2xl font-serif text-[#c4a484]">02.</span>
                                    <p className="text-gray-400"><strong className="text-white">Moagem Precisa:</strong> Ajustada para cada método, da Prensa Francesa ao Espresso italiano.</p>
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
        </>
    );
};

export default Story;