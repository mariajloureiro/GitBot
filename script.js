// Base de Perguntas e Desafios
const questions = [
  {
    type: "text",
    question: "Qual comando você usaria para verificar quais arquivos foram modificados na sua árvore de trabalho?",
    answer: "git status",
    hints: [
      "Começa com 'git' e mostra o estado dos seus arquivos.",
      "A palavra em inglês significa 'estado' ou 'situação'."
    ]
  },
  {
    type: "text",
    question: "Qual comando você utiliza para criar um novo branch chamado 'feature'?",
    answer: "git branch feature",
    hints: [
      "Começa com 'git' seguido da palavra em inglês para 'ramificação'.",
      "Sintaxe: git branch [nome-do-branch]"
    ]
  },
  {
    type: "quiz",
    question: "Qual comando inicializa um novo repositório Git na pasta atual?",
    options: ["A) git start", "B) git init", "C) git create", "D) git new"],
    answer: "B",
    correctText: "git init",
    hints: [
      "O comando é uma abreviação para 'initialize'.",
      "Resposta correta: Opção B."
    ]
  },
  {
    type: "text",
    question: "Qual comando você usa para enviar seus commits locais para um repositório remoto no GitHub?",
    answer: "git push",
    hints: [
      "Pense no ato de 'empurrar' as alterações.",
      "Começa com 'git p...'"
    ]
  },
  {
    type: "text",
    question: "Qual comando adiciona todos os arquivos modificados para a Staging Area?",
    answer: "git add .",
    hints: [
      "Utiliza a palavra 'adicionar' em inglês.",
      "Para incluir tudo, usamos um ponto (.) no final."
    ]
  }
];

// Estado da Aplicação
let currentQuestionIndex = 0;
let score = 0;
let currentHintIndex = 0;
let awaitingExitConfirmation = false;

const levels = [
  { minScore: 0, title: "Iniciante 🌱" },
  { minScore: 20, title: "Aprendiz 🔰" },
  { minScore: 40, title: "Desenvolvedor 💻" },
  { minScore: 60, title: "Git Expert 🚀" },
  { minScore: 80, title: "Git Master 👑" }
];

// Navegação de Telas
function startApp() {
  document.getElementById('welcome-screen').classList.remove('active-screen');
  document.getElementById('chat-screen').classList.add('active-screen');
  
  // Exibe o botão "Reiniciar Conversa" no menu apenas quando estiver no chat
  document.getElementById('nav-reset').style.display = 'inline-block';

  const chatBody = document.getElementById('chat-messages');
  if (chatBody.children.length === 0) {
    initChat();
  }
}

function goToLandingPage() {
  document.getElementById('chat-screen').classList.remove('active-screen');
  document.getElementById('welcome-screen').classList.add('active-screen');
  
  // Esconde o botão "Reiniciar Conversa" na Landing Page
  document.getElementById('nav-reset').style.display = 'none';
}

function resetChat() {
  currentQuestionIndex = 0;
  score = 0;
  currentHintIndex = 0;
  awaitingExitConfirmation = false;
  updateScoreUI();
  
  // Limpa totalmente a tela do chat
  const chatBody = document.getElementById('chat-messages');
  chatBody.innerHTML = '';
  
  // Entra na tela e inicia a conversa limpa (apenas uma vez)
  startApp();
}

function initChat() {
  addBotMessage("👋 Olá! Eu sou o <strong>GitBot</strong>. Vamos aprender Git através de desafios interativos?");
  askQuestion();
}

// Manipulação das Mensagens no Chat
function addBotMessage(htmlText) {
  const chatBody = document.getElementById('chat-messages');
  const msgWrapper = document.createElement('div');
  msgWrapper.className = 'msg-wrapper bot';
  
  msgWrapper.innerHTML = `
    <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="msg-content">${htmlText}</div>
  `;
  
  chatBody.appendChild(msgWrapper);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addUserMessage(text) {
  const chatBody = document.getElementById('chat-messages');
  const msgWrapper = document.createElement('div');
  msgWrapper.className = 'msg-wrapper user';
  
  msgWrapper.innerHTML = `
    <div class="msg-avatar"><i class="fa-solid fa-user"></i></div>
    <div class="msg-content">${text}</div>
  `;
  
  chatBody.appendChild(msgWrapper);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Lógica das Perguntas
function askQuestion() {
  if (currentQuestionIndex >= questions.length) {
    addBotMessage("🎉 <strong>Parabéns!</strong> Você concluiu todos os módulos de teste do GitBot com sucesso!");
    return;
  }

  currentHintIndex = 0;
  const q = questions[currentQuestionIndex];

  if (q.type === "text") {
    addBotMessage(`<strong>Desafio:</strong> ${q.question}`);
  } else if (q.type === "quiz") {
    let quizHtml = `<strong>🧠 QUIZ:</strong> ${q.question}<div class="quiz-options-list">`;
    q.options.forEach(opt => {
      quizHtml += `<button class="quiz-option-btn" onclick="selectQuizOption('${opt[0]}')">${opt}</button>`;
    });
    quizHtml += `</div>`;
    addBotMessage(quizHtml);
  }
}

function sendMessage() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = '';
  
  const cleanText = text.toLowerCase().trim();

  // Tratamento do fluxo de saída (Sair)
  if (awaitingExitConfirmation) {
    if (cleanText === 'sim' || cleanText === 's' || cleanText === 'quero' || cleanText === 'sim, quero') {
      addBotMessage("👋 Tchau! Foi ótimo aprender com você. Até a próxima!");
      setTimeout(() => {
        resetChat();
        goToLandingPage();
      }, 1500);
    } else {
      awaitingExitConfirmation = false;
      addBotMessage("Que bom que você ficou! 😄 Vamos continuar o aprendizado.");
      setTimeout(askQuestion, 1000);
    }
    return;
  }

  if (cleanText === 'sair' || cleanText === 'exit' || cleanText === 'quit') {
    awaitingExitConfirmation = true;
    addBotMessage("⚠️ Tem certeza de que deseja sair?");
    return;
  }

  checkAnswer(text);
}

function selectQuizOption(option) {
  addUserMessage(`Opção ${option}`);
  checkAnswer(option);
}

function checkAnswer(userAnswer) {
  const q = questions[currentQuestionIndex];
  const cleanUser = userAnswer.toLowerCase().trim();
  const cleanCorrect = q.answer.toLowerCase().trim();

  if (cleanUser === cleanCorrect) {
    addBotMessage("✅ <strong>Resposta Correta!</strong> 🎉 +10 pontos adicionados.");
    addScore(10);
    currentQuestionIndex++;
    setTimeout(askQuestion, 1200);
  } else {
    addBotMessage("❌ Resposta incorreta. Tente novamente, peça uma 💡 <strong>Dica</strong> ou digite <code>sair</code>.");
  }
}

function requestHint() {
  const q = questions[currentQuestionIndex];
  if (!q || !q.hints) return;

  if (currentHintIndex < q.hints.length) {
    addBotMessage(`💡 <strong>Dica ${currentHintIndex + 1}:</strong> ${q.hints[currentHintIndex]}`);
    currentHintIndex++;
  } else {
    addBotMessage(`📚 <strong>Gabarito:</strong> O comando correto é <code>${q.correctText || q.answer}</code>`);
    currentQuestionIndex++;
    setTimeout(askQuestion, 1500);
  }
}

// Sistema de Pontuação e Progresso
function addScore(pts) {
  score += pts;
  updateScoreUI();
}

function updateScoreUI() {
  document.getElementById('score').textContent = score;

  // Atualiza Nível
  let levelTitle = levels[0].title;
  levels.forEach(lvl => {
    if (score >= lvl.minScore) {
      levelTitle = lvl.title;
    }
  });
  document.getElementById('level').textContent = levelTitle;

  // Atualiza Barra de Progresso
  const maxScore = 50;
  const percentage = Math.min((score / maxScore) * 100, 100);
  document.getElementById('progress-fill').style.width = `${percentage}%`;
}

// Event Listeners
document.getElementById('user-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Guardar progresso
function saveProgress() {
  const userData = {
    score: score,
    currentQuestionIndex: currentQuestionIndex
  };
  localStorage.setItem('gitbot_progress', JSON.stringify(userData));
}

// Carregar progresso ao iniciar
function loadProgress() {
  const saved = localStorage.getItem('gitbot_progress');
  if (saved) {
    const userData = JSON.parse(saved);
    score = userData.score || 0;
    currentQuestionIndex = userData.currentQuestionIndex || 0;
    updateScoreUI();
  }
}