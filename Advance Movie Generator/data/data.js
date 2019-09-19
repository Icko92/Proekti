function DataLayer() {
    // this.movies = {};
    // this.popularMovies = {};
    // this.topRatedMovies = {};
    this.persistance = new AdvanceMovieSearch();

    this.populateMovies = async (movieSearchInput) => {
        this.movies = await this.persistance.moviesBySearch(movieSearchInput);
    };

    this.getMoviesBySearch = () => {
        return this.movies;
    };

    this.populatePopularMovies = async () => {
        this.popularMovies = await this.persistance.popularMovies();
    };

    this.getPopularMovies = () => {
        return this.popularMovies;
    };
    this.populateTopRatedMovies = async () => {
        this.topRatedMovies = await this.persistance.topRatedMovies();
    };
    this.getTopRatedMovies = () => {
        return this.topRatedMovies;
    };
    this.populateUpcomingMovies = async () => {
        this.upcomingMovies = await this.persistance.upcomingsMovies();
    };
    this.getUpcomingMovies = () => {
        return this.upcomingMovies;
    };
    this.populateMovieById = async (movieId) =>{
        this.movieById = await this.persistance.movieById(movieId);
    };
    this.getMovieById = () => {
        return this.movieById;
    };
    this.populateGenerateMovies = async (sortValue, yearValue, genreId, runtimeFrom, runtimeTo) =>{
        this.generateMovies = await this.persistance.generateMovies(sortValue, yearValue, genreId, runtimeFrom, runtimeTo);
    };
    this.getGeneratedMovies = () => {
        return this.generateMovies;
    };
    this.populateGenreObject = async () =>{
        this.genreObject = await this.persistance.genreObject();
    };
    this.getGenreObject = () => {
        return this.genreObject;
    };
}