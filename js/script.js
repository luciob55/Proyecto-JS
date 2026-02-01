const NOTA_APROBACION = 6;
let notas = JSON.parse(localStorage.getItem("notas")) || [];

const app = document.getElementById("app");

// HTML generado desde JS
app.innerHTML = `
    <div class="contenedor">
        <input type="number" id="inputNota" placeholder="Ingresá una nota">
        <button id="btnAgregar">Agregar nota</button>

        <h3>Notas ingresadas</h3>
        <ul id="listaNotas"></ul>

        <button id="btnCalcular">Calcular promedio</button>
        <button id="btnReset">Reiniciar simulador</button>
        <p id="resultado"></p>
    </div>
`;

const inputNota = document.getElementById("inputNota");
const btnAgregar = document.getElementById("btnAgregar");
const btnCalcular = document.getElementById("btnCalcular");
const listaNotas = document.getElementById("listaNotas");
const resultado = document.getElementById("resultado");
const btnReset = document.getElementById("btnReset");

// Cargar notas
fetch("data/notas.json")
    .then(res => res.json())
    .then(data => {
        if (notas.length === 0) {
            notas = data.map(n => n.valor);
            localStorage.setItem("notas", JSON.stringify(notas));
            renderNotas();
        }
    });

renderNotas();

// Eventos
btnAgregar.addEventListener("click", () => {
    const valor = parseFloat(inputNota.value);

    if (isNaN(valor) || valor < 0 || valor > 10) {
        Swal.fire("Error", "Ingresá una nota válida (0 a 10)", "error");
        return;
    }

    notas.push(valor);
    localStorage.setItem("notas", JSON.stringify(notas));
    inputNota.value = "";
    renderNotas();
});

btnCalcular.addEventListener("click", () => {
    if (notas.length === 0) {
        Swal.fire("Sin notas", "No hay notas cargadas", "warning");
        return;
    }

    const promedio = calcularPromedio(notas);
    mostrarResultado(promedio);
});

btnReset.addEventListener("click", () => {
    Swal.fire({
        title: "¿Reiniciar simulador?",
        text: "Se borrarán todas las notas cargadas",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, reiniciar",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if (result.isConfirmed) {
            notas = [];
            localStorage.removeItem("notas");
            renderNotas();
            resultado.textContent = "";
        }
    });
});

// Funciones
function renderNotas() {
    listaNotas.innerHTML = "";
    notas.forEach(nota => {
        const li = document.createElement("li");
        li.textContent = nota;
        listaNotas.appendChild(li);
    });
}

function calcularPromedio(notas) {
    const suma = notas.reduce((acc, n) => acc + n, 0);
    return suma / notas.length;
}

function mostrarResultado(promedio) {
    if (promedio >= NOTA_APROBACION) {
        resultado.textContent = `Promedio: ${promedio.toFixed(2)} - APROBADO`;
    } else {
        resultado.textContent = `Promedio: ${promedio.toFixed(2)} - DESAPROBADO`;
    }
}
