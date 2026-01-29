// Ejercicio 1
const btnTest = document.getElementById('test-click');

btnTest.addEventListener('mousedown', (e) => console.log(e.type));
btnTest.addEventListener('mouseup', (e) => console.log(e.type));
btnTest.addEventListener('click', (e) => console.log(e.type));
btnTest.addEventListener('dblclick', (e) => console.log(e.type));

// Ejercicio 2 y 3
const padre = document.getElementById('padre');
const hijo = document.getElementById('hijo');
const botonBubbling = document.getElementById('boton-bubbling');

padre.addEventListener('click', () => {
    console.log("Click en el Padre");
});

hijo.addEventListener('click', () => {
    console.log("Click en el Hijo");
});

botonBubbling.addEventListener('click', (e) => {
    // Interrupción del flujo
    e.stopPropagation();
    console.log("Click en el Botón");
});