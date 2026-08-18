/* Bivetica contact form — AJAX submit with graceful fallback + honeypot. */
(function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const status = form.querySelector('.cf-status');
  const btn = form.querySelector('button[type="submit"]');
  const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.company_url && form.company_url.value) return;            // honeypot

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !message || !emailRe.test(email)) {
      status.textContent = 'Please add your name, a valid email and a message.';
      status.className = 'cf-status err';
      return;
    }

    const original = btn.textContent;
    btn.disabled = true; btn.textContent = 'Sending…';
    status.textContent = ''; status.className = 'cf-status';

    try {
      const res = await fetch('contact.php', {
        method: 'POST',
        headers: { 'X-Requested-With': 'fetch' },
        body: new FormData(form)
      });
      const data = await res.json().catch(() => ({ ok: res.ok }));
      if (!data.ok) throw new Error(data.error || 'failed');
      form.reset();
      btn.textContent = 'Sent ✓';
      status.textContent = 'Thank you — your message is on its way. We’ll be in touch shortly.';
      status.className = 'cf-status ok';
    } catch (err) {
      btn.disabled = false; btn.textContent = original;
      status.textContent = 'Sorry, something went wrong. Please email hello@bivetica.com directly.';
      status.className = 'cf-status err';
    }
  });
})();
