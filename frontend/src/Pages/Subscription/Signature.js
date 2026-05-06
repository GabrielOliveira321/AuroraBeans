import React from 'react';
import { User, MapPin, CreditCard, ArrowRight, CheckCircle } from 'lucide-react';
import { useSubScription } from '../../Provider/Subscription';
import { checkoutApi } from '../../api/checkoutApi';

const Signature = () => {
  const [DataForm, setDataForm] = React.useState({
    name: '', surname: '', city: '', state: '', cep: '', numCat: '', validity: '', cvv: '', address: '', numHome: ''
  });
  const [submitError, setSubmitError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const { chosePlan } = useSubScription();

  const statesOptions = ['', 'Acre', "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]

  const masks = {
    cep(value) {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, "$1");
    },
    card(value) {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\s\d{4})\d+?$/, "$1");
    },
    expiration(value) {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substring(0, 5);
    }
  };

  const handlerOnChangeForm = (e) => {
    const { name, value } = e.target;
    let maskedValue = value;

    if (name === "cep") maskedValue = masks.cep(value);
    if (name === "numCat") maskedValue = masks.card(value);
    if (name === "validity") maskedValue = masks.expiration(value);

    setDataForm({ ...DataForm, [name]: maskedValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    if (!chosePlan || !chosePlan.name) {
      setSubmitError('Selecione um plano antes de finalizar a assinatura.');
      return;
    }

    const payload = {
      firstName: DataForm.name,
      lastName: DataForm.surname,
      address: DataForm.address,
      addressNumber: DataForm.numHome,
      city: DataForm.city,
      zip: DataForm.cep,
      cardNumber: DataForm.numCat,
      expiry: DataForm.validity,
      cvc: DataForm.cvv,
      plan: chosePlan.name,
      price: chosePlan.price?.toString() || '',
    };

    setIsSubmitting(true);
    const result = await checkoutApi(payload);
    setIsSubmitting(false);

    if (!result.success) {
      setSubmitError(result.message || 'Erro ao enviar os dados de checkout.');
      return;
    }

    alert(`Checkout enviado com sucesso! Plano: ${chosePlan.name} - R$ ${chosePlan.price}`);
    setDataForm({ name: '', surname: '', city: '', state: '', cep: '', numCat: '', validity: '', cvv: '', address: '', numHome: '' });
  };

  return (
    <div className="bg-[#161310] border border-white/5 p-8 lg:p-10 shadow-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-[1px] flex-1 bg-white/5"></div>
        <h3 className="text-white font-serif text-xl">Informações de Checkout</h3>
        <div className="h-[1px] flex-1 bg-white/5"></div>
      </div>

      <form className="space-y-8" onSubmit={(event) => handleSubmit(event)}>
        <div className="space-y-4">
          <label className="text-[#c4a484] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
            <User size={12} /> Dados Pessoais
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input required name='name' value={DataForm.name} onChange={(e) => handlerOnChangeForm(e)} type="text" placeholder="Nome" className="bg-[#0f0c0a] border border-white/5 p-3 text-sm text-white focus:border-[#c4a484]/50 outline-none transition-all placeholder:text-gray-600" />
            <input required name='surname' value={DataForm.surname} onChange={(e) => handlerOnChangeForm(e)} type="text" placeholder="Sobrenome" className="bg-[#0f0c0a] border border-white/5 p-3 text-sm text-white focus:border-[#c4a484]/50 outline-none transition-all placeholder:text-gray-600" />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[#c4a484] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
            <MapPin size={12} /> Endereço de Entrega
          </label>

          <div className="flex gap-3">
            <input required name='address' value={DataForm.address} onChange={(e) => handlerOnChangeForm(e)} type="text" placeholder="Endereço Completo" className="w-full bg-[#0f0c0a] border border-white/5 p-3 text-sm text-white focus:border-[#c4a484]/50 outline-none transition-all placeholder:text-gray-600" />
            <input
              name="numHome"
              value={DataForm.numHome}
              type="text"
              placeholder="Nº"
              onChange={(e) => handlerOnChangeForm(e)}
              className="w-24 bg-[#0f0c0a] border border-white/5 p-3 text-sm text-white focus:border-[#c4a484]/50 outline-none transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <input required name='city' value={DataForm.city} onChange={(e) => handlerOnChangeForm(e)} type="text" placeholder="Cidade" className="bg-[#0f0c0a] border border-white/5 p-3 text-sm text-white focus:border-[#c4a484]/50 outline-none transition-all placeholder:text-gray-600" />
            <select
              name="state"
              value={DataForm.state}
              onChange={handlerOnChangeForm}
              className="bg-[#0f0c0a] border border-white/5 p-3 text-sm text-white focus:border-[#c4a484]/50 outline-none transition-all"
            >

              {statesOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>

            <input required name='cep' value={DataForm.cep} onChange={(e) => handlerOnChangeForm(e)} type="text" placeholder="00000-000" className="bg-[#0f0c0a] border border-white/5 p-3 text-sm text-white focus:border-[#c4a484]/50 outline-none transition-all placeholder:text-gray-600" />
          </div>
        </div>

        <div className="space-y-4 pb-4">
          <label className="text-[#c4a484] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
            <CreditCard size={12} /> Pagamento Seguro
          </label>
          <div className="space-y-3">
            <input required name='numCat' value={DataForm.numCat} onChange={(e) => handlerOnChangeForm(e)} type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#0f0c0a] border border-white/5 p-3 text-sm text-white focus:border-[#c4a484]/50 outline-none transition-all placeholder:text-gray-600" />
            <div className="grid grid-cols-2 gap-3">
              <input required name='validity' value={DataForm.validity} onChange={(e) => handlerOnChangeForm(e)} type="text" maxLength={5} placeholder="Validade (MM/AA)" className="bg-[#0f0c0a] border border-white/5 p-3 text-sm text-white focus:border-[#c4a484]/50 outline-none transition-all placeholder:text-gray-600" />
              <input required name='cvv' value={DataForm.cvv} onChange={(e) => handlerOnChangeForm(e)} type="text" maxLength={3} placeholder="CVV" className="bg-[#0f0c0a] border border-white/5 p-3 text-sm text-white focus:border-[#c4a484]/50 outline-none transition-all placeholder:text-gray-600" />
            </div>
          </div>
        </div>

        {submitError && <p className="text-sm text-red-400">{submitError}</p>}

        <button disabled={isSubmitting} className="w-full py-4 bg-[#c4a484] text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? 'Enviando...' : 'Finalizar Assinatura'} <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
};

export default Signature;