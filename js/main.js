let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const formAgregar = document.getElementById("form-agregar");
const inputProducto = document.getElementById("input-producto");
const listaProductos = document.getElementById("lista-productos");

function mostrarProductosHTML() {
  listaProductos.innerHTML = "";
  productos.forEach(producto => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio}`;
    listaProductos.appendChild(li);
  });
}

function agregarAlCarrito(nombreProducto) {
  const producto = productos.find(p => p.nombre.toLowerCase() === nombreProducto.toLowerCase());
  if (producto) {
    carrito.push(producto);
    guardarCarrito();
    mostrarResumen();
    Toastify({
      text: `${producto.nombre} agregado al carrito`,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#4caf50"
    }).showToast();
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Producto no encontrado',
      text: `No se encontró "${nombreProducto}" en la lista.`
    });
  }
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  mostrarResumen();
  Toastify({
    text: `Producto eliminado`,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#ff6b6b"
  }).showToast();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarResumen() {
  const listaCarrito = document.getElementById("carrito-lista");
  const totalCarrito = document.getElementById("carrito-total");

  listaCarrito.innerHTML = "";
  carrito.forEach((p, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${p.nombre} - $${p.precio} <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
    listaCarrito.appendChild(li);
  });

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  totalCarrito.textContent = `Total: $${total}`;
}

formAgregar.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = inputProducto.value.trim();
  if (nombre) {
    agregarAlCarrito(nombre);
    inputProducto.value = "";
  }
});


fetch("productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarProductosHTML();
    mostrarResumen();
  })
  .catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Error al cargar productos',
      text: error.message
    });
  });
