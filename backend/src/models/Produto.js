// const produtosModels = [
//   // --- QUENTES ---
//   {
//     id: 1,
//     category: "Quentes",
//     name: "Velvet Espresso",
//     price: 12,
//     desc: "Notas de chocolate amargo e caramelo.",
//     img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=600&auto=format&fit=crop"
//   },
//   {
//     id: 2,
//     category: "Quentes",
//     name: "Aurora Latte",
//     price: 18,
//     desc: "Leite cremoso com infusão de baunilha orgânica.",
//     img: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop"
//   },
//   {
//     id: 3,
//     category: "Quentes",
//     name: "Cappuccino Royale",
//     price: 20,
//     desc: "Equilíbrio perfeito de espresso, leite vaporizado e espuma.",
//     img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600&auto=format&fit=crop"
//   },
//   {
//     id: 4,
//     category: "Quentes",
//     name: "Mocha Obsidian",
//     price: 24,
//     desc: "Espresso com calda artesanal de cacau 70% e leite cremoso.",
//     img: "https://images.unsplash.com/photo-1599398054066-846f28917f38?q=80&w=600&auto=format&fit=crop"
//   },

//   // --- GELADOS ---
//   {
//     id: 5,
//     category: "Gelados",
//     name: "Cold Brew Citrus",
//     price: 16,
//     desc: "Extração a frio de 18h com notas de limão.",
//     img: "https://images.unsplash.com/photo-1517959104624-4d71456a1f15?q=80&w=600&auto=format&fit=crop"
//   },
//   {
//     id: 6,
//     category: "Gelados",
//     name: "Iced Pistachio",
//     price: 22,
//     desc: "Café gelado com creme artesanal de pistache.",
//     img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop"
//   },
//   {
//     id: 7,
//     category: "Gelados",
//     name: "Vanilla Cold Foam",
//     price: 21,
//     desc: "Cold brew coberto com espuma fria de baunilha.",
//     img: "https://images.unsplash.com/photo-1553909489-cd47e0907d3f?q=80&w=600&auto=format&fit=crop"
//   },
//   {
//     id: 8,
//     category: "Gelados",
//     name: "Caramel Frappé",
//     price: 26,
//     desc: "Bebida batida com gelo, café, caramelo e chantilly.",
//     img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop"
//   },

//   // --- GRÃOS ---
//   {
//     id: 9,
//     category: "Grãos",
//     name: "Etiópia Sidamo",
//     price: 65,
//     desc: "Pacote 250g. Notas florais e acidez cítrica.",
//     img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&auto=format&fit=crop"
//   },
//   {
//     id: 10,
//     category: "Grãos",
//     name: "Brasil Bourbon",
//     price: 55,
//     desc: "Pacote 250g. Doçura intensa de mel e nozes.",
//     img: "https://images.unsplash.com/photo-1587049016823-69ef9d68bd44?q=80&w=600&auto=format&fit=crop"
//   },
//   {
//     id: 11,
//     category: "Grãos",
//     name: "Colombia Huila",
//     price: 72,
//     desc: "Pacote 250g. Corpo aveludado com notas de frutas vermelhas.",
//     img: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=600&auto=format&fit=crop"
//   },
//   {
//     id: 12,
//     category: "Grãos",
//     name: "Blend Assinatura",
//     price: 58,
//     desc: "Pacote 250g. Nossa mistura exclusiva equilibrada.",
//     img: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=600&auto=format&fit=crop"
//   },
// ];


// module.exports = produtosModels; 

const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true,
    trim: true
  },
  img: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Produto', ProdutoSchema);