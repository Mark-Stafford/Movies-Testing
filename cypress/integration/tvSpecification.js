let tvs;    // List of tv shows from TMDB

// Utility functions
const filterByTitle = (tvList, string) =>
  tvList.filter((m) => m.name.toLowerCase().search(string) !== -1);

const filterByGenre = (tvList, genreId) =>
  tvList.filter((m) => m.genre_ids.includes(genreId));

describe("Tv Page ", () => {
  before(() => {
    // Get tv shows from TMDB and store in movies variable.
    cy.request(
      `https://api.themoviedb.org/3/discover/tv?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")    // Take the body of HTTP response from TMDB
      .then((response) => {
        tvs = response.results
      })
  })

  beforeEach(() => {
    cy.visit("/tv/discovertv")
  });

  describe("Base test", () => {
    it("displays page header", () => {
      cy.get("h3").contains("Discover Tv Shows");
      cy.get("h1").contains("Filter the Tv Shows");
    });
});

  describe("Filtering", () => {
    describe("By tv title", () => {
     it("should only display tv shows with s in the title", () => {
       let searchString = "c";
       let matchingTvs = filterByTitle(tvs, searchString);
       cy.get("#filled-search").clear().type(searchString); // Enter s in text box
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingTvs.length
       );
   
     })
     it("should only display movies with m in the title", () => {
       let searchString = "m";
       let matchingTvs = filterByTitle(tvs, searchString);
       cy.get("#filled-search").clear().type(searchString); // Enter m in text box
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingTvs.length
       );
       });
 
       it("should display no tv shows after inputtig xyz", () => {
        let searchString = "xyz";
        let matchingTvs = filterByTitle(tvs, searchString);
        cy.get("#filled-search").clear().type(searchString); // Enter xyz in text box
        cy.get(".MuiCardHeader-content").should("have.length", 0,matchingTvs);

     });
      });
      
         describe("By tv title and genre", () => {
            it("should only display tv with the specified title in a genre", () => {
              let searchString = "Chucky";
              const selectedGenreText = "Crime";

              cy.get("#genre-select").click();
            cy.get("li").contains(selectedGenreText).click();
              cy.get("#filled-search").clear().type(searchString); 
           
            });
        });

        describe("By tv genre", () => {
          it("should display tv shows with the specified genre only", () => {
             const selectedGenreId = 37;
             const selectedGenreText = "Western";
             const matchingTvs = filterByGenre(tvs, selectedGenreId);
             cy.get("#genre-select").click();
             cy.get("li").contains(selectedGenreText).click();
             cy.get(".MuiCardHeader-content").should(
               "have.length",
               matchingTvs.length
             );
           
          });
});
  });
});

