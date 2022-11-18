
// Variables of each languages

function changeFR(){
  $(".language-selected").text("French");
  $(".language-selected").removeClass("change-it");
  $(".language-selected").removeClass("change-ch");
  $(".language-selected").removeClass("change-en");
  $(".language-selected").addClass("change-fr");
  $("#titleControl").text("Controllez le robot avec le joystick !");
  $(".speed").text("Vitesse :")
  $(".angle").text("Angle :")
}

function changeEN(){
  $(".language-selected").text("English");
        $(".language-selected").removeClass("change-fr");
        $(".language-selected").removeClass("change-ch");
        $(".language-selected").removeClass("change-it");
        $(".language-selected").addClass("change-en");
        $("#titleControl").text("Control the robot with the joystick !");
        $(".speed").text("Speed :");
        $(".angle").text("Angle :");
}

function changeCH(){
  $(".language-selected").text("Chinese");
  $(".language-selected").removeClass("change-fr");
  $(".language-selected").removeClass("change-it");
  $(".language-selected").removeClass("change-en");
  $(".language-selected").addClass("change-ch");
  $("#titleControl").text("用操纵杆控制机器人!");
  $(".speed").text("速度 :");
  $(".angle").text("角度 :");

}

function changeIT(){
  $(".language-selected").text("Italian");
  $(".language-selected").removeClass("change-fr");
  $(".language-selected").removeClass("change-ch");
  $(".language-selected").removeClass("change-en");
  $(".language-selected").addClass("change-it");
  $("#titleControl").text("Controllate il robot con il joystick!");
  $(".speed").text("velocità :");
  $(".angle").text("Angolo :");
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

// change languages

  $(function() {
    $(".fr").click(function() {

      changeFR();
      localStorage.setItem('language_selected','fr')
      
    });
  });
  

  $(function() {
    $(".en").click(function() {

      changeEN();
      localStorage.setItem('language_selected','en');

    });
  });

  $(function() {
    $(".ch").click(function() {

      changeCH();
      localStorage.setItem('language_selected','ch');

    });
  });

  $(function() {
    $(".it").click(function() {

      changeIT();
      localStorage.setItem('language_selected','it');

    });
  });