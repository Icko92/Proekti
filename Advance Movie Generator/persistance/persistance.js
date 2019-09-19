function AdvanceMovieSearch() {
    this.moviesBySearch = movieSearchInput => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.themoviedb.org/3/search/movie?api_key=60e8d1a61dafeacaaa782d6843c9b8cd&query=" + movieSearchInput,
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };
    this.popularMovies = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.themoviedb.org/3/movie/popular?api_key=60e8d1a61dafeacaaa782d6843c9b8cd&language=en-US&page=1",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };
    this.topRatedMovies = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.themoviedb.org/3/movie/top_rated?api_key=60e8d1a61dafeacaaa782d6843c9b8cd&language=en-US&page=1",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };
    this.upcomingsMovies = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.themoviedb.org/3/movie/upcoming?api_key=60e8d1a61dafeacaaa782d6843c9b8cd&language=en-US&page=1",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };
    this.movieById = movieId => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.themoviedb.org/3/movie/" + movieId +
                    "?api_key=60e8d1a61dafeacaaa782d6843c9b8cd&language=en-US",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };
    this.generateMovies = (sortValue, yearValue, genreId, runtimeFrom, runtimeTo) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.themoviedb.org/3/discover/movie?api_key=60e8d1a61dafeacaaa782d6843c9b8cd&sort_by=" + sortValue  + yearValue +
                     genreId + "&with_runtime.gte=" + runtimeFrom + "&with_runtime.lte=" + runtimeTo,
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };
    this.genreObject = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.themoviedb.org/3/genre/movie/list?api_key=60e8d1a61dafeacaaa782d6843c9b8cd&language=en-US",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };


}