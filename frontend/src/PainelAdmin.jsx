import { useState } from "react";

export default function PainelAdmin() {
  const [senha, setSenha] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [logado, setLogado] = useState(false);

  // 1. Função para "Logar" e buscar a agenda
  const buscarAgenda = async () => {
    try {
      const resposta = await fetch("http://localhost:3000/agendamentos", {
        method: "GET",
        headers: {
          "x-api-key": senha, // MANDANDO A CARTEIRADA PARA O SEGURANÇA DO NODE!
        },
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

  // 2. Função para Confirmar ou Cancelar um horário
  const mudarStatus = async (id, novoStatus) => {
    try {
      const resposta = await fetch(
        `http://localhost:3000/agendamentos/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": senha, // Precisa da senha de novo para alterar!
          },
          body: JSON.stringify({ status: novoStatus }),
        },
      );

      if (resposta.ok) {
        alert(`Status atualizado para ${novoStatus}`);
        buscarAgenda(); // Recarrega a lista para mostrar a cor nova
      }
    } catch (erro) {
      alert("Erro ao atualizar o status.");
    }
  };

  return (
    <div
      style={{
        marginTop: "50px",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderTop: "3px solid #333",
      }}
    >
      <h2>Painel do Tatuador (Admin)</h2>

      {/* TELA DE LOGIN (Se não estiver logado) */}
      {!logado ? (
        <div>
          <input
            type="password"
            placeholder="Digite a senha da API..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button
            onClick={buscarAgenda}
            style={{ padding: "8px 15px", cursor: "pointer" }}
          >
            Acessar Agenda
          </button>
        </div>
      ) : (
        /* TELA DA AGENDA (Se a senha estiver certa) */
        <div>
          <button
            onClick={() => setLogado(false)}
            style={{ marginBottom: "20px", cursor: "pointer" }}
          >
            Sair
          </button>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {agendamentos.map((ag) => (
              <div
                key={ag.id}
                style={{
                  padding: "15px",
                  border: "1px solid #ccc",
                  borderLeft:
                    ag.status === "CONFIRMADO"
                      ? "5px solid green"
                      : ag.status === "CANCELADO"
                        ? "5px solid red"
                        : "5px solid orange",
                }}
              >
                <strong>{ag.nomeCliente}</strong> - {ag.telefone} <br />
                <small>
                  Data: {new Date(ag.dataHora).toLocaleString()}
                </small>{" "}
                <br />
                <p>
                  <i>"{ag.descricao}"</i>
                </p>
                <p>
                  j Status atual: <strong>{ag.status}</strong>
                </p>
                {/* Botões de Ação */}
                <div style={{ gap: "10px", display: "flex" }}>
                  <button
                    onClick={() => mudarStatus(ag.id, "CONFIRMADO")}
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => mudarStatus(ag.id, "CANCELADO")}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
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
