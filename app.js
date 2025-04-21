document.addEventListener("DOMContentLoaded", cargarPokemonesAleatorios);
document.getElementById("btnBuscar").addEventListener("click", buscarPokemon);

async function buscarPokemon() {
  const nombre = document.getElementById("inputBusqueda").value.trim().toLowerCase();
  const contenedor = document.getElementById("contenedorResultados");
  contenedor.innerHTML = "";

  if (!nombre) {
    contenedor.innerHTML = "<p>Por favor escribe un nombre.</p>";
    return;
  }

  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!respuesta.ok) throw new Error("No encontrado");
    const datos = await respuesta.json();
    mostrarPokemon(datos);
  } catch (error) {
    contenedor.innerHTML = "<p>Pokémon no encontrado. Intenta con otro nombre.</p>";
  }
}

function mostrarPokemon(pokemon) {
  const contenedor = document.getElementById("contenedorResultados");
  const card = document.createElement("div");
  card.classList.add("card");

  const tipos = pokemon.types.map(t => t.type.name).join(", ");

  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h3>${capitalize(pokemon.name)}</h3>
    <p>Tipo: ${tipos}</p>
  `;

  contenedor.appendChild(card);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function cargarPokemonesAleatorios() {
  const contenedor = document.getElementById("contenedorResultados");
  contenedor.innerHTML = "<p>Cargando Pokémon...</p>";
  contenedor.innerHTML = "";

  const idsAleatorios = generarNumerosAleatorios(10, 1, 1010); // 1010 es el ID máximo aproximado

  for (const id of idsAleatorios) {
    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (respuesta.ok) {
        const datos = await respuesta.json();
        mostrarPokemon(datos);
      }
    } catch (error) {
      console.log(`Error al cargar el Pokémon con ID ${id}`);
    }
  }
}

function generarNumerosAleatorios(cantidad, min, max) {
  const numeros = new Set();
  while (numeros.size < cantidad) {
    const aleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    numeros.add(aleatorio);
  }
  return [...numeros];
}
