import React, { useState } from 'react';
import { CreditCard, Lock, Calendar, User } from 'lucide-react';

const masks = {
  cardNumber(value) {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  },
  expiry(value) {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return digits.slice(0, 2) + '/' + digits.slice(2);
    }
    return digits;
  },
  cvc(value) {
    return value.replace(/\D/g, '').slice(0, 4);
  },
};

const cardBrands = [
  { pattern: /^4/, name: 'Visa', color: 'text-blue-400' },
  { pattern: /^5[1-5]/, name: 'Mastercard', color: 'text-orange-400' },
  { pattern: /^3[47]/, name: 'Amex', color: 'text-cyan-400' },
  { pattern: /^6(?:011|5)/, name: 'Discover', color: 'text-purple-400' },
];

const detectBrand = (number) => {
  const clean = number.replace(/\s/g, '');
  for (const brand of cardBrands) {
    if (brand.pattern.test(clean)) return brand;
  }
  return null;
};

const SimulatedPayment = ({ values, onChange }) => {
  const brand = detectBrand(values.cardNumber);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let maskedValue = value;

    if (name === 'cardNumber') maskedValue = masks.cardNumber(value);
    else if (name === 'expiry') maskedValue = masks.expiry(value);
    else if (name === 'cvc') maskedValue = masks.cvc(value);

    onChange({ ...values, [name]: maskedValue });
  };

  return (
    <div className="space-y-5">
      {/* Card Preview */}
      <div className="relative p-6 bg-gradient-to-br from-[#2a201a] to-[#1a1512] rounded-xl border border-[#c4a484]/20 overflow-hidden mb-6">
        <div className="absolute top-4 right-4">
          {brand ? (
            <span className={`text-xs font-bold uppercase tracking-wider ${brand.color}`}>
              {brand.name}
            </span>
          ) : (
            <CreditCard size={24} className="text-gray-500" />
          )}
        </div>
        <div className="mt-8">
          <p className="text-lg md:text-xl tracking-[0.2em] text-[#fdfaf1] font-mono">
            {values.cardNumber || '•••• •••• •••• ••••'}
          </p>
        </div>
        <div className="flex gap-8 mt-4">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Titular</p>
            <p className="text-sm text-gray-300">{values.cardName || 'Seu Nome'}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Validade</p>
            <p className="text-sm text-gray-300">{values.expiry || 'MM/AA'}</p>
          </div>
        </div>
      </div>

      {/* Card Number */}
      <div className="relative">
        <CreditCard size={18} className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          name="cardNumber"
          value={values.cardNumber}
          onChange={handleChange}
          placeholder="Número do Cartão"
          required
          maxLength={19}
          className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 pl-10 text-white placeholder-gray-600 focus:border-[#c4a484] outline-none transition"
        />
      </div>

      {/* Card Name */}
      <div className="relative">
        <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          name="cardName"
          value={values.cardName}
          onChange={handleChange}
          placeholder="Nome do Titular"
          required
          className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 pl-10 text-white placeholder-gray-600 focus:border-[#c4a484] outline-none transition"
        />
      </div>

      {/* Expiry + CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Calendar size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            name="expiry"
            value={values.expiry}
            onChange={handleChange}
            placeholder="MM/AA"
            required
            maxLength={5}
            className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 pl-10 text-white placeholder-gray-600 focus:border-[#c4a484] outline-none transition"
          />
        </div>
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            name="cvc"
            value={values.cvc}
            onChange={handleChange}
            placeholder="CVC"
            required
            maxLength={4}
            className="w-full bg-black/50 border border-white/10 text-sm rounded-lg p-3 pl-10 text-white placeholder-gray-600 focus:border-[#c4a484] outline-none transition"
          />
        </div>
      </div>

      {/* Security notice */}
      <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-2">
        <Lock size={12} />
        <span>Pagamento simulado — nenhuma transação real será processada</span>
      </div>
    </div>
  );
};

export default SimulatedPayment;
