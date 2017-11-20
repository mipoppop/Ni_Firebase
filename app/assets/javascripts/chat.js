
$(function(){
  const ref = firebase.database().ref('chat');
  console.log('chat.jsの読み込み');

  ref.on('child_added', function (childSnapshot) {
    var chatmsg = $('<div></div>').text(childSnapshot.val().content);
    $('#chat').append(chatmsg);
    console.log('FireBaseからの読み込み');
  });


  $('#post').click(function () {
    var text = $('#content').val();
    var key = ref.push({content: text}).key;
    console.log(text);
    console.log(key);
    $('#content').val('');

    var jsondata = {
      firebase_id: key,
      content: text
    };

    console.log(jsondata);

    $.ajax({
      type: 'post',
      url: 'http://localhost:3000/chats',
      data: JSON.stringify(jsondata),
      contentType: 'application/json',
      datatype: 'json'
    }).done(function(){
      console.log("POST成功")
    }).fail(function(){
      console.log("POST失敗")
    });
  });
});
