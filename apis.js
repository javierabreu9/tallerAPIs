const btn = document.querySelector('button');
const p1 = document.querySelector('h2');
const ingredientList = document.getElementById('ingredient-list');

btn.addEventListener('click', getData);

async function getData() {
    try {
        const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');

        const json = await data.json();
        const cocktail = json.drinks[0];

        // Obtener el nombre del cóctel
        const cocktailName = cocktail.strDrink;

        // Obtener los ingredientes y las medidas
        const ingredients = [];
        for (let i = 1; i <= 15; i++) { // Supongamos que hay hasta 15 ingredientes
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];
            if (!ingredient) {
                break; // Salir del bucle si no hay más ingredientes
            }
            ingredients.push(`${measure} ${ingredient}`);
        }

        // Mostrar el nombre del cóctel
        p1.textContent = cocktailName;

        // Mostrar los ingredientes en la lista
        ingredientList.innerHTML = ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');

    } catch (error) {
        console.error(error);
    }
}

