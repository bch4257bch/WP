// ════════════════════════════════════════
//  UI — 화면 전환 & 렌더링
// ════════════════════════════════════════

function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  if (id === 'weapon-screen') {
    state.weaponPhase = 'primary';
    state.primary     = null;
    state.secondary   = null;
    renderWeaponCards();
    updateWeaponPhaseUI();
  }
  if (id === 'confirm-screen') {
    buildConfirm();
  }
}

function renderWeaponCards() {
  const container = document.getElementById('weapon-cards');
  container.innerHTML = '';

  WEAPONS.forEach(w => {
    const isLocked = (state.weaponPhase === 'secondary' && w.id === state.primary);
    const isSelected = (state.weaponPhase === 'primary')
      ? w.id === state.primary
      : w.id === state.secondary;

    const card = document.createElement('div');
    card.className = 'wpn-card' +
      (isSelected ? ' selected' : '') +
      (isLocked ? ' locked' : '');
    card.id = 'wpn-' + w.id;

    card.innerHTML = `
      <div class="wpn-emoji">${w.emoji}</div>
      <div class="wpn-name">${w.name}</div>
      <div class="wpn-sub">${w.sub}</div>
      <div class="wpn-concept">${w.concept.replace('\n','<br>')}</div>
      <div class="wpn-stats">
        <div class="wstat-row">
          <span class="wstat-label">DMG</span>
          <div class="wstat-bar-bg"><div class="wstat-bar" style="width:${w.dmgPct}%"></div></div>
          <span class="wstat-val">${w.dmg}</span>
        </div>
        <div class="wstat-row">
          <span class="wstat-label">SPD</span>
          <div class="wstat-bar-bg"><div class="wstat-bar" style="width:${w.spdPct}%"></div></div>
          <span class="wstat-val">${w.spd}</span>
        </div>
        <div class="wstat-row">
          <span class="wstat-label">MOV</span>
          <div class="wstat-bar-bg"><div class="wstat-bar" style="width:${w.movPct}%"></div></div>
          <span class="wstat-val">${w.mov}</span>
        </div>
      </div>
    `;

    if (!isLocked) {
      card.onclick = () => selectWeapon(w.id);
    }

    container.appendChild(card);
  });
}

function updateWeaponPhaseUI() {
  const pp = document.getElementById('phase-primary');
  const ps = document.getElementById('phase-secondary');
  if (state.weaponPhase === 'primary') {
    pp.className = 'phase-dot active';
    ps.className = 'phase-dot';
  } else {
    pp.className = 'phase-dot done';
    ps.className = 'phase-dot active';
  }
}

function buildConfirm() {
  const pw = WEAPONS.find(w => w.id === state.primary);
  const sw = WEAPONS.find(w => w.id === state.secondary);
  const charName = state.character === 'male' ? '남 · KAEL' : '여 · LYRA';

  document.getElementById('sum-char').textContent     = charName;
  document.getElementById('sum-primary').textContent  = `${pw.emoji} ${pw.name} — ${pw.sub}`;
  document.getElementById('sum-secondary').textContent= `${sw.emoji} ${sw.name} — ${sw.sub}`;

  document.getElementById('sum-dual').innerHTML =
    `<span style="font-size:clamp(22px,3vw,40px);filter:drop-shadow(0 0 8px #3a8ccc)">${pw.emoji}</span>` +
    `<span style="font-size:clamp(10px,1.2vw,14px);color:#2a5a70;letter-spacing:.1em"> + </span>` +
    `<span style="font-size:clamp(22px,3vw,40px);filter:drop-shadow(0 0 8px #3a8ccc)">${sw.emoji}</span>`;
}
