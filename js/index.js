// Utilidades

function crearElemento(tag) {
    return document.createElement(tag);
}
function adicionarTextoATag(texto, tag) {
    tag.innerText = texto;
}
function adicionarTagAContenedor(tag, contenedor) {
    contenedor.appendChild(tag);
}
function adicionarTagABody(tag) {
    document.body.appendChild(tag);
}

// Usamos 'tagName' porque generaba un conflicto no se con que variable creo que era tag

function crearTagConTexto(tagName, texto) {
    const tag = crearElemento(tagName);
    adicionarTextoATag(texto, tag);
    return tag;
}
function crearTagConTextoAdicionarBody(tagName, texto) {
    const tag = crearTagConTexto(tagName, texto);
    adicionarTagABody(tag);
}

function crearImagen(src, alt) {
    const img = crearElemento('img');
    img.src = src;
    img.alt = alt;
    return img;
}

// Js de la pagina

let animeData = [];

function loadAnimeData() {
    fetch('https://api.jikan.moe/v4/top/anime?type=ona')
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            if (data && data.data) { // Asegurarse de que data.data existe
                animeData = data.data;
                Combobox();
                mostrarTodoAnime();
            }

        })


}

function Combobox() {
    const select = document.getElementById('animeSeleccionado');


    const animeOpcion = crearElemento('option');
    animeOpcion.value = '';
    adicionarTextoATag('Mostrar todos los animes', animeOpcion);
    adicionarTagAContenedor(animeOpcion, select);

    animeData.forEach(function (anime, index) {
        const option = crearElemento('option');
        option.value = index;
        adicionarTextoATag(anime.title, option);
        adicionarTagAContenedor(option, select);
    });
}

function mostrarTodoAnime() {
    const tbody = document.getElementById('tablaBody');
    tbody.innerHTML = ''; // Limpiar la tablla antes de llenarla

    animeData.forEach(function (anime) {
        const row = crearFila(anime);
        adicionarTagAContenedor(row, tbody);
    });
}

// Para crear una fila de la tabla

function crearFila(anime) {

    const row = crearElemento('tr');

    // Crear celdas

    const tdTitleEnglish = crearTagConTexto('td', anime.title_english || 'N/A');
    const tdTitleJapanese = crearTagConTexto('td', anime.title_japanese || 'N/A');
    const tdImage = crearElemento('td');

    const imageUrl = (anime.images && anime.images.jpg && anime.images.jpg.image_url)

    const img = crearImagen(imageUrl, anime.title || 'N/A');

    img.className = 'anime-image';  //  Para ponerle el estilo

    adicionarTagAContenedor(img, tdImage);

    const tdEpisodes = crearTagConTexto('td', anime.episodes || 'N/A');
    const tdDuration = crearTagConTexto('td', anime.duration || 'N/A');

    // Adicionar celdas a la fila
    adicionarTagAContenedor(tdTitleEnglish, row);
    adicionarTagAContenedor(tdTitleJapanese, row);
    adicionarTagAContenedor(tdImage, row);
    adicionarTagAContenedor(tdEpisodes, row);
    adicionarTagAContenedor(tdDuration, row);

    return row;
}

// Para filtrar por el nombre del anime

document.getElementById('animeSeleccionado').addEventListener('change', function () {
    const selectedIndex = this.value;
    const tbody = document.getElementById('tablaBody');

    // Borrar los datos de la tabla
    tbody.innerHTML = '';

    // para seleccionar el anime

    if (selectedIndex == '') {
        // Si no hay selección (la opción "Mostrar todos"), mostrar todos los animes
        mostrarTodoAnime();

    } else {

        // Mostrar únicamente el anime seleccionado

        const selectedAnime = animeData[selectedIndex];
        if (selectedAnime) {
            const row = crearFila(selectedAnime);
            adicionarTagAContenedor(row, tbody);
        }
    }
});

// Cargar los datos al iniciar la página asi es mas rapido 
loadAnimeData();
