
import React, { useState } from "react";
import CadastroTarefa from "./pages/CadastroTarefa";
import PainelAlexandre from "./pages/PainelAlexandre";

type Pagina = "usuarios" | "projetos" | "tarefas" | "progresso";

function App() {
  const [pagina, setPagina] = useState<Pagina>("usuarios");

  return (
    <div className="app-container">

      <header className="app-header">
        <h1>TaskFlow</h1>
        <p>Sistema de Gerenciamento de Tarefas</p>
      </header>

      <nav className="app-menu">
        <button
          className={pagina === "usuarios" ? "ativo" : ""}
          onClick={() => setPagina("usuarios")}
        >
          Usuários
        </button>

        <button
          className={pagina === "projetos" ? "ativo" : ""}
          onClick={() => setPagina("projetos")}
        >
          Projetos
        </button>

        <button
          className={pagina === "tarefas" ? "ativo" : ""}
          onClick={() => setPagina("tarefas")}
        >
          Tarefas
        </button>

        <button
          className={pagina === "progresso" ? "ativo" : ""}
          onClick={() => setPagina("progresso")}
        >
          Progresso
        </button>
      </nav>

      <main className="app-conteudo">
        {pagina === "tarefas" ? (
          <CadastroTarefa />
        ) : (
          <PainelAlexandre pagina={pagina} />
        )}
      </main>

    </div>
  );
}

export default App;
