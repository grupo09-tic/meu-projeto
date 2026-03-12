# Guia de Arquitetura - Projeto AnexoTech
Esta arquitetura garante que o sistema suporte centenas de empresas diferentes sem que os dados se misturem e que o código seja fácil de manter.

## 🏁 A Lógica do Funcionamento

O Backend funciona como um **Restaurante de Alta Gastronomia**:

1.  **Entrada (Routes/Middlewares)**: O cliente chega. O Middleware checa a reserva (Login) e anota o número da mesa (Tenant).
2.  **Preparação (Context/Policies)**: O garçom coloca o número da mesa no bloco de notas (**Context**) e checa se o cliente pode pedir pratos caros (**Policies**).
3.  **Pedido (Controllers)**: O pedido vai para a cozinha. O Controller coordena quem fará cada parte.
4.  **Cozimento (Services)**: O Chef segue a receita oficial (**Service**). Ele não sabe o que tem no estoque, ele apenas segue a lógica.
5.  **Ingredientes (Repositories/Entities)**: O Estoquista (**Repository**) vai na despensa (**DB**) e pega os ingredientes corretos daquela mesa específica.
6.  **Serviço (DTOs)**: Antes do prato sair, o decorador (**DTO**) tira as cascas e sementes (Senhas e Dados Sensíveis) para que o cliente receba apenas o prato limpo.

---

## 🏗️ As 10 Camadas Oficiais

1.  **Entities**: O "DNA" do dado. Classes puras (ex: `User.js`). É onde definimos as propriedades de cada objeto.
2.  **Factories**: O "Montador". Injeta o Repository no Service e o Service no Controller. Sem as Factories, teríamos que "instanciar" tudo na mão toda hora.
3.  **Repositories**: O "Escritor do Banco". Único lugar com SQL puro. Se mudarmos do PostgreSQL para o MySQL, só precisamos mexer aqui.
4.  **Routes**: O mapa de acesso. Define quais URLs o Mobile pode chamar (ex: `/api/v1/denuncias`).
5.  **Controllers**: O "Anfitrião". Recebe os dados da WEB (`req`), extrai o que precisa e manda pro Service.
6.  **Services**: O "Cérebro". Aqui moram as regras de negócio: validações, cálculos e decisões lógicas.
7.  **Middlewares**: Interceptadores globais. Tratam erros, verificam se o Token de acesso é válido e resolvem o Tenant.
8.  **Policies**: Controle de Acesso (RBAC). Define se o usuário logado é um "Colaborador" ou "RH", limitando as ações de cada um.
9.  **Context**: O "Bloco de Notas". Mantém salvo qual é o `tenant_id` atual durante toda a jornada daquela requisição.
10. **DTOs (Data Transfer Objects)**: Filtros de segurança. Garantem que o objeto que sai para a internet seja diferente do objeto que mora no banco (privacidade).

---

## 🛠️ As 4 Pastas Técnicas (Apoio)
- `config/`: Configurações de sistema (variáveis `.env`, conexões).
- `models/`: Definições técnicas de tabelas (tipos, campos, chaves).
- `utils/`: Ferramentas genéricas (helpers de data, criptografia).
- `validators/`: Validação de formatos (formatos de e-mail, telefone, etc).

---

## ⚡ Fluxo de uma Requisição (Data Flow)

Header: x-tenant-id ➔ **Middlewares** ➔ **Context** ➔ **Policies** ➔ **Routes** ➔ **Controllers** ➔ **Services** ➔ **Repositories** ➔ **PostgreSQL**
