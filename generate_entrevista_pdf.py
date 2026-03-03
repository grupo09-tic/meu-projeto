from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.colors import black

def create_pdf_from_string(output_filename, text_content, title="Documento"):
    doc = SimpleDocTemplate(output_filename, pagesize=letter)

    # Get standard styles
    styles = getSampleStyleSheet()

    # Customize styles by copying and modifying
    # Title Style
    h1_style = ParagraphStyle(name='CustomH1', parent=styles['h1'])
    h1_style.fontName = 'Helvetica-Bold'
    h1_style.fontSize = 16
    h1_style.leading = 18
    h1_style.alignment = TA_CENTER

    # Normal Body Text Style
    normal_style = ParagraphStyle(name='CustomNormal', parent=styles['Normal'])
    normal_style.fontName = 'Helvetica'
    normal_style.fontSize = 10
    normal_style.leading = 12
    normal_style.textColor = black
    normal_style.alignment = TA_LEFT

    # List Item Style (inherits from normal_style but with bullet indentation)
    list_style = ParagraphStyle(name='CustomList', parent=normal_style)
    list_style.leftIndent = 0.2 * inch
    list_style.firstLineIndent = -0.2 * inch # For bullet indentation
    list_style.bulletIndent = 0.1 * inch
    list_style.bulletFontName = 'Helvetica-Bold'
    list_style.bulletFontSize = 10
    list_style.bulletColor = black


    story = []

    # Title
    story.append(Paragraph(title, h1_style))
    story.append(Spacer(1, 0.2 * inch))

    # Body text
    for paragraph_text in text_content.split('\n\n'):
        # Basic markdown-like formatting: **text** for bold, * for list items
        formatted_paragraph = paragraph_text
        # Process bold text first, before list items, as bold can be within list items
        parts = formatted_paragraph.split('**')
        formatted_paragraph_with_bold = ""
        for i, part in enumerate(parts):
            if i % 2 == 1: # Odd parts are bold
                formatted_paragraph_with_bold += '<b>' + part + '</b>'
            else:
                formatted_paragraph_with_bold += part
        
        if formatted_paragraph_with_bold.strip().startswith('*'):
            # For bullet points, we prepend the bullet character and use the list_style
            story.append(Paragraph('&bull; ' + formatted_paragraph_with_bold.strip()[1:].strip(), list_style))
        elif formatted_paragraph_with_bold.strip().startswith(('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.')):
            # For numbered lists, assume simple numbering and use normal style for now
            story.append(Paragraph(formatted_paragraph_with_bold, normal_style))
        else:
            story.append(Paragraph(formatted_paragraph_with_bold, normal_style))
        story.append(Spacer(1, 0.1 * inch))

    doc.build(story)

# The content for the PDF, now properly enclosed in triple quotes within the script
pdf_content = """
**Análise da Entrevista - Cliente Anderson**

**1. Resumo dos Principais Pontos e Necessidades:**

*   **Propósito da Plataforma:** Ferramenta de questionários, avaliações e comunicação interna para empresas, a ser vendida para outras empresas por uma consultoria principal ("Anexo").
*   **Modelo de Negócio:** Sistema multi-tenant, onde a consultoria (Anexo) cadastra as empresas clientes, e estas empresas gerenciam seus próprios colaboradores.
*   **Perfis de Usuário:**
    *   **Admin (Consultoria/RH da Empresa Cliente):** Gerencia empresas, departamentos e colaboradores. Cria e configura questionários (tipos de questões: objetivas, dissertativas, notas), aplicando-os a indivíduos ou empresas inteiras.
    *   **Colaborador (Usuário Mobile):** Acesa via aplicativo mobile com login/senha. Recebe notificações (push) sobre questionários pendentes e responde a eles.
*   **Canais de Comunicação/Feedback:**
    *   **Denúncias:** Canal seguro com opção de anonimato. Permite upload de mídias (imagens, áudios). O denunciante identificado recebe notificação sobre o status da denúncia.
    *   **Avisos e Arquivos:** Envio de arquivos (ex: férias, Código de Ética) para colaboradores ou departamentos específicos. **Funcionalidade de "ciente" para confirmação de leitura é CRÍTICA.**
*   **Gestão de Dados:** Importação de usuários/dados via planilhas (CSV/Excel).
*   **Visualização e Análise:** Dashboard com indicadores chave (questionários ativos/respondidos, denúncias/reclamações por mês) para gerar insights.
*   **Inteligência Artificial:** Requisito de integração com IA para análise de sentimento (positivo ou negativo) sobre as respostas dos questionários. Um "contexto" interno (não visível ao usuário) será associado a cada questionário e questão para auxiliar essa análise.
*   **Flexibilidade de Questionários:** Criação de questionários personalizados por departamento ou gerais, com questões opcionais e obrigatórias.
*   **Referência:** Google Forms foi mencionado como exemplo de sistema similar.

**2. Principais Desafios e Expectativas:**

*   Centralizar e organizar a comunicação e as avaliações internas.
*   Garantir a segurança e o anonimato em canais sensíveis como as denúncias.
*   Prover ferramentas de gestão eficazes para o RH (criação de questionários, acompanhamento).
*   Facilitar a análise de dados com dashboards e insights automatizados por IA.
*   Assegurar a confirmação de leitura de documentos importantes pelos colaboradores.

**3. Perguntas de Follow-up para o Cliente:**

1.  Para a gestão de empresas clientes pela "Anexo", há requisitos específicos de personalização da plataforma para cada empresa (ex: branding, módulos específicos)?
2.  Existe alguma ferramenta atual que os clientes usam para importação de planilhas? Precisamos considerar algum formato específico (CSV, XLSX) ou campos obrigatórios?
3.  Quantos tipos diferentes de questões (múltipla escolha, escala de 1-5, texto livre) são esperados para o cadastro de questionários, e há complexidade adicional (ex: questões condicionais)?
4.  Quais são os principais "insights" que o RH ou a gestão buscam gerar a partir dos dados do dashboard? Há modelos de relatório específicos que já utilizam?
5.  Em relação ao canal de denúncias, além de imagens e áudios, outros tipos de anexos (vídeos curtos, documentos PDF) seriam relevantes? Há limites de tamanho ou quantidade de anexos?
6.  Existe a necessidade de gerenciar o ciclo de vida da denúncia (ex: atribuir para alguém, mudar status, adicionar comentários internos)?
7.  A notificação de "ciente" para arquivos deve ter um prazo limite para o colaborador confirmar a leitura? O que acontece se ele não der o ciente?
8.  A análise de sentimento por IA precisa ser em tempo real ou pode ser processada em lotes? Quais seriam as ações esperadas a partir dos resultados da IA (ex: alertas automáticos, resumos executivos)?
9.  A plataforma precisa suportar múltiplos idiomas para os questionários ou a interface?
10. O acesso ao aplicativo mobile deve ser restrito a dispositivos específicos (ex: apenas celulares corporativos) ou qualquer dispositivo pessoal?
"""

create_pdf_from_string("analise_entrevista_anderson.pdf", pdf_content, "Análise da Entrevista - Cliente Anderson")
