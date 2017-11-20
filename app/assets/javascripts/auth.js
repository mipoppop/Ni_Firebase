
$(function(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $('#donelogin').show();
      $('#notlogin').hide();
    } else {
      $('#donelogin').hide();
      $('#notlogin').show();
    }
  });



  $('#gmaillogin').click(function () {
    console.log('Gmailのボタン押した！');
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      location.reload();
    }).catch(function(error) {
      alert('ログイン失敗！もう無理だ諦めよう…');
    });
  });


  $('#maillogin').click(function () {
    console.log('Mailのボタン押した！');
    var email = $('#email').val();
    var password = $('#password').val();

    if (!email && !password) {
      alert('Eメールアドレスとパスワードを入力おなしゃす！');
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
        location.reload();
      }).catch(function(){
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
          location.reload();
        }).catch(function(error) {
          alert('ログイン出来んかった！ごめん！！');
        });
      })
    }
  });


  $('#signout').click(function() {
    console.log('サインアウトボタン押した！')
    firebase.auth().signOut().catch(function(error) {
      alert('サインアウト失敗した');
    });
  });

});