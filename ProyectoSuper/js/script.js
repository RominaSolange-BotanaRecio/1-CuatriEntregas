document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector(".productos-container")) {
        cargarProductos();
    }

    if (document.getElementById("calcular-total")) {
        document.getElementById("calcular-total").addEventListener("click", calcularTotal);
    }

    if (document.getElementById("contact-form")) {
        document.getElementById("contact-form").addEventListener("submit", function (e) {
            e.preventDefault();
            enviarFormulario();
        });
    }
});

function cargarProductos() {
    let productos = [
        { id: 1, nombre: "Arroz Molino Ala, 1kg", precio: 1800, stock: 10, imagen: "imagenes/Arroz.jpg" },
        { id: 2, nombre: "Azúcar Chango, 1kg", precio: 800, stock: 5, imagen: "imagenes/Azucar.jpg" },
        { id: 3, nombre: "Galletitas Variedad Terrabusi, 300grs", precio: 1300, stock: 8, imagen: "imagenes/Galletitas-Dorada-Terrabusi.jpg" },
        { id: 4, nombre: "Galletitas Oreos,TrixPack", precio: 2560, stock: 50, imagen: "imagenes/GalletitasOreo.webp" },
        { id: 5, nombre: "Jugo en sobre Tang, 12grs", precio: 300, stock: 4, imagen: "imagenes/juguitos.png" },
        { id: 6, nombre: "Shampoo y Acondicionador Dove, 400ml", precio: 350, stock: 1, imagen: "imagenes/ShampooAcondicionador.webp" },
        { id: 7, nombre: "Papel higiénico, 4 rollos de 80 mts", precio: 400, stock: 6, imagen: "imagenes/Papel-Higienico.webp" },
        { id: 8, nombre: "Jabón Kenia por 3 unidades", precio: 450, stock: 3, imagen: "imagenes/Jabon.webp" },
        { id: 9, nombre: "Yerba Rosamonte, 1kg", precio: 3500, stock: 7, imagen: "imagenes/YerbaRosamonte.webp" },
        { id: 10, nombre: "Té en sobre Green Hill, 16 saquitos", precio: 550, stock: 5, imagen: "imagenes/Tecitos.jpg" },
        { id: 11, nombre: "Jabón líquido Algabo, 200ml", precio: 1600, stock: 4, imagen: "imagenes/Jabon liquido.jpg" },
        { id: 12, nombre: "Harina Pureza Leudante, 1kg", precio: 650, stock: 2, imagen: "imagenes/Harina.jpg" },
    ];

    // Referencia a elementos del DOM
    let container = document.querySelector('.productos-container');
    let totalCompraElem = document.getElementById('total-compra');
    let calcularTotalBtn = document.getElementById('calcular-total');

    // Función para renderizar los productos
    function renderProductos() {
        container.innerHTML = '';
        productos.forEach(producto => {
            // Crear elementos para cada producto
            let productoDiv = document.createElement('div');
            productoDiv.className = 'producto';
            
            let imagen = document.createElement('img');
            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;

            let nombre = document.createElement('h3');
            nombre.textContent = producto.nombre;

            let precio = document.createElement('p');
            precio.textContent = `Precio: $${producto.precio.toFixed(2)}`;

            let stock = document.createElement('p');
            stock.textContent = `Stock: ${producto.stock}`;

            let cantidadInput = document.createElement('input');
            cantidadInput.type = 'number';
            cantidadInput.min = 0;
            cantidadInput.max = producto.stock;
            cantidadInput.value = 0;
            cantidadInput.dataset.id = producto.id;
            cantidadInput.className = 'cantidad-input';

            let botonCompra = document.createElement('button');
            botonCompra.textContent = 'Comprar';
            botonCompra.dataset.id = producto.id;
            botonCompra.className = 'boton-compra';
            botonCompra.addEventListener('click', function() {
                handleCompra(producto.id, cantidadInput.value);
            });

            productoDiv.appendChild(imagen);
            productoDiv.appendChild(nombre);
            productoDiv.appendChild(precio);
            productoDiv.appendChild(stock);
            productoDiv.appendChild(cantidadInput);
            productoDiv.appendChild(botonCompra);

            container.appendChild(productoDiv);
        });
    }

    // Maneja la compra de un producto
    function handleCompra(id, cantidad) {
        let producto = productos.find(p => p.id === parseInt(id));
        if (producto) {
            producto.stock -= parseInt(cantidad);
            if (producto.stock < 0) {
                producto.stock = 0;
                alert('No hay suficiente stock.');
            }
            renderProductos(); // Actualizar la vista de productos
        }
    }

    // Calcula el total de la compra
    function calcularTotal() {
        let total = 0;
        document.querySelectorAll('.cantidad-input').forEach(input => {
            let id = input.dataset.id;
            let cantidad = parseInt(input.value);
            let producto = productos.find(p => p.id === parseInt(id));
            if (producto) {
                total += producto.precio * cantidad;
            }
        });
        totalCompraElem.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Inicializar
    renderProductos();
    calcularTotalBtn.addEventListener('click', calcularTotal);
};

function enviarFormulario() {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;
    let mensaje = document.getElementById('mensaje').value;

    let datosFormulario = "Nombre: " + nombre + "\nApellido: " + apellido + "\nEmail: " + email + "\nTeléfono: " + telefono + "\nMensaje: " + mensaje + "\n\n";

    // Crear un enlace para descargar el archivo
    let enlace = document.createElement('a');
    enlace.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(datosFormulario);
    enlace.download = 'contacto.txt';
    enlace.textContent = 'Descargar formulario';
    document.body.appendChild(enlace);

    // Simular un clic en el enlace para iniciar la descarga
    enlace.click();

    // Eliminar el enlace después de la descarga
    document.body.removeChild(enlace);

    // Mostrar los datos en la consola
    console.log('Formulario enviado:');
    console.log(datosFormulario);
}

// contenedor con clase "carrusel"
const carruselContainer = document.querySelector('.carrusel');
const carruselItems = carruselContainer.querySelectorAll('.oferta'); // Los elementos del carrusel

let currentIndex = 0; // Índice actual del elemento visible

function mostrarSiguiente() {
    carruselItems[currentIndex].classList.remove('visible'); // Oculta el elemento actual
    currentIndex = (currentIndex + 1) % carruselItems.length; // Calcula el siguiente índice
    carruselItems[currentIndex].classList.add('visible'); // Muestra el siguiente elemento
}

// Configura un intervalo para cambiar automáticamente los elementos cada 3 segundos
setInterval(mostrarSiguiente, 1000);
