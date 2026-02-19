// Función para obtener datos de cualquier JSON
async function fetchData(file) {
    try {
        const response = await fetch(`../data/${file}`);
        return await response.json();
    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

// Exportar para que otros archivos lo usen
window.fetchData = fetchData;

export async function cargarJSON(url) {
    const res = await fetch(url);
    return await res.json();
}
console.log("Módulo de datos cargado");

// Variables globales para almacenar los datos
let equiposData = null;
let tablaData = null;
let partidosData = null;

// Función para cargar todos los datos
async function cargarTodosLosDatos() {
    equiposData = await cargarDatos('equipos');
    tablaData = await cargarDatos('tabla');
    partidosData = await cargarDatos('partidos');
}