const apiKey = "d67fa311e00643a78393ca763a080ff1";
const pageSize = 26;
var jogos;
var publishers;

loadGames();
loadPublishers();

async function loadGames() {
  try {
    const result = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page_size=${pageSize}`);
    const data = await result.json();
    jogos = data.results;

    jogos.sort((a, b) => b.rating - a.rating)

    setFirtsGames();
    setGames();
  } catch (error) {

    throw new Error("Ops, Tente mais tarde :(")
  }
}

async function loadPublishers() {
  try {
    const result = await fetch(`https://api.rawg.io/api/publishers?key=${apiKey}`);
    const data = await result.json();
    publishers = data.results;

    setPublishersSection();
  } catch (error) {

    throw new Error("Ops, Tente mais tarde :(")
  }
}

function setFirtsGames() {
  let slide = "";

  for (let i = 0; i < 3; i++) {
    slide += `
      <article class="card-video carousel-item ${i == 0 && "active"}">
        <div class="video">
          <img src="${jogos[i].background_image}" alt="${jogos[i].name}" />
        </div>

        <div class="video-info">
          <h2>${jogos[i].name}</h2>
          <p>
            <span class="bold">Lançamento:</span>
            <time pubdate="${jogos[i].released}">
              ${jogos[i].released}
            </time>
          </p>
          <p>
            <span class="bold">Plataformas:</span>
            ${jogos[i].platforms.map(platform => " " + (platform.platform.name))}
          </p>
          <p>
            <span class="bold">Avaliação:</span>
            ${jogos[i].rating}
          </p>
          <p>
          <a href="detalhes.html?id=${jogos[i].id}" class="btn btn-primary">Detalhes</a>
          </p>
        </div>

      </article>
    `
  }

  document.getElementById('slide-games').innerHTML = slide;
}

function setGames() {
  let cards = "";

  for (let i = 5; i < 15; i++) {
    cards += `
      <div class="card">
        <h3>${jogos[i].name}</h3>
        <img src="${jogos[i].background_image}" alt="${jogos[i].name}">
        <p>
            <span class="bold">Avaliação:</span>
            ${jogos[i].rating}
          </p>
          <p>Data de Lançamento : ${jogos[i].released}</p>
        </a></p>
        <a href="detalhes.html?id=${jogos[i].id}" class="btn btn-primary">Detalhes</a>
      </div>
    `
  }

  document.querySelector('.jogo-container').innerHTML = cards;
}

function loadMoreGames() {
  let cards = "";

  for (let i = 15; i <= 25; i++) {
    cards += `
      <div class="card">
        <h3>${jogos[i].name}</h3>
        <img src="${jogos[i].background_image}" alt="${jogos[i].name}">
        <a href="detalhes.html?id=${jogos[i].id}" class="btn btn-primary">Detalhes</a>
      </div>
    `
  }

  document.getElementById('loadMoreGamesButton').disabled = true;
  document.querySelector('.jogo-container').innerHTML += cards;
}

function loadSearchedGame(pgames) {
  let infoGame = `
  <section id="destaques">
    <button onclick="window.location.reload()" ><i class="bi bi-arrow-left"></i>Clique para voltar</button>
    <h1>Resultado da Pesquisa</h1>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div id="slide-games" class="carousel-inner"> 

  `;

  for (let i = 0; i < pgames.length; i++){
    infoGame += `
      <article class="card-video carousel-item ${i == 0 && "active"}">
          <div class="video">
            <img src="${pgames[i].background_image}" alt="${pgames[i].name}" />
          </div>

          <div class="video-info">
            <h2>${pgames[i].name}</h2>
            <p>
              <span class="bold">Lançamento:</span>
              <time pubdate="${pgames[i].released}">
                ${pgames[i].released}
              </time>
            </p>
            <p>
              <span class="bold">Plataformas:</span>
              ${pgames[i].platforms.map(platform => " " + (platform.platform.name))}
            </p>
            <p>
              <span class="bold">Avaliação:</span>
              ${pgames[i].rating}
            </p>
            <p>
              <a href="detalhes.html?id=${pgames[i].id}">Mais detalhes...</a>
            </p>
          </div>

      </article>
    `
  }
  pgames.forEach(sgame => {
    
  })

  infoGame += `
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>

  </section>
  `

  document.getElementById('main-home').innerHTML = infoGame;
}

async function search() {
  const name = document.getElementById("searchInput").value;
  let searchedGame = [];

  try {
    const result = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${name}`);
    console.log("Result  " + result)
    const data = await result.json();
    console.log("Data  " + data)
    console.log("Data data  " + searchedGame)
    searchedGame = data.results

  } catch (error) {
    alert("Não encontramos resultados :(");
    throw new Error("Não foi possível obter os dados")
  }

  loadSearchedGame(searchedGame);
  document.getElementById("searchInput").value = ""
}

function setPublishersSection() {
  let card = "";

  publishers.forEach(publishers => {
    card += `
   <div class="card">
    <img src="${publishers.image_background}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${publishers.name}</h5>
        <p class='card-text'>
            <p>Games:
                </p>${publishers.games[0].name}</p>
                <p>${publishers.games[1].name}</p>
                <p>${publishers.games[3].name}</p>
            </p>
        </p>

    </div>
</div>

    `
  })

  document.querySelector('.publishers-container').innerHTML = card;
}