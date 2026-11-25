
import React, { useEffect, useState } from "react";
import { Projeto } from "../types/Projeto";
import { listar } from "../services/api";

interface Props {
    atualizar?: number;
}

function ListarProjetos({ atualizar = 0 }: Props) {

    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {

        let ativo = true;

        setCarregando(true);

        listar<Projeto>("/listar/Projeto")
            .then((dados) => {
                if (ativo) {
                    setProjetos(dados);
                    setErro("");
                }
            })
            .catch((erro) => {
                if (ativo) {
                    setErro(
                        erro instanceof Error
                            ? erro.message
                            : "Erro ao buscar projetos."
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

    }, [atualizar]);

    return (
        <div>
            <h2>Projetos Cadastrados</h2>

            {carregando ? (
                <p>Carregando projetos...</p>
            ) : erro ? (
                <p>{erro}</p>
            ) : projetos.length === 0 ? (
                <p>Nenhum projeto cadastrado.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Data de Criação</th>
                        </tr>
                    </thead>

                    <tbody>
                        {projetos.map((projeto) => (
                            <tr key={projeto.id}>
                                <td>{projeto.nome}</td>
                                <td>{projeto.descricao}</td>
                                <td>
                                    {projeto.criadoEm
                                        ? new Date(projeto.criadoEm)
                                            .toLocaleDateString("pt-BR")
                                        : "Não informado"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListarProjetos;
