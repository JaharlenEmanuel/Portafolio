const habilidades = [
    { nombre: "HTML5", nivel: 90, icono: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" },
    { nombre: "CSS3", nivel: 85, icono: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" },
    { nombre: "JavaScript", nivel: 80, icono: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" },
    { nombre: "Tailwind CSS", nivel: 85, icono: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" },
];
function cargarHabilidades() {
    const container = document.getElementById('skills-container');

    habilidades.forEach((habilidad, index) => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item bg-black/60 p-4 rounded-lg border border-cyan-400 shadow-[0_0_10px_#00bfff]';
        skillElement.style.animationDelay = `${index * 0.1}s`;

        skillElement.innerHTML = `
                    <div class="flex items-center mb-3">
                        <img src="${habilidad.icono}" class="w-10 h-10 mr-3" alt="${habilidad.nombre}" />
                        <h3 class="text-lg font-semibold">${habilidad.nombre}</h3>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-bar" style="width: 0%" data-level="${habilidad.nivel}"></div>
                    </div>
                    <div class="flex justify-between mt-2 text-sm text-cyan-300">
                        <span>Nivel:</span>
                        <span>${habilidad.nivel}%</span>
                    </div>
                `;

        container.appendChild(skillElement);
    });

    // Animar barras de progreso después de un breve retraso
    setTimeout(() => {
        document.querySelectorAll('.skill-progress-bar').forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = `${level}%`;
        });

        // Animar la aparición de las habilidades
        document.querySelectorAll('.skill-item').forEach(item => {
            item.classList.add('animate-fadeInUp');
        });
    }, 300);
}
export { cargarHabilidades }