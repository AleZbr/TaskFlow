using Microsoft.AspNetCore.SignalR;

// Projeto
// Id
// Nome
// Descricao
// DataCriacao



public class Projeto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    public string Nome{get; set; }= String.Empty;

    public string Descricao{get; set; } = String.Empty;

    public DateTime CriadoEm{get; set;} =DateTime.Now;

}
