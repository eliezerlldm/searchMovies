const apiKey = "86768493";
const searchInput = document.getElementById('searchInput');
const result = document.getElementById('listItems');
const detail = document.getElementById('detailContainer');
const list = document.getElementById('listFav');

let cont = 0;
let data = null;
searchInput.addEventListener('input',searchMovies);

async function searchMovies(){

  const searchTems = searchInput.value;
  
  if(searchTems.length > 3){
      const url = `https://www.omdbapi.com/?s=${searchTems}&apikey=${apiKey}`;
    try {
        const response  = await fetch(url);
        const data      = await response.json();

        data.Search ? showMovies(data.Search) : cleanMovies();

    } catch (error) {
        console.log('Error',error);
    }      
  }else{
    cleanMovies();
  }
}

async function selectMovie(id){
  const url   = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;

  try {
    const resp  = await fetch(url);
          data  = await resp.json();

    detail.innerHTML = `<img src="${data.Poster}">
                        <h1>${data.Title}</h1>
                        <div>${data.Released} - ${data.Runtime}</div>
                        <div>${data.Genre}</div>
                        <div> <img src="./img/EstrellaIMDB.png"></img>  ${data.imdbRating} IMDP rating</div>
                        <div>${data.Plot}</div>
                        <div>${data.Actors}</div>
                        <div>Directed by ${data.Director}</div>
                        `;
    
                        
    const button = document.createElement("button");
    button.innerHTML = "Add to List";
    button.type = "button";
    button.classList.add('button-add');
    button.addEventListener('click',addFavorites);
    detail.appendChild(button);
  } catch (error) {
    console.log('Error',error);
  }
}
list.addEventListener('click', (event)=>{
  if(event.srcElement.nodeName == 'IMG'){
    deleteFav(event.srcElement.parentNode.id);
  }
});

function addFavorites(){
  console.log("add favorites");
  cont++;

  const newFav = `
      <div class="fav-container" id="${cont}">
          <label>
              ${data.Title}
          </label>
          <img src="./img/delete.png")">
      </div>
  `;
  list.innerHTML += newFav;

}

function deleteFav(id){
  list.removeChild(document.getElementById(id));
};
function cleanMovies (){
  result.innerHTML = ' ';
  detail.innerHTML = ' ';
}

function showMovies(data){
   result.innerHTML = '';
  data.forEach(movie => {
    const list = document.createElement('li');
          list.classList.add('movie');
          list.innerHTML = `
          <img src="${movie.Poster}" onclick="selectMovie('${movie.imdbID}')">
          <h1>${movie.Title}</h1>
          <h2>${movie.Year}</h2>`;

          result.appendChild(list);
  });
}