// ELYSIAN LEGEND – Final Production Version
document.addEventListener('DOMContentLoaded', () => {
  VANTA.BIRDS({el:"#hero", mouseControls:true, touchControls:true, quantity:5, birdSize:1.6, speedLimit:4, color1:0xd4af37, color2:0x9caf88});
  Splitting();
  anime({targets:'.char', opacity:[0,1], translateY:[100,0], rotateZ:[90,0], duration:1500, delay:anime.stagger(70)});
});

function startLegend() {
  document.querySelector('.center').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.center').remove();
    document.getElementById('app').style.display = 'block';
    showQuiz();
  }, 800);
}

function showQuiz() {
  document.getElementById('app').innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:linear-gradient(135deg,#0A1628,#1c2a44)">
      <div style="background:white;color:#0A1628;border-radius:32px;padding:4rem 3rem;max-width:720px;width:100%;box-shadow:0 40px 120px rgba(212,175,55,0.25)">
        <h2 style="font-family:'Cormorant Garamond';font-size:3.8rem;text-align:center;margin-bottom:3rem">Your Eternal Legend</h2>
        <div class="q">How did you first meet?<br>
          <label><input type="radio" name="meet" value="friends"> Through friends</label>
          <label><input type="radio" name="meet" value="work"> At work</label>
          <label><input type="radio" name="meet" value="online"> Online</label>
          <label><input type="radio" name="meet" value="chance"> Pure chance</label>
        </div>
        <div class="q">Your perfect weekend together?<br>
          <label><input type="radio" name="weekend" value="adventure"> Adventure</label>
          <label><input type="radio" name="weekend" value="relax"> Pure relaxation</label>
          <label><input type="radio" name="weekend" value="culture"> Art & culture</label>
          <label><input type="radio" name="weekend" value="party"> Friends & parties</label>
        </div>
        <div class="q">Your love in one word?<br>
          <label><input type="radio" name="vibe" value="adventurous"> Adventurous</label>
          <label><input type="radio" name="vibe" value="romantic"> Romantic</label>
          <label><input type="radio" name="vibe" value="intellectual"> Intellectual</label>
          <label><input type="radio" name="vibe" value="playful"> Playful</label>
          <label><input type="radio" name="vibe" value="elegant"> Elegant</label>
          <label><input type="radio" name="vibe" value="cozy"> Cozy</label>
        </div>
        <button onclick="generate()" style="width:100%;margin-top:3rem;padding:1.8rem;background:#D4AF37;color:#0A1628;border:none;border-radius:50px;font-size:1.6rem;font-weight:600">
          Generate Our Legend
        </button>
      </div>
    </div>
    <style>
      .q{margin:2.5rem 0;font-size:1.4rem;line-height:2.4}
      .q label{display:block;margin:1rem 0;padding:1rem;background:#F9F5F0;border-radius:16px;cursor:pointer;transition:.3s}
      .q label:hover{background:#D4AF37;color:white}
      input[type="radio"]{margin-right:12px;transform:scale(1.4)}
    </style>`;
}

function generate() {
  const m = document.querySelector('input[name="meet"]:checked')?.value;
  const w = document.querySelector('input[name="weekend"]:checked')?.value;
  const v = document.querySelector('input[name="vibe"]:checked')?.value;
  if (!m || !w || !v) return alert("Answer all three questions");

  const stories = {
    meeting: {friends:"destined by friends who saw what you couldn’t yet see", work:"born in late nights and shared dreams", online:"written across midnight messages and oceans", chance:"the universe’s most beautiful accident"},
    weekend: {adventure:"chasing horizons and hidden waterfalls", relax:"wrapped in silk sheets and golden silence", culture:"collecting art, jazz, and first-edition poetry", party:"turning every room into a celebration"},
    vibe: {adventurous:"wild hearts writing myths in fire", romantic:"eternal poets composing galaxies", intellectual:"minds intertwined like ancient libraries", playful:"permanent children dancing through time", elegant:"grace incarnate gliding through champagne", cozy:"home is wherever your heartbeat meets mine"}
  };

  const story = `You ${stories.meeting[m]}. Together you ${stories.weekend[w]}. Forever, you are ${stories.vibe[v]}.`;

  const venues = {
    romantic:"Cliffhouse of the Gods ⋅ Santorini",
    adventurous:"Aurora Ice Palace ⋅ Lapland",
    elegant:"Palazzo della Luna ⋅ Venice",
    cozy:"Highlands Eternal Lodge ⋅ Scotland",
    playful:"Sky Garden Babylon ⋅ Bali",
    intellectual:"Castello di Eternal ⋅ Amalfi"
  };

  document.getElementById('app').innerHTML = `
    <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:3rem;background:linear-gradient(135deg,#0A1628,#2a1a44)">
      <h1 style="font-size:5rem;font-family:'Cormorant Garamond';background:linear-gradient(135deg,#D4AF37,#E8C07A);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
        Your Eternal Legend
      </h1>
      <p style="font-size:2rem;max-width:800px;line-height:2.2;font-style:italic;margin:3rem auto">"${story}"</p>
      <div style="font-size:9rem;margin:2rem">✨</div>
      <h2 style="font-size:3rem;margin:1rem">${venues[v] || "Your Private Mythical Realm"}</h2>
      <p style="font-size:1.5rem;opacity:0.8">Prepared for you alone ⋅ Priceless</p>
      <button onclick="location.reload()" style="margin-top:4rem;padding:1.5rem 4rem;background:#D4AF37;color:#0A1628;border:none;border-radius:50px;font-size:1.5rem">
        Create Another Legend
      </button>
    </div>`;
  if ('speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(story.replace(/⋅/g,'').replace(/✨/g,''));
    u.rate = 0.8;
    speechSynthesis.speak(u);
  }
}
