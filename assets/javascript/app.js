$(document).ready(function(){
//get videos
  function displayYoutube5() {

          var topic = "cooking techniques";
          var apiKey = "AIzaSyDxVMZ4ZVWcozAHuQLIYSv3KnR05R4E68w";
          var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&q="+ topic + "&type=video&key="+ apiKey;
          console.log(topic);

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


              console.log(video[i].id.videoId);

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
