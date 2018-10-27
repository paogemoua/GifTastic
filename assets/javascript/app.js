var topics = ["pikachu", "mew", "bulbasaur", "charmander", "squirtle", "totodile", "marill", "mudkip", "chimchar", "charizard"];

function createButtons() {
	$("#buttons").empty();

	for (var i = 0; i < topics.length; i++) {
		var newButton = $("<button class='btn btn-default fButton'>");
		newButton.attr("data-name", topics[i]);
		newButton.text(topics[i])
		$("#buttons").append(newButton);
	};
};

$("#buttons").on("click", "button", function() {
	$("#gifspace").empty();

	var name = $(this).attr("data-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	    name + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response)

		var results = response.data;

		for(var i = 0; i < results.length; i++) {
			var nameDiv = $("<div class='newGif'>");
			var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
			var image = $("<img>");
			image.attr({"src": results[i].images.fixed_height_still.url, "data-still": results[i].images.fixed_height_still.url, "data-animate": results[i].images.fixed_height.url, "data-state": "still", "class": "gif"});
			nameDiv.append(image);
			nameDiv.append(p);
			$("#gifspace").append(nameDiv);
		};
	});
});

$("#gifspace").on("click", ".gif", function(){
	var state = $(this).attr("data-state");

	if(state === 'still') {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	};
});

$("#add-Pokemon").on("click", function(event){
	event.preventDefault();
	var newPokemon = $("#Pokemon-input").val().trim();
	topics.push(newPokemon);
	$("#Pokemon-input").val("");
	createButtons();
});

createButtons();
