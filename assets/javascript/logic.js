var calories;

$("body").on("click","#submit", function(event){
     event.preventDefault();
     // console.log
     
      
      var calories = "500"
   //   var stuff = "chicken"
      var apiKey = "44952938118975f4434da59356ed9033";

      var queryURL = "https://api.edamam.com/search?q=chicken&api_key=" + apiKey + "&calories=" + calories
      

      
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
              var recipesCals = recipes[i].recipe.calories;
              var recipeImages = recipes[i].recipe.image;
              


              console.log(" Recipe Title : " +  recipes[i].recipe.label)
              console.log(" Recipe URL : " + recipes[i].recipe.url)
              console.log(" Recipe calories : " + recipes[i].recipe.calories)
              console.log(" Recipe images : " + recipes[i].recipe.image)  

          
            $("#main").append(recipeTitle + "<br>" + recipeUrl + "<br>" + recipesCals + "<br>")


          }










});

 });       


         