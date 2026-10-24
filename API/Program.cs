using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;



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
    if (ctx.Usuarios.Count() == 0)
    {
        return Results.NotFound("Nenhum Usuario Cadastrado");
    }


    return Results.Ok(ctx.Usuarios.ToList());
});

app.MapGet("/listar/Projeto", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Projetos.Count() == 0)
    {
        return Results.NotFound("Nenhum Projeto Cadastrado");
    }

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
        x.UsuarioId,
        Projeto = x.Projeto,
        Usuario = x.Usuario
    }).ToList();

    if (tarefas.Count == 0)
    {
        return Results.NotFound("Nenhuma tarefa cadastrada.");
    }

    return Results.Ok(tarefas);
});

app.MapPut("/alterar/usuario/{id}", ([FromRoute] string id, [FromBody] Usuario? usuario, [FromServices] AppDataContext ctx) =>
{
    if (usuario is null)
    {
        return Results.BadRequest("O usuário não pode ser nulo.");
    }

    Usuario? usuarioencontrado= 
    ctx.Usuarios.FirstOrDefault(x =>
    x.Id == id);

    if (usuarioencontrado is null)
    {
        return Results.NotFound("Usuário não encontrado.");
    }

    if (string.IsNullOrWhiteSpace(usuario.Nome))
    {
        return Results.BadRequest("O nome do usuário não pode estar vazio.");
    }

    if (string.IsNullOrWhiteSpace(usuario.Email))
    {
        return Results.BadRequest("O email não pode estar vazio.");
    }

    usuarioencontrado.Nome = usuario.Nome.Trim();
    usuarioencontrado.Email = usuario.Email.Trim();

    ctx.SaveChanges();

    return Results.Ok(usuarioencontrado);
});

app.MapPut("/alterar/Projeto/{id}", ([FromRoute] string id, [FromBody] Projeto? projeto, [FromServices] AppDataContext ctx) =>
{
    if (projeto is null)
    {
        return Results.BadRequest("O projeto não pode ser nulo.");
    }

    Projeto? projetoencontrado= 
    ctx.Projetos.FirstOrDefault(x =>
    x.Id == id);

    if (projetoencontrado is null)
    {
        return Results.NotFound("Projeto não encontrado.");
    }

    if (string.IsNullOrWhiteSpace(projeto.Nome))
    {
        return Results.BadRequest("O nome do projeto não pode estar vazio.");
    }

    if (string.IsNullOrWhiteSpace(projeto.Descricao))
    {
        return Results.BadRequest("A descrição do projeto não pode estar vazia.");
    }

    projetoencontrado.Nome = projeto.Nome.Trim();
    projetoencontrado.Descricao = projeto.Descricao.Trim();

    ctx.SaveChanges();

    return Results.Ok(projetoencontrado);
});

app.MapPut("/alterar/tarefa/{id}", ([FromRoute] string id, [FromBody] Tarefa? tarefa, [FromServices] AppDataContext ctx) =>
{
    if (tarefa is null)
    {
        return Results.BadRequest("A tarefa não pode ser nula.");
    }

    Tarefa? tarefaencontrada = 
    ctx.Tarefas.FirstOrDefault(x =>
    x.Id == id);

    if (tarefaencontrada is null)
    {
        return Results.NotFound("Tarefa não encontrada.");
    }

    if (string.IsNullOrWhiteSpace(tarefa.Titulo))
    {
        return Results.BadRequest("O título da tarefa não pode estar vazio.");
    }

    if (string.IsNullOrWhiteSpace(tarefa.Descrição))
    {
        return Results.BadRequest("A descrição da tarefa não pode estar vazia.");
    }

    tarefaencontrada.Titulo = tarefa.Titulo.Trim();
    tarefaencontrada.Descrição = tarefa.Descrição.Trim();
    tarefaencontrada.Status = tarefa.Status;
    tarefaencontrada.Prioridade = tarefa.Prioridade;
    tarefaencontrada.DataLimite = tarefa.DataLimite;

    ctx.SaveChanges();

    return Results.Ok(new
    {
    tarefaencontrada.Id,
    tarefaencontrada.Titulo,
    tarefaencontrada.Descrição,
    tarefaencontrada.Status,
    tarefaencontrada.Prioridade,
    tarefaencontrada.DataLimite
    });
});


app.MapDelete("/deletar/tarefa/{id?}",([FromRoute]string? id, [FromServices] AppDataContext ctx) =>
{
    

    if (string.IsNullOrWhiteSpace(id))
    {
        return Results.BadRequest("Não existem tarefas na URL");
    }

    
    Tarefa?tarefaencontrada = ctx.Tarefas.FirstOrDefault(x=> x.Id == id);
    if (tarefaencontrada is null)
    {
        return Results.NotFound("Tarefa não existe");
    }
    ctx.Tarefas.Remove(tarefaencontrada);
    ctx.SaveChanges();
    return Results.Ok(tarefaencontrada);

    

});

app.MapDelete("/deletar/usuario/{id?}",([FromRoute]string? id, [FromServices] AppDataContext ctx) =>
{
    

    if (string.IsNullOrWhiteSpace(id))
    {
        return Results.BadRequest("Não existem usuarios na URL");
    }

    
    Usuario?usuarioencontrado = ctx.Usuarios.FirstOrDefault(x=> x.Id == id);
    if (usuarioencontrado is null)
    {
        return Results.NotFound("Usuario não existe");
    }
    ctx.Usuarios.Remove(usuarioencontrado);
    ctx.SaveChanges();
    return Results.Ok(usuarioencontrado);

    

});


app.MapGet("/buscar/projeto/{id?}", ([FromRoute] string? id, [FromServices] AppDataContext ctx) =>
{
    if (string.IsNullOrWhiteSpace(id))
    {
        return Results.BadRequest("Insira um ID");
    }


    Projeto? projetoencontrado = 
    ctx.Projetos.FirstOrDefault(x => x.Id == id);

    if (projetoencontrado is null)
    {
        return Results.NotFound("Projeto não encontrado");
    }

    
    return Results.Ok(projetoencontrado);
});



app.MapGet("/buscar/usuario/{id?}", ([FromRoute] string? id, [FromServices] AppDataContext ctx) =>
{
    if (string.IsNullOrWhiteSpace(id))
    {
        return Results.BadRequest("Insira um ID");
    }


    Usuario? usuarioencontrado = 
    ctx.Usuarios.FirstOrDefault(x => x.Id == id);

    if (usuarioencontrado is null)
    {
      return Results.NotFound("usuario não envontrado");
    }

    return Results.Ok(usuarioencontrado);
});



app.MapGet("/buscar/tarefa/{id?}", ([FromRoute] string? id, [FromServices] AppDataContext ctx) =>
{
    if (string.IsNullOrWhiteSpace(id))
    {
        return Results.BadRequest("Insira um ID");
    }

    Tarefa? tarefaencontrada = ctx.Tarefas
        .Include(x => x.Projeto)
        .Include(x => x.Usuario)
        .FirstOrDefault(x => x.Id == id);
    
    if (tarefaencontrada is null)
    {
       return Results.NotFound("tarefa não encontrada");
    }

    return Results.Ok(tarefaencontrada);
});


app.MapGet("/progresso/projeto/{id?}",
    ([FromRoute] string? id, [FromServices] AppDataContext ctx) =>
{
    if (string.IsNullOrWhiteSpace(id))
    {
        return Results.BadRequest("Insira um ID");
    }

    Projeto? projetoencontrado = ctx.Projetos
        .FirstOrDefault(x => x.Id == id);

    if (projetoencontrado is null)
    {
        return Results.NotFound("Projeto não encontrado");
    }

    int totalTarefas = ctx.Tarefas.Count(x =>
        x.ProjetoId == id);

    int tarefasConcluidas = ctx.Tarefas.Count(x =>
        x.ProjetoId == id && x.Status == "Concluída");

    double progresso = 0;

    if (totalTarefas > 0)
    {
        progresso = tarefasConcluidas * 100.0 / totalTarefas;
    }

    return Results.Ok(new
    {
        ProjetoId = projetoencontrado.Id,
        ProjetoNome = projetoencontrado.Nome,
        TotalTarefas = totalTarefas,
        TarefasConcluidas = tarefasConcluidas,
        Progresso = Math.Round(progresso, 2)
    });
});





app.Run();

