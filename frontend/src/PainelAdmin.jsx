import { useState } from "react";

export default function PainelAdmin() {
  const [senha, setSenha] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [logado, setLogado] = useState(false);

  const buscarAgenda = async () => {
    try {
      const resposta = await fetch("http://localhost:3000/agendamentos", {
        method: "GET",
        headers: { "x-api-key": senha },
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        setAgendamentos(dados);
        setLogado(true);
      } else {
        alert("Senha incorreta! Acesso negado.");
      }
    } catch (erro) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  const mudarStatus = async (id, novoStatus) => {
    try {
      const resposta = await fetch(
        `http://localhost:3000/agendamentos/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": senha,
          },
          body: JSON.stringify({ status: novoStatus }),
        },
      );

      if (resposta.ok) {
        buscarAgenda();
      }
    } catch (erro) {
      alert("Erro ao atualizar o status.");
    }
  };

  return (
    <div className="admin-section">
      <h2>Área do Tatuador</h2>

      {!logado ? (
        <div className="login-box">
          <input
            type="password"
            placeholder="Senha da API..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="input-field"
            style={{ flex: 1 }}
          />
          <button onClick={buscarAgenda} className="btn">
            Entrar
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => setLogado(false)} className="btn btn-sair">
            Sair do Painel
          </button>

          <div className="agenda-list">
            {agendamentos.map((ag) => (
              <div key={ag.id} className={`agenda-card ${ag.status}`}>
                <div className="agenda-info">
                  <h3>{ag.nomeCliente}</h3>
                  <p>📞 {ag.telefone}</p>
                  <p>📅 {new Date(ag.dataHora).toLocaleString()}</p>
                  <p>
                    🖋️ <i>"{ag.descricao}"</i>
                  </p>
                  <span className="status-badge">{ag.status}</span>
                </div>

                <div className="actions">
                  <button
                    onClick={() => mudarStatus(ag.id, "CONFIRMADO")}
                    className="btn btn-confirmar"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => mudarStatus(ag.id, "CANCELADO")}
                    className="btn btn-cancelar"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
