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

/* iOS: Skjul adressebjælke */
window.scrollTo(0, 1);

/* Blur aktiv input (lukker iOS keyboard) */
function blurAll() {
  if (document.activeElement && document.activeElement.blur) {
    document.activeElement.blur();
  }
}

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

  /* Luk keyboard INDEN animation — vigtigt på iOS */
  blurAll();
  await wait(150);

  /* 1 · Knap lyser gyldent (400ms) */
  btnOpen.classList.add('glow');
  await wait(400);

  /* 2 · Login fader (800ms) */
  sLogin.style.opacity       = '0';
  sLogin.style.pointerEvents = 'none';
  await wait(800);
  sLogin.style.display = 'none';

  /* 3 · Pause (500ms) */
  await wait(500);

  /* 4 · Kuvert glider op */
  sEnv.classList.add('on');
}

btnOpen.addEventListener('click', tryLogin);
pw.addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); tryLogin(); }
});

/* ── Kuvert ── */
function handleEnvelopeTap(e) {
  e.preventDefault();
  if (envDone) return;
  envDone = true;
  openEnvelope();
}

async function openEnvelope() {
  envProm.style.opacity = '0';

  envFlap.classList.add('open');   /* 1 · Flap åbner */
  await wait(1050);

  cCard.classList.add('up');       /* 2 · Kort glider op */
  await wait(1900);

  /* 3 · Skift til kortskærm */
  sEnv.style.opacity       = '0';
  sEnv.style.pointerEvents = 'none';
  sCard.style.display      = 'flex';
  await wait(40);
  sCard.classList.add('on');

  await wait(180);
  fullCard.classList.add('open');  /* 4 · Kortet folder ud */

  /* 5 · Tekst toner frem */
  await wait(720);
  const seq = ['l1','r1','l2','l3','r2','l4','l5','lsig'];
  for (const id of seq) {
    await wait(310);
    document.getElementById(id).classList.add('in');
  }
}

/* touchend for hurtig respons på iOS, click som fallback */
envOuter.addEventListener('touchend', handleEnvelopeTap, { passive: false });
envOuter.addEventListener('click', e => {
  if (!envDone) handleEnvelopeTap(e);
});
