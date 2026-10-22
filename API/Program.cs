using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;



var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

app.MapPost("/cadastro/usuario", ([FromBody] Usuario? usuario,[FromServices] AppDataContext ctx) =>
{
    if (usuario is null)
    {
        return Results.BadRequest("Usuario não pode ser nulo");
    }
    if (String.IsNullOrWhiteSpace(usuario.Nome))
    {
        return Results.BadRequest("Nome não pode estar vazio");
    }   
    
    if (String.IsNullOrWhiteSpace(usuario.Email))
    {
        return Results.BadRequest("Email não pode estar vazio");
    }

    if (!new EmailAddressAttribute().IsValid(usuario.Email))
    {
    return Results.BadRequest("Email inválido");
    }

    Usuario? emailencontrado =
        ctx.Usuarios.FirstOrDefault(x =>
            x.Email == usuario.Email );
    if (emailencontrado is not null)
    {
        return Results.BadRequest("Esse email já esta em uso");
    }



ctx.Usuarios.Add(usuario);
ctx.SaveChanges();



    return Results.Created("",usuario);
});


app.MapPost("/cadastrar/Projeto", ([FromBody] Projeto? projeto,[FromServices] AppDataContext ctx) =>
{
// Id
// Nome
// Descricao
// DataCriacao
    if(projeto is null)
    {
        return Results.BadRequest("Projeto nçao pode ser nulo");
    }
    if (string.IsNullOrWhiteSpace(projeto.Nome))
    {
        return Results.BadRequest("Nome não pode estar vazio");
    } 
    
    Projeto? nomeencontrado=
        ctx.Projetos.FirstOrDefault(x =>
        x.Nome==projeto.Nome);
    if(nomeencontrado is not null)
    {
        return Results.BadRequest("Esse Nome já está em uso, escolha outro");
    }
    
    if (string.IsNullOrWhiteSpace(projeto.Descricao))
    {
        return Results.BadRequest("Necessario colocar descrição do projeto");
    }

    
ctx.Projetos.Add(projeto);
ctx.SaveChanges();



    return Results.Created("",projeto);

});



app.Run();
