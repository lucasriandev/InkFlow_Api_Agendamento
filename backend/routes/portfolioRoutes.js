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

router.put("/:id", async (req, res) => {
  try {
    //no express id se pega assim
    const { id } = req.params;
    const { estilo, descricao, imagemUrl } = req.body;

    const trabalhoAtualizado = await prisma.trabalho.update({
      where: { id: Number(id) }, // O ID vem como string da URL, temos de converter
      data: { estilo, descricao, imagemUrl },
    });

    res.json({ mensagem: "Trabalho Atualizado", dados: trabalhoAtualizado });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao atualizar o trabalho. Verifique se o id existe.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.trabalho.delete({
      where: { id: Number(id) },
    });

    res.json({ mensagem: "Trabalho apagado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao apagar. Verifique se o Id existe" });
  }
});

module.exports = router;
