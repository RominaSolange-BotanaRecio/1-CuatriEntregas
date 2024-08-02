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

    let container = document.querySelector(".productos-container");

    productos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Stock: ${producto.stock}</p>
            <input type="number" class="cantidad" min="1" max="${producto.stock}" value="0">
            <button class="btn-comprar">Comprar</button>
        `;
        container.appendChild(div);

        let cantidadInput = div.querySelector(".cantidad");
        div.querySelector(".btn-comprar").addEventListener("click", function () {
            agregarAlCarrito(producto.id, producto.precio, cantidadInput.value);
        });
    });
}

function agregarAlCarrito(id, precio, cantidad) {
    let total = sessionStorage.getItem("total") ? parseFloat(sessionStorage.getItem("total")) : 0;
    let nuevoTotal = total + (precio * cantidad);
    sessionStorage.setItem("total", nuevoTotal);
    console.log(`Producto ${id} agregado al carrito. Cantidad: ${cantidad}. Total: $${nuevoTotal}`);
}

function calcularTotal() {
    let total = sessionStorage.getItem("total") ? parseFloat(sessionStorage.getItem("total")) : 0;
    let totalContainer = document.getElementById("total-container");
    totalContainer.innerHTML = `El total de tu compra es $${total}`;
}

function enviarFormulario() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let mensaje = document.getElementById("mensaje").value;

    let datos = `Nombre: ${nombre}\nApellido: ${apellido}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`;

    // Aquí se debería enviar el formulario a un archivo txt o al servidor.
    console.log(datos);
    alert("Formulario enviado correctamente.");
}