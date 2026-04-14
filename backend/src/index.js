const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const produtosRoutes = require('./routes/routesProdutos');

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.MONGO_URI) {
  console.log("❌ MONGO_URI não definida");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Banco conectado"))
  .catch(() => console.log("❌ Erro ao conectar no banco"));

app.use('/api/AuroraBeans/cafes', produtosRoutes);

app.listen(3030, () => {
  console.log("🚀 Servidor rodando");
});