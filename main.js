let params = new URLSearchParams(location.search);

const scoreTitle = document.getElementById("score");
const healthTitle = document.getElementById("health");
const levelTitle = document.getElementById("level");
const enemy = document.getElementById("enemy");
const victoryImage = document.getElementById("victoryImage");

let name = null;
let email = null;

const startDate = new Date();

function fillPlayer(player) {
  const tr = document.createElement("tr");
  const nickNameTd = document.createElement("td");
  const timeTd = document.createElement("td");
  nickNameTd.innerText = player.nickname;
  timeTd.innerText = `${player.time}s`;
  tr.appendChild(nickNameTd);
  tr.appendChild(timeTd);
  playersList.appendChild(tr);
}

function sortPlayersByTime(players) {
  return players.sort((a, b) => a.time - b.time);
}

const players = JSON.parse(window.localStorage.getItem("players"));
const playersList = document.getElementById("players");

if (players?.length) {
  sortPlayersByTime(players).slice(0, 10).forEach(fillPlayer);
}
const monsters = [
  {
    id: 0,
    name: "Blue",
    health: 5,
    score: 5,
    image: "./img/Blue_monster02.png",
  },
  {
    id: 1,
    name: "Green",
    health: 7,
    score: 7,
    image: "./img/Green_monster_angry.png",
  },
  {
    id: 2,
    name: "Darkblue",
    health: 10,
    score: 10,
    image: "./img/Blue_monster.png",
  },
  {
    id: 3,
    name: "Blue_boss",
    health: 20,
    score: 10,
    image: "./img/Blue_monster02-.png",
  },
];

let currentEnemy = monsters[0];
let health = currentEnemy.health;
let score = 0;
let level = 1;

function onClick() {
  if (health === 1) {
    enemy.style.top = "300px";
    score = score + currentEnemy.score;
    scoreTitle.textContent = `Score: ${score}`;
    const currentIndex = monsters.indexOf(currentEnemy);
    if (currentIndex !== monsters.length - 1) {
      currentEnemy = monsters[currentIndex + 1];
      health = currentEnemy.health;
    } else {
      const endDate = new Date();
      const diff = Math.abs(endDate - startDate) / 1000;
      const player = {
        nickname: params.get("nickname"),
        email: params.get("email"),
        time: diff,
      };
      const newPlayers = sortPlayersByTime(
        players?.length ? [...players, player] : [player]
      );

      window.localStorage.setItem("players", JSON.stringify(newPlayers));
      playersList.innerHTML = "";

      victoryImage.style.display = "block";
      scoreTitle.style.display = "none";
      levelTitle.style.display = "none";
      enemy.style.display = "none";
      healthTitle.textContent = `${params.get("nickname")} your time: ${diff}s, your score: ${score}`;

      newPlayers.slice(0, 10).forEach(fillPlayer);
      return;
    }
    health = currentEnemy.health;
    enemy.setAttribute("src", currentEnemy.image);
    level = level + 1;
    levelTitle.textContent = `Level: ${level}`;

  } else {
    health = health - 1;
    enemy.style.top = "300px";
    if (currentEnemy.name === "Darkblue" || currentEnemy.name === "Blue_boss") {
      let x = Math.random() * 1000;
      let y = Math.random() * 300;
      enemy.style.left = `${x}px`;
      enemy.style.top = `${y}px`;
    } else {
      if (currentEnemy.name === "Green"){
      let x = Math.random() * 1000;
      enemy.style.left = `${x}px`;
    }
  }
  }
  healthTitle.textContent = `Health: ${health}`;
  scoreTitle.textContent = `Score: ${score}`;
}
healthTitle.textContent = `Health: ${health}`;
scoreTitle.textContent = `Score: ${score}`;
levelTitle.textContent = `Level: ${level}`;

enemy.onclick = onClick;
enemy.setAttribute("src", currentEnemy.image);