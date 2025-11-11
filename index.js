const movieCard = document.getElementById('movie-cards')

let ids = JSON.parse(localStorage.getItem("Movie-ID's"))

for (let i = 0; i < ids.length; i++) {
    let movieId = ids[i]
    console.log(movieId)
    getMovieDetails(movieId)
}

function render() {

for (let i = 0; i < ids.length; i++) {
    let movieId = ids[i]
    console.log(movieId)
    getMovieDetails(movieId)
}
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
        <img src="star.png" alt="Rating on a scale of 10">
        <p>${data.Ratings[0].Value}</p>
        </div>
        
        <div class="min-genre-watchlist">
        <p>${data.Runtime}</p>
        <p>${data.Genre}</p>
        <button class="watchlist-remove-btn" data-remove='${data.imdbID}'><a>Remove</a></button>
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
    if (e.target.dataset.remove) {
        console.log(e.target.dataset.remove)
        removeMovie(e.target.dataset.remove)
    }
})


function removeMovie(movieID) {

    ids = ids.filter(id => id !== movieID)

    console.log("Updated")

    localStorage.setItem("Movie-ID's", JSON.stringify(ids))

    render()

}

