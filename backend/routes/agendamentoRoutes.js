const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function requireAdmin(req, res, next) {
  const adminApiKey = process.env.ADMIN_API_KEY;
  if (req.get("x-api-key") !== adminApiKey) {
    return res.status(401).json({ error: "Não autorizado" });
  }
  next();
}

router.post("/", async (req, res) => {
  try {
    const { nomeCliente, telefone, dataHora, descricao } = req.body;

    const dataConvertida = new Date(dataHora);

    const novoAgendamento = await prisma.agendamento.create({
      data: {
        nomeCliente,
        telefone,
        dataHora: dataConvertida,
        descricao,
      },
    });

    res.status(201).json({
      mensagem: "Horario solicitado com sucesso!",
      dados: novoAgendamento,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar o agendamento!" });
  }
});

router.get("/", requireAdmin, async (req, res) => {
  try {
    const agendamentos = await prisma.agendamento.findMany({
      orderBy: { dataHora: "asc" },
    });

    res.json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar agenda!" });
  }
});

router.patch("/:id/status", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const atualizado = await prisma.agendamento.update({
      where: { id: Number(id) },
      data: { status },
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o status" });
  }
});

module.exports = router;
