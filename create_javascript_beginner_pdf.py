from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import inch

def create_pdf(output_filename, title, content_paragraphs):
    doc = SimpleDocTemplate(output_filename, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    # Title
    title_style = ParagraphStyle(
        'Title',
        parent=styles['h1'],
        alignment=TA_CENTER,
        spaceAfter=14
    )
    story.append(Paragraph(title, title_style))
    story.append(Spacer(1, 0.2 * inch))

    # Body content
    body_style = styles['Normal']
    body_style.spaceAfter = 8 # Space between paragraphs

    for para_text in content_paragraphs:
        # Use replace for newlines within the string to be rendered as line breaks in PDF
        story.append(Paragraph(para_text.replace('\n', '<br/>'), body_style))
        story.append(Spacer(1, 0.1 * inch))

    doc.build(story)

title_content = "JavaScript para Iniciantes: Pontos Mais Importantes"

content_blocks = [
    """Olá! Se você está começando no JavaScript, estes são os pontos mais importantes para entender. Vamos simplificar tudo!""",
    """<h3>1. O Que é JavaScript no Backend? (Node.js)</h3>
*   Pense no JavaScript, que você talvez conheça de sites, agora funcionando **fora do navegador**.
*   Com o **Node.js**, o JavaScript pode criar servidores, lidar com bancos de dados e construir a "parte de trás" (backend) de aplicativos.
*   **Pra que serve:** Para que seu site ou app possa guardar informações, conversar com outros serviços e fazer coisas mais complexas.""",
    """<h3>2. Guardando Informações: Variáveis</h3>
*   Imagine variáveis como caixinhas para guardar dados. Você dá um nome à caixinha e coloca algo dentro.
*   **`let` e `const`:**
    *   `let nome = "João";` (Você pode mudar o conteúdo depois: `nome = "Maria";`)
    *   `const idade = 30;` (O conteúdo não pode mudar depois de definido.)""",
    """<h3>3. Tipos de Informação: Dados</h3>
*   **Texto (String):** `let frase = "Olá mundo!";` (Sempre entre aspas)
*   **Números (Number):** `let quantidade = 10;` (Sem aspas)
*   **Verdadeiro/Falso (Boolean):** `let estaAtivo = true;` ou `let estaDesligado = false;`
*   **Listas (Array):** `let frutas = ["Maçã", "Banana", "Uva"];` (Uma coleção de itens, em ordem)
*   **Objetos (Object):** `let pessoa = { nome: "Ana", idade: 25 };` (Como um dicionário, com "chaves" e "valores")""",
    """<h3>4. Fazendo Coisas: Operadores</h3>
*   **Matemáticos:** `+` (somar), `-` (subtrair), `*` (multiplicar), `/` (dividir). Ex: `5 + 3`
*   **Comparação:** `>=` (maior ou igual), `<` (menor), `===` (igual, considerando o tipo). Ex: `5 === 5` (true), `5 === "5"` (false)
*   **Lógicos:** `&&` (E), `||` (OU). Ex: `(idade > 18) && (temHabilitacao === true)`""",
    """<h3>5. Tomando Decisões: Condicionais (if/else)</h3>
*   O código faz uma coisa "se" algo for verdade, e outra coisa "senão" (else).
```javascript
let hora = 14;
if (hora < 12) {
    console.log("Bom dia!");
} else {
    console.log("Boa tarde!");
}
```""",
    """<h3>6. Repetindo Tarefas: Loops (for, while)</h3>
*   Para fazer a mesma coisa várias vezes.
*   **`for` (quando você sabe quantas vezes):**
```javascript
for (let i = 0; i < 3; i++) {
    console.log("Número: " + i); // 0, 1, 2
}
```
*   **`while` (enquanto uma condição for verdadeira):**
```javascript
let contador = 0;
while (contador < 2) {
    console.log("Contador: " + contador); // 0, 1
    contador++;
}
```""",
    """<h3>7. Blocos de Código Reutilizáveis: Funções</h3>
*   Agrupe um pedaço de código para poder usá-lo várias vezes, sem reescrever.
```javascript
function saudar(nome) {
    return "Olá, " + nome + "!";
}
let mensagem = saudar("Pedro"); // mensagem será "Olá, Pedro!"
```""",
    """<h3>8. Lidando com Espera: Assincronia (async/await)</h3>
*   No backend, muitas coisas levam tempo (ex: buscar dados no banco de dados).
*   **`async/await`** é a forma mais fácil de escrever código que "espera" por algo, sem travar seu programa.
*   **Imagine:** Você pede uma pizza (async), e não fica parado na porta esperando. Você faz outras coisas (continue seu código) e só volta para pegar a pizza "quando ela estiver pronta" (await).""",
    """<h3>9. Pacotes e Bibliotecas (npm)</h3>
*   **npm** é como uma "loja de aplicativos" para o Node.js.
*   Você pode baixar códigos prontos feitos por outras pessoas para adicionar funcionalidades ao seu projeto (ex: um código para criar um servidor, como o Express.js).
*   **Comando básico:** `npm install nome-do-pacote`""",
    """Com estes conceitos, você tem uma base muito boa para começar a explorar o mundo do backend com JavaScript! A prática é a chave."""
]

create_pdf("javascript_para_iniciantes.pdf", title_content, content_blocks)