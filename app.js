const searchBtn = document.getElementById('search-btn')
const inputEl = document.getElementById('movie-name')
const movieCard = document.getElementById('movie-cards')
let html = ''
let movies = []


searchBtn.addEventListener('click', function(){
    console.log('hello')
    console.log(inputEl.value)
    getMovie(inputEl.value)
})

function getMovie(title) {
    document.getElementById('main-section').style.display = 'none' 

    fetch(`http://www.omdbapi.com/?apikey=2691a84a&s=${title}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.Error) {
            document.getElementById('movie-not-found').style.display = 'inline'
            return
        }

        movieCard.innerHTML = ''
        html = ''
        
        data.Search.forEach(movie => {
            let movieId = movie.imdbID
            console.log(movie.imdbID)
            getMovieDetails(movieId)
        });
    })
}

function getMovieDetails(movieId) {

    fetch(`http://www.omdbapi.com/?apikey=2691a84a&i=${movieId}`)
    .then(res => res.json())
    .then(data => {
        movieCard.innerHTML += `
            <div class="card" id=${data.movieId}>

                <img src="${data.Poster}" alt="Movie Poster">

                <div class="movie-details">

                    <div class="title">
                        <h1>${data.Title}</h1>
                        <img src="./assets/star.png" alt="Rating on a scale of 10">
                        <p>${data.Ratings[0].Value}</p>
                    </div>

                    <div class="min-genre-watchlist">
                        <p>${data.Runtime}</p>
                        <p>${data.Genre}</p>
                        <button class="watchlist-add-btn" data-watchlist='${data.imdbID}'><a>Watchlist</a></button>
                    </div>

                    <div class="description">
                        <p>${data.Plot}<br>.</p>
                    </div>

                </div>
                        
            </div>
            `  
    })
}

document.addEventListener('click', function(e){
    if (e.target.dataset.watchlist) {
        console.log(e.target.dataset.watchlist)
        addMovie(e.target.dataset.watchlist)
    }
})

function addMovie(movieID) {

    if (!movies.includes(movieID)) {
        movies.push(movieID)
    }

    let moviesId = JSON.stringify(movies)
    localStorage.setItem("Movie-ID's", moviesId)
}