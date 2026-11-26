
import React, { useEffect, useState } from "react";
import { Tarefa } from "../types/Tarefa";
import { listar, requisicao } from "../services/api";
import ListaTarefas from "./ListaTarefas";

interface TarefaAPI {
  id: string;
  titulo: string;
  descrição: string;
  status: string;
  prioridade: string;
  dataLimite: string;
  usuarioId: string;
  projetoId: string;
}

interface UsuarioAPI {
  id: string;
  nome: string;
  email: string;
}

interface ProjetoAPI {
  id: string;
  nome: string;
  descricao: string;
}

function CadastroTarefa() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioAPI[]>([]);
  const [projetos, setProjetos] = useState<ProjetoAPI[]>([]);

  const [tarefa, setTarefa] = useState<Tarefa>({
    id: "",
    titulo: "",
    descricao: "",
    status: "Pendente",
    prioridade: "Media",
    prazo: "",
    usuarioId: "",
    projetoId: ""
  });

  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Converte os dados da API para o formato utilizado no React
  function formatarTarefa(item: TarefaAPI): Tarefa {
    return {
      id: item.id,
      titulo: item.titulo,
      descricao: item.descrição,
      status: item.status,
      prioridade: item.prioridade,
      prazo: item.dataLimite
        ? item.dataLimite.slice(0, 10)
        : "",
      usuarioId: item.usuarioId,
      projetoId: item.projetoId
    };
  }

  // Carrega tarefas, usuários e projetos
  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosTarefas = await listar<TarefaAPI>(
          "/listar/tarefa"
        );

        setTarefas(dadosTarefas.map(formatarTarefa));
      } catch (erro) {
        setErro(
          erro instanceof Error
            ? erro.message
            : "Erro ao carregar tarefas."
        );
      }

      try {
        const dadosUsuarios = await listar<UsuarioAPI>(
          "/listar/usuario"
        );

        setUsuarios(dadosUsuarios);
      } catch (erro) {
        console.error("Erro ao carregar usuários:", erro);
      }

      try {
        const dadosProjetos = await listar<ProjetoAPI>(
          "/listar/Projeto"
        );

        setProjetos(dadosProjetos);
      } catch (erro) {
        console.error("Erro ao carregar projetos:", erro);
      }

      setCarregando(false);
    }

    carregarDados();
  }, []);

  // Exclui a tarefa do banco de dados
  async function excluirTarefa(id: string) {
    try {
      setErro("");

      await requisicao<TarefaAPI>(
        `/deletar/tarefa/${id}`,
        {
          method: "DELETE"
        }
      );

      setTarefas((tarefasAtuais) =>
        tarefasAtuais.filter((item) => item.id !== id)
      );

    } catch (erro) {
      setErro(
        erro instanceof Error
          ? erro.message
          : "Erro ao excluir tarefa."
      );
    }
  }

  // Seleciona uma tarefa para edição
  function editarTarefa(id: string) {
    const tarefaSelecionada = tarefas.find(
      (item) => item.id === id
    );

    if (tarefaSelecionada) {
      setTarefa(tarefaSelecionada);
      setEditando(true);
      setErro("");
    }
  }

  // Cadastra ou altera uma tarefa no backend
  async function cadastrarTarefa(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setErro("");

    const dadosTarefa = {
      titulo: tarefa.titulo,
      descrição: tarefa.descricao,
      status: tarefa.status,
      prioridade: tarefa.prioridade,
      dataLimite: `${tarefa.prazo}T00:00:00`,
      projetoId: tarefa.projetoId,
      usuarioId: tarefa.usuarioId
    };

    try {
      if (editando) {
        const resposta = await requisicao<TarefaAPI>(
          `/alterar/tarefa/${tarefa.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosTarefa)
          }
        );

        setTarefas((tarefasAtuais) =>
          tarefasAtuais.map((item) =>
            item.id === tarefa.id
              ? {
                  ...tarefa,
                  ...formatarTarefa(resposta)
                }
              : item
          )
        );

      } else {
        const resposta = await requisicao<TarefaAPI>(
          "/cadastrar/tarefa",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosTarefa)
          }
        );

        const novaTarefa = formatarTarefa(resposta);

        setTarefas((tarefasAtuais) => [
          ...tarefasAtuais,
          novaTarefa
        ]);
      }

      // Limpa o formulário após sucesso
      setTarefa({
        id: "",
        titulo: "",
        descricao: "",
        status: "Pendente",
        prioridade: "Media",
        prazo: "",
        usuarioId: "",
        projetoId: ""
      });

      setEditando(false);

    } catch (erro) {
      setErro(
        erro instanceof Error
          ? erro.message
          : editando
            ? "Erro ao editar tarefa."
            : "Erro ao cadastrar tarefa."
      );
    }
  }

  return (
    <div>
      <h2>Cadastro de Tarefa</h2>

      {carregando && <p>Carregando dados...</p>}

      {erro && <p>{erro}</p>}

      <form onSubmit={cadastrarTarefa}>
        <label>Título:</label>
        <input
          type="text"
          required
          value={tarefa.titulo}
          onChange={(e) =>
            setTarefa({
              ...tarefa,
              titulo: e.target.value
            })
          }
        />

        <label>Descrição:</label>
        <textarea
          required
          value={tarefa.descricao}
          onChange={(e) =>
            setTarefa({
              ...tarefa,
              descricao: e.target.value
            })
          }
        />

        <label>Prazo:</label>
        <input
          type="date"
          required
          value={tarefa.prazo}
          onChange={(e) =>
            setTarefa({
              ...tarefa,
              prazo: e.target.value
            })
          }
        />

        <label>Prioridade:</label>
        <select
          value={tarefa.prioridade}
          onChange={(e) =>
            setTarefa({
              ...tarefa,
              prioridade: e.target.value
            })
          }
        >
          <option value="Baixa">Baixa</option>
          <option value="Media">Média</option>
          <option value="Alta">Alta</option>
        </select>

        <label>Usuário:</label>
        <select
          required
          value={tarefa.usuarioId}
          onChange={(e) =>
            setTarefa({
              ...tarefa,
              usuarioId: e.target.value
            })
          }
        >
          <option value="">Selecione um usuário</option>

          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome}
            </option>
          ))}
        </select>

        <label>Projeto:</label>
        <select
          required
          value={tarefa.projetoId}
          onChange={(e) =>
            setTarefa({
              ...tarefa,
              projetoId: e.target.value
            })
          }
        >
          <option value="">Selecione um projeto</option>

          {projetos.map((projeto) => (
            <option key={projeto.id} value={projeto.id}>
              {projeto.nome}
            </option>
          ))}
        </select>

        <button type="submit">
          {editando
            ? "Salvar alterações"
            : "Cadastrar tarefa"}
        </button>
      </form>

      <ListaTarefas
        tarefas={tarefas}
        excluirTarefa={excluirTarefa}
        editarTarefa={editarTarefa}
      />
    </div>
  );
}

export default CadastroTarefa;
