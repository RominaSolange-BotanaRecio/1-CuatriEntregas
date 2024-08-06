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
        { id: 6, nombre: "Shampoo y Acondicionador Dove, 400ml", precio: 3350, stock: 1, imagen: "imagenes/ShampooAcondicionador.webp" },
        { id: 7, nombre: "Papel higiénico, 4 rollos de 80 mts", precio: 4400, stock: 6, imagen: "imagenes/Papel-Higienico.webp" },
        { id: 8, nombre: "Jabón Kenia por 3 unidades", precio: 850, stock: 3, imagen: "imagenes/Jabon.webp" },
        { id: 9, nombre: "Yerba Rosamonte, 1kg", precio: 3500, stock: 7, imagen: "imagenes/YerbaRosamonte.webp" },
        { id: 10, nombre: "Té en sobre Green Hill, 16 saquitos", precio: 550, stock: 5, imagen: "imagenes/Tecitos.jpg" },
        { id: 11, nombre: "Jabón líquido Algabo, 200ml", precio: 1600, stock: 4, imagen: "imagenes/Jabon liquido.jpg" },
        { id: 12, nombre: "Harina Pureza Leudante, 1kg", precio: 650, stock: 2, imagen: "imagenes/Harina.jpg" },
    ];

    let container = document.querySelector(".productos-container");
    let totalCompraElem = document.getElementById("total-compra");
    let calcularTotalBtn = document.getElementById("calcular-total");

    let botonesCompra = {};

    function mostrarProductos() {
        container.innerHTML = "";
        productos.forEach(producto => {
            let productoDiv = `
                <div class="producto" id="producto-${producto.id}">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio.toFixed(2)}</p>
                    <p>Stock: ${producto.stock}</p>
                    <input type="number" min="0" max="${producto.stock}" value="0" class="cantidad-input">
                    <button class="boton-compra">Comprar</button>
                </div>
            `;
            container.innerHTML += productoDiv;
        });

        document.querySelectorAll(".boton-compra").forEach(boton => {
            let productoDiv = boton.closest('.producto');
            let id = parseInt(productoDiv.id.replace('producto-', ''));
            botonesCompra[id] = boton;

            boton.addEventListener("click", function() {
                let cantidadInput = productoDiv.querySelector(".cantidad-input");
                procesarCompra(id, cantidadInput.value);
            });
        });
    }

    function procesarCompra(id, cantidad) {
        let productoEncontrado = false;
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === id) {
                let producto = productos[i];
                producto.stock -= parseInt(cantidad);
                if (producto.stock < 0) {
                    producto.stock = 0;
                    alert("No hay suficiente stock.");
                }
                mostrarProductos(); // Actualizar la vista de productos
                productoEncontrado = true;
                break;
            }
        }
        if (!productoEncontrado) {
            console.error("Producto no encontrado");
        }
    }

    function calcularTotal() {
        let total = 0;
        document.querySelectorAll(".cantidad-input").forEach(input => {
            let productoDiv = input.closest('.producto');
            let id = parseInt(productoDiv.id.replace('producto-', ''));
            let cantidad = parseInt(input.value);
            let producto = productos.find(p => p.id === id);
            if (producto) {
                total += producto.precio * cantidad;
            }
        });
        totalCompraElem.textContent = `Total: $${total.toFixed(2)}`;
    }

    mostrarProductos();
    calcularTotalBtn.addEventListener("click", calcularTotal);
}

function enviarFormulario() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let mensaje = document.getElementById("mensaje").value;

    if (telefono.length > 15) {
        alert("El número de teléfono no puede tener más de 15 dígitos.");
        return;
    }

    let datosFormulario = `Nombre: ${nombre}\nApellido: ${apellido}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}\n\n`;

    let enlace = document.createElement("a");
    enlace.href = "data:text/plain;charset=utf-8," + encodeURIComponent(datosFormulario);
    enlace.download = "contacto.txt";
    enlace.textContent = "Descargar formulario";
    document.body.appendChild(enlace);

    enlace.click();
    document.body.removeChild(enlace);

    console.log("Formulario enviado:");
    console.log(datosFormulario);
}

// contenedor con clase "carrusel"
const carruselContainer = document.querySelector(".carrusel");
const carruselItems = carruselContainer.querySelectorAll(".oferta");

let currentIndex = 0;

function mostrarSiguiente() {
    carruselItems[currentIndex].classList.remove("visible");
    currentIndex = (currentIndex + 1) % carruselItems.length;
    carruselItems[currentIndex].classList.add("visible");
}

setInterval(mostrarSiguiente, 3000);