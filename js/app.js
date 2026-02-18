// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Cargando página...');
    
    // Cargar datos
    await cargarTodosLosDatos();
    
    // Determinar qué página estamos
    const path = window.location.pathname;
    
    if (path.includes('equipos.html')) {
        console.log('Página de equipos');
        if (equiposData?.equipos) {
            mostrarEquipos(equiposData.equipos, 'equipos-contenedor');
            
            // Configurar filtros
            const searchInput = document.getElementById('buscar-equipo');
            const ciudadSelect = document.getElementById('filtrar-ciudad');
            
            if (searchInput && ciudadSelect) {
                // Llenar ciudades
                const ciudades = obtenerCiudadesUnicas(equiposData.equipos);
                ciudades.forEach(ciudad => {
                    const option = document.createElement('option');
                    option.value = ciudad;
                    option.textContent = ciudad;
                    ciudadSelect.appendChild(option);
                });
                
                // Eventos
                function filtrar() {
                    const filtrados = filtrarEquipos(
                        equiposData.equipos,
                        searchInput.value,
                        ciudadSelect.value
                    );
                    mostrarEquipos(filtrados, 'equipos-contenedor');
                }
                
                searchInput.addEventListener('input', filtrar);
                ciudadSelect.addEventListener('change', filtrar);
            }
        }
    }
    else if (path.includes('tabla.html')) {
        console.log('Página de tabla');
        if (tablaData?.clasificacion) {
            mostrarTabla(tablaData.clasificacion, 'tabla-contenedor');
        }
    }
    else if (path.includes('partidos.html')) {
        console.log('Página de partidos');
        if (partidosData?.partidos) {
            mostrarPartidos(partidosData.partidos, 'partidos-contenedor');
            
            // Configurar filtros
            const jornadaSelect = document.getElementById('filtrar-jornada');
            const equipoInput = document.getElementById('buscar-equipo-partido');
            
            if (jornadaSelect && equipoInput) {
                // Llenar jornadas
                const jornadas = obtenerJornadasUnicas(partidosData.partidos);
                jornadas.forEach(jornada => {
                    const option = document.createElement('option');
                    option.value = jornada;
                    option.textContent = `Jornada ${jornada}`;
                    jornadaSelect.appendChild(option);
                });
                
                // Eventos
                function filtrar() {
                    const filtrados = filtrarPartidos(
                        partidosData.partidos,
                        jornadaSelect.value,
                        equipoInput.value
                    );
                    mostrarPartidos(filtrados, 'partidos-contenedor');
                }
                
                jornadaSelect.addEventListener('change', filtrar);
                equipoInput.addEventListener('input', filtrar);
            }
        }
    }
    else if (path.includes('contacto.html')) {
        console.log('Página de contacto');
        const formulario = document.getElementById('formularioContacto');
        
        if (formulario) {
            formulario.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Validación simple
                const nombre = document.getElementById('nombre')?.value;
                const email = document.getElementById('email')?.value;
                const mensaje = document.getElementById('mensaje')?.value;
                
                if (nombre && email && mensaje && email.includes('@')) {
                    mostrarMensajeExito('¡Mensaje enviado!');
                    formulario.reset();
                } else {
                    alert('Por favor, completa todos los campos correctamente');
                }
            });
        }
    }
    else {
        console.log('Página de inicio');
        if (partidosData?.partidos) {
            const ultimos = partidosData.partidos.slice(0, 3);
            mostrarPartidos(ultimos, 'ultimos-partidos');
        }
    }
});