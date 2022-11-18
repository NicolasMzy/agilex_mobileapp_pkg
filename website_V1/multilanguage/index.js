// Variables of each languages

function changeFR(){
  $(".language-selected").text("French");
  $(".language-selected").removeClass("change-it");
  $(".language-selected").removeClass("change-ch");
  $(".language-selected").removeClass("change-en");
  $(".language-selected").addClass("change-fr");
  $("#connec").text("CONNECTION");
}

function changeEN(){
  $(".language-selected").text("English");
        $(".language-selected").removeClass("change-fr");
        $(".language-selected").removeClass("change-ch");
        $(".language-selected").removeClass("change-it");
        $(".language-selected").addClass("change-en");
        $("#connec").text("CONNECT");
}

function changeCH(){
  $(".language-selected").text("Chinese");
        $(".language-selected").removeClass("change-fr");
        $(".language-selected").removeClass("change-it");
        $(".language-selected").removeClass("change-en");
        $(".language-selected").addClass("change-ch");
        $("#connec").text("连接");
}

function changeIT(){
  $(".language-selected").text("Italian");
        $(".language-selected").removeClass("change-fr");
        $(".language-selected").removeClass("change-ch");
        $(".language-selected").removeClass("change-en");
        $(".language-selected").addClass("change-it");
        $("#connec").text("CONNESSIONE");
}

// Default Languages selectionned

if(localStorage.getItem('language_selected') == 'en') {
  changeEN();
}

if(localStorage.getItem('language_selected') == 'fr') {
  changeFR();
}

if(localStorage.getItem('language_selected') == 'ch') {
  changeCH();
}

if(localStorage.getItem('language_selected' ) == 'it') {
  changeIT();
}

// Default Languages selectionned

$(function() {
    $(".fr").click(function() {

      changeFR(); 
      localStorage.setItem('language_selected','fr')

    });
  });

  $(function() {
    $(".en").click(function() {

      changeEN();
        localStorage.setItem('language_selected','en')

    });
  });

  $(function() {
    $(".ch").click(function() {

      changeCH();
        localStorage.setItem('language_selected','ch')

    });
  });

  $(function() {
    $(".it").click(function() {

      changeIT();
        localStorage.setItem('language_selected','it')

    });
  });