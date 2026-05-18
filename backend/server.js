const express = require("express");
const app = express();

app.use(express.json());

const portfolioRoutes = require("./routes/portfolioRoutes");

//"Toda vez que alguém acessar a URL que comece com /portfolio, mande para aquele arquivo cuidar"
app.use("/portfolio", portfolioRoutes);

app.listen(3000, () => {
  console.log("Servidor do InkFlow rodando na porta 3000!");
});
