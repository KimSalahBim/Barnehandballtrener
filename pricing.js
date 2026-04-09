// © 2026 barnehandballtrener.no. All rights reserved.
// Barnehandballtrener - Pricing + Magic Link Logic (ROBUST)
// =======================================================
// Denne fila håndterer:
// 1) Planvalg (.btn-select)
// 2) Magic link (OTP) login (#magicLinkEmail + #magicLinkBtn) med cooldown/rate-limit-beskyttelse
// 3) Stripe success/cancel query params
//
// Viktig: Vi binder magic link med CAPTURE og stopImmediatePropagation()
// slik at evt. tidligere handlers (f.eks. i auth.js) ikke dobbel-sender.

(function () {
  'use strict';

  // -------------------------------
  // Timeout wrapper (kritisk for å unngå infinite hangs)
  // -------------------------------
  function withTimeout(promise, ms, errorMsg = "Timeout") {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error(errorMsg)), ms))
    ]);
  }

  // -------------------------------
  // Utils
  // -------------------------------
  function log(...args) {
    console.log(...args);
  }

  function showNotification(message, type = 'info') {
    try {
      if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
        return;
      }
    } catch (_) {}

    // Fallback
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 14px 20px;
      border-radius: 12px;
      background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#456C4B'};
      color: white;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      max-width: 320px;
      line-height: 1.25;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.3s';
      setTimeout(() => notification.remove(), 300);
    }, 3200);
  }

  function safeTrim(v) {
    return String(v || '').trim();
  }

  async function getCurrentUser() {
    try {
      if (window.authService) {
        // Støtt både async og sync varianter
        if (typeof window.authService.getUser === 'function') {
          const u = window.authService.getUser();
          return u && typeof u.then === 'function' ? await u : u;
        }
        if (window.authService.currentUser) return window.authService.currentUser;
      }
    } catch (_) {}
    return null;
  }

  function getSubscriptionService() {
    return window.subscriptionService || null;
  }

  // -------------------------------
  // Stripe return handling
  // -------------------------------
  function handleStripeReturnParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success') === 'true';
    const canceled = urlParams.get('canceled') === 'true';

    if (!success && !canceled) return;

    // Fjern query params fra URL (behold hash) - gjør dette tidlig for å unngå "back/refresh loops"
    const cleanUrl =
      window.location.origin +
      window.location.pathname +
      (window.location.hash || '');
    window.history.replaceState({}, document.title, cleanUrl);

    if (success) {
      // SECURITY: Ikke åpne app direkte. Verifiser tilgang via auth + subscription-status.
      showNotification('Betaling fullført! Verifiserer tilgang…', 'success');

      // Gi auth/subscription en liten "breathing room" (Stripe return + ITP + auth refresh)
      setTimeout(async () => {
        try {
          // Sørg for at AuthService er initialisert (init er idempotent)
          if (window.authService && typeof window.authService.init === 'function') {
            await window.authService.init();
          }

          const user = window.authService?.getUser?.();
          if (user && typeof window.authService?.handleSignIn === 'function') {
            await window.authService.handleSignIn(user);
            return;
          }

          // Hvis vi mangler bruker, gå til login (ikke åpne app)
          window.authService?.showLoginScreen?.();
        } catch (err) {
          console.error('âŒ Post-checkout verify failed:', err);
          try { window.authService?.showPricingPage?.(); } catch (_) {}
        }
      }, 250);

      return;
    }

    // canceled
    showNotification('Betaling avbrutt. Du kan prøve igjen når som helst.', 'info');
  }

  // -------------------------------
  // Pricing / plan selection
  // -------------------------------
  async function handlePlanSelection(planType, priceId) {
    try {
      log('ðŸ” Handling plan selection:', planType);

      const user = await getCurrentUser();
      if (!user) {
        log('âŒ No user found');
        showNotification('Du må være logget inn først', 'error');
        try {
          window.authService?.showLoginScreen?.();
        } catch (_) {}
        return;
      }

      log('✅ User found:', user.email);

      const svc = getSubscriptionService();
      if (!svc) {
        showNotification('Abonnementstjeneste er ikke lastet. Oppdater siden.', 'error');
        return;
      }

      // Finn checkSubscription (robust på navnevariasjoner)
      const checkFn =
        (typeof svc.checkSubscription === 'function' && svc.checkSubscription) ||
        (typeof svc.checkSubscriptionStatus === 'function' && svc.checkSubscriptionStatus) ||
        (typeof svc.getSubscription === 'function' && svc.getSubscription) ||
        null;

      let subscription = null;
      if (checkFn) {
        subscription = await checkFn.call(svc);
      }

      log('📊 Subscription status:', subscription);

      const trialEnabled = !!(window.CONFIG && window.CONFIG.trial && window.CONFIG.trial.enabled);
      const canStartTrial = !!(subscription && subscription.canStartTrial);

      // Lifetime plans skip trial entirely — go straight to checkout
      if (trialEnabled && canStartTrial && planType !== 'lifetime' && typeof svc.startTrial === 'function') {
        log('ðŸŽ Starting trial...');
        const result = await svc.startTrial(user.id, planType);

        if (result && result.success) {
          const days = window.CONFIG?.trial?.days || 7;
          showNotification(`Gratulerer! Din ${days}-dagers prøveperiode har startet! 🎉`, 'success');
          setTimeout(async () => {
            try {
              if (window.authService && typeof window.authService.handleSignIn === 'function') {
                await window.authService.handleSignIn(user);
              } else {
                window.location.reload();
              }
            } catch (_) {
              window.location.reload();
            }
          }, 1200);
          return;
        }

        showNotification('Noe gikk galt. Prøv igjen.', 'error');
        return;
      }

      // Ellers: gå til betaling
      await startCheckout(planType, priceId, user);
    } catch (error) {
      console.error('âŒ Error handling plan selection:', error);
      showNotification('En feil oppstod. Prøv igjen senere.', 'error');
    }
  }

  async function startCheckout(planType, priceId, user) {
    try {
      log('ðŸ’³ Starting checkout for:', planType, priceId);
      showNotification('Videresender til betaling...', 'info');

      // ✅ Foretrukket: server-side Checkout Session (sikrer riktig kunde/metadata, og unngår
      // klient-cache/Stripe.js edge-cases).
      const token = await getAccessTokenWithRetry();
      if (!token) {
        console.error('âŒ Failed to get access token after retries');
        throw new Error('Invalid session - kunne ikke hente tilgangstoken');
      }

      log('✅ Got access token, calling API...');

      // AbortController for fetch timeout (10s)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const r = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ plan: planType }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        log(`📡 API response status: ${r.status}`);

        const data = await safeJson(r);
        
        if (!r.ok) {
          console.error('âŒ API returned error:', {
            status: r.status,
            statusText: r.statusText,
            error: data?.error,
            data: data
          });
          const msg = data?.error || `Checkout-feil (${r.status})`;
          throw new Error(data && data.error_id ? `${msg} (Feilkode: ${data.error_id})` : msg);
        }

        log('✅ API response OK:', data);

        if (!data?.url) {
          console.error('âŒ API response missing url:', data);
          throw new Error('Mangler checkout-url fra server');
        }

        log('✅ Redirecting to:', data.url);
        window.location.assign(data.url);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        if (fetchError.name === 'AbortError') {
          throw new Error('Forespørselen tok for lang tid (timeout)');
        }
        throw fetchError;
      }
    } catch (error) {
      console.error('âŒ Checkout error:', {
        message: error.message,
        stack: error.stack,
        planType: planType,
        userPresent: !!user
      });
      showNotification(`Kunne ikke starte betalingsprosessen: ${error.message}`, 'error');
    }
  }

  async function safeJson(resp) {
    try {
      return await resp.json();
    } catch (_) {
      return null;
    }
  }

  async function getAccessTokenWithRetry(retries = 5) {
    console.log('ðŸ’³ Getting access token for checkout...');
    
    for (let i = 0; i < retries; i++) {
      try {
        // Først: prøv getSession med 3s timeout
        const s = await withTimeout(
          window.supabase?.auth?.getSession?.(),
          3000,
          'getSession timeout'
        );
        let token = s?.data?.session?.access_token;

        if (token) {
          console.log(`✅ Got token from getSession (attempt ${i+1}/${retries})`);
          return token;
        }

        console.log(`⚠️ No token from getSession (attempt ${i+1}/${retries}), trying refresh...`);

        // Hvis ingen token: prøv refresh med 3s timeout
        if (typeof window.supabase?.auth?.refreshSession === 'function') {
          try {
            await withTimeout(
              window.supabase.auth.refreshSession(),
              3000,
              'refreshSession timeout'
            );
            console.log('🔄 Refreshed session');
          } catch (refreshErr) {
            console.warn('⚠️ Refresh failed:', refreshErr.message);
          }
          
          // Prøv getSession igjen etter refresh (med timeout)
          const s2 = await withTimeout(
            window.supabase?.auth?.getSession?.(),
            3000,
            'getSession timeout (retry)'
          );
          token = s2?.data?.session?.access_token;
          
          if (token) {
            console.log(`✅ Got token after refresh (attempt ${i+1}/${retries})`);
            return token;
          }
        }
      } catch (e) {
        console.warn(`âŒ Token attempt ${i+1}/${retries} failed:`, e.message);
      }

      // Økende backoff: 250ms, 500ms, 750ms, 1000ms, 1250ms
      const delay = 250 + (i * 250);
      console.log(`⏳ Waiting ${delay}ms before retry...`);
      await new Promise((r) => setTimeout(r, delay));
    }
    
    console.error(`âŒ Failed to get token after ${retries} attempts`);
    return null;
  }

  function bindPlanButtons() {
    const selectButtons = document.querySelectorAll('.btn-select');
    log(`Found ${selectButtons.length} select buttons`);

    // Global in-flight guard for checkout process
    let checkoutInProgress = false;

    selectButtons.forEach((btn) => {
      if (btn.__bf_bound_plan) return;
      btn.__bf_bound_plan = true;

      // Store original text for restoration
      const originalText = btn.textContent;

      btn.addEventListener(
        'click',
        async (e) => {
          e.preventDefault();
          e.stopPropagation();

          // Guard against double-clicks
          if (checkoutInProgress) {
            log('⚠️ Checkout already in progress, ignoring click');
            return;
          }

          checkoutInProgress = true;

          // Disable all plan buttons
          selectButtons.forEach(b => {
            b.disabled = true;
            b.style.opacity = '0.6';
            b.style.cursor = 'not-allowed';
          });

          const planType = btn.getAttribute('data-plan');
          const priceId = btn.getAttribute('data-price-id');

          log(`Button clicked: ${planType}, priceId: ${priceId}`);

          try {
            await handlePlanSelection(planType, priceId);
          } finally {
            // Re-enable all buttons (in case of error or if user navigates back)
            checkoutInProgress = false;
            selectButtons.forEach(b => {
              b.disabled = false;
              b.style.opacity = '1';
              b.style.cursor = 'pointer';
            });
          }
        },
        { passive: false }
      );
    });
  }

  // -------------------------------
  // Magic link (OTP) login - robust cooldown
  // -------------------------------
  const COOLDOWN_SECONDS_DEFAULT = 60; // Supabase ga deg "after 49 seconds" -> vi bruker 60 for å være safe

  function cooldownKeyForEmail(email) {
    const safe = encodeURIComponent(String(email || '').toLowerCase().trim());
    return `bf_magic_cooldown_until__${safe}`;
  }

  function getCooldownUntil(email) {
    try {
      const key = cooldownKeyForEmail(email);
      const v = localStorage.getItem(key);
      const n = v ? parseInt(v, 10) : 0;
      return Number.isFinite(n) ? n : 0;
    } catch (_) {
      return 0;
    }
  }

  function setCooldown(email, seconds) {
    try {
      const key = cooldownKeyForEmail(email);
      const until = Date.now() + Math.max(5, seconds) * 1000;
      localStorage.setItem(key, String(until));
      return until;
    } catch (_) {
      return Date.now() + Math.max(5, seconds) * 1000;
    }
  }

  function parseWaitSecondsFromErrorMessage(msg) {
    // Eksempel fra Supabase: "you can only request this after 49 seconds."
    const m = String(msg || '').match(/after\s+(\d+)\s+seconds?/i);
    if (m && m[1]) {
      const s = parseInt(m[1], 10);
      if (Number.isFinite(s) && s > 0) return s;
    }
    return null;
  }

  // bindMagicLink() removed — dead code (started with return;). Magic link handled by auth.js.


  // -------------------------------
  // Back button
  // -------------------------------
  function bindBackButton() {
    const btn = document.getElementById('closePricingBtn');
    if (!btn) {
      log('ℹ️ closePricingBtn ikke funnet på denne siden');
      return;
    }

    if (btn.__bf_bound_back) {
      log('ℹ️ closePricingBtn allerede bundet');
      return;
    }
    btn.__bf_bound_back = true;

    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      // CRITICAL: Stop other handlers from running (auth.js used to have a duplicate handler)
      if (e.stopImmediatePropagation) {
        e.stopImmediatePropagation();
      }

      log('🔙 Back button klikket');

      try {
        const user = await getCurrentUser();
        
        if (!user) {
          // Ikke innlogget: gå til login
          log('ℹ️ Ingen bruker - går til login');
          if (window.authService && typeof window.authService.showLoginScreen === 'function') {
            window.authService.showLoginScreen();
          }
          return;
        }

        // Innlogget: sjekk subscription
        const svc = getSubscriptionService();
        if (!svc || typeof svc.checkSubscription !== 'function') {
          log('⚠️ Subscription service mangler - logger ut og går til login');
          // Sign out så bruker kan prøve med annen konto
          try {
            if (window.authService?.supabase?.auth?.signOut) {
              await window.authService.supabase.auth.signOut();
            }
          } catch (signOutErr) {
            console.warn('⚠️ Sign out failed:', signOutErr);
          }
          if (window.authService && typeof window.authService.showLoginScreen === 'function') {
            window.authService.showLoginScreen();
          }
          return;
        }

        const status = await svc.checkSubscription();
        const hasAccess = !!(status && (status.active || status.trial || status.lifetime));

        if (hasAccess) {
          log('✅ Bruker har tilgang - går til hovedapp');
          if (window.authService && typeof window.authService.showMainApp === 'function') {
            window.authService.showMainApp();
          }
        } else {
          // VIKTIG: "Tilbake" betyr bruker vil escape - ikke holde dem fanget
          // Sign out slik at de kan logge inn med en annen konto
          log('ℹ️ Bruker mangler tilgang - logger ut for å tillate kontobytte');
          try {
            if (window.authService?.supabase?.auth?.signOut) {
              await window.authService.supabase.auth.signOut();
              log('✅ Signed out successfully');
            }
          } catch (signOutErr) {
            console.warn('⚠️ Sign out failed:', signOutErr);
          }
          if (window.authService && typeof window.authService.showLoginScreen === 'function') {
            window.authService.showLoginScreen();
          }
        }
      } catch (err) {
        console.error('âŒ Back button error:', err);
        // Fallback: gå til login
        if (window.authService && typeof window.authService.showLoginScreen === 'function') {
          window.authService.showLoginScreen();
        }
      }
    });

    log('✅ Back button bundet (#closePricingBtn)');
  }

  

// -------------------------------
// Contact modals (Team/Club license)
// - Referenced via inline onclick="" in index.html / pricing.html
// - Visibility via .modal-visible (pricing.css) so inline style display:none is OK
// - No PII logging (privacy-safe)
// -------------------------------
let __bf_contactModalsBound = false;

function getSupportEmail() {
  try {
    const e = window.CONFIG?.app?.supportEmail;
    return (typeof e === 'string' && e.includes('@')) ? e : 'support@barnehandballtrener.no';
  } catch (_) {
    return 'support@barnehandballtrener.no';
  }
}

function isElVisible(el) {
  return !!el && el.classList && el.classList.contains('modal-visible');
}

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('modal-visible');
  document.body.classList.add('modal-open');
  // focus first input for accessibility/usability
  const first = modalEl.querySelector('input, textarea, button');
  if (first) {
    setTimeout(() => { try { first.focus(); } catch (_) {} }, 0);
  }
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('modal-visible');
  // If no other visible modals, unlock body scroll
  const anyOpen = document.querySelector('.modal.modal-visible');
  if (!anyOpen) document.body.classList.remove('modal-open');
}

function buildMailto(formEl, kind) {
  const supportEmail = getSupportEmail();
  const fd = new FormData(formEl);
  const name = (fd.get('name') || '').toString().trim();
  const email = (fd.get('email') || '').toString().trim();
  const phone = (fd.get('phone') || '').toString().trim();
  const qty = (fd.get('quantity') || '').toString().trim();
  const message = (fd.get('message') || '').toString().trim();

  const subject = kind === 'club'
    ? '[Barnehandballtrener] Klubb-lisens forespørsel'
    : '[Barnehandballtrener] Team-lisens forespørsel';

  const bodyLines = [
    subject,
    '',
    `Navn: ${name}`,
    `E-post: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    qty ? `Antall trenere: ${qty}` : null,
    '',
    message ? `Melding:\n${message}` : 'Melding: (ingen)',
    '',
    '---',
    'Sendt fra Barnehandballtrener (kontaktmodal)'
  ].filter(Boolean);

  const body = bodyLines.join('\n');
  const mailto = `mailto:${encodeURIComponent(supportEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { supportEmail, subject, body, mailto };
}

function bindContactModal(modalId, formId, kind) {
  const modalEl = document.getElementById(modalId);
  const formEl = document.getElementById(formId);
  if (!modalEl || !formEl) return;

  // Click outside modal-content closes
  modalEl.addEventListener('mousedown', (e) => {
    if (e.target === modalEl) closeModal(modalEl);
  });

  // Prevent accidental form reload + provide a real action (email draft)
  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { supportEmail, subject, body, mailto } = buildMailto(formEl, kind);

    // Best effort: copy to clipboard (helps on locked-down devices)
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${subject}\n\n${body}`);
        copied = true;
      }
    } catch (_) {}

    // Best effort: open mail client
    try { window.location.href = mailto; } catch (_) {}

    alert(
      `Takk! Vi åpner et e-postutkast til ${supportEmail}.\n` +
      (copied ? 'Innholdet er også kopiert til utklippstavlen.' : 'Hvis e-post ikke åpner, kopier innholdet manuelt og send til support.')
    );

    // Optional: close after submit
    closeModal(modalEl);
    try { formEl.reset(); } catch (_) {}
  });
}

function setupContactModals() {
  if (__bf_contactModalsBound) return;
  __bf_contactModalsBound = true;

  const teamModalId = 'teamContactModal';
  const clubModalId = 'clubContactModal';

  // Expose globals for inline onclick handlers
  window.showTeamContactForm = () => openModal(document.getElementById(teamModalId));
  window.closeTeamContactForm = () => closeModal(document.getElementById(teamModalId));

  window.showClubContactForm = () => openModal(document.getElementById(clubModalId));
  window.closeClubContactForm = () => closeModal(document.getElementById(clubModalId));

  bindContactModal(teamModalId, 'teamContactForm', 'team');
  bindContactModal(clubModalId, 'clubContactForm', 'club');

  // ESC handler (capture) – only acts if a contact modal is visible
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;

    const teamEl = document.getElementById(teamModalId);
    const clubEl = document.getElementById(clubModalId);

    if (isElVisible(teamEl)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      closeModal(teamEl);
      return;
    }
    if (isElVisible(clubEl)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      closeModal(clubEl);
    }
  }, true);
}




// -------------------------------
// Pricing support/FAQ + Kontakt oss (low risk UI-only)
// - Injects a small info box on the pricing page to reduce support
// - Does NOT touch auth/stripe logic
// -------------------------------
function ensurePricingSupportAndContact() {
  const page = document.getElementById('pricingPage');
  if (!page) return;

  const container = page.querySelector('.pricing-container') || page;
  if (!container) return;

  function insertAfterPricingCards(el) {
    const cards = container.querySelector('.pricing-cards');
    if (cards && cards.parentNode) {
      cards.insertAdjacentElement('afterend', el);
    } else {
      container.appendChild(el);
    }
  }

  // FAQ / Support
  if (!container.querySelector('#pricingSupportBox')) {
    const box = document.createElement('div');
    box.id = 'pricingSupportBox';
    box.style.marginTop = '14px';
    box.style.padding = '12px';
    box.style.borderRadius = '12px';
    box.style.border = '1px solid rgba(255,255,255,0.12)';
    box.style.background = 'rgba(0,0,0,0.25)';

    box.innerHTML = `
      <div style="font-weight:700; margin-bottom:8px;">Info</div>
      <ul style="margin:0; padding-left:18px; line-height:1.35;">
        <li><strong>Gratis prøveperiode:</strong> 7 dager – du kan velge abonnement etterpå.</li>
        <li><strong>Kansellering:</strong> Du kan kansellere når som helst i <em>Innstillinger</em> (tannhjul). Du har fortsatt tilgang ut perioden du allerede har betalt for.</li>
        <li><strong>Innlogging:</strong> Bruk samme Google-konto på alle enheter.</li>
        <li><strong>Bytter du konto på samme mobil/PC?</strong> Logg ut først.</li>
        <li><strong>Hvis noe "henger":</strong> Oppdater siden, eller prøv privat fane.</li>
        <li><strong>Spørsmål:</strong> Bruk kontaktinformasjonen under.</li>
      </ul>
    `;
    insertAfterPricingCards(box);
  }

  // Kontakt oss
  if (!container.querySelector('#pricingContactBox')) {
    const supportEmail = getSupportEmail();

    const box = document.createElement('div');
    box.id = 'pricingContactBox';
    box.style.marginTop = '12px';
    box.style.padding = '12px';
    box.style.borderRadius = '12px';
    box.style.border = '1px solid rgba(255,255,255,0.12)';
    box.style.background = 'rgba(0,0,0,0.18)';

    const subject = encodeURIComponent('Hjelp – Barnehandballtrener');
    const body = encodeURIComponent(
      'Hei!\n\nJeg trenger hjelp med Barnehandballtrener.\n\n' +
      'E-post (Google): \n' +
      'Hva jeg prøvde å gjøre: \n' +
      'Enhet/nettleser: \n' +
      'Skjermbilde (hvis mulig): \n\n' +
      'Takk!'
    );

    box.innerHTML = `
      <div style="font-weight:700; margin-bottom:8px;">Kontakt oss</div>
      <div style="opacity:.92; line-height:1.35;">
        Får du ikke brukt appen som forventet? Send oss en melding, så hjelper vi deg raskt.
      </div>
      <div style="margin-top:10px;">
        <div style="font-weight:700; margin-bottom:6px;">Husk å ta med:</div>
        <ul style="margin:0; padding-left:18px; line-height:1.35;">
          <li>E-posten du logger inn med (Google)</li>
          <li>Hva du prøvde å gjøre (f.eks. «kom ikke inn», «betaling», «kansellering»)</li>
          <li>Hvilken enhet/nettleser du bruker (iPhone/Android/PC + Chrome/Edge/Safari)</li>
          <li>Gjerne et skjermbilde av feilen / det du ser</li>
        </ul>
      </div>
      <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
        <button id="pricingCopySupportEmailBtn" type="button" class="btn-secondary" style="flex:1; min-width:160px;">
          Kopiér support-epost
        </button>
        <a class="btn-primary" style="flex:1; min-width:160px; text-align:center; text-decoration:none;"
           href="mailto:${supportEmail}?subject=${subject}&body=${body}">
          Send e-post
        </a>
      </div>
      <div style="margin-top:8px; opacity:.85;">${supportEmail}</div>
    `;

    insertAfterPricingCards(box);

    const copyBtn = box.querySelector('#pricingCopySupportEmailBtn');
    if (copyBtn && !copyBtn.__bf_bound_copy_email) {
      copyBtn.__bf_bound_copy_email = true;

      copyBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();

        try {
          if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            await navigator.clipboard.writeText(supportEmail);
            showNotification('Support-epost kopiert ✅', 'success');
            return;
          }
        } catch (_) {}

        try {
          prompt('Kopiér support-epost:', supportEmail);
        } catch (_) {}
      }, { capture: true });
    }
  }
}

// -------------------------------
  // Boot
  // -------------------------------
function boot() {
  log('ðŸ’³ Pricing.js loaded');
  bindPlanButtons();
  bindBackButton();
  setupContactModals();
  ensurePricingSupportAndContact();
  // bindMagicLink(); // Magic link håndteres av auth.js
  handleStripeReturnParams();
}


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
