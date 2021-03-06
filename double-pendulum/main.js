// Can't be fucked to convert the Runge-Kutta method to JS so I got some C++ code that I converted to JS here: https://math.stackexchange.com/questions/3662579/4th-order-runge-kutta-method-for-double-pendulum-numerical-solution

/* Simulation Params */
l1 = 1;
m1 = 1;
l2 = 0.75;
m2 = 0.75;

omega1 = 0;
theta1 = Math.random()*180*(Math.PI / 180);
omega2 = 0;
theta2 = Math.random()*180*(Math.PI / 180);

g = 9.81;
drag = 1.0001;
stepSize = 0.0025;

/* Canvas Params*/
canvas_scale = 200;
framerate = 10;

function update_RK4() {
// potential energy
//var potential = -(m1 + m2) * g * l1 * Math.cos(theta1) - m2 * g * l2 * Math.cos(theta2);

// Kinetic energy
//var kinetic = 0.5 * m1 * l1 * l1 * omega1 * omega1 + 0.5 * m2 * ((l1 * l1 * omega1 * omega1) + (l2 * l2 * omega2 * omega2) + 2 * l1 * l2 * omega1 * omega2 * Math.cos(theta1 - theta2));

//displaying the kinetic, potential and total energy of the system.
//console.log(kinetic + "  " + potential + "  " + (kinetic + potential));
/////////////////////////////////////////////////////////////////////////////////////////////////

// THE NEXT 16 VARIABLES ARE THE k's of Runge-Kutta for the 4 ODEs
// All K1
var dTheta1_1 = omega1;
var dOmega1_1 = (-g * (2 * m1 + m2) * Math.sin(theta1) - m2 * g * Math.sin(theta1 - 2 * theta2) - 2 * Math.sin(theta1 - theta2) * m2 * (Math.pow(omega2, 2) * l2 + Math.pow(omega1, 2) * l1 * Math.cos(theta1 - theta2))) / (l1 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2)));
var dTheta2_1 = omega2;
var dOmega2_1 = (2 * Math.sin(theta1 - theta2) * (Math.pow(omega1, 2) * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(theta1) + Math.pow(omega2, 2) * l2 * m2 * Math.cos(theta1 - theta2))) / (l2 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2)));

// All K2
var dTheta1_2 = omega1 + 0.5 * stepSize * dTheta1_1;
var dOmega1_2 = (-g * (2 * m1 + m2) * Math.sin(theta1 + 0.5 * stepSize * dTheta1_1) - m2 * g * Math.sin((theta1 + 0.5 * stepSize * dTheta1_1) - 2 * (theta2 + 0.5 * stepSize * dTheta2_1)) - 2 * Math.sin((theta1 + 0.5 * stepSize * dTheta1_1) - (theta2 + 0.5 * stepSize * dTheta2_1)) * m2 * (Math.pow(omega2 + 0.5 * stepSize * dOmega2_1, 2) * l2 + Math.pow(omega1 + 0.5 * stepSize * dOmega1_1, 2) * l1 * Math.cos((theta1 + 0.5 * stepSize * dTheta1_1) - (theta2 + 0.5 * stepSize * dTheta2_1)))) / (l1 * (2 * m1 + m2 - m2 * Math.cos(2 * (theta1 + 0.5 * stepSize * dTheta1_1) - 2 * (theta2 + 0.5 * stepSize * dTheta2_1))));
var dTheta2_2 = omega2 + 0.5 * stepSize * dTheta2_1;
var dOmega2_2 = (2 * Math.sin((theta1 + 0.5 * stepSize * dTheta1_1) - (theta2 + 0.5 * stepSize * dTheta2_1)) * (Math.pow(omega1 + 0.5 * stepSize * dOmega1_1, 2) * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(theta1 + 0.5 * stepSize * dTheta1_1) + Math.pow(omega2 + 0.5 * stepSize * dOmega2_1, 2) * l2 * m2 * Math.cos((theta1 + 0.5 * stepSize * dTheta1_1) - (theta2 + 0.5 * stepSize * dTheta2_1)))) / (l2 * (2 * m1 + m2 - m2 * Math.cos(2 * (theta1 + 0.5 * stepSize * dTheta1_1) - 2 * (theta2 + 0.5 * stepSize * dTheta2_1))));

// All K3
var dTheta1_3 = omega1 + 0.5 * stepSize * dTheta1_2;
var dOmega1_3 = (-g * (2 * m1 + m2) * Math.sin(theta1 + 0.5 * stepSize * dTheta1_2) - m2 * g * Math.sin((theta1 + 0.5 * stepSize * dTheta1_2) - 2 * (theta2 + 0.5 * stepSize * dTheta2_2)) - 2 * Math.sin((theta1 + 0.5 * stepSize * dTheta1_2) - (theta2 + 0.5 * stepSize * dTheta2_2)) * m2 * (Math.pow(omega2 + 0.5 * stepSize * dOmega2_2, 2) * l2 + Math.pow(omega1 + 0.5 * stepSize * dOmega1_2, 2) * l1 * Math.cos((theta1 + 0.5 * stepSize * dTheta1_2) - (theta2 + 0.5 * stepSize * dTheta2_2)))) / (l1 * (2 * m1 + m2 - m2 * Math.cos(2 * (theta1 + 0.5 * stepSize * dTheta1_2) - 2 * (theta2 + 0.5 * stepSize * dTheta2_2))));
var dTheta2_3 = omega2 + 0.5 * stepSize * dTheta2_2;
var dOmega2_3 = (2 * Math.sin((theta1 + 0.5 * stepSize * dTheta1_2) - (theta2 + 0.5 * stepSize * dTheta2_2)) * (Math.pow(omega1 + 0.5 * stepSize * dOmega1_2, 2) * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(theta1 + 0.5 * stepSize * dTheta1_2) + Math.pow(omega2 + 0.5 * stepSize * dOmega2_2, 2) * l2 * m2 * Math.cos((theta1 + 0.5 * stepSize * dTheta1_2) - (theta2 + 0.5 * stepSize * dTheta2_2)))) / (l2 * (2 * m1 + m2 - m2 * Math.cos(2 * (theta1 + 0.5 * stepSize * dTheta1_2) - 2 * (theta2 + 0.5 * stepSize * dTheta2_2))));

// All K4
var dTheta1_4 = omega1 + stepSize * dTheta1_3;
var dOmega1_4 = (-g * (2 * m1 + m2) * Math.sin(theta1 + stepSize * dTheta1_3) - m2 * g * Math.sin((theta1 + stepSize * dTheta1_3) - 2 * (theta2 + stepSize * dTheta2_3)) - 2 * Math.sin((theta1 + stepSize * dTheta1_3) - (theta2 + stepSize * dTheta2_3)) * m2 * (Math.pow(omega2 + stepSize * dOmega2_3, 2) * l2 + Math.pow(omega1 + stepSize * dOmega1_3, 2) * l1 * Math.cos((theta1 + stepSize * dTheta1_3) - (theta2 + stepSize * dTheta2_3)))) / (l1 * (2 * m1 + m2 - m2 * Math.cos(2 * (theta1 + stepSize * dTheta1_3) - 2 * (theta2 + stepSize * dTheta2_3))));
var dTheta2_4 = omega2 + stepSize * dTheta2_3;
var dOmega2_4 = (2 * Math.sin((theta1 + stepSize * dTheta1_3) - (theta2 + stepSize * dTheta2_3)) * (Math.pow(omega1 + stepSize * dOmega1_3, 2) * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(theta1 + stepSize * dTheta1_3) + Math.pow(omega2 + stepSize * dOmega2_3, 2) * l2 * m2 * Math.cos((theta1 + stepSize * dTheta1_3) - (theta2 + stepSize * dTheta2_3)))) / (l2 * (2 * m1 + m2 - m2 * Math.cos(2 * (theta1 + stepSize * dTheta1_3) - 2 * (theta2 + stepSize * dTheta2_3))));


var theta1New = theta1 + (stepSize / 6.0) * (dTheta1_1 + 2 * dTheta1_2 + 2 * dTheta1_3 + dTheta1_4);
var omega1New = omega1 + (stepSize / 6.0) * (dOmega1_1 + 2 * dOmega1_2 + 2 * dOmega1_3 + dOmega1_4);
var theta2New = theta2 + (stepSize / 6.0) * (dTheta2_1 + 2 * dTheta2_2 + 2 * dTheta2_3 + dTheta2_4);
var omega2New = omega2 + (stepSize / 6.0) * (dOmega2_1 + 2 * dOmega2_2 + 2 * dOmega2_3 + dOmega2_4);


// updating variables
theta1 = theta1New;
omega1 = omega1New/drag;
theta2 = theta2New;
omega2 = omega2New/drag;
}

function update_canvas(){
  var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.clearRect(0, 0, canvas_width, canvas_height);
  ctx.beginPath();
ctx.moveTo(center_x, center_y);
new_line_x = center_x+Math.sin(theta1)*l1*canvas_scale;
new_line_y = center_y+Math.cos(theta1)*l1*canvas_scale;
endofpendulum_x = new_line_x+Math.sin(theta2)*l2*canvas_scale;
endofpendulum_y = new_line_y+Math.cos(theta2)*l2*canvas_scale;
ctx.lineTo(new_line_x, new_line_y);
ctx.lineTo(endofpendulum_x, endofpendulum_y);
ctx.stroke();
var ch = document.getElementById("canvas-history");
var chctx = ch.getContext("2d");
chctx.beginPath();
chctx.arc(endofpendulum_x, endofpendulum_y, 1, 0, 4 * Math.PI, false);
chctx.fillStyle = 'black';
chctx.fill();
chctx.stroke();
}

function update_canvas_dimensions(){
  if (canvas_width==window.innerWidth){
    return;
  }
  if (canvas_height==window.innerHeight){
    return;
  }
  var c = document.getElementById("canvas");
  var ch = document.getElementById("canvas-history");
  canvas_width=window.innerWidth;
  canvas_height=window.innerHeight;
  center_x = canvas_width/2;
  center_y = canvas_height/2;
  c.width = canvas_width;
  c.height = canvas_height;
  ch.width = canvas_width;
  ch.height = canvas_height;
}
var canvas_width = 0;
var canvas_height = 0;
var center_x = 0;
var center_y = 0;
var endofpendulum_x = 0;
var endofpendulum_y = 0;
update_canvas_dimensions();
function main(){
  update_RK4();
  update_canvas();
}
setInterval(update_RK4,framerate/2);
setInterval(update_canvas,framerate);
setInterval(update_canvas_dimensions,1000);
