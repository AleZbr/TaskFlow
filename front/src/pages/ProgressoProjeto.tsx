
import React, { useEffect, useState } from "react";
import { Projeto } from "../types/Projeto";
import { Progresso } from "../types/Progresso";
import { listar, requisicao } from "../services/api";

interface Props {
    atualizar?: number;
}

function ProgressoProjeto({ atualizar = 0 }: Props) {

    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [projetoId, setProjetoId] = useState("");
    const [progresso, setProgresso] = useState<Progresso | null>(null);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [recarregar, setRecarregar] = useState(0);

    // Busca os projetos cadastrados
    useEffect(() => {

        listar<Projeto>("/listar/Projeto")
            .then((dados) => {
                setProjetos(dados);

                if (dados.length > 0) {
                    setProjetoId((anterior) =>
                        dados.some(p => p.id === anterior)
                            ? anterior
                            : dados[0].id
                    );
                } else {
                    setProjetoId("");
                    setProgresso(null);
                }
            })
            .catch((erro) => {
                setErro(
                    erro instanceof Error
                        ? erro.message
                        : "Erro ao buscar projetos."
                );
            });

    }, [atualizar]);

    // Busca o progresso do projeto selecionado
    useEffect(() => {

        if (!projetoId) {
            setProgresso(null);
            return;
        }

        let ativo = true;

        setCarregando(true);
        setErro("");
        setProgresso(null);

        requisicao<Progresso>(`/progresso/projeto/${projetoId}`)
            .then((dados) => {
                if (ativo) {
                    setProgresso(dados);
                }
            })
            .catch((erro) => {
                if (ativo) {
                    setErro(
                        erro instanceof Error
                            ? erro.message
                            : "Erro ao buscar progresso."
                    );
                }
            })
            .finally(() => {
                if (ativo) {
                    setCarregando(false);
                }
            });

        return () => {
            ativo = false;
        };

    }, [projetoId, atualizar, recarregar]);

    return (
        <div>
            <h2>Progresso dos Projetos</h2>

            <label>Selecione um Projeto:</label>

            <select
                value={projetoId}
                onChange={(e) => setProjetoId(e.target.value)}
            >
                {projetos.length === 0 && (
                    <option value="">Nenhum projeto disponível</option>
                )}

                {projetos.map((projeto) => (
                    <option key={projeto.id} value={projeto.id}>
                        {projeto.nome}
                    </option>
                ))}
            </select>

            <button
                type="button"
                onClick={() => setRecarregar(n => n + 1)}
            >
                Atualizar Progresso
            </button>

            {erro && <p>{erro}</p>}

            {carregando && <p>Carregando progresso...</p>}

            {!carregando && progresso && (
                <div>
                    <h3>{progresso.projetoNome}</h3>

                    <h2>{progresso.progresso}% concluído</h2>

                    <progress
                        value={progresso.progresso}
                        max={100}
                    />

                    <p>
                        Total de tarefas: {progresso.totalTarefas}
                    </p>

                    <p>
                        Tarefas concluídas: {progresso.tarefasConcluidas}
                    </p>
                </div>
            )}
        </div>
    );
}

export default ProgressoProjeto;
