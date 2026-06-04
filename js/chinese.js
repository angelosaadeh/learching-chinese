// ══ CHINESE FLASHCARDS (version simplifiée) ═══════════════════

let cnCards = [];
let cnFilteredCards = [];
let cnCurrentIndex = 0;
let cnShowState = 0;
let cnSelectedLevels = [];

function initChinese() {
  if (typeof characterData === 'undefined') {
    return;
  }
  
  cnCards = characterData;
  
  // Configuration des checkboxes
  setupHskCheckboxes();
  
  // Sélectionner tous les HSK par défaut
  selectAllHsk();
  
  // Configurer le clic sur la flashcard
  document.getElementById('chinese-flashcard').onclick = cnToggleCard;
  
  // Afficher la première carte
  cnFilterCards();
}

function setupHskCheckboxes() {
  // Bouton "All HSK"
  const selectAllBtn = document.getElementById('hsk-select-all');
  selectAllBtn.onclick = function() {
    const allCheckboxes = document.querySelectorAll('.hsk-checkbox');
    const allChecked = document.querySelectorAll('.hsk-checkbox.checked').length === 6;
    
    if (allChecked) {
      // Tout désélectionner
      allCheckboxes.forEach(cb => cb.classList.remove('checked'));
      cnSelectedLevels = [];
    } else {
      // Tout sélectionner
      allCheckboxes.forEach(cb => cb.classList.add('checked'));
      cnSelectedLevels = ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6'];
    }
    cnFilterCards();
  };
  
  // Chaque checkbox HSK
  document.querySelectorAll('.hsk-checkbox').forEach(cb => {
    cb.onclick = function(e) {
      e.preventDefault();
      this.classList.toggle('checked');
      updateSelectedHsk();
      cnFilterCards();
    };
  });
}

function updateSelectedHsk() {
  cnSelectedLevels = [];
  document.querySelectorAll('.hsk-checkbox.checked').forEach(cb => {
    cnSelectedLevels.push(cb.getAttribute('data-level'));
  });
}

function selectAllHsk() {
  cnSelectedLevels = ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6'];
}

function cnFilterCards() {
  if (cnSelectedLevels.length === 0) {
    cnFilteredCards = [];
    cnCurrentIndex = -1;
  } else {
    // Filtrer les cartes par niveau HSK
    cnFilteredCards = cnCards.filter(c => 
      cnSelectedLevels.some(level => 
        c.hsk.toUpperCase() === level.toUpperCase()
      )
    );
    
    // Mélanger aléatoirement
    for (let i = cnFilteredCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cnFilteredCards[i], cnFilteredCards[j]] = [cnFilteredCards[j], cnFilteredCards[i]];
    }
    
    cnCurrentIndex = 0;
  }
  
  cnShowState = 0;
  cnUpdateCard();
  cnUpdateCounter();
}

function cnUpdateCard() {
  if (cnFilteredCards.length === 0 || cnCurrentIndex === -1) {
    document.getElementById('cn-fc-char').textContent = '📚';
    document.getElementById('cn-fc-pinyin').textContent = '';
    document.getElementById('cn-fc-definition').textContent = 'Select HSK levels';
    document.getElementById('cn-fc-hsk').textContent = '';
    return;
  }
  
  const pinyin = document.getElementById('cn-fc-pinyin');
  const definition = document.getElementById('cn-fc-definition');

  // Snap to hidden instantly, bypassing the CSS opacity transition
  pinyin.style.transition = 'none';
  definition.style.transition = 'none';
  pinyin.classList.remove('visible');
  definition.classList.remove('visible');

  const card = cnFilteredCards[cnCurrentIndex];
  document.getElementById('cn-fc-char').textContent = card.char || '—';
  pinyin.textContent = card.pinyin || '';
  definition.textContent = card.definition || '';
  document.getElementById('cn-fc-hsk').textContent = card.hsk || '';
  document.querySelector('.flashcard-hint').textContent = 'click to reveal';

  // Restore transition so the reveal still animates
  requestAnimationFrame(() => {
    pinyin.style.transition = '';
    definition.style.transition = '';
  });
}

function cnToggleCard() {
  if (cnFilteredCards.length === 0) return;
  
  cnShowState++;
  
  if (cnShowState === 1) {
    document.getElementById('cn-fc-pinyin').classList.add('visible');
    document.querySelector('.flashcard-hint').textContent = 'click for definition';
  } else if (cnShowState === 2) {
    document.getElementById('cn-fc-definition').classList.add('visible');
    document.querySelector('.flashcard-hint').textContent = 'click for next card';
  } else {
    cnShowState = 0;
    cnNextCard();
  }
}

function cnNextCard() {
  if (cnFilteredCards.length === 0) return;
  
  cnCurrentIndex++;
  
  if (cnCurrentIndex >= cnFilteredCards.length) {
    // Fin du cycle, on remélange et on recommence
    for (let i = cnFilteredCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cnFilteredCards[i], cnFilteredCards[j]] = [cnFilteredCards[j], cnFilteredCards[i]];
    }
    cnCurrentIndex = 0;
  }
  
  cnShowState = 0;
  cnUpdateCard();
  cnUpdateCounter();
}

function cnPrevCard() {
  if (cnFilteredCards.length === 0) return;
  
  cnCurrentIndex--;
  
  if (cnCurrentIndex < 0) {
    cnCurrentIndex = cnFilteredCards.length - 1;
  }
  
  cnShowState = 0;
  cnUpdateCard();
  cnUpdateCounter();
}

function cnUpdateCounter() {
  const counter = document.getElementById('cn-counter');
  if (cnFilteredCards.length === 0) {
    counter.textContent = '0/0';
  } else {
    counter.textContent = `${cnCurrentIndex + 1}/${cnFilteredCards.length}`;
  }
  
  const progress = document.getElementById('cn-progress');
  if (cnFilteredCards.length > 0) {
    const percent = ((cnCurrentIndex + 1) / cnFilteredCards.length) * 100;
    progress.style.width = percent + '%';
  } else {
    progress.style.width = '0%';
  }
}

// Rendre les fonctions globales
window.cnPrevCard = cnPrevCard;
window.cnNextCard = cnNextCard;
window.initChinese = initChinese;

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('cool-chinese')?.classList.contains('active')) {
    initChinese();
  }
});