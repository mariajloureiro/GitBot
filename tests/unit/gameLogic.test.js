// Simulação das funções principais do GitBot
function checkAnswerLogic(userAnswer, correctAnswer) {
  return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
}

function getLevelTitle(score) {
  const levels = [
    { minScore: 0, title: "Iniciante 🌱" },
    { minScore: 20, title: "Aprendiz 🔰" },
    { minScore: 40, title: "Desenvolvedor 💻" },
    { minScore: 60, title: "Git Expert 🚀" },
    { minScore: 80, title: "Git Master 👑" }
  ];

  let currentTitle = levels[0].title;
  levels.forEach(lvl => {
    if (score >= lvl.minScore) {
      currentTitle = lvl.title;
    }
  });
  return currentTitle;
}

describe('Testes Unitários - Lógica do GitBot', () => {
  
  test('Deve validar resposta correta do comando git status', () => {
    const isCorrect = checkAnswerLogic('git status', 'git status');
    expect(isCorrect).toBe(true);
  });

  test('Deve aceitar resposta com letras maiúsculas ou espaços extras', () => {
    const isCorrect = checkAnswerLogic('  GIT STATUS  ', 'git status');
    expect(isCorrect).toBe(true);
  });

  test('Deve rejeitar resposta incorreta', () => {
    const isCorrect = checkAnswerLogic('git add', 'git status');
    expect(isCorrect).toBe(false);
  });

  test('Deve atribuir o nível correto com base na pontuação', () => {
    expect(getLevelTitle(0)).toBe("Iniciante 🌱");
    expect(getLevelTitle(20)).toBe("Aprendiz 🔰");
    expect(getLevelTitle(80)).toBe("Git Master 👑");
  });

});