const express = require("express");
const app = express();

app.disable("x-powered-by");
//“Não revele que meu backend usa express”

app.use(express.json({ limit: "100kb" }));

//Diz ao express para libertar o acesso publico a pasta
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
});

//segurança

const portfolioRoutes = require("./routes/portfolioRoutes");

app.get("/", (req, res) => {
  res.json({
    nome: "InkFlow API",
    rotas: ["GET /health", "GET /portfolio", "GET /portfolio/:id"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//"Toda vez que alguém acessar a URL que comece com /portfolio, mande para aquele arquivo cuidar"
app.use("/portfolio", portfolioRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Rota nao encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor do InkFlow rodando na porta ${port}!`);
  });
}

const agendamentosRoutes = require("./routes/agendamentoRoutes");

app.use("/agendamentos", agendamentosRoutes);

module.exports = app;

/* Cliente faz request
       ↓
Express recebe
       ↓
Middlewares rodam
       ↓
Rota correta encontrada
       ↓
Controller executa
       ↓
Resposta enviada
       ↓
Se erro → middleware de erro */
