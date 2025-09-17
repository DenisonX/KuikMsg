// Load messages from localStorage or use defaults
let mensagens = JSON.parse(localStorage.getItem('quickMessagesDigi1') || JSON.stringify([
  "Bom dia!",
  "Boa tarde!",
  "Conectando ao *Anydesk*...",
  "Bom dia! Em que posso lhe ajudar?",
  "Boa tarde! Em que posso lhe ajudar?",
  "Me chamo Denison, técnico de suporte da TekSoftware. Darei continuidade no atendimento.",
  "Em que posso lhe ajudar?",
  "Ok! Me passa a conexão *Anydesk* quando puder, por favor!",
  "Aceite a conexão quando puder, por favor!",
  "Ok! Poderia me passar sua conexão por favor? *Anydesk*",
  "Precisa de algo mais?",
  "Algo mais que eu possa ajudar?",
  "Obrigado por entrar em contato e tenha um ótimo dia!😊",
  "Obrigado por entrar em contato e tenha uma ótima tarde!😊",
  "Obrigado por entrar em contato e tenha uma ótima semana!😊",
  "Obrigado por entrar em contato e tenha um ótimo final de semana!😊",
  "Quando puder, entre em contato para podermos atualizar o seu sistema. Obrigado!",
  "Devido à falta de interação, estou encerrando temporariamente o atendimento. Caso precisa de algo mais, entre em contato novamente. Obrigado!",
  "Estamos verificando sua solicitação, só um momento.",
  "Precisamos fazer uma atualização do seu sistema. Podemos fazer agora?",
  "Mantenha o sistema fechado nos outros computadores por favor!",
]));

function saveMessages() {
  localStorage.setItem('quickMessagesDigi1', JSON.stringify(mensagens));
}

function addMessage(newMessage) {
  if (newMessage && newMessage.trim()) {
    mensagens.push(newMessage.trim());
    saveMessages();
    refreshMenu();
  }
}

function refreshMenu() {
  const menu = document.getElementById('menu-msg-rapida');
  if (!menu) return;
  
  // Clear existing message buttons (keep add button)
  const addButton = menu.querySelector('#add-message-btn');
  menu.innerHTML = '';
  if (addButton) menu.appendChild(addButton);
  
  // Recreate message buttons
  mensagens.forEach((msg) => {
    const item = document.createElement("button");
    item.innerText = msg;
    item.className = "message-btn";

    item.onclick = () => {
      const input = document.querySelector('[contenteditable="true"]');

      if (input) {
        input.focus();
        document.getSelection().selectAllChildren(input);
        document.getSelection().deleteFromDocument();
        document.execCommand("insertText", false, msg);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        
        const botaoEnviar = input.closest("form")?.querySelector("button[type='submit']") || document.querySelector("button svg");

        if (botaoEnviar) {
          botaoEnviar.click();
        }
      } else {
        alert("Campo de mensagem não encontrado.");
      }
    };

    menu.appendChild(item);
  });
}

const botao = document.createElement("div");
botao.id = "botao-msg-rapida";
botao.innerText = "🖱️";
document.body.appendChild(botao);

const menu = document.createElement("div");
menu.id = "menu-msg-rapida";

// Add message button
const addButton = document.createElement("button");
addButton.id = "add-message-btn";
addButton.innerText = "➕ Adicionar Mensagem";
addButton.className = "add-message-btn";
menu.appendChild(addButton);

// Create message buttons
mensagens.forEach((msg) => {
  const item = document.createElement("button");
  item.innerText = msg;
  item.className = "message-btn";

  item.onclick = () => {
    const input = document.querySelector('[contenteditable="true"]');

    if (input) {
      input.focus();
      document.getSelection().selectAllChildren(input);
      document.getSelection().deleteFromDocument();
      document.execCommand("insertText", false, msg);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      
      const botaoEnviar = input.closest("form")?.querySelector("button[type='submit']") || document.querySelector("button svg");

      if (botaoEnviar) {
        botaoEnviar.click();
      }
    } else {
      alert("Campo de mensagem não encontrado.");
    }
  };

  menu.appendChild(item);
});
document.body.appendChild(menu);

botao.onclick = () => {
  menu.style.display = menu.style.display === "none" ? "block" : "none";
};

// Create add message modal
const modal = document.createElement("div");
modal.id = "add-message-modal";
modal.style.display = "none";

const modalContent = document.createElement("div");
modalContent.className = "modal-content";

const modalHeader = document.createElement("div");
modalHeader.className = "modal-header";
modalHeader.innerHTML = "<h3>Adicionar Nova Mensagem</h3><span class='close'>&times;</span>";

const modalBody = document.createElement("div");
modalBody.className = "modal-body";
const textarea = document.createElement("textarea");
textarea.placeholder = "Digite sua mensagem aqui...";
textarea.rows = 4;
modalBody.appendChild(textarea);

const modalFooter = document.createElement("div");
modalFooter.className = "modal-footer";
const saveBtn = document.createElement("button");
saveBtn.textContent = "Salvar";
saveBtn.className = "save-btn";
const cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancelar";
cancelBtn.className = "cancel-btn";
modalFooter.appendChild(saveBtn);
modalFooter.appendChild(cancelBtn);

modalContent.appendChild(modalHeader);
modalContent.appendChild(modalBody);
modalContent.appendChild(modalFooter);
modal.appendChild(modalContent);
document.body.appendChild(modal);

// Event handlers
addButton.onclick = () => {
  modal.style.display = "flex";
  textarea.focus();
};

modal.querySelector('.close').onclick = () => {
  modal.style.display = "none";
  textarea.value = "";
};

cancelBtn.onclick = () => {
  modal.style.display = "none";
  textarea.value = "";
};

saveBtn.onclick = () => {
  const newMessage = textarea.value.trim();
  if (newMessage) {
    addMessage(newMessage);
    modal.style.display = "none";
    textarea.value = "";
  } else {
    alert("Por favor, digite uma mensagem.");
  }
};

// Close modal when clicking outside
modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    textarea.value = "";
  }
};

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = "none";
    textarea.value = "";
  }
});

// Flappy Bird overlay and game (mirrored)
(function initFlappyBird() {
  if (document.getElementById('flappy-toggle')) return;

  const toggle = document.createElement('div');
  toggle.id = 'flappy-toggle';
  toggle.innerText = '🐤';
  document.body.appendChild(toggle);

  const overlay = document.createElement('div');
  overlay.id = 'flappy-overlay';
  overlay.style.display = 'none';

  const container = document.createElement('div');
  container.id = 'flappy-container';

  const header = document.createElement('div');
  header.id = 'flappy-header';
  const title = document.createElement('div');
  title.id = 'flappy-title';
  title.textContent = 'Flappy Bird';
  const controls = document.createElement('div');
  controls.id = 'flappy-controls';
  const scoreEl = document.createElement('div');
  scoreEl.id = 'flappy-score';
  scoreEl.textContent = 'Score: 0';
  const restartBtn = document.createElement('button');
  restartBtn.id = 'flappy-restart';
  restartBtn.textContent = 'Restart';
  const closeBtn = document.createElement('button');
  closeBtn.id = 'flappy-close';
  closeBtn.textContent = 'Close';
  controls.appendChild(scoreEl);
  controls.appendChild(restartBtn);
  controls.appendChild(closeBtn);
  header.appendChild(title);
  header.appendChild(controls);

  const canvas = document.createElement('canvas');
  canvas.id = 'flappy-canvas';
  canvas.width = 360;
  canvas.height = 540;

  container.appendChild(header);
  container.appendChild(canvas);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  const ctx = canvas.getContext('2d');
  let animationId = null;
  let running = false;
  let score = 0;
  let highScore = 0;

  const game = {
    gravity: 0.5,
    jumpStrength: -8,
    pipeSpeed: 2.2,
    pipeGap: 140,
    pipeWidth: 60,
    pipeIntervalFrames: 110,
    frame: 0
  };

  const bird = {
    x: 80,
    y: canvas.height / 2,
    radius: 14,
    velocityY: 0,
    color: '#ffd95a'
  };

  let pipes = [];

  function resetGame() {
    score = 0;
    game.frame = 0;
    bird.y = canvas.height / 2;
    bird.velocityY = 0;
    pipes = [];
    scoreEl.textContent = 'Score: 0';
  }

  function spawnPipe() {
    const minTop = 40;
    const maxTop = canvas.height - game.pipeGap - 80;
    const topHeight = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
    pipes.push({
      x: canvas.width + game.pipeWidth,
      top: topHeight,
      bottom: topHeight + game.pipeGap,
      passed: false
    });
  }

  function drawBackground() {
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ded895';
    ctx.fillRect(0, canvas.height - 80, canvas.width, 80);
  }

  function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = bird.color;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(bird.x + 6, bird.y - 4, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = '#ff9f1c';
    ctx.beginPath();
    ctx.moveTo(bird.x + bird.radius, bird.y);
    ctx.lineTo(bird.x + bird.radius + 8, bird.y - 4);
    ctx.lineTo(bird.x + bird.radius + 8, bird.y + 4);
    ctx.fill();
  }

  function drawPipes() {
    ctx.fillStyle = '#2ecc71';
    pipes.forEach((p) => {
      ctx.fillRect(p.x, 0, game.pipeWidth, p.top);
      ctx.fillRect(p.x, p.bottom, game.pipeWidth, canvas.height - p.bottom - 80);
    });
  }

  function update() {
    game.frame += 1;
    bird.velocityY += game.gravity;
    bird.y += bird.velocityY;
    if (game.frame % game.pipeIntervalFrames === 0) spawnPipe();
    pipes.forEach((p) => {
      p.x -= game.pipeSpeed;
      if (!p.passed && p.x + game.pipeWidth < bird.x) {
        p.passed = true;
        score += 1;
        scoreEl.textContent = 'Score: ' + score;
      }
    });
    pipes = pipes.filter((p) => p.x + game.pipeWidth > 0);
    if (bird.y + bird.radius > canvas.height - 80 || bird.y - bird.radius < 0) {
      return gameOver();
    }
    for (let i = 0; i < pipes.length; i++) {
      const p = pipes[i];
      const withinX = bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + game.pipeWidth;
      const hitsTop = bird.y - bird.radius < p.top;
      const hitsBottom = bird.y + bird.radius > p.bottom;
      if (withinX && (hitsTop || hitsBottom)) return gameOver();
    }
  }

  function render() {
    drawBackground();
    drawPipes();
    drawBird();
  }

  function loop() {
    update();
    render();
    if (running) animationId = requestAnimationFrame(loop);
  }

  function flap() {
    if (!running) return;
    bird.velocityY = game.jumpStrength;
  }

  function start() {
    if (running) return;
    resetGame();
    running = true;
    animationId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (animationId) cancelAnimationFrame(animationId);
  }

  function gameOver() {
    stop();
    highScore = Math.max(highScore, score);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = '16px sans-serif';
    ctx.fillText('Score: ' + score + '   Best: ' + highScore, canvas.width / 2, canvas.height / 2 + 10);
    ctx.fillText('Press Restart to play again', canvas.width / 2, canvas.height / 2 + 36);
  }

  toggle.addEventListener('click', function() {
    const isOpen = overlay.style.display === 'flex';
    if (isOpen) {
      overlay.style.display = 'none';
      stop();
    } else {
      overlay.style.display = 'flex';
      start();
    }
  });

  closeBtn.addEventListener('click', function() {
    overlay.style.display = 'none';
    stop();
  });

  restartBtn.addEventListener('click', function() {
    start();
  });

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) return;
    if (e.target === canvas) flap();
  });
  window.addEventListener('keydown', function(e) {
    if (overlay.style.display !== 'flex') return;
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      if (!running) start();
      flap();
    }
    if (e.key === 'Escape') {
      overlay.style.display = 'none';
      stop();
    }
  });
})();

// Allow extension popup to toggle the game
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
  try {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      if (message && message.type === 'FLAPPY_TOGGLE') {
        const t = document.getElementById('flappy-toggle');
        if (t) t.click();
        sendResponse && sendResponse({ ok: true });
      }
    });
  } catch (e) {}
}