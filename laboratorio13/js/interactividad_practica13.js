/* =====================================================
   PRÁCTICA 13 · interactividad_practica13.js
   ===================================================== */

(function P13() {
  'use strict';

  /* ── Espera a que Chart.js y Anime.js estén listos ── */
  function waitForLibs(callback) {
    if (typeof Chart !== 'undefined' && typeof anime !== 'undefined') {
      callback();
    } else {
      setTimeout(() => waitForLibs(callback), 50);
    }
  }

  waitForLibs(init);

  function init() {
    initCanvas();
    initCharts();
    initAnimations();
  }

  /* ══════════════════════════════════════════════════════
     BLOQUE A · Chart.js
     ══════════════════════════════════════════════════════ */
  function initCharts() {
    const chartCanvas = document.getElementById('p13-chart');
    if (!chartCanvas) return;

    /* ── Paleta extraída de las variables CSS del proyecto ── */
    const C = {
      accent: '#3fb950',
      accentDim: 'rgba(63, 185, 80, 0.15)',
      accentLine: 'rgba(63, 185, 80, 0.35)',
      blue: '#58a6ff',
      blueDim: 'rgba(88, 166, 255, 0.65)',
      yellow: '#f8c449',
      yellowDim: 'rgba(248, 196, 73, 0.65)',
      surface: '#161b22',
      surface2: '#1c2330',
      border: '#30363d',
      text: '#e6edf3',
      muted: '#8b949e',
      fontMono: "'Space Mono', monospace",
      fontDisplay: "'Syne', sans-serif",
    };

    /* ── Datos gráfico de barras (lenguajes) ── */
    const barData = {
      labels: ['HTML', 'JavaScript', 'Python'],
      datasets: [{
        label: 'Inscritos por lenguaje',
        data: [45, 89, 67],
        backgroundColor: [C.blueDim, C.accentDim.replace('0.15', '0.65'), C.yellowDim],
        borderColor: [C.blue, C.accent, C.yellow],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }],
    };

    /* ── Datos gráfico de líneas (inscripciones mensuales) ── */
    const lineData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{
        label: 'Nuevas inscripciones',
        data: [12, 28, 45, 38, 62, 87],
        borderColor: C.accent,
        backgroundColor: C.accentDim,
        pointBackgroundColor: C.accent,
        pointBorderColor: C.surface,
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.42,
        fill: true,
      }],
    };

    /* ── Opciones comunes ── */
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 650,
        easing: 'easeInOutQuart',
      },
      plugins: {
        legend: {
          labels: {
            color: C.muted,
            font: { family: C.fontMono, size: 11 },
            boxWidth: 12,
            padding: 16,
          },
        },
        tooltip: {
          backgroundColor: C.surface2,
          borderColor: C.border,
          borderWidth: 1,
          titleColor: C.text,
          bodyColor: C.muted,
          titleFont: { family: C.fontDisplay, weight: '700', size: 13 },
          bodyFont: { family: C.fontMono, size: 12 },
          padding: 12,
          cornerRadius: 8,
          caretSize: 6,
        },
        title: {
          display: true,
          color: C.text,
          font: { family: C.fontDisplay, weight: '800', size: 14 },
          padding: { bottom: 20 },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(48, 54, 61, 0.55)', drawBorder: false },
          ticks: { color: C.muted, font: { family: C.fontMono, size: 11 } },
          border: { color: C.border },
        },
        y: {
          grid: { color: 'rgba(48, 54, 61, 0.55)', drawBorder: false },
          ticks: { color: C.muted, font: { family: C.fontMono, size: 11 } },
          border: { color: C.border },
          beginAtZero: true,
        },
      },
    };

    /* ── Construye un chart con título dinámico ── */
    function buildChart(type, data, titleText) {
      return new Chart(chartCanvas, {
        type,
        data,
        options: {
          ...baseOptions,
          plugins: {
            ...baseOptions.plugins,
            title: { ...baseOptions.plugins.title, text: titleText },
          },
        },
      });
    }

    let currentMode = 'bar';
    let chart = buildChart('bar', barData, 'Lenguajes más populares entre inscritos');

    /* ── Botón toggle ── */
    const toggleBtn = document.getElementById('p13-toggle-chart');
    const btnLabel = toggleBtn.querySelector('.p13-btn-label');
    const modeText = document.getElementById('p13-mode-text');
    const modeDot = document.querySelector('.p13-mode-dot');

    toggleBtn.addEventListener('click', () => {
      currentMode = currentMode === 'bar' ? 'line' : 'bar';

      chart.destroy();

      if (currentMode === 'line') {
        chart = buildChart('line', lineData, 'Nuevas inscripciones por mes (2025)');
        btnLabel.textContent = 'Ver lenguajes populares';
        modeText.textContent = 'Inscripciones mensuales';
        modeDot.style.background = C.accent;
      } else {
        chart = buildChart('bar', barData, 'Lenguajes más populares entre inscritos');
        btnLabel.textContent = 'Ver inscripciones mensuales';
        modeText.textContent = 'Lenguajes populares';
        modeDot.style.background = C.blue;
      }

      /* Micro-interacción Anime.js en el propio botón al hacer click */
      anime({
        targets: toggleBtn,
        scale: [0.94, 1],
        duration: 350,
        easing: 'easeOutElastic(1, 0.55)',
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     BLOQUE B · Anime.js — Animaciones de interfaz
     ══════════════════════════════════════════════════════ */
  function initAnimations() {

    /* ── B.1 Stagger de entrada · Tarjetas de stats ── */
    anime({
      targets: '.p13-card',
      opacity: [0, 1],
      translateY: [28, 0],
      scale: [0.93, 1],
      delay: anime.stagger(90, { start: 300 }),
      duration: 550,
      easing: 'easeOutCubic',
    });

    /* ── B.2 Stagger de entrada · Chart wrapper ── */
    anime({
      targets: '.p13-chart-wrapper',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: 600,
      duration: 500,
      easing: 'easeOutCubic',
    });

    /* ── B.3 Stagger de entrada · Form groups (escalonado tras fadeUp del form) ── */
    anime({
      targets: '.form-group',
      opacity: [0, 1],
      translateX: [-12, 0],
      delay: anime.stagger(70, { start: 750 }),
      duration: 400,
      easing: 'easeOutQuad',
    });

    /* ── B.4 Micro-interacción · Botón submit principal ── */
    const submitBtn = document.querySelector('.btn-submit');
    if (submitBtn) {
      submitBtn.addEventListener('mouseenter', () =>
        anime({ targets: submitBtn, scale: 1.045, duration: 200, easing: 'easeOutQuad' })
      );
      submitBtn.addEventListener('mouseleave', () =>
        anime({ targets: submitBtn, scale: 1, duration: 200, easing: 'easeOutQuad' })
      );
      submitBtn.addEventListener('mousedown', () =>
        anime({ targets: submitBtn, scale: 0.96, duration: 90, easing: 'easeOutQuad' })
      );
      submitBtn.addEventListener('mouseup', () =>
        anime({ targets: submitBtn, scale: 1.045, duration: 150, easing: 'easeOutQuad' })
      );
    }

    /* ── B.5 Micro-interacción · Tarjetas de stats (hover) ── */
    document.querySelectorAll('.p13-card').forEach(card => {
      card.addEventListener('mouseenter', () =>
        anime({
          targets: card,
          translateY: -5,
          duration: 220,
          easing: 'easeOutQuad',
        })
      );
      card.addEventListener('mouseleave', () =>
        anime({
          targets: card,
          translateY: 0,
          duration: 220,
          easing: 'easeOutQuad',
        })
      );
      card.addEventListener('mousedown', () =>
        anime({ targets: card, scale: 0.97, duration: 90, easing: 'easeOutQuad' })
      );
      card.addEventListener('mouseup', () =>
        anime({ targets: card, scale: 1, duration: 150, easing: 'easeOutQuad' })
      );
    });

    /* ── B.6 Micro-interacción · Botón toggle gráfico ── */
    const toggleBtn = document.getElementById('p13-toggle-chart');
    if (toggleBtn) {
      toggleBtn.addEventListener('mouseenter', () =>
        anime({ targets: toggleBtn, translateX: 2, duration: 180, easing: 'easeOutQuad' })
      );
      toggleBtn.addEventListener('mouseleave', () =>
        anime({ targets: toggleBtn, translateX: 0, duration: 180, easing: 'easeOutQuad' })
      );
    }
  }

  /* ══════════════════════════════════════════════════════
     BLOQUE C · Canvas — Red de partículas interactiva
     requestAnimationFrame + reacción al cursor
     ══════════════════════════════════════════════════════ */
  function initCanvas() {
    const canvas = document.getElementById('p13-bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    /* ── Configuración ── */
    const CONFIG = {
      particleCount: 55,
      maxDistance: 125,
      mouseRadius: 130,
      repelStrength: 0.32,
      friction: 0.975,
      colorA: '63, 185, 80',   // --accent verde
      colorB: '88, 166, 255',  // --border-focus azul
    };

    let mouse = { x: null, y: null };

    /* ── Redimensiona el canvas al tamaño de la ventana ── */
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    /* ── Seguimiento del ratón ── */
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    /* ── Clase Partícula ── */
    class Particle {
      constructor() { this.spawn(); }

      spawn() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.55;
        this.vy = (Math.random() - 0.5) * 0.55;
        this.radius = Math.random() * 1.8 + 0.8;
        this.alpha = Math.random() * 0.35 + 0.15;
        this.color = Math.random() < 0.4 ? CONFIG.colorA : CONFIG.colorB;
      }

      update() {
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONFIG.mouseRadius && dist > 0) {
            const force = ((CONFIG.mouseRadius - dist) / CONFIG.mouseRadius) * CONFIG.repelStrength;
            this.vx += (dx / dist) * force;
            this.vy += (dy / dist) * force;
          }
        }

        /* Fricción para suavizar */
        this.vx *= CONFIG.friction;
        this.vy *= CONFIG.friction;

        this.x += this.vx;
        this.y += this.vy;

        /* Wrap por los bordes */
        if (this.x < -12) this.x = canvas.width + 12;
        if (this.x > canvas.width + 12) this.x = -12;
        if (this.y < -12) this.y = canvas.height + 12;
        if (this.y > canvas.height + 12) this.y = -12;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
      }
    }

    /* ── Inicializa partículas ── */
    const particles = Array.from({ length: CONFIG.particleCount }, () => new Particle());

    /* ── Dibuja líneas entre partículas cercanas ── */
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONFIG.maxDistance) {
            const alpha = (1 - dist / CONFIG.maxDistance) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${CONFIG.colorA}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    /* ── Dibuja líneas desde el cursor hasta partículas cercanas ── */
    function drawMouseConnections() {
      if (mouse.x === null) return;
      particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseRadius) {
          const alpha = (1 - dist / CONFIG.mouseRadius) * 0.45;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${CONFIG.colorA}, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      });
    }

    /* ── Bucle de animación principal ── */
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawConnections();
      drawMouseConnections();

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

})(); // fin IIFE P13
