/* =====================================================
   PRÁCTICA 12 · script.js
   Lógica de validación e interceptación del formulario
   ===================================================== */

// ── Ref DOM ─────────────────────────────────
const form = document.getElementById('registro-form');
const pwInput = document.getElementById('password');
const motivacion = document.getElementById('motivacion');
const charCount = document.getElementById('char-count');
const errorBox = document.getElementById('error-msg');
const errorText = document.getElementById('error-text');
const togglePw = document.querySelector('.toggle-pw');

motivacion.addEventListener('input', () => {
  charCount.textContent = motivacion.value.length;
});

togglePw.addEventListener('click', () => {
  const isPassword = pwInput.type === 'password';
  pwInput.type = isPassword ? 'text' : 'password';
  togglePw.setAttribute('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
  togglePw.querySelector('.icon-eye').style.opacity = isPassword ? '0.5' : '1';
});

function mostrarError(mensaje) {
  errorText.textContent = mensaje;
  errorBox.hidden = false;
  errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function ocultarError() {
  errorBox.hidden = true;
  errorText.textContent = '';
}

form.addEventListener('submit', function (event) {
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = pwInput.value;
  const lenguaje = document.getElementById('lenguaje').value;

  ocultarError();

  if (password.length < 8) {
    event.preventDefault();
    mostrarError(
      `La contraseña tiene solo ${password.length} carácter${password.length === 1 ? '' : 'es'}. ` +
      'Se requieren al menos 8.'
    );
    pwInput.focus();
    return;
  }

  const lenguajeLabel = {
    html: 'HTML',
    js: 'JavaScript',
    python: 'Python',
    '': '(sin especificar)'
  };

  console.log('='.repeat(50));
  console.log('%c  FORMULARIO ENVIADO CORRECTAMENTE', 'color: #3fb950; font-weight: bold;');
  console.log('='.repeat(50));
  console.log(`  Nombre   : ${nombre}`);
  console.log(`  Email    : ${email}`);
  console.log(`  Lenguaje : ${lenguajeLabel[lenguaje] ?? lenguaje}`);
  console.log(`  Motivación (extracto): "${motivacion.value.substring(0, 60)}…"`);
  console.log('='.repeat(50));
  console.log(`¡Bienvenido/a, ${nombre}! Tu inscripción ha sido enviada.`);

  event.preventDefault();
  mostrarConfirmacion(nombre, lenguajeLabel[lenguaje]);
});

function mostrarConfirmacion(nombre, lenguaje) {
  const main = document.querySelector('main');
  main.innerHTML = `
    <div class="confirm-card">
      <div class="confirm-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <h2>¡Todo listo, ${nombre}!</h2>
      <p>Tu inscripción ha sido procesada. Pronto recibirás un correo de confirmación.</p>
      <p class="confirm-lang">Lenguaje elegido: <strong>${lenguaje || '—'}</strong></p>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .confirm-card {
      background: var(--surface);
      border: 1px solid var(--accent);
      border-radius: var(--radius);
      padding: 3rem 2rem;
      text-align: center;
      animation: fadeUp .4s ease both;
    }
    .confirm-icon {
      width: 64px; height: 64px;
      background: var(--accent-dim);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 1.5rem;
    }
    .confirm-icon svg { width: 32px; height: 32px; stroke: var(--accent); }
    .confirm-card h2 {
      font-family: var(--font-display);
      font-size: 1.6rem;
      font-weight: 800;
      margin-bottom: .75rem;
    }
    .confirm-card p { color: var(--text-muted); font-size: .88rem; line-height: 1.7; }
    .confirm-lang { margin-top: .75rem; }
    .confirm-lang strong { color: var(--accent); }
  `;
  document.head.appendChild(style);
}
