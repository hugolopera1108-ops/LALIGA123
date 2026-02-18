// Filtrar equipos
function filtrarEquipos(equipos, textoBusqueda, ciudad) {
    return equipos.filter(equipo => {
        const coincideTexto = textoBusqueda === '' || 
            equipo.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
            equipo.ciudad.toLowerCase().includes(textoBusqueda.toLowerCase());
        const coincideCiudad = ciudad === '' || equipo.ciudad === ciudad;
        return coincideTexto && coincideCiudad;
    });
}

// Obtener ciudades únicas
function obtenerCiudadesUnicas(equipos) {
    return [...new Set(equipos.map(e => e.ciudad))].sort();
}

// Filtrar partidos
function filtrarPartidos(partidos, jornada, equipo) {
    return partidos.filter(p => {
        const coincideJornada = !jornada || p.jornada === parseInt(jornada);
        const coincideEquipo = !equipo || 
            p.local.toLowerCase().includes(equipo.toLowerCase()) ||
            p.visitante.toLowerCase().includes(equipo.toLowerCase());
        return coincideJornada && coincideEquipo;
    });
}

// Obtener jornadas únicas
function obtenerJornadasUnicas(partidos) {
    return [...new Set(partidos.map(p => p.jornada))].sort((a,b) => a-b);
}