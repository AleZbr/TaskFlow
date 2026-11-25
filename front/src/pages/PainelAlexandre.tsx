
import React, { useState } from "react";

import CadastrarUsuario from "./CadastrarUsuario";
import ListarUsuarios from "./ListarUsuarios";
import CadastrarProjeto from "./CadastrarProjeto";
import ListarProjetos from "./ListarProjetos";
import ProgressoProjeto from "./ProgressoProjeto";

type Pagina = "usuarios" | "projetos" | "progresso";

interface Props {
  pagina: Pagina;
}

function PainelAlexandre({ pagina }: Props) {

  const [atualizarUsuarios, setAtualizarUsuarios] = useState(0);
  const [atualizarProjetos, setAtualizarProjetos] = useState(0);

  return (
    <div className="painel-alexandre">

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
