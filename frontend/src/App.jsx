import { useState, useEffect } from "react";
import AgendamentoForm from "./agendamentoForm";
import PainelAdmin from "./PainelAdmin";
import "./App.css"; // Certifique-se de importar o CSS!

function App() {
  const [trabalhos, setTrabalhos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/portfolio")
      .then((resposta) => resposta.json())
      .then((dados) => setTrabalhos(dados))
      .catch((erro) => console.error("Erro ao buscar os trabalhos", erro));
  }, []);

  return (
    <div className="container">
      <h1>
        <span>Ink</span>Flow
      </h1>
      <h2>Vitrine de Trabalhos</h2>

      <div className="portfolio-grid">
        {trabalhos.map((trabalho) => (
          <div key={trabalho.id} className="portfolio-card">
            <img src={trabalho.imagemUrl} alt={trabalho.descricao} />
          </div>
        ))}
      </div>

      <AgendamentoForm />
      <PainelAdmin />
    </div>
  );
}

export default App;
