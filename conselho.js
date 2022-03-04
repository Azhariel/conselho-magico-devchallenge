// Inicialização das variáveis.
var mtgCover = document.getElementById('mtgCover');
var quote = document.getElementById('quote');
var author = document.getElementById('author');
// var mtgURL = 'https://api.scryfall.com/cards/random';
var mtgRandomURL = 'https://api.scryfall.com/cards/random?q=ft%3A"+"+border%3Ablack';
var mtgCardIdURL = 'https://api.scryfall.com/cards/'
// var qURL = 'https://api.adviceslip.com/advice';
var cardId = '';
var baseURL = document.location.href;

/*
var authorNames = [
    'Immanuel Kant',
    'Plato',
    'Aristotle',
    'Friedrich Nietzsche',
    'Martin Heidegger',
    'Michel Foucault',
    'G. W. F. Hegel',
    'Karl Marx',
    'Ludwig Wittgenstein',
    'Edmund Husserl',
    'Thomas Aquinas',
    'David Hume',
    'Gilles Deleuze',
    'Jacques Derrida',
    'Sigmund Freud',
    'Saint Augustine',
    'Gottfried Leibniz',
    'Benedict Spinoza',
    'John Locke',
    'Jean-Paul Sartre',
    'Thomas Hobbes',
    'John Dewey',
    'Soren Kierkegaard',
    'Bertrand Russell',
    'Jean-Jacques Rousseau',
    'Maurice Merleau-Ponty',
    'Rene Descartes',
    'Emmanuel Levinas',
    'William James',
    'Hannah Arendt',
    'Jurgen Habermas',
    'John Stuart Mill',
    'Jacques Lacan',
    'Walter Benjamin',
    'Charles Sanders Peirce',
    'Hans-Georg Gadamer',
    'John B. Rawls',
    'Slavoj Zizek',
    'Paul Ricoeur',
    'Alfred North Whitehead',
    'Roland Barthes',
    'Karl Popper',
    'Johann Gottlieb Fichte',
    'Gottlob Frege',
    'Henri Bergson',
    'Ralph Waldo Emerson',
    'Theodor W. Adorno',
    'Niccolo Machiavelli',
    'Blaise Pascal',
    'Arthur Schopenhauer'
]
*/

// Pegar a carta e colocar a url de imagem como src para mtgCover
// O flavor text como quote - separando caso tenha 
async function getCard(url) {
    let hash = checkCardId(baseURL);
    if (hash != false) {
        console.log('Card ID detectado: ' + hash);
        getCardWithId(hash);
    } else {
        let response = await fetch(url);
        let data = await response.json();
        mtgCover.src = data.image_uris.normal;
        quote.innerText = data.flavor_text;
        author.innerText = '- ' + data.name;
        hashURL(data.id);
    }
}

function checkCardId(url) {
    if (url.includes('#')) {
        let indexOfHash = url.indexOf('#');
        let hash = url.slice(indexOfHash + 1, url.length);
        return hash;
    } else {
        return false;
    }
}

async function getCardWithId(id) {
    let mtgURLWithId = mtgCardIdURL + id;
    let response = await fetch(mtgURLWithId);
    let data = await response.json();
    mtgCover.src = data.image_uris.normal;
    quote.innerText = data.flavor_text;
    author.innerText = '- ' + data.name;
    hashURL(data.id);
}

function hashURL(hash) {
    if (baseURL.includes('#')) {
        let indexOfHash = baseURL.indexOf('#');
        baseURL = baseURL.slice(0, indexOfHash);
    }
    let newURL = baseURL + '#' + hash;
    document.location.href = newURL;
}

// ! Pegar a quote e colocar como o texto principal - caso queira utilizar o advice slip
/* 
async function getQuote(url) {
    let response = await fetch(url);
    let data = await response.json();
    quote.innerText = data.slip.advice;
}
*/

// Rodar as funções
getCard(mtgRandomURL);
// getQuote(qURL);

// ! Definição de um índice aleatorio entre 0 e 49, usado para definir o autor - caso queira utilizar top 50 filósofos
/*
var indexAuthor = Math.floor(Math.random() * 50);
author.innerText = '- ' + authorNames[indexAuthor];
*/