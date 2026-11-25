
import React, { useState } from "react";

import CadastrarUsuario from "./CadastrarUsuario";
import ListarUsuarios from "./ListarUsuarios";
import CadastrarProjeto from "./CadastrarProjeto";
import ListarProjetos from "./ListarProjetos";
import ProgressoProjeto from "./ProgressoProjeto";

function PainelAlexandre() {
  const [pagina, setPagina] = useState("usuarios");
  const [atualizarUsuarios, setAtualizarUsuarios] = useState(0);
  const [atualizarProjetos, setAtualizarProjetos] = useState(0);

  return (
    <div>
      <nav>
        <button onClick={() => setPagina("usuarios")}>
          Usuários
        </button>

        <button onClick={() => setPagina("projetos")}>
          Projetos
        </button>

        <button onClick={() => setPagina("progresso")}>
          Progresso
        </button>
      </nav>

      {pagina === "usuarios" && (
        <div>
          <CadastrarUsuario
            onCadastrado={() =>
              setAtualizarUsuarios(n => n + 1)
            }
          />

          <ListarUsuarios atualizar={atualizarUsuarios} />
        </div>
      )}

      {pagina === "projetos" && (
        <div>
          <CadastrarProjeto
            onCadastrado={() =>
              setAtualizarProjetos(n => n + 1)
            }
          />

          <ListarProjetos atualizar={atualizarProjetos} />
        </div>
      )}

      {pagina === "progresso" && (
        <ProgressoProjeto atualizar={atualizarProjetos} />
      )}
    </div>
  );
}

export default PainelAlexandre;
