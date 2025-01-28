const cardContainer = document.getElementById("card-container")

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
    cardContainer.innerHTML = ""

    drinks.forEach(drinkData => {
        const drink = drinkData.drinks[0]
        // console.log(drinkData.drinks[0])
        const div = document.createElement("div")
        div.classList.add("drink-card")
        div.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
            <h1><span>Title:</span> ${drink.strDrink}</h1>
            <h5>Category: ${drink.strCategory}</h5>
            <p>Instructions: ${drink.strInstructions.slice(0,20)}...</p>
            <div class="button-container">
                <button class="add-to-cart-btn" onclick="addToCart('${drink.strDrinkThumb}','${drink.strDrink}')">Add To Cart</button>
                <button class="details-btn" onclick="detailsDrink('${drink.strDrink}','${drink.strDrinkThumb}','${drink.strCategory}','${drink.strAlcoholic}','${drink.strInstructions}')">Details</button>
            </div>
        `
        cardContainer.appendChild(div)
    });
}

// Details Function
const modalContainer = document.getElementById("modal-container")

const detailsDrink = (title,image,category,alchoholic,description)=>{
    modalContainer.style.display = 'flex'
    const div = document.createElement("div")
    div.classList.add("modal-content")
    div.innerHTML = `
    <h5>${title}</h5>
    <img src="${image}" alt="${title}" />
    <p>Details:</p><br/>
    <h5>Category: ${category}</h5>
    <h5>Alchoholic: ${alchoholic}</h5>
    <p>Descrition: ${description.slice(0,40)}</p>
    <div class="close-modal">
        <button id="closeBtn" onclick="closeModal()">Close</button>
    </div>
    `
    modalContainer.appendChild(div)
}

// Close Modal Function
const closeModal = ()=>{
    modalContainer.style.display = "none"
}

// Add to cart Function
let serialNumber = 0
const addToCart = (image,title)=>{
    const addCart = document.getElementById("cart-items")
    const cartCount = document.getElementById("cart-title")
    if(serialNumber >= 7){
        alert("Cart is full")
        return
    }
    serialNumber += 1
    cartCount.innerHTML = `${serialNumber}`
    const tr = document.createElement("tr")
    tr.innerHTML = `
        <td>${serialNumber} </td>
        <td><img class="table-img" src="${image}" width="50" height="50"/></td>
        <td><h5> ${title} </h5></td>
    `
    addCart.appendChild(tr)
}

// Drink Search Function
const searchDrinks = ()=>{
    const seacrchInput = document.getElementById("search-input")
    const btnSearch = document.getElementById("btn-search")

    btnSearch.addEventListener("click",()=>{
        const searchValue = seacrchInput.value.trim()

        if(searchValue === ""){
            alert("Please enter valid drink data")
        }

        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`
        fetch(url)
        .then(response => response.json())
        .then(drinkdata=>{
            cardContainer.innerHTML = ""

            if(drinkdata.drinks){
                drinkdata.drinks.forEach(drink=>{
                    console.log(drink.strDrink)
                    const div = document.createElement("div")
                    div.classList.add("drink-card")
                    div.innerHTML = `
                        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
                        <h1><span>Title:</span> ${drink.strDrink}</h1>
                        <h5><span>Category:</span> ${drink.strCategory}</h5>
                        <p>Instructions: ${drink.strInstructions.slice(0,20)}...</p>
                        <div class="button-container">
                            <button class="add-to-cart-btn" onclick="addToCart('${drink.strDrinkThumb}','${drink.strDrink}')">Add To Cart</button>
                            <button class="details-btn">Details</button>
                        </div>
                    `
                    cardContainer.appendChild(div)
                })
            }else{
                const h1 = document.createElement("h1")
                const cardMessage = document.getElementById("card-message")
                h1.classList.add("error-message")
                h1.textContent = "No drinks found!"
                cardMessage.appendChild(h1)
            }
        })
    })
}



loadAllDrinks(12)
searchDrinks()