// Definir la clave de API para la solicitud de datos meteorológicos
const API_KEY = 'e25487bc9f157800575cd0f60c7e1136';

// Función para obtener datos meteorológicos según la posición del usuario
const fetchData = position => {
    const { latitude, longitude } = position.coords;
    // Realizar una solicitud fetch a la API de OpenWeatherMap
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
         .then(response => response.json()) // Convertir la respuesta a JSON
         .then(data => setWeatherData(data)) // Enviar los datos a la función setWeatherData
}

// Función para procesar y mostrar los datos meteorológicos
const setWeatherData = data => {
    console.log(data); // Mostrar los datos en la consola para depuración
    // Crear un objeto con los datos relevantes
    const weatherData = {
        location: data.name, // Nombre de la ubicación
        description: data.weather[0].main, // Descripción del clima
        humidity: data.main.humidity, // Humedad
        pressure: data.main.pressure, // Presión atmosférica
        temperature: data.main.temp, // Temperatura en grados Celsius
        date: getDate(), // Fecha actual
    }

    // Actualizar elementos HTML con los datos meteorológicos
    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    })

    // Realizar limpieza y mostrar los datos después de la carga
    cleanUp();
}

// Función para realizar la limpieza y mostrar los datos
const cleanUp = () => {
    let h1 = document.getElementById('h1');
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');
    let reproducirBoton = document.getElementById('reproducir'); // Agregamos esta línea

    // Mostrar el título, el botón y el contenedor de datos; ocultar el loader
    h1.style.display = 'flex';
    container.style.display = 'flex';
    loader.style.display = 'none';
    reproducirBoton.style.display = 'block'; // Mostramos el botón
}

// Función para obtener la fecha actual en formato 'dd-mm-yyyy'
const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

// Función que se ejecuta al cargar la página
const onLoad = () => {
    // Obtener la posición geográfica del usuario y luego llamar a fetchData
    navigator.geolocation.getCurrentPosition(fetchData);
}

// Evento que se dispara cuando se carga el contenido de la página
document.addEventListener('DOMContentLoaded', function () {
    var miAudio = document.getElementById('miAudio');
    var reproducirBoton = document.getElementById('reproducir');

    // Agregar un evento de clic al botón para reproducir el audio
    reproducirBoton.addEventListener('click', function () {
        // Verificar si el navegador permite la reproducción de audio
        if (miAudio.canPlayType) {
            // Iniciar la reproducción de audio
            miAudio.play();
            // Ocultar el botón después de hacer clic para evitar la reproducción múltiple
            reproducirBoton.style.display = 'none';
        } else {
            alert('Tu navegador no admite la reproducción de audio.');
        }
    });
});
