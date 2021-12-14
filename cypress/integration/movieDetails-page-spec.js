let movieId = 335983; 
let movie;
let reviews;

describe("Movie Details Page", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${Cypress.env(
        "TMDB_KEY"
      )}`
    )
      .its("body")
      .then((movieDetails) => {
        movie = movieDetails;
        return movieDetails.id;
      });
  });
  beforeEach(() => {
    cy.visit(`/movies/${movie.id}`);
  });
 
    it("should display movie title in the page header", () => {
        cy.get("h3").contains(movie.title);
    });

    it("should display the movie's details", () => {
        cy.get("h3").contains("Overview");
        cy.get("h3").next().contains(movie.overview);
        cy.get("ul")
            .eq(1)
            .within(() => {
            const genreChips = movie.genres.map((g) => g.name);
            genreChips.unshift("Genres");
            cy.get("span").each(($card, index) => {
                cy.wrap($card).contains(genreChips[index]);
            });
            });
        });

    it("should display movie posters on the left side", () => {
        cy.get('img').should('have.css', 'text-align', 'left');
    });
});