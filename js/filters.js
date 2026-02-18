// Cargar datos desde JSON
async function cargarDatos(tipo) {
    try {
        // Detectar si estamos en la raíz o en pages
        const ruta = window.location.pathname.includes('/pages/') ? '../' : '';
        const respuesta = await fetch(`${ruta}data/${tipo}.json`);
        
        if (!respuesta.ok) {
            throw new Error('No se pudo cargar');
        }
        
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error('Error cargando', tipo, error);
        return null;
    }
}

// Variables globales
let equiposData = null;
let tablaData = null;
let partidosData = null;

// Cargar todos los datos
async function cargarTodosLosDatos() {
    equiposData = await cargarDatos('equipos');
    tablaData = await cargarDatos('tabla');
    partidosData = await cargarDatos('partidos');
    
    console.log('Datos cargados:', { 
        equipos: equiposData?.equipos?.length || 0,
        tabla: tablaData?.clasificacion?.length || 0,
        partidos: partidosData?.partidos?.length || 0
    });
}