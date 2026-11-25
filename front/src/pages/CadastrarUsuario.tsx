
import React, { useState } from "react";
import { Usuario } from "../types/Usuario";
import { requisicao } from "../services/api";

interface Props {
    onCadastrado?: () => void;
}

function CadastrarUsuario({ onCadastrado }: Props) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function cadastrarUsuario(e: React.FormEvent) {
        e.preventDefault();

        setMensagem("");
        setCarregando(true);

        const usuario = {
            nome: nome.trim(),
            email: email.trim()
        };

        try {
            await requisicao<Usuario>("/cadastro/usuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            setMensagem("Usuário cadastrado com sucesso!");

            setNome("");
            setEmail("");

            onCadastrado?.();

        } catch (erro) {
            setMensagem(
                erro instanceof Error
                    ? erro.message
                    : "Erro ao cadastrar usuário."
            );
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div>
            <h2>Cadastrar Usuário</h2>

            <form onSubmit={cadastrarUsuario}>

                <label>Nome:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <label>E-mail:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit" disabled={carregando}>
                    {carregando ? "Cadastrando..." : "Cadastrar"}
                </button>

            </form>

            {mensagem && <p role="status">{mensagem}</p>}
        </div>
    );
}

export default CadastrarUsuario;
