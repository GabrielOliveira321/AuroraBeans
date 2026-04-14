const menuData = [
  {
    id: 1,
    category: "Quentes",
    name: "Velvet Espresso",
    price: 12, // Convertido para número para facilitar o cálculo do carrinho
    desc: "Notas de chocolate amargo e caramelo.",
    img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=600&auto=format&fit=crop" // Foto de um espresso clássico
  },
  {
    id: 2,
    category: "Quentes",
    name: "Aurora Latte",
    price: 18,
    desc: "Leite cremoso com infusão de baunilha orgânica.",
    img: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop" // Foto de um latte com arte no leite
  },
  {
    id: 7,
    category: "Quentes",
    name: "Cappuccino Royale",
    price: 20,
    desc: "Equilíbrio perfeito de espresso, leite vaporizado e espuma.",
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600&auto=format&fit=crop" // Foto de cappuccino artesanal
  },
  {
    id: 8,
    category: "Quentes",
    name: "Mocha Obsidian",
    price: 24,
    desc: "Espresso com calda artesanal de cacau 70% e leite cremoso.",
    img: "https://images.unsplash.com/photo-1599398054066-846f28917f38?q=80&w=600&auto=format&fit=crop" // Foto de café mocha rico
  },

  {
    id: 3,
    category: "Gelados",
    name: "Cold Brew Citrus",
    price: 16,
    desc: "Extração a frio de 18h com notas de limão.",
    img: "https://images.unsplash.com/photo-1517713982677-4b23332f0594?q=80&w=600&auto=format&fit=crop" // Foto de cold brew com gelo e cítricos
  },
  {
    id: 4,
    category: "Gelados",
    name: "Iced Pistachio",
    price: 22,
    desc: "Café gelado com creme artesanal de pistache.",
    img: "https://images.unsplash.com/photo-1610963162816-95e21bd0402b?q=80&w=600&auto=format&fit=crop" // Foto de bebida de café gelado com camadas
  },
  {
    id: 9,
    category: "Gelados",
    name: "Vanilla Cold Foam",
    price: 21,
    desc: "Cold brew coberto com espuma fria de baunilha.",
    img: "https://images.unsplash.com/photo-1562447457-3f8d38865675?q=80&w=600&auto=format&fit=crop" // Foto de café gelado com espuma branca no topo
  },
  {
    id: 10,
    category: "Gelados",
    name: "Caramel Frappé",
    price: 26,
    desc: "Bebida batida com gelo, café, caramelo e chantilly.",
    img: "https://images.unsplash.com/photo-1596791166687-5c4d092d6e32?q=80&w=600&auto=format&fit=crop" // Foto de frappé com caramelo
  },

  {
    id: 5,
    category: "Grãos",
    name: "Etiópia Sidamo",
    price: 65,
    desc: "Pacote 250g. Notas florais e acidez cítrica.",
    img: "https://images.unsplash.com/photo-1595940873420-33d31818307c?q=80&w=600&auto=format&fit=crop" // Foto de grãos de café em um saco/tigela
  },
  {
    id: 6,
    category: "Grãos",
    name: "Brasil Bourbon",
    price: 55,
    desc: "Pacote 250g. Doçura intensa de mel e nozes.",
    img: "https://images.unsplash.com/photo-1587049016823-69ef9d68bd44?q=80&w=600&auto=format&fit=crop" // Foto de grãos de café de alta qualidade
  },
  {
    id: 11,
    category: "Grãos",
    name: "Colombia Huila",
    price: 72,
    desc: "Pacote 250g. Corpo aveludado com notas de frutas vermelhas.",
    img: "https://images.unsplash.com/photo-1514432324609-8af8f1c841c5?q=80&w=600&auto=format&fit=crop" // Foto de grãos de café secando ao sol (remete a origem)
  },
  {
    id: 12,
    category: "Grãos",
    name: "Blend Assinatura",
    price: 58,
    desc: "Pacote 250g. Nossa mistura exclusiva equilibrada.",
    img: "https://images.unsplash.com/photo-1621251996160-b6bc6938927b?q=80&w=600&auto=format&fit=crop" // Foto de grãos de café torrados misturados
  },
];
