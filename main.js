let params = new URLSearchParams(location.search);

const scoreTitle = document.getElementById("score");
const healthTitle = document.getElementById("health");
let health = 5;
let score = 5;

let name = null;
let email = null;

const startDate = new Date(); 

function fillPlayer(player) {
  const tr = document.createElement("tr");
  const nickNameTd = document.createElement('td');
  const emailTd = document.createElement('td');
  nickNameTd.innerText = player.nickname;
  emailTd.innerText = player.email;
  tr.appendChild(nickNameTd);
  tr.appendChild(emailTd);
  playersList.appendChild(tr);
}

const players = JSON.parse(window.localStorage.getItem("players"));
const playersList = document.getElementById("players");

if (players?.length) {
  players.forEach(fillPlayer);
}

const pink = {
  name: "pink",
  health: 5,
  score: 5,
  image:
    "https://previews.123rf.com/images/albertzig/albertzig1210/albertzig121001605/16004994-cute-furry-monster.jpg",
};
const blue = {
  name: "blue",
  health: 10,
  score: 10,
  image:
    "https://previews.123rf.com/images/albertzig/albertzig1210/albertzig121001289/15743566-3d-cartoon-cute-furry-gremlin-monster.jpg",
};
const boss = {
  name: "boss",
  health: 20,
  score: 15,
  image:
    "https://previews.123rf.com/images/albertzig/albertzig1210/albertzig121000545/15626450-3d-cartoon-furry-cute-monster.jpg",
};

let currentEnemy = pink;

function onClick() {
  if (health === 1) {
    score = score + currentEnemy.score;
    scoreTitle.textContent = `Score: ${score}`;
    if (currentEnemy.name === "pink") {
      currentEnemy = blue;
    } else if (currentEnemy.name === "blue") {
      currentEnemy = boss;
    } else {
      scoreTitle.style.display = "none";
      enemy.style.display = "none";
      healthTitle.textContent = "You won!";
      const player = { nickname: params.get("nickname"), email: params.get("email") };
      window.localStorage.setItem("players", JSON.stringify([...players, player]));
      fillPlayer(player);
      const endDate = new Date();
      const diff = Math.abs(endDate-startDate) / 1000;
     
      return;
    }
    health = currentEnemy.health;
    enemy.setAttribute("src", currentEnemy.image);
  } else {
    health = health - 1;
  }
  healthTitle.textContent = `Health: ${health}`;
  scoreTitle.textContent = `Score: ${score}`;
}
healthTitle.textContent = `Health: ${health}`;
scoreTitle.textContent = `Score: ${score}`;
const enemy = document.getElementById("enemy");
enemy.onclick = onClick;

const resultList = document.querySelector("bottom-slot > pre");
const searchString = window.location.search;

new URLSearchParams(searchString).forEach((value, name) => {
  resultList.append(`${name} : ${value}`);
  resultList.append(document.createElement("br"));
});
