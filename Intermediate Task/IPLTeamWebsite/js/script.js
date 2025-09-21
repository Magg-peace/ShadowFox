const teamColors = {
  CSK:{primary:"#fefd5b",secondary:"#fcca46",text:"#333"},
  MI:{primary:"#1e3a8a",secondary:"#3b82f6",text:"#fff"},
  RCB:{primary:"#dc2626",secondary:"#f43f5e",text:"#fff"},
  KKR:{primary:"#facc15",secondary:"#fbbf24",text:"#333"},
  SRH:{primary:"#ff7c00",secondary:"#f97316",text:"#fff"},
  RR:{primary:"#ef4444",secondary:"#f87171",text:"#fff"},
  DC:{primary:"#2563eb",secondary:"#3b82f6",text:"#fff"},
  PBKS:{primary:"#ec4899",secondary:"#f472b6",text:"#fff"}
};

let currentTeam = "CSK";
const teamNameSpans = document.querySelectorAll("#teamName");

function applyTeamTheme(team){
  const colors = teamColors[team];
  document.body.style.backgroundColor = colors.primary;
  document.querySelectorAll(".navbar").forEach(nav=>{
    nav.style.backgroundColor = colors.secondary;
    nav.style.color = colors.text;
  });
  document.querySelectorAll(".btn").forEach(btn=>{
    btn.style.backgroundColor = colors.secondary;
    btn.style.color = colors.text;
  });
  document.querySelectorAll(".card").forEach(card=>{
    card.style.borderColor = colors.secondary;
  });
}

function updateTeamUI(team){
  teamNameSpans.forEach(span => span.textContent = team);
  applyTeamTheme(team);
}

updateTeamUI(currentTeam);

document.getElementById("changeTeamBtn")?.addEventListener("click",()=>{
  const teams = Object.keys(teamColors);
  let idx = teams.indexOf(currentTeam);
  idx = (idx+1)%teams.length;
  currentTeam = teams[idx];
  updateTeamUI(currentTeam);
});

function animateCounter(id, value){
  let el = document.getElementById(id);
  if(!el) return;
  let count = 0;
  let step = Math.ceil(value/50);
  const interval = setInterval(()=>{
    count += step;
    if(count>=value){count=value;clearInterval(interval);}
    el.textContent=count;
  },30);
}

let votes={player1:0,player2:0};
function vote(player){
  votes[player]++;
  const total=votes.player1+votes.player2;
  document.getElementById("player1-bar").style.width=(votes.player1/total*100)+"%";
  document.getElementById("player2-bar").style.width=(votes.player2/total*100)+"%";
}
// Confetti animation
function launchConfetti(){
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame(){
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.backgroundColor = randomColor();
    document.body.appendChild(confetti);

    setTimeout(()=>confetti.remove(), 3000);

    if(Date.now() < end){
      requestAnimationFrame(frame);
    }
  })();
}

function randomColor(){
  const colors = ["#f44336","#e91e63","#9c27b0","#3f51b5","#03a9f4","#4caf50","#ffeb3b","#ff9800"];
  return colors[Math.floor(Math.random()*colors.length)];
}

// Example trigger: Launch on poll vote
function vote(player){
  votes[player]++;
  const total=votes.player1+votes.player2;
  document.getElementById("player1-bar").style.width=(votes.player1/total*100)+"%";
  document.getElementById("player2-bar").style.width=(votes.player2/total*100)+"%";

  if(total % 5 === 0) launchConfetti(); // launch confetti every 5 votes
}
// Dynamic stats for current team
const teamStats = {
  CSK: {wins:12, trophies:5, runnersUp:3},
  MI: {wins:15, trophies:5, runnersUp:2},
  RCB: {wins:9, trophies:0, runnersUp:3},
  KKR: {wins:8, trophies:2, runnersUp:3},
  SRH: {wins:7, trophies:1, runnersUp:2},
  RR: {wins:6, trophies:1, runnersUp:2},
  DC: {wins:5, trophies:0, runnersUp:1},
  PBKS: {wins:4, trophies:0, runnersUp:1},
};

function updateStats(){
  const stats = teamStats[currentTeam];
  animateCounter("teamWins", stats.wins);
  animateCounter("teamTrophies", stats.trophies);
  animateCounter("teamRunnersUp", stats.runnersUp);
}

updateStats();
const balls = document.querySelectorAll(".floating-ball");
balls.forEach((ball,i)=>{
  let speed = 2 + Math.random()*2;
  let dir = 1;
  let pos = 0;
  function move(){
    pos += dir*speed;
    if(pos>30 || pos<-30) dir*=-1;
    ball.style.transform = `translateY(${pos}px) rotate(${pos*3}deg)`;
    requestAnimationFrame(move);
  }
  move();
});
