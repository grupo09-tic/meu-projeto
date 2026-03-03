from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch

def create_pdf(output_filename, text_content):
    doc = SimpleDocTemplate(output_filename, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    # Title
    title_style = styles['h1']
    title_style.alignment = 1 # Center alignment
    story.append(Paragraph("Análise do Posicionamento do MDB nas Eleições de 2026", title_style))
    story.append(Spacer(1, 0.2 * inch))

    # Body text
    body_style = styles['Normal']
    # Add paragraphs, splitting the text by double newlines for separate paragraphs
    for paragraph_text in text_content.split('\n\n'):
        story.append(Paragraph(paragraph_text, body_style))
        story.append(Spacer(1, 0.1 * inch)) # Add a small space between paragraphs

    doc.build(story)

text_to_write = """Análise do Posicionamento do MDB nas Eleições de 2026

O arquivo "O que tu quiser.txt" contém uma transcrição de um conteúdo jornalístico ou de análise política que aborda o posicionamento do MDB em relação às eleições presidenciais de 2026. A essência do texto é a declaração de Jader Barbalho Filho, Ministro das Cidades pelo MDB, indicando que o partido deverá apoiar a candidatura do Presidente Lula desde o primeiro turno. Ele justifica essa postura pela "coerência", visto que o MDB tem participado ativamente do governo Lula desde o início do seu terceiro mandato em janeiro de 2023, apoiando suas pautas no Congresso e ocupando três ministérios importantes (Cidades, Transportes e Planejamento/Orçamento). O arquivo também menciona que Jader Filho será candidato a deputado federal pelo Pará.

Em comparação com os fatos da internet, a informação principal está correta no que tange à declaração de Jader Filho. No entanto, a pesquisa revela uma nuance importante: embora a intenção de apoio seja clara, a formalização oficial por parte do MDB ainda está em fase de negociação, com outros líderes do partido, como o Ministro Renan Filho, indicando que discussões sobre a composição da chapa (incluindo a vice-presidência) ainda estão em andamento.
"""

create_pdf("analise_mdb_lula.pdf", text_to_write)