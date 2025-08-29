
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('#services-grid');
  const acc  = document.querySelector('#services-accordion');
  if (!grid || !acc) return;

  const cards = grid.querySelectorAll('article');
  acc.innerHTML = ''; // build fresh

  cards.forEach((card, i) => {
    const h3 = card.querySelector('h3');
    const paras = Array.from(card.querySelectorAll('p'));

    // Title (keep icons if present)
    const titleHTML = h3 ? h3.innerHTML.trim() : `Service ${i+1}`;

    // Description = first paragraph; Availability = the one containing 'Available'
    const desc = (paras[0] && !/available/i.test(paras[0].textContent))
                 ? paras[0].innerHTML.trim()
                 : (paras[1]?.innerHTML.trim() || '');
    const avail = (paras.find(p => /available/i.test(p.textContent))?.innerHTML.trim()) || '';

    const itemId = `svc${i}`;
    acc.insertAdjacentHTML('beforeend', `
      <div class="accordion-item">
        <h3 class="accordion-header" id="${itemId}-h">
          <button class="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#${itemId}-c"
                  aria-expanded="false" aria-controls="${itemId}-c">
            ${titleHTML}
          </button>
        </h3>
        <div id="${itemId}-c" class="accordion-collapse collapse"
             aria-labelledby="${itemId}-h" data-bs-parent="#services-accordion">
          <div class="accordion-body">
            ${desc ? `<div class="mb-2">${desc}</div>` : ''}
            ${avail ? `<div class="small text-muted">${avail}</div>` : ''}
          </div>
        </div>
      </div>
    `);
  });
});

