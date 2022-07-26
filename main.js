let params = new URLSearchParams(location.search);

const scoreTitle = document.getElementById("score");
const healthTitle = document.getElementById("health");
const enemy = document.getElementById("enemy");

let name = null;
let email = null;

const startDate = new Date();

function fillPlayer(player) {
  const tr = document.createElement("tr");
  const nickNameTd = document.createElement("td");
  const emailTd = document.createElement("td");
  const timeTd = document.createElement("td");
  nickNameTd.innerText = player.nickname;
  emailTd.innerText = player.email;
  timeTd.innerText = `${player.time}s`;
  tr.appendChild(nickNameTd);
  tr.appendChild(emailTd);
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
    image: "./img/Blue_monster02.jpg",
  },
  {
    id: 1,
    name: "Darkblue",
    health: 7,
    score: 7,
    image: "./img/Blue_monster.jpg",
  },
  {
    id: 2,
    name: "Green",
    health: 10,
    score: 10,
    image: "./img/Green_monster_angry.jpg",
  },
  {
    id: 3,
    name: "Blue_boss",
    health: 20,
    score: 10,
    image: "./img/Blue_monster02-.jpg",
  },
];

let currentEnemy = monsters[0];
let health = currentEnemy.health;
let score = currentEnemy.score;

function onClick() {
  if (health === 1) {
    enemy.style.top = "300px";
    score = score + currentEnemy.score;
    scoreTitle.textContent = `Score: ${score}`;
    const currentIndex = monsters.indexOf(currentEnemy);
    if (currentIndex !== monsters.length - 1) {
      currentEnemy = monsters[currentIndex + 1];
      health = currentEnemy.health;
      score = currentEnemy.score;
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

      scoreTitle.style.display = "none";
      enemy.style.display = "none";
      healthTitle.textContent = `You won! Your time: ${diff}s`;

      newPlayers.slice(0, 10).forEach(fillPlayer);
      return;
    }
    health = currentEnemy.health;
    enemy.setAttribute("src", currentEnemy.image);
  } else {
    health = health - 1;
    if (currentEnemy.name === "Darkblue") {
      let x = Math.random() * 1000;
      let y = Math.random() * 300;
      enemy.style.left = `${x}px`;
      enemy.style.top = `${y}px`;
    } else {
      let x = Math.random() * 1000;
      enemy.style.left = `${x}px`;
    }

    //enemy.style.top = y + 'px';
  }
  healthTitle.textContent = `Health: ${health}`;
  scoreTitle.textContent = `Score: ${score}`;
}
healthTitle.textContent = `Health: ${health}`;
scoreTitle.textContent = `Score: ${score}`;

enemy.onclick = onClick;
enemy.setAttribute("src", currentEnemy.image);
