$(document).ready(function() {

    animalsArray = ["Turtle", "Dog", "Puma", "Fox"];

    var $buttonsCol = $(".buttonsCol");

    var $GIFsCol = $("GIFsCol");

    var APIKey = "Pj7SF1CwRUBJYlaIY08NhriMy6ogXXDB";

    function displayButtons() {        
        for(i = 0; i < animalsArray.length; i++) {
            var button = $("<button>");
            button.addClass("animalButton").attr("data-animal", animalsArray[i]).text(animalsArray[i]);
            $buttonsCol.append(button);
        }
    }

    function displayGIFs() {
        var animal = $(this).attr("data-animal");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        });
    }

    $buttonsCol.on("click", ".animalButton", displayGIFs)

    


    displayButtons();
});