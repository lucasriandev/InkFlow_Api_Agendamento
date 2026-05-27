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

    const horarioOcupado = await prisma.agendamento.findFirst({
      where: {
        dataHora: dataConvertida,

        status: {
          not: "CANCELADO",
        },
      },
    });

    if (horarioOcupado) {
      return res.status(409).json({
        error: "Este horario já está reservado para outro cliente!",
      });
    }

    const novoAgendamento = await prisma.agendamento.create({
      data: {
        nomeCliente,
        telefone,
        dataHora: dataConvertida,
        descricao,
      },
    });

    res
      .status(201)
      .json({
        mensagem: "Horario solicitado com sucesso!",
        dados: novoAgendamento,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar agendamento" });
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

    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o status" });
  }
});

module.exports = router;

/* FLUXO MENTAL

Frontend envia POST
↓
Express recebe
↓
req.body pega dados
↓
Prisma salva no banco
↓
Servidor responde JSON

Admin faz GET
↓
Middleware valida API KEY
↓
Prisma busca dados
↓
Servidor retorna lista

Admin faz PATCH
↓
Middleware valida
↓
Pega ID da URL
↓
Pega status do body
↓
Prisma atualiza banco
↓
Servidor responde
*/
