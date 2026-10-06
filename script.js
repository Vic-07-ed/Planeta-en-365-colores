/* ==================================================
   DATOS DE LOS RETOS
================================================== */

const temas = [

    {
        titulo: "El color del bosque",
        descripcion: "Observa los diferentes tonos verdes presentes en árboles, hojas y plantas.",
        color: "#39796B",
        nombreColor: "Verde bosque",
        reto: "Crea una composición utilizando diferentes tonos de verde para representar un bosque.",
        reflexion: "Los bosques son ecosistemas fundamentales para la vida.",
        ods: "ODS 15"
    },

    {
        titulo: "Azul del agua",
        descripcion: "Observa el agua y sus diferentes tonalidades.",
        color: "#2780A0",
        nombreColor: "Azul agua",
        reto: "Crea una obra que represente la importancia del agua.",
        reflexion: "El agua es un recurso esencial que debemos proteger.",
        ods: "ODS 6"
    },

    {
        titulo: "Atardecer",
        descripcion: "Observa los colores que aparecen cuando cambia la luz del día.",
        color: "#D9784A",
        nombreColor: "Naranja atardecer",
        reto: "Crea un paisaje utilizando colores cálidos.",
        reflexion: "La observación de la naturaleza puede ayudarnos a comprender nuestro entorno.",
        ods: "ODS 13"
    },

    {
        titulo: "Tierra",
        descripcion: "Explora los colores presentes en el suelo y las rocas.",
        color: "#8B6548",
        nombreColor: "Marrón tierra",
        reto: "Crea una obra inspirada en las texturas de la tierra.",
        reflexion: "Los ecosistemas terrestres sostienen una gran diversidad de vida.",
        ods: "ODS 15"
    },

    {
        titulo: "Océano",
        descripcion: "Imagina la variedad de colores que existe bajo el mar.",
        color: "#176B78",
        nombreColor: "Azul océano",
        reto: "Crea una composición sobre la vida marina.",
        reflexion: "Los océanos son fundamentales para el equilibrio del planeta.",
        ods: "ODS 14"
    }

];


/* ==================================================
   VARIABLES
================================================== */

let diaActual = 1;

let completados =
    JSON.parse(localStorage.getItem("diasCompletados")) || [];


/* ==================================================
   NAVEGACIÓN
================================================== */

function mostrarSeccion(id, boton) {

    document.querySelectorAll(".section")
        .forEach(section => {

            section.classList.remove("active");

        });


    document.getElementById(id)
        .classList.add("active");


    document.querySelectorAll("nav button")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    if (boton) {

        boton.classList.add("active");

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==================================================
   RETOS
================================================== */

function obtenerTema(dia) {

    return temas[(dia - 1) % temas.length];

}


function cargarDia(dia) {

    diaActual = dia;

    const tema = obtenerTema(dia);


    document.getElementById("numeroDia")
        .textContent =
        "Día " + dia;


    document.getElementById("odsDia")
        .textContent =
        tema.ods;


    document.getElementById("tituloDia")
        .textContent =
        tema.titulo;


    document.getElementById("descripcionDia")
        .textContent =
        tema.descripcion;


    const color =
        document.getElementById("colorDia");


    color.style.background =
        tema.color;


    color.textContent =
        tema.nombreColor;


    document.getElementById("retoDia")
        .textContent =
        tema.reto;


    document.getElementById("reflexionDia")
        .textContent =
        tema.reflexion;


    document.getElementById("color")
        .value =
        tema.color;


    actualizarInfoColor();

    actualizarProgreso();

}


/* ==================================================
   COMPLETAR RETO
================================================== */

function completarDia() {

    if (!completados.includes(diaActual)) {

        completados.push(diaActual);

        localStorage.setItem(
            "diasCompletados",
            JSON.stringify(completados)
        );

    }

    actualizarProgreso();

    crearCalendario();

}


function siguienteDia() {

    if (diaActual >= 365) {

        diaActual = 1;

    } else {

        diaActual++;

    }

    cargarDia(diaActual);

}


/* ==================================================
   PROGRESO
================================================== */

function actualizarProgreso() {

    const cantidad =
        completados.length;


    const porcentaje =
        (cantidad / 365) * 100;


    document.getElementById("barraProgreso")
        .style.width =
        porcentaje + "%";


    document.getElementById("textoProgreso")
        .textContent =
        cantidad +
        " de 365 días completados";

}


/* ==================================================
   CALENDARIO
================================================== */

function crearCalendario() {

    const calendario =
        document.getElementById("calendarioGrid");


    calendario.innerHTML = "";


    for (let i = 1; i <= 365; i++) {

        const dia =
            document.createElement("div");


        dia.className = "day";

        dia.textContent = i;


        if (completados.includes(i)) {

            dia.classList.add("completed");

        }


        if (i === diaActual) {

            dia.classList.add("today");

        }


        dia.onclick = () => {

            cargarDia(i);

            mostrarSeccion("reto");

        };


        calendario.appendChild(dia);

    }

}


function irAlReto() {

    mostrarSeccion("reto");

    cargarDia(diaActual);

}


/* ==================================================
   EDITOR DE DIBUJO
================================================== */

const canvas =
    document.getElementById("canvas");

const ctx =
    canvas.getContext("2d");


let herramienta = "pincel";

let dibujando = false;

let inicioX = 0;

let inicioY = 0;

let historial = [];

let historialPosicion = -1;


/* ==================================================
   CONFIGURACIÓN
================================================== */

const colorInput =
    document.getElementById("color");

const grosorInput =
    document.getElementById("grosor");

const opacidadInput =
    document.getElementById("opacidad");

const rellenoInput =
    document.getElementById("relleno");


grosorInput.addEventListener("input", () => {

    document.getElementById("valorGrosor")
        .textContent =
        grosorInput.value;

});


opacidadInput.addEventListener("input", () => {

    document.getElementById("valorOpacidad")
        .textContent =
        opacidadInput.value + "%";

});


colorInput.addEventListener("input", () => {

    actualizarInfoColor();

});


function actualizarInfoColor() {

    document.getElementById("colorActual")
        .textContent =
        colorInput.value;

}


/* ==================================================
   SELECCIONAR HERRAMIENTA
================================================== */

function seleccionarHerramienta(nombre, boton) {

    herramienta = nombre;


    document.querySelectorAll(".tool")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    boton.classList.add("active");


    const nombres = {

        pincel: "Pincel",

        lapiz: "Lápiz",

        crayon: "Crayón",

        marcador: "Marcador",

        acuarela: "Acuarela",

        aerografo: "Aerógrafo",

        goma: "Goma",

        linea: "Línea",

        rectangulo: "Rectángulo",

        circulo: "Círculo",

        triangulo: "Triángulo",

        estrella: "Estrella"

    };


    document.getElementById("herramientaActual")
        .textContent =
        nombres[nombre];

}


/* ==================================================
   POSICIÓN DEL MOUSE
================================================== */

function obtenerPosicion(e) {

    const rect =
        canvas.getBoundingClientRect();


    return {

        x:
            (e.clientX - rect.left)
            * canvas.width / rect.width,

        y:
            (e.clientY - rect.top)
            * canvas.height / rect.height

    };

}


/* ==================================================
   COLOR DE PINCEL
================================================== */

function configurarPincel() {

    let color =
        colorInput.value;


    if (herramienta === "goma") {

        ctx.globalCompositeOperation =
            "destination-out";

        ctx.globalAlpha = 1;

        return;

    }


    ctx.globalCompositeOperation =
        "source-over";


    ctx.strokeStyle =
        color;


    ctx.fillStyle =
        color;


    ctx.lineWidth =
        Number(grosorInput.value);


    ctx.globalAlpha =
        Number(opacidadInput.value) / 100;


    ctx.lineCap =
        "round";

    ctx.lineJoin =
        "round";


    /* EFECTOS DE PINCEL */

    if (herramienta === "lapiz") {

        ctx.globalAlpha *= .8;

        ctx.lineWidth =
            Math.max(1, Number(grosorInput.value) / 2);

    }


    if (herramienta === "crayon") {

        ctx.globalAlpha *= .65;

        ctx.lineWidth =
            Number(grosorInput.value) * 1.4;

    }


    if (herramienta === "marcador") {

        ctx.globalAlpha *= .55;

        ctx.lineWidth =
            Number(grosorInput.value) * 1.5;

    }


    if (herramienta === "acuarela") {

        ctx.globalAlpha *= .25;

        ctx.lineWidth =
            Number(grosorInput.value) * 2;

    }


    if (herramienta === "aerografo") {

        ctx.globalAlpha *= .12;

        ctx.lineWidth =
            Number(grosorInput.value) * 3;

    }

}


/* ==================================================
   MOUSE DOWN
================================================== */

canvas.addEventListener("pointerdown", e => {

    dibujando = true;

    const pos =
        obtenerPosicion(e);


    inicioX = pos.x;

    inicioY = pos.y;


    guardarEstado();


    configurarPincel();


    if (
        herramienta === "pincel" ||
        herramienta === "lapiz" ||
        herramienta === "crayon" ||
        herramienta === "marcador" ||
        herramienta === "acuarela" ||
        herramienta === "aerografo" ||
        herramienta === "goma"
    ) {

        ctx.beginPath();

        ctx.moveTo(
            inicioX,
            inicioY
        );

    }

});


/* ==================================================
   MOUSE MOVE
================================================== */

canvas.addEventListener("pointermove", e => {

    if (!dibujando) return;


    const pos =
        obtenerPosicion(e);


    if (

        herramienta === "pincel" ||
        herramienta === "lapiz" ||
        herramienta === "crayon" ||
        herramienta === "marcador" ||
        herramienta === "acuarela" ||
        herramienta === "aerografo" ||
        herramienta === "goma"

    ) {

        configurarPincel();


        ctx.lineTo(
            pos.x,
            pos.y
        );


        ctx.stroke();

        ctx.beginPath();

        ctx.moveTo(
            pos.x,
            pos.y
        );

    }

});


/* ==================================================
   MOUSE UP
================================================== */

canvas.addEventListener("pointerup", e => {

    if (!dibujando) return;

    dibujando = false;


    const pos =
        obtenerPosicion(e);


    if (

        herramienta === "linea" ||
        herramienta === "rectangulo" ||
        herramienta === "circulo" ||
        herramienta === "triangulo" ||
        herramienta === "estrella"

    ) {

        restaurarEstadoAnterior();

        configurarPincel();


        dibujarForma(
            inicioX,
            inicioY,
            pos.x,
            pos.y
        );

    }


    ctx.globalAlpha = 1;

    ctx.globalCompositeOperation =
        "source-over";

});


canvas.addEventListener("pointercancel", () => {

    dibujando = false;

});


/* ==================================================
   FORMAS
================================================== */

function dibujarForma(x1, y1, x2, y2) {

    const ancho =
        x2 - x1;

    const alto =
        y2 - y1;


    ctx.beginPath();


    /* LÍNEA */

    if (herramienta === "linea") {

        ctx.moveTo(x1, y1);

        ctx.lineTo(x2, y2);

        ctx.stroke();

    }


    /* RECTÁNGULO */

    if (herramienta === "rectangulo") {

        if (rellenoInput.checked) {

            ctx.fillRect(
                x1,
                y1,
                ancho,
                alto
            );

        } else {

            ctx.strokeRect(
                x1,
                y1,
                ancho,
                alto
            );

        }

    }


    /* CÍRCULO */

    if (herramienta === "circulo") {

        const radio =
            Math.sqrt(
                ancho * ancho +
                alto * alto
            );


        ctx.arc(
            x1,
            y1,
            radio,
            0,
            Math.PI * 2
        );


        if (rellenoInput.checked) {

            ctx.fill();

        } else {

            ctx.stroke();

        }

    }


    /* TRIÁNGULO */

    if (herramienta === "triangulo") {

        ctx.moveTo(
            x1 + ancho / 2,
            y1
        );

        ctx.lineTo(
            x1,
            y2
        );

        ctx.lineTo(
            x2,
            y2
        );

        ctx.closePath();


        if (rellenoInput.checked) {

            ctx.fill();

        } else {

            ctx.stroke();

        }

    }


    /* ESTRELLA */

    if (herramienta === "estrella") {

        dibujarEstrella(
            x1 + ancho / 2,
            y1 + alto / 2,
            Math.abs(ancho) / 2,
            5
        );

    }

}


/* ==================================================
   ESTRELLA
================================================== */

function dibujarEstrella(
    centroX,
    centroY,
    radio,
    puntas
) {

    const radioInterior =
        radio * .45;


    ctx.beginPath();


    for (let i = 0; i < puntas * 2; i++) {

        const angulo =
            -Math.PI / 2 +
            i * Math.PI / puntas;


        const r =
            i % 2 === 0
            ? radio
            : radioInterior;


        const x =
            centroX +
            Math.cos(angulo) * r;


        const y =
            centroY +
            Math.sin(angulo) * r;


        if (i === 0) {

            ctx.moveTo(x, y);

        } else {

            ctx.lineTo(x, y);

        }

    }


    ctx.closePath();


    if (rellenoInput.checked) {

        ctx.fill();

    } else {

        ctx.stroke();

    }

}


/* ==================================================
   HISTORIAL
================================================== */

function guardarEstado() {

    historial =
        historial.slice(
            0,
            historialPosicion + 1
        );


    historial.push(
        canvas.toDataURL()
    );


    historialPosicion++;


    if (historial.length > 30) {

        historial.shift();

        historialPosicion--;

    }

}


function restaurarEstadoAnterior() {

    if (historialPosicion < 0) return;


    const imagen =
        new Image();


    imagen.onload = () => {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.drawImage(
            imagen,
            0,
            0
        );

    };


    imagen.src =
        historial[historialPosicion];

}


function deshacer() {

    if (historialPosicion <= 0) {

        limpiarCanvasInterno();

        return;

    }


    historialPosicion--;


    const imagen =
        new Image();


    imagen.onload = () => {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.drawImage(
            imagen,
            0,
            0
        );

    };


    imagen.src =
        historial[historialPosicion];

}


function rehacer() {

    if (
        historialPosicion >=
        historial.length - 1
    ) {

        return;

    }


    historialPosicion++;


    const imagen =
        new Image();


    imagen.onload = () => {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.drawImage(
            imagen,
            0,
            0
        );

    };


    imagen.src =
        historial[historialPosicion];

}


/* ==================================================
   LIMPIAR
================================================== */

function limpiarCanvasInterno() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


function limpiarCanvas() {

    if (
        confirm(
            "¿Quieres borrar toda la obra?"
        )
    ) {

        guardarEstado();

        limpiarCanvasInterno();

    }

}


/* ==================================================
   GUARDAR OBRA
================================================== */

function guardarObra() {

    const enlace =
        document.createElement("a");


    enlace.download =
        "planeta-365-colores-dia-" +
        diaActual +
        ".png";


    enlace.href =
        canvas.toDataURL("image/png");


    enlace.click();

}


/* ==================================================
   INICIALIZAR
================================================== */

cargarDia(1);

crearCalendario();

actualizarProgreso();


/*
    Estado inicial del lienzo.
*/

ctx.fillStyle = "white";

ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
);


/*
    Guardamos el primer estado.
*/

historial.push(
    canvas.toDataURL()
);

historialPosicion = 0;
