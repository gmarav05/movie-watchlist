const searchBtn = document.getElementById('search-btn')
const inputEl = document.getElementById('movie-name')
const movieCard = document.getElementById('movie-cards')
 let html = ''


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
            console.log("Error")
            document.getElementById('movie-not-found').style.display = 'inline'
            return
        }



        movieCard.innerHTML = ''
        
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
        renderMovies(data)
    })
}


// async function getMovieDetails(movieId) {
    //     let response =  await fetch(`http://www.omdbapi.com/?apikey=2691a84a&i=${movieId}&plot=full`)
    //     let data = await res.json()
    // console.log(data.Title)
    // console.log(data.Runtime) 
    // console.log(data.Genre)
    // console.log(data.Plot)
    // console.log(data.Ratings[0].Value)
//     renderMovies(data)
    
// }

function renderMovies(data) {
    movieCard.innerHTML += `
    <div class="card">

        <img src="${data.Poster}" alt="Movie Poster">

        <div class="movie-details">

            <div class="title">
                <h1>${data.Title}</h1>
                <img src="star.png" alt="Rating on a scale of 10">
                <p>${data.Ratings[0].Value}</p>
            </div>

            <div class="min-genre-watchlist">
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <button class="watchlist-add-btn"><a href="index.html">Watchlist</a></button>
            </div>

            <div class="description">
                <p>${data.Plot}<br>.</p>
            </div>

        </div>
                
    </div>
    ` 

}

// ${data.Ratings[0].Value}