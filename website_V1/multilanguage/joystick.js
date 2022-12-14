
// Variables of each languages

function changeFR(){
  $(".language-selected").text("Français");
  $(".language-selected").removeClass("change-it");
  $(".language-selected").removeClass("change-ch");
  $(".language-selected").removeClass("change-en");
  $(".language-selected").addClass("change-fr");
  $("#titleControl").text("Controllez le robot avec le joystick !");
  $(".gaugeSpeed__text").text("Vitesse");
  $(".gaugeAngle__text").text("Angle");

}

function changeEN(){
  $(".language-selected").text("English");
  $(".language-selected").removeClass("change-fr");
  $(".language-selected").removeClass("change-ch");
  $(".language-selected").removeClass("change-it");
  $(".language-selected").addClass("change-en");
  $("#titleControl").text("Control the robot with the joystick !");
  $(".gaugeSpeed__text").text("Speed");
  $(".gaugeAngle__text").text("Angle");
        
}

function changeCH(){
  $(".language-selected").text("中国");
  $(".language-selected").removeClass("change-fr");
  $(".language-selected").removeClass("change-it");
  $(".language-selected").removeClass("change-en");
  $(".language-selected").addClass("change-ch");
  $("#titleControl").text("用操纵杆控制机器人!");
  $(".gaugeSpeed__text").text("速度");
  $(".gaugeAngle__text").text("角度");
  

}

function changeIT(){
  $(".language-selected").text("Italiano");
  $(".language-selected").removeClass("change-fr");
  $(".language-selected").removeClass("change-ch");
  $(".language-selected").removeClass("change-en");
  $(".language-selected").addClass("change-it");
  $("#titleControl").text("Controllate il robot con il joystick!");
  $(".gaugeSpeed__text").text("velocità");
  $(".gaugeAngle__text").text("Angolo");
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