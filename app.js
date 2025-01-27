
const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`

// Fetch random cocktail from API
async function loadAllDrinks(count){
    const allDrinks = []
    for(let i = 0; i < count; i++){
            allDrinks.push(await fetch(url).then(response => response.json()))
    }

    Promise.all(allDrinks)
    .then(drinks=>{
        displayDrinks(drinks)
    })
    .catch(error=> {
        console.error('Error fetching cocktail:', error)
    })
}

const displayDrinks = (drinks)=>{
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ""

    drinks.forEach(drinkData => {
        const drink = drinkData.drinks[0]
        console.log(drinkData.drinks[0])
        const div = document.createElement("div")
        div.classList.add("drink-card")
        div.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
            <h1><span>Title:</span> ${drink.strDrink}</h1>
        `
        cardContainer.appendChild(div)
    });
}

const searchDrinks = ()=>{
    const seacrchInput = document.getElementById("search-input")
    const btnSearch = document.getElementById("btn-search")

    btnSearch.addEventListener("click",()=>{
        const searchValue = seacrchInput.value.trim()

        if(searchValue === ""){
            alert("Please enter valid drink data")
        }
    })
}

loadAllDrinks(12)
searchDrinks()