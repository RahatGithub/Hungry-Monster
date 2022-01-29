const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function(){
    const input = document.getElementById('search-bar').value;
    if (input){
        loadCatAndArea(input);
    }
    else{
        alert("Please enter a valid input")
    }
})


const loadDefault = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
        // console.log(Object.keys(data.categories).length)
        for (let i=0; i<Object.keys(data.categories).length; i++){
            const category = data.categories[i];
            const categoryName = category.strCategory;
            const thumbnail = category.strCategoryThumb;
            const div = document.createElement('div');
            div.innerHTML = `
                <img class="thumbnail" src="${thumbnail}" alt="thumbnail">
                <h3>${categoryName}</h3>
            `;
            div.className = "single-item";
            const section = document.getElementById('info-section');
            section.appendChild(div);
        }
    })
}

loadDefault();


const loadCatAndArea = input => {

    //fetching all the categories
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then(res => res.json())
    .then(data => {
        // console.log(data.meals);
        const categories = data.meals;
        const category = matchCategory(categories, input);
        if(category){
            fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c='+category)
            .then(res => res.json())
            .then(data => {
                const section = document.getElementById('extra-info-section');
                section.innerHTML = '';
                for (let i=0; i<Object.keys(data.meals).length; i++){
                    const items = data.meals[i];
                    const name = items.strMeal;
                    const thumbnail = items.strMealThumb;
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <img class="thumbnail" src="${thumbnail}" alt="thumbnail">
                        <h3>${name}</h3>
                        <button onclick="displaySingleItem('${name}')">More</button>
                    `;
                    div.className = "single-item";
                    section.appendChild(div);
                }
            })
        }
    })

    //fetching all the areas
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then(res => res.json())
    .then(data => {
        // console.log(data.meals);
        const areas = data.meals;
        const area = matchArea(areas, input);
        if(area){
            fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a='+area)
            .then(res => res.json())
            .then(data => {
                const section = document.getElementById('extra-info-section');
                section.innerHTML = '';
                for (let i=0; i<Object.keys(data.meals).length; i++){
                    const items = data.meals[i];
                    const name = items.strMeal;
                    const thumbnail = items.strMealThumb;
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <img class="thumbnail" src="${thumbnail}" alt="thumbnail">
                        <h3>${name}</h3>
                        <button onclick="displaySingleItem('${name}')">More</button>
                    `;
                    div.className = "single-item";
                    section.appendChild(div);
                }
            })
        }
    })
}


const matchCategory = (data, input) => {
    for(let i=0; i<Object.keys(data).length; i++){
        // console.log(data[i].strCategory, input);
        if (input == data[i].strCategory){
            return data[i].strCategory;
        }
    }
}


const matchArea = (data, input) => {
    for(let i=0; i<Object.keys(data).length; i++){
        // console.log(data[i].strCategory, input);
        if (input == data[i].strArea){
            return data[i].strArea;
        }
    }
}

const displaySingleItem = name => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+name)
    .then(res => res.json())
    .then(data => {
        const section = document.getElementById('single-item-section');
        section.innerHTML = '';
        const meal = data.meals[0];
        const name = meal.strMeal;
        const thumbnail = meal.strMealThumb;
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${thumbnail}" class="thumbnail">
            <h1>${name}</h1>
            <ul id="ingredient-list"></ul>
        `;
        div.className = 'single-item';
        section.appendChild(div);
        const ingredientList = document.getElementById('ingredient-list');
        for(let i=1; i<=20; i++){
            const ingredient = 'strIngredient'+i
            if(meal[ingredient]){
                const item = document.createElement('li');
                item.innerText = meal[ingredient];
                ingredientList.appendChild(item);
            }
        }
    })
}