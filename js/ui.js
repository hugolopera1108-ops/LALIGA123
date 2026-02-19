// Mostrar equipos en la página (CON IMÁGENES LOCALES)
function mostrarEquipos(equipos, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    
    if (!equipos || equipos.length === 0) {
        contenedor.innerHTML = '<p style="color: red; text-align: center;">No se encontraron equipos</p>';
        return;
    }
    
    // Detectar si estamos en la raíz o en pages para las rutas de imágenes
    const rutaBase = window.location.pathname.includes('/pages/') ? '../' : '';
    
    let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">';
    
    equipos.forEach(equipo => {
        html += `
            <div style="background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center;">
                <div style="width: 100px; height: 100px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; background: #f0f0f0; border-radius: 50%; border: 3px solid #ffd700;">
                    <img src="${rutaBase}${equipo.logo}" 
                         alt="${equipo.nombre}" 
                         style="width: 70px; height: 70px; object-fit: contain;"
                         onerror="this.onerror=null; this.style.display='none'; this.parentNode.innerHTML += '<span style=\'font-size: 40px;\'>⚽</span>'">
                </div>
                <h3 style="margin: 10px 0; color: #1f1f2e;">${equipo.nombre}</h3>
                <p style="margin: 5px 0;"><strong>📍 Ciudad:</strong> ${equipo.ciudad}</p>
                <p style="margin: 5px 0;"><strong>🏟️ Estadio:</strong> ${equipo.estadio}</p>
                <p style="margin: 5px 0;"><strong>📅 Fundación:</strong> ${equipo.fundacion}</p>
                <p style="margin: 5px 0;"><strong>👔 Entrenador:</strong> ${equipo.entrenador}</p>
            </div>
        `;
    });
    
    html += '</div>';
    contenedor.innerHTML = html;
}

// Mostrar tabla de clasificación (CON IMÁGENES LOCALES)
function mostrarTabla(clasificacion, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    
    if (!clasificacion || clasificacion.length === 0) {
        contenedor.innerHTML = '<p style="color: red; text-align: center;">No hay datos de clasificación</p>';
        return;
    }
    
    // Detectar si estamos en la raíz o en pages para las rutas de imágenes
    const rutaBase = window.location.pathname.includes('/pages/') ? '../' : '';
    
    let html = `
        <div style="overflow-x: auto; background: white; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #1f1f2e; color: #ffd700;">
                        <th style="padding: 12px;">Pos</th>
                        <th style="padding: 12px;">Equipo</th>
                        <th style="padding: 12px;">PJ</th>
                        <th style="padding: 12px;">PG</th>
                        <th style="padding: 12px;">PE</th>
                        <th style="padding: 12px;">PP</th>
                        <th style="padding: 12px;">GF</th>
                        <th style="padding: 12px;">GC</th>
                        <th style="padding: 12px;">DG</th>
                        <th style="padding: 12px;">Pts</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    clasificacion.forEach((equipo, index) => {
        let bgColor = 'white';
        if (index < 4) bgColor = '#e8f5e9'; // Champions
        else if (index < 6) bgColor = '#fff3e0'; // Europa
        else if (index > 16) bgColor = '#ffebee'; // Descenso
        
        // Buscar el logo del equipo
        let logoUrl = '';
        if (equiposData && equiposData.equipos) {
            const equipoEncontrado = equiposData.equipos.find(e => e.nombre === equipo.equipo);
            if (equipoEncontrado) {
                logoUrl = equipoEncontrado.logo;
            }
        }
        
        html += `
            <tr style="border-bottom: 1px solid #ddd; background: ${bgColor};">
                <td style="padding: 12px; text-align: center;"><strong>${equipo.posicion}</strong></td>
                <td style="padding: 12px; display: flex; align-items: center; gap: 10px;">
                    <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: #f0f0f0; border-radius: 50%; border: 2px solid #ffd700;">
                        <img src="${rutaBase}${logoUrl}" 
                             alt="${equipo.equipo}" 
                             style="width: 26px; height: 26px; object-fit: contain;"
                             onerror="this.onerror=null; this.style.display='none'; this.parentNode.innerHTML += '<span style=\'font-size: 18px;\'>⚽</span>'">
                    </div>
                    <strong>${equipo.equipo}</strong>
                </td>
                <td style="padding: 12px; text-align: center;">${equipo.pj}</td>
                <td style="padding: 12px; text-align: center;">${equipo.pg}</td>
                <td style="padding: 12px; text-align: center;">${equipo.pe}</td>
                <td style="padding: 12px; text-align: center;">${equipo.pp}</td>
                <td style="padding: 12px; text-align: center;">${equipo.gf}</td>
                <td style="padding: 12px; text-align: center;">${equipo.gc}</td>
                <td style="padding: 12px; text-align: center;">${equipo.dg}</td>
                <td style="padding: 12px; text-align: center;"><strong>${equipo.puntos}</strong></td>
            </tr>
        `;
    });
    
    html += '</tbody></table></div>';
    contenedor.innerHTML = html;
}

// Mostrar partidos (VERSIÓN DEFINITIVA - TODO ALINEADO)
function mostrarPartidos(partidos, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    
    if (!partidos || partidos.length === 0) {
        contenedor.innerHTML = '<p style="color: red; text-align: center;">No hay partidos disponibles</p>';
        return;
    }
    
    // Detectar si estamos en la raíz o en pages para las rutas de imágenes
    const rutaBase = window.location.pathname.includes('/pages/') ? '../' : '';
    
    let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">';
    
    partidos.forEach(partido => {
        const esJugado = partido.resultado !== 'vs';
        const fecha = new Date(partido.fecha);
        const fechaStr = fecha.toLocaleDateString('es-ES');
        
        // Buscar logos de los equipos
        let logoLocal = '', logoVisitante = '';
        if (equiposData && equiposData.equipos) {
            const local = equiposData.equipos.find(e => e.nombre === partido.local);
            const visitante = equiposData.equipos.find(e => e.nombre === partido.visitante);
            if (local) logoLocal = local.logo;
            if (visitante) logoVisitante = visitante.logo;
        }
        
        html += `
            <div style="background: white; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); display: flex; flex-direction: column; height: 100%;">
                <!-- Cabecera con jornada -->
                <div style="padding: 15px 15px 0 15px;">
                    <div style="background: #ffd700; color: #1f1f2e; padding: 5px 10px; border-radius: 15px; display: inline-block; font-weight: bold;">
                        Jornada ${partido.jornada}
                    </div>
                </div>
                
                <!-- Contenedor principal que ocupa todo el espacio disponible -->
                <div style="flex: 1; padding: 15px; display: flex; flex-direction: column;">
                    <!-- Zona de equipos y resultado - centrado verticalmente -->
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                        <!-- Equipo Local -->
                        <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                            <div style="width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; background: #f0f0f0; border-radius: 50%; border: 2px solid #ffd700;">
                                <img src="${rutaBase}${logoLocal}" 
                                     alt="${partido.local}" 
                                     style="width: 50px; height: 50px; object-fit: contain;"
                                     onerror="this.onerror=null; this.style.display='none'; this.parentNode.innerHTML += '<span style=\'font-size: 30px;\'>⚽</span>'">
                            </div>
                            <span style="font-weight: 600; text-align: center; font-size: 0.9rem;">${partido.local}</span>
                        </div>
                        
                        <!-- Resultado -->
                        <div style="min-width: 60px; text-align: center;">
                            <span style="font-size: 1.8rem; font-weight: bold; color: #1f1f2e;">${partido.resultado}</span>
                        </div>
                        
                        <!-- Equipo Visitante -->
                        <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                            <div style="width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; background: #f0f0f0; border-radius: 50%; border: 2px solid #ffd700;">
                                <img src="${rutaBase}${logoVisitante}" 
                                     alt="${partido.visitante}" 
                                     style="width: 50px; height: 50px; object-fit: contain;"
                                     onerror="this.onerror=null; this.style.display='none'; this.parentNode.innerHTML += '<span style=\'font-size: 30px;\'>⚽</span>'">
                            </div>
                            <span style="font-weight: 600; text-align: center; font-size: 0.9rem;">${partido.visitante}</span>
                        </div>
                    </div>
                    
                    <!-- Información del partido -->
                    <div style="border-top: 1px solid #eee; padding-top: 15px; margin-top: auto;">
                        <p style="margin: 5px 0;"><strong>📅 Fecha:</strong> ${fechaStr}</p>
                        <p style="margin: 5px 0;"><strong>⏰ Hora:</strong> ${partido.hora}</p>
                        <p style="margin: 5px 0;"><strong>🏟️ Estadio:</strong> ${partido.estadio}</p>
                    </div>
                </div>
                
                <!-- Estado del partido - SIEMPRE AL FINAL -->
                <div style="padding: 12px; text-align: center; border-radius: 0 0 10px 10px; background: ${esJugado ? '#d4edda' : '#fff3cd'}; color: ${esJugado ? '#155724' : '#856404'}; font-weight: 600; border-top: 1px solid rgba(0,0,0,0.05);">
                    ${esJugado ? '✅ Finalizado' : '⏳ Próximamente'}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    contenedor.innerHTML = html;
}