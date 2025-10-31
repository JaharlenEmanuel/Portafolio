/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */
import { stays } from "./stays.js";
import {
    abrirCerrarModal,
    filtroCiudad,
    huespedes,
    configurarBusqueda,
    obtenerTodosLosStays,
} from './utils.js';

let cabecera = document.querySelector("#cabecera");
let containerStays = document.querySelector("#container-stays");

function mostrarStays(staysArray) {
    containerStays.innerHTML = '';
    let contador = 0;

    staysArray.forEach((estancia) => {
        contador += 1;

        if (estancia.beds == null) {
            estancia.beds = 0;
        }

        if (estancia.superHost) {
            containerStays.innerHTML += `
                <div class="flex flex-col w-full mb-8">
                    <img 
                        class="object-cover w-full rounded-3xl h-60 sm:h-64 mb-4" 
                        src="${estancia.photo}" 
                        alt="${estancia.title}"
                    >                    
                    <div class="flex flex-col space-y-2 px-2">
                        <div class="flex justify-between items-center w-full">
                            <div class="flex items-center space-x-2">
                                <span class="border border-gray-800 rounded-xl px-3 py-1 text-xs font-bold text-gray-800 uppercase">
                                    Super Host
                                </span>
                                <span class="text-sm text-gray-500 font-medium">
                                    ${estancia.type} · ${estancia.beds} beds
                                </span>
                            </div>
                            <div class="flex items-center space-x-1">
                                <img class="h-4 text-red-500" src="./src/images/icons/star.svg" alt="Rating">
                                <span class="text-sm font-medium">${estancia.rating}</span>
                            </div>
                        </div>
                        <h3 class="font-semibold text-base text-gray-800 leading-tight">
                            ${estancia.title}
                        </h3>
                    </div>
                </div>
            `;
        } else {
            containerStays.innerHTML += `
                <div class="flex flex-col w-full mb-8">
                    <img 
                        class="object-cover w-full rounded-3xl h-60 sm:h-64 mb-4" 
                        src="${estancia.photo}" 
                        alt="${estancia.title}"
                    >
                    <div class="flex flex-col space-y-2 px-2">
                        <div class="flex justify-between items-center w-full">
                            <!-- Tipo y beds -->
                            <span class="text-sm text-gray-500 font-medium">
                                ${estancia.type} · ${estancia.beds} beds
                            </span>                            
                            <div class="flex items-center space-x-1">
                                <img class="h-4 text-red-500" src="./src/images/icons/star.svg" alt="Rating">
                                <span class="text-sm font-medium">${estancia.rating}</span>
                            </div>
                        </div>                        
                        <h3 class="font-semibold text-base text-gray-800 leading-tight">
                            ${estancia.title}
                        </h3>
                    </div>
                </div>
            `;
        }
    });

    cabecera.innerHTML = `
        <h2 class="font-bold text-lg text-gray-800">Stays in Finland</h2> 
        <h3 class="font-medium text-sm text-gray-600">${contador}+ stays</h3>
    `;
}

function manejarResultadosBusqueda(event) {
    const { stays: staysFiltrados } = event.detail;
    mostrarStays(staysFiltrados);
}

function inicializarApp() {
    abrirCerrarModal();
    filtroCiudad();
    huespedes();
    configurarBusqueda();

    document.addEventListener('staysFiltrados', manejarResultadosBusqueda);

    mostrarStays(obtenerTodosLosStays());
}

document.addEventListener('DOMContentLoaded', inicializarApp);