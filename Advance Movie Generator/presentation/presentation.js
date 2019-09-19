function Presentation() {
    this.business = new BusinessLayer();


    this.header = () => {
        let body = $("body");
        let header = $("<header>").attr("class", "header");
        let logoDiv = $("<div>").attr("class", "logoDiv");
        let logo = $("<img>").attr("src", "images/amg.png")
        let searchDiv = $("<div>").attr("class", "searchBar");
        let input = $("<input>").attr("class", "input").attr("placeholder", "Search Your Favorite Movie")
        let searchIcon = $("<i>").attr("class", "fa fa-search");
        let nav = $("<div>").attr("class", "nav");
        let ul = $("<ul>").attr("class", "list");
        let liHome = $("<li>").attr("class", "home").text("Home");
        let liAdvanced = $("<li>").attr("class", "advanced").text("Advanced");
        let liLogin = $("<li>").attr("class", "login").text("Login");
        let liRegister = $("<li>").attr("class", "register").text("Register");
        let advancedSectionDiv = $("<div>").attr("class", "advancedDiv");
        let generateButton = $("<button>").attr("class", "generateButton").text("Generate");
        let selectSort = $("<select>").attr("class", "selectSort").attr("id", "styleSelect");
        let optionPopularDesc = $("<option>").val("popularity.desc").text("Popularity desc");
        let optionPopularAsc = $("<option>").val("popularity.asc").text("Popularity asc");
        let optionVoteCountDesc = $("<option>").val("vote_count.desc").text("Vote desc")
        let optionVoteCountAsc = $("<option>").val("vote_count.asc").text("Vote asc");
        let selectYear = $("<select>").attr("class", "selectYear").attr("id", "styleSelect");
        let selectGenre = $("<select>").attr("class", "selectGenre").attr("id", "styleSelect");
        let selectRuntimeFrom = $("<select>").attr("class", "selectRuntimeFrom").attr("id", "styleSelect");
        let selectRuntimeTo = $("<select>").attr("class", "selectRuntimeTo").attr("id", "styleSelect");
        let modalFormDiv = $("<div>").attr("class", "modal");
        let closeModalDiv = $("<div>").attr("class", "closeModalDiv")
        let closeModal = $("<i>").attr("class", "fa fa-times-circle")
        let modalContentDiv = $("<div>").attr("class", "modalContent");
        let loginH1 = $("<h1>").attr("id", "loginH1");
        let emailLoginP = $("<p>").text("Email");
        let usernameLoginP = $("<p>").text("Username");
        let passwordLoginP = $("<p>").text("Password");
        let inputEmail = $("<input>").attr("placeholder", "Enter Email");
        let inputUsername = $("<input>").attr("placeholder", "Enter Username");
        let inputPassword = $("<input>").attr("placeholder", "Enter Password");
        let userButton = $("<button>")


        let contentWrapSearched = $("<div>").attr("class", "contentWrap");
        let blurSearched = $("<div>").attr("class", "blur");
        let searchedMoviesDiv = $("<div>").attr("class", "popular");
        let introText = $("<h1>").text("Welcome!!! choose your favorite movie").attr("class", "intro");
        let h1Searched = $("<h1>").text("Searched Movies").attr("class", "moviesHeader");
        let h1Generated = $("<h1>").text("Generated Movies").attr("class", "moviesHeader");

        body.append(header);
        header.append(logoDiv).append(searchDiv).append(nav).append(advancedSectionDiv);
        advancedSectionDiv.append(selectSort).append(selectYear).append(selectGenre).append(selectRuntimeFrom).append(selectRuntimeTo).append(generateButton);
        selectSort.append(optionPopularDesc).append(optionPopularAsc).append(optionVoteCountDesc).append(optionVoteCountAsc)
        logoDiv.append(logo);
        searchDiv.append(input).append(searchIcon);
        nav.append(ul);
        ul.append(liHome).append(liAdvanced).append(liLogin).append(liRegister);

        this.displaySearchedMovies(body, contentWrapSearched, blurSearched, searchedMoviesDiv, introText, h1Searched);
        this.displayGeneratedMovies(body, contentWrapSearched, blurSearched, searchedMoviesDiv, introText, h1Generated);
        this.populateSelectYear();
        this.populateSelectGenre();
        this.populateSelectRuntimeFrom();
        this.populateSelectRuntimeTo();
        this.displayAdvancedSection();
        this.displayForm(body, modalFormDiv, modalContentDiv, closeModalDiv, closeModal, loginH1, emailLoginP, inputEmail, usernameLoginP, inputUsername, passwordLoginP, inputPassword, userButton);
        this.home();


    };


    this.displayForm = (body, modalFormDiv, modalContentDiv, closeModalDiv, closeModal, loginH1, emailLoginP, inputEmail, usernameLoginP, inputUsername, passwordLoginP, inputPassword, userButton) => {
        body.append(modalFormDiv);
        modalFormDiv.append(modalContentDiv);
        closeModalDiv.append(closeModal)
        modalContentDiv.append(closeModalDiv).append(loginH1).append(emailLoginP).append(inputEmail).append(usernameLoginP).append(inputUsername).append(passwordLoginP).append(inputPassword).append(userButton);

        $(".register").on("click", () => {
            $(".modal").css("display", "block");
            userButton.text("Register").val("register");
            loginH1.text("Register");
        });
        $(".fa-times-circle").on("click", () => {
            $(".modal").css("display", "none");
        });
        $(".login").on("click", () => {
            $(".modal").css("display", "block");
            userButton.text("Login").val("login")
            loginH1.text("Login");
        });

        userButton.on("click", () => {
            if (userButton.val() == "register") {
                let emailValue = inputEmail.val();
                let userNameValue = inputUsername.val();
                let passwordValue = inputPassword.val();
                this.registerUser(emailValue, userNameValue, passwordValue);
                $("input").val("")
            } else if (userButton.val() == "login") {
                let emailValue = inputEmail.val();
                let userNameValue = inputUsername.val();
                let passwordValue = inputPassword.val();
                this.loginUser(emailValue, userNameValue, passwordValue)
                $("input").val("")
            }
        })

    };
    this.loginUser = (emailValue, userNameValue, passwordValue) => {
        let users = JSON.parse(localStorage.getItem("users"));

        for (let i = 0; i < users.length; i++) {
            if (users[i].email === emailValue &&
                users[i].userName === userNameValue &&
                users[i].password === passwordValue
            ) {
                let userLi = $("<li>");
                let wishlistLi = $("<li>");
                $(".login").html("");
                $(".login").css("margin", "0px")
                $(userLi).text(users[i].userName);
                $(".list").append(users[i].userName)

                $(".register").html("");
                $(".register").css("margin", "0px");
                $(".list").append(wishlistLi)
                let wishlistIcon = $("<i>").attr("class", "fa fa-star").css("color", "gold");
                wishlistLi.append(wishlistIcon);
                let modalWishDiv = $("<div>").attr("class", "modalWish");
                let closeModalDivWish = $("<div>").attr("class", "closeModalDivWish")
                let closeModal = $("<i>").attr("class", "fa fa-times-circle")
                let modalContentDivWish = $("<div>").attr("class", "modalContentWish");
                modalContentDivWish.attr("id", users[i].userName)
                $(wishlistIcon).on("click", () => {
                    $("body").append(modalWishDiv);
                    modalWishDiv.append(modalContentDivWish);
                    closeModalDivWish.append(closeModal)
                    modalContentDivWish.append(closeModalDivWish)
                    modalWishDiv.css("display", "block");
                    $(closeModal).on("click", () => {
                        modalWishDiv.css("display", "none");
                    });
                });



            }
        }
    }

    this.registerUser = (emailValue, userNameValue, passwordValue) => {
        let userObject = {
            email: emailValue,
            userName: userNameValue,
            password: passwordValue,
            wishList: []
        };
        let users = JSON.parse(localStorage.getItem("users"));
        if (users === null) {
            let niza = [];
            niza.push(userObject);
            localStorage.setItem("users", JSON.stringify(niza));
        } else {
            for (let i = 0; i < users.length; i++) {
                if (users[i].userName === userObject.userName) {
                    alert("Username Taken")
                }
            }
        }
        users.push(userObject);
        localStorage.setItem("users", JSON.stringify(users));
    };

    this.home = () => {
        $(".home").on("click", () => {
            location.reload();
        })
    };

    this.displayGeneratedMovies = async (body, contentWrapSearched, blurSearched, searchedMoviesDiv, introText, h1Generated) => {
        $(".generateButton").on("click", async () => {
            let sortValue = $(".selectSort").val();
            let yearValue = $(".selectYear").val();
            let genreId = $(".selectGenre").val();
            let runtimeFrom = $(".selectRuntimeFrom").val();
            let runtimeTo = $(".selectRuntimeTo").val();

            let generateMovie = await this.business.resolvedGeneratedMovies(sortValue, yearValue, genreId, runtimeFrom, runtimeTo);
            $(".contentWrap").html("");
            $(".contentWrapInfo").html("");
            this.displayPopularMovies(generateMovie, body, contentWrapSearched, blurSearched, searchedMoviesDiv, introText, h1Generated);
            $(".popularMoviesDivWrap").on("click", async event => {
                let movieId = event.target.id
                await this.movieContent(movieId);

            })
        })
    };

    this.displaySearchedMovies = async (body, contentWrapSearched, blurSearched, searchedMoviesDiv, introText, h1Searched) => {
        $(".input").on("keypress", async event => {
            if (event.which == 13) {
                let movieSearchInput = $(event.target).val();
                let movieNameArray = await this.business.getResolvedMovies(movieSearchInput);
                console.log($(".contentWrap"))
                $(".contentWrap").html("");
                $(".contentWrapInfo").html("");
                this.displayPopularMovies(movieNameArray, body, contentWrapSearched, blurSearched, searchedMoviesDiv, introText, h1Searched);
                $(".input").val("")
                $(".popularMoviesDivWrap").on("click", async event => {
                    let movieId = event.target.id
                    await this.movieContent(movieId);

                })
            };



        });
        $("i").on("click", async () => {
            console.log($(".input").val())
            let movieSearchInput = $(".input").val();
            let movieNameArray = await this.business.getResolvedMovies(movieSearchInput);
            $(".contentWrap").html("");
            $(".contentWrapInfo").html("");
            this.displayPopularMovies(movieNameArray, body, contentWrapSearched, blurSearched, searchedMoviesDiv, introText, h1Searched);
            $(".input").val("")
            $(".popularMoviesDivWrap").on("click", async event => {
                let movieId = event.target.id
                await this.movieContent(movieId);

            })
        })


    };

    this.content = async () => {
        let body = $("body");
        let contentWrap = $("<div>").attr("class", "contentWrap");
        let contentWrapTopRated = $("<div>").attr("class", "contentWrap");
        let contentWrapUpcoming = $("<div>").attr("class", "contentWrap");
        let blur = $("<div>").attr("class", "blur");
        let blurTopRated = $("<div>").attr("class", "blur");
        let blurUpcoming = $("<div>").attr("class", "blur");
        let popularMoviesDiv = $("<div>").attr("class", "popular");
        let topRatedMoviesDiv = $("<div>").attr("class", "popular");
        let upcomingMoviesDiv = $("<div>").attr("class", "popular");
        let introText = $("<h1>").text("Welcome!!! choose your favorite movie").attr("class", "intro")
        let h1 = $("<h1>").text("Popular Movies").attr("class", "moviesHeader");
        let h1TopRated = $("<h1>").text("Top Rated Movies").attr("class", "moviesHeader");
        let h1Upcoming = $("<h1>").text("Upcoming Movies").attr("class", "moviesHeader");




        let popularMovies = await this.business.resolvedPopularMovies();
        let topRatedMovies = await this.business.resolvedTopRatedMovies();
        let upcomingMovies = await this.business.resolvedUpcomingMovies();


        await this.displayPopularMovies(popularMovies, body, contentWrap, blur, popularMoviesDiv, introText, h1);
        await this.displayPopularMovies(topRatedMovies, body, contentWrapTopRated, blurTopRated, topRatedMoviesDiv, "", h1TopRated);
        await this.displayPopularMovies(upcomingMovies, body, contentWrapUpcoming, blurUpcoming, upcomingMoviesDiv, "", h1Upcoming);

        $(".popularMoviesDivWrap").on("click", async event => {
            let movieId = event.target.id
            await this.movieContent(movieId);
        });

    };


    this.displayPopularMovies = async (popularMovies, body, contentWrap, blur, popularMoviesDiv, introText, h1) => {
        let backgroundImgUrl = popularMovies[0].posterPath;
        body.append(contentWrap);
        contentWrap.append(blur);
        blur.append(popularMoviesDiv)
        popularMoviesDiv.append(introText).append(h1);
        $(contentWrap).css("background-image", "url(" + backgroundImgUrl + ")");

        for (i = 0; i < popularMovies.length; i++) {
            let popularMoviesDivWrap = $("<div>").attr("class", "popularMoviesDivWrap");
            let popularImageDiv = $("<div>").attr("class", "popularImageDiv");
            let movieImage = $("<img>").attr("src", popularMovies[i].posterPath)
            let popularMovieTitle = $("<p>");
            let setIdToMovie = popularMovies[i].movieId;
            popularMoviesDivWrap.attr("id", setIdToMovie);
            popularMovieTitle.attr("id", setIdToMovie);
            movieImage.attr("id", setIdToMovie)
            popularMoviesDiv.append(popularMoviesDivWrap);
            popularMoviesDivWrap.append(popularImageDiv)
            popularImageDiv.append(movieImage)
            popularMoviesDivWrap.append(popularMovieTitle);
            popularMovieTitle.append(popularMovies[i].name);
            if (i > 9) {
                popularMoviesDivWrap.addClass("toggle");
            };
        };
        let showMorePopular = $("<button>").text("Show More").attr("class", "showMoreButton");
        $(popularMoviesDiv).append(showMorePopular);
        showMorePopular.on("click", () => {
            $(".toggle").toggle(1000);
            $(showMorePopular).text(function (i, v) {
                return v === 'Show More' ? 'Show Less' : 'Show More'
            });
        });

    };
    this.movieContent = async (movieId) => {
        let movie = await this.business.resolvedMovieById(movieId);
        let body = $("body");
        $(".contentWrap").html("")
        let contentWrapInfo = $("<div>").attr("class", "contentWrapInfo");
        let blurInfo = $("<div>").attr("class", "blurInfo");
        let containerInfo = $("<div>").attr("class", "containerInfo");
        let movieInfoWrap = $("<div>").attr("class", "movieInfoWrap");
        let infoImgDiv = $("<div>").attr("class", "infoImgDiv");
        let infoContentDiv = $("<div>").attr("class", "infoContentDiv");
        let infoExternal = $("<div>").attr("class", "infoExternal");
        let backgroundImgUrl = movie.posterPath;
        let infoImg = $("<img>").attr("src", movie.posterPath);
        let infoName = $("<h1>").attr("class", "infoName").text(movie.name);
        let pYear = $("<p>").text("Release Date: " + movie.releaseDate);
        let genreNames = "";
        for (i = 0; i < movie.genre.length; i++) {
            genreNames = genreNames + movie.genre[i].name + "/ ";
        }
        let pGenre = $("<p>").text(genreNames);
        let pRuntime = $("<p>").text("RunTime: " + movie.runtime + " min.");
        let pOverview = $("<p>").text(movie.overview);
        var a = $("<a>")

        let imdbLogo = $("<img>").attr("src", "images/imdb.png").attr("id", "imdbLogo");
        let wishlistAdd = $("<i>").attr("class", "fa fa-plus").css({
            "color": "gold",
            "font-size": "50px",
            "margin-left": "20px"
        }).attr("id", movieId);
        a.attr("href", movie.imdb).attr("target", "blanc");
        a.append(imdbLogo);
        body.append(contentWrapInfo);
        contentWrapInfo.append(blurInfo);
        blurInfo.append(containerInfo);
        containerInfo.append(movieInfoWrap);
        movieInfoWrap.append(infoImgDiv).append(infoContentDiv).append(infoExternal);
        infoImgDiv.append(infoImg);
        $(contentWrapInfo).css("background-image", "url(" + backgroundImgUrl + ")");
        infoContentDiv.append(infoName).append(pYear).append(pGenre).append(pRuntime).append(pOverview).append(a).append(wishlistAdd);
    }
    this.populateSelectYear = () => {
        let optionYear = $("<option>").val("").text("Year");
        $(".selectYear").append(optionYear)
        for (let i = 2019; i > 1965; i--) {
            let optionYear = $("<option>").val("&primary_release_year=" + i).text(i);
            $(".selectYear").append(optionYear);
        }
    };
    this.populateSelectGenre = async () => {
        let genres = await this.business.resolvedGenreObject();
        let optionGenre = $("<option>").val("").text("All Genre");
        $(".selectGenre").append(optionGenre)
        for (let i = 0; i < genres.length; i++) {
            let optionGenre = $("<option>").val("&with_genres=" + genres[i].genreId).text(genres[i].genreName);
            $(".selectGenre").append(optionGenre);
        }
    };
    this.populateSelectRuntimeFrom = () => {
        for (let i = 0; i < 200; i++) {
            let optionRuntimeFrom = $("<option>").val(i).text(i + " min.");
            $(".selectRuntimeFrom").append(optionRuntimeFrom);
        }
    };
    this.populateSelectRuntimeTo = () => {
        for (let i = 200; i > 0; i--) {
            let optionRuntimeTo = $("<option>").val(i).text(i + " min.");
            $(".selectRuntimeTo").append(optionRuntimeTo);
        }
    };
    this.displayAdvancedSection = () => {
        $(".advanced").on("click", () => {
            $(".advancedDiv").toggle(200);
        })
    }
}