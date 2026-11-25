
import React, { useState } from "react";
import { Tarefa } from "../types/Tarefa";

function CadastroTarefa() {
  const [tarefa, setTarefa] = useState<Tarefa>({
    id: 1,
    titulo: "",
    descricao: "",
    status: "Pendente",
    prioridade: "Media",
    prazo: "",
    usuarioId: 0,
    projetoId: 0
  });

  return (
    <div>
      <h2>Cadastro de Tarefa</h2>

      <form>
        <label>Título:</label>
        <input
          type="text"
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
    </div>
  );
}

export default CadastroTarefa;
