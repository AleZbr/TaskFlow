
import React from "react";
import CadastroTarefa from "./pages/CadastroTarefa";
import PainelAlexandre from "./pages/PainelAlexandre";

function App() {
  return (
    <div>
      <h1>TaskFlow</h1>
      <p>Sistema de Gerenciamento de Tarefas</p>

      <PainelAlexandre />

      <CadastroTarefa />
    </div>
  );
}

export default App;
