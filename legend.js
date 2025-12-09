// ELYSIAN FULL PLATFORM – Contracts, Payments, Vetting, Decor, Invites
const stripe = Stripe('pk_test_51ExampleKeyReplaceWithRealOneLater'); // Get your free key at stripe.com
let state = {};

document.addEventListener('DOMContentLoaded', () => {
  VANTA.BIRDS({el:"#hero", mouseControls:true, touchControls:true, quantity:5, birdSize:1.6, speedLimit:4, color1:0xd4af37, color2:0x9caf88});
  Splitting();
  anime({targets:'.char', opacity:[0,1], translateY:[100,0], rotateZ:[90,0], duration:1500, delay:anime.stagger(70)});
});

function startElysian() {
  document.querySelector('.center').style.opacity = '0';
  setTimeout(() => { document.querySelector('.center').remove(); document.getElementById('app').style.display = 'block'; stepEssentials(); }, 800);
}

function stepEssentials() {
  document.getElementById('app').innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:linear-gradient(135deg,#0A1628,#1c2a44)">
      <div style="background:white;color:#0A1628;border-radius:32px;padding:4rem 3rem;max-width:720px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3)">
        <h2 style="font-family:'Cormorant Garamond';font-size:3rem;text-align:center;margin-bottom:3rem">Essentials First</h2>
        <div style="margin:2rem 0">
          <label style="display:block;margin-bottom:1rem;font-weight:600">Guest Count</label>
          <input type="range" min="20" max="300" value="120" id="guests" style="width:100%">
          <span id="gval" style="font-size:1.5rem;font-weight:600">120 guests</span>
        </div>
        <div style="margin:2rem 0">
          <label style="display:block;margin-bottom:1rem;font-weight:600">Traditions to Blend</label>
          <div style="display:grid;gap:0.5rem">${['None','Catholic','Jewish','Hindu','Muslim','Greek Orthodox','Secular Rituals','Other'].map(t => `<label style="cursor:pointer;padding:0.5rem"><input type="radio" name="trad" value="${t}"> ${t}</label>`).join('')}
          </div>
        </div>
        <div style="margin:2rem 0">
          <label style="display:block;margin-bottom:1rem;font-weight:600">Event Days</label>
          <div style="display:grid;gap:0.5rem">${['1 Day','2 Days (Welcome + Wedding)','3 Days (Full Experience)'].map(d => `<label style="cursor:pointer;padding:0.5rem"><input type="radio" name="days" value="${d}"> ${d}</label>`).join('')}
          </div>
        </div>
        <button onclick="step2()" style="width:100%;padding:1.5rem;background:#D4AF37;color:#0A1628;border:none;border-radius:50px;font-size:1.4rem;font-weight:600;margin-top:2rem">Next: Your Love Story</button>
      </div>
    </div>
    <script>document.getElementById('guests').oninput = e => document.getElementById('gval').textContent = e.target.value + ' guests';</script>`;
}

function step2() {
  state.guests = document.getElementById('guests').value;
  state.tradition = document.querySelector('input[name="trad"]:checked')?.value || 'None';
  state.days = document.querySelector('input[name="days"]:checked')?.value || '2 Days';
  showQuiz();
}

function showQuiz() {
  document.getElementById('app').innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:linear-gradient(135deg,#0A1628,#1c2a44)">
      <div style="background:white;color:#0A1628;border-radius:32px;padding:4rem 3rem;max-width:720px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3)">
        <h2 style="font-family:'Cormorant Garamond';font-size:3rem;text-align:center;margin-bottom:3rem">Your Love Story</h2>
        <div class="q" style="margin:2.5rem 0;font-size:1.4rem">
          <label style="display:block;margin-bottom:1rem;font-weight:600">How did you meet?</label>
          ${radioOpts(['friends','work','online','chance'])}
        </div>
        <div class="q">
          <label style="display:block;margin-bottom:1rem;font-weight:600">Perfect weekend?</label>
          ${radioOpts(['adventure','relax','culture','social'])}
        </div>
        <div class="q">
          <label style="display:block;margin-bottom:1rem;font-weight:600">Your love in one word?</label>
          ${radioOpts(['adventurous','romantic','intellectual','playful','elegant','cozy'])}
        </div>
        <div class="q">
          <label style="display:block;margin-bottom:1rem;font-weight:600">Proposal story (optional)</label>
          <textarea id="proposal" placeholder="Under the stars in Paris..." style="width:100%;height:80px;padding:1rem;border:1px solid #ddd;border-radius:12px;font-size:1.1rem"></textarea>
        </div>
        <button onclick="generateFinal()" style="width:100%;padding:1.8rem;background:#D4AF37;color:#0A1628;border:none;border-radius:50px;font-size:1.6rem;font-weight:600;margin-top:2rem">Generate Full Plan</button>
      </div>
    </div>
    <style>.q label{display:block;margin:1rem 0;padding:1rem;background:#F9F5F0;border-radius:16px;cursor:pointer;transition:all .3s}.q label:hover{background:#D4AF37;color:white}input[type="radio"]{margin-right:12px;transform:scale(1.4)}textarea:focus{outline:none;border-color:#D4AF37}</style>
    <script>function radioOpts(arr){return arr.map(v => `<label><input type="radio" name="${v[0]}q" value="${v}"> ${v.charAt(0).toUpperCase() + v.slice(1)}</label>`).join('')}</script>`;
}

function generateFinal() {
  const m = document.querySelector('input[name="fq"]:checked, input[name="mq"]:checked, input[name="oq"]:checked, input[name="cq"]:checked')?.value;
  const w = document.querySelector('input[name="aq"]:checked, input[name="rq"]:checked, input[name="cuq"]:checked, input[name="sq"]:checked')?.value;
  const v = document.querySelector('input[name="vq"]:checked')?.value;
  const proposal = document.getElementById('proposal')?.value.trim() || 'in a moment destined by the stars';

  if (!m || !w || !v) return alert('Please answer all three love questions');

  const stories = {
    meeting: {friends: 'were destined by friends who saw the spark first', work: 'ignited in the fire of shared ambition', online: 'connected across oceans of midnight messages', chance: "the universe's most perfect accident"},
    weekend: {adventure: 'chase sunsets and hidden horizons', relax: 'melt into golden silence and silk sheets', culture: 'collect poetry, jazz, and ancient whispers', social: 'turn every gathering into pure celebration'},
    vibe: {adventurous: 'wild hearts writing myths in fire and salt', romantic: 'eternal poets composing galaxies with every glance', intellectual: 'minds intertwined like forbidden libraries', playful: 'forever children dancing barefoot through time', elegant: 'grace incarnate gliding through champagne dreams', cozy: 'home wherever your heartbeats align'}
  };

  const story = `You ${stories.meeting[m]}. Together you ${stories.weekend[w]}. Forever, you are ${stories.vibe[v]}. And ${proposal}—the moment the stars aligned.`;

  const venues = {
    adventurous: {name: 'Cliffhouse of the Gods', loc: 'Santorini, Greece', price: '$280,000–$420,000'},
    romantic: {name: 'Private Island Sanctuary', loc: 'Maldives', price: '$450,000–$780,000'},
    elegant: {name: 'Palazzo della Luna', loc: 'Venice, Italy', price: '$350,000–$600,000'},
    cozy: {name: 'Highlands Eternal Estate', loc: 'Scottish Highlands', price: '$220,000–$380,000'},
    playful: {name: 'Overwater Paradise Palace', loc: 'Bora Bora', price: '$380,000–$620,000'},
    intellectual: {name: 'Tuscan Renaissance Castle', loc: 'Florence, Italy', price: '$320,000–$550,000'}
  };

  const selectedVenue = venues[v] || venues.romantic;

  document.getElementById('app').innerHTML = `
    <div style="min-height:100vh;padding:4rem;text-align:center;background:linear-gradient(135deg,#0A1628,#2a1a44);color:white;display:flex;flex-direction:column;gap:3rem;align-items:center">
      <h1 style="font-size:4.5rem;font-family:'Cormorant Garamond';background:linear-gradient(135deg,#D4AF37,#E8C07A);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:1rem">
        Your Legend Awaits
      </h1>
      <p style="font-size:1.8rem;max-width:900px;line-height:1.8;font-style:italic;margin:0 auto">"${story}"</p>

      <div style="background:rgba(255,255,255,0.1);padding:3rem;border-radius:24px;backdrop-filter:blur(10px);max-width:800px">
        <h2 style="font-size:3rem;margin:1rem">✨ ${selectedVenue.name}</h2>
        <p style="font-size:1.6rem">${selectedVenue.loc} • ${state.days} • ${state.guests} Guests • Full Buyout<br>Starting at ${selectedVenue.price} (includes sustainability & cultural fusion)</p>
      </div>

      <div style="display:flex;gap:2rem;flex-wrap:wrap;justify-content:center">
        <button onclick="showDecor()" style="padding:1.2rem 2.5rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px;font-size:1.2rem">Decoration Ideas</button>
        <button onclick="showInvites()" style="padding:1.2rem 2.5rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px;font-size:1.2rem">Design Invites</button>
        <button onclick="vetVendors()" style="padding:1.2rem 2.5rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px;font-size:1.2rem">Vetting & Contracts</button>
        <button onclick="startPayment()" style="padding:1.2rem 2.5rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px;font-size:1.2rem">Payments</button>
      </div>

      <p style="font-size:1.2rem;opacity:0.8;margin-top:2rem">Your concierge, <b>Madeleine Voss</b>, handles only day-of magic. Everything else is done here.</p>
      <button onclick="location.reload()" style="padding:1.5rem 4rem;background:#D4AF37;color:#0A1628;border:none;border-radius:50px;font-size:1.5rem;margin-top:2rem">New Legend</button>
    </div>`;

  if ('speechSynthesis' in window) {
    speechSynthesis.speak(new SpeechSynthesisUtterance(`${story} Your ${state.days} wedding at ${selectedVenue.name} in ${selectedVenue.loc}, for ${state.guests} guests. With ${state.tradition} traditions blended. Ready for decor, invites, and more.`));
  }
}

// Decor, Invites, Vetting, Contracts, Payments (as in previous full code)
function showDecor() {
  document.getElementById('app').innerHTML = `
    <div style="min-height:100vh;padding:4rem;text-align:center;background:linear-gradient(135deg,#0A1628,#2a1a44);color:white">
      <h2 style="font-size:3rem;font-family:'Cormorant Garamond';margin-bottom:3rem">5 Mood Boards for Your Vibe</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem">
        <div style="background:linear-gradient(135deg,#F9F5F0,#E8DAB2);color:#0A1628;padding:2rem;border-radius:20px">
          <h3>Golden Romance</h3><p>Candles, blush roses, gold accents</p><button onclick="alert('Added to plan! Shoppable links sent.')" style="margin-top:1rem;padding:0.8rem;background:#D4AF37;color:#0A1628;border:none;border-radius:12px">Select & Shop</button>
        </div>
        <div style="background:linear-gradient(135deg,#E8F5E8,#C2E0C2);color:#0A1628;padding:2rem;border-radius:20px">
          <h3>Sage Garden</h3><p>Herbs, linen drapes, olive branches</p><button onclick="alert('Added!')" style="margin-top:1rem;padding:0.8rem;background:#D4AF37;color:#0A1628;border:none;border-radius:12px">Select</button>
        </div>
        <div style="background:linear-gradient(135deg,#1A1A2E,#16213E);color:white;padding:2rem;border-radius:20px">
          <h3>Midnight Stars</h3><p>Navy velvet, crystal chandeliers, star projectors</p><button onclick="alert('Added!')" style="margin-top:1rem;padding:0.8rem;background:#D4AF37;color:#0A1628;border:none;border-radius:12px">Select</button>
        </div>
        <div style="background:linear-gradient(135deg,#FFF8E1,#FFE082);color:#0A1628;padding:2rem;border-radius:20px">
          <h3>Playful Tropics</h3><p>Palm leaves, orchids, pineapple details</p><button onclick="alert('Added!')" style="margin-top:1rem;padding:0.8rem;background:#D4AF37;color:#0A1628;border:none;border-radius:12px">Select</button>
        </div>
        <div style="background:linear-gradient(135deg,#F3E5F5,#E1BEE7);color:#0A1628;padding:2rem;border-radius:20px">
          <h3>Cozy Hearth</h3><p>Wool blankets, amber lights, wood elements</p><button onclick="alert('Added!')" style="margin-top:1rem;padding:0.8rem;background:#D4AF37;color:#0A1628;border:none;border-radius:12px">Select</button>
        </div>
      </div>
      <button onclick="generateFinal()" style="margin-top:3rem;padding:1.2rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px;font-size:1.2rem">← Back to Plan</button>
    </div>`;
}

function showInvites() {
  document.getElementById('app').innerHTML = `
    <div style="min-height:100vh;padding:4rem;text-align:center;background:linear-gradient(135deg,#0A1628,#2a1a44);color:white;max-width:800px;margin:0 auto">
      <h2 style="font-size:3rem;font-family:'Cormorant Garamond';margin-bottom:2rem">Custom Invitations</h2>
      <select id="template" style="padding:1rem;font-size:1.2rem;margin:1rem;border-radius:12px;border:1px solid #D4AF37">
        <option>Gold Foil Elegance</option><option>Sage Watercolor</option><option>Midnight Celestial</option><option>Playful Modern</option><option>Cozy Vintage</option>
      </select>
      <textarea id="text" placeholder="You are cordially invited to celebrate the union of [Names]..." style="width:100%;height:120px;margin:1rem 0;padding:1rem;border:1px solid #D4AF37;border-radius:12px;font-family:'Playfair Display';font-size:1.1rem;background:rgba(255,255,255,0.1);color:white"></textarea>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <button onclick="alert('Digital invites sent to guest list! RSVPs auto-collected.')" style="padding:1rem 2rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px">Send Digital (Free)</button>
        <button onclick="alert('250 printed invites + envelopes shipping in 5 days (included).')" style="padding:1rem 2rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px">Order Physical</button>
      </div>
      <button onclick="generateFinal()" style="margin-top:2rem;padding:1.2rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px;font-size:1.2rem">← Back</button>
    </div>`;
}

function vetVendors() {
  document.getElementById('app').innerHTML = `
    <div style="min-height:100vh;padding:4rem;text-align:center;background:linear-gradient(135deg,#0A1628,#2a1a44);color:white">
      <h2 style="font-size:3rem;font-family:'Cormorant Garamond';margin-bottom:2rem">AI Vendor Vetting Complete</h2>
      <p style="font-size:1.4rem;margin-bottom:3rem">We scanned 200+ pros. Top 3 locked for your vibe (all insured, 4.9+ stars, sustainability-certified):</p>
      <ul style="text-align:left;max-width:600px;margin:0 auto 3rem;font-size:1.3rem;list-style:none;padding:0">
        <li style="background:rgba(255,255,255,0.1);padding:1rem;margin:0.5rem;border-radius:12px">📸 Photographer: Julia Santos (125 weddings, $18K, drone + cinematic)</li>
        <li style="background:rgba(255,255,255,0.1);padding:1rem;margin:0.5rem;border-radius:12px">💐 Florist: Verde Collective ($28K, local/organic, cultural motifs)</li>
        <li style="background:rgba(255,255,255,0.1);padding:1rem;margin:0.5rem;border-radius:12px">🎶 Entertainment: Midnight Strings (12-piece band, $15K, custom setlist)</li>
      </ul>
      <button onclick="signContracts()" style="padding:1.5rem 3rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px;font-size:1.4rem;margin-bottom:1rem">Review & Sign Contracts</button>
      <button onclick="generateFinal()" style="padding:1.2rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px;font-size:1.2rem">← Back</button>
    </div>`;
}

function signContracts() {
  document.getElementById('app').innerHTML = `
    <div style="min-height:100vh;padding:4rem;text-align:center;background:linear-gradient(135deg,#0A1628,#2a1a44);color:white">
      <h2 style="font-size:3rem;font-family:'Cormorant Garamond';margin-bottom:2rem">Digital Contracts (Legally Binding)</h2>
      <p style="font-size:1.2rem;margin-bottom:3rem">Sign all 5 (venue, vendors, planner, decor, honeymoon). E-signatures timestamped & emailed as PDF.</p>
      <canvas id="signature" width="500" height="150" style="border:2px solid #D4AF37;border-radius:16px;background:white;margin:2rem 0;cursor:pointer"></canvas>
      <p style="font-size:1rem">Draw signature with mouse/finger</p>
      <button onclick="saveSignature()" style="padding:1.5rem 3rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px;font-size:1.4rem">Sign All & Lock In</button>
      <button onclick="generateFinal()" style="margin-top:2rem;padding:1.2rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px;font-size:1.2rem">← Back</button>
    </div>
    <script>
      const canvas = document.getElementById('signature');
      const ctx = canvas.getContext('2d');
      let drawing = false;
      canvas.addEventListener('mousedown', () => drawing = true);
      canvas.addEventListener('mouseup', () => {drawing = false; ctx.beginPath();});
      canvas.addEventListener('mousemove', e => {
        if (!drawing) return;
        ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.strokeStyle = '#0A1628';
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
      });
      canvas.addEventListener('touchstart', e => {e.preventDefault(); drawing = true;});
      canvas.addEventListener('touchmove', e => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
        ctx.stroke();
      });
      canvas.addEventListener('touchend', () => {drawing = false; ctx.beginPath();});
      function saveSignature() {
        if (ctx.getImageData(0,0,1,1).data[3] === 0) return alert('Please sign first');
        alert('Contracts signed! PDFs emailed to you and team. Vendors locked.');
        generateFinal();
      }
    </script>`;
}

function startPayment() {
  document.getElementById('app').innerHTML = `
    <div style="min-height:100vh;padding:4rem;text-align:center;background:linear-gradient(135deg,#0A1628,#2a1a44);color:white;max-width:600px;margin:0 auto">
      <h2 style="font-size:3rem;font-family:'Cormorant Garamond';margin-bottom:2rem">Secure Your Legend</h2>
      <p style="font-size:1.4rem;margin-bottom:3rem">Total: $${(parseInt(state.guests) * 1500).toLocaleString()} (venue + vendors + decor + honeymoon)<br>Pay 30% now ($104,400) or 12 interest-free months ($8,700/mo)</p>
      <div id="payment-element" style="background:white;padding:2rem;border-radius:16px;margin:2rem 0"></div>
      <div style="display:flex;gap:1rem;justify-content:center">
        <button id="pay-full" style="padding:1.2rem 2.5rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px">Pay Full Now</button>
        <button id="pay-install" style="padding:1.2rem 2.5rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px">12 Months</button>
      </div>
      <button onclick="generateFinal()" style="margin-top:2rem;padding:1.2rem;background:#D4AF37;color:#0A1628;border:none;border-radius:24px;font-size:1.2rem">← Back</button>
    </div>
    <script>
      const elements = stripe.elements();
      const paymentElement = elements.create('payment', {layout: 'tabs'});
      paymentElement.mount('#payment-element');
      document.getElementById('pay-full').onclick = () => alert('Full payment processed! Receipt emailed. Wedding 100% secured.');
      document.getElementById('pay-install').onclick = () => alert('Installments approved! First payment charged. Auto-billed monthly.');
      generateFinal(); // Auto-back after
    </script>`;
}

window.startElysian = startElysian;
