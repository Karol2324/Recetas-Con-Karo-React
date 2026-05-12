import React from 'react';

// 1. Datos base (Fuera de la función para que sea más limpio)
const recetas = [
  { nombre: "Pasta Carbonara", precio: 1200, cantidad: 5 },
  { nombre: "Ensalada César", precio: 25, cantidad: 20 },
  { nombre: "Sopa de Tomate", precio: 45, cantidad: 15 },
  { nombre: "Lasaña de Carne", precio: 300, cantidad: 7 },
  { nombre: "Tostada de Aguacate", precio: 10, cantidad: 50 }
];

function App() {
  // --- EJERCICIO 1 ---
  const nombresRecetas = recetas.map(receta => receta.nombre.toUpperCase());
  const recetasEconomicas = recetas.filter(receta => receta.precio < 50);
  const recetaEncontrada = recetas.find(receta => receta.nombre === "Lasaña de Carne");

  // --- EJERCICIO 2 ---
  const bajoStock = recetas.filter(receta => receta.cantidad < 10);
  const analiticaBajoStock = bajoStock.map(receta => ({
    nombre: receta.nombre,
    valorTotal: receta.precio * receta.cantidad
  }));
  const valorInventarioBajo = analiticaBajoStock.reduce((acumulador, item) => {
    return acumulador + item.valorTotal;
  }, 0);

  // --- EJERCICIO 3 ---
  const valorTotalTodo = recetas.reduce((acc, receta) => {
    return acc + (receta.precio * receta.cantidad);
  }, 0);

  const recetaMasStock = recetas.reduce((max, receta) => {
    return (receta.cantidad > max.cantidad) ? receta : max;
  }, recetas[0]);

  const clasificacion = recetas.reduce((acc, receta) => {
    if (receta.precio > 100) {
      acc.caros.push(receta.nombre);
    } else {
      acc.baratos.push(receta.nombre);
    }
    return acc;
  }, { caros: [], baratos: [] });

  // --- RENDERIZADO (VISTA) ---
  return (
    <>
      <header>
        <h1>📖 Libro de Recetas Digital</h1>
      </header>

      <main>
        <section>
          <h2>Nuestro Menú</h2>
          {recetas.map((receta, index) => (
            <article key={index}>
              <h3>{receta.nombre}</h3>
              <p>Precio: ${receta.precio}</p>
              <p>Disponibles: {receta.cantidad} porciones</p>
              <button>Pedir ahora</button>
            </article>
          ))}
        </section>

        <section>
          <p>
            <strong>Receta destacada buscada:</strong> {recetaEncontrada ? recetaEncontrada.nombre : "No encontrada"}
          </p>
        </section>

        <section>
          <hr />
          <h2>📊 Resumen General del Negocio</h2>
          <p>Valor total de toda la cocina: <strong>${valorTotalTodo}</strong></p>
          <p>La receta que más tenemos es: <strong>{recetaMasStock.nombre}</strong> ({recetaMasStock.cantidad} porciones)</p>
          
          <article>
            <h3>Categoría Premium (Más de $100):</h3>
            <p>{clasificacion.caros.join(", ") || "Ninguna"}</p>
          </article>

          <article>
            <h3>Categoría Económica (Hasta $100):</h3>
            <p>{clasificacion.baratos.join(", ")}</p>
          </article>

          <footer style={{marginTop: '20px'}}>
            <p>⚠️ Valor en stock crítico (menos de 10 unidades): <strong>${valorInventarioBajo}</strong></p>
          </footer>
        </section>
      </main>
    </>
  );
}

export default App;