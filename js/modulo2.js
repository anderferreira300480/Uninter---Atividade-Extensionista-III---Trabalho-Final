/* JavaScript para o Módulo 2 - Console Python Interativo */

// Função de logout (mesma do módulo 1)
function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'index1.html';
}

// Simulador Python básico
class PythonSimulator {
  constructor() {
    this.variables = {};
    this.output = document.getElementById('consoleOutput');
  }

  // Adicionar linha ao console
  addLine(content, className = 'console-line') {
    const line = document.createElement('div');
    line.className = className;
    line.innerHTML = content;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  // Avaliar expressões Python básicas
  evaluate(code) {
    try {
      // Remover espaços em branco
      code = code.trim();
      
      if (!code) return;

      // Mostrar o comando digitado
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

      if (code === 'vars()') {
        this.showVariables();
        return;
      }

      // Processar print statements
      if (code.startsWith('print(')) {
        this.handlePrint(code);
        return;
      }

      // Processar type() function
      if (code.startsWith('type(')) {
        this.handleType(code);
        return;
      }

      // Processar atribuições de variáveis
      if (code.includes('=') && !code.startsWith('print(') && !code.startsWith('type(')) {
        // Verificar se é uma atribuição (tem '=' mas não é apenas comparação)
        const equalIndex = code.indexOf('=');
        const beforeEqual = code.substring(0, equalIndex);
        
        // Se não há operadores de comparação antes do primeiro '=', é uma atribuição
        if (!beforeEqual.includes('==') && !beforeEqual.includes('!=') && 
            !beforeEqual.includes('<=') && !beforeEqual.includes('>=') &&
            !beforeEqual.includes('<') && !beforeEqual.includes('>')) {
          this.handleAssignment(code);
          return;
        }
      }

      // Avaliar expressões matemáticas e lógicas
      const result = this.evaluateExpression(code);
      if (result !== undefined) {
        this.addLine(result, 'console-result');
      }

    } catch (error) {
      this.addLine(`Error: ${error.message}`, 'console-error');
    }
  }

  // Processar print statements
  handlePrint(code) {
    try {
      // Extrair conteúdo entre parênteses
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

  // Processar f-strings
  processFString(fstring) {
    // Remover f" ou f' do início e " ou ' do final
    let content = fstring.slice(2, -1);
    
    // Substituir expressões {}
    content = content.replace(/\{([^}]+)\}/g, (match, expr) => {
      try {
        return this.evaluateExpression(expr.trim());
      } catch {
        return match;
      }
    });

    return content;
  }

  // Processar type() function
  handleType(code) {
    try {
      const match = code.match(/type\((.+)\)/);
      if (!match) {
        this.addLine('Error: Invalid type statement', 'console-error');
        return;
      }

      const varName = match[1].trim();
      if (this.variables[varName] !== undefined) {
        const value = this.variables[varName];
        let type = typeof value;
        
        if (type === 'number') {
          type = Number.isInteger(value) ? 'int' : 'float';
        } else if (type === 'string') {
          type = 'str';
        } else if (type === 'boolean') {
          type = 'bool';
        }
        
        this.addLine(`<class '${type}'>`, 'console-result');
      } else {
        this.addLine(`Error: name '${varName}' is not defined`, 'console-error');
      }
    } catch (error) {
      this.addLine(`Error: ${error.message}`, 'console-error');
    }
  }

  // Processar atribuições de variáveis
  handleAssignment(code) {
    try {
      const parts = code.split('=');
      
      // Verificar se é uma atribuição válida (deve ter exatamente um '=' que não seja parte de um operador de comparação)
      if (parts.length < 2) {
        this.addLine('Error: Invalid assignment', 'console-error');
        return;
      }
      
      // Reconstroir a expressão para lidar com operadores de comparação no lado direito
      const varName = parts[0].trim();
      const valueExpression = parts.slice(1).join('=').trim();
      
      // Verificar se o nome da variável é válido (não deve conter operadores)
      if (varName.includes('=') || varName.includes('<') || varName.includes('>') || varName.includes('!')) {
        this.addLine('Error: Invalid variable name', 'console-error');
        return;
      }
      
      const value = this.evaluateExpression(valueExpression);
      
      this.variables[varName] = value;
      // Não mostrar output para atribuições
    } catch (error) {
      this.addLine(`Error: ${error.message}`, 'console-error');
    }
  }

  // Avaliar expressões
  evaluateExpression(expr) {
    try {
      // Substituir variáveis pelos seus valores
      let processedExpr = expr;
      
      // Substituir variáveis
      for (const [varName, value] of Object.entries(this.variables)) {
        const regex = new RegExp(`\\b${varName}\\b`, 'g');
        processedExpr = processedExpr.replace(regex, JSON.stringify(value));
      }

      // Processar strings
      if ((processedExpr.startsWith('"') && processedExpr.endsWith('"')) || 
          (processedExpr.startsWith("'") && processedExpr.endsWith("'"))) {
        return processedExpr.slice(1, -1);
      }

      // Processar booleanos Python
      processedExpr = processedExpr.replace(/\bTrue\b/g, 'true');
      processedExpr = processedExpr.replace(/\bFalse\b/g, 'false');
      processedExpr = processedExpr.replace(/\band\b/g, '&&');
      processedExpr = processedExpr.replace(/\bor\b/g, '||');
      processedExpr = processedExpr.replace(/\bnot\b/g, '!');

      // Processar operador de potência
      processedExpr = processedExpr.replace(/\*\*/g, '**');
      
      // Avaliar expressão matemática
      if (processedExpr.includes('**')) {
        processedExpr = processedExpr.replace(/(\d+(?:\.\d+)?)\s*\*\*\s*(\d+(?:\.\d+)?)/g, 'Math.pow($1, $2)');
      }

      // Processar divisão inteira //
      if (processedExpr.includes('//')) {
        processedExpr = processedExpr.replace(/(\d+(?:\.\d+)?)\s*\/\/\s*(\d+(?:\.\d+)?)/g, 'Math.floor($1 / $2)');
      }

      const result = eval(processedExpr);
      return result;
    } catch (error) {
      throw new Error(`Invalid expression: ${expr}`);
    }
  }

  // Limpar console
  clearConsole() {
    this.output.innerHTML = `
      <div class="console-line">Python 3.9.0 - Console Interativo</div>
      <div class="console-line">Digite seus comandos Python abaixo:</div>
    `;
  }

  // Mostrar ajuda
  showHelp() {
    this.addLine('Comandos disponíveis:', 'console-result');
    this.addLine('• print(valor) - Exibir valor', 'console-result');
    this.addLine('• type(variavel) - Mostrar tipo da variável', 'console-result');
    this.addLine('• vars() - Mostrar variáveis definidas', 'console-result');
    this.addLine('• clear() - Limpar console', 'console-result');
    this.addLine('• help() - Mostrar esta ajuda', 'console-result');
    this.addLine('• Operadores: +, -, *, /, //, %, **', 'console-result');
    this.addLine('• Comparação: ==, !=, <, >, <=, >=', 'console-result');
    this.addLine('• Lógicos: and, or, not', 'console-result');
  }

  // Mostrar variáveis
  showVariables() {
    if (Object.keys(this.variables).length === 0) {
      this.addLine('Nenhuma variável definida', 'console-result');
    } else {
      this.addLine('Variáveis definidas:', 'console-result');
      for (const [name, value] of Object.entries(this.variables)) {
        this.addLine(`${name} = ${JSON.stringify(value)}`, 'console-result');
      }
    }
  }
}

// Instanciar simulador
const pythonSim = new PythonSimulator();

// Executar comando quando Enter for pressionado
function executarComando(event) {
  if (event.key === 'Enter') {
    const input = document.getElementById('consoleInput');
    const code = input.value;
    pythonSim.evaluate(code);
    input.value = '';
  }
}

// Limpar console
function limparConsole() {
  pythonSim.clearConsole();
}

// Exemplos pré-definidos
const exemplos = {
  1: `nome = "Maria"
idade = 25
altura = 1.65
estudante = True

print(nome)
print(idade)
print(altura)
print(estudante)`,
  
  2: `nome = "Python"
mensagem = 'Olá mundo!'
texto_longo = "Este é um texto mais longo"

print(nome)
print(mensagem)
print(texto_longo)`,
  
  3: `idade = 30
pontos = -15
grande = 1000000

print(idade)
print(pontos)
print(grande)`,
  
  4: `preco = 19.99
temperatura = -5.5
pi = 3.14159

print(preco)
print(temperatura)
print(pi)`,
  
  5: `ativo = True
desabilitado = False
maior_idade = 18 >= 18

print(ativo)
print(desabilitado)
print(maior_idade)`,
  
  6: `a = 10
b = 3

print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a // b)
print(a % b)
print(a ** b)`,

  7: `idade = 18
limite_adulto = 21

print(idade == 18)
print(idade != limite_adulto)
print(idade > 16)
print(idade < limite_adulto)
print(idade >= 18)
print(idade <= limite_adulto)`,
  
  8: `idade = 20
tem_carteira = True

pode_dirigir = idade >= 18 and tem_carteira
print(pode_dirigir)

fim_semana = True
feriado = False
descanso = fim_semana or feriado
print(descanso)

trabalho = not descanso
print(trabalho)`,
  
  9: `numero1 = 15
numero2 = 4

print(numero1 + numero2)
print(numero1 - numero2)
print(numero1 * numero2)
print(numero1 / numero2)`,
  
  10: `idade = 17

pode_votar = idade >= 16
pode_dirigir = idade >= 18
e_idoso = idade >= 65
maior_idade = idade >= 18

print(idade)
print(pode_votar)
print(pode_dirigir)
print(e_idoso)
print(maior_idade)`,
  
  11: `celsius = 25

fahrenheit = celsius * 9/5 + 32
kelvin = celsius + 273.15

acima_congelamento = celsius > 0
temperatura_ambiente = celsius >= 20 and celsius <= 25

print(celsius)
print(fahrenheit)
print(kelvin)
print(acima_congelamento)
print(temperatura_ambiente)`
};

// Executar exemplo
function executarExemplo(numero) {
  const codigo = exemplos[numero];
  if (codigo) {
    const linhas = codigo.split('\n');
    linhas.forEach(linha => {
      if (linha.trim()) {
        pythonSim.evaluate(linha.trim());
      }
    });
  }
}

// Mostrar/ocultar solução
function mostrarSolucao(numero) {
  const solucao = document.getElementById(`solucao${numero}`);
  if (solucao.style.display === 'none') {
    solucao.style.display = 'block';
  } else {
    solucao.style.display = 'none';
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  // Focar no input do console
  const consoleInput = document.getElementById('consoleInput');
  if (consoleInput) {
    consoleInput.focus();
  }
});

// Funcionalidade para centralizar o console durante o scroll
let consoleOriginalPosition = null;
let isConsoleCentered = false;

function initScrollConsole() {
    const console = document.querySelector('.python-console');
    const consoleSection = document.querySelector('.console-section');
    
    if (!console || !consoleSection) return;
    
    // Armazena a posição original do console
    consoleOriginalPosition = consoleSection.offsetTop;
    
    window.addEventListener('scroll', handleConsoleScroll);
}

function handleConsoleScroll() {
    const console = document.querySelector('.python-console');
    const scrollY = window.scrollY;
    const threshold = 980; // Pixels de scroll antes de centralizar
    
    if (scrollY > threshold && !isConsoleCentered) {
        // Centraliza o console
        console.classList.add('centered');
        isConsoleCentered = true;
    } else if (scrollY <= threshold && isConsoleCentered) {
        // Retorna o console à posição original
        console.classList.remove('centered');
        isConsoleCentered = false;
    }
}

// Inicializa quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    initScrollConsole();
});