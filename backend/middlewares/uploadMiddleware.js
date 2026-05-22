const multer = require("multer");
const path = require("path");

// Configurando "Onde" e "Como" vamos guardar os arquivos
const storage = multer.diskStorage({
  // 1. Destino: Onde o arquivo vai parar no nosso PC
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // 2. Nome do Arquivo: Como vamos chamá-lo
  filename: (req, file, cb) => {
    // Se dois tatuadores subirem uma foto chamada "tatuagem.jpg", uma apaga a outra.
    // Para evitar isso, colocamos a data exata em milissegundos na frente do nome!
    const nomeUnico = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Extrai a extensão original (ex: .png, .jpg) e junta tudo
    cb(null, nomeUnico + path.extname(file.originalname));
  },
});

// Criamos o middleware de fato com as nossas regras
const upload = multer({ storage: storage });

module.exports = upload;
