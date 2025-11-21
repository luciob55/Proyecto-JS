
let notas = [];            
const NOTA_APROBACION = 6;  
function pedirNotas() {
    alert("Bienvenido al simulador de promedio.");

    let cantidad = prompt("¿Cuántas notas querés ingresar?");
    cantidad = parseInt(cantidad);

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Cantidad inválida.");
        return;
    }

    for (let i = 0; i < cantidad; i++) {
        let nota = parseFloat(prompt("Ingresá la nota " + (i + 1)));
        if (isNaN(nota)) {
            alert("Dato inválido. Se registrará como 0.");
            nota = 0;
        }
        notas.push(nota);
    }

    console.log("Notas ingresadas:", notas);
}                              

function calcularPromedio() {
    if (notas.length === 0) {
        console.warn("No hay notas cargadas.");
        return null;
    }

    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
    }

    let promedio = suma / notas.length;
    return promedio;
}


function mostrarResultado(promedio) {
    if (promedio === null) return;

    let mensaje = "El promedio es: " + promedio.toFixed(2);

    if (promedio >= NOTA_APROBACION) {
        mensaje += "/nEstado: APROBADO ✔";
    } else {
        mensaje += "/nEstado: DESAPROBADO ✘";
    }

    alert(mensaje);
    console.log(mensaje);
}

pedirNotas();
let prom = calcularPromedio();
mostrarResultado(prom);
