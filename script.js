const images = [
  'collage.jpeg','24133.jpg','24134.jpg','24135.jpg','24136.jpg','24137.jpg','24138.jpg','24139.jpg','24140.jpg','24141.jpg','24142.jpg','24143.jpg','24144.jpg','24145.jpg','24146.jpg','24148.jpg','24149.jpg','24150.jpg','24151.jpg','24152.jpg','24153.jpg','24154.jpg','24155.jpg','24156.jpg','24158.jpg'
];

const questions = [
  { q: 'What is my bestie’s secret superpower?', a: ['Making everyone smile 😄','Eating snacks like a champion 🍫','Giving perfect drama expressions 🎭','All of these ✨'] },
  { q: 'If she had a warning label, what would it say?', a: ['Too cute to handle 🎀','Warning: nonstop laughter 😂','Drama queen but precious 👑','Bestie material only 💖'] },
  { q: 'What should be compulsory on her birthday?', a: ['Cake 🎂','Photoshoot 📸','Good food 🍕','All + extra gifts 🎁'] },
  { q: 'Her friendship feels like...', a: ['A warm hug 🌸','A funny meme 😂','A safe place 🫶','Everything good together ✨'] },
  { q: 'What is the correct birthday rule?', a: ['No sadness allowed','Unlimited photos','Unlimited pampering','All rules apply 💕'] }
];

let step = 0;
const app = document.getElementById('app');

function renderLock(){
  app.innerHTML = `<section class="screen"><div class="card small">
    <span class="tag">Secret birthday website 🔐</span>
    <h2>Enter the magic password</h2>
    <p class="sub">Hint: her birthday date 💝</p>
    <input id="pass" class="input" maxlength="4" placeholder="••••" inputmode="numeric" />
    <div class="error" id="err"></div>
    <button onclick="checkPass()">Unlock Surprise ✨</button>
  </div></section>`;

  document.getElementById('pass').addEventListener('keydown', (e) => {
    if(e.key === 'Enter') checkPass();
  });
}

function checkPass(){
  const val = document.getElementById('pass').value.trim();
  if(val === '2906') renderIntro();
  else document.getElementById('err').textContent = 'Wrong password 😭 try again!';
}

function renderIntro(){
  app.innerHTML = `<section class="screen"><div class="card small">
    <span class="tag">Unlocked 💖</span>
    <h1>Bestie Quiz</h1>
    <p class="sub">Answer 5 funny questions to open the birthday surprise.</p>
    <button onclick="renderQuestion(0)">Start Quiz 🎀</button>
  </div></section>`;
}

function renderQuestion(i){
  step = i;
  const item = questions[i];
  const percent = ((i) / questions.length) * 100;
  app.innerHTML = `<section class="screen"><div class="card small">
    <div class="progress"><div class="bar" style="width:${percent}%"></div></div>
    <span class="tag">Question ${i+1} / ${questions.length}</span>
    <h2>${item.q}</h2>
    <div class="options">${item.a.map(x=>`<button class="option" onclick="nextQ()">${x}</button>`).join('')}</div>
  </div></section>`;
}

function nextQ(){
  if(step < questions.length - 1) renderQuestion(step + 1);
  else renderTogether();
}

function renderTogether(){
  app.innerHTML = `<section class="screen"><div class="card small">
    <span class="tag">One last bestie question 🫶</span>
    <h2>Do you want us to be together as besties forever?</h2>
    <p class="sub">Choose carefully... but both choices lead to your surprise 😌</p>
    <div class="btns">
      <button class="yes" onclick="renderBirthday()">YESSS 💖</button>
      <button class="no" onclick="renderBirthday()">No... but actually yes 😂</button>
    </div>
  </div></section>`;
}

function renderBirthday(){
  app.innerHTML = `<section class="screen"><div class="card hero">
    <div>
      <span class="tag">To my forever bestie ✨</span>
      <h1>Happy Birthday</h1>
      <p class="quote">TO MY FOREVER BESTIE, you're not just my friend — you are my favourite person, my secret keeper and my biggest support. Life feels brighter, funnier and so much better with you in it. No matter what happens, we will stick together. Thank you for all the laughs, memories and crazy moments we share. I am happy to have you forever.</p>
      <div class="btns"><button onclick="document.querySelector('#memories').scrollIntoView({behavior:'smooth'})">See Memories 💌</button></div>
    </div>
    <img class="collage" src="collage.png" alt="Birthday Collage">
  </div></section>
  <section id="memories" class="screen"><div class="card">
    <h2 class="memory-title">Beautiful Memory Wall 🌸</h2>
    <p class="sub">A little website full of smiles, pictures and birthday love.</p>
    <div class="gallery">${images.map((img,idx)=>`<div class="photo" style="--r:${[-2,1.5,-1,2,0][idx%5]}deg"><img src="${img}" alt="memory" loading="lazy"></div>`).join('')}</div>
    <div class="note"><h2>Forever grateful for you 💕</h2><p>May your day be as beautiful, happy and special as you are.</p></div>
  </div></section>`;
  confetti();
}

function confetti(){
  const c = document.getElementById('confetti');
  const ctx = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  const colors = ['#ff5ea8','#ffc15a','#b46cff','#ff8c5a'];
  let pieces = Array.from({length:120},()=>({
    x:Math.random()*c.width, y:-20-Math.random()*c.height, r:Math.random()*6+3,
    s:Math.random()*3+2, a:Math.random()*Math.PI*2, col:colors[Math.floor(Math.random()*colors.length)]
  }));
  let t = 0;
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    pieces.forEach(p=>{
      p.y += p.s; p.x += Math.sin(p.a + t/20);
      ctx.fillStyle = p.col;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    });
    t++;
    if(t < 220) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,c.width,c.height);
  }
  draw();
}

renderLock();
