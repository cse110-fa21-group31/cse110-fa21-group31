window.addEventListener('DOMContentLoaded', init);
  

const mongoInterface;

async function init() {
    mongoInterface = new MongoInterface();

    // Make the search button functional
    bindSearchButton();
}


function bindSearchButton() {
    let searchButton = document.querySelector("#submit");
    let searchForm = document.querySelector("form")
    searchButton.addEventListener("click", function(){
        mongoInterface.findRecipes(searchForm.data);
    });
}