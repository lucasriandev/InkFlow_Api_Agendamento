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
        headers: { "Content-Type": "application/json" },
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
        alert("Atenção: " + dados.error);
      }
    } catch (error) {
      alert("Erro ao conectar o servidor.");
    }
  };

  return (
    <div className="form-container">
      <h2>Solicitar Horário</h2>

      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          name="nomeCliente"
          placeholder="Seu nome"
          required
          value={formulario.nomeCliente}
          onChange={handleChange}
          className="input-field"
        />

        <input
          type="text"
          name="telefone"
          placeholder="Seu telemóvel / WhatsApp"
          required
          value={formulario.telefone}
          onChange={handleChange}
          className="input-field"
        />

        <input
          type="datetime-local"
          name="dataHora"
          required
          value={formulario.dataHora}
          onChange={handleChange}
          className="input-field"
        />

        <textarea
          name="descricao"
          placeholder="Descreva a tatuagem (estilo, local do corpo, tamanho...)"
          required
          value={formulario.descricao}
          onChange={handleChange}
          className="input-field"
        />

        <button type="submit" className="btn">
          Enviar Pedido
        </button>
      </form>
    </div>
  );
}
