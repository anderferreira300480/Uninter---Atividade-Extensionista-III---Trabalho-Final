// Abrir modal
function abrirModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
  modal.scrollIntoView({ behavior: "smooth" });
}

// Fechar modal
function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

/* Login com transição e saudação */
function entrar(event) {
  event.preventDefault();

  const usuario = document.getElementById("usuarioInput").value;
  const senha = document.getElementById("senhaInput").value;

  if (usuario === "admin" && senha === "python123") {
    // Salvar estado de login
    localStorage.setItem('usuarioLogado', 'true');
    
    const telaLogin = document.getElementById("telaLogin");
    const telaHome = document.getElementById("telaHome");
    const saudacao = document.getElementById("saudacaoUsuario");

    // Aplica fade-out na tela de login
    telaLogin.style.opacity = "0";
    telaLogin.style.transition = "opacity 0.8s ease";

    // Aguarda a animação antes de mostrar a tela principal
    setTimeout(() => {
      telaLogin.style.display = "none";
      telaHome.style.visibility = "visible";
      telaHome.style.opacity = "0";
      telaHome.style.transition = "opacity 0.8s ease";
      
      // Força o reflow antes da animação
      telaHome.offsetHeight;
      
      telaHome.style.opacity = "1";

      // Saudação personalizada
      saudacao.innerHTML = `Olá, <strong>${usuario}</strong>! Bem-vindo à sua jornada com Python 🚀`;
    }, 800);
  } else {
    alert("Usuário ou senha inválidos.");
  }
}

/* Logout com retorno à tela de login */
function logout() {
  // Remover estado de login do localStorage
  localStorage.removeItem('usuarioLogado');
  
  const telaLogin = document.getElementById("telaLogin");
  const telaHome = document.getElementById("telaHome");

  // Oculta tela principal com transição
  telaHome.style.opacity = "0";
  telaHome.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    telaHome.style.visibility = "hidden";
    
    // Restaura tela de login
    telaLogin.style.display = "flex";
    telaLogin.style.opacity = "0";
    telaLogin.style.transition = "opacity 0.5s ease";
    
    // Força o reflow
    telaLogin.offsetHeight;
    
    telaLogin.style.opacity = "1";

    // Limpa campos
    document.getElementById("usuarioInput").value = "";
    document.getElementById("senhaInput").value = "";
  }, 500);
}

// Fechar card expandido
function fecharCard() {
  document.getElementById("cardExpandido").style.display = "none";
}

// Fechar card ao clicar fora
window.addEventListener('click', function(event) {
  const cardExpandido = document.getElementById("cardExpandido");
  const modal = document.getElementById("modal");
  
  if (event.target === cardExpandido) {
    cardExpandido.style.display = "none";
  }
  
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

function abrirCard(card, tipo) {
  const conteudo = {
    programacao: `
      <div style="background-color: #ffffff; padding: 24px; border-radius: 16px;">
        <h2 style="color: #306998; font-size: 28px; margin-bottom: 20px; font-weight: 700;">🧠 O que é Programação?</h2>
        
        <div style="text-align: center;">
          <img src="img/Programmer_concept1.png" 
              alt="Ilustração sobre programação" 
              style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 24px;" />
        </div>

        <h3 style="color: #FFD43B; font-size: 20px; margin-bottom: 8px; font-weight: 700;">🔧 Definição</h3>
        <p style="color: #306998; font-size: 18px; line-height: 1.8; margin-bottom: 20px; font-weight: 600;">
          Programação é o processo de criar instruções que dizem ao computador o que fazer. Essas instruções são escritas em linguagens como <strong>Python</strong>, <strong>JavaScript</strong> ou <strong>C++</strong>.
        </p>

        <h3 style="color: #FFD43B; font-size: 20px; margin-bottom: 8px; font-weight: 700;">🧠 Pensamento lógico</h3>
        <p style="color: #306998; font-size: 18px; line-height: 1.8; margin-bottom: 20px; font-weight: 600;">
          Ao programar, você traduz ideias humanas em lógica computacional. É como ensinar um robô a pensar e agir com base em regras que você define.
        </p>

        <h3 style="color: #FFD43B; font-size: 20px; margin-bottom: 8px; font-weight: 700;">🌍 Aplicações</h3>
        <p style="color: #306998; font-size: 18px; line-height: 1.8; margin-bottom: 20px; font-weight: 600;">
          Programar não é só para engenheiros. Profissionais de todas as áreas usam programação para automatizar tarefas, analisar dados e criar soluções inovadoras.
        </p>

        <h3 style="color: #FFD43B; font-size: 20px; margin-bottom: 8px; font-weight: 700;">📌 Exemplos de uso</h3>
        <ul style="margin-top: 10px; padding-left: 20px; color: #306998; font-size: 18px; line-height: 1.8; font-weight: 600;">
          <li>📱 Aplicativos de celular</li>
          <li>🌐 Sites e plataformas online</li>
          <li>🤖 Inteligência artificial e robótica</li>
          <li>📊 Análise de dados e visualizações</li>
          <li>🎮 Jogos digitais</li>
        </ul>
      </div>
    `,
    python: `
      <div style="background-color: #ffffff; padding: 24px; border-radius: 16px;">
        <h2 style="color: #306998; font-size: 28px; margin-bottom: 20px; font-weight: 700;">🐍 História do Python</h2>
        
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="img/guido.jpg" 
              alt="Guido van Rossum, criador do Python" 
              style="width: 200px; height: 200px; object-fit: cover; border-radius: 50%; border: 4px solid #FFD43B; margin-bottom: 16px;" />
          <p style="color: #306998; font-size: 16px; font-weight: 600; margin: 0;">Guido van Rossum</p>
          <p style="color: #FFD43B; font-size: 14px; font-weight: 500; margin: 0;">\"Benevolent Dictator For Life\" (BDFL)</p>
        </div>

        <h3 style="color: #FFD43B; font-size: 20px; margin-bottom: 8px; font-weight: 700;">🎯 O Nascimento (1989)</h3>
        <p style="color: #306998; font-size: 18px; line-height: 1.8; margin-bottom: 20px; font-weight: 600;">
          Em dezembro de 1989, <strong>Guido van Rossum</strong>, um programador holandês, começou a trabalhar no Python durante as férias de Natal. Ele queria criar uma linguagem que fosse sucessora do ABC, mas com melhor tratamento de exceções e interface com o sistema operacional.
        </p>

        <h3 style="color: #FFD43B; font-size: 20px; margin-bottom: 8px; font-weight: 700;">🎭 Por que \"Python\"?</h3>
        <p style="color: #306998; font-size: 18px; line-height: 1.8; margin-bottom: 20px; font-weight: 600;">
          O nome não vem da cobra! Guido era fã do grupo de comédia britânico <strong>\"Monty Python's Flying Circus\"</strong>. Ele queria um nome curto, único e ligeiramente misterioso.
        </p>

        <h3 style="color: #FFD43B; font-size: 20px; margin-bottom: 8px; font-weight: 700;">📚 Filosofia do Python</h3>
        <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 16px; border-radius: 8px; border-left: 4px solid #FFD43B; margin-bottom: 20px;">
          <p style="color: #306998; font-size: 16px; line-height: 1.6; margin: 0; font-style: italic;">
            \"Belo é melhor que feio.<br>
            Explícito é melhor que implícito.<br>
            Simples é melhor que complexo.<br>
            Legibilidade conta.\"<br>
            <span style="font-weight: bold; color: #FFD43B;">- O Zen do Python (PEP 20)</span>
          </p>
        </div>

        <h3 style="color: #FFD43B; font-size: 20px; margin-bottom: 8px; font-weight: 700;">⏰ Linha do Tempo</h3>
        <div style="border-left: 3px solid #FFD43B; padding-left: 20px; margin-bottom: 20px;">
          <div style="margin-bottom: 16px;">
            <h4 style="color: #306998; margin: 0; font-size: 16px;">1991 - Primeira Versão Pública</h4>
            <p style="color: #666; font-size: 14px; margin: 4px 0;">Python 0.9.0 lançado no grupo alt.sources</p>
          </div>
          <div style="margin-bottom: 16px;">
            <h4 style="color: #306998; margin: 0; font-size: 16px;">1994 - Python 1.0</h4>
            <p style="color: #666; font-size: 14px; margin: 4px 0;">Incluía programação funcional com lambda, map, filter</p>
          </div>
          <div style="margin-bottom: 16px;">
            <h4 style="color: #306998; margin: 0; font-size: 16px;">2000 - Python 2.0</h4>
            <p style="color: #666; font-size: 14px; margin: 4px 0;">List comprehensions e garbage collection</p>
          </div>
          <div style="margin-bottom: 16px;">
            <h4 style="color: #306998; margin: 0; font-size: 16px;">2008 - Python 3.0</h4>
            <p style="color: #666; font-size: 14px; margin: 4px 0;">Redesign para corrigir falhas fundamentais</p>
          </div>
          <div>
            <h4 style="color: #306998; margin: 0; font-size: 16px;">2018 - Guido se Aposenta</h4>
            <p style="color: #666; font-size: 14px; margin: 4px 0;">Deixa o cargo de BDFL, Python Council assume</p>
          </div>
        </div>

        <h3 style="color: #FFD43B; font-size: 20px; margin-bottom: 8px; font-weight: 700;">🏆 Conquistas Notáveis</h3>
        <ul style="margin-top: 10px; padding-left: 20px; color: #306998; font-size: 18px; line-height: 1.8; font-weight: 600;">
          <li>🥇 <strong>Linguagem do Ano</strong> - TIOBE Index (2007, 2010, 2018, 2020, 2021)</li>
          <li>🌟 <strong>Mais de 8 milhões</strong> de desenvolvedores ativos mundialmente</li>
          <li>🚀 <strong>Linguagem oficial</strong> do Google, Instagram, Dropbox, Netflix</li>
          <li>🧠 <strong>Padrão de facto</strong> para IA, Machine Learning e Data Science</li>
          <li>🎓 <strong>Linguagem mais ensinada</strong> em universidades americanas</li>
        </ul>

        <div style="background: linear-gradient(135deg, #306998, #4B8BBE); color: white; padding: 16px; border-radius: 8px; margin-top: 20px; text-align: center;">
          <p style="margin: 0; font-size: 16px; font-weight: 600;">
            💡 <strong>Curiosidade:</strong> Python é usado pela NASA, CIA, Google, YouTube, Instagram, Spotify e muitas outras gigantes da tecnologia!
          </p>
        </div>
      </div>
    `,
    aplicacoes: `
      <div style="background-color: #ffffff; padding: 24px; border-radius: 16px;">
        <h2 style="color: #306998; font-size: 28px; margin-bottom: 20px; font-weight: 700;">🚀 Aplicações do Python no Mundo Real</h2>
        
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="img/python-para-analise-de-dados-guia-pratico-para-iniciantes-blog-harve.png - Editado.jpg" 
              alt="Python em ação" 
              style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 16px;" />
          <p style="color: #666; font-size: 14px; font-style: italic;">Python: A linguagem que move o mundo digital</p>
        </div>

        <div style="background: linear-gradient(135deg, #e3f2fd, #bbdefb); padding: 16px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #306998;">
          <h3 style="color: #306998; margin: 0 0 8px 0; font-size: 18px;">🌟 Por que Python é tão Popular?</h3>
          <p style="color: #306998; margin: 0; font-size: 16px; line-height: 1.6;">
            Python combina <strong>simplicidade</strong>, <strong>versatilidade</strong> e <strong>poder</strong>. É fácil de aprender, mas capaz de resolver problemas complexos em praticamente qualquer área da tecnologia.
          </p>
        </div>

        <h3 style="color: #FFD43B; font-size: 22px; margin-bottom: 12px; font-weight: 700;">🤖 Inteligência Artificial & Machine Learning</h3>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #306998; font-size: 16px; line-height: 1.7; margin-bottom: 12px;">
            Python é <strong>a linguagem número 1</strong> para IA e ML, alimentando desde chatbots até carros autônomos.
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #4CAF50;">
              <h4 style="color: #306998; margin: 0 0 4px 0; font-size: 14px;">🧠 Bibliotecas Principais</h4>
              <p style="color: #666; margin: 0; font-size: 13px;">TensorFlow, PyTorch, Keras, scikit-learn</p>
            </div>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #2196F3;">
              <h4 style="color: #306998; margin: 0 0 4px 0; font-size: 14px;">🏢 Empresas que Usam</h4>
              <p style="color: #666; margin: 0; font-size: 13px;">Google, Tesla, OpenAI, DeepMind</p>
            </div>
          </div>
          <ul style="margin: 0; padding-left: 20px; color: #306998; font-size: 14px;">
            <li><strong>Reconhecimento de imagem:</strong> Diagnósticos médicos, segurança</li>
            <li><strong>Processamento de linguagem:</strong> ChatGPT, tradutores, assistentes</li>
            <li><strong>Carros autônomos:</strong> Tesla, Waymo, Uber</li>
            <li><strong>Recomendações:</strong> Netflix, Spotify, Amazon</li>
          </ul>
        </div>

        <h3 style="color: #FFD43B; font-size: 22px; margin-bottom: 12px; font-weight: 700;">📊 Ciência de Dados & Analytics</h3>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #306998; font-size: 16px; line-height: 1.7; margin-bottom: 12px;">
            <strong>90% dos cientistas de dados</strong> usam Python para análise, visualização e insights de negócios.
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #FF9800;">
              <h4 style="color: #306998; margin: 0 0 4px 0; font-size: 14px;">📈 Ferramentas Essenciais</h4>
              <p style="color: #666; margin: 0; font-size: 13px;">Pandas, NumPy, Matplotlib, Seaborn</p>
            </div>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #9C27B0;">
              <h4 style="color: #306998; margin: 0 0 4px 0; font-size: 14px;">🏭 Setores que Aplicam</h4>
              <p style="color: #666; margin: 0; font-size: 13px;">Bancos, E-commerce, Saúde, Marketing</p>
            </div>
          </div>
          <ul style="margin: 0; padding-left: 20px; color: #306998; font-size: 14px;">
            <li><strong>Análise financeira:</strong> Detecção de fraudes, trading algorítmico</li>
            <li><strong>Marketing digital:</strong> Segmentação de clientes, A/B testing</li>
            <li><strong>Saúde pública:</strong> Epidemiologia, análise de medicamentos</li>
            <li><strong>Esportes:</strong> Análise de performance, estatísticas avançadas</li>
          </ul>
        </div>

        <h3 style="color: #FFD43B; font-size: 22px; margin-bottom: 12px; font-weight: 700;">🌐 Desenvolvimento Web & APIs</h3>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #306998; font-size: 16px; line-height: 1.7; margin-bottom: 12px;">
            Grandes plataformas como <strong>Instagram, Dropbox e Pinterest</strong> são construídas com Python.
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #00BCD4;">
              <h4 style="color: #306998; margin: 0 0 4px 0; font-size: 14px;">🛠️ Frameworks Populares</h4>
              <p style="color: #666; margin: 0; font-size: 13px;">Django, Flask, FastAPI, Pyramid</p>
            </div>
            <div style="background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #795548;">
              <h4 style="color: #306998; margin: 0 0 4px 0; font-size: 14px;">🌟 Casos de Sucesso</h4>
              <p style="color: #666; margin: 0; font-size: 13px;">Instagram, Spotify, Reddit, Uber</p>
            </div>
          </div>
          <ul style="margin: 0; padding-left: 20px; color: #306998; font-size: 14px;">
            <li><strong>APIs REST:</strong> Microserviços, integração de sistemas</li>
            <li><strong>E-commerce:</strong> Lojas online, sistemas de pagamento</li>
            <li><strong>Redes sociais:</strong> Feeds, mensagens, notificações</li>
            <li><strong>Streaming:</strong> Plataformas de vídeo e música</li>
          </ul>
        </div>

        <h3 style="color: #FFD43B; font-size: 22px; margin-bottom: 12px; font-weight: 700;">🔧 Automação & DevOps</h3>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #306998; font-size: 16px; line-height: 1.7; margin-bottom: 12px;">
            Python automatiza tarefas repetitivas, economizando <strong>milhões de horas</strong> de trabalho manual.
          </p>
          <ul style="margin: 0; padding-left: 20px; color: #306998; font-size: 14px;">
            <li><strong>Scripts de automação:</strong> Backup, deploy, monitoramento</li>
            <li><strong>Web scraping:</strong> Coleta de dados, preços, notícias</li>
            <li><strong>Testes automatizados:</strong> Selenium, pytest, unittest</li>
            <li><strong>Infraestrutura:</strong> Ansible, SaltStack, configuração de servidores</li>
          </ul>
        </div>

        <h3 style="color: #FFD43B; font-size: 22px; margin-bottom: 12px; font-weight: 700;">🎮 Jogos & Entretenimento</h3>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #306998; font-size: 16px; line-height: 1.7; margin-bottom: 12px;">
            Desde jogos indie até blockbusters, Python está presente na indústria de games.
          </p>
          <ul style="margin: 0; padding-left: 20px; color: #306998; font-size: 14px;">
            <li><strong>Pygame:</strong> Jogos 2D, protótipos rápidos</li>
            <li><strong>Blender:</strong> Animação 3D, efeitos visuais</li>
            <li><strong>Civilization IV:</strong> Lógica de jogo em Python</li>
            <li><strong>EVE Online:</strong> Sistemas de servidor</li>
          </ul>
        </div>

        <h3 style="color: #FFD43B; font-size: 22px; margin-bottom: 12px; font-weight: 700;">🔬 Pesquisa Científica</h3>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #306998; font-size: 16px; line-height: 1.7; margin-bottom: 12px;">
            <strong>NASA, CERN e universidades</strong> mundiais usam Python para descobertas científicas.
          </p>
          <ul style="margin: 0; padding-left: 20px; color: #306998; font-size: 14px;">
            <li><strong>Astronomia:</strong> Análise de dados do Hubble, descoberta de exoplanetas</li>
            <li><strong>Física:</strong> Simulações do CERN, análise de partículas</li>
            <li><strong>Bioinformática:</strong> Sequenciamento genético, descoberta de medicamentos</li>
            <li><strong>Clima:</strong> Modelos meteorológicos, mudanças climáticas</li>
          </ul>
        </div>

        <h3 style="color: #FFD43B; font-size: 22px; margin-bottom: 12px; font-weight: 700;">💼 Finanças & FinTech</h3>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #306998; font-size: 16px; line-height: 1.7; margin-bottom: 12px;">
            <strong>Wall Street e bancos globais</strong> dependem do Python para operações críticas.
          </p>
          <ul style="margin: 0; padding-left: 20px; color: #306998; font-size: 14px;">
            <li><strong>Trading algorítmico:</strong> Execução automática de ordens</li>
            <li><strong>Análise de risco:</strong> Modelos de precificação, stress testing</li>
            <li><strong>Criptomoedas:</strong> Exchanges, análise de blockchain</li>
            <li><strong>Pagamentos:</strong> PayPal, Stripe, processamento de transações</li>
          </ul>
        </div>

        <div style="background: linear-gradient(135deg, #306998, #4B8BBE); color: white; padding: 20px; border-radius: 12px; margin-top: 24px;">
          <h3 style="color: #FFD43B; margin: 0 0 12px 0; font-size: 20px; text-align: center;">🌟 Python em Números</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; text-align: center;">
            <div>
              <h4 style="color: #FFD43B; margin: 0; font-size: 24px;">15M+</h4>
              <p style="margin: 4px 0 0 0; font-size: 14px;">Desenvolvedores ativos</p>
            </div>
            <div>
              <h4 style="color: #FFD43B; margin: 0; font-size: 24px;">#1</h4>
              <p style="margin: 4px 0 0 0; font-size: 14px;">Linguagem mais popular</p>
            </div>
            <div>
              <h4 style="color: #FFD43B; margin: 0; font-size: 24px;">400K+</h4>
              <p style="margin: 4px 0 0 0; font-size: 14px;">Bibliotecas disponíveis</p>
            </div>
            <div>
              <h4 style="color: #FFD43B; margin: 0; font-size: 24px;">$120K</h4>
              <p style="margin: 4px 0 0 0; font-size: 14px;">Salário médio anual (EUA)</p>
            </div>
          </div>
        </div>

        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 16px; border-radius: 8px; margin-top: 20px;">
          <h4 style="color: #856404; margin: 0 0 8px 0; font-size: 16px;">💡 Dica de Carreira</h4>
          <p style="color: #856404; margin: 0; font-size: 14px; line-height: 1.6;">
            Aprender Python abre portas para <strong>todas essas áreas</strong>! É uma das linguagens com maior demanda no mercado de trabalho, oferecendo oportunidades em startups, grandes corporações e pesquisa acadêmica.
          </p>
        </div>
      `
  };

  document.getElementById("conteudoExpandido").innerHTML = conteudo[tipo];
  document.getElementById("cardExpandido").style.display = "block";
  document.getElementById("cardExpandido").scrollIntoView({ behavior: "smooth" });
}

