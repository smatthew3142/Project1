var calories;
var recipeObj = [];



$("body").on("click","#submit", function cards(event){
     event.preventDefault();
     // console.log
     
      var foodSelection = $("#food").val().trim();
      
      var inputCalories = $("#userCalories").val().trim();

      var dietNeeds =   


       calories =  "lte " + inputCalories
   //   var stuff = "chicken"
      var apiKey = "44952938118975f4434da59356ed9033";

      var queryURL = "https://api.edamam.com/search?q=" + foodSelection + "&api_key=" + apiKey + "&calories=" + calories
      

      
      $.ajax({

          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response;
          console.log(results);
          var recipes = results.hits
          console.log(recipes)




          for( i=0; i < recipes.length; i++){
              var recipeTitle = recipes[i].recipe.label;
              var recipeUrl = recipes[i].recipe.url;
              var TotalRecipesCals = recipes[i].recipe.calories;
              var recipeImages = recipes[i].recipe.image;
              
              var recipesCals = Math.floor(TotalRecipesCals / recipes[i].recipe.yield);


              /*var recipeCard = $("<div class ='card'")
              recipeCard.html(recipeTitle)*/

    
  

    var h = '<div class="card customCard" >';
    h += '<img class="card-img-top" src="' + recipeImages + '" >';
    h+= '<div class="card-block">'
    h+= '<h4 class="card-title customCardTitle">' + recipeTitle + '</h4>'
    h+= '<p class= "card-text c-text">' + 'Calories per Serving : ' + recipesCals + '</p>'
   h+= '<a href=" '+ recipeUrl +' " class="btn btn-primary centerButtons customButton"> Get the recipe</a>' 
    h += '</div>'
    h += '</div>';

  /*  for(j=0; j <= 3; j++){
       var newRow = '<div class = "row">'
       newRow.append(h);
       newRow+= '</div>'
    } */
     
    $("#cardRow").append(h);
    console.log(recipeObj);

   

              


             /* console.log(" Recipe Title : " +  recipes[i].recipe.label)
              console.log(" Recipe URL : " + recipes[i].recipe.url)
              console.log(" Recipe calories : " + recipes[i].recipe.calories)
              console.log(" Recipe images : " + recipes[i].recipe.image)
*/
     $(".form1").empty()           

          
            /*$("#main").append(recipeTitle + "<br>" + recipeUrl + "<br>" + recipesCals + "<br>")*/


          }










});

 });  
console.log(recipeObj);
console.log(recipesCals);
console.log(recipeUrl);

/* $("body").on("click",".customCard", function Modal(event){
     event.preventDefault();     
      console.log('this works');



    });
*/
         