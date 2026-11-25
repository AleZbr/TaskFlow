export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  prioridade: string;
  prazo: string;
  usuarioId: number;
  projetoId: number;
}