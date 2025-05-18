const productos = [
  { nombre: "Camisa", precio: 50000 },
  { nombre: "Pantalón", precio: 80000 },
  { nombre: "Zapatillas", precio: 150000 },
  { nombre: "Gorra", precio: 20000 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const formAgregar = document.getElementById("form-agregar");
const inputProducto = document.getElementById("input-producto");
const listaProductos = document.getElementById("lista-productos");


function mostrarProductosHTML() {
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
    console.log(` ${producto.nombre} agregado al carrito.`);
    guardarCarrito();
    mostrarResumen();
  } else {
    console.log(` Producto "${nombreProducto}" no encontrado.`);
  }
}


function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


function mostrarResumen() {
  console.log(" Carrito actualizado:");
  carrito.forEach(p => {
    console.log(`- ${p.nombre}: $${p.precio}`);
  });
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  console.log(`Total a pagar: $${total}`);
}


formAgregar.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = inputProducto.value.trim();
  if (nombre) {
    agregarAlCarrito(nombre);
    inputProducto.value = "";
  }
});


mostrarProductosHTML();
mostrarResumen();

localStorage.clear();
