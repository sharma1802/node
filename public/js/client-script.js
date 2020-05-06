'use strict';

var PLAYERS = [];

var updateContent = function() {
    var tbody = document.getElementById("tbody");

    tbody.innerHTML = "";

    for(var i = 0; i < PLAYERS.length; i++) {

        var tr = document.createElement("tr");
        var name = document.createElement("td");
        var country = document.createElement("td");

        name.innerText = PLAYERS[i].name;
        country.innerText = PLAYERS[i].country;

        tr.appendChild(name);
        tr.appendChild(country);

        tbody.append(tr);

    }

};

var loadPlayers = function() {
    var request = new XMLHttpRequest();
    request.open("get", "/players");
    request.send();
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            PLAYERS = JSON.parse(request.responseText);
            updateContent();
        }
    };
};

var button = document.getElementById("addButton");
button.addEventListener("click", function(){

    var playerName = document.getElementById("playerName").value;
    var playerCountry = document.getElementById("playerCountry").value;

    if(playerName == "" || playerCountry == "") {
        alert("Hey bro, enter two values.");
        return;
    }

    var data = {
        name: playerName,
        country: playerCountry
    };

    // Send new player data to the server.
    var request = new XMLHttpRequest();
    request.open("post", "/players");
    
    // Tell browser and the server that we are sending JSON data
    request.setRequestHeader("content-type", "application/json");
    request.send( JSON.stringify(data) );
    
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            PLAYERS.push(data);
            updateContent();
        }
    };

});

loadPlayers();