/* Modulo contatti delle landing page → Web3Forms (email) → /grazie (conversione) */
(function () {
  var KEY = 'dce9625a-4a1b-45ff-b400-73c66ee274ee';
  window.dataLayer = window.dataLayer || [];
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-track]'); if (a) dataLayer.push({ event: a.dataset.track });
  });
  var f = document.getElementById('lead-form'); if (!f) return;
  var msg = f.querySelector('.form-msg'), btn = f.querySelector('button[type=submit]'), label = btn.textContent;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.style.display = 'block';
    if (!f.checkValidity()) { msg.textContent = 'Compila i campi obbligatori (*) e accetta l\'informativa privacy.'; f.reportValidity && f.reportValidity(); return; }
    if (f.botcheck && f.botcheck.checked) return;
    var d = new FormData(f), p = { access_key: KEY, subject: 'Nuova richiesta dal sito – ' + (f.dataset.pagina || 'landing'), from_name: 'Sito Ares Account Manager' };
    d.forEach(function (v, k) { if (k === 'botcheck') return; p[k] = p[k] ? p[k] + ', ' + v : v; });
    btn.disabled = true; btn.textContent = 'Invio in corso…'; msg.textContent = '';
    fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(p) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (j.success) { location.href = '/grazie'; } else { throw 0; } })
      .catch(function () { btn.disabled = false; btn.textContent = label; msg.textContent = 'Invio non riuscito. Riprova oppure scrivimi su WhatsApp o via email.'; });
  });
})();
