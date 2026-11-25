
import React, { useState } from "react";
import { Tarefa } from "../types/Tarefa";

function CadastroTarefa() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const [tarefa, setTarefa] = useState<Tarefa>({
    id: 0,
    titulo: "",
    descricao: "",
    status: "Pendente",
    prioridade: "Media",
    prazo: "",
    usuarioId: 0,
    projetoId: 0
  });

  function cadastrarTarefa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const novaTarefa: Tarefa = {
      ...tarefa,
      id: Date.now()
    };

    setTarefas([...tarefas, novaTarefa]);

    setTarefa({
      id: 0,
      titulo: "",
      descricao: "",
      status: "Pendente",
      prioridade: "Media",
      prazo: "",
      usuarioId: 0,
      projetoId: 0
    });
  }

  return (
    <div>
      <h2>Cadastro de Tarefa</h2>

      <form onSubmit={cadastrarTarefa}>
        <label>Título:</label>
        <input
          type="text"
          required
          value={tarefa.titulo}
          onChange={(e) =>
            setTarefa({ ...tarefa, titulo: e.target.value })
          }
        />

        <label>Descrição:</label>
        <textarea
          value={tarefa.descricao}
          onChange={(e) =>
            setTarefa({ ...tarefa, descricao: e.target.value })
          }
        />

        <label>Prazo:</label>
        <input
          type="date"
          required
          value={tarefa.prazo}
          onChange={(e) =>
            setTarefa({ ...tarefa, prazo: e.target.value })
          }
        />

        <label>Prioridade:</label>
        <select
          value={tarefa.prioridade}
          onChange={(e) =>
            setTarefa({ ...tarefa, prioridade: e.target.value })
          }
        >
          <option value="Baixa">Baixa</option>
          <option value="Media">Média</option>
          <option value="Alta">Alta</option>
        </select>

        <button type="submit">Cadastrar tarefa</button>
      </form>

      <h2>Tarefas cadastradas</h2>

      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        tarefas.map((item) => (
          <div key={item.id}>
            <h3>{item.titulo}</h3>
            <p>{item.descricao}</p>
            <p>Prazo: {item.prazo}</p>
            <p>Prioridade: {item.prioridade}</p>
            <p>Status: {item.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CadastroTarefa;
