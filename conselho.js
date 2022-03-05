// Inicialização das variáveis.
// Elementos da página
var mtgCover = document.getElementById('mtgCover');
var quote = document.getElementById('quote');
var author = document.getElementById('author');
var tagEsquerda = document.getElementsByTagName("esquerda")[0];
var baseURL = document.location.href;

// URLs e hash
var mtgRandomURL = 'https://api.scryfall.com/cards/random?q=ft%3A"+"+border%3Ablack';
var mtgCardIdURL = 'https://api.scryfall.com/cards/'
var cardId = '';

// Variáveis de integração com Twitter
var botaoTweet = document.createElement('a');
var twitterWidget = document.createElement('script');


// Cria a integração com Twitter.
// É chamada só após a função hashURL para que compartilhe a URL atualizada com a hash.
function createTwitterIntegration() {
    // botão "Tweet"
    let params = {
        "class": "twitter-share-button",
        "data-size": "large",
        "data-text": "Recebi um conselho mágico! Veja e receba o seu aqui: ",
        "data-hashtags": "ConselhoMagico",
        "data-related": "azhariel",
        "data-show-count": "false"
    }
    for (let i = 0; i < Object.entries(params).length; i++) {
        botaoTweet.setAttribute(Object.entries(params)[i][0], Object.entries(params)[i][1]);
    }
    tagEsquerda.appendChild(botaoTweet);

    // chamada do script do widget 
    twitterWidget.setAttribute("type", "text/javascript");
    twitterWidget.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.head.appendChild(twitterWidget);
}


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

// Verifica se a URL contém um hash:
// caso tenha, retorna o hash, que é o ID da carta;
// caso não tenha, retorna falso
function checkCardId(url) {
    if (url.includes('#')) {
        let indexOfHash = url.indexOf('#');
        let hash = url.slice(indexOfHash + 1, url.length);
        return hash;
    } else {
        return false;
    }
}

// Recebe um hash/card ID para pegar as informações do Scryfall
async function getCardWithId(id) {
    let mtgURLWithId = mtgCardIdURL + id;
    let response = await fetch(mtgURLWithId);
    let data = await response.json();
    mtgCover.src = data.image_uris.normal;
    quote.innerText = data.flavor_text;
    author.innerText = '- ' + data.name;
    hashURL(data.id);
}

// Se a URL não possuir hash, adiciona
// Caso já possua, tira o hash antigo antes de adicionar o novo
function hashURL(hash) {
    if (baseURL.includes('#')) {
        let indexOfHash = baseURL.indexOf('#');
        baseURL = baseURL.slice(0, indexOfHash);
    }
    let newURL = baseURL + '#' + hash;
    document.location.href = newURL;
    createTwitterIntegration();
}

// Rodar as funções
getCard(mtgRandomURL);