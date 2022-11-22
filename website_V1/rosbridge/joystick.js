let vueApp = new Vue({
    el: "#vueApp",
    data: {
        // ros connection
        ros: null,
        rosbridge_address: localStorage.getItem('rosbridge_address'),
        connected: false,
        
        // canvas
        canvas : document.getElementById('canvas'),
        ctx : canvas.getContext('2d'),
        
        //Gauge
        gaugeSpeed : document.querySelector(".gaugeSpeed"),
        gaugeAngle : document.querySelector(".gaugeAngle"),

        //coord
        coord: {x:0,y:0},
        paint : false,
        x_orig:0,
        y_orig: 0,
        angle:0,
        x_real:0,
        y_real:0,
        x_relative:0,
        y_relative:0,
        x:0,
        y:0,
        

        //resize
        witdh:0,
        height:0,
        radius:0,

        // Math

        // publisher
        pubInterval: null,
    },
    methods: {

        sleep: function(time){
            return new Promise((resolve) => setTimeout(resolve, time));
        },
        
        connect: function() {
            // define ROSBridge connection object
            this.ros = new ROSLIB.Ros({
                url: this.rosbridge_address
            })
            // define callbacks
            this.ros.on('connection', () => {
                this.connected = true
                console.log('Connection to ROSBridge established!')
                this.pubInterval = setInterval(this.publish, 100)
            })
            this.ros.on('error', (error) => {
                console.log('Something went wrong when trying to connect')
                console.log(error)
            })
            this.ros.on('close', () => {
                this.connected = false
                console.log('Connection to ROSBridge was closed!')
                clearInterval(this.pubInterval)
            })
        },
        publish: function() {
            let topic = new ROSLIB.Topic({
                ros: this.ros,
                name: '/cmd_vel',
                messageType: 'geometry_msgs/Twist'
            })
            let message = new ROSLIB.Message({
                linear: { x: -this.y_relative, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: -this.x_relative, },
            })
            topic.publish(message)
        },
        disconnect: function() {
            this.ros.close()
        },

        // Joystick

        resize: function(){
            this.width = window.innerWidth;
            this.radius = 70
            this.height = this.radius *6.5
            this.ctx.canvas.width=this.width
            this.ctx.canvas.height=this.height-150
            this.background()
            this.joystick(this.width /2,this.height /3)
            this.setSpeedGaugeValue(this.gaugeSpeed,0);
            this.setAngleGaugeValue(this.gaugeAngle,0);
        },

        background :function(){
            this.x_orig = this.width /2
            this.y_orig = this.height /3
            
            this.ctx.beginPath();
            this.ctx.arc(this.x_orig,this.y_orig, this.radius+0 , 0, Math.PI * 2, true)
            this.ctx.fillStyle = '#0E0B0B'
           this. ctx.fill()
        },

        joystick: function(witdh,height){
            this.ctx.beginPath()
            this.ctx.arc(witdh, height, this.radius-25, 0, Math.PI * 2, true)
            this.ctx.fillStyle = '#DDDDDD'
            this.ctx.fill()
            this.ctx.strokeStyle = '#DDDDDD'
            this.ctx.lineWidth = 8
            this.ctx.stroke()
        },

        getPosition: function(event){
            var mouse_x = event.clientX || event.touches[0].clientX
            var mouse_y = event.clientY || event.touches[0].clientY
            this. coord.x = mouse_x - this.canvas.offsetLeft
            this.coord.y = mouse_y - this.canvas.offsetTop
        },

        is_it_in_the_circle: function(){
            var current_radius = Math.sqrt(Math.pow(this.coord.x - this.x_orig, 2) + Math.pow(this.coord.y - this.y_orig, 2))
            if (this.radius >= current_radius) return true
            else return false
        },

        startDrawing: function(event){
            this.paint = true;
            this.getPosition(event);
            if (this.is_it_in_the_circle()) {
               this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.background();
                this.joystick(this.coord.x, this.coord.y);
                this.Draw();
            }
        },

        stopDrawing: function(){
            
            this.paint = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.background();
            this.joystick(this.width / 2, this.height / 3);
            // document.getElementById("speed").innerText = 0;
            // document.getElementById("angle").innerText = 0;
            this.x_relative =0
            this.y_relative =0
            this.setSpeedGaugeValue(this.gaugeSpeed,0);
            this.setAngleGaugeValue(this.gaugeAngle,0);
        },

        Draw: function(event) {

            if (this.paint) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.background();
                this.angle_in_degrees,this.x,this.y, this.speed;
                this.angle = Math.atan2((this.coord.y - this.y_orig), (this.coord.x -this. x_orig));

                if (Math.sign(this.angle) == -1) {
                    var angle_in_degrees = Math.round(-this.angle * 180 / Math.PI);
                }
                else {
                    var angle_in_degrees =Math.round( 360 - this.angle * 180 / Math.PI);
                }


                if (this.is_it_in_the_circle()) {
                    this.joystick(this.coord.x,this.coord.y)
                    this.x = this.coord.x
                    this.y = this.coord.y
                }
                else {
                    this.x = this.radius * Math.cos(this.angle) + this.x_orig
                    this.y = this.radius * Math.sin(this.angle) + this.y_orig
                    this.joystick(this.x, this.y)
                }

            
                this.getPosition(event);

                var speed =  Math.round(100 * Math.sqrt(Math.pow(this.x -this.x_orig, 2) + Math.pow(this.y - this.y_orig, 2)) / this.radius)

                this.x_real = Math.round(this.x - this.x_orig)*0.01
                this.y_real = Math.round(this.y - this.y_orig)*0.01

                if (this.x_real < 0.01 && this.x_real > -0.01) {
                    this.x_relative = 0
                }
                else {
                    this.x_relative = this.x_real
                }

                if (this.y_real < 0.01 && this.y_real > -0.01) {
                    this.y_relative = 0
                }
                else {
                    this.y_relative = this.y_real
                }
                
                // document.getElementById("speed").innerText = speed
                // document.getElementById("angle").innerText = angle_in_degrees
                this.setSpeedGaugeValue(this.gaugeSpeed,speed*0.01,this.y_relative);
                this.setAngleGaugeValue(this.gaugeAngle,angle_in_degrees);
            }
        } ,

        // Gauge Information
        
        setSpeedGaugeValue : function(gauge,value,state) {
            
            if (state > 0){
                var sign = -1
                gauge.querySelector('.gaugeSpeed__fill').style.background = "#ffcc00";
            }
            else {
                var sign = 1
                gauge.querySelector('.gaugeSpeed__fill').style.background = "#910c0c";
            }

            if (value < 0 || value > 1) {
                return;
              }
              gauge.querySelector(".gaugeSpeed__fill").style.transform = `rotate(${
                value / 2
              }turn)`;
            
              gauge.querySelector(".gaugeSpeed__cover").textContent = `${Math.round(
                sign * value * 100
              )}%`;
        },

        setAngleGaugeValue : function(gauge,value) {
            
            var angle = (value*(100/360))*0.01;

            if (angle < 0 || angle > 1) {
                return;
              }
              gauge.querySelector(".gaugeAngle__fill").style.transform = `rotate(${
                angle / 2
              }turn)`;
            
              gauge.querySelector(".gaugeAngle__cover").textContent = `${Math.round(
                value
              )}°`;
        },
 
        lis: function(){
            
            this.resize()
            document.addEventListener('mousedown', this.startDrawing);
            document.addEventListener('mouseup', this.stopDrawing);
            document.addEventListener('mousemove', this.Draw);

            document.addEventListener('touchstart', this.startDrawing);
            document.addEventListener('touchend', this.stopDrawing);
            document.addEventListener('touchcancel', this.stopDrawing);
            document.addEventListener('touchmove', this.Draw);
            window.addEventListener('resize', this.resize);

        },

    },
    mounted() {
        // page is ready
        window.addEventListener('load', this.lis())
        document.ontouchmove = function (e) {
            e.preventDefault();
          }
    },

})


