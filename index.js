const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar JSON en las solicitudes
app.use(express.json());

// Datos simulados para clientes y productos
let clientes = [
  { id: 1, nombre: "Cliente 1" },
  { id: 2, nombre: "Cliente 2" },
  { id: 3, nombre: "Cliente 3" }
];

let productos = [
  { id: 1, nombre: "Producto 1", precio: 100 },
  { id: 2, nombre: "Producto 2", precio: 200 },
  { id: 3, nombre: "Producto 3", precio: 300 }
];

// Rutas

// Ruta para la página principal
app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

// Ruta para mostrar clientes
app.get('/clientes', (req, res) => {
  res.json(clientes);
});

// Ruta para mostrar productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Ruta POST para agregar un cliente
app.post('/clientes', (req, res) => {
  const nuevoCliente = { id: clientes.length + 1, ...req.body };
  clientes.push(nuevoCliente);
  res.status(201).json(nuevoCliente);
});

// Ruta PUT para actualizar un cliente
app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const index = clientes.findIndex(cliente => cliente.id == id);
  
  if (index !== -1) {
    clientes[index] = { ...clientes[index], ...req.body };
    res.json(clientes[index]);
  } else {
    res.status(404).send({ message: "Cliente no encontrado" });
  }
});

// Ruta DELETE para eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const index = clientes.findIndex(cliente => cliente.id == id);

  if (index !== -1) {
    const clienteEliminado = clientes.splice(index, 1);
    res.json(clienteEliminado);
  } else {
    res.status(404).send({ message: "Cliente no encontrado" });
  }
});

// Rutas similares para productos (POST, PUT, DELETE)
app.post('/productos', (req, res) => {
  const nuevoProducto = { id: productos.length + 1, ...req.body };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const index = productos.findIndex(producto => producto.id == id);
  
  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body };
    res.json(productos[index]);
  } else {
    res.status(404).send({ message: "Producto no encontrado" });
  }
});

app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  const index = productos.findIndex(producto => producto.id == id);

  if (index !== -1) {
    const productoEliminado = productos.splice(index, 1);
    res.json(productoEliminado);
  } else {
    res.status(404).send({ message: "Producto no encontrado" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
