
// Projeto
// Id
// Nome
// Descricao
// DataCriacao



public class Tarefa
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    public string Titulo{get; set; }= String.Empty;

    public string Descrição{get; set; } = String.Empty;

    public string Status{get; set; } = String.Empty;

    public string Prioridade{get; set; } = String.Empty;

    public DateTime DataLimite {get; set; }

    public string ProjetoId{get; set; } = String.Empty;

    public string UsuarioId{get; set; } = String.Empty;

    public Projeto? Projeto { get; set; }

    public Usuario? Usuario { get; set; }
}
