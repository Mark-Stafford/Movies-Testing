let movies;    // List of movies from TMDB
let Upcoming;

// Utility functions
const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

  describe("Upcoming Tests ", () => {

    beforeEach(() => {
      cy.visit("/movies/Upcoming")
    });

    before(() => {
      // Get movies from TMDB and store in movies variable.
      cy.request(
        `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&include_adult=false&include_video=false&page=1`
      )
        .its("body")    // Take the body of HTTP response from TMDB
        .then((response) => {
          movies = response.results
        })
    })

    
     
        describe("Page test", () => {
            it("displays page header", () => {
              cy.get("h3").contains("Upcoming Movies");
              cy.get("h1").contains("Filter the movies");
            });
          });
      
    });

    describe("Navagation Tests", () => {     

        before(() => {
            cy.request(
              `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`
      
            )
            .its("body")
            .then((response) => {
              Upcoming = response.results;
            });
          });

          beforeEach(() => {
            cy.visit("/movies/Upcoming")
          });

          it("Testing to check the more info button on upcoming page", () => {

            cy.wait(100)   //wait to go back to Upcoming page
               
             cy.get(".MuiCardActions-root").eq(0).contains("More Info").click(); //Click on card 1 more info button 
             cy.url().should("include", `/movies/${Upcoming[0].id}`); //check url is new one 
          
             
             cy.get("header").find(".MuiToolbar-root").find("button").eq(2).click();  //use header to go to Upcoming
             cy.get("h3").contains("Upcoming Movies");  //check page is favourites 
    });
        
         
          it("Navagation Between Home Page and Upcoming Page", () => {
            cy.get("header").find(".MuiToolbar-root").find("button").eq(0).click();  //go back home using header
            cy.get("h3").contains("Discover Movies"); //check my page is home

            cy.get("button[aria-label='go back'").click();  //use back button to go back to upcoming 
            cy.get("h3").contains("Upcoming Movies");; //check page is trending 
            
      
            cy.get("button[aria-label='go forward'").click();  //use forword button to go back home
            cy.get("h3").contains("Discover Movies");;  //check im back home
            

    });

   
});

describe("Filtering Tests", () => { 
  
    beforeEach(() => {
      cy.visit("/movies/Upcoming")
    });

    it("testing filterting and searching together", () => { 
        const selectedGenreText = "Comedy";
        let searchString = "r"; 
    
        cy.get("#genre-select").click(); //click genre drop down menu 
        cy.get("li").contains(selectedGenreText).click();  //use selectedGenreText to select comedy
    
        cy.get("#filled-search").clear().type(searchString); // Enter b in text box
        
    });

    it("see if user can change genre on upcoming page", () => { 
        const selectedGenreText = "Action";
        const backToAll = "All";

    cy.get("#genre-select").click(); //click genre drop down menu 
    cy.get("li").contains(selectedGenreText).click();  //use selectedGenreText to select action

      
    cy.wait(400);

    cy.get("#genre-select").click(); //click genre drop down menu 
    cy.get("li").contains(backToAll).click();  //use selectedGenreText to select All
    });

    it("search for movies with the letter K", () => { 
        let searchString = "K"; 
        cy.get("#filled-search").clear().type(searchString); // Enter K in text box
      });
    
    


    
  });


  //feature 1 finised 