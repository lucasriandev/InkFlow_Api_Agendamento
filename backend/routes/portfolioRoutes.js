const express = require("express");
const router = express.Router();

// 1. Importando e inicializando o tradutor do Banco de Dados (Prisma)
// Substitua o require para ficar assim de novo:
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const trabalhos = await prisma.trabalho.findMany();
    res.json(trabalhos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar portfolio" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { estilos, descricao, imagemUrl } = req.body;
    const novoTrabalho = await prisma.trabalho.create({
      data: {
        estilo: estilo,
        descricao: descricao,
        imagemUrl: imagemUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar o trabalho" });
  }
});

module.exports = router;
