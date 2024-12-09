// Selección de elementos del DOM
const formulario = document.getElementById('formulario-opinion');
const carouselOpiniones = document.getElementById('carousel-opiniones');

// Cargar las opiniones guardadas desde el localStorage cuando la página se carga
window.onload = function () {
    // Recuperar las opiniones del localStorage
    const opinionesGuardadas = JSON.parse(localStorage.getItem('opiniones')) || [];

    // Mostrar las opiniones guardadas
    opinionesGuardadas.forEach(opinion => {
        mostrarOpinion(opinion);
    });
};

// Función para mostrar una opinión en el carrusel
function mostrarOpinion(opinion) {
    const nuevaOpinion = document.createElement('div');
    nuevaOpinion.classList.add('opinion');
    nuevaOpinion.innerHTML = `
        <p>${opinion.mensaje}</p>
        <h4>${opinion.nombre} (${opinion.email})</h4>
    `;
    carouselOpiniones.appendChild(nuevaOpinion);
}

// Escuchar el evento 'submit' del formulario
formulario.addEventListener('submit', function (event) {
    // Evitar que el formulario recargue la página
    event.preventDefault();

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validar que los campos requeridos no estén vacíos
    if (nombre === '' || email === '' || mensaje === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Crear un objeto con la nueva opinión
    const nuevaOpinion = {
        nombre: nombre,
        email: email,
        mensaje: mensaje
    };

    // Recuperar las opiniones guardadas en el localStorage
    const opinionesGuardadas = JSON.parse(localStorage.getItem('opiniones')) || [];

    // Agregar la nueva opinión al arreglo de opiniones
    opinionesGuardadas.push(nuevaOpinion);

    // Guardar las opiniones actualizadas en el localStorage
    localStorage.setItem('opiniones', JSON.stringify(opinionesGuardadas));

    // Mostrar la nueva opinión en el carrusel
    mostrarOpinion(nuevaOpinion);

    // Limpiar los campos del formulario
    formulario.reset();
});

// Variables de los productos y el contador
const productos = document.querySelectorAll('.item-menu');  // Todos los productos
const contadorProductos = document.getElementById('contador-productos');
const totalGasto = document.getElementById('total-gasto');
const botonOrdenar = document.getElementById('boton-ordenar');
const botonOrdenarBanner = document.getElementById('boton-ordenar-banner');
const contadorSection = document.getElementById('contador');  // Sección de contador

// Inicializamos el contador y el total
let contador = 0;
let sumaTotal = 0;

// Precios de los productos
const precios = {
    "hamburguesa-clasica": 350,
    "hamburguesa-con-huevo": 400,
    "hamburguesa-doble-carne": 450,
    "hamburguesa-bbq": 470,
    "hamburguesa-con-bacon": 420,
    "hamburguesa-vegetariana": 390
};

// Función para mostrar los productos y permitir su selección
function habilitarSeleccion() {
    productos.forEach(producto => {
        producto.classList.add('seleccionable');  // Hacer los productos seleccionables
        producto.style.cursor = 'pointer';  // Cambiar el cursor a pointer (mano)
        
        // Evento para seleccionar el producto
        producto.addEventListener('click', function() {
            // Incrementamos el contador
            contador++;

            // Sumamos el precio del producto al total
            const idProducto = producto.getAttribute('data-id');
            sumaTotal += precios[idProducto];

            // Actualizamos el contador y el total
            contadorProductos.textContent = contador;
            totalGasto.textContent = `$${sumaTotal.toFixed(2)}`;
        });
    });
}

// Mostrar la sección de contador y habilitar selección de productos al hacer clic en el botón "Ordenar"
function mostrarContador() {
    // Muestra la sección del contador
    contadorSection.style.display = 'block';
    
    // Habilita la selección de productos
    habilitarSeleccion();
}

// Asignamos la función a los botones "Ordenar"
botonOrdenar.addEventListener('click', mostrarContador);
botonOrdenarBanner.addEventListener('click', mostrarContador);

// Galería de imágenes
let slideIndex = 0;

function cambiarImagen(n) {
    slideIndex += n;
    mostrarImagen(slideIndex);
}

function mostrarImagen(n) {
    const slides = document.querySelectorAll('.slide');
    const banner = document.querySelector('.banner'); // Sección del banner
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    // Desplazar las imágenes
    const offset = -slideIndex * 100; // Para mover la imagen correcta
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;

    // Cambiar el fondo del banner a la imagen activa
    const imagenFondo = slides[slideIndex].style.backgroundImage;
    banner.style.backgroundImage = imagenFondo;
}

// Cambiar imagen automáticamente cada 5 segundos
setInterval(() => {
    slideIndex++;
    mostrarImagen(slideIndex);
}, 5000); // Cambia cada 5 segundos
