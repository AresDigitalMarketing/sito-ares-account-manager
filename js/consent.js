/* Banner cookie + Google Consent Mode v2 – Ares Account Manager
   Categorie: tecnici (sempre attivi), statistiche (GA4), marketing (Google Ads, Meta).
   La scelta viene salvata nel browser per 6 mesi. */
(function () {
  var KEY = 'ares_consent_v1', MAX_AGE = 1000 * 60 * 60 * 24 * 180;

  function read() {
    try { var c = JSON.parse(localStorage.getItem(KEY)); if (c && Date.now() - c.t < MAX_AGE) return c; } catch (e) {}
    return null;
  }
  function save(stats, mkt) {
    var c = { s: !!stats, m: !!mkt, t: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    apply(c, true);
  }
  function apply(c, fresh) {
    window.gtag && gtag('consent', 'update', {
      analytics_storage: c.s ? 'granted' : 'denied',
      ad_storage: c.m ? 'granted' : 'denied',
      ad_user_data: c.m ? 'granted' : 'denied',
      ad_personalization: c.m ? 'granted' : 'denied'
    });
    if (fresh) (window.dataLayer = window.dataLayer || []).push({ event: 'consenso_aggiornato', consenso_statistiche: c.s, consenso_marketing: c.m });
  }

  var css = '.ck{position:fixed;left:16px;right:16px;bottom:16px;z-index:100;max-width:560px;margin-left:auto;background:#060c4f;border:1px solid rgba(34,230,255,.35);border-radius:18px;padding:22px 22px 18px;color:#fff;font:300 15px/1.55 Outfit,system-ui,sans-serif;box-shadow:0 20px 60px -10px rgba(0,0,0,.6)}'
    + '.ck h2{font-size:1.1rem;font-weight:600;margin:0 0 6px}.ck p{color:#b8c2f5;margin:0 0 14px;font-size:.92rem}.ck a{color:#8ff3ff;text-decoration:underline}'
    + '.ck-btns{display:flex;gap:8px;flex-wrap:wrap}.ck button{font:500 .92rem Outfit,system-ui,sans-serif;border-radius:999px;padding:10px 16px;cursor:pointer;border:1px solid rgba(140,220,255,.35);background:transparent;color:#fff;flex:1 1 auto}'
    + '.ck button.ck-ok{background:#22e6ff;color:#04104a;border-color:#22e6ff}.ck button.ck-no{background:rgba(255,255,255,.08)}'
    + '.ck-x{position:absolute;top:10px;right:12px;flex:none!important;border:0!important;padding:4px 8px!important;font-size:1.3rem!important;color:#b8c2f5!important}'
    + '.ck-opts{display:none;margin:4px 0 14px;border-top:1px solid rgba(140,220,255,.18);padding-top:12px}.ck.more .ck-opts{display:block}'
    + '.ck-opts label{display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;font-size:.9rem;color:#b8c2f5}.ck-opts b{color:#fff;font-weight:500}.ck-opts input{margin-top:4px;accent-color:#22e6ff;width:17px;height:17px;flex:none}'
    + '@media(max-width:520px){.ck{left:10px;right:10px;bottom:10px;padding:20px 16px 14px}}';

  function show(openDetails) {
    if (document.querySelector('.ck')) return;
    var c = read() || { s: false, m: false };
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var d = document.createElement('div'); d.className = 'ck' + (openDetails ? ' more' : ''); d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Preferenze cookie');
    d.innerHTML = '<button class="ck-x" aria-label="Chiudi e rifiuta i cookie non necessari">×</button>'
      + '<h2>Cookie e privacy</h2>'
      + '<p>Uso cookie tecnici necessari al funzionamento del sito e, solo con il tuo consenso, cookie statistici e di marketing (Google, Meta) per misurare le visite e le campagne. Dettagli nella <a href="/cookie-policy">cookie policy</a>.</p>'
      + '<div class="ck-opts">'
      + '<label><input type="checkbox" checked disabled><span><b>Tecnici</b> – sempre attivi, servono al funzionamento del sito.</span></label>'
      + '<label><input type="checkbox" id="ck-s"' + (c.s ? ' checked' : '') + '><span><b>Statistiche</b> – Google Analytics, per capire come viene usato il sito.</span></label>'
      + '<label><input type="checkbox" id="ck-m"' + (c.m ? ' checked' : '') + '><span><b>Marketing</b> – Google Ads e Meta, per misurare e migliorare le campagne pubblicitarie.</span></label>'
      + '</div>'
      + '<div class="ck-btns"><button class="ck-no">Rifiuta</button><button class="ck-more">Personalizza</button><button class="ck-ok">Accetta tutti</button></div>';
    document.body.appendChild(d);
    function close() { d.remove(); }
    d.querySelector('.ck-x').onclick = d.querySelector('.ck-no').onclick = function () { save(false, false); close(); };
    d.querySelector('.ck-ok').onclick = function () { save(true, true); close(); };
    var more = d.querySelector('.ck-more');
    function setMore() { more.textContent = d.classList.contains('more') ? 'Salva scelte' : 'Personalizza'; }
    setMore();
    more.onclick = function () {
      if (!d.classList.contains('more')) { d.classList.add('more'); setMore(); return; }
      save(d.querySelector('#ck-s').checked, d.querySelector('#ck-m').checked); close();
    };
  }

  window.aresCookiePreferences = function () { show(true); };
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-cookie-prefs]'); if (a) { e.preventDefault(); show(true); }
  });

  if (read()) return;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { show(false); });
  else show(false);
})();
