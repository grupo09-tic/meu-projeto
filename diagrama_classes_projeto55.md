# Diagrama de Classes UML (v2 - Com Métodos) - Projeto Proton

Este diagrama detalha a estrutura de classes e seus comportamentos (métodos) para a implementação do sistema.

```mermaid
classDiagram
    class Tenant {
        +UUID id
        +String cnpj
        +String nome_fantasia
        +Boolean ativo
        +cadastrar()
        +bloquearAcesso()
        +atualizarDados()
    }

    class Usuario {
        +UUID id
        +String email
        +String senha_hash
        +Enum tipo
        +autenticar(email, senha)
        +recuperarSenha()
        +vincularPerfil(Perfil)
        +desativarUsuario()
    }

    class Perfil {
        +UUID id
        +String nome
        +Boolean is_template
        +adicionarRotina(Rotina)
        +removerRotina(Rotina)
        +listarPermissoes()
    }

    class Rotina {
        +UUID id
        +String chave
        +String descricao
        +validarAcesso(Usuario)
    }

    class RH_Documento {
        +UUID id
        +String titulo
        +String arquivo_url
        +Enum tipo
        +Boolean exige_ciencia
        +publicar(Tenant, Subcategoria)
        +arquivar()
        +enviarNotificacaoLeitura()
    }

    class Documento_Ciencia {
        +DateTime data_ciencia
        +registrarCiencia(Usuario, RH_Documento)
        +gerarComprovante()
    }

    class Questionario {
        +UUID id
        +String video_url
        +Boolean is_anonimo
        +DateTime data_fim
        +publicarPesquisa()
        +clonarParaRecorrencia()
        +encerrarColeta()
        +validarParticipacao(Usuario)
    }

    class Resposta {
        +UUID id
        +JSONB dados_json
        +DateTime submitted_at
        +enviarResposta(Questionario, Usuario)
        +anonimizar()
    }

    class Denuncia {
        +UUID id
        +String protocolo
        +String relato
        +Enum status
        +gerarProtocolo()
        +atualizarStatus(Enum)
        +adicionarAnexo(Denuncia_Anexo)
        +notificarGestor()
    }

    class Denuncia_Anexo {
        +UUID id
        +String arquivo_url
        +String tipo_arquivo
        +fazerUpload()
        +validarExtensao()
    }

    %% Relacionamentos
    Tenant "1" -- "*" Usuario : possui
    Tenant "1" -- "*" Perfil : define
    Perfil "*" -- "*" Rotina : possui (RBAC)
    Usuario "*" -- "*" Perfil : desempenha
    
    Tenant "1" -- "*" RH_Documento : armazena
    RH_Documento "1" -- "*" Documento_Ciencia : exige
    Usuario "1" -- "*" Documento_Ciencia : confirma
    
    Tenant "1" -- "*" Questionario : cria
    Questionario "1" -- "*" Resposta : coleta
    Usuario "0..1" -- "*" Resposta : preenche (opcional se anônimo)
    
    Tenant "1" -- "*" Denuncia : recebe
    Denuncia "1" -- "*" Denuncia_Anexo : contém
```

### 🛠️ Principais Comportamentos Adicionados:

1.  **Segurança (RBAC):** A classe `Usuario` agora tem `vincularPerfil()` e `autenticar()`, enquanto a `Rotina` possui `validarAcesso(Usuario)`, fechando o ciclo de segurança.
2.  **Módulo de Denúncia:** Adicionados `gerarProtocolo()` e `notificarGestor()`. Note que a denúncia não tem método para identificar o autor, preservando o anonimato.
3.  **Conformidade (Mural):** `RH_Documento` ganhou `enviarNotificacaoLeitura()` e `Documento_Ciencia` tem `gerarComprovante()`.
4.  **Flexibilidade de Pesquisas:** `Questionario` possui `clonarParaRecorrencia()` (para pesquisas anuais/mensais) e `validarParticipacao()` (para evitar duplicidade).
