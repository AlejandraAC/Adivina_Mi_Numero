// Espera a que el DOM se cargue antes de añadir el listener del botón
document.addEventListener('DOMContentLoaded', function () {
    // Añade un evento de clic al botón para comenzar el juego
    document.getElementById('startButton').addEventListener('click', startGuessing);
});

// Función para iniciar el juego
function startGuessing() {
    let low = 1; // Límite inferior del rango
    let high = 100; // Límite superior del rango
    // Llama a la función para hacer la primera adivinanza
    guessNumber(low, high);
}

// Función para adivinar el número
function guessNumber(low, high) {
    // Si el rango se ha agotado, muestra un mensaje de error
    if (low > high) {
        document.getElementById('result').innerHTML = "<p>No pude adivinar tu número.</p>";
        return;
    }

    // Calcula la adivinanza media
    const mid = Math.floor((low + high) / 2);
    // Muestra la pregunta con opciones "Sí" y "No"
    document.getElementById('question').innerHTML = `
        <p>¿Es tu número ${mid}?</p>
        <button class="btn btn-success" onclick="handleGuessResponse(true, ${low}, ${high}, ${mid})">Sí</button>
        <button class="btn btn-danger" onclick="handleGuessResponse(false, ${low}, ${high}, ${mid})">No</button>
    `;
}

// Maneja la respuesta a la adivinanza
function handleGuessResponse(isCorrect, low, high, mid) {
    if (isCorrect) {
        // Muestra el número adivinado y un mensaje de éxito
        document.getElementById('result').innerHTML = `<p>Tu número es ${mid}, ¡excelente decisión!</p>`;
        document.getElementById('question').innerHTML = '';
    } else {
        // Si la adivinanza es incorrecta, pregunta si el número es mayor
        askIfHigher(low, high, mid);
    }
}

// Pregunta si el número es mayor que la adivinanza actual
function askIfHigher(low, high, mid) {
    document.getElementById('question').innerHTML = `
        <p>¿Es tu número mayor que ${mid}?</p>
        <button class="btn btn-success" onclick="handleHigherResponse(true, ${low}, ${high}, ${mid})">Sí</button>
        <button class="btn btn-danger" onclick="handleHigherResponse(false, ${low}, ${high}, ${mid})">No</button>
    `;
}

// Maneja la respuesta a la pregunta sobre si el número es mayor
function handleHigherResponse(isHigher, low, high, mid) {
    if (isHigher) {
        // Ajusta el rango para buscar en la mitad superior
        guessNumber(mid + 1, high);
    } else {
        // Ajusta el rango para buscar en la mitad inferior
        guessNumber(low, mid - 1);
    }
}
