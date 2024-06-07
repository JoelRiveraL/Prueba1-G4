document.getElementById('search-button').addEventListener('click', () => {
    const search = document.getElementById('search').value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
        .then(response => response.json())
        .then(data => {
            const pokemon = document.getElementById('pokemon');
            pokemon.innerHTML = `
                <h2>${data.name}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Altura: ${data.height}</p>
                <p>Peso: ${data.weight}</p>
            `;
        })
        .catch(error => {
            console.error(error);
        });
});



const listOfPokemons = document.getElementById('listOfPokemons');
const buttons = document.getElementById('buttons');
const pokemonDisplay = document.getElementById('pokemon');
const pokemon = document.getElementById('pokemon');
let urlPokemon = 'https://pokeapi.co/api/v2/pokemon';
let btnNext;
let btnPrev;
let btnFilter = false;

const pokemonData = async (data) => {
    listOfPokemons.innerHTML = '';
    try {
        for (let pokemon of data) {
            const response = await fetch(pokemon.url || pokemon.pokemon.url);
            const results = await response.json();
            const pokemonTemplateHTML = `
                <div class="card text-white bg-warning mb-3 border-danger pokemon" style="width: 16rem;">
                    <img class="card-img-top" src="${results.sprites.other['official-artwork'].front_default}" alt="${results.name}">
                    <div class="card-body">
                        <h2 class="card-title">${results.name}</h2>
                        <p class="card-text">Altura: ${results.height}</p>
                        <p class="card-text">Peso: ${results.weight}</p>
                        <p class="card-text">Tipo: ${results.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                    </div>
                </div>
            `;
            listOfPokemons.innerHTML += pokemonTemplateHTML;
        }
    } catch (error) {
        console.log(error);
    }
};

const getAllPokemons = async (url) => {
    try {
        const response = await fetch(url);
        const results = await response.json();
        pokemonData(results.results);
        btnNext = results.next ? `<button type="button" class="btn btn-danger border-warning mb-3" onclick="getAllPokemons('${results.next}')">Next</button>` : '';
        btnPrev = results.previous ? `<button type="button" class="btn btn-danger border-warning mb-3" onclick="getAllPokemons('${results.previous}')">Prev</button>` : '';

        buttons.innerHTML = btnPrev + " " + btnNext;
    } catch (error) {
        console.log(error);
    }
};

const filterPokemon = async (type) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const results = await response.json();
        pokemonData(results.pokemon.map(pokemon => pokemon.pokemon).slice(0, 20));
        btnFilter = true;
        buttons.innerHTML = '';
        pokemon.innerHTML = '';
    } catch (error) {
        console.log(error);
    }
};

document.getElementById('filter-button').addEventListener('click', () => {
    const type = document.getElementById('filter').value;
    if (type === 'all') {
        btnFilter = false;
        const pokemon = document.getElementById('pokemon');
        pokemon.innerHTML = '';
        getAllPokemons(urlPokemon);
    } else {
        filterPokemon(type);
    }
});




/*
fetch(`https://pokeapi.co/api/v2/pokemon?offset=100&limit=100`)
        .then(response => response.json())
        .then(data => {
            const pokemons = document.getElementById('pokemon');
            pokemons.innerHTML = '';
            data.results.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(data => {
                        pokemons.innerHTML += `
                            <div class="pokemon">
                                <h2>${data.name}</h2>
                                <img src="${data.sprites.front_default}" alt="${data.name}">
                                <p>Altura: ${data.height}</p>
                                <p>Peso: ${data.weight}</p>
                            </div>
                        `;
                    });
            });
        })
        .catch(error => {
            console.error(error);
        });

document.getElementById('allResults-button').addEventListener('click', () => {
*/