
const productos = [
  { nombre: "Camisa", precio: 50000 },
  { nombre: "Pantalón", precio: 80000 },
  { nombre: "Zapatillas", precio: 150000 },
  { nombre: "Gorra", precio: 20000 }
];


let carrito = [];


function mostrarProductos() {
  console.log(" Productos disponibles:");
  productos.forEach((p, i) => {
    console.log(`${i + 1}. ${p.nombre} - $${p.precio}`);
  });
}


function agregarAlCarrito(nombreProducto) {
  const producto = productos.find(p => p.nombre.toLowerCase() === nombreProducto.toLowerCase());
  if (producto) {
    carrito.push(producto);
    console.log(` ${producto.nombre} agregado al carrito.`);
  } else {
    console.log(" Producto no encontrado.");
  }
}


function mostrarResumen() {
  console.log(" Resumen de tu compra:");
  carrito.forEach(p => {
    console.log(`- ${p.nombre}: $${p.precio}`);
  });
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  console.log(` Total a pagar: $${total}`);
}


function generarMensajeProductos() {
  let mensaje = " Productos disponibles:\n";
  productos.forEach((p, i) => {
    mensaje += `${i + 1}. ${p.nombre} - $${p.precio}\n`;
  });
  mensaje += "\n Escribí el nombre del producto que querés comprar:";
  return mensaje;
}


mostrarProductos(); 

let seguir = true;

while (seguir) {
  let nombre = prompt(generarMensajeProductos());
  agregarAlCarrito(nombre);

  seguir = confirm("¿Querés agregar otro producto?");
}

mostrarResumen();
