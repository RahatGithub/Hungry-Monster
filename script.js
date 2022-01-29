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
            const description = category.strCategoryDescription;
            const thumbnail = category.strCategoryThumb;
            const div = document.createElement('div');
            div.innerHTML = `
                <img class="thumbnail" src="${thumbnail}" alt="thumbnail">
                <h3>${categoryName}</h3>
                <p>${description.slice(0, 100)}...</p>
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
        matchCategory(categories, input);
    })

    //fetching all the areas
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then(res => res.json())
    .then(data => {
        // console.log(data.meals);
        const areas = data.meals;
        matchArea(areas, input);
    })
}

const matchCategory = (data, input) => {
    for(let i=0; i<Object.keys(data).length; i++){
        // console.log(data[i].strCategory, input);
        if (input == data[i].strCategory){
            console.log(input + " found");
            break;
        }
    }
}

const matchArea = (data, input) => {
    for(let i=0; i<Object.keys(data).length; i++){
        // console.log(data[i].strCategory, input);
        if (input == data[i].strArea){
            console.log(input + " found");
            break;
        }
    }
}