// Variables globales para almacenar los datos
let equiposData = null;
let tablaData = null;
let partidosData = null;

// Función para cargar datos desde JSON (detecta si estamos en pages o raíz)
async function cargarDatos(tipo) {
    try {
        // Detectar si estamos en pages o en la raíz
        const rutaBase = window.location.pathname.includes('/pages/') ? '../' : '';
        const respuesta = await fetch(`${rutaBase}data/${tipo}.json`);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        const datos = await respuesta.json();
        console.log(`✅ Datos cargados: ${tipo}`, datos);
        return datos;
    } catch (error) {
        console.error(`❌ Error cargando ${tipo}:`, error);
        return null;
    }
}

// Función para cargar todos los datos
async function cargarTodosLosDatos() {
    console.log('🔄 Cargando todos los datos...');
    
    equiposData = await cargarDatos('equipos');
    tablaData = await cargarDatos('tabla');
    partidosData = await cargarDatos('partidos');
    
    console.log('📊 Datos cargados:', {
        equipos: equiposData?.equipos?.length || 0,
        tabla: tablaData?.clasificacion?.length || 0,
        partidos: partidosData?.partidos?.length || 0
    });
}

// Cargar automáticamente cuando se incluya el script
document.addEventListener('DOMContentLoaded', () => {
    console.log('📦 data.js cargado correctamente');
});