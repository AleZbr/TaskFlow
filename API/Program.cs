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
    projeto.Nome = projeto.Nome.Trim();
    
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

app.MapPost("/cadastrar/tarefa", ([FromBody] Tarefa? tarefa, [FromServices] AppDataContext ctx) =>
{
    if (tarefa is null)
    {
        return Results.BadRequest("A tarefa não pode ser nula");
    }
    if (string.IsNullOrWhiteSpace(tarefa.Titulo))
    {
        return Results.BadRequest("Título não pode estar vazio");
    }
    tarefa.Titulo = tarefa.Titulo.Trim();

    Tarefa? tituloencontrado =
        ctx.Tarefas.FirstOrDefault(x =>
        x.Titulo == tarefa.Titulo);

    if (tituloencontrado is not null)
    {
        return Results.BadRequest("Esse título já está em uso, escolha outro");
    }

    if (string.IsNullOrWhiteSpace(tarefa.ProjetoId) || !ctx.Projetos.Any(x => x.Id == tarefa.ProjetoId))
    {
        return Results.BadRequest("Projeto não encontrado");
    }
    if (string.IsNullOrWhiteSpace(tarefa.UsuarioId) || !ctx.Usuarios.Any(x => x.Id == tarefa.UsuarioId))
    {
        return Results.BadRequest("Usuário não encontrado");
    }

    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();

    return Results.Created("", tarefa);
});

app.MapGet("/listar/usuario", ([FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.Usuarios.ToList());
});

app.MapGet("/listar/Projeto", ([FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.Projetos.ToList());
});

app.MapGet("/listar/tarefa", ([FromServices] AppDataContext ctx) =>
{
    var tarefas = ctx.Tarefas.Select(x => new
    {
        x.Id,
        x.Titulo,
        x.Descrição,
        x.Status,
        x.Prioridade,
        x.DataLimite,
        x.ProjetoId,
        x.UsuarioId
    }).ToList();

    if (tarefas.Count == 0)
    {
        return Results.NotFound("Nenhuma tarefa cadastrada.");
    }

    return Results.Ok(tarefas);
});

app.Run();

