document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section");
  const headerLogo = document.querySelector(".logo"); // Selecciona el logo

  // Obtener elementos del formulario
  const contactForm = document.getElementById("contactForm");
  const radioOptions = document.querySelectorAll('input[name="contact-type"]');

  // Función para activar el enlace correspondiente
  function activateLink(targetSection) {
    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${targetSection}`) {
        link.classList.add("active");
      }
    });

    // Actualizar el indicador
    updateIndicator();
  }

  // Función para actualizar el indicador
  function updateIndicator() {
    const activeLink = document.querySelector(".nav-links a.active");
    const indicator = document.querySelector(".indicator");

    if (activeLink) {
      const index = Array.from(links).indexOf(activeLink);
      indicator.style.transform = `translateX(calc(70px * ${index}))`;
    }
  }

  // Función para mostrar la sección correspondiente
  function showSection(targetSection) {
    sections.forEach((section) => {
      section.classList.remove("active");
      section.style.display = "none"; // Ocultar todas las secciones
    });

    const activeSection = document.getElementById(targetSection);
    if (activeSection) {
      activeSection.classList.add("active");
      activeSection.style.display = "block"; // Mostrar solo la sección activa

      // Reiniciar la animación
      activeSection.classList.remove("fadeZoomIn"); // Quita la clase de animación
      setTimeout(() => {
        activeSection.classList.add("animate-fadeInUp"); // Agrega la clase de animación
      }, 10); // Un pequeño retraso para que se aplique la animación
    }
  }

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = this.getAttribute("href").substring(1); // Obtener el ID de la sección

      // Mostrar la sección seleccionada
      showSection(targetSection);

      // Activar el enlace correspondiente
      activateLink(targetSection);
    });
  });

  // Agregar evento click al logo para que funcione como un enlace al inicio
  headerLogo.addEventListener("click", function (e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto
    const targetSection = "home"; // Sección a mostrar

    // Mostrar la sección seleccionada
    showSection(targetSection);

    // Activar el enlace correspondiente
    activateLink(targetSection);
  });

  // Llamar a activateLink al cargar la página para resaltar el enlace correspondiente
  const initialActiveSection = document.querySelector("main section.active");
  if (initialActiveSection) {
    activateLink(initialActiveSection.getAttribute("id"));
    // Asegúrate de que la sección inicial se muestre y tenga animación
    showSection(initialActiveSection.getAttribute("id")); // Muestra la sección activa inicialmente
  }

  // Función para manejar el formulario de contacto
  radioOptions.forEach((option) => {
    option.addEventListener("change", function () {
      const messageInput = document.getElementById("message");
      if (this.id === "get-quote") {
        messageInput.value =
          "¡Estamos interesados ​​en sus servicios! Comuníquese con nosotros";
      }
    });
  });

  document.getElementById("say-hi").addEventListener("change", function () {
    if (this.checked) {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    }
  });
});

// Funciones para abrir y cerrar el modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "flex";
  setTimeout(() => {
    modal.classList.add("show");
    initCarousel(modal);
  }, 10);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

function initCarousel(modal) {
  const carousel = modal.querySelector(".carousel-inner");
  const prevBtn = modal.querySelector(".carousel-control.prev");
  const nextBtn = modal.querySelector(".carousel-control.next");
  const indicators = modal.querySelector(".carousel-indicators");

  let currentSlide = 0;
  const totalSlides = modal.querySelectorAll(".carousel-item").length;

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateIndicators();
  }

  function updateIndicators() {
    const indicatorElements = modal.querySelectorAll(".carousel-indicator");
    indicatorElements.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Create indicators
  indicators.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement("div");
    indicator.classList.add("carousel-indicator");
    if (i === 0) indicator.classList.add("active");
    indicators.appendChild(indicator);
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  updateCarousel();
}

// Initialize carousels for all modals when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    const carousel = modal.querySelector(".carousel");
    if (carousel) {
      initCarousel(modal);
    }
  });
});
