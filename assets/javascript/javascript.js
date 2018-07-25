$(document).ready(function() {

    animalsArray = ["Turtle", "Dog", "PufferFish", "Fox"];

    var $buttonsCol = $(".buttonsCol");

    var $GIFsCol = $(".GIFsCol");

    var APIKey = "Pj7SF1CwRUBJYlaIY08NhriMy6ogXXDB";

    var result = {};

    function displayButtons() {        
        for(i = 0; i < animalsArray.length; i++) {
            var button = $("<button>");
            button.addClass("animalButton").attr("data-animal", animalsArray[i]).text(animalsArray[i]);
            $buttonsCol.append(button);
        }
    }

    function displayGIFs() {
        $GIFsCol.empty();
        var animal = $(this).attr("data-animal");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey +"&q=" + animal + "&limit=10&rating=pg-13";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            result = response.data;
            

            for(i = 0; i < result.length; i++) {
                var $animalImage = $("<img>");
                var $animalDiv = $("<div>");
                var $animalPar = $("<par>");
                $animalImage.attr("src", result[i].images.fixed_height_still.url).attr("data-state", "static").attr("data-static-url", result[i].images.fixed_height_still.url).attr("data-moving-url", result[i].images.fixed_height.url).addClass("animalImage");
                $animalPar.text("Rating: " + result[i].rating);
                $animalDiv.append($animalPar).prepend($animalImage);
                $GIFsCol.append($animalDiv);
                console.log("image appended");
            }
        });
    }

    function imageCheck() {
        console.log("image clicked");
        var $this = $(this)
        var imageState = $(this).attr("data-state");
        var currentStatic = $this.attr("data-static-url");
        var currentMoving = $this.attr("data-moving-url");
        if(imageState === "static") {
            console.log("entered if");
            $this.attr("data-state", "moving").attr("src", currentMoving);
        }

        else {
            console.log("entered else");
            $this.attr("data-state", "static").attr("src", currentStatic);
        }
    }

    $buttonsCol.on("click", ".animalButton", displayGIFs);

    $GIFsCol.on("click", ".animalImage", imageCheck);

    displayButtons();
});