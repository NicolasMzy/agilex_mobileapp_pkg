let rosbridge_address = 'ws://192.168.8.171:9090';

const transition = document.querySelector(".transition");

const home = document.querySelector(".home");

home.addEventListener("click", (e) => {
    e.preventDefault();
    transition.classList.add("slide");
    
    setTimeout(() => {
      window.location = home.href;
    }, 600);
  
});

let vueApp = new Vue({
  el: "#vueApp",
  data: {
      // ros connection
      ros: null,
      rosbridge_address: rosbridge_address,
      connected: false,
    
      pubInterval: null,
      link : document.querySelector('.power-button'),
      input : document.querySelector('.input'),
  },
  methods: {
      connect: function() {
          // define ROSBridge connection object
          this.ros = new ROSLIB.Ros({
              url: this.rosbridge_address
          })

          // define callbacks
          this.ros.on('connection', () => {
              this.connected = true
              console.log('Connection to ROSBridge established!')
              this.state()
          })
          this.ros.on('error', (error) => {
              console.log('Something went wrong when trying to connect')
              console.log(error)
              this.state()
          })
          this.ros.on('close', () => {
              this.connected = false
              console.log('Connection to ROSBridge was closed!')
              clearInterval(this.pubInterval)
          })
      },

      state: function() {
        
        if (this.connected == true) {
          
          $(".power").addClass("on");
          transition.classList.add("slide");
          localStorage.setItem('rosbridge_address',this.rosbridge_address)

          setTimeout(() => {
            $(".power").addClass("on");
            window.location = "pages/joystick.html";
          }, 600);
        }

        if (this.connected == false) {
          $(".power").addClass("off");
          $(".power-button").addClass("off");
        }
      },

      resetButton: function() {
        $(".power").removeClass("off");
        $(".power-button").removeClass("off");
      },

  },

})
