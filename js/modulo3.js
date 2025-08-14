/* JavaScript para o Módulo 3 - Controle de Fluxo */

// Função de logout
function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'index1.html';
}

// Simulador Python simplificado para controle de fluxo
class PythonFlowSimulator {
  constructor() {
    this.variables = {};
    this.output = document.getElementById('consoleOutput');
  }

  addLine(content, className = 'console-line') {
    const line = document.createElement('div');
    line.className = className;
    line.innerHTML = content;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  evaluate(code) {
    try {
      code = code.trim();
      if (!code) return;

      this.addLine(`>>> ${code}`, 'console-line');

      // Comandos especiais
      if (code === 'clear()' || code === 'cls') {
        this.clearConsole();
        return;
      }

      if (code === 'help()') {
        this.showHelp();
        return;
      }

      // Ignorar comentários
      if (code.startsWith('#')) {
        return;
      }

      // Processar estruturas de controle (simulação simples)
      if (code.startsWith('if ') && code.endsWith(':')) {
        const condition = code.substring(3, code.length - 1).trim();
        try {
          const result = this.evaluateExpression(condition);
          this.addLine(`Condição: ${condition} = ${result}`, 'console-result');
        } catch (error) {
          this.addLine(`Error: ${error.message}`, 'console-error');
        }
        return;
      }

      if (code.startsWith('elif ') && code.endsWith(':')) {
        const condition = code.substring(5, code.length - 1).trim();
        try {
          const result = this.evaluateExpression(condition);
          this.addLine(`Elif: ${condition} = ${result}`, 'console-result');
        } catch (error) {
          this.addLine(`Error: ${error.message}`, 'console-error');
        }
        return;
      }

      if (code === 'else:') {
        this.addLine('Else: executando bloco alternativo', 'console-result');
        return;
      }

      if (code.startsWith('for ') && code.endsWith(':')) {
        this.handleForLoop(code);
        return;
      }

      if (code.startsWith('while ') && code.endsWith(':')) {
        const condition = code.substring(6, code.length - 1).trim();
        this.addLine(`While: ${condition}`, 'console-result');
        return;
      }

      if (code === 'break') {
        this.addLine('Break: saindo do loop', 'console-result');
        return;
      }

      if (code === 'continue') {
        this.addLine('Continue: próxima iteração', 'console-result');
        return;
      }

      // Processar print
      if (code.startsWith('print(')) {
        this.handlePrint(code);
        return;
      }

      // Processar atribuições
      if (code.includes('=') && !this.isComparison(code)) {
        this.handleAssignment(code);
        return;
      }

      // Avaliar expressões
      const result = this.evaluateExpression(code);
      if (result !== undefined) {
        this.addLine(result, 'console-result');
      }

    } catch (error) {
      this.addLine(`Error: ${error.message}`, 'console-error');
    }
  }

  isComparison(code) {
    return code.includes('==') || code.includes('!=') || 
           code.includes('<=') || code.includes('>=') ||
           code.includes('<') || code.includes('>');
  }

  handleForLoop(code) {
    const match = code.match(/for\s+(\w+)\s+in\s+(.+):/);
    if (match) {
      const variable = match[1];
      const iterable = match[2].trim();
      
      this.addLine(`For: ${variable} in ${iterable}`, 'console-result');
      
      // Simular range()
      if (iterable.startsWith('range(')) {
        const rangeMatch = iterable.match(/range\((\d+)(?:,\s*(\d+))?\)/);
        if (rangeMatch) {
          const start = rangeMatch[2] ? parseInt(rangeMatch[1]) : 0;
          const end = rangeMatch[2] ? parseInt(rangeMatch[2]) : parseInt(rangeMatch[1]);
          
          // Simular algumas iterações
          const maxShow = 5;
          for (let i = 0; i < Math.min(end - start, maxShow); i++) {
            const value = start + i;
            this.variables[variable] = value;
            this.addLine(`  ${variable} = ${value}`, 'console-result');
          }
          
          if (end - start > maxShow) {
            this.addLine(`  ... (mais ${end - start - maxShow} iterações)`, 'console-result');
          }
        }
      }
      // Simular lista
      else if (iterable.startsWith('[') && iterable.endsWith(']')) {
        try {
          const list = JSON.parse(iterable);
          list.forEach(item => {
            this.variables[variable] = item;
            this.addLine(`  ${variable} = "${item}"`, 'console-result');
          });
        } catch (error) {
          this.addLine(`Error: Invalid list format`, 'console-error');
        }
      }
      // Simular string
      else if (this.variables[iterable]) {
        const value = this.variables[iterable];
        if (typeof value === 'string') {
          for (let char of value) {
            this.variables[variable] = char;
            this.addLine(`  ${variable} = "${char}"`, 'console-result');
          }
        }
      }
    }
  }

  handlePrint(code) {
    try {
      const match = code.match(/print\((.+)\)/);
      if (!match) {
        this.addLine('Error: Invalid print statement', 'console-error');
        return;
      }

      let content = match[1].trim();
      
      // Processar f-strings
      if (content.startsWith('f"') || content.startsWith("f'")) {
        content = this.processFString(content);
      }
      // Processar strings normais
      else if ((content.startsWith('"') && content.endsWith('"')) || 
               (content.startsWith("'") && content.endsWith("'"))) {
        content = content.slice(1, -1);
      }
      // Processar variáveis e expressões
      else {
        content = this.evaluateExpression(content);
      }

      this.addLine(content, 'console-result');
    } catch (error) {
      this.addLine(`Error: ${error.message}`, 'console-error');
    }
  }

  processFString(fstring) {
    let content = fstring.slice(2, -1);
    
    content = content.replace(/\{([^}]+)\}/g, (match, expr) => {
      try {
        return this.evaluateExpression(expr.trim());
      } catch {
        return match;
      }
    });

    return content;
  }

  handleAssignment(code) {
    try {
      const equalIndex = code.indexOf('=');
      const varName = code.substring(0, equalIndex).trim();
      const valueExpr = code.substring(equalIndex + 1).trim();
      
      const value = this.evaluateExpression(valueExpr);
      this.variables[varName] = value;
      
    } catch (error) {
      this.addLine(`Error: ${error.message}`, 'console-error');
    }
  }

  evaluateExpression(expr) {
    try {
      let processedExpr = expr;
      
      // Substituir variáveis pelos seus valores
      for (const [varName, value] of Object.entries(this.variables)) {
        const regex = new RegExp(`\\b${varName}\\b`, 'g');
        processedExpr = processedExpr.replace(regex, JSON.stringify(value));
      }

      // Processar strings
      if ((processedExpr.startsWith('"') && processedExpr.endsWith('"')) || 
          (processedExpr.startsWith("'") && processedExpr.endsWith("'"))) {
        return processedExpr.slice(1, -1);
      }

      // Processar listas
      if (processedExpr.startsWith('[') && processedExpr.endsWith(']')) {
        return JSON.parse(processedExpr);
      }

      // Processar booleanos Python
      processedExpr = processedExpr.replace(/\bTrue\b/g, 'true');
      processedExpr = processedExpr.replace(/\bFalse\b/g, 'false');
      processedExpr = processedExpr.replace(/\band\b/g, '&&');
      processedExpr = processedExpr.replace(/\bor\b/g, '||');
      processedExpr = processedExpr.replace(/\bnot\b/g, '!');

      // Processar métodos de string Python
      processedExpr = processedExpr.replace(/("[^"]*")\.isdigit\(\)/g, '/\\d/.test($1)');
      processedExpr = processedExpr.replace(/("[^"]*")\.isupper\(\)/g, '($1 === $1.toUpperCase() && $1 !== $1.toLowerCase())');
      processedExpr = processedExpr.replace(/("[^"]*")\.islower\(\)/g, '($1 === $1.toLowerCase() && $1 !== $1.toUpperCase())');
      
      // Processar operador 'in' do Python
      processedExpr = processedExpr.replace(/("[^"]*")\s+in\s+("[^"]*")/g, '$2.includes($1)');
      
      // Processar função len()
      processedExpr = processedExpr.replace(/len\(("[^"]*")\)/g, '$1.length');
      processedExpr = processedExpr.replace(/len\((\[[^\]]*\])\)/g, '$1.length');

      // Processar operadores matemáticos
      processedExpr = processedExpr.replace(/\*\*/g, '**');
      if (processedExpr.includes('**')) {
        processedExpr = processedExpr.replace(/(\d+(?:\.\d+)?)\s*\*\*\s*(\d+(?:\.\d+)?)/g, 'Math.pow($1, $2)');
      }

      if (processedExpr.includes('//')) {
        processedExpr = processedExpr.replace(/(\d+(?:\.\d+)?)\s*\/\/\s*(\d+(?:\.\d+)?)/g, 'Math.floor($1 / $2)');
      }

      const result = eval(processedExpr);
      return result;
    } catch (error) {
      throw new Error(`Invalid expression: ${expr}`);
    }
  }

  clearConsole() {
    this.output.innerHTML = `
      <div class="console-line">Python 3.9.0 - Console Interativo</div>
      <div class="console-line">Digite seus comandos Python abaixo:</div>
    `;
  }

  showHelp() {
    this.addLine('Comandos disponíveis:', 'console-result');
    this.addLine('- if/elif/else: estruturas condicionais', 'console-result');
    this.addLine('- for/while: loops', 'console-result');
    this.addLine('- break/continue: controle de loops', 'console-result');
    this.addLine('- print(): exibir valores', 'console-result');
    this.addLine('- clear(): limpar console', 'console-result');
    this.addLine('- help(): mostrar esta ajuda', 'console-result');
  }
}

// Instanciar simulador
const simulator = new PythonFlowSimulator();

// Função para executar comando
function executarComando(event) {
  if (event.key === 'Enter') {
    const input = document.getElementById('consoleInput');
    const code = input.value.trim();
    
    if (code) {
      simulator.evaluate(code);
      input.value = '';
    }
  }
}

// Função para limpar console
function limparConsole() {
  simulator.clearConsole();
}

// Exemplos simplificados e funcionais
const exemplos = {
  1: `idade = 20
print(f"Sua idade: {idade} anos")
if idade >= 18:
print("Você pode votar!")
print("Fim do programa")`,
  
  2: `nota = 6.5
print(f"Sua nota: {nota}")
if nota >= 7.0:
print("Aprovado!")
else:
print("Recuperação necessária.")`,
  
  3: `nota = 8.5
if nota >= 9.0:
print("EXCELENTE!")
elif nota >= 8.0:
print("MUITO BOM!")
elif nota >= 7.0:
print("BOM!")
else:
print("REGULAR.")`,
  
  4: `for i in range(5):
print(f"Número: {i}")
frutas = ["maçã", "banana", "laranja"]
for fruta in frutas:
print(f"Fruta: {fruta}")`,
  
  5: `contador = 1
while contador <= 3:
print(f"Contando: {contador}")
contador += 1
print("Fim!")`,
  
  6: `for numero in range(1, 8):
print(f"Verificando: {numero}")
if numero == 5:
print("Encontrei o 5!")
break
print("Continuando...")
print("Busca finalizada.")`,
  
  7: `for numero in range(1, 6):
if numero % 2 != 0:
continue
print(f"Par: {numero}")
print("Fim!")`,
  
  8: `temperatura = 25
if temperatura >= 30:
print("Muito quente!")
elif temperatura >= 20:
print("Agradável!")
else:
print("Frio!")
print("Bom dia!")`,
  
  9: `for numero in range(1, 10):
if numero == 7:
print("Encontrei 7!")
break
if numero % 3 == 0:
continue
print(f"Válido: {numero}")
print("Fim.")`,
  
  10: `senha = "Python123!"
pontos = 0
if len(senha) >= 8:
pontos += 1
print("✓ Tamanho OK")
print(f"Pontos: {pontos}")
if pontos >= 1:
print("Senha ACEITÁVEL")
else:
print("Senha FRACA")`
};

// Função para executar exemplo
function executarExemplo(numero) {
  const codigo = exemplos[numero];
  if (codigo) {
    const linhas = codigo.split('\n');
    linhas.forEach((linha, index) => {
      setTimeout(() => {
        if (linha.trim()) {
          simulator.evaluate(linha);
        }
      }, index * 200); // Delay entre linhas
    });
  }
}

// Função para mostrar solução
function mostrarSolucao(numero) {
  const solucao = document.getElementById(`solucao${numero}`);
  if (solucao) {
    solucao.style.display = solucao.style.display === 'none' ? 'block' : 'none';
  }
}

// Funcionalidade para centralizar o console durante o scroll
let consoleOriginalPosition = null;
let isConsoleCentered = false;

function initScrollConsole() {
    const console = document.querySelector('.python-console');
    const consoleSection = document.querySelector('.console-section');
    
    if (!console || !consoleSection) return;
    
    consoleOriginalPosition = consoleSection.offsetTop;
    window.addEventListener('scroll', handleConsoleScroll);
}

function handleConsoleScroll() {
    const console = document.querySelector('.python-console');
    const scrollY = window.scrollY;
    const threshold = 980;
    
    if (scrollY > threshold && !isConsoleCentered) {
        console.classList.add('centered');
        isConsoleCentered = true;
    } else if (scrollY <= threshold && isConsoleCentered) {
        console.classList.remove('centered');
        isConsoleCentered = false;
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    const consoleInput = document.getElementById('consoleInput');
    if (consoleInput) {
        consoleInput.focus();
    }
    initScrollConsole();
});