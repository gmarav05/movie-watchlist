const searchBtn = document.getElementById('search-btn')
const inputEl = document.getElementById('movie-name')


searchBtn.addEventListener('click', function(){
    console.log('hello')
    console.log(inputEl.value)
    getMovie(inputEl.value)
})

function getMovie(title) {
    fetch(`http://www.omdbapi.com/?apikey=2691a84a&s=${title}&type`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        data.Search.forEach(movie => {
            
            let movieId = movie.imdbID
            console.log(movie.imdbID)
            getMovieDetails(movieId)
            
        });
    })
}

// async function getMovieDetails(movieId) {

//     await fetch(`http://www.omdbapi.com/?apikey=2691a84a&i=${movieId}&plot=full`)
//     .then(res => res.json())
//     .then(data => {
//             console.log(data.Title)
//             console.log(data.Runtime) 
//             console.log(data.Genre)
//             console.log(data.Plot)
//             console.log(data.Ratings[0].Value)
//     })
// }


async function getMovieDetails(movieId) {
    await fetch(`http://www.omdbapi.com/?apikey=2691a84a&i=${movieId}&plot=full`)
    let response = await res.json()
    renderMovies(response)
    
}