 var names = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "NotATwitchUser"];

$(document).ready(function (){
  loop()
})

function loop(){
  for (let i = 0; i < names.length; i++){
    find404s(i);
  }
}

function cleanUp(){
  $("#results").html('<div class="online dummy"></div>  <div class="offline dummy"></div>');
}

function find404s(i){
  $.getJSON({
    url: "https://wind-bow.gomix.me/twitch-api/channels/" + names[i] + "?callback=?",
    success: function(a){
      if (a.status === 404){
        $("#results").append("<div class='unknown result'><p>We don't talk about " + names[i] + "</p></div>");
      } else {
        existingUser(names[i], a);
      }
    }
  });
}

function existingUser(name, data){ 
  $.getJSON({
    url: "https://wind-bow.gomix.me/twitch-api/streams/" + name + "?callback=?",
    success: function(a){
      if (a.stream === null) {
        $(".offline:last").after("<div class='offline result'><div class='logos'><img src='" + data.logo + "' class='off-logo'></div><h2><a href='https://www.twitch.tv/" + name + "' target='_blank'>" + name + "</a></h2><p>Offline</p></div>")
      } else {
        $(".online:last").after("<div class='online result'><div class='logos'><img src='" + data.logo + "' class='on-logo'></div><h2><a href='https://www.twitch.tv/" + name + "' target='_blank'>" + name + "</a></h2><p>Streaming " + a.stream.game + "</p></div>")
      }
    }
  })
}

$("#add").on("click", function (e) {
  e.preventDefault();
  var input = $("input").val();
  if (!names.includes(input)){
    names.push(input);
    $("#search").html("");
    $.when(cleanUp()).done(function (){
      loop();
    })
  } else {
    $("#search").html(`You have already added ${input}`)
  }
})
