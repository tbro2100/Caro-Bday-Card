
function unlock(){
const ok=document.getElementById('pw').value.trim().toLowerCase()==='guldstribe';
if(!ok){document.getElementById('err').textContent='Forkert adgangskode';return;}
login.classList.add('hidden');
envelope.classList.remove('hidden');
}
function openCard(){
envelope.classList.add('hidden');
card.classList.remove('hidden');
}
