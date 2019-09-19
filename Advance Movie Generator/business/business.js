function BusinessLayer() {
    this.dataLayer = new DataLayer();

    this.getResolvedMovies = async (movieSearchInput) => {
        await this.dataLayer.populateMovies(movieSearchInput);
        let allMovies = this.dataLayer.getMoviesBySearch();


        let resolvedMovies = [];

        let movies = allMovies.results;
        for (let i = 0; i < movies.length; i++) {
            let temp = {
                name: movies[i].title,
                movieId: movies[i].id,
                posterPath: "http://image.tmdb.org/t/p/w780" + movies[i].poster_path
            };
            resolvedMovies.push(temp);
        };
        return resolvedMovies;
    };

    this.resolvedPopularMovies = async () => {
        await this.dataLayer.populatePopularMovies();
        let popularMovies = this.dataLayer.getPopularMovies();

        let resolvedPopularMovies = [];

        let movies = popularMovies.results;
        for (let i = 0; i < movies.length; i++) {
            let temp = {
                name: movies[i].title,
                movieId: movies[i].id,
                posterPath: "http://image.tmdb.org/t/p/w780" + movies[i].poster_path,
                genre: movies[i].genre_ids
            };
            resolvedPopularMovies.push(temp);
        };
        return resolvedPopularMovies;
    };

    this.resolvedTopRatedMovies = async () => {
        await this.dataLayer.populateTopRatedMovies();
        let topRatedMovies = this.dataLayer.getTopRatedMovies();

        let resolvedTopRatedMovies = [];

        let movies = topRatedMovies.results;
        for (let i = 0; i < movies.length; i++) {
            let temp = {
                name: movies[i].title,
                movieId: movies[i].id,
                posterPath: "http://image.tmdb.org/t/p/w780" + movies[i].poster_path,
                genre: movies[i].genre_ids
            };
            resolvedTopRatedMovies.push(temp);
        };
        return resolvedTopRatedMovies;

    };
    this.resolvedUpcomingMovies = async () => {
        await this.dataLayer.populateUpcomingMovies();
        let upcomingMovies = this.dataLayer.getUpcomingMovies();
        let resolvedUpcomingMovies = [];

        let movies = upcomingMovies.results;
        for (let i = 0; i < movies.length; i++) {
            let temp = {
                name: movies[i].title,
                movieId: movies[i].id,
                posterPath: "http://image.tmdb.org/t/p/w780" + movies[i].poster_path,
                genre: movies[i].genre_ids
            };
            resolvedUpcomingMovies.push(temp);
        };
        return resolvedUpcomingMovies;

    };
    this.resolvedMovieById = async (movieId) => {
        await this.dataLayer.populateMovieById(movieId);
        let movieById = this.dataLayer.getMovieById();
        let resolvedMovieById = {
            name: movieById.title,
            movieId: movieById.id,
            posterPath: "http://image.tmdb.org/t/p/w780" + movieById.poster_path,
            genre: movieById.genres,
            imdb: "https://www.imdb.com/title/" + movieById.imdb_id,
            overview: movieById.overview,
            runtime: movieById.runtime,
            releaseDate: movieById.release_date
        }
        return resolvedMovieById;
    };
    this.resolvedGeneratedMovies = async (sortValue, yearValue, genreId, runtimeFrom, runtimeTo) => {
        await this.dataLayer.populateGenerateMovies(sortValue, yearValue, genreId, runtimeFrom, runtimeTo);
        let generateMovies = this.dataLayer.getGeneratedMovies();
        let resolvedGeneratedMovies = [];

        let movies = generateMovies.results;
        for (let i = 0; i < movies.length; i++) {
            let temp = {
                name: movies[i].title,
                movieId: movies[i].id,
                posterPath: "http://image.tmdb.org/t/p/w780" + movies[i].poster_path,
                genre: movies[i].genre_ids
            };
            resolvedGeneratedMovies.push(temp);
        };
        console.log(resolvedGeneratedMovies)
        return resolvedGeneratedMovies;

    };
    this.resolvedGenreObject = async () => {
        await this.dataLayer.populateGenreObject();
        let genreObject = this.dataLayer.getGenreObject();
        let resolvedGenreObject = [];

        let genres = genreObject.genres;
        for(let i = 0; i < genres.length; i++){
            let temp = {
                genreName: genres[i].name,
                genreId: genres[i].id
            }
            resolvedGenreObject.push(temp);
        };
        return resolvedGenreObject;
    }



}