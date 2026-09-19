// 確認済みの正式なURLのみ設定してください。未設定時は予約を送信しません。
const salonLinks = Object.freeze({ reservation: '', instagram: '' });
const reserveButton = document.getElementById('reserve-button');
reserveButton.addEventListener('click', () => {
  if (salonLinks.reservation && /^https:\/\//.test(salonLinks.reservation)) {
    window.location.assign(salonLinks.reservation);
    return;
  }
  const status = document.getElementById('reservation-status');
  status.hidden = false;
});

// スマホのナビは通常フロー内で開き、本文を覆わない開閉式メニューにする。
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
const header = navToggle.closest('header');
const mobileViewport = window.matchMedia('(max-width: 600px)');
function setNavOpen(open) {
  header.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  navToggle.querySelector('span').textContent = open ? '×' : '☰';
}
navToggle.addEventListener('click', () => {
  setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true');
});
header.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
    setNavOpen(false);
    navToggle.focus();
  }
});
mainNav.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || !mobileViewport.matches) return;
  setNavOpen(false);
  const target = document.querySelector(link.hash);
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  }
});
mobileViewport.addEventListener('change', () => {
  const activeElement = document.activeElement;
  setNavOpen(false);
  if (mobileViewport.matches && mainNav.contains(activeElement)) navToggle.focus();
  if (!mobileViewport.matches && activeElement === navToggle) mainNav.querySelector('a').focus();
});
