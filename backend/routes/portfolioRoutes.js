const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const MAX_LIMIT = 50;
const DEFAULT_LIMIT = 20;

function parsePositiveInt(value) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : null;
}
//Ela transforma entrada insegura em número confiável.

function normalizeText(value, field, maxLength) {
  if (typeof value !== "string") {
    return { error: `${field} deve ser um texto` };
  }
  //Retorna tipo da variável.

  const trimmed = value.trim();
  if (!trimmed) {
    return { error: `${field} e obrigatorio` };
  }

  if (trimmed.length > maxLength) {
    return { error: `${field} deve ter no maximo ${maxLength} caracteres` };
  }

  return { value: trimmed };
}

function normalizeOptionalUrl(value) {
  if (value === undefined || value === null || value === "") {
    return { value: null };
  }

  if (typeof value !== "string") {
    return { error: "imagemUrl deve ser um texto" };
  }

  const trimmed = value.trim();
  try {
    const url = new URL(trimmed);
    if (!["http:", "https:"].includes(url.protocol)) {
      return { error: "imagemUrl deve usar http ou https" };
    }
  } catch (error) {
    return { error: "imagemUrl deve ser uma URL valida" };
  }

  if (trimmed.length > 500) {
    return { error: "imagemUrl deve ter no maximo 500 caracteres" };
  }

  return { value: trimmed };
}

function requireAdmin(req, res, next) {
  const adminApiKey = process.env.ADMIN_API_KEY;

  if (!adminApiKey) {
    return res.status(503).json({ error: "ADMIN_API_KEY nao configurada" });
  }

  if (req.get("x-api-key") !== adminApiKey) {
    return res.status(401).json({ error: "Nao autorizado" });
  }

  next();
}

function validateTrabalho(body, partial = false) {
  const data = {};

  if (!partial || body.estilo !== undefined) {
    const estilo = normalizeText(body.estilo, "estilo", 80);
    if (estilo.error) return { error: estilo.error };
    data.estilo = estilo.value;
  }

  if (!partial || body.descricao !== undefined) {
    const descricao = normalizeText(body.descricao, "descricao", 2000);
    if (descricao.error) return { error: descricao.error };
    data.descricao = descricao.value;
  }

  if (!partial || body.imagemUrl !== undefined) {
    const imagemUrl = normalizeOptionalUrl(body.imagemUrl);
    if (imagemUrl.error) return { error: imagemUrl.error };
    data.imagemUrl = imagemUrl.value;
  }

  if (partial && Object.keys(data).length === 0) {
    return { error: "Informe pelo menos um campo para atualizar" };
  }

  return { data };
}

function handleDatabaseError(error, res, message) {
  if (error.code === "P2025") {
    return res.status(404).json({ error: "Trabalho nao encontrado" });
  }

  console.error(error);
  return res.status(500).json({ error: message });
}

router.get("/", async (req, res) => {
  try {
    const page = parsePositiveInt(req.query.page) || 1;
    const requestedLimit = parsePositiveInt(req.query.limit) || DEFAULT_LIMIT;
    const limit = Math.min(requestedLimit, MAX_LIMIT);

    const trabalhos = await prisma.trabalho.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        estilo: true,
        descricao: true,
        imagemUrl: true,
        createdAt: true,
      },
    });

    res.json(trabalhos);
  } catch (error) {
    handleDatabaseError(error, res, "Erro ao buscar portfolio");
  }
});

router.get("/:id", async (req, res) => {
  const id = parsePositiveInt(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "ID invalido" });
  }

  try {
    const trabalho = await prisma.trabalho.findUnique({
      where: { id },
      select: {
        id: true,
        estilo: true,
        descricao: true,
        imagemUrl: true,
        createdAt: true,
      },
    });

    if (!trabalho) {
      return res.status(404).json({ error: "Trabalho nao encontrado" });
    }

    res.json(trabalho);
  } catch (error) {
    handleDatabaseError(error, res, "Erro ao buscar trabalho");
  }
});

router.post("/", requireAdmin, async (req, res) => {
  const validation = validateTrabalho(req.body);
  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const novoTrabalho = await prisma.trabalho.create({
      data: validation.data,
    });

    res.status(201).json({ mensagem: "Trabalho salvo", dados: novoTrabalho });
  } catch (error) {
    handleDatabaseError(error, res, "Erro ao salvar o trabalho");
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  const id = parsePositiveInt(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "ID invalido" });
  }

  const validation = validateTrabalho(req.body, true);
  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const trabalhoAtualizado = await prisma.trabalho.update({
      where: { id },
      data: validation.data,
    });

    res.json({ mensagem: "Trabalho Atualizado", dados: trabalhoAtualizado });
  } catch (error) {
    handleDatabaseError(error, res, "Erro ao atualizar o trabalho");
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const id = parsePositiveInt(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "ID invalido" });
  }

  try {
    await prisma.trabalho.delete({
      where: { id },
    });

    res.json({ mensagem: "Trabalho apagado com sucesso!" });
  } catch (error) {
    handleDatabaseError(error, res, "Erro ao apagar o trabalho");
  }
});

module.exports = router;
