'use strict';

const PW   = 'guldstribe';
const wait = ms => new Promise(r => setTimeout(r, ms));

const pw       = document.getElementById('pw');
const btnOpen  = document.getElementById('btn-open');
const pwErr    = document.getElementById('pw-err');
const sLogin   = document.getElementById('s-login');
const sEnv     = document.getElementById('s-envelope');
const envOuter = document.getElementById('env-outer');
const envFlap  = document.getElementById('env-flap');
const cCard    = document.getElementById('c-card');
const envProm  = document.getElementById('env-prompt');
const sCard    = document.getElementById('s-card');
const fullCard = document.getElementById('full-card');

let envDone = false;

/* ── Login ── */
async function tryLogin() {
  const val = pw.value.trim().toLowerCase();

  if (val !== PW) {
    pwErr.classList.add('on');
    pw.style.borderBottomColor = 'rgba(255,70,70,0.22)';
    await wait(2400);
    pwErr.classList.remove('on');
    pw.style.borderBottomColor = '';
    return;
  }

  pw.disabled      = true;
  btnOpen.disabled = true;

  btnOpen.classList.add('glow');   // 1 · knap lyser (400 ms)
  await wait(400);

  sLogin.style.opacity       = '0'; // 2 · login fader (800 ms)
  sLogin.style.pointerEvents = 'none';
  await wait(800);
  sLogin.style.display = 'none';

  await wait(500);                  // 3 · pause (500 ms)
  sEnv.classList.add('on');         // 4 · kuvert glider op
}

btnOpen.addEventListener('click', tryLogin);
pw.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });

/* ── Kuvert klik ── */
envOuter.addEventListener('click', async () => {
  if (envDone) return;
  envDone = true;

  envProm.style.opacity = '0';

  envFlap.classList.add('open');   // 1 · flap åbner
  await wait(1050);

  cCard.classList.add('up');       // 2 · kort glider op
  await wait(1900);

  sEnv.style.opacity       = '0'; // 3 · kuvert fader
  sEnv.style.pointerEvents = 'none';
  sCard.style.display      = 'flex';
  await wait(40);
  sCard.classList.add('on');

  await wait(180);
  fullCard.classList.add('open'); // 4 · kort folder ud

  await wait(720);                 // 5 · tekst toner frem
  const seq = ['l1','r1','l2','l3','r2','l4','l5','lsig'];
  for (const id of seq) {
    await wait(310);
    document.getElementById(id).classList.add('in');
  }
});
