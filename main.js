let params = new URLSearchParams(location.search);

const scoreTitle = document.getElementById("score");
const healthTitle = document.getElementById("health");
const enemy = document.getElementById("enemy");

let name = null;
let email = null;

const startDate = new Date(); 

function fillPlayer(player) {
  const tr = document.createElement("tr");
  const nickNameTd = document.createElement('td');
  const emailTd = document.createElement('td');
  const timeTd = document.createElement('td');
  nickNameTd.innerText = player.nickname;
  emailTd.innerText = player.email;
  timeTd.innerText = `${player.time}s`;
  tr.appendChild(nickNameTd);
  tr.appendChild(emailTd);
  tr.appendChild(timeTd);
  playersList.appendChild(tr);
}

/*const tr = document.createElement("tr");

const fillPlayer({nickname, email, time}) => `
<td class="table-td">${nickname}</td>
<td class="table-td">${email}</td>
<td class="table-td">${time}</td>
`*/

function sortPlayersByTime(players) {
  return players.sort((a,b) => a.time - b.time)
}

const players = JSON.parse(window.localStorage.getItem("players"));
const playersList = document.getElementById("players");

if (players?.length) {
  sortPlayersByTime(players).forEach(fillPlayer);
}
const monsters = [{
  id: 0,
  name: 'Pink',
  health: 5,
  score: 5,
  image: "./img/Pink_monster.jpg",  
},  
{ id: 1,
name: 'Yellow',
health: 7,
score: 7,
image: "./img/Blue_monster.jpg",
},
{  id: 2,
  name: 'Green',
  health: 10,
  score: 10,
  image: "./img/Green_monster_angry.jpg",
}, {
  id: 3,
  name: 'Blue_boss',
  health: 20,
  score: 10,
  image: "./img/Blue_monster02-.jpg",
  }];



/*const pink = {
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
};*/

let currentEnemy = monsters[0];
let health = currentEnemy.health;
let score = currentEnemy.score;

function onClick() {
  if (health === 1) {
    score = score + currentEnemy.score;
    scoreTitle.textContent = `Score: ${score}`;
    const currentIndex = monsters.indexOf(currentEnemy);
    if (currentIndex !== monsters.length - 1) {
      currentEnemy = monsters[currentIndex + 1];
      health = currentEnemy.health;
      score = currentEnemy.score;
    } else {
      scoreTitle.style.display = "none";
      enemy.style.display = "none";
      healthTitle.textContent = "You won!";

      const endDate = new Date();
      const diff = Math.abs(endDate-startDate) / 1000;
      const player = { nickname: params.get("nickname"), email: params.get("email"), time: diff };
      const newPlayers = sortPlayersByTime(players?.length ? [...players, player] : [player]);
      
      window.localStorage.setItem("players", JSON.stringify(newPlayers));
      playersList.innerHTML = '';

      newPlayers.forEach(fillPlayer);
      
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

enemy.onclick = onClick;
enemy.setAttribute("src", currentEnemy.image);


