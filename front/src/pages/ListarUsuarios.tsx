
import React, { useEffect, useState } from "react";
import { Usuario } from "../types/Usuario";
import { listar } from "../services/api";

interface Props {
    atualizar?: number;
}

function ListarUsuarios({ atualizar = 0 }: Props) {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [erro, setErro] = useState("");

    useEffect(() => {

        let ativo = true;

        listar<Usuario>("/listar/usuario")
            .then((dados) => {
                if (ativo) {
                    setUsuarios(dados);
                    setErro("");
                }
            })
            .catch((erro) => {
                if (ativo) {
                    setErro(
                        erro instanceof Error
                            ? erro.message
                            : "Erro ao buscar usuários."
                    );
                }
            });

        return () => {
            ativo = false;
        };

    }, [atualizar]);

    return (
        <div>
            <h2>Usuários Cadastrados</h2>

            {erro && <p>{erro}</p>}

            {usuarios.length === 0 && !erro ? (
                <p>Nenhum usuário cadastrado.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListarUsuarios;
