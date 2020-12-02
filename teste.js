var rpio = require('rpio');

MOTOR_RIGHT_FRONT = 12;
MOTOR_RIGHT_REAR = 8;
MOTOR_LEFT_FRONT = 16;
MOTOR_LEFT_REAR = 10;

ON = 0;
OFF = 1;

const args = process.argv.slice(2)[0];

rpio.open(MOTOR_RIGHT_FRONT, rpio.OUTPUT, OFF);
rpio.open(MOTOR_RIGHT_REAR, rpio.OUTPUT, OFF);
rpio.open(MOTOR_LEFT_FRONT, rpio.OUTPUT, OFF);
rpio.open(MOTOR_LEFT_REAR, rpio.OUTPUT, OFF);
 
function motorRightFront(){
    disableMotorRight();
    rpio.open(MOTOR_RIGHT_FRONT, rpio.OUTPUT, ON);
}

function motorRightRear(){
    disableMotorRight();
    rpio.open(MOTOR_RIGHT_REAR, rpio.OUTPUT, ON);
}

function disableMotorRight() {
    rpio.open(MOTOR_RIGHT_FRONT, rpio.OUTPUT, OFF);
    rpio.open(MOTOR_RIGHT_REAR, rpio.OUTPUT, OFF);
}

function motorLeftFront(){
    disableMotorLeft();
    rpio.open(MOTOR_LEFT_FRONT, rpio.OUTPUT, ON);
}

function motorLeftRear(){
    disableMotorLeft();
    rpio.open(MOTOR_LEFT_REAR, rpio.OUTPUT, ON);
}

function disableMotorLeft() {
    rpio.open(MOTOR_LEFT_FRONT, rpio.OUTPUT, OFF);
    rpio.open(MOTOR_LEFT_REAR, rpio.OUTPUT, OFF);
}

switch (args) {
  case 'rf':
    motorRightFront();
    break;
  case 'rr':
    motorRightRear();
    break;
  case 'dr':
    disableMotorRight();
    break;
  case 'lf':
    motorLeftFront();
    break;
  case 'lr':
    motorLeftRear();
    break;
  case 'dl':
    disableMotorLeft();
    break;
}
