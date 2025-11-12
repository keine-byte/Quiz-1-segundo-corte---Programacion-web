Utilidades

function crearElemento(tag) {
    return document.createElement(tag)
}
function adicionarTextoATag(texto, tag) {
    tag.innerText = texto
}
function adicionarTagAContenedor(tag, contenedor) {
    contenedor.appendChild(tag)
}
function adicionarTagABody(tag) {
    document.body.appendChild(tag)
}

function crearTagConTexto(tag, texto) {
    var tag = crearElemento(tag)
    adicionarTextoATag(texto, tag)
    return tag
}
function crearTagConTextoAdicionarBody(tag, texto) {
    var tag = crearTagConTexto(tag, texto)
    adicionarTagABody(tag)
}

function crearImagen(src, alt) {
    var img = crearElemento('img')
    img.src = src
    img.alt = alt
    return img
}

// Js de la pagina

let animeData = [];


function loadAnimeData() {
    
    fetch('https://api.jikan.moe/v4/top/anime?type=ona')
        .then(function(response) {
            return response.json();
        })

        .then(function(data) {
            animeData = data.data;
            populateCombobox();
            displayAllAnime();
        })

        .catch(function(error) {
            console.error('Error al cargar los datos:', error);
            document.getElementById('tableBody').innerHTML = 
                '<tr><td colspan="5" class="error">Error al cargar los datos. Por favor, intente nuevamente.</td></tr>';
        });
}



function populateCombobox() {
    const select = document.getElementById('animeSelect');
    
    animeData.forEach(function(anime, index) {
        const option = crearElemento('option');
        option.value = index;
        adicionarTextoATag(anime.title, option);
        adicionarTagAContenedor(option, select);
    });
}


function displayAllAnime() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    animeData.forEach(function(anime) {
        const row = createTableRow(anime);
        adicionarTagAContenedor(row, tbody);
    });
}

// Función auxiliar para crear una fila de la tabla
function createTableRow(anime) {
    const row = crearElemento('tr');
    
    // Crear celdas
    const tdTitleEnglish = crearTagConTexto('td', anime.title_english || 'N/A');
    const tdTitleJapanese = crearTagConTexto('td', anime.title_japanese || 'N/A');
    
    const tdImage = crearElemento('td');
    const img = crearImagen(anime.images.jpg.image_url, anime.title);
    img.className = 'anime-image';
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

// Para filtrar la tabla según la selección del combobox creo xd

document.getElementById('animeSelect').addEventListener('change', function() {
    const selectedIndex = this.value;
    const tbody = document.getElementById('tableBody');
    
    // Borrar los datos de la tabla
    tbody.innerHTML = '';
    
    if (selectedIndex === '') {
        // Si no hay selección, mostrar todos los animes
        displayAllAnime();
    } else {
        // Mostrar únicamente el anime seleccionado
        const selectedAnime = animeData[selectedIndex];
        const row = createTableRow(selectedAnime);
        adicionarTagAContenedor(row, tbody);
    }
});

// Cargar los datos al iniciar la página
loadAnimeData();