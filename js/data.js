// Cargar datos desde los archivos JSON
async function cargarDatos(tipo) {
    try {
        const respuesta = await fetch(`../data/${tipo}.json`);
        if (!respuesta.ok) {
            throw new Error('No se pudieron cargar los datos');
        }
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

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