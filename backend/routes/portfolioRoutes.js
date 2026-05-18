const express = require("express");
const router = express.Router(); // mini servidor de rotas

router.get("/", (req, res) => {
  const trabalhos = [
    {
      id: 1,
      estilo: "Realismo",
      descricao: "Arcanjo Miguel com sombreamento detalhado",
    },
    { id: 2, estilo: "Blackwork", descricao: "Fechamento de antebraço" },
  ];
  res.json(trabalhos);
});

router.post("/", (req, res) => {
  const novoTrabalho = req.body;
  res
    .status(201)
    .json({
      mensagem: "Trabalho adicionado com sucesso!",
      dados: novoTrabalho,
    });
});

module.exports = router;
