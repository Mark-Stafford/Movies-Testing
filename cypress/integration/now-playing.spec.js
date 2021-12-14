let movies;    // List of movies from TMDB
//Testing now playing
// Utility functions
const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

const filterByGenreAndTitle = (movieList, genreId, string) =>
  movieList.filter((m) => m.genre_ids.includes(genreId) && m.title.toLowerCase().search(string) !== -1);

describe("Now Playing page ", () => {
  before(() => {
    // Get top rated movies from TMDB and store in movies variable.
    cy.request(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")    // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results
      })
  })
  beforeEach(() => {
    cy.visit("/movies/now-playing")
  });

  describe("Base tests", () => {
    it("displays page header", () => {
        cy.get("h3").contains("Now Playing Movies");
        cy.get("h1").contains("Filter the movies");
      });
  });

  describe("Filtering", () => {
    describe("By movie title", () => {
        it("should only display movies with p in the title", () => {
          let searchString = "p";
          let matchingMovies = filterByTitle(movies, searchString);
          cy.get("#filled-search").clear().type(searchString); // Enter p in text box
          cy.get(".MuiCardHeader-content").should(
            "have.length",
            matchingMovies.length
          );
          cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(matchingMovies[index].title);
          });
        })
        it("should only display movies with c in the title", () => {
          let searchString = "c";
          let matchingMovies = filterByTitle(movies, searchString);
          cy.get("#filled-search").clear().type(searchString); // Enter c in text box
          cy.get(".MuiCardHeader-content").should(
            "have.length",
            matchingMovies.length
          );
    
        });
        
      it("should only display movies with xyz in the title", () => {
        let searchString = "xyz";
        let matchingMovies = filterByTitle(movies, searchString);
        cy.get("#filled-search").clear().type(searchString); 
        cy.get(".MuiCardHeader-content").should(
          "have.length",
          matchingMovies.length
        );
      });
    })
  });

  describe("By movie genre", () => {
    it("should display movies with the specified genre only", () => {
       const selectedGenreId = 18;
       const selectedGenreText = "Drama";
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
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&include_adult=false&include_video=false&page=1`
      )
        .its("body")    // Take the body of HTTP response from TMDB
        .then((response) => {
          movies = response.results
        })
    })

        
  beforeEach(() => {
    cy.visit("/movies/now_playing")
  });


describe("Favorite Testing", () => {    
  it("Adding a favourite from now playing page", () => { 

    cy.get("header").find(".MuiToolbar-root").find("button").eq(5).click();  
    cy.get("h3").contains("Now Playing Movies");  

    cy.get("button[aria-label='add to favorites']").eq(0).click();  
    cy.get("header").find(".MuiToolbar-root").find("button").eq(2).click(); 
    cy.get(".MuiCardActions-root").eq(0)

});



});
  
  });
 