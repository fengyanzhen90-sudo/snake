const holes = Array.from(document.querySelectorAll(".hole"));
const difficultyButtons = Array.from(document.querySelectorAll(".difficulty"));
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const scoreEl = document.querySelector("#score");
const comboEl = document.querySelector("#combo");
const timeEl = document.querySelector("#time");
const messageEl = document.querySelector("#message");

const levels = {
  easy: {
    label: "简单",
    seconds: 45,
    showMs: 980,
    spawnMs: 820,
    traps: 0,
    bonusChance: 0.1,
  },
  medium: {
    label: "中等",
    seconds: 45,
    showMs: 760,
    spawnMs: 620,
    traps: 0.16,
    bonusChance: 0.14,
  },
  hard: {
    label: "复杂",
    seconds: 50,
    showMs: 560,
    spawnMs: 430,
    traps: 0.28,
    bonusChance: 0.18,
  },
};

let levelKey = "easy";
let score = 0;
let combo = 0;
let timeLeft = levels.easy.seconds;
let isPlaying = false;
let spawnTimer = null;
let countdownTimer = null;
let lastHoleIndex = -1;

function setText() {
  scoreEl.textContent = score;
  comboEl.textContent = combo;
  timeEl.textContent = timeLeft;
}

function clearHoles() {
  holes.forEach((hole) => {
    hole.className = "hole";
    hole.disabled = false;
    delete hole.dataset.kind;
  });
}

function chooseHole() {
  let index = Math.floor(Math.random() * holes.length);
  if (holes.length > 1) {
    while (index === lastHoleIndex) {
      index = Math.floor(Math.random() * holes.length);
    }
  }
  lastHoleIndex = index;
  return holes[index];
}

function spawnMole() {
  if (!isPlaying) return;

  const level = levels[levelKey];
  const hole = chooseHole();
  const roll = Math.random();
  const kind = roll < level.traps ? "trap" : roll < level.traps + level.bonusChance ? "bonus" : "mole";

  hole.classList.add(kind);
  hole.dataset.kind = kind;

  window.setTimeout(() => {
    hole.classList.remove("mole", "bonus", "trap");
    delete hole.dataset.kind;
  }, level.showMs);
}

function scheduleSpawns() {
  const level = levels[levelKey];
  spawnMole();
  spawnTimer = window.setInterval(spawnMole, level.spawnMs);
}

function finishGame() {
  isPlaying = false;
  window.clearInterval(spawnTimer);
  window.clearInterval(countdownTimer);
  clearHoles();
  startBtn.disabled = false;
  startBtn.textContent = "再玩一次";
  messageEl.textContent = `游戏结束，最终得分 ${score}`;
}

function startGame() {
  const level = levels[levelKey];
  score = 0;
  combo = 0;
  timeLeft = level.seconds;
  isPlaying = true;
  setText();
  clearHoles();
  messageEl.textContent = `${level.label}模式开始`;
  startBtn.disabled = true;
  startBtn.textContent = "游戏中";

  window.clearInterval(spawnTimer);
  window.clearInterval(countdownTimer);
  scheduleSpawns();

  countdownTimer = window.setInterval(() => {
    timeLeft -= 1;
    setText();

    if (timeLeft <= 0) {
      finishGame();
    }
  }, 1000);
}

function resetGame() {
  isPlaying = false;
  window.clearInterval(spawnTimer);
  window.clearInterval(countdownTimer);
  score = 0;
  combo = 0;
  timeLeft = levels[levelKey].seconds;
  clearHoles();
  setText();
  startBtn.disabled = false;
  startBtn.textContent = "开始游戏";
  messageEl.textContent = "选择难度后点击开始";
}

function hitHole(event) {
  if (!isPlaying) return;

  const hole = event.currentTarget;
  const kind = hole.dataset.kind;
  if (!kind) {
    combo = 0;
    score = Math.max(0, score - 1);
    messageEl.textContent = "敲空啦";
    setText();
    return;
  }

  hole.classList.add("hit");
  window.setTimeout(() => hole.classList.remove("hit"), 160);
  hole.classList.remove("mole", "bonus", "trap");
  delete hole.dataset.kind;

  if (kind === "trap") {
    combo = 0;
    score = Math.max(0, score - 8);
    messageEl.textContent = "碰到捣蛋洞，扣 8 分";
  } else {
    combo += 1;
    const base = kind === "bonus" ? 5 : 2;
    const comboBonus = Math.min(8, Math.floor(combo / 3));
    score += base + comboBonus;
    messageEl.textContent = kind === "bonus" ? "金色地鼠，加分" : "命中";
  }

  setText();
}

difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isPlaying) return;

    levelKey = button.dataset.level;
    difficultyButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    timeLeft = levels[levelKey].seconds;
    setText();
    messageEl.textContent = `已选择${levels[levelKey].label}模式`;
  });
});

holes.forEach((hole) => hole.addEventListener("click", hitHole));
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

setText();
