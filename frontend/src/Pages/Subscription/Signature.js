import React, { useState } from 'react';
import { User, MapPin, ArrowRight, CheckCircle, Loader } from 'lucide-react';
import { useSubScription } from '../../Provider/Subscription';
import { useAuth } from '../../Provider/AuthProvider';
import { confirmOrderApi } from '../../api/checkoutApi';
import { toast } from 'react-toastify';
import SimulatedPayment from '../../Components/Payment/SimulatedPayment';

const SignatureForm = ({ planData }) => {
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [DataForm, setDataForm] = useState({
    name: '', surname: '', city: '', state: '', cep: '', address: '', numHome: ''
  });
  const [cardData, setCardData] = useState({
    cardNumber: '', cardName: '', expiry: '', cvc: ''
  });

  const statesOptions = ['', 'Acre', "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"];

  const masks = {
    cep(value) {
      return value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2").replace(/(-\\d{3})\\d+?$/, "$1");
    },
  };

  const handlerOnChangeForm = (e) => {
    const { name, value } = e.target;
    let maskedValue = value;
    if (name === "cep") maskedValue = masks.cep(value);
    setDataForm(prev => ({ ...prev, [name]: maskedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simula processamento de pagamento (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderResult = await confirmOrderApi(token, {
      firstName: DataForm.name,
      lastName: DataForm.surname,
      address: DataForm.address,
      addressNumber: DataForm.numHome,
      city: DataForm.city,
      zip: DataForm.cep,
      plan: planData.name,
      price: Number(planData.price),
      cardLast4: cardData.cardNumber.replace(/\s/g, '').slice(-4),
      expiry: cardData.expiry,
    });

    if (orderResult.success) {
      setSubmitSuccess(true);
    } else {
      toast.error(orderResult.message || 'Erro ao registrar assinatura.');
    }

    setIsSubmitting(false);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[#12100E] flex flex-col justify-center items-center p-4">
        <div className="bg-[#1a1714] p-10 rounded-2xl border border-white/5 max-w-lg text-center">
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold text-[#F4F1EA] mb-4">Assinatura Confirmada!</h2>
          <p className="text-gray-400 mb-6">
            Parabéns! Sua assinatura do plano <strong className="text-[#c5a47e]">{planData.name}</strong> foi ativada com sucesso.
          </p>
          <button onClick={() => window.location.href = '/'} className="bg-[#c5a47e] hover:bg-[#a38665] text-[#12100E] font-bold py-3 px-8 rounded-lg transition-all duration-300 uppercase tracking-widest text-sm">
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#12100E] flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 pt-0">
        <article className="bg-[#1a1714] border border-white/5 rounded-2xl p-6 sm:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#F4F1EA] mb-3">Finalize sua Assinatura</h1>
            <div className="w-24 h-[2px] bg-[#c5a47e] mx-auto rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#c5a47e]/20 text-[#c5a47e] flex items-center justify-center text-xs font-bold">1</span>
                <span className="text-sm font-medium text-[#c5a47e] uppercase tracking-wider">Informações Pessoais</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input name="name" value={DataForm.name} onChange={handlerOnChangeForm} placeholder="Nome" required className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 pl-10 text-white focus:border-[#c5a47e] outline-none transition" />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input name="surname" value={DataForm.surname} onChange={handlerOnChangeForm} placeholder="Sobrenome" required className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 pl-10 text-white focus:border-[#c5a47e] outline-none transition" />
                </div>
              </div>
            </div>

            {/* Step 2: Address */}
            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#c5a47e]/20 text-[#c5a47e] flex items-center justify-center text-xs font-bold">2</span>
                <span className="text-sm font-medium text-[#c5a47e] uppercase tracking-wider">Endereço</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input name="address" value={DataForm.address} onChange={handlerOnChangeForm} placeholder="Rua / Logradouro" required className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 pl-10 text-white focus:border-[#c5a47e] outline-none transition" />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input name="numHome" value={DataForm.numHome} onChange={handlerOnChangeForm} placeholder="Número" required className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 pl-10 text-white focus:border-[#c5a47e] outline-none transition" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input name="city" value={DataForm.city} onChange={handlerOnChangeForm} placeholder="Cidade" required className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 pl-10 text-white focus:border-[#c5a47e] outline-none transition" />
                </div>
                <select name="state" value={DataForm.state} onChange={handlerOnChangeForm} className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 text-gray-400 outline-none focus:border-[#c5a47e] transition">
                  {statesOptions.map((s, i) => <option key={i} value={s}>{s || "Selecione o Estado"}</option>)}
                </select>
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input name="cep" value={DataForm.cep} onChange={handlerOnChangeForm} placeholder="CEP (00000-000)" required className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 pl-10 text-white focus:border-[#c5a47e] outline-none transition" />
              </div>
            </div>

            {/* Step 3: Payment */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#c5a47e]/20 text-[#c5a47e] flex items-center justify-center text-xs font-bold">3</span>
              <span className="text-sm font-medium text-[#c5a47e] uppercase tracking-wider">Dados de Pagamento</span>
            </div>
            <div className="mb-8 p-5 bg-black/30 border border-white/10 rounded-lg">
              <SimulatedPayment values={cardData} onChange={setCardData} />
            </div>

            {/* Total */}
            <div className="bg-black/30 rounded-2xl p-6 mb-8 border border-white/5 flex justify-between items-center">
              <span className="text-gray-400 text-sm">Total Mensal</span>
              <div className="text-right">
                <p className="text-xs text-gray-500">R$</p>
                <p className="text-3xl font-bold text-[#F4F1EA]">{Number(planData.price).toFixed(2)}</p>
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
                  Ativar Assinatura <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </article>
      </div>
    </div>
  );
};

const Signature = () => {
  const { chosePlan } = useSubScription();
  const { token } = useAuth();
  const planData = chosePlan && chosePlan.name ? chosePlan : { name: 'Iniciante', price: 45 };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#12100E] flex items-center justify-center">
        <p className="text-gray-400">Faça login para assinar um plano.</p>
      </div>
    );
  }

  return <SignatureForm planData={planData} />;
};

export default Signature;
