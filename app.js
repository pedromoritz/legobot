const express = require("express");
const port = 3000;

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
    motorRightDisable();
    rpio.open(MOTOR_RIGHT_FRONT, rpio.OUTPUT, ON);
}

function motorRightRear(){
    motorRightDisable();
    rpio.open(MOTOR_RIGHT_REAR, rpio.OUTPUT, ON);
}

function motorRightDisable() {
    rpio.open(MOTOR_RIGHT_FRONT, rpio.OUTPUT, OFF);
    rpio.open(MOTOR_RIGHT_REAR, rpio.OUTPUT, OFF);
}

function motorLeftFront(){
    motorLeftDisable();
    rpio.open(MOTOR_LEFT_FRONT, rpio.OUTPUT, ON);
}

function motorLeftRear(){
    motorLeftDisable();
    rpio.open(MOTOR_LEFT_REAR, rpio.OUTPUT, ON);
}

function disableMotorLeft() {
    rpio.open(MOTOR_LEFT_FRONT, rpio.OUTPUT, OFF);
    rpio.open(MOTOR_LEFT_REAR, rpio.OUTPUT, OFF);
}


(async () => {
    try {

        const app = express();
        app.set('view engine', 'html');
        app.use(express.static(__dirname + '/'));
        app.set('views', __dirname + '/');
        app.get("/", function(req, res) {
            res.render('index.html');
        });

        app.get("/motorRightFront", function(req, res) {
            motorRightFront();
        });

        app.get("/motorRightDisable", function(req, res) {
            motorRightDisable();
        });

        app.use(express.static(__dirname + '/'));

        app.listen(port);

        let running = true;
        process.on("SIGINT", async () => {
            if (!running) {
                return;
            }
            console.log("shutting down client");
            console.log("Done");
            process.exit(0);
        });
    } catch (err) {
        console.log(chalk.bgRed.white("Error" + err.message));
        console.log(err);
        process.exit(-1);
    }
})();
