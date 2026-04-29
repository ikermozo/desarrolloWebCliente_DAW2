const form       = document.getElementById('registro-form');
const pwInput    = document.getElementById('password');
const motivacion = document.getElementById('motivacion');
const contador   = document.getElementById('contador');
const errorBox   = document.getElementById('error-msg');
const errorText  = document.getElementById('error-text');
const togglePw   = document.querySelector('.toggle-pw');

const MAX_CHARS = 300;

motivacion.addEventListener('input', () => {
    const restantes = MAX_CHARS - motivacion.value.length;
    contador.textContent = restantes + ' caracteres restantes';
    contador.style.color = restantes < 20 ? 'var(--danger)' : '';
});

togglePw.addEventListener('click', () => {
    const visible = pwInput.type === 'password';
    pwInput.type = visible ? 'text' : 'password';
    togglePw.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
    togglePw.querySelector('.icon-eye').style.opacity = visible ? '0.5' : '1';
});

function mostrarError(msg) {
    errorText.textContent = msg;
    errorBox.hidden = false;
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function ocultarError() {
    errorBox.hidden = true;
    errorText.textContent = '';
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    ocultarError();

    const nombre   = document.getElementById('nombre').value.trim();
    const email    = document.getElementById('email').value.trim();
    const pwd      = pwInput.value;
    const lenguaje = document.getElementById('lenguaje').value;

    // Nombre: primera letra mayúscula, solo letras y espacios
    if (!/^[A-ZÁÉÍÓÚÑÜ][a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s]+$/.test(nombre)) {
        mostrarError('El nombre debe empezar por mayúscula y contener solo letras.');
        document.getElementById('nombre').focus();
        return;
    }

    // Email: regex propia más estricta que la del navegador
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        mostrarError('El correo no tiene un formato válido. Ejemplo: ada@ejemplo.com');
        document.getElementById('email').focus();
        return;
    }

    // Contraseña: longitud, mayúscula, minúscula y número
    if (pwd.length < 8) {
        mostrarError('La contraseña debe tener mínimo 8 caracteres.');
        pwInput.focus();
        return;
    }
    if (!/[A-Z]/.test(pwd)) {
        mostrarError('La contraseña debe incluir al menos una letra mayúscula.');
        pwInput.focus();
        return;
    }
    if (!/[a-z]/.test(pwd)) {
        mostrarError('La contraseña debe incluir al menos una letra minúscula.');
        pwInput.focus();
        return;
    }
    if (!/[0-9]/.test(pwd)) {
        mostrarError('La contraseña debe incluir al menos un número.');
        pwInput.focus();
        return;
    }

    const etiquetas = { html: 'HTML', js: 'JavaScript', python: 'Python', '': '(sin especificar)' };

    console.log('%c Formulario enviado ✓', 'color:#3fb950;font-weight:bold');
    console.log('Nombre:', nombre, '| Email:', email, '| Lenguaje:', etiquetas[lenguaje] ?? lenguaje);

    mostrarConfirmacion(nombre, etiquetas[lenguaje]);
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

    const s = document.createElement('style');
    s.textContent = `
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
    document.head.appendChild(s);
}
