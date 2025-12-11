class Vehiculo{
    #velocidad;
    #estadoMotor;
    constructor(marca, modelo){
        this.#velocidad = 0;
        this.#estadoMotor = "apagado";
        this.marca = marca;
        this.modelo = modelo;
    }

    encenderMotor(){
        console.log("El motor previo: " + this.#estadoMotor + "!");
        this.#estadoMotor = "Encendido";
        console.log("El motor posterior: " + this.#estadoMotor + "!");
    }

    acelerar(incremento){
        console.log("La velocidad previa es de: " + this.#velocidad);
        this.#velocidad+=incremento;
        console.log("La velocidad posterior es de: " + this.#velocidad);
    }
    mostrarInformacion(){
        console.log("Información del vehiculo:");
        console.log("Marca:"+ this.marca);
        console.log("Modelo:"+ this.modelo);
        console.log("Velocidad:"+ this.#velocidad);
        console.log("Estado del motor:"+ this.#estadoMotor);
    }
}



class Coche extends Vehiculo{
    constructor(marca, modelo, numPuertas){
        super(marca, modelo);

        this.numPuertas = numPuertas;
    }

    acelerar(incremento){
        super.acelerar(incremento);
        console.log("El coche esta cogiendo velocidad!!!")
    }

    mostrarInformacion(){
        console.log("Información del coche:");
        console.log("Marca:"+ this.marca);
        console.log("Modelo:"+ this.modelo);
        console.log("Número de Puertas:"+ this.numPuertas +"\n");
    }
}

class Bicicleta extends Vehiculo{
    constructor(marca, modelo){
        super(marca, modelo);
    }
    
    encenderMotor(){
        console.log("No tiene motor!");
    }

    acelerar(incremento){
        super.acelerar(incremento);
        console.log("Vas bastante rápido para no tener motor!")
    }

    mostrarInformacion(){
        console.log("Información de la bici:");
        console.log("Marca:"+ this.marca);
        console.log("Modelo:"+ this.modelo);
    }
}


function inspeccionarVehiculo(vehiculo){
    console.log("-----INICIO INSPECCIÓN-----");
    vehiculo.mostrarInformacion();
    console.log("-----FIN INSPECCIÓN-----");
}

console.log("=== Ejercicio 1: Probando Coche ===");
const miCoche = new Coche("Toyota", "Corolla", 4);
console.log(`Marca: ${miCoche.marca}, Modelo: ${miCoche.modelo}, Puertas: ${miCoche.numPuertas}`);
miCoche.encenderMotor();
miCoche.acelerar(50);
miCoche.acelerar(30);


console.log("\n=== Ejercicio 2: Probando Bicicleta ===");
const miBici = new Bicicleta("Giant", "TCR");
console.log(`Marca: ${miBici.marca}, Modelo: ${miBici.modelo}`);
miBici.encenderMotor();
miBici.acelerar(15);

console.log("\n=== Ejercicio 3: Mostrar Información ===");
miCoche.mostrarInformacion();
miBici.mostrarInformacion();

console.log("\n=== Ejercicio 4: Inspección de Vehículos ===");
const miVehiculo = new Vehiculo("Porsche", "911");
inspeccionarVehiculo(miVehiculo);
inspeccionarVehiculo(miCoche);
inspeccionarVehiculo(miBici);