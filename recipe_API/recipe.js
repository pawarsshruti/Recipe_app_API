const searchbox = document.querySelector('.Searchbox');
const submit = document.querySelector('.submit');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


const fetchRecipe = async (query) =>
{ 
         recipeContainer.innerHTML="<h2>Fetching Recipes for you...</h2>";
      try {   
    const data = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    console.log(response);
     
    recipeContainer.innerHTML="";
    response.meals.forEach(meal =>
        {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML =`
            <img src= "${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea} Dish</p>
            <p>${meal.strCategory}</p>
            `;
         const button =document.createElement('button');
         button.textContent="View Recipe";
         recipeDiv.appendChild(button);

         //adding event listner to recipe button
         button.addEventListener('click' , () =>
         {
            recipePopup(meal);
         });


            recipeContainer.appendChild(recipeDiv);
        })
}
   catch (error) {
    recipeContainer.innerHTML="<h2>Error in Fetching Recipes!</h2>";
   }
}

//function to fetch ingedients and methods

const fetchIngredients =(meal) =>
{
    let ingredientList ="";
    for(let i=1;i<=20; i++)
    {
        const ingedients =meal[`strIngredient${i}`];
        if(ingedients)
        {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingedients}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

const recipePopup =(meal) =>
{
    recipeDetailsContent.innerHTML =
    `<h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients</h3>
    <ul>${fetchIngredients(meal)}</ul>
    <div>
    <h3>Instructions:</h3>
    <p class="recipeInstructions">${meal.strInstructions}</p>
    <div>`

    recipeDetailsContent.parentElement.style.display ="block";
}

recipeCloseBtn.addEventListener('click' , (e) =>
{
    recipeDetailsContent.parentElement.style.display="none";
});
submit.addEventListener('click' , (e) =>
{
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    fetchRecipe(searchinput);
    console.log("clickedd");
})