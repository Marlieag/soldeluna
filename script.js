
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('#services-grid');
  const accordion = document.querySelector('#services-accordion');
  if (!grid || !accordion) return;

  const cards = grid.querySelectorAll('article');
  accordion.innerHTML = '';

  cards.forEach((card, idx) => {
    const h3 = card.querySelector('h3');
    const iconEl = h3?.querySelector('i');
    const titleText = h3 ? h3.textContent.trim().replace(/\s+/g, ' ') : `Service ${idx+1}`;
    const iconClass = iconEl ? iconEl.className : 'fa-solid fa-spa';

    const desc = card.querySelector('p.text-start, p');
    const descHtml = desc ? desc.innerHTML.trim() : '';

    let durations = '';
    const strongs = card.querySelectorAll('p strong');
    strongs.forEach(s => {
      if (/available in/i.test(s.textContent)) {
        durations = s.parentElement ? s.parentElement.textContent.trim() : '';
      }
    });

    const headingId = `heading${idx}`;
    const collapseId = `collapse${idx}`;

    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.innerHTML = `
      <h2 class="accordion-header" id="${headingId}">
        <button class="accordion-button collapsed" type="button"
                data-bs-toggle="collapse" data-bs-target="#${collapseId}"
                aria-expanded="false" aria-controls="${collapseId}">
          <i class="${iconClass} me-2" aria-hidden="true"></i>
          <span class="fw-semibold">${titleText}</span>
        </button>
      </h2>
      <div id="${collapseId}" class="accordion-collapse collapse"
           aria-labelledby="${headingId}" data-bs-parent="#${accordion.id}">
        <div class="accordion-body text-start">
          ${descHtml ? `<p class="mb-2">${descHtml}</p>` : ''}
          ${durations ? `<p class="mb-0"><small class="text-muted">${durations}</small></p>` : ''}
        </div>
      </div>
    `;
    accordion.appendChild(item);
  });

  // Optionally open the first accordion item by default
  const firstCollapse = accordion.querySelector('.accordion-collapse');
  if (firstCollapse) {
    const btn = accordion.querySelector('.accordion-button');
    firstCollapse.classList.add('show');
    if (btn) btn.classList.remove('collapsed');
  }
});


