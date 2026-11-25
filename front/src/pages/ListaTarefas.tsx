import React from "react";
import { Tarefa } from "../types/Tarefa";

interface ListaTarefasProps {
  tarefas: Tarefa[];
  excluirTarefa: (id: number) => void;
  editarTarefa: (id: number) => void;
}

function ListaTarefas({ tarefas, excluirTarefa, editarTarefa }: ListaTarefasProps) {
  return (
    <div>
      <h2>Lista de Tarefas</h2>

      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        tarefas.map((tarefa) => (
          <div key={tarefa.id}>
            <h3>{tarefa.titulo}</h3>
            <p>{tarefa.descricao}</p>
            <p>Prazo: {tarefa.prazo}</p>
            <p>Prioridade: {tarefa.prioridade}</p>
            <p>Status: {tarefa.status}</p>

            <button onClick={() => excluirTarefa(tarefa.id)}>
            Excluir
            </button>
            
            <button onClick={() => editarTarefa(tarefa.id)}>
            Editar
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ListaTarefas;
