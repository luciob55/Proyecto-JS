const NOTA_APROBACION = 6;
let notas = JSON.parse(localStorage.getItem("notas")) || [];

const inputNota = document.getElementById("inputNota");
const btnAgregar = document.getElementById("btnAgregar");
const btnCalcular = document.getElementById("btnCalcular");
const listaNotas = document.getElementById("listaNotas");
const resultado = document.getElementById("resultado");

// Mostrar notas guardadas al cargar
mostrarNotas();

// Evento para agregar nota
btnAgregar.addEventListener("click", function () {
    let valor = parseFloat(inputNota.value);

    if (isNaN(valor) || valor < 0 || valor > 10) {
        resultado.textContent = "Ingresá una nota válida (0 a 10)";
        return;
    }

    notas.push(valor);
    localStorage.setItem("notas", JSON.stringify(notas));
    inputNota.value = "";

    mostrarNotas();
});

// Evento para calcular promedio
btnCalcular.addEventListener("click", function () {
    if (notas.length === 0) {
        resultado.textContent = "No hay notas cargadas";
        return;
    }

    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
    }

    let promedio = suma / notas.length;

    if (promedio >= NOTA_APROBACION) {
        resultado.textContent = "Promedio: " + promedio.toFixed(2) + " - APROBADO";
    } else {
        resultado.textContent = "Promedio: " + promedio.toFixed(2) + " - DESAPROBADO";
    }
});

// Mostrar las notas en la lista
function mostrarNotas() {
    listaNotas.innerHTML = "";

    for (let i = 0; i < notas.length; i++) {
        let li = document.createElement("li");
        li.textContent = notas[i];
        listaNotas.appendChild(li);
    }
}
