const proyectos = {
    aprendizaje: [
        {
            titulo: "Práctica 1",
            descripcion: "Mi primera práctica desarrollada con HTML y CSS básicos.",
            imagen: "./practicas/antes/practica1/img/selfie.jpeg",
            enlace: "./practicas/antes/practica1/index.html"
        },
        {
            titulo: "Práctica 2",
            descripcion: "Segunda práctica calificada, aplicando estructuras y estilos más complejos.",
            imagen: "./practicas/antes/practica2/img/practica2.jpeg",
            enlace: "./practicas/antes/practica2/index.html"
        },
        {
            titulo: "Práctica 3",
            descripcion: "Tercera práctica calificada donde hice uso de etiquetas y css un poco más estructurado.",
            imagen: "./practicas/antes/practica3/img/practica3.jpeg",
            enlace: "./practicas/antes/practica3/index.html"
        },
        {
            titulo: "Práctica 4",
            descripcion: "Cuarta práctica calificada donde consolidé el uso de diseño responsivo.",
            imagen: "./practicas/antes/practica4/image/tictactoe.jpeg",
            enlace: "./practicas/antes/practica4/index.html"
        },
    ],
    crecimiento: [
        {
            titulo: "Proyecto 1 – Versión Mejorada",
            descripcion: "Rediseñado con Tailwind CSS y animaciones interactivas con JavaScript.",
            imagen: "./practicas/despues/practica1/img/selfie.jpeg",
            enlace: "./practicas/despues/practica1/index.html",
            mejorado: true
        },
        {
            titulo: "Proyecto 2 – Versión Mejorada",
            descripcion: "Diseño responsive optimizado y elementos interactivos con JavaScript.",
            imagen: "./practicas/despues/practica2/img/preview.png",
            enlace: "./practicas/despues/practica2/index.html",
            mejorado: true
        },
        {
            titulo: "Proyecto 3 – Versión Mejorada",
            descripcion: "Rediseño con mejores prácticas en estructura, tipografía y paleta de colores.",
            imagen: "./practicas/despues/practica3/img/preview.png",
            enlace: "./practicas/despues/practica3/index.html",
            mejorado: true
        }
    ]
};

function cargarProyectos() {
    let containerAprendizaje = document.getElementById('proyectos-aprendizaje');
    let containerCrecimiento = document.getElementById('proyectos-crecimiento');

    // Cargar proyectos de aprendizaje
    proyectos.aprendizaje.forEach(proyecto => {
        let proyectoElement = document.createElement('div');
        proyectoElement.className = 'project-card border-2 border-cyan-400 bg-black/60 rounded-xl shadow-[0_0_10px_#00bfff] overflow-hidden hover:scale-105 transition-transform duration-300';

        proyectoElement.innerHTML = `
                    <a href="${proyecto.enlace}">
                        <img src="${proyecto.imagen}" alt="${proyecto.titulo}" class="w-full h-44 sm:h-48 object-cover" />
                    </a>
                    <div class="p-4">
                        <h4 class="text-lg sm:text-xl font-bold mb-1">${proyecto.titulo}</h4>
                        <p class="text-cyan-200 text-sm">${proyecto.descripcion}</p>
                    </div>
                `;

        containerAprendizaje.appendChild(proyectoElement);
    });

    // Cargar proyectos de crecimiento
    proyectos.crecimiento.forEach(proyecto => {
        let proyectoElement = document.createElement('div');
        let mejoradoClass = proyecto.mejorado ? 'relative border-2 border-cyan-400 bg-gradient-to-br from-black/80 to-cyan-900/40 rounded-xl shadow-[0_0_20px_#00bfff]' : 'border-2 border-cyan-400 bg-black/60 rounded-xl shadow-[0_0_10px_#00bfff]';

        proyectoElement.className = `project-card ${mejoradoClass} overflow-hidden hover:scale-105 transition-transform duration-300`;

        proyectoElement.innerHTML = `
                    <a href="${proyecto.enlace}">
                        <img src="${proyecto.imagen}" alt="${proyecto.titulo}" class="w-full h-44 sm:h-48 ${proyecto.titulo.includes('Proyecto 2') ? 'object-contain' : 'object-cover'} opacity-90 hover:opacity-100 transition" />
                    </a>
                    <div class="p-4">
                        <h4 class="text-lg sm:text-xl font-bold mb-1">${proyecto.titulo}</h4>
                        <p class="text-cyan-200 text-sm">${proyecto.descripcion}</p>
                        ${proyecto.mejorado ? '<span class="absolute top-2 right-2 bg-cyan-500 text-black text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-lg shadow-md">Mejorado</span>' : ''}
                    </div>
                `;

        containerCrecimiento.appendChild(proyectoElement);
    });
}

// Función para cargar proyectos destacados en el index (sección #recorrido)
function cargarProyectosDestacados() {
    const container = document.getElementById('recorrido');

    // Verificar si estamos en el index (donde existe #recorrido)
    if (!container) return;

    // Seleccionar proyectos destacados: 2 mejorados + 1 de aprendizaje
    const proyectosDestacados = [
        proyectos.crecimiento[0], // Primer proyecto mejorado
        proyectos.crecimiento[1], // Segundo proyecto mejorado  
        proyectos.aprendizaje[2]  // Un proyecto de aprendizaje representativo
    ];

    // Crear el HTML para la sección de proyectos destacados
    const destacadosHTML = `
        <!-- Título principal -->
        <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 drop-shadow-[0_0_10px_#00bfff]">
            Mis Proyectos Destacados
        </h2>

        <!-- Descripción breve -->
        <div class="text-center mb-10">
            <p class="text-cyan-200 text-lg max-w-2xl mx-auto">
                Una muestra de mi evolución en el desarrollo web, desde fundamentos hasta proyectos mejorados con tecnologías modernas.
            </p>
        </div>

        <!-- Grid de proyectos destacados -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" id="proyectos-destacados-container">
            <!-- Los proyectos se cargarán aquí dinámicamente -->
        </div>

        <!-- Botón para ver todos los proyectos -->
        <div class="text-center">
            <a href="./proyectos.html" 
               class="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_#00bfff] hover:shadow-[0_0_30px_#00bfff] transition-all duration-300 transform hover:scale-105 group">
                <span>Ver Todos Mis Proyectos</span>
                <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </a>
            
            <p class="text-cyan-300 mt-6 text-sm">
                Descubre +7 proyectos detallados de mi evolución como desarrollador
            </p>
        </div>
    `;

    // Reemplazar el contenido de la sección recorrido
    container.innerHTML = destacadosHTML;

    // Cargar los proyectos destacados en el grid
    const destacadosContainer = document.getElementById('proyectos-destacados-container');

    proyectosDestacados.forEach(proyecto => {
        const proyectoElement = document.createElement('div');

        // Determinar clases según si es mejorado o no
        const clasesBase = 'project-card border-2 border-cyan-400 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300';
        const clasesFondo = proyecto.mejorado
            ? 'bg-gradient-to-br from-black/80 to-cyan-900/40 shadow-[0_0_20px_#00bfff]'
            : 'bg-black/60 shadow-[0_0_10px_#00bfff]';

        proyectoElement.className = `${clasesBase} ${clasesFondo}`;

        // Determinar clase para la imagen
        const claseImagen = proyecto.titulo.includes('Proyecto 2') ? 'object-contain bg-black' : 'object-cover';

        // Crear el HTML del proyecto
        proyectoElement.innerHTML = `
            <div class="relative">
                <a href="${proyecto.enlace}">
                    <img 
                        src="${proyecto.imagen}" 
                        alt="${proyecto.titulo}" 
                        class="w-full h-48 ${claseImagen} opacity-90 hover:opacity-100 transition"
                        onerror="this.src='https://via.placeholder.com/400x200/0d1b2a/00bfff?text=Proyecto'"
                    />
                </a>
                ${proyecto.mejorado ?
                '<span class="absolute top-3 right-3 bg-cyan-500 text-black text-xs font-bold px-2 py-1 rounded-lg shadow-lg">Mejorado</span>'
                : ''}
            </div>
            <div class="p-5">
                <h3 class="text-xl font-bold mb-2 text-cyan-300">${proyecto.titulo}</h3>
                <p class="text-cyan-100 text-sm mb-4">${proyecto.descripcion}</p>
                <div class="flex flex-wrap gap-2">
                    ${proyecto.mejorado ?
                '<span class="bg-cyan-900/50 text-cyan-300 text-xs px-2 py-1 rounded">Tailwind</span>' +
                '<span class="bg-cyan-900/50 text-cyan-300 text-xs px-2 py-1 rounded">JavaScript</span>' +
                '<span class="bg-cyan-900/50 text-cyan-300 text-xs px-2 py-1 rounded">Responsive</span>'
                :
                '<span class="bg-cyan-900/50 text-cyan-300 text-xs px-2 py-1 rounded">HTML5</span>' +
                '<span class="bg-cyan-900/50 text-cyan-300 text-xs px-2 py-1 rounded">CSS3</span>' +
                '<span class="bg-cyan-900/50 text-cyan-300 text-xs px-2 py-1 rounded">Fundamentos</span>'
            }
                </div>
            </div>
        `;

        destacadosContainer.appendChild(proyectoElement);
    });
}

// Función para determinar en qué página estamos y cargar el contenido adecuado
function inicializarProyectos() {
    const currentPage = window.location.pathname;

    if (currentPage.includes('proyectos.html') || currentPage.endsWith('proyectos.html')) {
        // Estamos en la página de proyectos - cargar todos los proyectos
        cargarProyectos();
    } else {
        // Estamos en el index - cargar proyectos destacados
        cargarProyectosDestacados();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarProyectos);

// También ejecutar si el DOM ya está cargado
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    inicializarProyectos();
}