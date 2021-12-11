let movies;    // List of movies from TMDB
//testing done for top rated
// Utility functions
const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

const filterByGenreAndTitle = (movieList, genreId, string) =>
  movieList.filter((m) => m.genre_ids.includes(genreId) && m.title.toLowerCase().search(string) !== -1);

describe("Top Rated page ", () => {
  before(() => {
    // Get top rated movies from TMDB and store in movies variable.
    cy.request(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")    // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results
      })
  })
  beforeEach(() => {
    cy.visit("/movies/top-rated")
  });

  describe("Base tests", () => {
    it("displays page header", () => {
        cy.get("h3").contains("Top Rated Movies");
        cy.get("h1").contains("Filter the movies");
      });
  });

  describe("Filtering", () => {
    describe("By movie title", () => {
        it("should only display movies with m in the title", () => {
          let searchString = "m";
          let matchingMovies = filterByTitle(movies, searchString);
          cy.get("#filled-search").clear().type(searchString); // Enter m in text box
          cy.get(".MuiCardHeader-content").should(
            "have.length",
            matchingMovies.length
          );
          cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(matchingMovies[index].title);
          });
        })
        it("should only display movies with o in the title", () => {
          let searchString = "o";
          let matchingMovies = filterByTitle(movies, searchString);
          cy.get("#filled-search").clear().type(searchString); // Enter m in text box
          cy.get(".MuiCardHeader-content").should(
            "have.length",
            matchingMovies.length
          );
          cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(matchingMovies[index].title);
          });
        });
        
      it("should only display movies with xyz in the title", () => {
        let searchString = "xyz";
        let matchingMovies = filterByTitle(movies, searchString);
        cy.get("#filled-search").clear().type(searchString); // Enter m in text box
        cy.get(".MuiCardHeader-content").should(
          "have.length",
          matchingMovies.length
        );
      });
    })
  });

  describe("By movie genre", () => {
    it("should display movies with the specified genre only", () => {
       const selectedGenreId = 35;
       const selectedGenreText = "Comedy";
       const matchingMovies = filterByGenre(movies, selectedGenreId);
       cy.get("#genre-select").click();
       cy.get("li").contains(selectedGenreText).click();
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingMovies.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingMovies[index].title);
       });
     });
   });

   describe("By Title and Movie genre", () => {
    it("should display movies with the specified genre and title only", () => {
     const searchString = "o";
     const genreId = 35;
     const genreText = "Comedy";
     const matchingMovies = filterByGenreAndTitle(movies, genreId, searchString);

     cy.get("#filled-search").clear().type(searchString);
     cy.get("#genre-select").click();
     cy.get("li").contains(genreText).click();

     cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );

      
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
    });
   });
  });


  describe("Navagation Tests", () => {     

    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&include_adult=false&include_video=false&page=1`
      )
        .its("body")    // Take the body of HTTP response from TMDB
        .then((response) => {
          movies = response.results
        })
    })

        
  beforeEach(() => {
    cy.visit("/movies/top_rated")
  });


describe("Favorite Testing", () => {    
  it("Adding a favourite from top rated page", () => { 

    cy.get("header").find(".MuiToolbar-root").find("button").eq(3).click();  //use header to go to trending
    cy.get("h3").contains("Top Rated Movies");  //check page is trending

    cy.get("button[aria-label='add to favorites']").eq(0).click();  //get 1st card favourite button and click it 
    cy.get("header").find(".MuiToolbar-root").find("button").eq(2).click(); //check favourites page to see if its there 
    cy.get(".MuiCardActions-root").eq(0)

});



});
  
  });
 //test to be continued