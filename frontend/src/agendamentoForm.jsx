import { useState } from "react";

export default function AgendamentoForm() {
  const [formulario, setFormulario] = useState({
    nomeCliente: "",
    telefone: "",
    dataHora: "",
    descricao: "",
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:3000/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        alert("Sucesso: " + dados.mensagem);
        setFormulario({
          nomeCliente: "",
          telefone: "",
          dataHora: "",
          descricao: "",
        });
      } else {
        alert("Atenção" + dados.error);
      }
    } catch (error) {
      alert("Erro ao conectar o servidor.");
    }
  };

  return (
    <div
      style={{
        marginTop: "40px",
        padding: "20px",
        border: "1px solid #333",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
    >
      <h2>Solicitar Agendamento!</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          name="nomeCliente"
          placeholder="Seu nome!"
          required
          value={formulario.nomeCliente}
          onChange={handleChange}
          style={{ padding: "10px" }}
        />

        <input
          type="text"
          name="telefone"
          placeholder="Seu telefone!"
          required
          value={formulario.telefone}
          onChange={handleChange}
          style={{ padding: "10px" }}
        />

        <input
          type="datetime-local"
          name="dataHora"
          required
          value={formulario.dataHora}
          onChange={handleChange}
          style={{ padding: "10px" }}
        />

        <textarea
          name="descricao"
          placeholder="Descreva a tatuagem (estilo, local, tamanho...)"
          required
          value={formulario.descricao}
          onChange={handleChange}
          style={{ padding: "10px", minHeight: "80px" }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Solicitar Horário
        </button>
      </form>
    </div>
  );
}
