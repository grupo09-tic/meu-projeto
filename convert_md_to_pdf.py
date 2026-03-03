from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch

def convert_md_to_pdf(input_md_path, output_pdf_path):
    # Read the content of the markdown file
    with open(input_md_path, 'r', encoding='utf-8') as f:
        md_content = f.read()

    doc = SimpleDocTemplate(output_pdf_path, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    # Assuming the first line of the markdown is the title (H1)
    # and subsequent paragraphs are separated by double newlines.
    lines = md_content.split('\n')
    
    # Extract title (first line if it starts with '# ')
    title_text = "Charly García" # Default title
    content_start_index = 0
    if lines and lines[0].strip().startswith('# '):
        title_text = lines[0].strip('# ').strip()
        content_start_index = 1
    
    title_style = styles['h1']
    title_style.alignment = 1 # Center alignment
    story.append(Paragraph(title_text, title_style))
    story.append(Spacer(1, 0.2 * inch))

    # Body text - process paragraphs, handling bold/italic if possible with basic parsing
    body_style = styles['Normal']
    for paragraph_text in md_content[md_content.find('\n', content_start_index) + 1:].split('\n\n'):
        # Basic Markdown to ReportLab parsing:
        # Bold: **text** or __text__ -> <font name="Helvetica-Bold">text</font>
        # Italic: *text* or _text_ -> <font name="Helvetica-Oblique">text</font>
        
        # Replace bold markdown
        paragraph_text = paragraph_text.replace('**', '<font name="Helvetica-Bold">', 1)
        paragraph_text = paragraph_text.replace('**', '</font>', 1)
        paragraph_text = paragraph_text.replace('__', '<font name="Helvetica-Bold">', 1)
        paragraph_text = paragraph_text.replace('__', '</font>', 1)
        
        # Replace italic markdown
        paragraph_text = paragraph_text.replace('*', '<font name="Helvetica-Oblique">', 1)
        paragraph_text = paragraph_text.replace('*', '</font>', 1)
        paragraph_text = paragraph_text.replace('_', '<font name="Helvetica-Oblique">', 1)
        paragraph_text = paragraph_text.replace('_', '</font>', 1)

        story.append(Paragraph(paragraph_text, body_style))
        story.append(Spacer(1, 0.1 * inch)) # Add a small space between paragraphs

    doc.build(story)

# --- Execution ---
input_md_file = 'Charly-Garcia.md'
output_pdf_file = 'Charly-Garcia.pdf'
convert_md_to_pdf(input_md_file, output_pdf_file)
