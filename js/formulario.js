function inicializarValidacionFormulario() {
    let form = document.getElementById('contact-form');
    let nombreInput = document.getElementById('nombre');
    let correoInput = document.getElementById('correo');
    let asuntoInput = document.getElementById('asunto');
    let mensajeInput = document.getElementById('mensaje');

    // Expresión regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Función para mostrar error
    function mostrarError(input, mensajeId, mensaje) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
        document.getElementById(mensajeId).textContent = mensaje;
        document.getElementById(mensajeId).style.display = 'block';
    }

    // Función para mostrar éxito
    function mostrarExito(input, mensajeId) {
        input.classList.remove('input-error');
        input.classList.add('input-success');
        document.getElementById(mensajeId).style.display = 'none';
    }

    // Validación en tiempo real
    nombreInput.addEventListener('blur', () => {
        if (nombreInput.value.trim() === '') {
            mostrarError(nombreInput, 'nombre-error', 'El nombre es obligatorio');
        } else {
            mostrarExito(nombreInput, 'nombre-error');
        }
    });

    correoInput.addEventListener('blur', () => {
        if (correoInput.value.trim() === '') {
            mostrarError(correoInput, 'correo-error', 'El correo electrónico es obligatorio');
        } else if (!emailRegex.test(correoInput.value)) {
            mostrarError(correoInput, 'correo-error', 'Ingresa un correo electrónico válido');
        } else {
            mostrarExito(correoInput, 'correo-error');
        }
    });

    asuntoInput.addEventListener('blur', () => {
        if (asuntoInput.value.trim() === '') {
            mostrarError(asuntoInput, 'asunto-error', 'El asunto es obligatorio');
        } else {
            mostrarExito(asuntoInput, 'asunto-error');
        }
    });

    mensajeInput.addEventListener('blur', () => {
        if (mensajeInput.value.trim() === '') {
            mostrarError(mensajeInput, 'mensaje-error', 'El mensaje es obligatorio');
        } else {
            mostrarExito(mensajeInput, 'mensaje-error');
        }
    });

    // Validación al enviar el formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Validar nombre
        if (nombreInput.value.trim() === '') {
            mostrarError(nombreInput, 'nombre-error', 'El nombre es obligatorio');
            isValid = false;
        } else {
            mostrarExito(nombreInput, 'nombre-error');
        }

        // Validar correo
        if (correoInput.value.trim() === '') {
            mostrarError(correoInput, 'correo-error', 'El correo electrónico es obligatorio');
            isValid = false;
        } else if (!emailRegex.test(correoInput.value)) {
            mostrarError(correoInput, 'correo-error', 'Ingresa un correo electrónico válido');
            isValid = false;
        } else {
            mostrarExito(correoInput, 'correo-error');
        }

        // Validar asunto
        if (asuntoInput.value.trim() === '') {
            mostrarError(asuntoInput, 'asunto-error', 'El asunto es obligatorio');
            isValid = false;
        } else {
            mostrarExito(asuntoInput, 'asunto-error');
        }

        // Validar mensaje
        if (mensajeInput.value.trim() === '') {
            mostrarError(mensajeInput, 'mensaje-error', 'El mensaje es obligatorio');
            isValid = false;
        } else {
            mostrarExito(mensajeInput, 'mensaje-error');
        }

        // Si el formulario es válido, enviarlo
        if (isValid) {
            // Aquí iría la lógica para enviar el formulario
            alert('¡Formulario enviado correctamente!');
            form.reset();

            // Quitar clases de éxito
            [nombreInput, correoInput, asuntoInput, mensajeInput].forEach(input => {
                input.classList.remove('input-success');
            });
        }
    });
}
export { inicializarValidacionFormulario }