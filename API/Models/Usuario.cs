using Microsoft.AspNetCore.SignalR;


// Usuário
// Id
// Nome
// Email



public class Usuario
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    public string Nome{get; set; }= String.Empty;

    public string Email{get; set; } = String.Empty;

}
