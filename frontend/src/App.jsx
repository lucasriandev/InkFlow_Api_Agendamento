import { useState, useEffect } from "react";
import AgendamentoForm from "./agendamentoForm";

function App() {
  const [trabalhos, setTrabalhos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/portfolio")
      .then((resposta) => resposta.json())
      .then((dados) => setTrabalhos(dados))
      .catch((erro) => console.error("Erro ao buscar os trabalhos", erro));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>InkFlow - Vitrine de Trabalhos</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {trabalhos.map((trabalho) => (
          <div
            key={trabalho.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              width: "250px",
            }}
          >
            <img
              src={trabalho.imagemUrl}
              alt={trabalho.descricao}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          </div>
        ))}
      </div>
      <AgendamentoForm />
    </div>
  );
}

export default App;
