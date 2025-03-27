document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("btn1");
    if (btn) {
        btn.style.background = "#ff4900";
    }
});

// Cargar el audio
let audio = new Audio("music/Veridis_Quo.mp3");

// Recuperar volumen guardado
const savedVolume = localStorage.getItem("volume");
audio.volume = savedVolume ? parseFloat(savedVolume) : 0.1; // Si hay un volumen guardado, úsalo; si no, usa 0.1

// Esperar a que el audio se cargue completamente antes de modificar su volumen
audio.addEventListener("loadedmetadata", function() {
    audio.volume = savedVolume ? parseFloat(savedVolume) : 0.1; 
});

// Control de volumen con el slider personalizado
const volumeControl = document.getElementById("volume-control");

// Si hay un volumen guardado, ajusta el slider
if (savedVolume !== null) {
    volumeControl.value = savedVolume;
}

volumeControl.addEventListener("input", function() {
    let newVolume = parseFloat(this.value);
    audio.volume = newVolume; // Cambia el volumen en tiempo real
    localStorage.setItem("volume", newVolume); // Guarda el nuevo volumen en localStorage
});

// Evento para el botón "play"
document.getElementById("value-1").addEventListener("change", function() {
    if (this.checked) {
        audio.play();
    }
});

// Evento para el botón "stop"
document.getElementById("value-2").addEventListener("change", function() {
    if (this.checked) {
        audio.pause();
    }
});

// Evento para el botón "again"
document.getElementById("value-3").addEventListener("change", function() {
    if (this.checked) {
        audio.currentTime = 0; // Reinicia la canción
        audio.play();
        
        setTimeout(() => {
            this.checked = false; // Deselecciona "again"
            document.getElementById("value-1").checked = true; // Selecciona "play"
        }, 100);
    }
});

// Al recargar la página, todos los botones de radio quedan deseleccionados
window.addEventListener("load", () => {
    document.querySelectorAll("input[type='radio']").forEach(radio => {
        radio.checked = false;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const btnEs = document.getElementById("btn-es");
    const btnEn = document.getElementById("btn-en");
    const btnFr = document.getElementById("btn-fr");

    // Verifica si hay un idioma guardado en localStorage
    const savedLanguage = localStorage.getItem("language");

    if (savedLanguage) {
        changeLanguage(savedLanguage); // Aplica el idioma guardado
    }

    // Eventos para cambiar de idioma
    btnEs.addEventListener("click", function () {
        changeLanguage("es");
    });

    btnEn.addEventListener("click", function () {
        changeLanguage("en");
    });

    btnFr.addEventListener("click", function () {
        changeLanguage("fr");
    });

    function changeLanguage(lang) {
        localStorage.setItem("language", lang); 
        document.documentElement.lang = lang;

        if (lang === "es") {
            document.title = "Cristian Villa Proyectos";
            document.querySelector(".titulo").textContent = "Repositorio de proyectos de";
            document.querySelector(".btn").textContent = "Proyecto prácticas Seresco";
            
        } else if (lang === "en") {
            document.title = "Cristian Villa Projects";
            document.querySelector(".titulo").textContent = "Project Repository of";
            document.querySelector(".btn").textContent = "Seresco internship project";

        } else if (lang === "fr") {
            document.title = "Projets de Cristian Villa";
            document.querySelector(".titulo").textContent = "Référentiel de projets de";
            document.querySelector(".btn").textContent = "Projet de stage Seresco";
        }
    }
});


