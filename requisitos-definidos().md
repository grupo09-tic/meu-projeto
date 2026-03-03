7. Requisitos Iniciais

REQUISITOS FUNCIONAIS (RF)

Requisitos funcionais são as funcionalidades que o sistema deve executar, ou seja, definem o que o sistema faz. Eles descrevem as ações, comportamentos e serviços que a plataforma precisa oferecer aos usuários. No contexto do projeto, exemplos de requisitos funcionais incluem: permitir o envio de denúncias anônimas, gerar relatórios exportáveis, exibir um dashboard com indicadores estratégicos, controlar permissões de acesso e registrar o histórico auditável dos casos. Em resumo, são as funções operacionais e visíveis do sistema



1. Gestão Multiempresa (Multi-Tenant)
RF01 – O sistema deve permitir o cadastro de múltiplas empresas (tenants).
RF02 – O sistema deve garantir isolamento lógico de dados entre empresas.
RF03 – O sistema deve permitir que o Admin da Consultoria gerencie múltiplas empresas.
RF04 – O sistema deve permitir que o Admin da Empresa gerencie apenas sua própria organização.

2. Gestão de Usuários e Perfis
RF05 – O sistema deve permitir cadastro manual de colaboradores.
RF06 – O sistema deve permitir importação de usuários via arquivo CSV ou Excel. RF07 – O sistema deve permitir associar usuários à empresa e departamento.
RF08 – O sistema deve permitir criação, edição e exclusão de perfis personalizados dentro de cada empresa.
RF09 – O sistema deve permitir definir permissões específicas por rotina/funcionalidade para cada perfil, por meio de seleção configurável.
RF10 – O sistema deve validar o acesso às funcionalidades com base nas permissões atribuídas ao perfil do usuário, e não por níveis hierárquicos fixos.
RF11 – O sistema deve permitir vincular um usuário a um ou mais perfis, conforme regra de negócio definida.
RF12 – O sistema deve permitir autenticação por login e senha.
RF13 – O sistema deve permitir envio de notificações internas e/ou por e-mail aos     usuários.
RF14 – O sistema deve registrar histórico de criação, alteração e exclusão de perfis e permissões.

3. Questionários
RF15 – O sistema deve permitir a criação de questionários baseados em modelos padrão (templates) ou do zero.
RF16 – O sistema deve permitir configurar se o questionário é anônimo ou identificado (ex: PDI identificado, Clima anônimo).
RF17 – O sistema deve permitir o direcionamento de questionários por departamento.
RF18 – O sistema DEVE incluir obrigatoriamente uma orientação em vídeo ou texto explicativo para cada questionário criado.
RF19 – O sistema deve permitir respostas híbridas: opções preestabelecidas e campo para resposta personalizada/texto livre.
RF20 – O sistema deve permitir a "reaplicação" de questionários (recorrência), mantendo o histórico de versões anteriores (ex: Clima Organizacional).
RF21 – O sistema deve permitir configurar se o usuário final terá acesso às suas próprias respostas após o envio (ex: permitido em PDI, bloqueado em Clima).

4. Denúncias
RF22 – O sistema deve permitir APENAS o envio de denúncias anônimas (Anonimato obrigatório por lei).
RF23 – O sistema deve gerar um protocolo interno para a denúncia, mas sem qualquer vínculo com a identidade do usuário.
RF24 – O sistema deve permitir anexar arquivos às denúncias (imagens, áudios e documentos).
RF25 – O sistema disponibilizará o status e o acompanhamento (seguimento) da denúncia APENAS para o Gestor/Administrador.
RF26 – O sistema deve permitir definir quais perfis podem visualizar, investigar ou encerrar denúncias.
RF27 – O sistema deve garantir que o denunciante não possa ser identificado, mesmo por administradores de alto nível.

5. Avisos com Confirmação de Ciência
RF28 – O sistema deve permitir criação de avisos internos.
RF29 – O sistema deve permitir anexar documentos aos avisos (PDF, DOC e outros formatos).
RF30 – O sistema deve permitir definir se o aviso exige confirmação de leitura.
RF31 – O sistema deve permitir direcionar avisos por empresa, departamento ou usuário específico.
RF32 – O sistema deve registrar usuário, data e hora da confirmação de ciência.
RF33 – O sistema deve impedir a edição da confirmação após o envio.
RF34 – O sistema deve permitir geração de relatório de avisos confirmados e pendentes.

6. Dashboard e Indicadores
RF35 – O sistema deve disponibilizar dashboard com indicadores de questionários, denúncias e métricas de desempenho.
RF36 – O sistema deve permitir visualização de tempo médio de resposta e resolução.
RF37 – O sistema deve gerar indicadores estratégicos consolidados para análise organizacional.
RF38 – O sistema deve permitir configurar quais indicadores cada perfil pode visualizar.

7. Aplicativo Mobile
RF39 – O sistema deve permitir autenticação via aplicativo mobile.
RF40 – O sistema deve permitir envio de notificações push pelo aplicativo.
RF41 – O sistema deve permitir responder questionários via aplicativo mobile.
RF42 – O sistema deve permitir visualizar avisos, documentos e contracheques pelo aplicativo.
RF43 – O sistema deve permitir envio de denúncias pelo aplicativo mobile.
RF44 – O sistema deve aplicar as mesmas regras de permissão definidas no modelo RBAC também no aplicativo mobile.

8. Módulo de RH e Documentos
RF45 – O sistema deve permitir a gestão de documentos em três níveis: Categoria > Subcategoria > Documento (com descrição detalhada).
RF46 – O sistema deve permitir o upload e a visualização segura de Contracheques individuais para os colaboradores.
RF47 – O sistema deve garantir que o colaborador tenha acesso apenas aos seus documentos pessoais e aos documentos públicos da empresa.

9. Módulo ADM Geral / Administrador Superior
RF48 – O sistema deve possuir um Módulo de Administração Superior para a empresa que contrata o software (Anexo Tech).
RF49 – O Módulo ADM Geral deve ser o responsável por gerar, permitir e controlar todas as permissões de acesso do sistema (Centralizador de RBAC).









REQUISITOS NÃO FUNCIONAIS (RNF)
Os requisitos não funcionais são as características de qualidade que determinam como o sistema deve funcionar. Eles estabelecem critérios relacionados à segurança, desempenho, confiabilidade, usabilidade e conformidade legal. No projeto, exemplos incluem garantir anonimato real, assegurar conformidade com a LGPD, manter alto nível de segurança da informação, restringir o acesso a dados sensíveis, garantir estabilidade da plataforma e preservar a integridade e rastreabilidade das informações. Em síntese, são os padrões de qualidade e segurança que sustentam o funcionamento do sistema.
1. Segurança e Controle de Acesso
RNF01 – O sistema deve criptografar dados sensíveis.
RNF02 – O sistema deve garantir anonimato real nas denúncias anônimas.
RNF03 – O sistema deve implementar controle de acesso baseado em perfis.
RNF04 – O sistema deve registrar logs de acesso, ações administrativas e erros técnicos.
RNF05 – O sistema deve permitir autenticação em dois fatores (2FA) para perfis administrativos.
RNF06 – O sistema deve aplicar o princípio do menor privilégio, garantindo que usuários tenham acesso apenas às permissões estritamente necessárias.
RNF07 – O sistema deve permitir segregação de funções, evitando concentração excessiva de permissões críticas em um único perfil.

2. Conformidade Legal (LGPD)
RNF08 – O sistema deve estar em conformidade com a LGPD.
RNF09 – O sistema deve permitir consentimento explícito para coleta de dados pessoais.
RNF10 – O sistema deve permitir exclusão ou anonimização de dados pessoais mediante solicitação.
RNF11 – O sistema deve permitir definição de política de retenção de dados.

3. Desempenho e Escalabilidade
RNF12 – O sistema deve responder requisições em até 2 segundos em condições normais de uso.
RNF13 – O sistema deve suportar crescimento de usuários sem perda significativa de desempenho.
RNF14 – O modelo de controle de acesso deve suportar criação de múltiplos perfis e permissões sem impacto significativo na performance.

4. Usabilidade e Responsividade
RNF15 – O sistema deve possuir interface intuitiva, com linguagem clara e objetiva.
RNF16 – O sistema deve ser responsivo, funcionando em desktop e dispositivos móveis (Android e iOS).

5. Confiabilidade
RNF17 – O sistema deve possuir disponibilidade mínima de 99%.
RNF18 – O sistema deve realizar backups automáticos periódicos.
RNF19 – O sistema deve permitir restauração de dados a partir de backup.

6. Manutenibilidade
RNF20 – O sistema deve possuir código organizado e documentado.
RNF21 – O sistema deve permitir futuras expansões e integrações.
RNF22 – O sistema deve possuir arquitetura modular que permita evolução das regras de permissão sem necessidade de reestruturação completa do sistema.