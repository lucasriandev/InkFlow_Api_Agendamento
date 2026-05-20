const express = require("express");
const app = express();

app.disable("x-powered-by");

app.use(express.json({ limit: "100kb" }));
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
});

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

module.exports = app;
