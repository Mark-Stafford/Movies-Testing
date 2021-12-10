let tvId = 2778; // Wheel Of Fortune
let tv;
let reviews;

describe("Tv Details Page", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/tv/${tvId}?api_key=${Cypress.env(
        "TMDB_KEY"
      )}`
    )
      .its("body")
      .then((tvDetails) => {
        tv = tvDetails;
        return tvDetails.id;
      });
  });
  beforeEach(() => {
    cy.visit(`/tv/${tv.id}`);
  });
  describe("Base tests", () => {
    it("should display movie title in the page header", () => {
      cy.get("h3").contains(tv.name);
    });


    it("should display the tvshow's details", () => {
        cy.get("h3").contains("Overview");
        cy.get("h3").next().contains(tv.overview);
        cy.get("ul")
          .eq(1)
          .within(() => {
            const genreChips = tv.genres.map((g) => g.name);
            genreChips.unshift("Genres");
            cy.get("span").each(($card, index) => {
              cy.wrap($card).contains(genreChips[index]);
            });
          });
      });
      it("should display the movie posters on the left", () => {
          cy.get('img').should('have.css','text-align','left');
      });

      });
    });
  