$(document).ready(function () {
  $(".sidebarbtn").click(function () {
    $(".sidebar").toggleClass("active");
  });
});

$(document).ready(function () {
    $('#loading').fadeOut(1000, function () {
        $('body').css("overflow", "visible")
    })
})

let data = [];
async function getMainMeal() {
  let request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=side`
  );

  let finalResult = await request.json();
  data = [...finalResult.meals];
  console.log(data);
  displayMainMeal();
}
getMainMeal();

function displayMainMeal() {
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    cartona += `<div class=" col-md-4  position-relative">
                      <div  class="image p-2">
                    <img src= "${data[i].strMealThumb}" width="100%">
                </div>
         <div onclick ="getMeal('${data[i].idMeal}')" class="text-content text-dark d-flex justify-content-center align-items-center" >
           <div class="text">
            <h6 >${data[i].strMeal}</h6 >
           </div>
         </div>

        </div>`;
  }
  document.getElementById("display").innerHTML = cartona;
}
async function getMeal(mealID) {
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  meal = await meal.json();
  displayMeal(meal.meals[0]);
}

function displayMeal(meal) {
  let cartona = "";
  for (let i = 1; i <= 20; i++) {
    cartona += `<li class="my-3 mx-1 p-2 rounded">${meal[`strMeasure${i}`]} ${
      meal[`strIngredient${i}`]
    }</li>`;
  }
  let displaymeal = `
                    <div class="col-md-4 text-white">
					<img class="w-100" src="${meal.strMealThumb}">
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 text-white ">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p class="fs-3 fw-bolder"> Area:${meal.strArea}</p>
					<p class="fs-3 fw-bolder">Category : ${meal.strCategory}</p>
					<h3>Recipes</h3>
					<ul class="text-white d-flex flex-wrap" id="recipes">
					</ul>
					<h3 class="mx-1 my-1 text-white">Tags</h3>
					<ul class="text-white my-2 text-dark">
                     <li class=" mx-1 my-2 border border-1  p-2 rounded-2">${meal.strTags}</li>
                    </ul>
					<a class="btn btn-warning text-dark mx-2 p-2" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn btn-info youtube text-dark mx-2 p-2" target="_blank" href="${meal.strYoutube}">Youtub</a>

                    </div>`;

  document.getElementById("display").innerHTML = displaymeal;
  document.getElementById("recipes").innerHTML = cartona;
}

let category = document.getElementById('send');
category.addEventListener('click', function () {
     $('#loading').fadeIn(300)
    getCategories();
         $("#loading").fadeOut(500);

})

function displayCategories() {
  let cartona = ``;
  for (var i = 0; i < data.length; i++) {
    cartona += `<div class=" col-md-4  position-relative">
    <div  class="image">
                    <img src= "${data[i].strCategoryThumb}" width="100%">
                </div>
            <div onclick="filterByCategory('${data[i].strCategory}')" class="text-content text-dark d-flex justify-content-center align-items-center">
               <div class="text">
                        <h2>${data[i].strCategory}</h2>
                        <p>${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        </div>
    `;
  }
  document.getElementById("display").innerHTML = cartona;
}

async function getCategories() {
  categoriesdb = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  categoriesdb = await categoriesdb.json();
  data = [...categoriesdb.categories];
    console.log(data);
    displayCategories();
}


async function filterByCategory(category) {
    let filterCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    filterCategory = await filterCategory.json();
    data = [...filterCategory.meals];
    displayMainMeal();
}

let area = document.getElementById('area');
area.addEventListener('click',function () {
    getArea();
})

function displayArea() {
  let cartona = ``;
    for (var i = 0; i < data.length; i++) {
      
  
        cartona += `
    <div class="area col-md-4 my-3  shadow ">
        <div class="shadow rounded mx-1 bg-danger  text-center">
            <div onclick="filterByArea('${data[i].strArea}')">
                <i class="fa-5x text-white fa-solid fa-house"></i>
                <h2 class="text-white">${data[i].strArea}</h2>
            </div>
        </div>
    </div>`;
    }
    document.getElementById('display').innerHTML = cartona;
}
async function getArea() {
    area = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    area = await area.json();
    data = [...area.meals]
    displayArea();
}

async function filterByArea(area) {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
    meals = await meals.json();
    data = [...meals.meals.slice(0, 20)];
    displayMainMeal();
  
}


let Ingredients = document.getElementById("Ingredients");
Ingredients.addEventListener('click',function () {
    getIngredient();
})

async function getIngredient() {
  Ingredients = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  Ingredients = await Ingredients.json();
  data = [...Ingredients.meals];
  displayIngredients();
}

function displayIngredients() {
  let cartona = "";
    for (var i = 0; i < 20; i++) {
        cartona += `
    <div class=" ingredients text-center col-md-4 my-3">
        <div onclick="getIngredientByFilter('${data[i].strIngredient}')" class="shadow rounded">
            <div class=" bg-dark">
                <i class="text-white fa-solid fa-bowl-food fa-3x"></i>
                <h2 class="text-white">${data[i].strIngredient}</h2>
                <p class="text-white">${data[i].strDescription.split(" ").splice(0, 30).join(" ")}</p>
            </div>
        </div>
    </div>`;
    }
    document.getElementById('display').innerHTML = cartona;
}

async function getIngredientByFilter(mealName) {
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`
  );
    meal = await meal.json();
    data=[...meal.meals]
    displayMainMeal();
}

let searchInput = document.getElementById('search');
searchInput.addEventListener("click", function () {
    
  document.getElementById("display2").innerHTML = `
    <div class="col-6 mt-5">
        <input id="searchInput" type="text" class="form-control border-0 border-bottom border" placeholder="SEARCH By Word">

    </div>
    <div class="col-6 mt-5 ">
        <input id="searchByLetter"  maxlength="1" type="text" class="form-control border-0 border-bottom border" placeholder="SEARCH">

    </div>
    
    `;
    async function searchByWord(term) {
  let searchWord = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
    searchWord = await searchWord.json();
    data=[...searchWord.meals]
  displayMainMeal();
}
    $("#searchInput").keyup((e) => {

    searchByWord(e.target.value)
})

});
$("#searchByLetter").keyup((e) => {
  searchByWord(e.target.value)
});



let contact = document.getElementById('contact');
contact.addEventListener('click',function () {
  document.getElementById("display2").innerHTML = `
  <div class="container text-center my-2" >
   <div class="row my-2">
        <h2 class="text-white">Contact Us.....</h2>
        <div class="col-md-6 my-2">
            <input type="text" class="form-control " name="" id="nameInput" placeholder="ENTER NAME">
            
        </div>
        <div class="col-md-6 my-2">
            <input type="email" class="form-control " name="" id="mailinput" placeholder="ENTER E-MAIL">
            <div id="alert" class="my-1 d-none alert alert-danger">Enter valid email. *Ex: xxx@yyy.zzz
</div>
            
        </div>
        
    </div>
    <div class="row my-2">
        <div class="col-md-6 my-2">
            <input type="number" name="" class=" form-control" id="phoneinput" placeholder="ENTER PHONE">
            <div id="alertphone" class="my-1 d-none alert   alertphone alert-danger">Enter valid Phone Number
            </div>
        </div>
        <div class="col-md-6 my-2">
            <input class="form-control" type="number" name="" id="ageinput" placeholder="ENTER AGE">
            <div id="alertage" class="my-1 d-none alert   alertphone alert-danger">Enter valid Age
            </div>
        </div>
    </div>
    <div class="row my-2">
        <div class="col-md-6 my-2">
            <input class="form-control" type="password" name="" id="passwordinput" placeholder="ENTER Password">
    <div id="alertpassword" class="my-1 d-none alert   alertphone alert-danger">Enter valid password *Minimum eight characters,and ten number :*

    </div>
        </div>
        <div class="col-md-6 my-2">
            <input class="form-control" type="password" name="" id="repasswordinput" placeholder="ENTER REPassword">
        <div id="alertrepassword" class="my-1 d-none alert   alertphone alert-danger">Enter Valid Repassword 
        
        </div>
        </div>
    </div>
    <button id="submit" class=" btn btn-danger disabled" >Submit</button>
    </div>
  `;

  let nameinput = document.getElementById("nameInput");
  let mailinput = document.getElementById("mailinput");
  let ageinput = document.getElementById("ageinput");
  let phoneinput = document.getElementById("phoneinput");
  let passwordinput = document.getElementById("passwordinput");
  let repassworddinput = document.getElementById("repasswordinput");
  let btn = document.getElementById("submit");
  console.log(
    nameinput,
    phoneinput,
    mailinput,
    ageinput,
    passwordinput,
    repassworddinput
  );

  nameinput.addEventListener("keyup", function () {
    validationNameInput();
  });
  function validationNameInput() {
    let regexp = /^[A-Za-z][a-z]{3,10}$/;
    if (regexp.test(nameinput.value)) {
      nameinput.classList.add("is-valid");
      nameinput.classList.remove("is-invalid");
    } else {
      nameinput.classList.add("is-invalid");
      nameinput.classList.remove("is-valid");
    }
  }
  mailinput.addEventListener("keyup", function () {
    validationMailInput();
  });
  let alertForMail = document.getElementById("alert");
  function validationMailInput() {
    let regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3}))$/;
    if (regexp.test(mailinput.value)) {
      mailinput.classList.add("is-valid");
      mailinput.classList.remove("is-invalid");
      alertForMail.classList.add("d-none");
    } else {
      mailinput.classList.add("is-invalid");
      mailinput.classList.remove("is-valid");
      alertForMail.classList.replace("d-none", "d-block");
      // alertForMail.classList.remove('d-block')
    }
  }

  phoneinput.addEventListener("keyup", function () {
    validationPhoneInput();
  });

  let alertphone = document.getElementById("alertphone");
  function validationPhoneInput() {
    let regexp = /^01(1|2|0|5)[0-9]{8}$/;
    if (regexp.test(phoneinput.value)) {
      phoneinput.classList.add("is-valid");
      phoneinput.classList.remove("is-invalid");
      alertphone.classList.add("d-none");
    } else {
      phoneinput.classList.add("is-invalid");
      phoneinput.classList.remove("is-valid");
      alertphone.classList.replace("d-none", "d-block");
      // alertForMail.classList.remove('d-block')
    }
  }

  ageinput.addEventListener("keyup", function () {
    validationAgeInput();
  });
  let alertage = document.getElementById("alertage");
  function validationAgeInput() {
    let regexp = /^[1-9][0-9]?$|100$/;
    if (regexp.test(ageinput.value)) {
      ageinput.classList.add("is-valid");
      ageinput.classList.remove("is-invalid");
      alertage.classList.add("d-none");
    } else {
      ageinput.classList.add("is-invalid");
      ageinput.classList.remove("is-valid");
      alertage.classList.replace("d-none", "d-block");
      // alertForMail.classList.remove('d-block')
    }
  }

  passwordinput.addEventListener("keyup", function () {
    validationPasswordInput();
  });

  let alertpassword = document.getElementById("alertpassword");

  function validationPasswordInput() {
    let regexp = /[a-zA-z]{8,}[0-9]{10}$/;
    if (regexp.test(passwordinput.value)) {
      passwordinput.classList.add("is-valid");
      passwordinput.classList.remove("is-invalid");
      alertpassword.classList.add("d-none");
    } else {
      passwordinput.classList.add("is-invalid");
      passwordinput.classList.remove("is-valid");
      alertpassword.classList.replace("d-none", "d-block");
    }
  }

  repassworddinput.addEventListener("keyup", function () {
    validationRePasswordInput();
  });
  let alertrepassword = document.getElementById("alertrepassword");

  function validationRePasswordInput() {
    if (passwordinput.value == repassworddinput.value) {
      repassworddinput.classList.add("is-valid");
      repassworddinput.classList.remove("is-invalid");
      alertrepassword.classList.add("d-none");
      btn.classList.remove("disabled");
    } else {
      alertrepassword.classList.replace("d-none", "d-block");
      btn.classList.add("disabled");
    }
  }


})





