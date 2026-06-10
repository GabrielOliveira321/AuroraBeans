import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useCart } from '../../Provider/CartProvider';
import { useAuth } from '../../Provider/AuthProvider';
import { confirmOrderApi } from '../../api/checkoutApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, ShieldCheck, Loader, ShoppingBag } from 'lucide-react';
import SimulatedPayment from '../../Components/Payment/SimulatedPayment';

const Checkout = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { cartCoffee, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', address: '', addressNumber: '', city: '', zip: '',
  });
  const [cardData, setCardData] = useState({
    cardNumber: '', cardName: '', expiry: '', cvc: ''
  });

  const totalPrice = cartCoffee.reduce((total, item) => total + item.price * item.quantity, 0);

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

    // Simula processamento de pagamento (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderResult = await confirmOrderApi(token, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      addressNumber: formData.addressNumber,
      city: formData.city,
      zip: formData.zip,
      plan: 'Compra Avulsa',
      price: totalPrice,
      cardLast4: cardData.cardNumber.replace(/\s/g, '').slice(-4),
      expiry: cardData.expiry,
    });

    if (orderResult.success) {
      setSubmitSuccess(true);
      cartCoffee.forEach(item => clearCart(item.id));
      toast.success('Compra realizada com sucesso! 🎉');
      setTimeout(() => navigate('/'), 2000);
    } else {
      toast.error(orderResult.message || 'Erro ao registrar pedido.');
    }

    setIsSubmitting(false);
  };

  // Redireciona se não estiver logado
  if (!token) {
    navigate('/login');
    return null;
  }

  // Carrinho vazio
  if (cartCoffee.length === 0 && !submitSuccess) {
    return (
      <div className="min-h-screen bg-[#12100E] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <ShoppingBag size={48} className="text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-[#F4F1EA] mb-2">Carrinho vazio</h2>
            <p className="text-gray-400 mb-6">Adicione produtos ao carrinho antes de finalizar a compra.</p>
            <button onClick={() => navigate('/Products')} className="bg-[#c5a47e] hover:bg-[#a38665] text-[#12100E] font-bold py-3 px-6 rounded-lg transition-all uppercase tracking-widest text-sm">
              Ver Cafés
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const cartItemsContent = (
    <div className="space-y-4 mb-8">
      {cartCoffee.map((item) => (
        <div key={item.id} className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
          <div className="flex items-center gap-3">
            <img src={item.img} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
            <span className="text-sm text-[#F4F1EA]">{item.name}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">{item.quantity}x</p>
            <p className="text-sm text-[#c5a47e]">R$ {(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#12100E] flex flex-col items-center font-sans antialiased">
      <Header />
      <main className="w-full max-w-lg mx-auto p-4 pt-32 flex-1">
        <article className="bg-[#1a1714] border border-white/5 rounded-2xl p-6 sm:p-10">
          {/* Breadcrumb */}
          <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-gray-500 hover:text-[#c5a47e] transition mb-6 text-sm uppercase tracking-widest">
            <ArrowLeft size={14} /> Voltar ao Carrinho
          </button>

          {submitSuccess ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={48} />
              </div>
              <h2 className="text-2xl font-bold text-[#F4F1EA] mb-2">Compra Confirmada!</h2>
              <p className="text-gray-400">Redirecionando para o início...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-10">
                <h1 className="text-4xl font-serif tracking-tight text-[#F4F1EA] mb-3">Finalizar Compra</h1>
                <div className="w-24 h-[2px] bg-[#c5a47e] mx-auto rounded-full"></div>
              </div>

              {cartItemsContent}

              {/* Step 1: Personal Info */}
              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#c5a47e]/20 text-[#c5a47e] flex items-center justify-center text-xs font-bold">1</span>
                  <span className="text-sm font-medium text-[#c5a47e] uppercase tracking-wider">Informações Pessoais</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Nome" required className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Sobrenome" required className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Rua" required className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                  <input name="addressNumber" value={formData.addressNumber} onChange={handleInputChange} placeholder="Número" required className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input name="city" value={formData.city} onChange={handleInputChange} placeholder="Cidade" required className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                  <input name="zip" value={formData.zip} onChange={handleInputChange} placeholder="CEP" required className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition" />
                </div>
              </div>

              {/* Step 2: Payment */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#c5a47e]/20 text-[#c5a47e] flex items-center justify-center text-xs font-bold">2</span>
                <span className="text-sm font-medium text-[#c5a47e] uppercase tracking-wider">Dados de Pagamento</span>
              </div>
              <div className="mb-8 p-5 bg-black/30 border border-white/10 rounded-lg">
                <SimulatedPayment values={cardData} onChange={setCardData} />
              </div>

              {/* Total */}
              <div className="bg-black/30 rounded-2xl p-6 mb-8 border border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Valor Total</span>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">R$</p>
                    <p className="text-3xl font-bold text-[#F4F1EA]">{totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#c5a47e] hover:bg-[#a38665] text-[#12100E] font-bold py-4 rounded-lg transition-all duration-300 uppercase tracking-widest text-sm disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Processando pagamento...
                  </>
                ) : (
                  <>
                    Confirmar Pagamento <ShieldCheck size={20} />
                  </>
                )}
              </button>
            </form>
          )}
        </article>
      </main>
      <Footer />
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Checkout;
