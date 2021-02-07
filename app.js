
        const searchButton = () => {
            let search = document.getElementById("search").value;
            let url = "";
            if (search.length == 1) {
                url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
            }
            else {
                url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
            }
            console.log(url);
            fetch(url)
                .then(res => res.json())
                .then(data => displayData(data.meals))
            document.getElementById("search").value = "";
            document.getElementById("meals").innerHTML = "";
        }
        const displayData = allData => {
            console.log(allData);
            if (allData === null) {
                document.getElementById("missMatch").innerText = "No Match Please Search Again."
                console.log("Nothing Found");
                document.getElementById("detailShow").innerHTML = "";
            } else {
                mealsDiv = document.getElementById("meals");
                allData.forEach(meal => {
                    const mealDiv = document.createElement("div");
                    mealDiv.className = "meal";
                    const newTag = `
                    <div onclick="showDetails('${meal.idMeal}')"> 
                    <img src="${meal.strMealThumb}">               
                    <h6 class="mealName">${meal.strMeal}</h6>
                    </div>
                `;
                    mealDiv.innerHTML = newTag;
                    mealsDiv.appendChild(mealDiv);
                });
                document.getElementById("missMatch").innerText ="";
                document.getElementById("detailShow").innerHTML = "";
                
            }
        } 
        const showDetails = details => {
            console.log(details);
            const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`;
            fetch(url)
                .then(res => res.json())
                .then(data => mealDetails(data.meals[0]))
        }
        const mealDetails = detail => {
            console.log(detail);
            detailsDiv = document.getElementById("detailShow");
            detailsDiv.innerHTML = `     
                    <img src="${detail.strMealThumb}">
                    <h2>${detail.strMeal}</h2>
                    <h4>Ingrediants</h4>           
                    <li> ${detail.strIngredient1}</li>
                    <li> ${detail.strIngredient2}</li>
                    <li> ${detail.strIngredient3}</li>
                    <li> ${detail.strIngredient4}</li>
                    <li> ${detail.strIngredient5}</li>
                    <li> ${detail.strIngredient6}</li>
                `;
        }