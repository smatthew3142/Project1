$(document).ready(function(){
//get YouTube videos
  function displayYoutube5() {

          var topic = "cooking techniques";
          var youTubeKey = "AIzaSyDxVMZ4ZVWcozAHuQLIYSv3KnR05R4E68w";
          var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&q="+ topic + "&type=video&key="+ youTubeKey;
          // console.log(topic);

          $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {

            var results = response;
            console.log(results);

            var video = results.items;
            console.log(video);

            for (var i = 0; i < video.length; i++) {

              var videoDiv = $("<div class='videoTile'>");

              var thumbnail = $("<img class = 'vidThumb'>");


              // console.log(video[i].id.videoId);

              thumbnail.attr("src", video[i].snippet.thumbnails.medium.url);

              var tag = $("<a>");

              tag.attr("href","https://www.youtube.com/watch?v="+ video[i].id.videoId);

              tag.addClass("overImage");

              var title = $("<h4>").text(video[i].snippet.title);

              var channelTitle = $("<p>").text(video[i].snippet.channelTitle);

              tag.append(title);
              tag.append(channelTitle);

              
              videoDiv.append(thumbnail);
              videoDiv.append(tag);
              
              
              $("#viewVideos").prepend(videoDiv);

              }

            });
        }
    
        displayYoutube5();
      });

//clear form for next search
   $(".btn-lg").on('click', function(event)
    {
      $('#my-form')[0].reset();
        // $("#inputName").val("");
        // $("#inputFood").val("");
        // $("#inputMin").val("");
        // $("#inputMax").val("");
    });

/////// Chris Code ////

  var calories;
  var recipeObj = [];
  var labels = [];




  $("body").on("click","#submit", function cards(event){

    $("#viewRecipes").empty();


       event.preventDefault();

       
        var foodSelection = $("#inputFood").val().trim();
        var minCalories = $("#inputMin").val().trim();
        var maxCalories = $("#inputMax").val().trim();

        var dietaryRestrictions = $('input[type=checkbox]:checked').val();

        calories =  "gte " + minCalories + ",lte " + maxCalories; 

        var appId= "d0d831cb"
        var apiKey = "44952938118975f4434da59356ed9033";

        var queryURL = "https://api.edamam.com/search?q=" + foodSelection + "&app_id=" + appId + "&app_key=" + apiKey + "&calories=" + calories + "&health=" + dietaryRestrictions;
     
        // var apiKey = "44952938118975f4434da59356ed9033";

        // var queryURL = "https://api.edamam.com/search?q=" + foodSelection + "&api_key=" + apiKey + "&calories=" + calories  //+ "&health="  + dietaryRestrictions
        

        
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
                var ingredients = recipes[i].recipe.ingredientLines;
                var healthLabels = recipes[i].recipe.healthLabels;
                

                var divCard = $("<div>")
                divCard.attr("class", "card  customCard")
               
             
                var img = $("<img>")
                img.attr("class", "card-img-top" );
                img.attr("src", recipeImages);
                divCard.append(img);

                var cardBlock = $("<div>")
                cardBlock.attr("class", "card-block")
                divCard.append(cardBlock);

              
                var cardTitle = $("<h4>")
                cardTitle.attr("class", "cardTitle customCardTitle")
                cardTitle.html(recipeTitle)
                cardBlock.append(cardTitle)

                var cardText = $("<p>")
                cardText.attr("class", "card-text c-text")
                cardText.html("Calories per Serving : " + recipesCals)
                cardBlock.append(cardText)

               /*var glyph = $("<span>")
               glyph.attr("class", "glyphicon glyphicon-heart-empty customGlpyh")
               glyph.attr("aria-hidden", "true")
               cardBlock.append(glyph)

     
              glyph.attr("data-favorited", "glyphicon glyphicon-heart customGlpyh" );
              glyph.attr("data-not-favorited", "glyphicon glyphicon-heart-empty customGlpyh");
              glyph.attr("data-state", "not-favorited");*/


               var cardLink = $("<a href>")
               cardLink.attr("class", "recipeUrl")
               cardLink.html(recipeUrl)
               cardBlock.append(cardLink)


                var ingredientsList = $("<ul>");
                ingredientsList.attr("class", "ingredient-list")
                for(j=0; j < ingredients.length; j++){
              
                ;

                var newIngredient = $("<li>");
                newIngredient.html(ingredients[j]);
                ingredientsList.append(newIngredient);
                cardBlock.append(ingredientsList); 
              };
              
                var healthLabelsList = $("<ul>");
                healthLabelsList.attr("class", "health-labels-list");
                for(t=0; j < healthLabels.length; j++){
                

                var newHealthLabel = $("<li>");
                newHealthLabel.html(healthLabels[j]);
                healthLabelsList.append(newHealthLabel);
                cardBlock.append(healthLabelsList);           

                        

              }
     
       
              $("#viewRecipes").append(divCard);
    

              } 

              });
              });


  // $("body").on("click", ".customGlpyh" , function() {
       
  //       var state = $(this).attr("data-state");
       
  //       if (state === "not-favorited") {
  //         $(this).attr("src", $(this).attr("data-favorited"));
  //         $(this).attr("data-state", "favorited");
  //         console.log("now favorited")

  //       } else {
  //         $(this).attr("src", $(this).attr("data-not-favorited"));
  //         $(this).attr("data-state", "not-favorited");
  //           console.log("now un-favorited")
  //       }
  //     });





  $(document).on("click",".customCard", function() {
         
          $(".recipe-modal-body").empty();
          $(".customButton").remove();

          var recipeTitle = $(this).find("h4").html();
          console.log(recipeTitle);
          var modalTitle = $("<h2>" )
          modalTitle.html(recipeTitle)
           $(".recipe-modal-body").prepend(modalTitle);


          
         

          var recipeImg = $(this).children("img").attr("src");
          console.log(recipeImg);
          var modalImg = $("<img>")
          modalImg.attr("class", "modalImg" );
          modalImg.attr("src", recipeImg);
          $(".recipe-modal-body").append(modalImg);


         
         var ingredientLi = $("<div>")
         ingredientLi.attr("class", "ingredientLi");

         var ingredientsList = $(this).find("ul.ingredient-list").html();
         console.log("Ingredients : " + ingredientsList);
        var ingredientsListTitle = $("<h4>");
         ingredientsListTitle.attr("class" , "ingredientsListTitle");
         ingredientsListTitle.html("What you'll need");
        $(ingredientLi).append(ingredientsListTitle);
        $(ingredientLi).append(ingredientsList);
     
        $(".recipe-modal-body").append(ingredientLi);


        /* var healthLabels = $(this).find("ul.health-labels-list").html();
         
         console.log("health labels" + healthLabels)
         var healthLabelTitle = $("<h4>")
         healthLabelTitle.attr("class" , "ingredientsListTitle")
         healthLabelTitle.html("This recipe contains")
        $(".modal-body").append(healthLabelTitle)
          $(".modal-body").append(healthLabels);*/

          
          var recipeLink = $(this).find("a").html()
          console.log(recipeLink);
          

         var recipeButtonModal= '<a href=" '+ recipeLink +' "target="_blank" class="btn btn-primary centerButtons customButton"> Get the recipe</a>' 


      /*    var modalButton = $ ("<a href>")
          modalButton.attr("src" , recipeLink)
          var newModalButton = $ ("<button>")
          newModalButton.attr("class" , "btn btn-primary customButton")
          modalButton.append(newModalButton)
  */
   $(".modal-footer").prepend(recipeButtonModal);


        

          $('#myRecipeModal').modal('show');
      });

  $(document).on("click",".closeModal", function() {
         $(".recipe-modal-body").empty();
         $(".customButton").remove();


//FIREBASE ELEMENT//

var config = {
    apiKey: "AIzaSyDqU6NAXBzTo2oAZDPha9vSD9wkFuiJi5U",
    authDomain: "rutgerssuperfoods-d50a1.firebaseapp.com",
    databaseURL: "https://rutgerssuperfoods-d50a1.firebaseio.com",
    projectId: "rutgerssuperfoods-d50a1",
    storageBucket: "rutgerssuperfoods-d50a1.appspot.com",
    messagingSenderId: "1009521301428"
  };
  firebase.initializeApp(config); 

  var database = firebase.database();

  $()






});