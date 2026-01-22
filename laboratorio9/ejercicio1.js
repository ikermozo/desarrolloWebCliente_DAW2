document.addEventListener('DOMContentLoaded', () => {

    //FASE 1: Eventos Básicos
    
    //  Tarea 1.1: Capturar el botón
    const btnMulti = document.getElementById('btn-multi');

    const manejadorEvento1 = () => {
        console.log("Fase 1 (Evento 1): Se ha registrado el primer clic.");
    };

    const manejadorEvento2 = () => {
        console.log("Fase 1 (Evento 2): Se ha registrado el segundo clic.");
        alert("¡Has hecho clic! (Se han ejecutado dos funciones distintas)");
    };

    // Tarea 1.2: Usar addEventListener para registrar múltiples funciones
    if (btnMulti) {
        btnMulti.addEventListener('click', manejadorEvento1);
        btnMulti.addEventListener('click', manejadorEvento2);
    } else {
        console.error("Error: No se encontró el elemento con ID 'btn-multi'");
    }

//FASE 2: Eventos de Teclado 

    // 2. Captura de información básica
    const bodyElement = document.getElementById('main-body');
    const infoPantalla = document.getElementById('info-pantalla'); 

    if (bodyElement) {
        bodyElement.addEventListener('keydown', (e) =>{
            //Mostrar en consola el tipo de evento y la tecla
            console.log(`Tipo de evento: ${e.type} | Tecla: ${e.key}`);

            if (infoPantalla) {
                infoPantalla.innerText = `Última tecla: ${e.key} (Código: ${e.code})`;
            }
        });
    }

// 3. Restricción de caracteres con preventDefault()
    const textArea = document.getElementById('campo-texto');

    if (textArea) {
        textArea.addEventListener('keydown', (e) => {
            // Verificamos si la tecla es un número del 0 al 9
            if (e.key >= '0' && e.key <= '9') {
                
                // Evitar la acción por defecto (que se escriba el número)
                e.preventDefault();

                //Alerta de error
                alert("Error: No se permiten números en este campo.");
                
                console.warn(`Intento de escribir número bloqueado: ${e.key}`);
            }
        });
    }
});