/* Native dialog: keyboard containment, Escape, backdrop close and focus return. */
(function () {
  'use strict';
  var dialog = document.getElementById('oversight-modal');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  var opener = null, previousOverflow = '';
  document.querySelectorAll('[data-oversight-open]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      if (dialog.open) return;
      opener = link;
      previousOverflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      dialog.querySelector('[data-oversight-close]').focus();
      dialog.querySelector('.oversight-body').scrollTop = 0;
    });
  });
  dialog.querySelector('[data-oversight-close]').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('keydown', function (event) {
    if (event.key !== 'Tab') return;
    var items = Array.from(dialog.querySelectorAll('a[href],button:not([disabled]),[tabindex="0"]'))
      .filter(function (el) { return el.getClientRects().length; });
    var first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', function () {
    document.body.style.overflow = previousOverflow;
    if (opener) opener.focus({preventScroll: true});
  });
})();
