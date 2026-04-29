# Práctica 13 · Integración de contenidos interactivos

## Descripción

Extensión de la Práctica 12 (Formulario de Inscripción) con tres bloques de interactividad añadidos sin modificar la lógica original.

---

## Estructura de archivos

```
/
├── index.html                          ← HTML base (modificado con nueva sección y canvas)
├── style.css                           ← Estilos originales P12 (sin tocar)
├── script.js                           ← Lógica original P12 (sin tocar)
├── css/
│   └── interactividad_practica13.css   ← Estilos nuevos P13 (prefijo .p13-)
└── js/
    └── interactividad_practica13.js    ← Todo el código JS nuevo (IIFE encapsulado)
```

---

## Selectores HTML utilizados como ancla

| Selector original     | Uso en P13                                                                 |
|-----------------------|----------------------------------------------------------------------------|
| `header.site-header`  | La nueva sección `.p13-stats` se inserta inmediatamente después           |
| `.form-group`         | Target del stagger de Anime.js (animación de entrada escalonada)          |
| `.btn-submit`         | Target de micro-interacciones mouseenter / mouseleave / mousedown         |
| `body`                | Contiene el `<canvas id="p13-bg-canvas">` como fondo fijo de toda la web |

---

## Librerías externas (CDN)

| Librería      | Versión | URL CDN                                                                       | Uso                          |
|---------------|---------|-------------------------------------------------------------------------------|------------------------------|
| **Chart.js**  | 4.4.3   | `https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js`          | Bloque A — gráficos          |
| **Anime.js**  | 3.2.2   | `https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js`          | Bloque B — animaciones       |
| Canvas API    | nativa  | API nativa del navegador (no requiere CDN)                                    | Bloque C — partículas        |

---

## Detalle de cada bloque

### A · Visualización dinámica (Chart.js)
- Gráfico de **barras** con los lenguajes más populares (HTML / JS / Python).
- Botón **toggle** que destruye el chart actual y renderiza un gráfico de **líneas** con inscripciones mensuales.
- Colores, tipografía y tooltips adaptados a las variables CSS del proyecto (`--accent`, `--surface-2`, `--border`, etc.).
- Contenedor con `aspect-ratio: 16/7` para comportamiento responsive sin desbordamiento.

### B · Animación de interfaz (Anime.js)
- **Stagger de entrada** en las 4 tarjetas `.p13-card` (apareción escalonada con `anime.stagger(90ms)`).
- **Stagger de entrada** en los `.form-group` del formulario original.
- **Micro-interacciones** en `.btn-submit` (mouseenter, mouseleave, mousedown, mouseup).
- **Micro-interacciones** en las tarjetas de stats (translateY en hover + scale en click).
- **Micro-interacción** en el botón toggle al cambiar el gráfico (rebote elástico).

### C · Canvas de alto rendimiento
- `<canvas id="p13-bg-canvas">` fijo en `position: fixed` cubriendo todo el viewport, detrás del contenido (`z-index: 0`).
- 55 partículas con velocidad y opacidad aleatoria que se mueven en bucle con `requestAnimationFrame`.
- **Repulsión** del cursor: las partículas cercanas al ratón se alejan con fricción suave.
- **Líneas de conexión** entre partículas a menos de 125px (efecto red neuronal).
- **Líneas desde el cursor** hasta partículas en radio de 130px.
- Paleta: verde `#3fb950` (--accent) y azul `#58a6ff` (--border-focus).

### D · Arquitectura y encapsulamiento
- Todo el código JS está dentro de una **IIFE** `(function P13() { ... })()` — sin variables globales.
- CSS con **prefijo `.p13-`** en todos los selectores nuevos — sin colisiones con el CSS original.
- Librerías cargadas desde **CDN** con atributo `defer`.
- `waitForLibs()` garantiza que Chart.js y Anime.js estén disponibles antes de ejecutar.
