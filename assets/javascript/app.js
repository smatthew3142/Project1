$(document).ready(function(){
//get YouTube videos -Sarika
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


   //FIREBASE ELEMENT//- SARIKA
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

  $("body").on("click","#submit",function(event){
    
    event.preventDefault();

  var userName = $("#inputName").val().trim();
  var userFood = $("#inputFood").val().trim();
  var userMax = $("#inputMax").val().trim();
  var userMin = $("#inputMin").val().trim();

  var newUser = {
    name: userName,
    food: userFood,
    maxCal: userMax,
    minCal: userMin
  };

  database.ref().push(newUser);

  });

database.ref().on("child_added", function(childSnapshot, prevChildKey){
  
  console.log(childSnapshot.val());

  
  var userName = childSnapshot.val().name;
  var userFood = childSnapshot.val().food;
  var userMax = childSnapshot.val().maxCal;
  var userMin = childSnapshot.val().minCal;



  // Add each user data into the table
  $("#user-table > tbody").append("<tr><td>" + userName + "</td><td>" + userFood + "</td><td>" +
  userMin +"-"+ userMax + "</td><tr>");
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

        // var queryURL = "https://api.edamam.com/search?q=" + foodSelection + "&app_id=" + appId + "&app_key=" + apiKey + "&calories=" + calories + "&health=" + dietaryRestrictions;
        
        if(dietaryRestrictions == undefined){
          var queryURL = "https://api.edamam.com/search?q=" + foodSelection + "&app_id=" + appId + "&app_key=" + apiKey + "&calories=" + calories;
        }

        else {
          var queryURL = "https://api.edamam.com/search?q=" + foodSelection + "&app_id=" + appId + "&app_key=" + apiKey + "&calories=" + calories + "&health=" + dietaryRestrictions;
        };

        
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





});

// Storage Controller
const StorageCtrl = (function(){
  // Public methods
  return {
    storeItem: function(item){
      let items;
      // Check if any items in ls
      if(localStorage.getItem('items') === null){
        items = [];
        // Push new item
        items.push(item);
        // Set ls
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is already in ls
        items = JSON.parse(localStorage.getItem('items'));

        // Push new item
        items.push(item);

        // Re set ls
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem('items') === null){
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updatedItem){
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(updatedItem.id === item.id){
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function(id){
      let items = JSON.parse(localStorage.getItem('items'));
      
      items.forEach(function(item, index){
        if(id === item.id){
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function(){
      localStorage.removeItem('items');
    }
  }
})();


// Item Controller
const ItemCtrl = (function(){
  // Item Constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    // items: [
    //   // {id: 0, name: 'Steak Dinner', calories: 1200},
    //   // {id: 1, name: 'Cookie', calories: 400},
    //   // {id: 2, name: 'Eggs', calories: 300}
    // ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    getItems: function(){
      return data.items;
    },
    addItem: function(name, calories){
      let ID;
      // Create ID
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id){
      let found = null;
      // Loop through items
      data.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });
      return found;
    },
    updateItem: function(name, calories){
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function(id){
      // Get ids
      const ids = data.items.map(function(item){
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);
    },
    clearAllItems: function(){
      data.items = [];
    },
    setCurrentItem: function(item){
      data.currentItem = item;
    },
    getCurrentItem: function(){
      return data.currentItem;
    },
    getTotalCalories: function(){
      let total = 0;

      // Loop through items and add cals
      data.items.forEach(function(item){
        total += item.calories;
      });

      // Set total cal in data structure
      data.totalCalories = total;

      // Return total
      return data.totalCalories;
    },
    logData: function(){
      return data;
    }
  }
})();



// UI Controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }
  
  // Public methods
  return {
    populateItemList: function(items){
      let html = '';

      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function(){
      return {
        name:document.querySelector(UISelectors.itemNameInput).value,
        calories:document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item){
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },
    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${item.id}`){
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteListItem: function(id){
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    removeItems: function(){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(item){
        item.remove();
      });
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors: function(){
      return UISelectors;
    }
  }
})();



// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
  // Load event listeners
  const loadEventListeners = function(){
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

     // Back button event
     document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

     // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  // Add item submit
  const itemAddSubmit = function(e){
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if(input.name !== '' && input.calories !== ''){
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      //Store in localStorage
      StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  // Click edit item
  const itemEditClick = function(e){
    if(e.target.classList.contains('edit-item')){
      // Get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  }

  // Update item submit
  const itemUpdateSubmit = function(e){
    // Get item input
    const input = UICtrl.getItemInput();

    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

     // Get total calories
     const totalCalories = ItemCtrl.getTotalCalories();
     // Add total calories to UI
     UICtrl.showTotalCalories(totalCalories);

     // Update local storage
     StorageCtrl.updateItemStorage(updatedItem);

     UICtrl.clearEditState();

    e.preventDefault();
  }

  // Delete button event
  const itemDeleteSubmit = function(e){
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(clientInformation);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete from local storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();
  }


  // Clear items event
  const clearAllItemsClick = function(){
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeItems();

    // Clear from local storage
    StorageCtrl.clearItemsFromStorage();

    // Hide UL
    UICtrl.hideList();
    
  }

  // Public methods
  return {
    init: function(){
      // Clear edit state / set initial set
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if(items.length === 0){
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  }
  
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();  