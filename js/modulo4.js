/* JavaScript para o Módulo 4 - Funções em Python */

// Função para mostrar a tela home
function mostrarTelaHome() {
  const telaHome = document.getElementById("telaHome");
  if (telaHome) {
    telaHome.style.visibility = "visible";
    telaHome.style.opacity = "0";
    telaHome.style.transition = "opacity 0.8s ease";
    telaHome.offsetHeight;
    telaHome.style.opacity = "1";
  }
}

// Função de logout
function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'index1.html';
}

// Simulador Python simplificado
class PythonSimulator {
  constructor() {
    this.variables = {};
    this.functions = {};
    this.output = document.getElementById('consoleOutput');
  }

  addLine(content, className = 'console-line') {
    const line = document.createElement('div');
    line.className = className;
    line.innerHTML = content;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  // Avaliar comandos Python
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

      // Processar definições de função (simplificado)
      if (code.startsWith('def ')) {
        this.addLine('Função definida (simulação)', 'console-result');
        return;
      }

      // Processar declarações global
      if (code.startsWith('global ')) {
        this.addLine('Declaração global processada', 'console-result');
        return;
      }

      // Processar print statements
      if (code.startsWith('print(')) {
        this.handlePrint(code);
        return;
      }

      // Processar atribuições
      if (code.includes('=') && !this.isComparison(code)) {
        this.handleAssignment(code);
        return;
      }

      // Processar chamadas de função
      if (this.isFunctionCall(code)) {
        this.handleFunctionCall(code);
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

  // Verificar se é comparação
  isComparison(code) {
    return code.includes('==') || code.includes('!=') || 
           code.includes('<=') || code.includes('>=') ||
           code.includes('<') || code.includes('>');
  }

  // Verificar se é chamada de função
  isFunctionCall(code) {
    const functionCallPattern = /^\w+\s*\(/;
    return functionCallPattern.test(code) && !code.startsWith('print(');
  }

  // Processar print statements
  handlePrint(code) {
    try {
      const match = code.match(/print\((.*)\)/);
      if (match) {
        let content = match[1].trim();
        
        // Processar f-strings
        if (content.startsWith('f"') || content.startsWith("f'")) {
          content = this.processFString(content);
        }
        
        const result = this.evaluateExpression(content);
        this.addLine(result, 'console-result');
      }
    } catch (error) {
      this.addLine(`Error: ${error.message}`, 'console-error');
    }
  }

  // Processar f-strings
  processFString(content) {
    return content.replace(/f["']([^"']*)["']/g, (match, str) => {
      return str.replace(/{([^}]+)}/g, (match, expr) => {
        // Processar formatação como :.1f
        if (expr.includes(':.1f')) {
          const varName = expr.split(':')[0];
          const value = this.variables[varName] || this.evaluateExpression(varName);
          return parseFloat(value).toFixed(1);
        }
        return this.evaluateExpression(expr);
      });
    });
  }

  // Processar atribuições
  handleAssignment(code) {
    try {
      const equalIndex = code.indexOf('=');
      const varName = code.substring(0, equalIndex).trim();
      const valueExpr = code.substring(equalIndex + 1).trim();
      
      if (this.isFunctionCall(valueExpr)) {
        const result = this.handleFunctionCall(valueExpr);
        this.variables[varName] = result;
      } else {
        const value = this.evaluateExpression(valueExpr);
        this.variables[varName] = value;
      }
      
    } catch (error) {
      this.addLine(`Error: ${error.message}`, 'console-error');
    }
  }

  // Processar chamadas de função
  handleFunctionCall(code) {
    try {
      const match = code.match(/(\w+)\s*\(([^)]*)\)/);
      if (!match) {
        this.addLine('Error: Invalid function call syntax', 'console-error');
        return;
      }

      const functionName = match[1];
      const argumentsStr = match[2].trim();
      
      // Funções customizadas
      if (this.hasCustomLogic(functionName)) {
        const args = argumentsStr ? this.parseArguments(argumentsStr) : [];
        return this.executeCustomFunction(functionName, args);
      }

      this.addLine(`Error: Function '${functionName}' is not defined`, 'console-error');
    } catch (error) {
      this.addLine(`Error: ${error.message}`, 'console-error');
    }
  }

  // Analisar argumentos
  parseArguments(argumentsStr) {
    if (!argumentsStr) return [];
    return argumentsStr.split(',').map(arg => {
      const trimmed = arg.trim();
      return this.evaluateExpression(trimmed);
    });
  }

  // Verificar se função tem lógica customizada
  hasCustomLogic(functionName) {
    const customFunctions = [
      'saudacao', 'cumprimentar', 'somar', 'calcular_media', 
      'multiplicar', 'dividir', 'classificar_idade',
      'exemplo_local', 'incrementar_contador', 'mostrar_contador'
    ];
    return customFunctions.includes(functionName);
  }

  // Executar função customizada
  executeCustomFunction(functionName, args) {
    switch (functionName) {
      case 'saudacao':
        this.addLine('Olá! Bem-vindo ao Python!', 'console-result');
        this.addLine('Vamos aprender funções!', 'console-result');
        break;
      case 'cumprimentar':
        if (args.length > 0) {
          this.addLine(`Olá, ${args[0]}!`, 'console-result');
          this.addLine('Como você está?', 'console-result');
        }
        break;
      case 'somar':
        if (args.length >= 2) {
          const resultado = args[0] + args[1];
          return resultado;
        }
        break;
      case 'calcular_media':
        if (args.length >= 3) {
          const media = (args[0] + args[1] + args[2]) / 3;
          return media;
        }
        break;
      case 'multiplicar':
        if (args.length >= 2) {
          return args[0] * args[1];
        }
        break;
      case 'dividir':
        if (args.length >= 2) {
          return args[0] / args[1];
        }
        break;
      case 'classificar_idade':
        if (args.length > 0) {
          const idade = args[0];
          if (idade < 18) {
            return "Menor de idade";
          } else if (idade < 60) {
            return "Adulto";
          } else {
            return "Idoso";
          }
        }
        break;
      case 'exemplo_local':
        this.addLine('Dentro da função: Só existe aqui dentro', 'console-result');
        return 'Só existe aqui dentro';
      case 'incrementar_contador':
        if (!this.variables.contador_global) this.variables.contador_global = 0;
        this.variables.contador_global += 1;
        this.addLine(`Contador dentro da função: ${this.variables.contador_global}`, 'console-result');
        break;
      case 'mostrar_contador':
        const contador = this.variables.contador_global || 0;
        this.addLine(`Contador atual: ${contador}`, 'console-result');
        break;
    }
  }

  // Avaliar expressões
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

      // Processar números
      if (!isNaN(processedExpr)) {
        return parseFloat(processedExpr);
      }

      const result = eval(processedExpr);
      return result;
    } catch (error) {
      return expr; // Retorna a expressão original se não conseguir avaliar
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
    this.addLine('• print(valor) - Exibir valor', 'console-result');
    this.addLine('• clear() - Limpar console', 'console-result');
    this.addLine('• help() - Mostrar esta ajuda', 'console-result');
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

// Mostrar/ocultar solução
function mostrarSolucao(numero) {
  const solucao = document.getElementById(`solucao${numero}`);
  if (solucao) {
    if (solucao.style.display === 'none') {
      solucao.style.display = 'block';
    } else {
      solucao.style.display = 'none';
    }
  }
}

// Exemplos simplificados
const exemplos = {
  1: `def saudacao():\n    print("Olá! Bem-vindo ao Python!")\n    print("Vamos aprender funções!")\n\nsaudacao()`,
  2: `def cumprimentar(nome):\n    print(f"Olá, {nome}!")\n    print("Como você está?")\n\ncumprimentar("Ana")\ncumprimentar("João")`,
  3: `def somar(a, b):\n    resultado = a + b\n    return resultado\n\nnum1 = somar(5, 3)\nnum2 = somar(10, 7)\nprint(f"Primeira soma: {num1}")\nprint(f"Segunda soma: {num2}")\nprint(f"Total: {num1 + num2}")`,
  4: `def calcular_media(nota1, nota2, nota3):\n    media = (nota1 + nota2 + nota3) / 3\n    return media\n\nmedia_ana = calcular_media(8.5, 9.0, 7.5)\nmedia_joao = calcular_media(7.0, 8.0, 9.0)\n\nprint(f"Média da Ana: {media_ana:.1f}")\nprint(f"Média do João: {media_joao:.1f}")`,
  5: `def multiplicar(x, y):\n    return x * y\n\ndef dividir(x, y):\n    return x / y\n\nresult1 = multiplicar(6, 4)\nresult2 = dividir(15, 3)\n\nprint(f"6 x 4 = {result1}")\nprint(f"15 ÷ 3 = {result2}")`,
  6: `def classificar_idade(idade):\n    if idade < 18:\n        return "Menor de idade"\n    elif idade < 60:\n        return "Adulto"\n    else:\n        return "Idoso"\n\nprint(f"15 anos: {classificar_idade(15)}")\nprint(f"25 anos: {classificar_idade(25)}")\nprint(f"65 anos: {classificar_idade(65)}")`,
  7: `def exemplo_local():\n    variavel_local = "Só existe aqui dentro"\n    print(f"Dentro da função: {variavel_local}")\n    return variavel_local\n\nresultado = exemplo_local()\nprint(f"Resultado retornado: {resultado}")`,
  8: `contador_global = 0\n\ndef incrementar_contador():\n    global contador_global\n    contador_global += 1\n    print(f"Contador dentro da função: {contador_global}")\n\ndef mostrar_contador():\n    print(f"Contador atual: {contador_global}")\n\nmostrar_contador()\nincrementar_contador()\nincrementar_contador()\nmostrar_contador()`
};

// Executar exemplo
function executarExemplo(numero) {
  const codigo = exemplos[numero];
  if (codigo) {
    const linhas = codigo.split('\n');
    linhas.forEach((linha, index) => {
      setTimeout(() => {
        if (linha.trim()) {
          pythonSim.evaluate(linha.trim());
        }
      }, index * 300);
    });
  }
}

// Funcionalidade para console fixo no topo
let isConsoleCentered = false;

function initScrollConsole() {
    window.addEventListener('scroll', handleConsoleScroll);
}

function handleConsoleScroll() {
    const console = document.querySelector('.python-console');
    const scrollY = window.scrollY;
    const threshold = 200;
    
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