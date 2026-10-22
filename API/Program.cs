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


app.Run();
