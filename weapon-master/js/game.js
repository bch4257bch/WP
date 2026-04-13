// ════════════════════════════════════════
//  GAME STATE
// ════════════════════════════════════════
const state = {
  character: null,      // 'male' | 'female'
  primary:   null,      // weapon id
  secondary: null,      // weapon id
  weaponPhase: 'primary',  // 'primary' | 'secondary'
};

// ════════════════════════════════════════
//  CHARACTER SELECT
// ════════════════════════════════════════
function selectChar(gender) {
  state.character = gender;
  document.getElementById('card-male').classList.toggle('selected', gender === 'male');
  document.getElementById('card-female').classList.toggle('selected', gender === 'female');
  document.getElementById('btn-char-next').disabled = false;
}

// ════════════════════════════════════════
//  WEAPON SELECT
// ════════════════════════════════════════
function selectWeapon(id) {
  if (state.weaponPhase === 'primary') {
    state.primary = id;
  } else {
    state.secondary = id;
  }
  renderWeaponCards();

  const hasSelection = state.weaponPhase === 'primary'
    ? !!state.primary
    : !!state.secondary;
  document.getElementById('btn-weapon-next').disabled = !hasSelection;
}

function onWeaponNext() {
  if (state.weaponPhase === 'primary') {
    state.weaponPhase = 'secondary';
    state.secondary = null;
    document.getElementById('btn-weapon-next').disabled = true;
    document.getElementById('weapon-scr-title').textContent = '보조무기 선택';
    document.getElementById('weapon-scr-sub').textContent   = '주무기와 조합할 보조 아티팩트';
    document.getElementById('btn-weapon-next').textContent  = '확인 ▶';
    updateWeaponPhaseUI();
    renderWeaponCards();
  } else {
    goTo('confirm-screen');
  }
}

// ════════════════════════════════════════
//  START GAME
// ════════════════════════════════════════
function startGame() {
  const flash = document.getElementById('flash');
  flash.style.opacity = '1';
  setTimeout(() => { flash.style.opacity = '0'; }, 80);
  setTimeout(() => {
    const pw = WEAPONS.find(w => w.id === state.primary);
    const sw = WEAPONS.find(w => w.id === state.secondary);
    const charName = state.character === 'male' ? 'KAEL' : 'LYRA';
    alert(
      `게임 시작!\n\n` +
      `캐릭터: ${charName}\n` +
      `주무기: ${pw.name} (${pw.sub})\n` +
      `보조무기: ${sw.name} (${sw.sub})\n\n` +
      `(게임플레이 화면은 추후 구현 예정)`
    );
  }, 300);
}

// ════════════════════════════════════════
//  KEY BINDING
// ════════════════════════════════════════
document.addEventListener('keydown', e => {
  if (['Escape','F5','F12'].includes(e.key)) return;
  const title = document.getElementById('title-screen');
  if (title.classList.contains('active')) goTo('char-screen');
});

// ════════════════════════════════════════
//  INIT PORTRAITS
// ════════════════════════════════════════
window.addEventListener('load', () => {
  drawMale(document.getElementById('portrait-male'));
  drawFemale(document.getElementById('portrait-female'));
});
