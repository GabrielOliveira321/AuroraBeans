const express = require('express');
const Produto = require('../models/Produto');
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find(); 

    if (produtos.length === 0) {
      return res.status(404).json({
        message: "Nenhum produto encontrado"
      });
    }

    return res.status(200).json(produtos);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Erro interno no servidor",
      error: error.message
    });
  }
});

router.get("/:id", (req, res) => {
    try {
        const id = Number(req.params.id);

        const produto = produtosModels.find((p) => p.id === id);

        if (!produto) {
            return res.status(404).json({
                message: "Produto não encontrado"
            });
        }

        return res.status(200).json(produto);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erro interno no servidor"
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, price, category, desc, img } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                message: "Nome e preço são obrigatórios"
            });
        }

        const novoProduto = new Produto({
            name,
            price,
            category,
            desc,
            img
        });

        await novoProduto.save();

        res.status(201).json(novoProduto);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Erro ao salvar produto",
            error: error.message // ✅ corrigido aqui
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const produtoRemovido = await Produto.findByIdAndDelete(id);

        if (produtoRemovido === -1) {
            return res.status(404).json({
                message: "Produto não encontrado"
            });
        }

        return res.status(200).json({
            message: "Produto removido com sucesso",
            produto: produtoRemovido
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erro ao deletar produto"
        });
    }
});


// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const produtoRemovido = await Produto.findByIdAndDelete(id);

//     if (!produtoRemovido) {
//       return res.status(404).json({
//         message: "Produto não encontrado"
//       });
//     }

//     return res.status(200).json({
//       message: "Produto removido com sucesso",
//       produto: produtoRemovido
//     });

//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       message: "Erro ao deletar produto",
//       error: error.message
//     });
//   }
// });

module.exports = router;