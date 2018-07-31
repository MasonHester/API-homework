$(document).ready(function () {

    // Global variables

    //=================================================================================================================

        let offset = 0

        //-----------------------------------------------------------------------------------------------------------------

        //  HTML references

        //-----------------------------------------------------------------------------------------------------------------

        const $buttonsCol = $(".buttonsCol");
        
        const $GIFsCol = $(".GIFsCol");
        
    //=================================================================================================================

    // Functions

    //=================================================================================================================

        function userCheck() {
            // Sets var returnedInitialArray to the storage value of initial array
            let returnedAnimalArray = JSON.parse(localStorage.getItem("animalArray"));

            // An array of default animals
            const initialAnimalArray = ["Turtle", "Dog", "PufferFish", "Fox"];

                // If animalArray is present it will call display buttons
                if (returnedAnimalArray) {
                    displayButtons();
                }

                // If animalArray is not present then it will create on and give it default animals and call display buttons
                else {
                    localStorage.setItem("animalArray", JSON.stringify(initialAnimalArray));
                    displayButtons();
                }
        }

        function displayButtons() {
            // Empties the buttonCol
            $buttonsCol.empty();

            // Let animalArray be the array stored in local
            let animalArray = JSON.parse(localStorage.getItem("animalArray"));
            console.log("animalArray = " + animalArray);

            // For loop for the length of animalArray
            for (i = 0; i < animalArray.length; i++) {
                // Shorthands for displaying buttons
                const $buttonsDiv = $("<div>");
                const $animalButton = $("<button>");
                const $removeButton = $("<button>");

                // Makes the div a grouping for the buttons
                $buttonsDiv.addClass("btn-group");

                // Adds class of animalButton to the animal button, sets key of data-aniaml to the name of the animal
                // and changes the text of the button to the name of the animal            
                $animalButton.addClass("animalButton topButton bold").attr("data-animal", animalArray[i]).text(animalArray[i]);

                // Adds class of removeButton to the remove animal button, sets key of data-index to i (0,1,2,3,...) and
                // changes the text of the button to X            
                $removeButton.addClass("removeButton topButton").attr("data-index", i).text("x");

                // Appends the animal button and remove animal button to the button group
                $buttonsDiv.append($animalButton, $removeButton);

                // Appends the button group to the button col
                $buttonsCol.append($buttonsDiv);
            }
        }

        function displayGIFs() {

            offset = 0;

            // Empties the GIFs col
            $GIFsCol.empty();

            // API key for GIPHY, should be elsewhere if security is important
            const APIKey = "Pj7SF1CwRUBJYlaIY08NhriMy6ogXXDB";

            // Sets animal to the value of data animal, "this" refers to the button clicked
            let animal = $(this).attr("data-animal");

            // Sets up the URL used in the AJAX call
            let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + animal + "&limit=10&rating=pg-13";

            // AJAX call to GIPHY
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                // Sets result to enter the first child of the response for ease of use
                let result = response.data;

                console.log(result);

                // Sets loadMoreButton to be a button
                const $loadMoreButton = $("<button>");
                
                    // For loop for creating the GIFS (starting as stills)
                    for (i = 0; i < result.length; i++) {
                        // Shorthands for displaying GIFs
                        const $animalImage = $("<img>");
                        const $animalDiv = $("<div>");
                        const $animalPar = $("<par>");

                        let staticURL = result[i].images.fixed_height_still.url;
                        let movingURL = result[i].images.fixed_height.url

                        // Sets src of the image to the static url, stores the staticURL and movingURL in keys, adds a class
                        // of animalImage
                        $animalImage.attr("src", staticURL).attr("data-state", "static").attr("data-static-url", staticURL).attr("data-moving-url", movingURL).addClass("animalImage");

                        // makes the text of animal par the rating
                        $animalPar.text("Rating: " + result[i].rating);

                        // Appends the GIF and rating to the animal div
                        $animalDiv.addClass("animalDiv").append($animalImage, $animalPar);

                        // Appends the animalDiv to the GIFs col
                        $GIFsCol.append($animalDiv);
                    }

                // Adds class to load more button and changes the text
                $loadMoreButton.attr("data-animal", animal).addClass("loadMoreButton bold").text("Load More");

                // Appends load more button to the bottom of the page                
                $GIFsCol.append($loadMoreButton);
            });
        }

        function imageCheck() {
            // Shorthands for checking an image
            // "this" refers to the image clicked
            let $this = $(this)
            let imageState = $this.attr("data-state");
            let currentStatic = $this.attr("data-static-url");
            let currentMoving = $this.attr("data-moving-url");

                // If image state is static
                if (imageState === "static") {
                    // Sets the key of data-state to moving on the current image and changes the src to the moving URL
                    $this.attr("data-state", "moving").attr("src", currentMoving);
                }

                // If image state is moving
                else {
                    // Sets the key of data-state to static on the current image and changes the src to the static URL
                    $this.attr("data-state", "static").attr("src", currentStatic);
                }
        }

        function addButton() {
            // Prevents the entire form being submitted
            event.preventDefault();
            
            // Creates aniaml input
            let $animalInput = "";

                // If xs or s screen
                if($("#animalInput").val().trim()) {
                    $animalInput = $("#animalInput").val().trim();
                }
                
                // If md or larger screen
                else {
                    $animalInput = $("#animalInput2").val().trim();
                }
            

            // Sets tempAnimalArray to the animalArray stored in local
            let tempAnimalArray = JSON.parse(localStorage.getItem("animalArray"));

            // Addes the users input to the tempAnimalArray
            tempAnimalArray.push($animalInput);

            // Sets the updated tempAnimalArray as the animalArray in local
            localStorage.setItem("animalArray", JSON.stringify(tempAnimalArray));

            // Clears the input on submission
            $(".animalForm")[0].reset();
            $(".animalForm2")[0].reset();

            // Calls displayButtons
            displayButtons();
        }

        function removeButton() {
            console.log("remove button called")

            // Question
                // animalArray is used as a let in display buttons,
                // this function shouldn't have scope in that function,
                // would naming returnedAnimalArray animalArray cause issues?
                // (let should reserve the name, correct?)
            // Sets returnedAnimalArray to the animalArray stored in local
            let returnedAnimalArray = JSON.parse(localStorage.getItem("animalArray"));

            // Shorthand for the value of the data-index key, "this" refers the button clicked            
            $index = $(this).attr("data-index");

            // If returnedAnimalArray's length is bigger than one
            if(returnedAnimalArray.length > 1) {
                // Removes the animal at the index of the button clicked
                returnedAnimalArray.splice($index, 1);

                // Sets animalArray in local as the updated array
                localStorage.setItem("animalArray", JSON.stringify(returnedAnimalArray));

                // Calls displayButtons
                displayButtons();                    
            }

            // If returnedAnimalArray's length isnt bigger than one
            else {

                // Shows the Modal (Modal is made in HTML)
                $("#cantRemoveModal").modal("show");
            }            
        }

        // Resets animalArray in the local storage
        function resetAnimalArray() {
            //Question
                //same question. same names?
            const initialAnimalArray2 = ["Turtle", "Dog", "PufferFish", "Fox"];
            localStorage.setItem("animalArray", JSON.stringify(initialAnimalArray2))
            displayButtons();
        }

        function loadMore() {
            // Removes the load more button
            $(".loadMoreButton").remove();

            offset += 10;

            

            // API key for GIPHY, should be elsewhere if security is important
            const APIKey = "Pj7SF1CwRUBJYlaIY08NhriMy6ogXXDB";

            // Sets animal to the value of data animal, "this" refers to the button clicked
            let animal = $(this).attr("data-animal");

            // Sets up the URL used in the AJAX call
            let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + animal + "&offset=" + offset + "&limit=10&rating=pg-13";

            // AJAX call to GIPHY
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                // Sets result to enter the first child of the response for ease of use
                let result = response.data;

                console.log(result);

                // Sets loadMoreButton to be a button
                const $loadMoreButton = $("<button>");
                
                    // For loop for creating the GIFS (starting as stills)
                    for (i = 0; i < result.length; i++) {
                        // Shorthands for displaying GIFs
                        const $animalImage = $("<img>");
                        const $animalDiv = $("<div>");
                        const $animalPar = $("<par>");

                        let staticURL = result[i].images.fixed_height_still.url;
                        let movingURL = result[i].images.fixed_height.url

                        // Sets src of the image to the static url, stores the staticURL and movingURL in keys, adds a class
                        // of animalImage
                        $animalImage.attr("src", staticURL).attr("data-state", "static").attr("data-static-url", staticURL).attr("data-moving-url", movingURL).addClass("animalImage");

                        // makes the text of animal par the rating
                        $animalPar.text("Rating: " + result[i].rating);

                        // Appends the GIF and rating to the animal div
                        $animalDiv.addClass("animalDiv").append($animalImage, $animalPar);

                        // Appends the animalDiv to the GIFs col
                        $GIFsCol.append($animalDiv);
                    }

                // Adds class to load more button and changes the text
                $loadMoreButton.attr("data-animal", animal).addClass("loadMoreButton bold").text("Load More");

                // Appends load more button to the bottom of the page                
                $GIFsCol.append($loadMoreButton);
            });
        }

    //=================================================================================================================

    // On clicks

    //=================================================================================================================

        // When animal button is clicked, calls displayGIFs
        $buttonsCol.on("click", ".animalButton", displayGIFs);

        // When an image is clicked, calls imageCheck
        $GIFsCol.on("click", ".animalImage", imageCheck);

        // When add animal is clicked, calls addButton
        $(".addAnimal").on("click", addButton);
        $(".addAnimal2").on("click", addButton);

        // Resets the animal buttons
        $(".resetAnimals").on("click", resetAnimalArray);
        $(".resetAnimals2").on("click", resetAnimalArray);

        // When remove button is clicked, calls remove button
        $buttonsCol.on("click", ".removeButton", removeButton);

        // When load more button is clicked, calls load more
        $GIFsCol.on("click", ".loadMoreButton", loadMore);

    //=================================================================================================================

    // Instant Calls

    //=================================================================================================================

        // Immediately calls userCheck on page load.
        userCheck();
    
    //=================================================================================================================

    // Question
        // for the HTML when not md screen or bigger seperate col for the form
        // form uses ID would having two forms with the same work? if not would having
        // a second form with a second id that calls the same function be the most
        //efficient fix?

    //Question
        //for the HTML when not md col-xs-n and col-s-n doesnt work.
});