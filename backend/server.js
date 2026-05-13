const express = require("express");

const app = express();

app.use(express.json());

app.get("/portfolio", (req, res) => {
  const trabalhos = [
    {
      id: 1,
      estilo: "Realismo",
      descricao:
        "Arcanjo Miguel com sombreamento detalhado e anatomia muscular",
    },
    {
      id: 2,
      estilo: "Blackwork",
      descricao: "Fechamento de antebraço com figura geométrica",
    },
    { id: 3, estilo: "Realismo", descricao: "Jesus" },
  ];

  res.json(trabalhos);
});

app.listen(3000, () => {
  console.log("Servidor do InkFlow rodando na porta 3000 🚀");
});
