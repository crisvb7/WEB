document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("themeToggle");
    const modeText = document.getElementById("modeText");
    const modeLoader = document.getElementById("modeLoader");

    function animateText(newText) {
        // Reinicia la animación eliminando y volviendo a agregar la clase
        modeLoader.style.animation = "none";
        modeLoader.offsetHeight; // Forzar un reflow para resetear la animación
        modeLoader.style.animation = ""; 
        
        // Borrar el texto y resetear el ancho
        modeText.textContent = "";
        modeLoader.style.width = "0px";
        
        setTimeout(() => {
            modeText.textContent = newText;
            modeLoader.style.animation = `typewriter ${newText.length * 0.1}s steps(${newText.length}) forwards, blink 0.5s steps(2) ${newText.length * 0.1}s`;
        }, 50);
    }

    // Recuperar el estado del modo oscuro
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        toggleSwitch.checked = true;
        animateText("Dark mode");
    } else {
        animateText("Light mode");
    }

    toggleSwitch.addEventListener("change", function () {
        if (this.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
            animateText("Dark mode");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
            animateText("Light mode");
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("input");
    const body = document.body;

    // Verifica si el modo oscuro estaba activado previamente
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        toggle.checked = true;
    }

    // Cambia entre modo claro y oscuro
    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "enabled");
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("dark-mode", "disabled");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card"); 
    const modal = document.createElement("div"); 
    modal.id = "modal";
    modal.innerHTML = `
        <span class="close">&times;</span>
        <img class="modal-content" id="modal-img" draggable="false">
    `;
    document.body.appendChild(modal);

    const modalImg = document.getElementById("modal-img");
    const closeModal = modal.querySelector(".close");

    let scale = 1; // Nivel de zoom inicial
    let isDragging = false;
    let startX, startY, imgX = 0, imgY = 0;

    // Abrir modal al hacer clic en una card
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img"); 
            if (img) {
                modal.style.display = "flex";
                modalImg.src = img.src;
                document.body.classList.add("no-scroll");
                resetZoomAndPosition();
            }
        });
    });

    // Cerrar modal al hacer clic en la "X" o fuera de la imagen
    closeModal.addEventListener("click", () => { 
        modal.style.display = "none";
        document.body.classList.remove("no-scroll");
    });

    // Aplicar zoom con la rueda del mouse
    modalImg.addEventListener("wheel", (e) => {
        e.preventDefault();
        scale += e.deltaY * -0.0015; // Ajusta la sensibilidad del zoom
        scale = Math.min(Math.max(1, scale), 3); // Limita el zoom (mínimo 1x, máximo 3x)
        applyTransform();
    });

    // Evitar que el navegador intente extraer la imagen al arrastrarla
    modalImg.addEventListener("dragstart", (event) => {
        event.preventDefault();
    });

    // Función para iniciar el arrastre
    modalImg.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX - imgX;
        startY = e.clientY - imgY;
        modalImg.style.cursor = "grabbing";
    });

    // Mover la imagen mientras se arrastra
    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        imgX = e.clientX - startX;
        imgY = e.clientY - startY;
        applyTransform();
    });

    // Soltar la imagen al dejar de hacer clic
    document.addEventListener("mouseup", () => {
        isDragging = false;
        modalImg.style.cursor = "grab";
    });

    // Restablecer zoom y posición al abrir la imagen
    function resetZoomAndPosition() {
        scale = 1;
        imgX = 0;
        imgY = 0;
        applyTransform();
    }

    // Aplicar transformación a la imagen
    function applyTransform() {
        modalImg.style.transform = `translate(${imgX}px, ${imgY}px) scale(${scale})`;
    }
});

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop > 100) {
        scrollTopBtn.style.opacity = "1";
        scrollTopBtn.style.visibility = "visible";
    } else {
        scrollTopBtn.style.opacity = "0";
        scrollTopBtn.style.visibility = "hidden";
    }
});

scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const darkModeBtn = document.getElementById("darkModeBtn"); // Asegúrate de que este sea el ID de tu botón
const body = document.body;

darkModeBtn.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    // Guardar la preferencia en localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});

// Aplicar modo oscuro si estaba activado anteriormente
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
}


function copyText() {
            let text = document.getElementById("docker-6").innerText;
            navigator.clipboard.writeText(text).then(() => {
                showNotification("Texto copiado al portapapeles 📋");
            }).catch(err => {
                console.error("Error al copiar: ", err);
            });
        }

function showNotification(message) {
    let notification = document.createElement("div");
    notification.className = "alert-notification";
    notification.innerHTML = `
        <div class="alert fade-in-out">
            <button class="close-btn" onclick="this.parentElement.remove()">✖</button>
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 alert-svg">
                        <path clip-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" fill-rule="evenodd"></path>
                    </svg>
                </div>
                <div class="alert-prompt-wrap">
                    <p class="text-sm text-yellow-700">${message}</p>
                </div>
            </div>
        </div>`;

    document.body.appendChild(notification);

    // Desvanecer y eliminar después de 3 segundos
    setTimeout(() => { 
        if (notification) notification.classList.add("fade-out"); 
    }, 2500);
    setTimeout(() => { 
        if (notification) notification.remove(); 
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY + window.innerHeight / 2; 

        sections.forEach(section => {
            let rect = section.getBoundingClientRect();
            let sectionTop = rect.top + window.scrollY;
            let sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                let cursor = section.getAttribute("data-cursor") || "default";
                document.body.style.cursor = cursor;
            }
        });
    });
});
