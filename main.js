const scoreTitle = document.getElementById('score');
const healthTitle = document.getElementById('health');
let health = 5;
let score = 5;

const pink = {
  name: 'pink',
  health: 5,
  score: 5,
  image: "https://previews.123rf.com/images/albertzig/albertzig1210/albertzig121001605/16004994-cute-furry-monster.jpg",  
  }
const blue = {
  name: 'blue',
  health: 10,
  score: 10,
  image: "https://previews.123rf.com/images/albertzig/albertzig1210/albertzig121001289/15743566-3d-cartoon-cute-furry-gremlin-monster.jpg", 
   }
const boss = {
   name: 'boss',
   health: 20,
   score: 15,
   image: "https://previews.123rf.com/images/albertzig/albertzig1210/albertzig121000545/15626450-3d-cartoon-furry-cute-monster.jpg",
    }

let currentEnemy = pink;

function onClick() {
  if (health === 1) {
    score = score + currentEnemy.score;
    scoreTitle.textContent = `Score: ${score}`;
    if (currentEnemy.name === 'pink') {
      currentEnemy = blue;
    } else if (currentEnemy.name === 'blue'){
      currentEnemy = boss;
    } else {
       scoreTitle.style.display = 'none';
       enemy.style.display = 'none';
       healthTitle.textContent = "You won!"
       return;
    }
    health =  currentEnemy.health;
    enemy.setAttribute("src", currentEnemy.image)
  } else {
    health = health - 1;
  }
  healthTitle.textContent = `Health: ${health}`;
  scoreTitle.textContent = `Score: ${score}`;
}
healthTitle.textContent = `Health: ${health}`;
scoreTitle.textContent = `Score: ${score}`;
const enemy = document.getElementById('enemy');
enemy.onclick = onClick;



