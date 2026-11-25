
import React, { useState } from "react";
import { Projeto } from "../types/Projeto";
import { requisicao } from "../services/api";

interface Props {
    onCadastrado?: () => void;
}

function CadastrarProjeto({ onCadastrado }: Props) {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function cadastrarProjeto(e: React.FormEvent) {
        e.preventDefault();

        setMensagem("");
        setCarregando(true);

        const projeto = {
            nome: nome.trim(),
            descricao: descricao.trim()
        };

        try {
            await requisicao<Projeto>("/cadastrar/Projeto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(projeto)
            });

            setMensagem("Projeto cadastrado com sucesso!");

            setNome("");
            setDescricao("");

            onCadastrado?.();

        } catch (erro) {
            setMensagem(
                erro instanceof Error
                    ? erro.message
                    : "Erro ao cadastrar projeto."
            );
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div>
            <h2>Cadastrar Projeto</h2>

            <form onSubmit={cadastrarProjeto}>

                <label>Nome do Projeto:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <label>Descrição:</label>
                <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                    rows={4}
                />

                <button type="submit" disabled={carregando}>
                    {carregando ? "Cadastrando..." : "Cadastrar"}
                </button>

            </form>

            {mensagem && <p role="status">{mensagem}</p>}
        </div>
    );
}

export default CadastrarProjeto;
