$(document).ready(function(){
    $('#text').focus();
    scrollToBottom();

    $('#text').keypress(function(e){
      msg = $('#text').val();
      if(e.which == 13 && msg != '' && msg != '\n' && msg != '\n\n' && msg != '\n\n\n'){
           msg = $('#text').val();
           $('#text').focus();
           $('#text').val('');
           sendJson(msg);
           scrollToBottom();
      }
      else if(e.which == 13)
          $('#text').val('');
    });

    $('#text').keyup(function(e){
      msg = $('#text').val();
      if(e.which == 13){
           $('#text').val('');
      }
    });

    $( "#dark" ).click(function() {
      $('body').css("background-color","#687F87");
    });
});

function sendJson(msg) {
  var arr = { text: msg };
  $.ajax({
    url: '/sendMsg',
    type: 'POST',
    data: JSON.stringify(arr),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: false,
    success: function(ms) {
        alert(ms);
    }
  });
}

function getJson() {
  $.ajax({
    type: 'GET',
    url: '/getChat',
    data: {},
    contentType: 'text/json; charset=utf-8',
    dataType: 'json',
    success: function(jsonData) {
      var chat = jsonData.data;

      //if new message arrives, scroll to bottom
      if (chat != $('#chatArea').html()){
        //scrollToBottom();
        $('#chatArea').html(chat);
      }
    },
    error: function() {

    }
  });
  }

function scrollToBottom() {
  $("#chatArea").scrollTop($("#chatArea")[0].scrollHeight);
}

//setInterval(scrollToBottom, 3000);
setInterval(getJson , 500);
