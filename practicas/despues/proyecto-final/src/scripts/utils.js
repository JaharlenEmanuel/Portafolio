/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */
import { stays } from "./stays.js";

const inputCiudad = document.querySelector("#input-ciudad");
const sugContainer = document.querySelector("#sugerencias");
const btnHuesped = document.querySelector("#btn-huesped")
const aggHuesped = document.querySelector("#agg-huespedes")
const divCiudad = document.querySelector("#div-ciudad")
const divHuesped = document.querySelector("#div-huesped");
const filtroGuest = document.querySelector("#filtro-guest")

let adultosCount = parseInt(localStorage.getItem('adultosCount')) || 0;
let niñosCount = parseInt(localStorage.getItem('niñosCount')) || 0;

function abrirCerrarModal() {
    document.addEventListener('click', function (e) {
        const target = e.target;

        if (target.id === 'openModal' || target.closest('#openModal')) {
            document.getElementById('modal-filtro').classList.remove('hidden');

            resetearModal();
            return;
        }

        if (target.id === 'closeModal' || target.closest('#cerrarModal') || target.id === 'modalBackdrop') {
            document.getElementById('modal-filtro').classList.add('hidden');
            return;
        }
    });
}

function resetearModal() {
    inputCiudad.value = "";

    adultosCount = 0;
    niñosCount = 0;

    btnHuesped.textContent = "Agregar huéspedes";

    if (aggHuesped.innerHTML !== '') {
        const adultosCountElement = document.querySelector(".adultos-count");
        const ninosCountElement = document.querySelector(".ninos-count");

        if (adultosCountElement) adultosCountElement.textContent = "0";
        if (ninosCountElement) ninosCountElement.textContent = "0";
    }
    sugContainer.classList.add('hidden');
}
function obtenerCiudadesUnicas() {
    const ciudades = [...new Set(stays.map(stay => stay.city))];
    return ciudades;
}

function mostrarSugerencias(ciudadesFiltradas) {
    sugContainer.innerHTML = '';
    ciudadesFiltradas.forEach(ciudad => {
        const sugerenciaItem = document.createElement('div');
        sugerenciaItem.className = 'p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2';
        sugerenciaItem.innerHTML = `
            <span>${ciudad}, Finland</span>
        `;

        sugerenciaItem.addEventListener('click', () => {
            inputCiudad.value = `${ciudad}, Finland`;
            sugContainer.classList.add('hidden');
        });

        sugContainer.appendChild(sugerenciaItem);
    });

    sugContainer.classList.remove('hidden');
}

function filtroCiudad() {
    const todasLasCiudades = obtenerCiudadesUnicas();

    inputCiudad.addEventListener('input', (e) => {
        const valor = e.target.value.toLowerCase().trim();

        const ciudadesFiltradas = todasLasCiudades.filter(ciudad =>
            ciudad.toLowerCase().includes(valor)
        );

        mostrarSugerencias(ciudadesFiltradas);
    });

    inputCiudad.addEventListener('click', (e) => {
        const valor = e.target.value.toLowerCase().trim();

        const ciudadesFiltradas = todasLasCiudades.filter(ciudad =>
            ciudad.toLowerCase().includes(valor)
        );

        mostrarSugerencias(ciudadesFiltradas);
    });

    document.addEventListener('click', (e) => {
        if (!inputCiudad.contains(e.target) && !sugContainer.contains(e.target)) {
            sugContainer.classList.add('hidden');
        }
    });

    inputCiudad.addEventListener('focus', () => {
        if (inputCiudad.value === '') {
            mostrarSugerencias(todasLasCiudades);
        }
    });

    inputCiudad.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            realizarBusqueda();
        }
    });
}

function huespedes() {
    const guardarEnLocalStorage = () => {
        localStorage.setItem('adultosCount', adultosCount.toString());
        localStorage.setItem('niñosCount', niñosCount.toString());
    };

    const actualizarBotonHuesped = () => {
        const totalHuespedes = adultosCount + niñosCount;
        if (totalHuespedes === 0) {
            btnHuesped.textContent = "Agregar huéspedes";
        } else if (totalHuespedes === 1) {
            btnHuesped.textContent = "1 huésped";
        } else {
            btnHuesped.textContent = `${totalHuespedes} huéspedes`;
        }
    };

    actualizarBotonHuesped();

    btnHuesped.addEventListener("click", () => {
        if (inputCiudad.value === "") {
            inputCiudad.focus();
        } else {
            aggHuesped.className = 'p-2 mt-4 shadow';
            aggHuesped.innerHTML = `
            <div id="filtro-guest" class="flex flex-col items-start justify-center mb-6">
                <span>Adultos</span>
                <span class="text-gray-500">13 años a más</span>
                <div class="flex items-center justify-center">
                    <button class="menos-adultos rounded-sm border border-black size-6">-</button>
                    <span class="w-8 text-center adultos-count">${adultosCount}</span>
                    <button class="mas-adultos rounded-sm border border-black size-6">+</button>
                </div>
            </div>
            <div class="flex flex-col items-start justify-center mb-6">
                <span>Niños</span>
                <span class="text-gray-500">Menos de 13 años</span>
                <div class="flex items-center gap-2">
                    <button class="menos-ninos rounded-sm border border-black size-6">-</button>
                    <span class="w-8 text-center ninos-count">${niñosCount}</span>
                    <button class="mas-ninos rounded-sm border border-black size-6">+</button>
                </div>
            </div>
            `;

            const menosAdultos = document.querySelector(".menos-adultos");
            const masAdultos = document.querySelector(".mas-adultos");
            const menosNinos = document.querySelector(".menos-ninos");
            const masNinos = document.querySelector(".mas-ninos");
            const adultosCountElement = document.querySelector(".adultos-count");
            const ninosCountElement = document.querySelector(".ninos-count");

            menosAdultos.addEventListener("click", () => {
                if (adultosCount > 0) {
                    adultosCount--;
                    adultosCountElement.textContent = adultosCount;
                    actualizarBotonHuesped();
                    guardarEnLocalStorage();
                }
            });

            masAdultos.addEventListener("click", () => {
                adultosCount++;
                adultosCountElement.textContent = adultosCount;
                actualizarBotonHuesped();
                guardarEnLocalStorage();
            });

            // Event listeners para niños
            menosNinos.addEventListener("click", () => {
                if (niñosCount > 0) {
                    niñosCount--;
                    ninosCountElement.textContent = niñosCount;
                    actualizarBotonHuesped();
                    guardarEnLocalStorage();
                }
            });

            masNinos.addEventListener("click", () => {
                niñosCount++;
                ninosCountElement.textContent = niñosCount;
                actualizarBotonHuesped();
                guardarEnLocalStorage();
            });
        }
    });
}

function limpiarHuespedesStorage() {
    localStorage.removeItem('adultosCount');
    localStorage.removeItem('niñosCount');
}

function obtenerHuespedesGuardados() {
    return {
        adultos: adultosCount,
        niños: niñosCount
    };
}

function configurarBusqueda() {
    const btnBuscar = document.querySelector("#btn-buscar");

    if (btnBuscar) {
        btnBuscar.addEventListener("click", realizarBusqueda);
    }
}

function realizarBusqueda() {
    const ciudadSeleccionada = inputCiudad.value.replace(', Finland', '').trim();
    const huespedesGuardados = obtenerHuespedesGuardados();
    const totalHuespedes = huespedesGuardados.adultos + huespedesGuardados.niños;

    const staysFiltrados = filtrarStays(ciudadSeleccionada, totalHuespedes);

    const event = new CustomEvent('staysFiltrados', {
        detail: {
            stays: staysFiltrados,
            filtros: {
                ciudad: ciudadSeleccionada,
                huespedes: totalHuespedes
            }
        }
    });
    document.dispatchEvent(event);

    // AÑADIR ESTA LÍNEA PARA MOSTRAR MENSAJE SI NO HAY RESULTADOS
    mostrarMensajeSinResultados(staysFiltrados, ciudadSeleccionada, totalHuespedes);

    actualizarDivCiudad(ciudadSeleccionada);
    actualizarDivHuesped(totalHuespedes);
    resetearHuespedes();
    aggHuesped.classList.add('hidden');
    document.getElementById('modal-filtro').classList.add('hidden');
}

// NUEVA FUNCIÓN PARA MOSTRAR MENSAJE
function mostrarMensajeSinResultados(staysFiltrados, ciudad, huespedes) {
    // Remover mensaje anterior si existe
    const mensajeAnterior = document.getElementById('mensaje-sin-resultados');
    if (mensajeAnterior) {
        mensajeAnterior.remove();
    }

    // Si no hay resultados, crear y mostrar mensaje
    if (staysFiltrados.length === 0) {
        const contenedorStays = document.querySelector("#container-stays");
        contenedorStays.classList.remove("grid");
        contenedorStays.classList.add("flex")
        const mensajeDiv = document.createElement('div');
        mensajeDiv.id = 'mensaje-sin-resultados';
        mensajeDiv.className = 'flex flex-col items-center justify-center py-8 text-gray-500 w-full';

        let mensajeTexto = 'No se encontraron alojamientos';
        if (ciudad && huespedes > 0) {
            mensajeTexto = `No hay alojamientos disponibles en ${ciudad} para ${huespedes} huéspedes`;
        } else if (ciudad) {
            mensajeTexto = `No hay alojamientos disponibles en ${ciudad}`;
        } else if (huespedes > 0) {
            mensajeTexto = `No hay alojamientos disponibles para ${huespedes} huéspedes`;
        }

        mensajeDiv.innerHTML = `
            <p class="text-lg font-semibold mb-2">Sin resultados</p>
            <p>${mensajeTexto}</p>
            <p class="mt-4">Intenta con otros filtros o ajusta tu búsqueda.</p>
        `;

        const contenedorResultados = document.querySelector('#container-stays');
        if (contenedorResultados) {
            contenedorResultados.innerHTML = '';
            contenedorResultados.appendChild(mensajeDiv);
        }
    }
}
function actualizarDivCiudad(ciudad) {
    if (!divCiudad) return;

    if (ciudad) {
        divCiudad.textContent = `${ciudad}, Finland`;
        divCiudad.classList.remove('text-gray-500');
        divCiudad.classList.add('text-gray-800');
    } else {
        divCiudad.textContent = "Add location";
        divCiudad.classList.remove('text-gray-800');
        divCiudad.classList.add('text-gray-500');
    }
}

function actualizarDivHuesped(totalHuespedes) {
    if (!divHuesped) return;

    if (totalHuespedes > 0) {
        if (totalHuespedes === 1) {
            divHuesped.textContent = "1 guest";
        } else {
            divHuesped.textContent = `${totalHuespedes} guests`;
        }
        divHuesped.classList.remove('text-gray-500');
        divHuesped.classList.add('text-gray-800');
    } else {
        divHuesped.textContent = "Add guests";
        divHuesped.classList.remove('text-gray-800');
        divHuesped.classList.add('text-gray-500');
    }
}

function filtrarStays(ciudad, maxHuespedes) {
    return stays.filter(stay => {
        const coincideCiudad = !ciudad || stay.city === ciudad;
        const coincideHuespedes = maxHuespedes === 0 || stay.maxGuests >= maxHuespedes;
        return coincideCiudad && coincideHuespedes;
    });
}

function obtenerTodosLosStays() {
    return stays;
}

function resetearHuespedes() {
    adultosCount = 0;
    niñosCount = 0;
    limpiarHuespedesStorage();
}

export {
    abrirCerrarModal,
    filtroCiudad,
    huespedes,
    limpiarHuespedesStorage,
    obtenerHuespedesGuardados,
    configurarBusqueda,
    realizarBusqueda,
    filtrarStays,
    obtenerTodosLosStays,
    resetearHuespedes,
    resetearModal
};