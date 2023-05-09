const preguntas = [
    "En general, ¿dirías que te gusta asumir la responsabilidad en un trabajo en grupo?",
    "¿Te sentís cómodo/a organizando las actividades que requieran dedicación y tiempo?",
    "¿Normalmente planificás con anticipación las actividades que vas a realizar?",
    "¿Te sentís cómodo/a al respetar y cumplir normas o leyes?",
    "¿Disfrutás y tenés habilidad para trabajar con números y registros de manera ordenada?",
    "Antes de presentar un trabajo realizado en grupo, ¿tenés la tendencia de revisarlo y evaluarlo antes de entregarlo?",
    "¿Te gusta aprender nuevos idiomas y conocer nuevos países y su cultura?",
    "¿Te interesa la idea de vender productos bolivianos en otros países y al mismo tiempo te llama la atención traer productos extranjeros para venderlos en Bolivia?",
    "¿Quisieras trabajar en empresas donde tengas contacto con personas de otros países y puedas negociar con ellos?",
    "¿Te gusta emprender nuevos retos?",
    "¿Buscas siempre soluciones creativas para los problemas que otros no pueden resolver?",
    "¿Te gustan las ventas, el marketing, y estar rodeado de personas siempre?",
    "Generalmente pensás en los riesgos u opciones antes de hacer algo?",
    "Te considerás hábil en matemáticas, la estadística y los números en general?",
    "Te considerás una persona que tiene la habilidad para ahorrar y administrar dinero?",
    "Te gusta conocer o saber el porqué de las cosas?",
    "Te gustaría realizar acciones que mejoren su región?",
    "¿Alguna vez soñaste con ser presidente del banco central?",
    "¿Te gusta ver y analizar comerciales en la TV, YouTUbe, Shazam, etc.?",
    "Tenés talento artístico y te considerás una persona creativa?",
    "¿Preferís los trabajos donde te relaciones con otras personas, más que desarrollar prácticos matemáticos?"
];

const carreras = {
    administracion_de_empresas: [0, 1, 2],
    auditoria_y_finanzas: [3, 4, 5],
    comercio_internacional: [6, 7, 8],
    ingenieria_comercial: [9, 10, 11],
    ingenieria_financiera: [12, 13, 14],
    ingenieria_economica: [15, 16, 17],
    marketing_y_publicidad: [18, 19, 20],
}

// Mezclar las preguntas de forma aleatoria
const preguntasAleatorias = shuffle(preguntas);

let respuestas = [];
let preguntaActual = 0;

function ocultarFormulario() {
    const formularioElement = document.getElementById('formulario');
    formularioElement.style.display = 'none';

    const preguntaElement = document.getElementById('pregunta');
    preguntaElement.style.display = 'none';

    const h1Element = document.querySelector('h1');
    h1Element.style.display = 'none';
}

function mostrarCarreras() {
    const carrerasElement = document.getElementById('carreras');
    carrerasElement.innerHTML = ""; // Limpiar contenido previo

    const carrerasCumplidas = [];
    let maxPreguntasAfirmativas = 0;
    let carreraMasCercana = null;

    for (const carrera in carreras) {
        const preguntasCarrera = carreras[carrera];
        const preguntasAfirmativas = preguntasCarrera.filter(pregunta => respuestas[pregunta] === true);
        const numPreguntasAfirmativas = preguntasAfirmativas.length;

        if (numPreguntasAfirmativas >= 3) {
            carrerasCumplidas.push(carrera);
        } else if (numPreguntasAfirmativas > maxPreguntasAfirmativas && numPreguntasAfirmativas >= 2) {
            maxPreguntasAfirmativas = numPreguntasAfirmativas;
            carreraMasCercana = carrera;
        }
    }

    if (carrerasCumplidas.length > 0) {
        carrerasElement.innerHTML = "Las carreras adecuadas son:<br><br><br>";
        const primerasTresCarreras = carrerasCumplidas.slice(0, 3);
        for (const carrera of primerasTresCarreras) {
            const nombreCarrera = convertirTextoConEspacios(carrera);
            carrerasElement.innerHTML += nombreCarrera + "<br>";
        }
    } else if (carreraMasCercana) {
        carrerasElement.innerHTML = "Ninguna carrera cumple con los requisitos. La carrera más cercana es:<br>";
        const nombreCarreraMasCercana = convertirTextoConEspacios(carreraMasCercana);
        carrerasElement.innerHTML += nombreCarreraMasCercana;
    } else {
        carrerasElement.innerHTML = "No se cumple con los requisitos de ninguna carrera.";
    }

    const resultadosElement = document.getElementById('resultados');
    resultadosElement.style.display = 'block'; // Mostrar el elemento <div> de resultados

    ocultarFormulario(); // Ocultar el formulario después de mostrar las carreras
}

function guardarRespuesta(respuesta) {
    respuestas.push(respuesta);

    if (preguntaActual < preguntasAleatorias.length - 1) {
        preguntaActual++;
        mostrarSiguientePregunta();
    } else {
        mostrarCarreras();
    }
}

// Función para convertir un texto con guiones bajos en texto con espacios y manejar caracteres acentuados
function convertirTextoConEspacios(texto) {
    const palabras = texto.split('_');
    const palabrasConEspacios = palabras.map(palabra =>
        palabra.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
            .charAt(0).toUpperCase() + palabra.slice(1)
    );
    return palabrasConEspacios.join(' ');
}

function mostrarSiguientePregunta() {
    const pregunta = document.getElementById('pregunta');
    pregunta.textContent = preguntasAleatorias[preguntaActual];
    if (preguntaActual === preguntasAleatorias.length) {
        const formularioElement = document.getElementById('formulario');
        formularioElement.style.display = 'none'; // Ocultar formulario después de responder todas las preguntas
    }
}

// Función para mezclar un array utilizando el algoritmo de Fisher-Yates
function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Mostrar la primera pregunta aleatoria al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    mostrarSiguientePregunta();
});