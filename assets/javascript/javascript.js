$(document).ready(function() {

    animalsArray = ["Turtle", "Dog", "Puma", "Fox"];

    var $buttonsCol = $(".buttonsCol");

    for(i = 0; i < animalsArray.length; i++) {
        var button = $("<button>");
        button.addClass("animalButton").attr("data-animal", animalsArray[i]).text(animalsArray[i]);
        $buttonsCol.append(button);
    }
});