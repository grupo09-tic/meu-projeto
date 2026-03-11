# Diagrama de Classes UML - Projeto Proton

Este diagrama detalha a estrutura de classes, atributos e métodos, alinhando a lógica de negócio com os requisitos do MVP.

## 1. Diagrama de Classes (Mermaid)

```mermaid
classDiagram
    class Tenant {
        +UUID id
        +String nome_fantasia
        +Boolean ativo
        +cadastrar()
        +bloquearAcesso()
    }

    class Usuario {
        +UUID id
        +String email
        +String senha_hash
        +autenticar(email, senha)
        +vincularPerfil(Perfil)
        +listarNotificacoes()
    }

    class Departamento {
        +UUID id
        +String nome
        +listarColaboradores()
    }

    class Perfil {
        +UUID id
        +String nome
        +Boolean is_template
        +adicionarPermissao(Rotina)
    }

    class Rotina {
        +UUID id
        +String chave
        +validarPermissao(Usuario)
    }

    class Aviso {
        +UUID id
        +String titulo
        +Boolean exige_ciencia
        +publicar(Departamento[])
        +registrarCiencia(Usuario)
    }

    class RH_Documento {
        +UUID id
        +String titulo
        +String arquivo_url
        +Boolean is_privado
        +uploadDocumento()
        +vincularColaborador(Usuario)
    }

    class Questionario {
        +UUID id
        +String video_url
        +Boolean is_anonimo
        +abrirPesquisa()
        +clonarParaRecorrencia()
    }

    class Resposta {
        +UUID id
        +JSONB dados_json
        +enviar(Usuario?)
        +anonimizar()
    }

    class Denuncia {
        +UUID id
        +String protocolo
        +String relato
        +Enum status
        +gerarProtocolo()
        +anexarProva(Arquivo)
        +atualizarStatus(Status)
    }

    %% Relacionamentos
    Tenant "1" -- "*" Usuario
    Tenant "1" -- "*" Departamento
    Departamento "1" -- "*" Usuario
    
    Usuario "*" -- "*" Perfil
    Perfil "*" -- "*" Rotina
    
    Tenant "1" -- "*" Aviso
    Aviso "*" -- "*" Departamento : alvo
    
    Tenant "1" -- "*" RH_Documento
    Usuario "0..1" -- "*" RH_Documento : individual
    
    Tenant "1" -- "*" Questionario
    Questionario "1" -- "*" Resposta
    Questionario "*" -- "*" Departamento : alvo
    
    Tenant "1" -- "*" Denuncia
```

## 2. Destaques da Lógica de Negócio

1.  **Segmentação:** `Aviso` e `Questionario` possuem métodos para definir o público-alvo através da classe `Departamento`.
2.  **Segurança (RBAC):** A classe `Rotina` centraliza a validação de acesso, garantindo que o sistema seja modular.
3.  **Anonimato:** A classe `Resposta` possui o método `anonimizar()`, que garante que o `Usuario` não seja vinculado em pesquisas sensíveis.
4.  **Protocolo:** `Denuncia` gera um código único (`protocolo`) para acompanhamento sem identificar o autor.
