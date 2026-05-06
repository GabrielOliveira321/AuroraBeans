import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useCart } from '../../Provider/CartProvider';
import { checkoutApi } from '../../api/checkoutApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartCoffee, clearCart } = useCart();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    addressNumber: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const totalPrice = cartCoffee.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartCoffee.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }

    setIsSubmitting(true);

    try {
      const checkoutData = {
        ...formData,
        plan: 'Compra Avulsa',
        price: totalPrice.toString(),
      };

      const result = await checkoutApi(checkoutData);

      if (result.success) {
        toast.success('Compra realizada com sucesso!');
        // Limpar todos os itens do carrinho (temos clearCart que remove por ID, mas precisamos de algo que limpe tudo)
        // Para simplificar, vamos limpar via localStorage ou se clearCart suportar
        cartCoffee.forEach(item => clearCart(item.id));
        
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(result.message || 'Erro ao processar pagamento.');
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error('Ocorreu um erro inesperado.');
      setIsSubmitting(false);
    }
  };

  if (cartCoffee.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen bg-[#12100E] text-[#F4F1EA] flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <h2 className="text-3xl font-serif mb-4">Seu carrinho está vazio</h2>
          <button 
            onClick={() => navigate('/products')}
            className="bg-[#c5a47e] text-black px-6 py-3 font-bold rounded hover:bg-[#a68a6d] transition"
          >
            Ir para a Loja
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#12100E] text-[#F4F1EA] flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-serif italic mb-10 border-b border-[#c5a47e]/30 pb-4 text-center md:text-left">
          Finalizar Compra
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Formulário */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Seção Endereço */}
              <div className="bg-[#1a1714] p-8 rounded-xl border border-white/5 shadow-2xl">
                <h3 className="text-2xl text-[#c5a47e] font-serif mb-6">Endereço de Entrega</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider">Nome</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider">Sobrenome</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider">Endereço</label>
                    <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider">Número</label>
                    <input required type="text" name="addressNumber" value={formData.addressNumber} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider">Cidade</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider">CEP</label>
                    <input required type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                  </div>
                </div>
              </div>

              {/* Seção Pagamento */}
              <div className="bg-[#1a1714] p-8 rounded-xl border border-white/5 shadow-2xl">
                <h3 className="text-2xl text-[#c5a47e] font-serif mb-6">Dados de Pagamento</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider">Número do Cartão</label>
                    <input required type="text" name="cardNumber" maxLength="19" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider">Validade</label>
                    <input required type="text" name="expiry" placeholder="MM/AA" maxLength="5" value={formData.expiry} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 uppercase tracking-wider">CVC</label>
                    <input required type="text" name="cvc" placeholder="123" maxLength="4" value={formData.cvc} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#c5a47e] hover:bg-[#a38665] text-[#12100E] font-bold py-5 px-8 rounded-lg transition-all duration-300 uppercase tracking-widest text-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Processando...' : 'Confirmar Pagamento'}
              </button>

            </form>
          </div>

          {/* Resumo do Pedido */}
          <div className="w-full lg:w-[350px]">
            <div className="bg-[#1a1714] p-6 rounded-xl border border-[#c5a47e]/30 shadow-2xl sticky top-32">
              <h3 className="text-xl text-white font-serif mb-6 border-b border-white/10 pb-4">Resumo do Pedido</h3>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cartCoffee.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300 truncate pr-4">{item.quantity}x {item.name}</span>
                    <span className="text-[#c5a47e]">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-gray-400 uppercase tracking-widest text-sm">Total</span>
                <span className="text-2xl font-serif text-[#c5a47e]">R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </main>
      
      <Footer />
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Checkout;
